// Admin users management edge function
// Verifies the caller is an admin, then lists auth users with their roles
// and allows granting or revoking roles.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ??
  Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

const VALID_ROLES = ["admin", "editor", "viewer"] as const;
type AppRole = typeof VALID_ROLES[number];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return json({ error: "Missing bearer token" }, 401);
  }

  // Client bound to the caller's JWT — used to verify they are an admin.
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData.user) return json({ error: "Invalid session" }, 401);
  const callerId = userData.user.id;

  const { data: isAdmin, error: roleErr } = await userClient.rpc("has_role", {
    _user_id: callerId,
    _role: "admin",
  });
  if (roleErr) return json({ error: roleErr.message }, 500);
  if (!isAdmin) return json({ error: "Admin role required" }, 403);

  // Service-role client for privileged reads/writes.
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const action = body?.action;

  if (action === "list") {
    const { data: usersPage, error: listErr } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listErr) return json({ error: listErr.message }, 500);

    const { data: roles, error: rolesErr } = await admin
      .from("user_roles")
      .select("user_id, role");
    if (rolesErr) return json({ error: rolesErr.message }, 500);

    const rolesByUser = new Map<string, AppRole[]>();
    for (const r of roles ?? []) {
      const arr = rolesByUser.get(r.user_id) ?? [];
      arr.push(r.role as AppRole);
      rolesByUser.set(r.user_id, arr);
    }

    const users = (usersPage.users ?? []).map((u) => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      roles: rolesByUser.get(u.id) ?? [],
    }));

    return json({ users, callerId });
  }

  if (action === "grant" || action === "revoke") {
    const targetUserId: string = body?.userId;
    const role: string = body?.role;
    if (!targetUserId || !VALID_ROLES.includes(role as AppRole)) {
      return json({ error: "userId and valid role required" }, 400);
    }

    // Last-admin protection: never allow removing the final admin, and never
    // let an admin revoke their own admin role if they're the only one.
    if (action === "revoke" && role === "admin") {
      const { count, error: countErr } = await admin
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin");
      if (countErr) return json({ error: countErr.message }, 500);
      if ((count ?? 0) <= 1) {
        return json({ error: "Cannot remove the last admin" }, 400);
      }
      if (targetUserId === callerId) {
        return json({ error: "Admins cannot demote themselves" }, 400);
      }
    }

    if (action === "grant") {
      const { error } = await admin
        .from("user_roles")
        .insert({ user_id: targetUserId, role })
        .select()
        .maybeSingle();
      // Ignore unique-violation (role already granted)
      if (error && !/duplicate key|unique/i.test(error.message)) {
        return json({ error: error.message }, 500);
      }
    } else {
      const { error } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", targetUserId)
        .eq("role", role);
      if (error) return json({ error: error.message }, 500);
    }
    return json({ ok: true });
  }

  return json({ error: "Unknown action" }, 400);
});

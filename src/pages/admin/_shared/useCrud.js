import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../integrations/supabase/client';

export function useCrud(table, { orderBy = 'created_at', ascending = false, select = '*' } = {}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .order(orderBy, { ascending });
    if (error) setError(error.message);
    setRows(data || []);
    setLoading(false);
  }, [table, orderBy, ascending, select]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (payload) => {
    setError(null);
    const { error } = await supabase.from(table).insert([payload]);
    if (error) {
      setError(error.message);
      return false;
    }
    setNotice('Created.');
    await load();
    return true;
  };

  const update = async (id, payload) => {
    setError(null);
    const { error } = await supabase.from(table).update(payload).eq('id', id);
    if (error) {
      setError(error.message);
      return false;
    }
    setNotice('Saved.');
    await load();
    return true;
  };

  const remove = async (id) => {
    setError(null);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      setError(error.message);
      return false;
    }
    setNotice('Deleted.');
    await load();
    return true;
  };

  return {
    rows,
    loading,
    error,
    notice,
    setNotice,
    setError,
    reload: load,
    create,
    update,
    remove,
  };
}

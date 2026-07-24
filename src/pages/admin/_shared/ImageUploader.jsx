import React, { useState } from 'react';
import { supabase } from '../../../integrations/supabase/client';

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

/**
 * ImageUploader — uploads an image to the `media` bucket, then stores the
 * resulting URL via `onChange`. Also accepts a pasted URL as a fallback so
 * existing `/images/...` local assets keep working.
 *
 * Props:
 *  - value: current URL (or empty string)
 *  - onChange: (url: string) => void
 *  - folder: subfolder in the bucket (e.g. 'covers', 'avatars')
 *  - label
 */
const ImageUploader = ({ value, onChange, folder = 'uploads', label = 'Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('media')
        .upload(path, file, { cacheControl: '31536000', upsert: false });
      if (upErr) throw upErr;
      const { data, error: signErr } = await supabase.storage
        .from('media')
        .createSignedUrl(path, TEN_YEARS);
      if (signErr) throw signErr;
      onChange(data.signedUrl);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="mb-4">
      <span className="block text-xs tracking-widest uppercase text-ink-soft mb-1">{label}</span>
      <div className="border border-line bg-paper p-3">
        {value ? (
          <div className="flex items-start gap-3">
            <img
              src={value}
              alt=""
              className="w-24 h-24 object-cover border border-line flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ink-soft truncate mb-2" title={value}>{value}</div>
              <div className="flex gap-2 flex-wrap">
                <label className="text-xs tracking-widest uppercase border border-line px-3 py-2 hover:border-gold cursor-pointer">
                  {uploading ? 'Uploading…' : 'Replace'}
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                </label>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="text-xs tracking-widest uppercase border border-line px-3 py-2 hover:border-gold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-xs tracking-widest uppercase bg-emerald-deep text-paper border border-emerald-deep px-4 py-2 hover:bg-emerald-deep/90 cursor-pointer">
              {uploading ? 'Uploading…' : 'Upload image'}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
            </label>
            <span className="text-xs text-ink-soft">or paste a URL below</span>
          </div>
        )}
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className="mt-3 w-full bg-paper border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:border-gold"
        />
        {error && <div className="mt-2 text-xs text-red-700">{error}</div>}
      </div>
    </div>
  );
};

export default ImageUploader;

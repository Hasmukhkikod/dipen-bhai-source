import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
const maxSize = 2 * 1024 * 1024;

function AdminImageUpload({ value, onChange, recommendation = 'Recommended image size: 1200 × 800 px.' }) {
  const { uploadImage } = useContent();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError('');
    if (!allowedTypes.includes(file.type)) {
      setError('Choose a PNG, JPG, or WebP image.');
      return;
    }
    if (file.size > maxSize) {
      setError('Image must be 2 MB or smaller.');
      return;
    }

    setBusy(true);
    try {
      const uploaded = await uploadImage(file);
      onChange(uploaded.url);
    } catch (uploadError) {
      setError(uploadError.message || 'Could not upload the image.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 0.8rem', color: '#FAF8F5', background: '#242424', border: '1px solid rgba(255,255,255,0.12)', cursor: busy ? 'wait' : 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
        <ImagePlus size={15} />
        {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
        <input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={handleChange} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }} />
      </label>
      <small style={{ color: '#8C8A87', fontSize: '0.68rem', lineHeight: 1.4 }}>PNG, JPG, or WebP · max 2 MB · {recommendation}</small>
      {value && <img src={value} alt="Selected image preview" style={{ display: 'block', width: 'min(100%, 240px)', maxHeight: '150px', objectFit: 'contain', objectPosition: 'left center', background: '#FAF8F5', borderRadius: '3px' }} />}
      {error && <span role="alert" style={{ color: '#E48772', fontSize: '0.75rem' }}>{error}</span>}
    </div>
  );
}

export default AdminImageUpload;

import { useState } from 'react';
import { ChevronDown, ChevronUp, ImagePlus, Plus, Save, Trash2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 2 * 1024 * 1024;

function normalizePartners(trustBrands = []) {
  return trustBrands.map((brand, index) => typeof brand === 'string'
    ? { id: `partner-${index}`, name: brand, logoUrl: '' }
    : { id: brand.id || `partner-${index}`, name: brand.name || '', logoUrl: brand.logoUrl || '' });
}

function PartnersManager() {
  const { data, updateProfile, uploadImage } = useContent();
  const [partners, setPartners] = useState(() => normalizePartners(data.profile.trustBrands));
  const [uploadingId, setUploadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function updatePartner(id, changes) {
    setPartners((current) => current.map((partner) => partner.id === id ? { ...partner, ...changes } : partner));
  }

  async function handleFile(id, file) {
    if (!file) return;
    setError('');
    setMessage('');
    if (!imageTypes.includes(file.type)) {
      setError('Choose a PNG, JPG, or WebP image.');
      return;
    }
    if (file.size > maxFileSize) {
      setError('Image must be 2 MB or smaller.');
      return;
    }

    setUploadingId(id);
    try {
      const uploaded = await uploadImage(file);
      updatePartner(id, { logoUrl: uploaded.url });
      setMessage('Logo uploaded. Save changes to publish it.');
    } catch (uploadError) {
      setError(uploadError.message || 'Could not upload the logo.');
    } finally {
      setUploadingId(null);
    }
  }

  async function savePartners(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    const cleanedPartners = partners
      .map((partner) => ({ ...partner, name: partner.name.trim() }))
      .filter((partner) => partner.name);
    try {
      await updateProfile({ ...data.profile, trustBrands: cleanedPartners });
      setPartners(cleanedPartners);
      setMessage('Trusted partners saved.');
    } catch (saveError) {
      setError(saveError.message || 'Could not save trusted partners.');
    }
  }

  async function deletePartner(id) {
    const nextPartners = partners.filter((partner) => partner.id !== id);
    setError('');
    setMessage('');
    setDeletingId(id);
    try {
      await updateProfile({ ...data.profile, trustBrands: nextPartners });
      setPartners(nextPartners);
      setMessage('Partner deleted and saved.');
    } catch (saveError) {
      setError(saveError.message || 'Could not delete the partner.');
    } finally {
      setDeletingId(null);
    }
  }

  function movePartner(index, direction) {
    setPartners((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const reordered = [...current];
      [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
      return reordered;
    });
  }

  function addPartner() {
    setPartners((current) => [...current, { id: `partner-${Date.now()}`, name: '', logoUrl: '' }]);
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '980px' }}>
      <header>
        <h2 style={{ margin: 0, color: '#FAF8F5', fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase' }}>Trusted Partners</h2>
        <p style={{ margin: '0.5rem 0 0', color: '#8C8A87', fontSize: '0.9rem' }}>Manage the partner logos shown above the Projects strip.</p>
      </header>

      <form onSubmit={savePartners} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {partners.map((partner, index) => (
          <article key={partner.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 220px auto', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.08)', background: '#161616' }} className="partner-admin-row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <label htmlFor={`partner-name-${partner.id}`} style={{ color: '#A09E9B', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>Partner name</label>
              <input id={`partner-name-${partner.id}`} value={partner.name} onChange={(event) => updatePartner(partner.id, { name: event.target.value })} placeholder="Company or organization" required style={{ minWidth: 0, padding: '0.75rem', color: '#FAF8F5', background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)' }} />
              <label htmlFor={`partner-file-${partner.id}`} style={{ display: 'inline-flex', width: 'fit-content', alignItems: 'center', gap: '0.45rem', padding: '0.55rem 0.7rem', color: '#FAF8F5', background: '#242424', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                <ImagePlus size={15} />
                {uploadingId === partner.id ? 'Uploading…' : partner.logoUrl ? 'Replace logo' : 'Upload logo'}
              </label>
              <input id={`partner-file-${partner.id}`} type="file" accept="image/png,image/jpeg,image/webp" disabled={uploadingId === partner.id} onChange={(event) => handleFile(partner.id, event.target.files?.[0])} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }} />
              <small style={{ color: '#8C8A87', fontSize: '0.68rem', lineHeight: 1.4 }}>PNG, JPG, or WebP · max 2 MB · recommended 600 × 240 px</small>
            </div>

            <div style={{ display: 'flex', height: '92px', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', background: '#FAF8F5', borderRadius: '4px' }}>
              {partner.logoUrl ? <img src={partner.logoUrl} alt={`${partner.name || 'Partner'} logo preview`} style={{ display: 'block', maxWidth: '100%', maxHeight: '64px', objectFit: 'contain' }} /> : <span style={{ color: '#8C8A87', fontSize: '0.75rem' }}>Logo preview</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <button type="button" title="Move partner up" aria-label="Move partner up" disabled={index === 0} onClick={() => movePartner(index, -1)} style={iconButtonStyle}><ChevronUp size={17} /></button>
              <button type="button" title="Move partner down" aria-label="Move partner down" disabled={index === partners.length - 1} onClick={() => movePartner(index, 1)} style={iconButtonStyle}><ChevronDown size={17} /></button>
              <button type="button" title="Delete partner" aria-label={`Delete ${partner.name || 'partner'}`} disabled={deletingId === partner.id} onClick={() => deletePartner(partner.id)} style={{ ...iconButtonStyle, color: '#E48772' }}><Trash2 size={16} /></button>
            </div>
          </article>
        ))}

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.8rem', paddingTop: '0.5rem' }}>
          <button type="button" onClick={addPartner} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.75rem 1rem', color: '#FAF8F5', background: '#242424', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', fontWeight: 700 }}><Plus size={16} />Add partner</button>
          <button type="submit" className="btn btn-accent" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.8rem 1.2rem' }}><Save size={16} style={{ marginRight: '0.45rem' }} />Save partners</button>
          {message && <span role="status" style={{ color: '#A8C99C', fontSize: '0.8rem' }}>{message}</span>}
          {error && <span role="alert" style={{ color: '#E48772', fontSize: '0.8rem' }}>{error}</span>}
        </div>
      </form>
      <style>{`
        .partner-admin-row button:disabled {
          cursor: default !important;
          opacity: 0.35;
        }
        @media (max-width: 680px) {
          .partner-admin-row {
            grid-template-columns: minmax(0, 1fr) auto !important;
          }
          .partner-admin-row > div:first-child {
            grid-column: 1 / -1;
          }
          .partner-admin-row > div:nth-child(2) {
            grid-column: 1;
            grid-row: 2;
          }
          .partner-admin-row > div:nth-child(3) {
            grid-column: 2;
            grid-row: 2;
            flex-direction: row !important;
            align-self: center;
          }
        }
      `}</style>
    </section>
  );
}

const iconButtonStyle = {
  display: 'grid',
  width: '34px',
  height: '32px',
  placeItems: 'center',
  color: '#C8C5C0',
  background: '#242424',
  border: '1px solid rgba(255,255,255,0.1)',
  cursor: 'pointer',
};

export default PartnersManager;

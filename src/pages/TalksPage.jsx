import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, MapPin, Mic2, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function TalksPage() {
  const { data } = useContent();
  const [selectedTalk, setSelectedTalk] = useState(null);
  const talks = [...(data.talks || [])].sort((first, second) => String(second.date).localeCompare(String(first.date)));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (!selectedTalk) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedTalk(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedTalk]);

  return (
    <div className="talks-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, padding: '1.1rem 0', background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-thin)' }}>
        <div className="container-custom talks-header">
          <a href="#/" aria-label="Navyrix Labs home"><img src="/Navyrix%20logo.png" alt="Navyrix Labs" style={{ display: 'block', width: '86px', height: '58px', objectFit: 'contain' }} /></a>
          <nav aria-label="Journal navigation" style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
            <a href="#/blog" className="talks-nav-link">Writing</a>
            <a href="#/talks" className="talks-nav-link talks-nav-active">Talks</a>
            <a href="#/" className="talks-nav-link">Portfolio</a>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, padding: 'clamp(3.5rem, 8vw, 7rem) 0' }}>
        <div className="container-custom">
          <div style={{ maxWidth: '800px', paddingBottom: '2.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-thin)' }}>
            <span className="talks-eyebrow">Speaking & Knowledge Sharing</span>
            <h1 style={{ margin: '1rem 0 1.2rem', fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.98, fontWeight: 800, textTransform: 'uppercase' }}>
              Ideas in <span className="serif-italic" style={{ color: 'var(--accent-copper)', fontWeight: 300, textTransform: 'lowercase' }}>conversation.</span>
            </h1>
            <p style={{ maxWidth: '620px', margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65 }}>Sessions, lectures, and discussions on connected products, embedded engineering, and building technology that works in the field.</p>
          </div>

          {talks.length ? (
            <div className="talk-card-grid">
              {talks.map((talk, index) => (
                <article key={talk.id} className="talk-card">
                  <button className="talk-card-image-button" onClick={() => setSelectedTalk(talk)} aria-label={`Open full details for ${talk.topic}`}>
                    {talk.image ? <img className="talk-card-image" src={talk.image} alt={`${talk.event}: ${talk.topic}`} /> : <span className="talk-card-placeholder"><Mic2 size={36} strokeWidth={1.2} /><span>{`TALK ${String(index + 1).padStart(2, '0')}`}</span></span>}
                    <span className="talk-image-action">View talk <ArrowUpRight size={15} /></span>
                  </button>
                  <div className="talk-card-copy">
                    <div className="talk-meta"><span><CalendarDays size={14} />{talk.date}</span><span><MapPin size={14} />{talk.event}</span></div>
                    <h2>{talk.topic}</h2>
                    {talk.description && <p>{talk.description}</p>}
                    <button className="talk-details-button" onClick={() => setSelectedTalk(talk)}>Full talk details <ArrowUpRight size={14} /></button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="talks-empty"><Mic2 size={24} strokeWidth={1.4} /><p>Talks and event details will be added here.</p></div>
          )}
        </div>
      </main>

      <footer className="talks-footer">
        <div className="container-custom talks-footer-inner">
          <img src="/Navyrix%20logo.png" alt="Navyrix Labs" />
          <span>© {new Date().getFullYear()} NAVYRIX LABS. ALL RIGHTS RESERVED.</span>
          <a href="https://grovixo.com/" target="_blank" rel="noreferrer">Designed and developed by Grovixo Technohub <ArrowUpRight size={14} /></a>
        </div>
      </footer>

      {selectedTalk && <div className="talk-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedTalk(null); }}>
        <section className="talk-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="talk-detail-title">
          <button className="talk-detail-close" onClick={() => setSelectedTalk(null)} aria-label="Close talk details"><X size={20} /></button>
          <div className="talk-detail-image-wrap">
            {selectedTalk.image ? <img src={selectedTalk.image} alt={`${selectedTalk.event}: ${selectedTalk.topic}`} /> : <div className="talk-detail-placeholder"><Mic2 size={42} strokeWidth={1.2} /><span>{`NAVYRIX LABS · SPEAKING`}</span></div>}
          </div>
          <div className="talk-detail-content">
            <div className="talk-meta"><span><CalendarDays size={14} />{selectedTalk.date}</span><span><MapPin size={14} />{selectedTalk.event}</span></div>
            <h2 id="talk-detail-title">{selectedTalk.topic}</h2>
            <p>{selectedTalk.description || `A talk by Dipen Parmar at ${selectedTalk.event}, sharing practical perspectives on product engineering and connected technology.`}</p>
          </div>
        </section>
      </div>}

      <style>{`
        .talks-header, .talks-footer-inner { display:flex; align-items:center; justify-content:space-between; gap:1.25rem; }
        .talks-nav-link { color:var(--text-secondary); text-decoration:none; font-size:.76rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; }
        .talks-nav-active, .talks-nav-link:hover { color:var(--accent-copper); }
        .talks-eyebrow { color:var(--text-secondary); font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.14em; }
        .talk-card-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1.5rem; }
        .talk-card { min-width:0; overflow:hidden; background:var(--bg-secondary); border:1px solid var(--border-thin); transition:transform .25s ease,border-color .25s ease; }
        .talk-card:hover { transform:translateY(-3px); border-color:var(--accent-copper); }
        .talk-card-image-button { position:relative; display:block; width:100%; padding:.75rem; overflow:hidden; aspect-ratio:1.75; border:0; background:#e9e3df; cursor:pointer; text-align:left; }
        .talk-card-image { display:block; width:100%; height:100%; object-fit:contain; object-position:center; }
        .talk-card-placeholder,.talk-detail-placeholder { display:flex; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; gap:.6rem; color:var(--accent-copper); background:linear-gradient(135deg,var(--bg-secondary),#e7dfd9); }
        .talk-card-placeholder span,.talk-detail-placeholder span { color:var(--text-secondary); font-size:.68rem; font-weight:800; letter-spacing:.14em; }
        .talk-image-action { position:absolute; right:.8rem; bottom:.8rem; display:inline-flex; align-items:center; gap:.35rem; padding:.5rem .65rem; color:var(--text-primary); background:rgba(250,248,245,.94); font-size:.68rem; font-weight:800; text-transform:uppercase; }
        .talk-card-copy { display:flex; min-height:190px; flex-direction:column; align-items:flex-start; gap:.85rem; padding:1.25rem 1.35rem; }
        .talk-card-copy h2 { margin:0; font-size:clamp(1.05rem,1.7vw,1.35rem); line-height:1.25; font-weight:800; text-transform:uppercase; }
        .talk-card-copy p { margin:0; color:var(--text-secondary); font-size:.88rem; line-height:1.55; }
        .talk-details-button { display:inline-flex; align-items:center; gap:.4rem; margin-top:auto; padding:.5rem 0 0; border:0; background:none; color:var(--accent-copper); font-size:.72rem; font-weight:800; text-transform:uppercase; cursor:pointer; }
        .talk-meta { display:flex; flex-wrap:wrap; gap:.55rem 1.25rem; color:var(--text-secondary); font-size:.78rem; }
        .talk-meta span { display:inline-flex; align-items:center; gap:.4rem; }
        .talk-meta svg { flex:0 0 auto; color:var(--accent-copper); }
        .talk-detail-backdrop { position:fixed; inset:0; z-index:200; display:grid; place-items:center; padding:clamp(1rem,4vw,3rem); background:rgba(18,18,18,.76); backdrop-filter:blur(5px); }
        .talk-detail-dialog { position:relative; display:grid; grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr); width:min(1060px,100%); max-height:min(88vh,850px); overflow:auto; background:var(--bg-primary); box-shadow:0 24px 80px rgba(0,0,0,.3); animation:talk-detail-in .22s ease-out both; }
        .talk-detail-close { position:absolute; top:.8rem; right:.8rem; z-index:2; display:grid; width:40px; height:40px; place-items:center; border:1px solid var(--border-thin); background:var(--bg-primary); color:var(--text-primary); cursor:pointer; }
        .talk-detail-image-wrap { display:flex; min-width:0; min-height:360px; max-height:75vh; align-items:center; justify-content:center; overflow:hidden; background:var(--bg-secondary); }
        .talk-detail-image-wrap img { display:block; width:100%; height:100%; max-height:75vh; object-fit:contain; object-position:center; }
        .talk-detail-content { display:flex; flex-direction:column; justify-content:center; gap:1.1rem; padding:clamp(1.5rem,4vw,3rem); }
        .talk-detail-content h2 { margin:0; font-size:clamp(1.5rem,3vw,2.4rem); line-height:1.12; font-weight:850; text-transform:uppercase; }
        .talk-detail-content p { margin:0; color:var(--text-secondary); font-size:1rem; line-height:1.75; white-space:pre-line; }
        @keyframes talk-detail-in { from { opacity:0; transform:translateY(8px) scale(.99); } to { opacity:1; transform:translateY(0) scale(1); } }
        .talks-empty { min-height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.8rem; color:var(--text-secondary); border-bottom:1px solid var(--border-thin); text-align:center; }
        .talks-empty p { margin:0; }
        .talks-footer { border-top:1px solid var(--border-thin); padding:1.5rem 0; background:var(--bg-secondary); color:var(--text-secondary); font-size:.72rem; }
        .talks-footer-inner img { width:92px; height:56px; object-fit:contain; }
        .talks-footer-inner a { display:inline-flex; align-items:center; gap:.35rem; color:var(--text-primary); text-decoration:none; font-weight:700; }
        @media(max-width:760px) { .talk-card-grid { grid-template-columns:1fr; } .talk-detail-dialog { grid-template-columns:1fr; max-width:560px; } .talk-detail-image-wrap { min-height:0; height:min(42vh,360px); } .talk-detail-image-wrap img { height:100%; max-height:100%; } .talk-detail-content { padding:1.35rem; } }
        @media(max-width:640px) { .talks-header { align-items:center; } .talks-header nav { gap:.75rem !important; } .talks-nav-link { font-size:.65rem; } .talks-footer-inner { flex-direction:column; align-items:flex-start; } }
        @media(prefers-reduced-motion:reduce) { .talk-card,.talk-card-image,.talk-detail-dialog { animation:none !important; transition:none !important; } }
      `}</style>
    </div>
  );
}

export default TalksPage;

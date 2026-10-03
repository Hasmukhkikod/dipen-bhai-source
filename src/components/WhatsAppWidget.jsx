import { useContent } from '../context/ContentContext';

function WhatsAppWidget() {
  const { data } = useContent();
  const phone = String(data.settings?.contactPhone || '').replace(/\D/g, '');
  if (!phone) return null;

  const message = encodeURIComponent('Hello Navyrix Labs, I would like to discuss a product engineering project.');
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a className="whatsapp-widget" href={href} target="_blank" rel="noreferrer" aria-label="Chat with Navyrix Labs on WhatsApp" title="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M16.04 3C8.87 3 3.04 8.78 3.04 15.91c0 2.28.6 4.5 1.75 6.47L3 29l6.82-1.78a13.1 13.1 0 0 0 6.22 1.57h.01c7.17 0 13-5.79 13-12.91A12.8 12.8 0 0 0 25.2 6.7 12.93 12.93 0 0 0 16.04 3Zm0 23.58h-.01a10.9 10.9 0 0 1-5.55-1.51l-.4-.24-4.05 1.06 1.08-3.93-.26-.4a10.7 10.7 0 0 1-1.67-5.65c0-5.98 4.88-10.85 10.88-10.85 2.9 0 5.62 1.13 7.67 3.17a10.75 10.75 0 0 1 3.18 7.66c0 5.99-4.88 10.85-10.87 10.85Zm5.97-8.13c-.33-.16-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.26-.64-.53-.55-.73-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.74 0 1.62 1.18 3.19 1.34 3.41.16.22 2.31 3.52 5.6 4.93.78.33 1.39.53 1.86.68.78.25 1.5.22 2.06.13.63-.09 1.95-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z" />
      </svg>
      <span>Chat on WhatsApp</span>
      <style>{`
        .whatsapp-widget {
          position: fixed;
          right: max(22px, env(safe-area-inset-right));
          bottom: max(22px, env(safe-area-inset-bottom));
          z-index: 90;
          display: inline-flex;
          min-height: 54px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 18px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 999px;
          background: #168a55;
          color: #fff;
          box-shadow: 0 8px 24px rgba(0,0,0,.2);
          font: 700 13px/1 var(--font-sans);
          text-decoration: none;
          transition: background .18s ease, transform .18s ease, box-shadow .18s ease;
        }
        .whatsapp-widget:hover { background:#117646; transform:translateY(-2px); box-shadow:0 11px 28px rgba(0,0,0,.24); }
        .whatsapp-widget:focus-visible { outline:3px solid #fff; outline-offset:3px; }
        .whatsapp-widget svg { width:25px; height:25px; flex:0 0 25px; }
        @media(max-width:600px) {
          .whatsapp-widget { right:max(16px, env(safe-area-inset-right)); bottom:max(16px, env(safe-area-inset-bottom)); width:54px; min-height:54px; padding:0; }
          .whatsapp-widget span { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; }
        }
        @media(prefers-reduced-motion:reduce) { .whatsapp-widget { transition:none; } }
      `}</style>
    </a>
  );
}

export default WhatsAppWidget;

import { ShieldAlert } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function Footer() {
  let {
      data: e
    } = useContent(),
    t = e.profile;
  e.settings;
  return <footer style={{
    backgroundColor: `var(--bg-dark)`,
    color: `var(--text-light-secondary)`,
    borderTop: `1px solid var(--border-thin-dark)`,
    padding: `5rem 0 3rem 0`
  }} className="admin-theme">
      <div className="container-custom">
        <div style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `flex-start`,
        flexWrap: `wrap`,
        gap: `3rem`,
        paddingBottom: `4rem`,
        borderBottom: `1px solid var(--border-thin-dark)`
      }} className="footer-top">
          <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `0.8rem`
        }}>
            <img src="/Navyrix%20logo%20footer.png" alt="Navyrix Labs" style={{ display: `block`, width: `min(220px, 100%)`, height: `auto`, objectFit: `contain`, objectPosition: `left center` }} />
            <p style={{
            fontSize: `0.9rem`,
            color: `var(--text-light-secondary)`,
            margin: 0,
            maxWidth: `320px`,
            marginTop: `0.4rem`
          }}>
              {t.roleDescription}
            </p>
            <span style={{
            fontSize: `0.78rem`,
            color: `var(--text-light-secondary)`,
            marginTop: `0.2rem`
          }}>{`Lead Architect & Owner: Dipen Parmar`}</span>
          </div>
          <div style={{
          display: `flex`,
          gap: `4rem`
        }} className="footer-links-grid">
            <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.8rem`
          }}>
              <span style={{
              fontSize: `0.7rem`,
              fontWeight: 800,
              color: `var(--text-light)`,
              textTransform: `uppercase`,
              letterSpacing: `0.1em`
            }}>{`Navigation`}</span>
              <a href="#about" style={{
              fontSize: `0.85rem`
            }} className="nav-link">{`About`}</a>
              <a href="#expertise" style={{
              fontSize: `0.85rem`
            }} className="nav-link">{`Expertise`}</a>
              <a href="#work" style={{
              fontSize: `0.85rem`
            }} className="nav-link">{`Work Case Studies`}</a>
            </div>
            <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.8rem`
          }}>
              <span style={{
              fontSize: `0.7rem`,
              fontWeight: 800,
              color: `var(--text-light)`,
              textTransform: `uppercase`,
              letterSpacing: `0.1em`
            }}>{`Chronicles`}</span>
              <a href="#journey" style={{
              fontSize: `0.85rem`
            }} className="nav-link">{`Career Timeline`}</a>
              <a href="#/blog" style={{
              fontSize: `0.85rem`
            }} className="nav-link">{`Insights & Journal`}</a>
              <a href="#contact" style={{
              fontSize: `0.85rem`
            }} className="nav-link">{`Discovery Call`}</a>
            </div>
          </div>
        </div>
        <div style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        flexWrap: `wrap`,
        gap: `1.5rem`,
        paddingTop: `2.5rem`,
        fontSize: `0.8rem`,
        color: `var(--text-light-secondary)`
      }} className="footer-bottom">
          <span>
            {`© `}
            {new Date().getFullYear()}
            {` NAVYRIX LABS. ALL RIGHTS RESERVED.`}
          </span>
          <span style={{ fontSize: `0.8rem` }}>
            {`Designed and developed by `}
            <a href="https://grovixo.com/" target="_blank" rel="noreferrer" className="nav-link" style={{ color: `var(--text-light)`, fontWeight: 700 }}>
              {`Grovixo Technohub`}
            </a>
          </span>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .footer-top {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .footer-links-grid {
            gap: 2.5rem !important;
            flex-wrap: wrap;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>;
}

export default Footer;
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Logo from './Logo';

function Header() {
  let [e, t] = useState(!1),
    [n, r] = useState(!1),
    {
      data: i
    } = useContent();
  i.profile;
  useEffect(() => {
    e ? document.body.style.overflow = `hidden` : document.body.style.overflow = ``;
    return () => {
      document.body.style.overflow = ``;
    };
  }, [e]);
  useEffect(() => {
    let e = () => {
      window.scrollY > 50 ? r(!0) : r(!1);
    };
    window.addEventListener(`scroll`, e);
    return () => window.removeEventListener(`scroll`, e);
  }, []);
  let a = [{
    label: `About`,
    href: `#about`
  }, {
    label: `Expertise`,
    href: `#expertise`
  }, {
    label: `Work`,
    href: `#work`
  }, {
    label: `Blog`,
    href: `#/blog`
  }, {
    label: `Contact`,
    href: `#contact`
  }];
  return <>
      <nav style={{
      position: `fixed`,
      top: 0,
      left: 0,
      right: 0,
      height: `var(--header-height)`,
      backgroundColor: n ? `rgba(250, 248, 245, 0.85)` : `transparent`,
      backdropFilter: n ? `blur(12px)` : `none`,
      borderBottom: n ? `1px solid var(--border-thin)` : `1px solid transparent`,
      zIndex: 100,
      transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
      display: `flex`,
      alignItems: `center`
    }}>
        <div className="container-custom" style={{
        width: `100%`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`
      }}>
          <a href="#/" style={{
          textDecoration: `none`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`
        }}>
            <Logo size={136} showText={!1} />
          </a>
          <div style={{
          display: `flex`,
          alignItems: `center`,
          gap: `2.5rem`
        }} className="desktop-only">
            <div style={{
            display: `flex`,
            gap: `2rem`
          }}>
              {a.map(e => <a key={e.label} href={e.href} className="nav-link">
                  {e.label}
                </a>)}
            </div>
            <a href="#contact" className="btn btn-primary" style={{
            padding: `0.6rem 1.2rem`,
            fontSize: `0.75rem`,
            letterSpacing: `0.08em`,
            borderRadius: `0`
          }}>
              {`BOOK A DISCOVERY CALL`}
              <ArrowUpRight size={14} className="btn-icon" />
            </a>
          </div>
          <button onClick={() => t(!e)} style={{
          background: `none`,
          border: `none`,
          cursor: `pointer`,
          color: `var(--text-primary)`,
          display: `none`,
          position: `relative`,
          zIndex: 101
        }} className="mobile-toggle-btn">
            {e ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {e && <div style={{
      position: `fixed`,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `var(--bg-primary)`,
      zIndex: 99,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      alignItems: `center`,
      padding: `2rem`,
      animation: `fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
    }}>
          <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `2.5rem`,
        alignItems: `center`,
        marginBottom: `4rem`
      }}>
            {a.map(e => <a key={e.label} href={e.href} onClick={() => t(!1)} style={{
          fontSize: `2rem`,
          fontWeight: 700,
          letterSpacing: `-0.02em`,
          color: `var(--text-primary)`
        }}>
                {e.label}
              </a>)}
          </div>
          <a href="#contact" onClick={() => t(!1)} className="btn btn-primary" style={{
        width: `100%`,
        maxWidth: `300px`,
        padding: `1.2rem`
      }}>
            {`BOOK A DISCOVERY CALL`}
            <ArrowUpRight size={16} className="btn-icon" />
          </a>
        </div>}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </>;
}

export default Header;
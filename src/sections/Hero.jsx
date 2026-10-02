import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function Hero() {
  let {
      data: e
    } = useContent(),
    t = e.profile;
  return <section style={{
    minHeight: `100vh`,
    display: `flex`,
    alignItems: `center`,
    paddingTop: `var(--header-height)`,
    paddingBottom: `4rem`,
    backgroundColor: `var(--bg-primary)`,
    position: `relative`,
    borderBottom: `1px solid var(--border-thin)`,
    overflow: `hidden`
  }}>
      <div style={{
      position: `absolute`,
      top: `15%`,
      left: `10%`,
      width: `350px`,
      height: `350px`,
      borderRadius: `50%`,
      background: `radial-gradient(circle, rgba(193, 92, 61, 0.08) 0%, rgba(250, 248, 245, 0) 70%)`,
      filter: `blur(80px)`,
      zIndex: 0,
      pointerEvents: `none`
    }} className="ambient-pulse-slow" />
      <div style={{
      position: `absolute`,
      bottom: `20%`,
      right: `15%`,
      width: `400px`,
      height: `400px`,
      borderRadius: `50%`,
      background: `radial-gradient(circle, rgba(61, 100, 78, 0.06) 0%, rgba(250, 248, 245, 0) 70%)`,
      filter: `blur(90px)`,
      zIndex: 0,
      pointerEvents: `none`
    }} className="ambient-pulse-delayed" />
      <div className="container-custom" style={{
      width: `100%`,
      position: `relative`,
      zIndex: 1
    }}>
        <div className="hero-layout" style={{
        display: `grid`,
        gridTemplateColumns: `1fr 1fr`,
        gap: `4rem`,
        alignItems: `center`
      }}>
          <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `2.5rem`
        }} className="fade-in-up">
            <h1 style={{
            fontSize: `clamp(2.5rem, 4.8vw, 4.5rem)`,
            lineHeight: `1.0`,
            fontWeight: 800,
            color: `var(--text-primary)`,
            textTransform: `uppercase`
          }}>
              {`Engineering `}
              <br />
              {`Ideas Into `}
              <span className="serif-italic" style={{
              textTransform: `lowercase`,
              fontWeight: 300,
              color: `var(--accent-copper)`
            }}>{`products`}</span>
              {` `}
              <br />
              {`That `}
              <span style={{
              fontWeight: 300
            }}>{`Ship.`}</span>
            </h1>
            <p style={{
            fontSize: `clamp(1.1rem, 2vw, 1.4rem)`,
            lineHeight: `1.5`,
            maxWidth: `620px`,
            color: `var(--text-secondary)`
          }}>
              {t.shortBio}
            </p>
            <div style={{
            display: `flex`,
            flexWrap: `wrap`,
            gap: `1.5rem`
          }}>
              <a href="#contact" className="btn btn-accent" style={{
              padding: `1.2rem 2.4rem`
            }}>
                {`BOOK A DISCOVERY CALL`}
                <ArrowUpRight size={18} className="btn-icon" />
              </a>
              <a href="#work" className="btn btn-secondary" style={{
              padding: `1.2rem 2.4rem`
            }}>
                {`EXPLORE OUR WORK`}
                <ArrowDown size={18} className="btn-icon" style={{
                marginLeft: `0.5rem`
              }} />
              </a>
            </div>
            <div style={{
            borderTop: `1px solid var(--border-thin)`,
            paddingTop: `2rem`,
            marginTop: `1.5rem`,
            display: `flex`,
            flexWrap: `wrap`,
            gap: `1rem 2rem`
          }}>
              <div style={{
              display: `flex`,
              flexDirection: `column`
            }}>
                
              </div>
              <div style={{
              display: `flex`,
              flexDirection: `column`
            }}>
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 700,
                color: `var(--text-secondary)`,
                textTransform: `uppercase`,
                letterSpacing: `0.1em`
              }}>{`Core Sectors`}</span>
                <span style={{
                fontSize: `0.9rem`,
                fontWeight: 600,
                color: `var(--text-primary)`,
                marginTop: `0.2rem`
              }}>{`Industrial, Smart Grid & Agritech`}</span>
              </div>
              <div style={{
              display: `flex`,
              flexDirection: `column`
            }}>
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 700,
                color: `var(--text-secondary)`,
                textTransform: `uppercase`,
                letterSpacing: `0.1em`
              }}>{`Focus`}</span>
                <span style={{
                fontSize: `0.9rem`,
                fontWeight: 600,
                color: `var(--text-primary)`,
                marginTop: `0.2rem`
              }}>{`Concept → Mass Production`}</span>
              </div>
            </div>
          </div>
          <div className="hero-portrait-container" style={{
          position: `relative`,
          width: `100%`,
          aspectRatio: `0.85`,
          backgroundColor: `var(--bg-secondary)`,
          border: `1px solid var(--border-thin)`,
          padding: `1.5rem`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`
        }}>
            <div style={{
            width: `100%`,
            height: `100%`,
            overflow: `hidden`,
            backgroundColor: `var(--bg-primary)`,
            position: `relative`
          }}>
              <img src={t.avatarUrl} alt={t.fullName} style={{
              width: `100%`,
              height: `100%`,
              objectFit: `cover`,
              display: `block`
            }} />
              <div style={{
              position: `absolute`,
              bottom: `1rem`,
              left: `1rem`,
              backgroundColor: `rgba(18, 18, 18, 0.95)`,
              color: `var(--text-light)`,
              padding: `0.5rem 1rem`,
              fontSize: `0.65rem`,
              fontWeight: 700,
              letterSpacing: `0.1em`,
              textTransform: `uppercase`,
              display: `flex`,
              alignItems: `center`,
              gap: `0.5rem`
            }}>
                <span style={{
                width: `6px`,
                height: `6px`,
                backgroundColor: `var(--accent-copper)`,
                borderRadius: `50%`,
                display: `inline-block`
              }} />
                {t.fullName}
                {` / Anand, IND`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .hero-layout {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-portrait-container {
            max-width: 500px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>;
}

export default Hero;
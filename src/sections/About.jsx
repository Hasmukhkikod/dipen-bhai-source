import { Globe } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function About() {
  let {
      data: e
    } = useContent(),
    t = e.profile;
  return <section id="about" style={{
    backgroundColor: `var(--bg-primary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`,
    position: `relative`,
    overflow: `hidden`
  }} className="reveal-border-top">
      <svg style={{
      position: `absolute`,
      right: `-5%`,
      top: `10%`,
      opacity: 0.04,
      pointerEvents: `none`,
      zIndex: 0
    }} width="450" height="450" viewBox="0 0 100 100">
        <circle cx="20" cy="20" r="3" fill="none" stroke="var(--text-primary)" strokeWidth="0.8" />
        <path d="M20 20 H50 L60 40 V70" stroke="var(--text-primary)" strokeWidth="0.5" fill="none" />
        <circle cx="60" cy="70" r="2" fill="var(--accent-copper)" />
        <circle cx="50" cy="40" r="1.5" fill="none" stroke="var(--text-primary)" strokeWidth="0.8" />
        <path d="M50 40 L30 60 H10" stroke="var(--text-primary)" strokeWidth="0.5" fill="none" />
        <circle cx="10" cy="60" r="2" fill="var(--text-primary)" />
        <rect x="35" y="45" width="20" height="20" stroke="var(--text-primary)" strokeWidth="0.8" fill="none" />
        <line x1="35" y1="49" x2="31" y2="49" stroke="var(--text-primary)" strokeWidth="0.6" />
        <line x1="35" y1="55" x2="31" y2="55" stroke="var(--text-primary)" strokeWidth="0.6" />
        <line x1="35" y1="61" x2="31" y2="61" stroke="var(--text-primary)" strokeWidth="0.6" />
        <line x1="55" y1="49" x2="59" y2="49" stroke="var(--text-primary)" strokeWidth="0.6" />
        <line x1="55" y1="55" x2="59" y2="55" stroke="var(--text-primary)" strokeWidth="0.6" />
        <line x1="55" y1="61" x2="59" y2="61" stroke="var(--text-primary)" strokeWidth="0.6" />
        <path d="M45 45 V30 H35" stroke="var(--text-primary)" strokeWidth="0.5" fill="none" />
        <circle cx="35" cy="30" r="1.5" fill="var(--accent-copper)" />
      </svg>
      <div className="container-custom" style={{
      position: `relative`,
      zIndex: 1
    }}>
        <div className="editorial-grid" style={{
        borderTop: `none`,
        paddingTop: 0,
        gap: `0`
      }}>
          <div style={{
          gridColumn: `span 4`,
          paddingRight: `3rem`,
          position: `sticky`,
          top: `80px`,
          alignSelf: `start`
        }} className="about-left-col">
            <span style={{
            fontSize: `0.9rem`,
            fontWeight: 800,
            color: `var(--text-secondary)`,
            textTransform: `uppercase`,
            letterSpacing: `0.14em`,
            display: `block`,
            marginBottom: `2rem`
          }} className="reveal-element">{`01 / BIO SUMMARY`}</span>
            <h2 style={{
            fontSize: `clamp(2.4rem, 3.5vw, 3.5rem)`,
            lineHeight: `1.1`,
            fontWeight: 800,
            textTransform: `uppercase`,
            color: `var(--text-primary)`,
            margin: 0
          }}>
              <div className="reveal-text-line">
                <span>{`Two Decades Of`}</span>
              </div>
              <div className="reveal-text-line">
                <span className="serif-italic" style={{
                textTransform: `lowercase`,
                fontWeight: 300,
                color: `var(--accent-copper)`,
                transitionDelay: `0.15s`
              }}>{`engineering discipline.`}</span>
              </div>
              <div className="reveal-text-line">
                <span style={{
                transitionDelay: `0.3s`
              }}>{`One Partner For Product Execution.`}</span>
              </div>
            </h2>
          </div>
          <div style={{
          gridColumn: `span 8`,
          display: `flex`,
          flexDirection: `column`,
          gap: `2.5rem`,
          paddingLeft: `3rem`
        }} className="about-right-col reveal-border-left reveal-element reveal-delay-1">
            <p style={{
            fontSize: `clamp(1.25rem, 2.5vw, 1.75rem)`,
            lineHeight: `1.4`,
            color: `var(--text-primary)`,
            fontWeight: 500,
            maxWidth: `800px`,
            margin: 0
          }}>
              {t.aboutIntro}
            </p>
            <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`,
            marginTop: `1rem`
          }} className="about-bullets">
              <div className="about-card reveal-element reveal-delay-1">
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 700,
                color: `var(--text-secondary)`,
                textTransform: `uppercase`,
                letterSpacing: `0.08em`,
                display: `block`,
                marginBottom: `0.6rem`
              }}>{`01 // EMBEDDED FIRMWARE`}</span>
                <h4 style={{
                fontSize: `1.1rem`,
                fontWeight: 850,
                marginBottom: `0.75rem`,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                letterSpacing: `-0.01em`
              }}>{`Embedded Hardware Depth`}</h4>
                <p style={{
                fontSize: `0.9rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Started hands-on with device drivers, kernel BSP customizations, and low-level C programming. Spent years optimizing Qualcomm Snapdragon mobile and System Level Solutions IoT platforms.`}</p>
              </div>
              <div className="about-card reveal-element reveal-delay-2">
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 700,
                color: `var(--text-secondary)`,
                textTransform: `uppercase`,
                letterSpacing: `0.08em`,
                display: `block`,
                marginBottom: `0.6rem`
              }}>{`02 // CONNECTIVITY SYSTEMS`}</span>
                <h4 style={{
                fontSize: `1.1rem`,
                fontWeight: 850,
                marginBottom: `0.75rem`,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                letterSpacing: `-0.01em`
              }}>{`Scaled Smart Infrastructure`}</h4>
                <p style={{
                fontSize: `0.9rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Architected large scale communication layers for Smart Utility Grids (UK Smart Metering rollout) and wireless mesh technologies for municipal Smart Cities.`}</p>
              </div>
              <div className="about-card reveal-element reveal-delay-3">
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 700,
                color: `var(--text-secondary)`,
                textTransform: `uppercase`,
                letterSpacing: `0.08em`,
                display: `block`,
                marginBottom: `0.6rem`
              }}>{`03 // SUSTAINABLE IoT`}</span>
                <h4 style={{
                fontSize: `1.1rem`,
                fontWeight: 850,
                marginBottom: `0.75rem`,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                letterSpacing: `-0.01em`
              }}>{`Agritech Entrepreneurship`}</h4>
                <p style={{
                fontSize: `0.9rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Fusing agriculture with IoT. Developing edge sensors for livestock and crop metrics tracking, proving that hardware can make an ecological and commercial impact.`}</p>
              </div>
              <div className="about-card reveal-element reveal-delay-4">
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 700,
                color: `var(--text-secondary)`,
                textTransform: `uppercase`,
                letterSpacing: `0.08em`,
                display: `block`,
                marginBottom: `0.6rem`
              }}>{`04 // INCUBATION MENTORSHIP`}</span>
                <h4 style={{
                fontSize: `1.1rem`,
                fontWeight: 850,
                marginBottom: `0.75rem`,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                letterSpacing: `-0.01em`
              }}>{`Startup Mentorship`}</h4>
                <p style={{
                fontSize: `0.9rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Mentoring early hardware innovators through i-Hub Gujarat and Sardar Patel SEC. Offering product architecture reviews, manufacturing path guidance, and team building frameworks.`}</p>
              </div>
            </div>
            <div className="about-card reveal-element reveal-delay-4" style={{
            marginTop: `1.5rem`,
            display: `flex`,
            gap: `1.5rem`,
            alignItems: `center`
          }}>
              <div style={{
              width: `50px`,
              height: `50px`,
              backgroundColor: `var(--bg-secondary)`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              flexShrink: 0
            }} className="globe-container">
                <Globe size={24} style={{
                color: `var(--accent-copper)`
              }} className="spin-slow" />
              </div>
              <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.2rem`
            }}>
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 800,
                color: `var(--accent-copper)`,
                letterSpacing: `0.1em`,
                textTransform: `uppercase`
              }}>{`International Business Exposure`}</span>
                <p style={{
                color: `var(--text-secondary)`,
                fontSize: `0.92rem`,
                margin: 0,
                lineHeight: `1.4`
              }}>{`Driven technology engagements, customer support, and commercial expansions across the United Kingdom, European Union, Japan, China, UAE, and Oman.`}</p>
              </div>
            </div>
          </div>
          <div style={{
          marginTop: `5rem`,
          borderTop: `1px solid var(--border-thin)`,
          paddingTop: `3.5rem`,
          gridColumn: `span 12`,
          zIndex: 1,
          position: `relative`
        }} className="reveal-element reveal-delay-2">
            <span style={{
            fontSize: `0.7rem`,
            fontWeight: 800,
            color: `var(--accent-copper)`,
            textTransform: `uppercase`,
            letterSpacing: `0.12em`,
            display: `block`,
            marginBottom: `2rem`
          }}>{`Connected Ventures & Affiliations`}</span>
            <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
            gap: `2.5rem`
          }} className="ventures-grid">
              {e.ventures && e.ventures.map(e => <div key={e.id} style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.6rem`,
              borderLeft: `1px solid var(--border-thin)`,
              paddingLeft: `1.5rem`,
              position: `relative`
            }} className="venture-card">
                    <div style={{
                position: `absolute`,
                left: `-1px`,
                top: `0`,
                width: `2px`,
                height: `24px`,
                backgroundColor: `var(--accent-copper)`
              }} />
                    <div style={{
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`
              }}>
                      <h4 style={{
                  fontSize: `1rem`,
                  fontWeight: 800,
                  color: `var(--text-primary)`,
                  margin: 0,
                  textTransform: `uppercase`
                }}>
                        {e.name}
                      </h4>
                      <span style={{
                  fontSize: `0.6rem`,
                  fontWeight: 750,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.06em`,
                  backgroundColor: `var(--bg-secondary)`,
                  padding: `2px 8px`
                }}>
                        {e.status}
                      </span>
                    </div>
                    <p style={{
                fontSize: `0.86rem`,
                color: `var(--text-secondary)`,
                lineHeight: `1.45`,
                margin: 0
              }}>
                      {e.desc}
                    </p>
                    {e.website && <span style={{
                fontSize: `0.75rem`,
                color: `var(--accent-copper)`,
                fontWeight: 700
              }}>
                        {e.website}
                      </span>}
                  </div>)}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .about-left-col, .about-right-col {
            grid-column: span 12 !important;
          }
          .about-left-col {
            padding-right: 0 !important;
            margin-bottom: 3rem;
            position: relative !important;
            top: 0 !important;
          }
          .about-right-col {
            padding-left: 0 !important;
          }
          .reveal-border-left::after {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .ventures-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          .about-bullets {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>;
}

export default About;
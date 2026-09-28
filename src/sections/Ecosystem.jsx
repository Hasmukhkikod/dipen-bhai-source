import { Award, BookOpen, Cpu, Network, ShieldCheck, Target, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function Ecosystem() {
  let {
      data: e
    } = useContent(),
    t = e.ecosystem,
    n = [<Users size={18} style={{
      color: `var(--accent-copper)`
    }} />, <Target size={18} style={{
      color: `var(--accent-copper)`
    }} />, <Award size={18} style={{
      color: `var(--accent-copper)`
    }} />, <BookOpen size={18} style={{
      color: `var(--accent-copper)`
    }} />];
  return <section style={{
    backgroundColor: `var(--bg-secondary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`
  }}>
      <div className="container-custom">
        <div className="editorial-grid animate-fade-in" style={{
        borderTop: `none`,
        paddingTop: 0
      }}>
          <div style={{
          gridColumn: `span 4`,
          display: `flex`,
          flexDirection: `column`,
          gap: `1.5rem`
        }} className="eco-left">
            <span style={{
            fontSize: `0.75rem`,
            fontWeight: 700,
            color: `var(--text-secondary)`,
            textTransform: `uppercase`,
            letterSpacing: `0.12em`
          }}>{`03 / THE PRODUCT ECOSYSTEM`}</span>
            <h2 style={{
            fontSize: `clamp(2.5rem, 4vw, 4.2rem)`,
            fontWeight: 800,
            textTransform: `uppercase`,
            color: `var(--text-primary)`,
            lineHeight: `1.05`
          }}>
              {t.headline}
            </h2>
            <p style={{
            fontSize: `1.15rem`,
            color: `var(--text-primary)`,
            fontWeight: 500,
            lineHeight: `1.5`,
            maxWidth: `380px`
          }}>
              {t.subheading}
            </p>
            <div style={{
            marginTop: `2rem`,
            borderLeft: `2px solid var(--accent-copper)`,
            paddingLeft: `1.5rem`,
            fontSize: `0.9rem`,
            color: `var(--text-secondary)`,
            maxWidth: `350px`
          }}>{`"Guiding products from lab testing to real-world deployment requires startup understanding, regulatory validation, and investor pitch readiness."`}</div>
          </div>
          <div style={{
          gridColumn: `span 8`
        }} className="eco-right">
            <div className="split-grid" style={{
            display: `grid`,
            gridTemplateColumns: `1.1fr 1fr`,
            gap: `3rem`,
            alignItems: `start`
          }}>
              <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `1.8rem`
            }}>
                <div style={{
                borderBottom: `1px solid var(--border-thin)`,
                paddingBottom: `0.8rem`
              }}>
                  <span style={{
                  fontSize: `0.7rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.08em`
                }}>{`1) Technical Services`}</span>
                </div>
                <div style={{
                display: `flex`,
                gap: `1.2rem`
              }}>
                  <div style={{
                  width: `38px`,
                  height: `38px`,
                  backgroundColor: `rgba(193, 92, 61, 0.06)`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  flexShrink: 0
                }}>
                    <Cpu size={18} style={{
                    color: `var(--accent-copper)`
                  }} />
                  </div>
                  <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.4rem`
                }}>
                    <h4 style={{
                    fontSize: `0.95rem`,
                    fontWeight: 750,
                    color: `var(--text-primary)`,
                    margin: 0,
                    textTransform: `uppercase`
                  }}>{`Embedded Firmware Architecture`}</h4>
                    <p style={{
                    fontSize: `0.86rem`,
                    lineHeight: `1.45`,
                    color: `var(--text-secondary)`,
                    margin: 0
                  }}>{`Design and optimization of secure firmware, microcontrollers, driver integration, and custom kernel Board Support Packages (BSP).`}</p>
                  </div>
                </div>
                <div style={{
                display: `flex`,
                gap: `1.2rem`
              }}>
                  <div style={{
                  width: `38px`,
                  height: `38px`,
                  backgroundColor: `rgba(193, 92, 61, 0.06)`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  flexShrink: 0
                }}>
                    <Network size={18} style={{
                    color: `var(--accent-copper)`
                  }} />
                  </div>
                  <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.4rem`
                }}>
                    <h4 style={{
                    fontSize: `0.95rem`,
                    fontWeight: 750,
                    color: `var(--text-primary)`,
                    margin: 0,
                    textTransform: `uppercase`
                  }}>{`IoT Networks & Connectivity`}</h4>
                    <p style={{
                    fontSize: `0.86rem`,
                    lineHeight: `1.45`,
                    color: `var(--text-secondary)`,
                    margin: 0
                  }}>{`Custom communication protocol layers and low-power mesh configurations (6LoWPAN, Zigbee, sub-GHz, Wi-Fi) for industrial & agritech scale.`}</p>
                  </div>
                </div>
                <div style={{
                display: `flex`,
                gap: `1.2rem`
              }}>
                  <div style={{
                  width: `38px`,
                  height: `38px`,
                  backgroundColor: `rgba(193, 92, 61, 0.06)`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  flexShrink: 0
                }}>
                    <ShieldCheck size={18} style={{
                    color: `var(--accent-copper)`
                  }} />
                  </div>
                  <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.4rem`
                }}>
                    <h4 style={{
                    fontSize: `0.95rem`,
                    fontWeight: 750,
                    color: `var(--text-primary)`,
                    margin: 0,
                    textTransform: `uppercase`
                  }}>{`Prototype Design to Scaling`}</h4>
                    <p style={{
                    fontSize: `0.86rem`,
                    lineHeight: `1.45`,
                    color: `var(--text-secondary)`,
                    margin: 0
                  }}>{`Guiding products through schematics review, prototype validation, CE/FCC compliance support, and volume manufacturing readiness.`}</p>
                  </div>
                </div>
              </div>
              <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `1.8rem`
            }}>
                <div style={{
                borderBottom: `1px solid var(--border-thin)`,
                paddingBottom: `0.8rem`
              }}>
                  <span style={{
                  fontSize: `0.7rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.08em`
                }}>{`2) Startup & Ecosystem`}</span>
                </div>
                <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `1.2rem`
              }}>
                  {t.activities.map((e, t) => <div key={e.id} style={{
                  backgroundColor: `var(--bg-primary)`,
                  border: `1px solid var(--border-thin)`,
                  padding: `1.2rem 1.4rem`,
                  display: `flex`,
                  gap: `1rem`,
                  transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
                  cursor: `default`
                }} onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `var(--text-primary)`;
                  e.currentTarget.style.transform = `translateY(-2px)`;
                }} onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `var(--border-thin)`;
                  e.currentTarget.style.transform = `translateY(0)`;
                }}>
                      <div style={{
                    width: `32px`,
                    height: `32px`,
                    backgroundColor: `var(--bg-secondary)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    flexShrink: 0
                  }}>
                        {n[t] || <Target size={16} />}
                      </div>
                      <div style={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: `0.2rem`
                  }}>
                        <h4 style={{
                      fontSize: `0.86rem`,
                      fontWeight: 750,
                      textTransform: `uppercase`,
                      color: `var(--text-primary)`,
                      margin: 0
                    }}>
                          {e.title}
                        </h4>
                        <p style={{
                      fontSize: `0.78rem`,
                      color: `var(--text-secondary)`,
                      lineHeight: `1.4`,
                      margin: 0
                    }}>
                          {e.detail}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .eco-left, .eco-right {
            grid-column: span 12 !important;
          }
          .eco-left {
            margin-bottom: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .split-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>;
}

export default Ecosystem;
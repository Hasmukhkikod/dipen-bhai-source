import { useState } from 'react';
import { ArrowRight, Clock, Shield, Wifi } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function GlobalPresence() {
  let {
    data: e
  } = useContent();
  e.global;
  let [t, n] = useState(`uk`);
  return <section style={{
    backgroundColor: `var(--bg-secondary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`,
    overflow: `hidden`
  }}>
      <div className="container-custom">
        <div className="editorial-grid" style={{
        borderTop: `none`,
        paddingTop: 0
      }}>
          <div style={{
          gridColumn: `span 5`,
          display: `flex`,
          flexDirection: `column`,
          gap: `2rem`
        }} className="global-left">
            <div>
              <span style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              color: `var(--text-secondary)`,
              textTransform: `uppercase`,
              letterSpacing: `0.12em`,
              display: `block`,
              marginBottom: `1rem`
            }}>{`07 / GLOBAL DELIVERY`}</span>
              <h2 style={{
              fontSize: `clamp(2.3rem, 4vw, 4rem)`,
              lineHeight: `1.05`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--text-primary)`
            }}>
                {`Technology `}
                <br />
                {`Without `}
                <br />
                <span className="serif-italic" style={{
                textTransform: `lowercase`,
                fontWeight: 300,
                color: `var(--accent-copper)`
              }}>{`borders.`}</span>
              </h2>
            </div>
            <p style={{
            fontSize: `1.05rem`,
            lineHeight: `1.65`,
            color: `var(--text-secondary)`,
            margin: 0,
            maxWidth: `420px`
          }}>{`We successfully deliver advanced technical services and connected hardware projects to clients worldwide. Distance is never a bottleneck—we operate a robust, secure remote engineering infrastructure that integrates HIL (Hardware-in-the-Loop) test rigs with continuous delivery pipelines.`}</p>
            <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.8rem`,
            marginTop: `0.5rem`
          }}>
              <button onClick={() => n(`uk`)} style={{
              display: `flex`,
              justifyContent: `space-between`,
              padding: `1.1rem 1.4rem`,
              border: t === `uk` ? `1px solid var(--text-primary)` : `1px solid var(--border-thin)`,
              backgroundColor: t === `uk` ? `var(--bg-primary)` : `transparent`,
              cursor: `pointer`,
              fontWeight: 750,
              transition: `all 0.3s ease`,
              fontSize: `0.82rem`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>
                <span>{`United Kingdom & EU`}</span>
                <span style={{
                color: `var(--accent-copper)`
              }}>{`GMT +0 / +2`}</span>
              </button>
              <button onClick={() => n(`jp`)} style={{
              display: `flex`,
              justifyContent: `space-between`,
              padding: `1.1rem 1.4rem`,
              border: t === `jp` ? `1px solid var(--text-primary)` : `1px solid var(--border-thin)`,
              backgroundColor: t === `jp` ? `var(--bg-primary)` : `transparent`,
              cursor: `pointer`,
              fontWeight: 750,
              transition: `all 0.3s ease`,
              fontSize: `0.82rem`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>
                <span>{`East Asia (Japan/China)`}</span>
                <span style={{
                color: `var(--accent-copper)`
              }}>{`GMT +8 / +9`}</span>
              </button>
              <button onClick={() => n(`me`)} style={{
              display: `flex`,
              justifyContent: `space-between`,
              padding: `1.1rem 1.4rem`,
              border: t === `me` ? `1px solid var(--text-primary)` : `1px solid var(--border-thin)`,
              backgroundColor: t === `me` ? `var(--bg-primary)` : `transparent`,
              cursor: `pointer`,
              fontWeight: 750,
              transition: `all 0.3s ease`,
              fontSize: `0.82rem`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>
                <span>{`Middle East (Oman/UAE)`}</span>
                <span style={{
                color: `var(--accent-copper)`
              }}>{`GMT +4`}</span>
              </button>
            </div>
          </div>
          <div style={{
          gridColumn: `span 7`,
          display: `flex`,
          flexDirection: `column`,
          gap: `2rem`
        }} className="global-right">
            <div style={{
            backgroundColor: `var(--bg-primary)`,
            border: `1px solid var(--border-thin)`,
            padding: `2.5rem`,
            position: `relative`
          }}>
              <div style={{
              display: `flex`,
              alignItems: `center`,
              gap: `0.6rem`,
              marginBottom: `1.2rem`
            }}>
                <Clock size={16} style={{
                color: `var(--accent-copper)`
              }} />
                <span style={{
                fontSize: `0.7rem`,
                fontWeight: 800,
                color: `var(--accent-copper)`,
                textTransform: `uppercase`,
                letterSpacing: `0.08em`
              }}>{`Operational Overlap`}</span>
              </div>
              {t === `uk` && <div>
                  <h3 style={{
                fontSize: `1.4rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: `0 0 0.8rem 0`
              }}>{`UK & European Operations`}</h3>
                  <p style={{
                fontSize: `0.92rem`,
                lineHeight: `1.6`,
                color: `var(--text-secondary)`,
                margin: `0 0 1.5rem 0`
              }}>{`Providing full afternoon overlap for agile standups, review cycles, and remote technical support. Fully compliant with CE electrical safety certification audits and SMETS2 smart grid protocols.`}</p>
                  <div style={{
                display: `flex`,
                gap: `0.4rem`,
                alignItems: `center`,
                fontSize: `0.78rem`,
                fontWeight: 750,
                color: `var(--accent-green)`
              }}>
                    <span>{`PAST RUNS: UK Smart Metering FOTA updates`}</span>
                    <ArrowRight size={12} />
                  </div>
                </div>}
              {t === `jp` && <div>
                  <h3 style={{
                fontSize: `1.4rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: `0 0 0.8rem 0`
              }}>{`East Asian Supply Chain Sync`}</h3>
                  <p style={{
                fontSize: `0.92rem`,
                lineHeight: `1.6`,
                color: `var(--text-secondary)`,
                margin: `0 0 1.5rem 0`
              }}>{`Daily morning overlap synchronized with component sourcing hubs and PCBA manufacturing vendors. Direct communication channels for quality audits, schematic reviews, and packaging coordinates.`}</p>
                  <div style={{
                display: `flex`,
                gap: `0.4rem`,
                alignItems: `center`,
                fontSize: `0.78rem`,
                fontWeight: 750,
                color: `var(--accent-green)`
              }}>
                    <span>{`PAST RUNS: Japan Smart Grid interface designs`}</span>
                    <ArrowRight size={12} />
                  </div>
                </div>}
              {t === `me` && <div>
                  <h3 style={{
                fontSize: `1.4rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: `0 0 0.8rem 0`
              }}>{`Middle East Utility Infrastructure`}</h3>
                  <p style={{
                fontSize: `0.92rem`,
                lineHeight: `1.6`,
                color: `var(--text-secondary)`,
                margin: `0 0 1.5rem 0`
              }}>{`Convenient overlap coordinates for real-time field trials telemetry analysis, firmware adjustments, and remote debugging. Experienced in deploying local SCADA/Smart City gateways.`}</p>
                  <div style={{
                display: `flex`,
                gap: `0.4rem`,
                alignItems: `center`,
                fontSize: `0.78rem`,
                fontWeight: 750,
                color: `var(--accent-green)`
              }}>
                    <span>{`PAST RUNS: Muscat grid smart meter pilots`}</span>
                    <ArrowRight size={12} />
                  </div>
                </div>}
            </div>
            <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`
          }} className="ops-grid">
              <div style={{
              padding: `1.8rem`,
              border: `1px solid var(--border-thin)`,
              display: `flex`,
              flexDirection: `column`,
              gap: `0.8rem`
            }}>
                <Shield size={18} style={{
                color: `var(--accent-copper)`
              }} />
                <h4 style={{
                fontSize: `0.92rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: 0
              }}>{`Secure Remote Pipelines`}</h4>
                <p style={{
                fontSize: `0.82rem`,
                lineHeight: `1.45`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Encrypted code repositories, private keys management, and sandboxed staging blocks ensuring strict client data integrity.`}</p>
              </div>
              <div style={{
              padding: `1.8rem`,
              border: `1px solid var(--border-thin)`,
              display: `flex`,
              flexDirection: `column`,
              gap: `0.8rem`
            }}>
                <Wifi size={18} style={{
                color: `var(--accent-copper)`
              }} />
                <h4 style={{
                fontSize: `0.92rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: 0
              }}>{`Hardware-in-the-Loop Rigs`}</h4>
                <p style={{
                fontSize: `0.82rem`,
                lineHeight: `1.45`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Continuous staging systems allowing remote flashing, code execution monitoring, and hardware stress testing.`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .global-left, .global-right {
            grid-column: span 12 !important;
          }
          .global-left {
            margin-bottom: 3.5rem;
          }
        }
        @media (max-width: 600px) {
          .ops-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>;
}

export default GlobalPresence;
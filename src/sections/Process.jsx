import { useState } from 'react';
import { ChevronDown, ChevronUp, CircleCheckBig, Layers } from 'lucide-react';

function Process() {
  let [e, t] = useState(0),
    n = [{
      step: `01`,
      name: `Discovery & Specifications`,
      desc: `Feasibility audits and architectural requirement compilations.`,
      bullets: [`Analyzing client problem statement and establishing technical roadmap.`, `Defining strict low-power budgets and component sourcing feasibility.`, `Determining regulatory compliance pathways (CE, FCC, SMETS2 utility standards).`, `Formulating system specifications, testing metrics, and project constraints.`],
      wireframe: <svg viewBox="0 0 120 120" style={{
        width: `100%`,
        height: `100%`,
        opacity: 0.12
      }} fill="none" stroke="var(--text-primary)" strokeWidth="0.8">
            <rect x="15" y="15" width="90" height="90" rx="3" strokeWidth="1" />
            <line x1="30" y1="35" x2="90" y2="35" stroke="var(--accent-copper)" strokeWidth="1.5" />
            <line x1="30" y1="50" x2="80" y2="50" />
            <line x1="30" y1="65" x2="85" y2="65" />
            <line x1="30" y1="80" x2="70" y2="80" />
            <circle cx="20" cy="35" r="2.5" fill="var(--accent-copper)" />
            <circle cx="20" cy="50" r="2" fill="var(--text-primary)" />
            <circle cx="20" cy="65" r="2" fill="var(--text-primary)" />
            <circle cx="20" cy="80" r="2" fill="var(--text-primary)" />
          </svg>
    }, {
      step: `02`,
      name: `System Architecture & PCB Design`,
      desc: `Schematics modeling and low-power microcontroller layouts.`,
      bullets: [`Drawing circuit schematics, routing power lines, and filtering noise.`, `Selecting microcontrollers (STM32, ARM Cortex-M) matching requirements.`, `Layout design of multi-layer PCBs, optimizing RF traces and ground planes.`, `Generating production-ready Gerber packages, bill-of-materials, and assembly files.`],
      wireframe: <svg viewBox="0 0 120 120" style={{
        width: `100%`,
        height: `100%`,
        opacity: 0.12
      }} fill="none" stroke="var(--text-primary)" strokeWidth="0.8">
            <rect x="10" y="10" width="100" height="100" rx="4" strokeWidth="1.2" />
            <rect x="45" y="45" width="30" height="30" fill="none" />
            <line x1="45" y1="50" x2="35" y2="50" />
            <line x1="45" y1="60" x2="35" y2="60" />
            <line x1="45" y1="70" x2="35" y2="70" />
            <line x1="75" y1="50" x2="85" y2="50" />
            <line x1="75" y1="60" x2="85" y2="60" />
            <line x1="75" y1="70" x2="85" y2="70" />
            <line x1="50" y1="45" x2="50" y2="35" />
            <line x1="60" y1="45" x2="60" y2="35" />
            <line x1="70" y1="45" x2="70" y2="35" />
            <path d="M20 20 H35 V60 H45" stroke="var(--accent-copper)" strokeWidth="1" />
            <path d="M100 100 H85 V65 H75" />
            <circle cx="20" cy="20" r="2" fill="var(--accent-copper)" />
            <circle cx="100" cy="100" r="2" fill="var(--text-primary)" />
          </svg>
    }, {
      step: `03`,
      name: `Custom Firmware & Networking`,
      desc: `Device drivers, RTOS integration, and secure FOTA routing.`,
      bullets: [`Writing bare-metal drivers, kernel BSP modules, and low-level code.`, `Developing real-time task schedulers (FreeRTOS) and thread systems.`, `Implementing wireless mesh protocols (6LoWPAN, Zigbee, sub-GHz).`, `Architecting dual-bank safe FOTA update routines to secure remote uploads.`],
      wireframe: <svg viewBox="0 0 120 120" style={{
        width: `100%`,
        height: `100%`,
        opacity: 0.12
      }} fill="none" stroke="var(--text-primary)" strokeWidth="0.8">
            <circle cx="60" cy="80" r="8" strokeWidth="1.2" />
            <path d="M60 80 L30 40" stroke="var(--accent-copper)" strokeWidth="1" />
            <circle cx="30" cy="40" r="5" fill="var(--accent-copper)" />
            <path d="M60 80 L90 40" />
            <circle cx="90" cy="40" r="5" fill="var(--text-primary)" />
            <path d="M20 30 A 15 15 0 0 1 40 30" stroke="var(--accent-copper)" />
            <path d="M80 30 A 15 15 0 0 1 100 30" />
          </svg>
    }, {
      step: `04`,
      name: `Lab Validation & Field Trials`,
      desc: `Electrical testing, link diagnostic runs, and pilot audits.`,
      bullets: [`Analyzing signal integrity using logic analyzers and oscilloscopes.`, `Testing RF link budget performance and boundary transmission range.`, `Validating low-power sleep currents and thermal operating boundaries.`, `Deploying prototype nodes in harsh field environments for pilot testing.`],
      wireframe: <svg viewBox="0 0 120 120" style={{
        width: `100%`,
        height: `100%`,
        opacity: 0.12
      }} fill="none" stroke="var(--text-primary)" strokeWidth="0.8">
            <rect x="15" y="35" width="90" height="50" rx="2" strokeWidth="1" />
            <path d="M20 60 Q 35 30, 50 60 T 80 60 T 100 60" stroke="var(--accent-copper)" strokeWidth="1.5" />
            <line x1="15" y1="60" x2="105" y2="60" strokeDasharray="3 3" />
          </svg>
    }, {
      step: `05`,
      name: `Quality Auditing & Scale Production`,
      desc: `Test jigs design, certifications audits, and volume assembly.`,
      bullets: [`Designing custom mechanical test fixtures for assembly diagnostics.`, `Conducting production validation reviews under ISO 9001 QMS criteria.`, `Guiding boards through regulatory CE/FCC laboratories compliance pipelines.`, `Coordinating with volume EMS partners for pick-and-place assembly.`],
      wireframe: <svg viewBox="0 0 120 120" style={{
        width: `100%`,
        height: `100%`,
        opacity: 0.12
      }} fill="none" stroke="var(--text-primary)" strokeWidth="0.8">
            <path d="M15 80 H105" strokeWidth="1.5" />
            <circle cx="30" cy="88" r="4" />
            <circle cx="60" cy="88" r="4" />
            <circle cx="90" cy="88" r="4" />
            <rect x="20" y="55" width="20" height="20" fill="none" stroke="var(--accent-copper)" strokeWidth="1" />
            <rect x="50" y="55" width="20" height="20" />
            <rect x="80" y="55" width="20" height="20" />
          </svg>
    }];
  return <section id="process" style={{
    backgroundColor: `var(--bg-secondary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`,
    position: `relative`,
    overflow: `hidden`
  }}>
      <div className="container-custom">
        <div style={{
        marginBottom: `5.5rem`
      }}>
          <span style={{
          fontSize: `0.75rem`,
          fontWeight: 700,
          color: `var(--text-secondary)`,
          textTransform: `uppercase`,
          letterSpacing: `0.12em`,
          display: `block`,
          marginBottom: `1rem`
        }}>{`09 / DEVELOPMENT CYCLE`}</span>
          <h2 style={{
          fontSize: `clamp(2.5rem, 4.5vw, 4.5rem)`,
          fontWeight: 800,
          textTransform: `uppercase`,
          color: `var(--text-primary)`,
          lineHeight: `1`,
          margin: 0
        }}>
            {`Product `}
            <span className="serif-italic" style={{
            textTransform: `lowercase`,
            fontWeight: 300,
            color: `var(--accent-copper)`
          }}>{`workflow.`}</span>
          </h2>
        </div>
        <div className="editorial-grid" style={{
        borderTop: `none`,
        paddingTop: 0
      }}>
          <div style={{
          gridColumn: `span 7`,
          display: `flex`,
          flexDirection: `column`,
          gap: `1rem`
        }} className="process-accordion-col">
            {n.map((n, r) => {
            let i = e === r;
            return <div key={r} style={{
              border: i ? `1px solid var(--text-primary)` : `1px solid var(--border-thin)`,
              backgroundColor: i ? `var(--bg-primary)` : `transparent`,
              transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
            }}>
                  <button onClick={() => t(i ? -1 : r)} style={{
                width: `100%`,
                background: `none`,
                border: `none`,
                padding: `1.8rem`,
                display: `grid`,
                gridTemplateColumns: `50px 1fr 30px`,
                alignItems: `center`,
                textAlign: `left`,
                cursor: `pointer`
              }}>
                    <span className="serif-italic" style={{
                  fontSize: `1.5rem`,
                  fontWeight: 300,
                  color: i ? `var(--accent-copper)` : `var(--text-secondary)`
                }}>
                      {n.step}
                    </span>
                    <div>
                      <h4 style={{
                    fontSize: `0.98rem`,
                    fontWeight: 800,
                    color: `var(--text-primary)`,
                    textTransform: `uppercase`,
                    margin: `0 0 0.2rem 0`
                  }}>
                        {n.name}
                      </h4>
                      <span style={{
                    fontSize: `0.82rem`,
                    color: `var(--text-secondary)`
                  }}>
                        {n.desc}
                      </span>
                    </div>
                    <div>
                      {i ? <ChevronUp size={18} style={{
                    color: `var(--accent-copper)`
                  }} /> : <ChevronDown size={18} style={{
                    color: `var(--text-secondary)`
                  }} />}
                    </div>
                  </button>
                  {i && <div style={{
                padding: `0 1.8rem 1.8rem 5.2rem`,
                borderTop: `1px solid var(--border-thin)`,
                paddingTop: `1.5rem`,
                backgroundColor: `var(--bg-primary)`
              }}>
                      <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.8rem`
                }}>
                        {n.bullets.map((e, t) => <div key={t} style={{
                    display: `flex`,
                    gap: `0.6rem`,
                    alignItems: `flex-start`
                  }}>
                            <CircleCheckBig size={14} style={{
                      color: `var(--accent-copper)`,
                      marginTop: `2px`,
                      flexShrink: 0
                    }} />
                            <span style={{
                      fontSize: `0.86rem`,
                      lineHeight: `1.45`,
                      color: `var(--text-secondary)`
                    }}>
                              {e}
                            </span>
                          </div>)}
                      </div>
                    </div>}
                </div>;
          })}
          </div>
          <div style={{
          gridColumn: `span 5`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `center`,
          border: `1px solid var(--border-thin)`,
          backgroundColor: `var(--bg-primary)`,
          padding: `2.5rem`,
          position: `relative`
        }} className="process-preview-col">
            <div style={{
            position: `absolute`,
            top: `1.5rem`,
            left: `1.5rem`,
            display: `flex`,
            alignItems: `center`,
            gap: `0.5rem`
          }}>
              <Layers size={14} style={{
              color: `var(--accent-copper)`
            }} />
              <span style={{
              fontSize: `0.65rem`,
              fontWeight: 800,
              color: `var(--text-secondary)`,
              textTransform: `uppercase`,
              letterSpacing: `0.08em`
            }}>{`Hardware Schematic Wireframe`}</span>
            </div>
            {e >= 0 && e < n.length ? <div style={{
            width: `100%`,
            maxWidth: `280px`,
            aspectRatio: `1`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`
          }}>
                {n[e].wireframe}
              </div> : <div style={{
            fontSize: `0.85rem`,
            color: `var(--text-secondary)`,
            fontFamily: `monospace`
          }}>{`SELECT A WORKFLOW STEP TO REVIEW WIRING`}</div>}
            {e >= 0 && e < n.length && <div style={{
            textAlign: `center`,
            marginTop: `1.5rem`
          }}>
                <span style={{
              fontSize: `0.85rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--text-primary)`,
              letterSpacing: `0.02em`,
              display: `block`,
              marginBottom: `0.2rem`
            }}>
                  {`Step `}
                  {n[e].step}
                  {` Calibration Schema`}
                </span>
                <span style={{
              fontSize: `0.78rem`,
              color: `var(--text-secondary)`
            }}>
                  {`Active layout mapping for `}
                  {n[e].name}
                </span>
              </div>}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .process-accordion-col, .process-preview-col {
            grid-column: span 12 !important;
          }
          .process-preview-col {
            margin-top: 2rem;
            min-height: 350px;
          }
        }
      `}</style>
    </section>;
}

export default Process;
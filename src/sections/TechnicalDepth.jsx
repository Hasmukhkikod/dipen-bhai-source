import { useState } from 'react';
import { Award, ChevronDown, ChevronUp, CircleCheckBig, Cpu, Laptop, Settings as SettingsIcon } from 'lucide-react';
import { useContent } from '../context/ContentContext';

var skillIcons = {
  "Embedded C": <svg viewBox="0 0 24 24" fill="none" stroke="#D35400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>,
  "C++": <div style={{
    fontSize: `0.8rem`,
    fontWeight: 900,
    color: `#00599C`,
    display: `flex`,
    alignItems: `center`,
    lineHeight: 1,
    fontFamily: `var(--font-sans)`
  }}>
        {`C`}
        <span style={{
      fontSize: `0.65rem`,
      color: `#D35400`,
      marginLeft: `1px`
    }}>{`++`}</span>
      </div>,
  Python: <svg viewBox="0 0 24 24" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M12 2C8.7 2 8.7 3.3 8.7 3.3v2.2h3.3v0.5H7.1S5.4 5.9 5.4 9.2c0 3.3 1.5 3.3 1.5 3.3h1.8v-2.5c0-1.8 1.5-3.3 3.3-3.3h3.3V4.5S15.3 2 12 2z" fill="#3776AB" />
        <path d="M12 22c3.3 0 3.3-1.3 3.3-1.3v-2.2h-3.3v-0.5h4.9s1.7 0.1 1.7-3.2c0-3.3-1.5-3.3-1.5-3.3h-1.8v2.5c0 1.8-1.5 3.3-3.3 3.3H8.7v2.2s0 2.5 3.3 2.5z" fill="#FFD43B" />
      </svg>,
  "Linux Kernel": <svg viewBox="0 0 24 24" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M12 2c-1.8 0-3.3 1.3-3.8 3.1-.3-.1-.6-.1-.9-.1-1.4 0-2.5 1.1-2.5 2.5 0 .7.3 1.4.8 1.8C5.2 10.3 5 11.6 5 13c0 3.9 3.1 7 7 7s7-3.1 7-7c0-1.4-.2-2.7-.6-3.7.5-.4.8-1.1.8-1.8 0-1.4-1.1-2.5-2.5-2.5-.3 0-.6 0-.9.1C15.3 3.3 13.8 2 12 2zm-2 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-2 4.5c.8 0 1.5.4 1.5.9s-.7.9-1.5.9-1.5-.4-1.5-.9.7-.9 1.5-.9z" fill="#C0392B" />
        <path d="M8 21.5c-1 0-1.5-.5-1.5-1.2s.5-1.2 1.5-1.2h1.5v2.4H8zm8 0h-1.5v-2.4H16c1 0 1.5.5 1.5 1.2s-.5 1.2-1.5 1.2z" fill="#E67E22" />
      </svg>,
  FreeRTOS: <div style={{
    fontSize: `0.45rem`,
    fontWeight: 800,
    border: `1.2px solid #C0392B`,
    color: `#C0392B`,
    padding: `1px 3px`,
    borderRadius: `2.5px`,
    lineHeight: 1,
    fontFamily: `monospace`
  }}>{`RTOS`}</div>,
  "U-Boot": <svg viewBox="0 0 24 24" fill="none" stroke="#D35400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>,
  ARM: <svg viewBox="0 0 24 24" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="15" x2="15" y2="15" />
        <line x1="9" y1="9" x2="9" y2="15" />
        <line x1="15" y1="9" x2="15" y2="15" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
      </svg>,
  "Qualcomm Snapdragon": <svg viewBox="0 0 24 24" fill="none" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-5.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-5 1c-.8 0-1.5-.7-1.5-1.5S8.7 9 9.5 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="#D6002A" />
      </svg>,
  STM32: <svg viewBox="0 0 24 24" fill="none" stroke="#032347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <rect x="5" y="5" width="14" height="14" rx="1" />
        <rect x="9" y="9" width="6" height="6" fill="#3CB4E5" stroke="none" />
        <line x1="12" y1="1" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="1" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="23" y2="12" />
      </svg>,
  IoT: <svg viewBox="0 0 24 24" fill="none" stroke="#15B1E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M5 12.55a11 11 0 0 1 14 0" />
        <path d="M8.5 16a7 7 0 0 1 7 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
      </svg>,
  "6LoWPAN": <svg viewBox="0 0 24 24" fill="none" stroke="#D35400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <circle cx="12" cy="5" r="2.5" fill="#D35400" />
        <circle cx="6" cy="15" r="2.5" fill="#D35400" />
        <circle cx="18" cy="15" r="2.5" fill="#D35400" />
        <line x1="10.5" y1="7.2" x2="7.5" y2="12.8" />
        <line x1="13.5" y1="7.2" x2="16.5" y2="12.8" />
      </svg>,
  Zigbee: <svg viewBox="0 0 24 24" fill="none" style={{
    width: `100%`,
    height: `100%`
  }}>
        <circle cx="12" cy="12" r="9" fill="#D35400" />
        <path d="M8 8h8l-8 8h8" stroke="#FAF8F5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
  "Wi-Fi": <svg viewBox="0 0 24 24" fill="none" stroke="#2980B9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M5 12.55a11 11 0 0 1 14 0" />
        <path d="M8.5 16a7 7 0 0 1 7 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
      </svg>,
  "G3-PLC": <svg viewBox="0 0 24 24" fill="none" stroke="#D35400" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M12 2v20M17 5H7M17 19H7" />
        <path d="M12 7c2 0 4 1.5 4 3s-2 3-4 3-4 1.5-4 3 2 3 4 3" />
      </svg>,
  PCIe: <div style={{
    fontSize: `0.45rem`,
    fontWeight: 800,
    border: `1.2px solid #C0392B`,
    color: `#C0392B`,
    padding: `1px 3px`,
    borderRadius: `2.5px`,
    lineHeight: 1,
    fontFamily: `monospace`
  }}>{`PCIe`}</div>,
  I2C: <div style={{
    fontSize: `0.75rem`,
    fontWeight: 900,
    color: `#C15C3D`,
    fontFamily: `monospace`,
    display: `flex`,
    alignItems: `center`,
    lineHeight: 1
  }}>
        {`I`}
        <span style={{
      fontSize: `0.55rem`,
      verticalAlign: `super`
    }}>{`2`}</span>
        {`C`}
      </div>,
  SPI: <svg viewBox="0 0 24 24" fill="none" stroke="#8E44AD" strokeWidth="2" style={{
    width: `100%`,
    height: `100%`
  }}>
        <circle cx="6" cy="6" r="1.8" fill="#8E44AD" />
        <circle cx="18" cy="6" r="1.8" fill="#8E44AD" />
        <circle cx="6" cy="18" r="1.8" fill="#8E44AD" />
        <circle cx="18" cy="18" r="1.8" fill="#8E44AD" />
        <line x1="8" y1="6" x2="16" y2="6" strokeDasharray="2 2" />
        <line x1="6" y1="8" x2="6" y2="16" strokeDasharray="2 2" />
      </svg>,
  UART: <svg viewBox="0 0 24 24" fill="none" stroke="#16A085" strokeWidth="2" style={{
    width: `100%`,
    height: `100%`
  }}>
        <rect x="4" y="6" width="16" height="12" rx="1.5" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="12" y1="10" x2="12" y2="14" />
        <line x1="16" y1="10" x2="16" y2="14" />
      </svg>,
  Git: <svg viewBox="0 0 24 24" fill="none" stroke="#F05032" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 15V9a4 4 0 0 0-4-4H9" />
        <line x1="6" y1="9" x2="6" y2="15" />
      </svg>,
  GitHub: <svg viewBox="0 0 24 24" fill="none" stroke="#181717" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>,
  GitLab: <svg viewBox="0 0 24 24" fill="none" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M22 13.5l-2-7-2 6H6l-2-6-2 7 10 7.5 10-7.5z" fill="#FC6D26" />
      </svg>,
  Jenkins: <svg viewBox="0 0 24 24" fill="none" stroke="#D24939" strokeWidth="2" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M12 2C8 2 5 5 5 9c0 2.2 1 4.2 2.5 5.5l-1 5.5 5.5-1.5 5.5 1.5-1-5.5c1.5-1.3 2.5-3.3 2.5-5.5 0-4-3-7-7-7z" />
        <line x1="9" y1="9" x2="10" y2="9" strokeWidth="2.5" />
        <line x1="14" y1="9" x2="15" y2="9" strokeWidth="2.5" />
      </svg>,
  Jira: <svg viewBox="0 0 24 24" fill="none" style={{
    width: `100%`,
    height: `100%`
  }}>
        <path d="M11.5 2.5L2.5 11.5l1.5 1.5L13 4l-1.5-1.5zm4 4L6.5 15.5l1.5 1.5L17 8l-1.5-1.5zm4 4l-9 9 1.5 1.5 9-9-1.5-1.5z" fill="#0052CC" />
      </svg>
};

var ChipIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-copper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
  width: `100%`,
  height: `100%`
}}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>;

function TechnicalDepth() {
  let {
      data: e
    } = useContent(),
    t = e.skills || [],
    [n, r] = useState({
      tech: !0,
      strategy: !1,
      ecosystem: !1
    }),
    [i, a] = useState(null),
    o = e => {
      r(t => ({
        ...t,
        [e]: !t[e]
      }));
    },
    s = {
      "Embedded C": `Used for bare-metal driver implementations, registers manipulation, memory audits, and power harvesting algorithms on ARM Cortex.`,
      "C++": `Core firmware architecture for multi-protocol communications middleware, object-oriented sensor abstraction interfaces.`,
      Python: `Data engineering modeling, sensor telemetry validation simulations, edge AI neural network training, and scripts automation.`,
      "Linux Kernel": `Configuring BSP kernel modules, building device drivers (USB/PCIe), custom root filesystems compilation.`,
      FreeRTOS: `Real-time task scheduling, synchronization (mutex/semaphores), event group handling, low-power sleep management.`,
      ARM: `Instruction sets optimization, low-latency interrupt configuration, board hardware initialization routines.`,
      "Qualcomm Snapdragon": `BSP integrations, peripheral validation (PCIe/USB/I2C/SPI), mobile power optimization testing.`,
      STM32: `Ultra-low-power peripheral sleep configurations, ADC DMA integrations, custom bootloader setups.`,
      IoT: `Asynchronous high-throughput telemetry structures, carrier-grade MQTT/CoAP payloads serialization.`,
      "6LoWPAN": `IPv6 low-power mesh packet header compression, routing paths diagnostics, and boundary router gateway configurations.`,
      Zigbee: `Self-healing mesh topology node binding, security keys validation, low-power sleeper endpoint operations.`,
      "Wi-Fi": `Provisioning scripts, secure enterprise encryption validation, and high-bandwidth gateway data transfers.`,
      "G3-PLC": `Power Line Communications physical/MAC protocol layers integration, smart metering telemetry testing.`,
      I2C: `Interface validation, bus speed audits, multi-device routing configurations.`,
      SPI: `High-speed sensor bus integrations, flash memory reading/writing, DMA buffer management.`,
      UART: `Serial diagnostics, bootloader logs monitoring, custom AT command parsing handlers.`,
      Git: `Version control branching strategies, HIL automated deployment actions.`,
      GitHub: `Source code review, issue tickets pipeline, action runner deployments.`,
      GitLab: `Staging testing pipelines, automated static code analysis audits.`,
      Jira: `Sprint task management, release planning backlog prioritization.`
    };
  return <section id="technical-depth" style={{
    backgroundColor: `var(--bg-primary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`
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
        }}>{`08 / SYSTEM STACK`}</span>
          <h2 style={{
          fontSize: `clamp(2.5rem, 4.5vw, 4.5rem)`,
          fontWeight: 800,
          textTransform: `uppercase`,
          color: `var(--text-primary)`,
          lineHeight: `1`,
          margin: 0
        }}>
            {`Capabilities `}
            <span className="serif-italic" style={{
            textTransform: `lowercase`,
            fontWeight: 300,
            color: `var(--accent-copper)`
          }}>{`index.`}</span>
          </h2>
        </div>
        <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `1.5rem`
      }}>
          <div style={{
          border: `1px solid var(--border-thin)`,
          backgroundColor: `var(--bg-secondary)`
        }}>
            <button onClick={() => o(`tech`)} style={{
            width: `100%`,
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            padding: `2rem`,
            background: `none`,
            border: `none`,
            cursor: `pointer`,
            textAlign: `left`
          }}>
              <div style={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`
            }}>
                <Cpu size={22} style={{
                color: `var(--accent-copper)`
              }} />
                <h3 style={{
                fontSize: `1.3rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: 0
              }}>{`1) Technical & Embedded Software Stack`}</h3>
              </div>
              {n.tech ? <ChevronUp size={20} style={{
              color: `var(--accent-copper)`
            }} /> : <ChevronDown size={20} style={{
              color: `var(--text-secondary)`
            }} />}
            </button>
            {n.tech && <div style={{
            padding: `0 2rem 2.5rem 2rem`,
            borderTop: `1px solid var(--border-thin)`,
            paddingTop: `2rem`,
            backgroundColor: `var(--bg-primary)`
          }}>
                <p style={{
              fontSize: `0.9rem`,
              color: `var(--text-secondary)`,
              marginBottom: `2rem`,
              maxWidth: `650px`,
              lineHeight: `1.5`
            }}>{`Our technical software capabilities bridge low-level microcontroller firmware, real-time operating systems (RTOS), and Linux kernel driver customizations. Click on any card below to view specific experience details.`}</p>
                <div style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fill, minmax(220px, 1fr))`,
              gap: `1.2rem`
            }}>
                  {t.map(e => {
                let t = i === e;
                return <div key={e} onClick={() => a(t ? null : e)} style={{
                  border: t ? `1.5px solid var(--accent-copper)` : `1px solid var(--border-thin)`,
                  backgroundColor: t ? `var(--bg-secondary)` : `var(--bg-primary)`,
                  padding: `1.2rem 1.4rem`,
                  cursor: `pointer`,
                  transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.8rem`
                }}>
                        <div style={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    alignItems: `center`
                  }}>
                          <div style={{
                      width: `28px`,
                      height: `28px`,
                      display: `flex`,
                      alignItems: `center`
                    }}>
                            {skillIcons[e] || <ChipIcon />}
                          </div>
                          <span style={{
                      fontSize: `0.62rem`,
                      fontWeight: 750,
                      color: `var(--text-secondary)`,
                      letterSpacing: `0.04em`
                    }}>
                            {t ? `TAP TO CLOSE` : `TAP TO EXPAND`}
                          </span>
                        </div>
                        <span style={{
                    fontSize: `0.85rem`,
                    fontWeight: 800,
                    color: `var(--text-primary)`,
                    textTransform: `uppercase`
                  }}>
                          {e}
                        </span>
                        {t && <div style={{
                    marginTop: `0.5rem`,
                    paddingTop: `0.6rem`,
                    borderTop: `1px solid var(--border-thin)`,
                    fontSize: `0.78rem`,
                    lineHeight: `1.45`,
                    color: `var(--text-secondary)`
                  }}>
                            {s[e] || `Used to deliver secure firmware platforms, system validations, and carrier-grade smart product designs.`}
                          </div>}
                      </div>;
              })}
                </div>
              </div>}
          </div>
          <div style={{
          border: `1px solid var(--border-thin)`,
          backgroundColor: `var(--bg-secondary)`
        }}>
            <button onClick={() => o(`strategy`)} style={{
            width: `100%`,
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            padding: `2rem`,
            background: `none`,
            border: `none`,
            cursor: `pointer`,
            textAlign: `left`
          }}>
              <div style={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`
            }}>
                <SettingsIcon size={22} style={{
                color: `var(--accent-copper)`
              }} />
                <h3 style={{
                fontSize: `1.3rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: 0
              }}>{`2) Strategy & Product Lifecycle`}</h3>
              </div>
              {n.strategy ? <ChevronUp size={20} style={{
              color: `var(--accent-copper)`
            }} /> : <ChevronDown size={20} style={{
              color: `var(--text-secondary)`
            }} />}
            </button>
            {n.strategy && <div style={{
            padding: `0 2rem 2.5rem 2rem`,
            borderTop: `1px solid var(--border-thin)`,
            paddingTop: `2rem`,
            backgroundColor: `var(--bg-primary)`
          }}>
                <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `1.5rem`
            }} className="strategy-grid">
                  {[{
                title: `CSPO Agile Architecture`,
                detail: `Scrum Product Owner methodologies translating client requirements into actionable sprint logs, backlogs, and hardware-software milestone stages.`
              }, {
                title: `Prototype to Manufacturing`,
                detail: `Component sourcing strategies, design reviews, PCB layout auditing, validation jigs creation, and volume production coordinates setup.`
              }, {
                title: `ISO QMS Internal Auditing`,
                detail: `Internal security and quality standards audits meeting ISO 9001 (Quality) and ISO 27001 (Information Security) certification guidelines.`
              }, {
                title: `CE & FCC Compliance Pipelines`,
                detail: `Guiding hardware through emissions (EMI/EMC), electrical safety, and cellular/RF regulatory validation laboratories.`
              }].map((e, t) => <div key={t} style={{
                padding: `1.6rem`,
                border: `1px solid var(--border-thin)`,
                backgroundColor: `var(--bg-secondary)`,
                display: `flex`,
                flexDirection: `column`,
                gap: `0.6rem`
              }}>
                      <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.6rem`
                }}>
                        <CircleCheckBig size={16} style={{
                    color: `var(--accent-copper)`
                  }} />
                        <h4 style={{
                    fontSize: `0.95rem`,
                    fontWeight: 800,
                    textTransform: `uppercase`,
                    color: `var(--text-primary)`,
                    margin: 0
                  }}>
                          {e.title}
                        </h4>
                      </div>
                      <p style={{
                  fontSize: `0.86rem`,
                  lineHeight: `1.5`,
                  color: `var(--text-secondary)`,
                  margin: 0
                }}>
                        {e.detail}
                      </p>
                    </div>)}
                </div>
              </div>}
          </div>
          <div style={{
          border: `1px solid var(--border-thin)`,
          backgroundColor: `var(--bg-secondary)`
        }}>
            <button onClick={() => o(`ecosystem`)} style={{
            width: `100%`,
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            padding: `2rem`,
            background: `none`,
            border: `none`,
            cursor: `pointer`,
            textAlign: `left`
          }}>
              <div style={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`
            }}>
                <Laptop size={22} style={{
                color: `var(--accent-copper)`
              }} />
                <h3 style={{
                fontSize: `1.3rem`,
                fontWeight: 800,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                margin: 0
              }}>{`3) Community Product Contributions`}</h3>
              </div>
              {n.ecosystem ? <ChevronUp size={20} style={{
              color: `var(--accent-copper)`
            }} /> : <ChevronDown size={20} style={{
              color: `var(--text-secondary)`
            }} />}
            </button>
            {n.ecosystem && <div style={{
            padding: `0 2rem 2.5rem 2rem`,
            borderTop: `1px solid var(--border-thin)`,
            paddingTop: `2rem`,
            backgroundColor: `var(--bg-primary)`
          }}>
                <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `1.5rem`
            }} className="strategy-grid">
                  {[{
                title: `Startup Product Reviews`,
                detail: `Review early hardware concepts for integration effort, engineering constraints, and practical deployment risks.`
              }, {
                title: `Applied Engineering Education`,
                detail: `Share practical approaches to embedded platforms and connected products through focused sessions for students and engineering teams.`
              }, {
                title: `Open Network Collaboration`,
                detail: `Bring open-source connectivity experience to community networks, considering interoperability and real-world operating conditions.`
              }, {
                title: `Product Readiness Guidance`,
                detail: `Help teams identify the next product risks to resolve across testing, compliance planning, and manufacturing handoff.`
              }].map((e, t) => <div key={t} style={{
                padding: `1.6rem`,
                border: `1px solid var(--border-thin)`,
                backgroundColor: `var(--bg-secondary)`,
                display: `flex`,
                flexDirection: `column`,
                gap: `0.6rem`
              }}>
                      <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.6rem`
                }}>
                        <Award size={16} style={{
                    color: `var(--accent-green)`
                  }} />
                        <h4 style={{
                    fontSize: `0.95rem`,
                    fontWeight: 800,
                    textTransform: `uppercase`,
                    color: `var(--text-primary)`,
                    margin: 0
                  }}>
                          {e.title}
                        </h4>
                      </div>
                      <p style={{
                  fontSize: `0.86rem`,
                  lineHeight: `1.5`,
                  color: `var(--text-secondary)`,
                  margin: 0
                }}>
                        {e.detail}
                      </p>
                    </div>)}
                </div>
              </div>}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .strategy-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
        }
      `}</style>
    </section>;
}

export default TechnicalDepth;
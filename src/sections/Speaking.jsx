import { useState } from 'react';
import { Award, Calendar, FileText, Globe, GraduationCap, Scale, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function Speaking() {
  let {
      data: e
    } = useContent(),
    t = e.credentials || {},
    n = e.certifications || [],
    r = e.speaking || [],
    [i, a] = useState(`projects`);
  return <section id="speaking" style={{
    backgroundColor: `var(--bg-primary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`
  }}>
      <div className="container-custom">
        <div className="editorial-grid">
          <div style={{
          gridColumn: `span 4`
        }} className="speaking-left">
            <span style={{
            fontSize: `0.75rem`,
            fontWeight: 700,
            color: `var(--text-secondary)`,
            textTransform: `uppercase`,
            letterSpacing: `0.12em`,
            display: `block`,
            marginBottom: `2rem`
          }}>{`06 / CORPORATE STANDARDS`}</span>
            <h2 style={{
            fontSize: `clamp(2.2rem, 3.5vw, 3.8rem)`,
            lineHeight: `1.05`,
            fontWeight: 800,
            textTransform: `uppercase`,
            color: `var(--text-primary)`
          }}>
              {`Credentials `}
              <br />
              {`& `}
              <span className="serif-italic" style={{
              textTransform: `lowercase`,
              fontWeight: 300,
              color: `var(--accent-copper)`
            }}>{`credits.`}</span>
            </h2>
            <p style={{
            marginTop: `1.5rem`,
            fontSize: `0.95rem`,
            color: `var(--text-secondary)`,
            lineHeight: `1.5`,
            maxWidth: `300px`
          }}>{`At Navyrix Labs, we anchor product quality in registered IP, international standards certifications, active mentoring, and technical lecturing.`}</p>
          </div>
          <div style={{
          gridColumn: `span 8`,
          display: `flex`,
          flexDirection: `column`
        }} className="speaking-right">
            <div style={{
            display: `flex`,
            borderBottom: `2px solid var(--border-thin)`,
            marginBottom: `2.5rem`,
            gap: `1.5rem`,
            overflowX: `auto`,
            paddingBottom: `2px`
          }} className="no-scrollbar">
              <button onClick={() => a(`projects`)} style={{
              background: `none`,
              border: `none`,
              padding: `0.8rem 0.5rem`,
              fontSize: `0.82rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              letterSpacing: `0.08em`,
              color: i === `projects` ? `var(--accent-copper)` : `var(--text-secondary)`,
              borderBottom: i === `projects` ? `2px solid var(--accent-copper)` : `2px solid transparent`,
              cursor: `pointer`,
              transition: `all 0.3s ease`,
              marginBottom: `-4px`
            }}>{`Projects & IP`}</button>
              <button onClick={() => a(`ecosystem`)} style={{
              background: `none`,
              border: `none`,
              padding: `0.8rem 0.5rem`,
              fontSize: `0.82rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              letterSpacing: `0.08em`,
              color: i === `ecosystem` ? `var(--accent-copper)` : `var(--text-secondary)`,
              borderBottom: i === `ecosystem` ? `2px solid var(--accent-copper)` : `2px solid transparent`,
              cursor: `pointer`,
              transition: `all 0.3s ease`,
              marginBottom: `-4px`
            }}>{`Ecosystem & Jury`}</button>
              <button onClick={() => a(`credentials`)} style={{
              background: `none`,
              border: `none`,
              padding: `0.8rem 0.5rem`,
              fontSize: `0.82rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              letterSpacing: `0.08em`,
              color: i === `credentials` ? `var(--accent-copper)` : `var(--text-secondary)`,
              borderBottom: i === `credentials` ? `2px solid var(--accent-copper)` : `2px solid transparent`,
              cursor: `pointer`,
              transition: `all 0.3s ease`,
              marginBottom: `-4px`
            }}>{`Lectures & Certs`}</button>
            </div>
            <div style={{
            minHeight: `350px`
          }}>
              {i === `projects` && <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `2.5rem`
            }}>
                  <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <Scale size={14} />
                      {` Registered Patents`}
                    </h3>
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `1rem`
                }}>
                      {t.patents && t.patents.map((e, t) => <div key={t} style={{
                    padding: `1.5rem`,
                    backgroundColor: `var(--bg-secondary)`,
                    borderLeft: `3px solid var(--accent-copper)`
                  }}>
                            <p style={{
                      margin: 0,
                      fontSize: `0.92rem`,
                      color: `var(--text-primary)`,
                      fontWeight: 600
                    }}>
                              {e}
                            </p>
                          </div>)}
                    </div>
                  </div>
                  <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <FileText size={14} />
                      {` Key Project Integrations`}
                    </h3>
                    {(!t.technicalProjects || t.technicalProjects.length === 0) && <p style={{
                  fontSize: `0.88rem`,
                  color: `var(--text-secondary)`,
                  margin: 0
                }}>{`Coming soon.`}</p>}
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.8rem`
                }}>
                      {t.technicalProjects && t.technicalProjects.map((e, t) => <div key={t} style={{
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: `0.8rem`,
                    borderBottom: `1px solid var(--border-thin)`,
                    paddingBottom: `0.8rem`
                  }}>
                            <span style={{
                      fontSize: `0.8rem`,
                      fontWeight: 700,
                      color: `var(--accent-green)`,
                      fontFamily: `monospace`
                    }}>
                              {`[0`}
                              {t + 1}
                              {`]`}
                            </span>
                            <span style={{
                      fontSize: `0.92rem`,
                      color: `var(--text-secondary)`
                    }}>
                              {e}
                            </span>
                          </div>)}
                    </div>
                  </div>
                  {t.copyrights && t.copyrights.length > 0 && <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <ShieldCheck size={14} />
                      {` Copyrights & Trademarks`}
                    </h3>
                    <div style={{
                  display: `grid`,
                  gridTemplateColumns: `1fr 1fr`,
                  gap: `1rem`
                }} className="ip-grid">
                      {t.copyrights.map((e, t) => <div key={t} style={{
                    padding: `1.2rem`,
                    border: `1px solid var(--border-thin)`,
                    backgroundColor: `var(--bg-primary)`
                  }}>
                            <p style={{
                      margin: 0,
                      fontSize: `0.85rem`,
                      color: `var(--text-secondary)`
                    }}>
                              {e}
                            </p>
                          </div>)}
                    </div>
                  </div>}
                </div>}
              {i === `ecosystem` && <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `2.5rem`
            }}>
                  <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <Scale size={14} />
                      {` Jury Support & incubator Panels`}
                    </h3>
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.8rem`
                }}>
                      {t.jurySlots && t.jurySlots.map((e, t) => <div key={t} style={{
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: `0.8rem`,
                    borderBottom: `1px solid var(--border-thin)`,
                    paddingBottom: `0.8rem`
                  }}>
                            <span style={{
                      fontSize: `0.8rem`,
                      fontWeight: 700,
                      color: `var(--accent-copper)`,
                      fontFamily: `monospace`
                    }}>
                              {`[J0`}
                              {t + 1}
                              {`]`}
                            </span>
                            <span style={{
                      fontSize: `0.92rem`,
                      color: `var(--text-secondary)`
                    }}>
                              {e}
                            </span>
                          </div>)}
                    </div>
                  </div>
                  <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <GraduationCap size={14} />
                      {` Startup Mentor Projects`}
                    </h3>
                    {(!t.mentorProjects || t.mentorProjects.length === 0) && <p style={{
                  fontSize: `0.88rem`,
                  color: `var(--text-secondary)`,
                  margin: 0
                }}>{`Coming soon.`}</p>}
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.8rem`
                }}>
                      {t.mentorProjects && t.mentorProjects.map((e, t) => <div key={t} style={{
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: `0.8rem`,
                    borderBottom: `1px solid var(--border-thin)`,
                    paddingBottom: `0.8rem`
                  }}>
                            <span style={{
                      fontSize: `0.8rem`,
                      fontWeight: 700,
                      color: `var(--accent-green)`,
                      fontFamily: `monospace`
                    }}>
                              {`[M0`}
                              {t + 1}
                              {`]`}
                            </span>
                            <span style={{
                      fontSize: `0.92rem`,
                      color: `var(--text-secondary)`
                    }}>
                              {e}
                            </span>
                          </div>)}
                    </div>
                  </div>
                  {t.memberships && t.memberships.length > 0 && <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <Globe size={14} />
                      {` Active Group Memberships`}
                    </h3>
                    <div style={{
                  display: `grid`,
                  gridTemplateColumns: `1fr 1fr`,
                  gap: `1rem`
                }} className="ip-grid">
                      {t.memberships.map((e, t) => <div key={t} style={{
                    padding: `1.2rem`,
                    border: `1px solid var(--border-thin)`,
                    backgroundColor: `var(--bg-secondary)`
                  }}>
                            <p style={{
                      margin: 0,
                      fontSize: `0.85rem`,
                      color: `var(--text-primary)`,
                      fontWeight: 600
                    }}>
                              {e}
                            </p>
                          </div>)}
                    </div>
                  </div>}
                </div>}
              {i === `credentials` && <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `2.5rem`
            }}>
                  <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <GraduationCap size={14} />
                      {` Faculty Lectures & Seminars`}
                    </h3>
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `1.2rem`
                }}>
                      {r.map(e => <div key={e.id} style={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: `0.3rem`,
                    borderBottom: `1px solid var(--border-thin)`,
                    paddingBottom: `1rem`
                  }}>
                          <div style={{
                      display: `flex`,
                      justifyContent: `space-between`,
                      alignItems: `center`,
                      flexWrap: `wrap`
                    }}>
                            <h4 style={{
                        fontSize: `0.98rem`,
                        fontWeight: 750,
                        color: `var(--text-primary)`,
                        margin: 0
                      }}>
                              {e.topic}
                            </h4>
                            <span style={{
                        fontSize: `0.72rem`,
                        fontWeight: 700,
                        color: `var(--accent-green)`,
                        display: `flex`,
                        alignItems: `center`,
                        gap: `0.3rem`
                      }}>
                              <Calendar size={12} />
                              {` `}
                              {e.date}
                            </span>
                          </div>
                          <span style={{
                      fontSize: `0.8rem`,
                      color: `var(--text-secondary)`,
                      textTransform: `uppercase`,
                      letterSpacing: `0.04em`
                    }}>
                            {e.event}
                          </span>
                        </div>)}
                    </div>
                  </div>
                  <div>
                    <h3 style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-copper)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.1em`,
                  marginBottom: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`
                }}>
                      <Award size={14} />
                      {` Quality & Professional Certifications`}
                    </h3>
                    <div style={{
                  display: `grid`,
                  gridTemplateColumns: `1fr 1fr`,
                  gap: `1rem`
                }} className="ip-grid">
                      {n.map(e => <div key={e.id} style={{
                    padding: `1.2rem`,
                    border: `1px solid var(--border-thin)`,
                    backgroundColor: `var(--bg-secondary)`,
                    display: `flex`,
                    alignItems: `center`,
                    gap: `0.8rem`
                  }}>
                          <Award size={18} style={{
                      color: `var(--accent-copper)`,
                      flexShrink: 0
                    }} />
                          <span style={{
                      fontSize: `0.85rem`,
                      color: `var(--text-primary)`,
                      fontWeight: 600
                    }}>
                            {e.title}
                          </span>
                        </div>)}
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .speaking-left, .speaking-right {
            grid-column: span 12 !important;
          }
          .speaking-left {
            margin-bottom: 3.5rem;
          }
        }
        @media (max-width: 600px) {
          .ip-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>;
}

export default Speaking;
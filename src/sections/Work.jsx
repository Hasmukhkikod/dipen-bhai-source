import { useState } from 'react';
import { ArrowUpRight, Cpu, Lightbulb, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function Work() {
  let {
      data: e
    } = useContent(),
    t = e.projects,
    [n, r] = useState({}),
    i = e => {
      r(t => ({
        ...t,
        [e]: !t[e]
      }));
    };
  return <section id="work" style={{
    backgroundColor: `var(--bg-primary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`,
    position: `relative`
  }}>
      <div className="container-custom">
        <div style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `flex-end`,
        marginBottom: `6rem`
      }} className="work-header">
          <div>
            <span style={{
            fontSize: `0.75rem`,
            fontWeight: 700,
            color: `var(--text-secondary)`,
            textTransform: `uppercase`,
            letterSpacing: `0.12em`,
            display: `block`,
            marginBottom: `1rem`
          }}>{`04 / SUCCESS STORIES`}</span>
            <h2 style={{
            fontSize: `clamp(2.5rem, 4.5vw, 4.5rem)`,
            fontWeight: 800,
            textTransform: `uppercase`,
            color: `var(--text-primary)`,
            lineHeight: `1`
          }}>
              {`Selected `}
              <span className="serif-italic" style={{
              textTransform: `lowercase`,
              fontWeight: 300,
              color: `var(--accent-copper)`
            }}>{`work.`}</span>
            </h2>
          </div>
          <p style={{
          maxWidth: `380px`,
          fontSize: `1rem`,
          color: `var(--text-secondary)`,
          margin: 0
        }} className="desktop-only">{`A review of core engineering developments, wireless middleware architectures, and agritech deployments.`}</p>
        </div>
        {t.length === 0 && <div style={{
        border: `1px dashed var(--border-active)`,
        padding: `4rem 2rem`,
        textAlign: `center`,
        color: `var(--text-secondary)`
      }}>
            <p style={{
          fontSize: `1.1rem`,
          fontWeight: 700,
          textTransform: `uppercase`,
          letterSpacing: `0.05em`,
          color: `var(--text-primary)`,
          margin: 0
        }}>{`Case Studies Coming Soon`}</p>
            <p style={{
          fontSize: `0.95rem`,
          margin: `0.8rem 0 0 0`
        }}>{`We're preparing detailed write-ups for 40+ completed projects. Check back shortly.`}</p>
          </div>}
        <div style={{
        display: `flex`,
        flexDirection: `column`,
        position: `relative`
      }} className="sticky-cards-container">
          {t.map((e, r) => {
          let a = !!n[e.id],
            o = 100 + r * 32;
          return <div key={e.id} style={{
            position: `sticky`,
            top: `${o}px`,
            zIndex: r + 1,
            paddingBottom: `2rem`,
            marginBottom: r === t.length - 1 ? `0rem` : `4rem`
          }} className="project-sticky-wrapper">
                <div style={{
              backgroundColor: `var(--bg-primary)`,
              border: `1px solid var(--text-primary)`,
              padding: `3.5rem 3rem`,
              boxShadow: `0 -15px 40px -20px rgba(0,0,0,0.06), 0 30px 60px -25px rgba(0,0,0,0.12)`,
              display: `grid`,
              gridTemplateColumns: `1.1fr 0.9fr`,
              gap: `4rem`,
              alignItems: `start`,
              transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`
            }} className="project-card-box reveal-scale">
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `1.5rem`
              }}>
                    <div style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: `1.5rem`
                }}>
                      <span className="serif-italic" style={{
                    fontSize: `2rem`,
                    fontWeight: 300,
                    color: `var(--accent-copper)`,
                    lineHeight: `1`
                  }}>
                        {e.number || String(r + 1).padStart(2, `0`)}
                      </span>
                      <span style={{
                    fontSize: `0.75rem`,
                    fontWeight: 700,
                    textTransform: `uppercase`,
                    color: `var(--text-secondary)`,
                    letterSpacing: `0.1em`
                  }}>
                        {e.category}
                      </span>
                    </div>
                    <h3 style={{
                  fontSize: `clamp(1.8rem, 3vw, 2.5rem)`,
                  fontWeight: 800,
                  textTransform: `uppercase`,
                  color: `var(--text-primary)`,
                  letterSpacing: `-0.02em`,
                  lineHeight: `1.1`,
                  margin: 0
                }}>
                      {e.title}
                    </h3>
                    <div style={{
                  fontSize: `0.8rem`,
                  fontWeight: 800,
                  color: `var(--accent-green)`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.05em`
                }}>
                      {`ROLE: `}
                      {e.role}
                    </div>
                    <p style={{
                  fontSize: `1.05rem`,
                  lineHeight: `1.6`,
                  color: `var(--text-secondary)`,
                  margin: 0
                }}>
                      {e.shortDescription}
                    </p>
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `1.5rem`,
                  maxHeight: a ? `1000px` : `0px`,
                  overflow: `hidden`,
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
                  opacity: +!!a
                }}>
                      <div style={{
                    borderTop: `1px solid var(--border-thin)`,
                    paddingTop: `1.5rem`,
                    display: `flex`,
                    flexDirection: `column`,
                    gap: `1.2rem`
                  }}>
                        <div>
                          <h4 style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: `0.5rem`,
                        fontSize: `0.85rem`,
                        fontWeight: 800,
                        color: `var(--accent-copper)`,
                        textTransform: `uppercase`,
                        marginBottom: `0.3rem`
                      }}>
                            <Lightbulb size={14} />
                            {` THE CHALLENGE`}
                          </h4>
                          <p style={{
                        fontSize: `0.92rem`,
                        color: `var(--text-secondary)`,
                        margin: 0,
                        lineHeight: `1.5`
                      }}>
                            {e.challenge}
                          </p>
                        </div>
                        <div>
                          <h4 style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: `0.5rem`,
                        fontSize: `0.85rem`,
                        fontWeight: 800,
                        color: `var(--accent-green)`,
                        textTransform: `uppercase`,
                        marginBottom: `0.3rem`
                      }}>
                            <Cpu size={14} />
                            {` THE SOLUTION`}
                          </h4>
                          <p style={{
                        fontSize: `0.92rem`,
                        color: `var(--text-secondary)`,
                        margin: 0,
                        lineHeight: `1.5`
                      }}>
                            {e.solution}
                          </p>
                        </div>
                        <div>
                          <h4 style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: `0.5rem`,
                        fontSize: `0.85rem`,
                        fontWeight: 800,
                        color: `var(--text-primary)`,
                        textTransform: `uppercase`,
                        marginBottom: `0.3rem`
                      }}>
                            <ShieldCheck size={14} />
                            {` THE OUTCOME`}
                          </h4>
                          <p style={{
                        fontSize: `0.92rem`,
                        color: `var(--text-secondary)`,
                        margin: 0,
                        lineHeight: `1.5`
                      }}>
                            {e.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => i(e.id)} className="btn btn-secondary" style={{
                    padding: `0.8rem 1.6rem`,
                    fontSize: `0.75rem`,
                    letterSpacing: `0.05em`
                  }}>
                        {a ? `HIDE CASE DETAILS` : `READ CASE STUDY STORY`}
                      </button>
                    </div>
                    <div style={{
                  borderTop: `1px solid var(--border-thin)`,
                  paddingTop: `1.2rem`,
                  marginTop: `0.5rem`,
                  display: `flex`,
                  flexWrap: `wrap`,
                  gap: `0.5rem`
                }}>
                      {e.technologies && e.technologies.map((e, t) => <span key={t} style={{
                    fontSize: `0.68rem`,
                    fontWeight: 700,
                    padding: `0.3rem 0.6rem`,
                    backgroundColor: `var(--bg-secondary)`,
                    color: `var(--text-secondary)`,
                    textTransform: `uppercase`,
                    letterSpacing: `0.04em`
                  }}>
                            {e}
                          </span>)}
                    </div>
                  </div>
                  <div className="image-zoom-container" style={{
                width: `100%`,
                aspectRatio: `1.2`,
                backgroundColor: `var(--bg-secondary)`,
                border: `1px solid var(--border-thin)`,
                padding: `1rem`
              }}>
                    <div style={{
                  width: `100%`,
                  height: `100%`,
                  overflow: `hidden`,
                  position: `relative`,
                  backgroundColor: `var(--bg-primary)`
                }}>
                      <img src={e.image} alt={e.title} className="image-zoom-img" />
                      <div style={{
                    position: `absolute`,
                    top: `1rem`,
                    right: `1rem`,
                    width: `36px`,
                    height: `36px`,
                    backgroundColor: `rgba(18, 18, 18, 0.95)`,
                    color: `var(--text-light)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    cursor: `pointer`
                  }}>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
      <style>{`
        /* Stacking zoom effect and overlays */
        .project-sticky-wrapper:hover .project-card-box {
          transform: translateY(-4px);
        }
        @media (max-width: 1024px) {
          .project-card-box {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 2.5rem 1.5rem !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }
          .work-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>;
}

export default Work;
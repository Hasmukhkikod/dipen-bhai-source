import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function BlogPage({
  currentPath: e
}) {
  let {
      data: t
    } = useContent(),
    n = t.blogs || [];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `instant`
    });
  }, [e]);
  let r = e.startsWith(`#/blog/`),
    i = r ? e.replace(`#/blog/`, ``) : ``,
    a = r ? n.find(e => e.id === i || e.slug === i) : null;
  return <div style={{
    backgroundColor: `var(--bg-primary)`,
    minHeight: `100vh`,
    display: `flex`,
    flexDirection: `column`
  }}>
      <header style={{
      borderBottom: `1px solid var(--border-thin)`,
      padding: `2rem 0`,
      backgroundColor: `var(--bg-primary)`,
      position: `sticky`,
      top: 0,
      zIndex: 50
    }}>
        <div className="container-custom" style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`
      }}>
          <a href="#/" style={{
          fontSize: `1.1rem`,
          fontWeight: 850,
          textTransform: `uppercase`,
          color: `var(--text-primary)`,
          letterSpacing: `0.05em`,
          textDecoration: `none`,
          display: `flex`,
          alignItems: `center`,
          gap: `0.5rem`
        }}>
            <span>{`NAVYRIX LABS`}</span>
          </a>
          <div style={{
          display: `flex`,
          gap: `2rem`,
          alignItems: `center`
        }}>
            <a href="#/" style={{
            fontSize: `0.8rem`,
            fontWeight: 700,
            textTransform: `uppercase`,
            color: `var(--text-secondary)`,
            textDecoration: `none`,
            letterSpacing: `0.05em`
          }}>{`Portfolio`}</a>
            <a href="#/blog" style={{
            fontSize: `0.8rem`,
            fontWeight: 700,
            textTransform: `uppercase`,
            color: `var(--accent-copper)`,
            textDecoration: `none`,
            letterSpacing: `0.05em`
          }}>{`Writing`}</a>
          </div>
        </div>
      </header>
      <main style={{
      flexGrow: 1,
      padding: `6rem 0`
    }}>
        <div className="container-custom">
          {r && a ? <article style={{
          maxWidth: `800px`,
          margin: `0 auto`
        }}>
              <a href="#/blog" style={{
            display: `inline-flex`,
            alignItems: `center`,
            gap: `0.5rem`,
            color: `var(--text-secondary)`,
            fontSize: `0.85rem`,
            fontWeight: 700,
            textTransform: `uppercase`,
            textDecoration: `none`,
            letterSpacing: `0.05em`,
            marginBottom: `3rem`,
            transition: `color 0.2s ease`
          }} className="hover-copper">
                <ArrowLeft size={16} />
                {`Back to all writing`}
              </a>
              <div style={{
            display: `flex`,
            flexWrap: `wrap`,
            gap: `1.5rem`,
            alignItems: `center`,
            marginBottom: `1.5rem`
          }}>
                <span style={{
              fontSize: `0.7rem`,
              fontWeight: 800,
              color: `var(--accent-copper)`,
              backgroundColor: `var(--bg-secondary)`,
              padding: `0.3rem 0.7rem`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>
                  {a.category}
                </span>
                <span style={{
              fontSize: `0.85rem`,
              color: `var(--text-secondary)`,
              display: `flex`,
              alignItems: `center`,
              gap: `0.4rem`
            }}>
                  <Calendar size={14} />
                  {a.date}
                </span>
                <span style={{
              fontSize: `0.85rem`,
              color: `var(--text-secondary)`,
              display: `flex`,
              alignItems: `center`,
              gap: `0.4rem`
            }}>
                  <Clock size={14} />
                  {a.readTime}
                </span>
              </div>
              <h1 style={{
            fontSize: `clamp(2.2rem, 4vw, 3.8rem)`,
            fontWeight: 800,
            textTransform: `uppercase`,
            lineHeight: `1.05`,
            color: `var(--text-primary)`,
            letterSpacing: `-0.02em`,
            marginBottom: `2.5rem`
          }}>
                {a.title}
              </h1>
              {a.image && <div style={{
            border: `1px solid var(--border-thin)`,
            padding: `1.5rem`,
            backgroundColor: `var(--bg-secondary)`,
            marginBottom: `3.5rem`
          }}>
                  <div style={{
              width: `100%`,
              height: `auto`,
              maxHeight: `450px`,
              overflow: `hidden`
            }}>
                    <img src={a.image} alt={a.title} style={{
                width: `100%`,
                height: `100%`,
                objectFit: `cover`,
                display: `block`
              }} />
                  </div>
                </div>}
              <div style={{
            color: `var(--text-secondary)`,
            lineHeight: `1.8`
          }} className="blog-content-body">
                {(e => e ? e.split(`

`).map((e, t) => {
              if (e.startsWith(`### `)) return <h3 key={t} style={{
                fontSize: `1.4rem`,
                fontWeight: 800,
                marginTop: `2.5rem`,
                marginBottom: `1rem`,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                letterSpacing: `-0.01em`
              }}>
                                {e.replace(`### `, ``)}
                              </h3>;
              if (e.startsWith(`## `)) return <h2 key={t} style={{
                fontSize: `1.8rem`,
                fontWeight: 800,
                marginTop: `3rem`,
                marginBottom: `1rem`,
                textTransform: `uppercase`,
                color: `var(--text-primary)`,
                letterSpacing: `-0.01em`
              }}>
                                {e.replace(`## `, ``)}
                              </h2>;
              if (e.trim().startsWith(`* `) || e.trim().startsWith(`- `)) {
                let n = e.split(`
`).map(e => e.replace(/^[*-\s]+/, ``));
                return <ul key={t} style={{
                  paddingLeft: `1.5rem`,
                  margin: `1.5rem 0`,
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.6rem`,
                  listStyleType: `square`,
                  color: `var(--text-secondary)`
                }}>
                                {n.map((e, t) => <li key={t} style={{
                    lineHeight: `1.6`,
                    fontSize: `1.05rem`
                  }}>
                                    {e.split(`**`).map((e, t) => t % 2 == 1 ? <strong key={t} style={{
                      color: `var(--text-primary)`
                    }}>
                                          {e}
                                        </strong> : e)}
                                  </li>)}
                              </ul>;
              }
              if (/^\d+\.\s/.test(e.trim())) {
                let n = e.split(`
`).map(e => e.replace(/^\d+\.\s+/, ``));
                return <ol key={t} style={{
                  paddingLeft: `1.5rem`,
                  margin: `1.5rem 0`,
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.6rem`,
                  color: `var(--text-secondary)`
                }}>
                                {n.map((e, t) => <li key={t} style={{
                    lineHeight: `1.6`,
                    fontSize: `1.05rem`
                  }}>
                                    {e.split(`**`).map((e, t) => t % 2 == 1 ? <strong key={t} style={{
                      color: `var(--text-primary)`
                    }}>
                                          {e}
                                        </strong> : e)}
                                  </li>)}
                              </ol>;
              }
              return <p key={t} style={{
                lineHeight: `1.75`,
                color: `var(--text-secondary)`,
                marginBottom: `1.5rem`,
                fontSize: `1.08rem`
              }}>
                              {e.split(`**`).map((e, t) => t % 2 == 1 ? <strong key={t} style={{
                  color: `var(--text-primary)`
                }}>
                                    {e}
                                  </strong> : e)}
                            </p>;
            }) : null)(a.content)}
              </div>
              <div style={{
            borderTop: `1px solid var(--border-thin)`,
            margin: `5rem 0 3rem 0`
          }} />
              <div style={{
            display: `flex`,
            alignItems: `center`,
            gap: `1.5rem`
          }}>
                <div style={{
              width: `60px`,
              height: `60px`,
              borderRadius: `50%`,
              overflow: `hidden`,
              border: `1px solid var(--border-thin)`
            }}>
                  <img src="/dipen_portrait.png" alt="Dipen Parmar" style={{
                width: `100%`,
                height: `100%`,
                objectFit: `cover`
              }} />
                </div>
                <div>
                  <h4 style={{
                margin: 0,
                fontSize: `1rem`,
                fontWeight: 800,
                color: `var(--text-primary)`,
                textTransform: `uppercase`
              }}>{`Dipen Parmar`}</h4>
                  <p style={{
                margin: 0,
                fontSize: `0.85rem`,
                color: `var(--text-secondary)`
              }}>{`Electronics & IoT Leader | Agile Leader | Agritech Entrepreneur`}</p>
                </div>
              </div>
            </article> : <div>
              <div style={{
            borderBottom: `1px solid var(--border-thin)`,
            paddingBottom: `3rem`,
            marginBottom: `5rem`
          }}>
                <span style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              color: `var(--text-secondary)`,
              textTransform: `uppercase`,
              letterSpacing: `0.12em`,
              display: `block`,
              marginBottom: `1rem`
            }}>{`WRITING & JOURNAL`}</span>
                <h1 style={{
              fontSize: `clamp(2.5rem, 5vw, 4.5rem)`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--text-primary)`,
              lineHeight: `1`,
              margin: 0
            }}>
                  {`Insights on `}
                  <span className="serif-italic" style={{
                textTransform: `lowercase`,
                fontWeight: 300,
                color: `var(--accent-copper)`
              }}>{`hardware & IoT.`}</span>
                </h1>
              </div>
              {n.length === 0 ? <div style={{
            padding: `4rem 0`,
            textAlign: `center`
          }}>
                  <p style={{
              color: `var(--text-secondary)`
            }}>{`No publications available yet. Check back soon!`}</p>
                  <a href="#/" className="btn btn-accent" style={{
              marginTop: `1.5rem`
            }}>{`Back to home`}</a>
                </div> : <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fill, minmax(280px, 1fr))`,
            gap: `2.5rem`
          }}>
                  {n.map(e => <a key={e.id} href={`#/blog/${e.slug || e.id}`} style={{
              textDecoration: `none`,
              display: `block`,
              color: `inherit`
            }} className="blog-list-card-link">
                      <div style={{
                border: `1px solid var(--border-thin)`,
                padding: `2rem`,
                height: `100%`,
                display: `flex`,
                flexDirection: `column`,
                gap: `1.5rem`,
                backgroundColor: `var(--bg-primary)`,
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
              }} className="blog-card">
                        {e.image && <div style={{
                  width: `100%`,
                  aspectRatio: `1.6`,
                  overflow: `hidden`,
                  border: `1px solid var(--border-thin)`
                }}>
                            <img src={e.image} alt={e.title} style={{
                    width: `100%`,
                    height: `100%`,
                    objectFit: `cover`,
                    transition: `transform 0.5s ease`
                  }} className="blog-img" />
                          </div>}
                        <div style={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  alignItems: `center`
                }}>
                          <span style={{
                    fontSize: `0.68rem`,
                    fontWeight: 800,
                    color: `var(--accent-copper)`,
                    textTransform: `uppercase`,
                    letterSpacing: `0.05em`
                  }}>
                            {e.category}
                          </span>
                          <span style={{
                    fontSize: `0.8rem`,
                    color: `var(--text-secondary)`,
                    display: `flex`,
                    alignItems: `center`,
                    gap: `0.3rem`
                  }}>
                            <Clock size={12} />
                            {e.readTime}
                          </span>
                        </div>
                        <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.75rem`,
                  flexGrow: 1
                }}>
                          <h3 style={{
                    fontSize: `1.25rem`,
                    fontWeight: 850,
                    textTransform: `uppercase`,
                    lineHeight: `1.2`,
                    color: `var(--text-primary)`,
                    margin: 0,
                    letterSpacing: `-0.01em`,
                    transition: `color 0.2s ease`
                  }} className="blog-title">
                            {e.title}
                          </h3>
                          <p style={{
                    fontSize: `0.92rem`,
                    lineHeight: `1.5`,
                    color: `var(--text-secondary)`,
                    margin: 0
                  }}>
                            {e.excerpt}
                          </p>
                        </div>
                        <div style={{
                  borderTop: `1px solid var(--border-thin)`,
                  paddingTop: `1.2rem`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                  fontWeight: 700,
                  fontSize: `0.75rem`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.05em`,
                  color: `var(--text-primary)`
                }}>
                          <span>{`Read Full Insight`}</span>
                          <ArrowUpRight size={16} style={{
                    color: `var(--accent-copper)`
                  }} />
                        </div>
                      </div>
                    </a>)}
                </div>}
            </div>}
        </div>
      </main>
      <footer style={{
      borderTop: `1px solid var(--border-thin)`,
      padding: `3rem 0`,
      backgroundColor: `var(--bg-secondary)`,
      color: `var(--text-secondary)`,
      fontSize: `0.85rem`
    }}>
        <div className="container-custom" style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        flexWrap: `wrap`,
        gap: `1.5rem`
      }}>
          <div>
            {`© `}
            {new Date().getFullYear()}
            {` NAVYRIX LABS. All rights reserved.`}
          </div>
          <div style={{
          display: `flex`,
          gap: `1.5rem`
        }}>
            <a href="#/" style={{
            color: `inherit`,
            textDecoration: `none`
          }}>{`Portfolio Home`}</a>
          </div>
        </div>
      </footer>
      <style>{`
        .blog-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-copper);
          box-shadow: 0 15px 30px -15px rgba(193, 92, 61, 0.1);
        }
        .blog-card:hover .blog-title {
          color: var(--accent-copper) !important;
        }
        .blog-card:hover .blog-img {
          transform: scale(1.05);
        }
        .hover-copper:hover {
          color: var(--accent-copper) !important;
        }
        @media (max-width: 600px) {
          .blog-list-card-link {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>;
}

export default BlogPage;
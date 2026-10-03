import { useState } from 'react';
import { BookOpen, ExternalLink, FolderGit2, Image as ImageIcon, Inbox, LayoutDashboard, Mic2, PenLine, Plus, RotateCcw, Save, Settings as SettingsIcon, Trash2, UserCog } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import PartnersManager from '../components/PartnersManager';
import AdminImageUpload from '../components/AdminImageUpload';
import { toast } from 'sonner';

const adminFieldStyle = {
  padding: `0.75rem`,
  color: `#FAF8F5`,
  background: `#1E1E1E`,
  border: `1px solid rgba(255,255,255,0.1)`,
  outline: `none`,
};

function confirmWithToast({ title, description, actionLabel = 'Delete', onConfirm }) {
  toast.custom((toastId) => (
    <div role="alertdialog" aria-label={title} style={{ width: `min(360px, calc(100vw - 32px))`, padding: `1rem`, border: `1px solid rgba(255,255,255,0.12)`, background: `#202020`, color: `#FAF8F5`, boxShadow: `0 16px 42px rgba(0,0,0,.38)` }}>
      <strong style={{ display: `block`, fontSize: `0.9rem` }}>{title}</strong>
      {description && <span style={{ display: `block`, marginTop: `0.35rem`, color: `#A09E9B`, fontSize: `0.78rem`, lineHeight: 1.45 }}>{description}</span>}
      <div style={{ display: `flex`, justifyContent: `flex-end`, gap: `0.5rem`, marginTop: `1rem` }}>
        <button type="button" onClick={() => toast.dismiss(toastId)} style={{ padding: `0.55rem 0.8rem`, border: `1px solid rgba(255,255,255,.16)`, background: `transparent`, color: `#E5E2DD`, cursor: `pointer`, fontSize: `0.75rem`, fontWeight: 700 }}>Cancel</button>
        <button type="button" onClick={() => { toast.dismiss(toastId); onConfirm(); }} style={{ padding: `0.55rem 0.8rem`, border: `1px solid #8D3525`, background: `#8D3525`, color: `#fff`, cursor: `pointer`, fontSize: `0.75rem`, fontWeight: 700 }}>{actionLabel}</button>
      </div>
    </div>
  ), { duration: Infinity, position: 'bottom-right' });
}

function AdminPanel() {
  let {
      data: e,
      isAdmin: d,
      login: le,
      logout: ne,
      changePassword: we,
      updateProfile: t,
      updateSettings: n,
      addProject: r,
      updateProject: i,
      deleteProject: a,
      deleteLead: o,
      addBlog: s,
      updateBlog: c,
      deleteBlog: l,
      addTalk: addTalk,
      updateTalk: updateTalk,
      deleteTalk: deleteTalk,
      resetData: u
    } = useContent(),
    [p, m] = useState(``),
    [h, g] = useState(``),
    [v, y] = useState(`dashboard`),
    [b, S] = useState({
      ...e.profile
    }),
    [C, ee] = useState({
      ...e.settings
    }),
    [ke, Se] = useState({ current: ``, next: ``, confirm: `` }),
    [Ce, xe] = useState(``),
    te = async t => {
      t.preventDefault();
      g(``);
      try {
        await le(p);
        m(``);
      } catch (err) {
        g(err.message || `Incorrect passcode. Please try again.`);
      }
    },
    Ee = async t => {
      t.preventDefault();
      xe(``);
      if (ke.next !== ke.confirm) return xe(`New password and confirmation don't match.`);
      if (ke.next.length < 6) return xe(`New password must be at least 6 characters.`);
      try {
        await we(ke.current, ke.next);
        Se({ current: ``, next: ``, confirm: `` });
        toast.success('Password changed successfully.');
      } catch (err) {
        xe(err.message || `Could not change password.`);
      }
    },
    [T, re] = useState(null),
    [ie, ae] = useState(!1),
    [E, oe] = useState({
      title: ``,
      category: ``,
      shortDescription: ``,
      challenge: ``,
      solution: ``,
      outcome: ``,
      role: ``,
      image: `/nebulae_iot.png`,
      technologies: ``
    }),
    [D, se] = useState(null),
    [O, k] = useState(!1),
    [talkFormOpen, setTalkFormOpen] = useState(false),
    [editingTalk, setEditingTalk] = useState(null),
    [talkDraft, setTalkDraft] = useState({ date: '', event: '', topic: '', description: '', image: '' }),
    [A, ce] = useState({
      title: ``,
      excerpt: ``,
      content: ``,
      category: `Agritech`,
      readTime: `5 min read`,
      image: `/me2millet.png`
    }),
    ue = () => {
      k(!0);
      se(null);
      ce({
        title: ``,
        excerpt: ``,
        content: ``,
        category: `Agritech`,
        readTime: `5 min read`,
        image: `/me2millet.png`
      });
    },
    j = e => {
      se(e);
      k(!1);
      ce({
        ...e
      });
    },
    M = async e => {
      e.preventDefault();
      try {
        if (O) {
          await s(A);
          k(!1);
          toast.success('Blog post created.');
        } else {
          await c({ ...A, id: D.id });
          se(null);
          toast.success('Blog post updated.');
        }
      } catch (err) {
        toast.error(err.message || `Could not save the blog post.`);
      }
    },
    openNewTalk = () => {
      setEditingTalk(null);
      setTalkDraft({ date: '', event: '', topic: '', description: '', image: '' });
      setTalkFormOpen(true);
    },
    openEditTalk = talk => {
      setEditingTalk(talk);
      setTalkDraft({ date: talk.date || '', event: talk.event || '', topic: talk.topic || '', description: talk.description || '', image: talk.image || '' });
      setTalkFormOpen(true);
    },
    saveTalk = async event => {
      event.preventDefault();
      try {
        if (editingTalk) await updateTalk({ ...talkDraft, id: editingTalk.id });
        else await addTalk(talkDraft);
        setTalkFormOpen(false);
        setEditingTalk(null);
        setTalkDraft({ date: '', event: '', topic: '', description: '', image: '' });
      } catch (error) {
        toast.error(error.message || 'Could not save the talk.');
      }
    },
    removeTalk = async id => {
      try {
        await deleteTalk(id);
        toast.success('Talk deleted');
      } catch (error) {
        toast.error(error.message || 'Could not delete the talk.');
      }
    },
    confirmDeleteTalk = talk => confirmWithToast({ title: 'Delete this talk?', description: talk.topic, actionLabel: 'Delete talk', onConfirm: () => removeTalk(talk.id) }),
    de = async e => {
      const blog = (e.blogs || []).find((item) => item.id === e);
      confirmWithToast({ title: 'Delete this blog post?', description: blog?.title, actionLabel: 'Delete post', onConfirm: async () => {
        try { await l(e); toast.success('Blog post deleted.'); } catch (err) { toast.error(err.message || `Could not delete the blog post.`); }
      } });
    },
    fe = async e => {
      e.preventDefault();
      try {
        await t(b);
        toast.success('Profile settings saved.');
      } catch (err) {
        toast.error(err.message || `Could not save profile changes.`);
      }
    },
    pe = async e => {
      e.preventDefault();
      try {
        await n(C);
        toast.success('SEO and contact settings saved.');
      } catch (err) {
        toast.error(err.message || `Could not save settings.`);
      }
    },
    me = () => {
      ae(!0);
      re(null);
      oe({
        title: ``,
        category: ``,
        shortDescription: ``,
        challenge: ``,
        solution: ``,
        outcome: ``,
        role: ``,
        image: `/nebulae_iot.png`,
        technologies: ``
      });
    },
    he = e => {
      re(e);
      ae(!1);
      oe({
        ...e,
        technologies: e.technologies.join(`, `)
      });
    },
    _e = async e => {
      e.preventDefault();
      let t = {
        ...E,
        technologies: E.technologies.split(`,`).map(e => e.trim()).filter(Boolean)
      };
      try {
        if (ie) {
          await r(t);
          ae(!1);
          toast.success('Project created.');
        } else {
          await i({ ...t, id: T.id, number: T.number });
          re(null);
          toast.success('Project updated.');
        }
      } catch (err) {
        toast.error(err.message || `Could not save the project.`);
      }
    },
    ye = async e => {
      const project = (e.projects || []).find((item) => item.id === e);
      confirmWithToast({ title: 'Delete this project?', description: project?.title, actionLabel: 'Delete project', onConfirm: async () => {
        try { await a(e); toast.success('Project deleted.'); } catch (err) { toast.error(err.message || `Could not delete the project.`); }
      } });
    },
    be = async e => {
      const lead = (e.leads || []).find((item) => item.id === e);
      confirmWithToast({ title: 'Delete this contact lead?', description: lead?.name, actionLabel: 'Delete lead', onConfirm: async () => {
        try { await o(e); toast.success('Contact lead deleted.'); } catch (err) { toast.error(err.message || `Could not delete the lead.`); }
      } });
    };
  return d ? <>
      <div style={{
    minHeight: `100vh`,
    backgroundColor: `#0F0F0F`,
    color: `#E5E2DD`,
    fontFamily: `var(--font-sans)`,
    display: `grid`,
    gridTemplateColumns: `260px 1fr`
  }} className="admin-root">
      <aside style={{
      backgroundColor: `#161616`,
      borderRight: `1px solid rgba(255, 255, 255, 0.05)`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
      padding: `2rem 1.5rem`
    }}>
        <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `3rem`
      }}>
          <div>
            <h1 style={{
            fontWeight: 850,
            fontSize: `1.2rem`,
            color: `#FAF8F5`,
            letterSpacing: `-0.02em`,
            margin: 0
          }}>{`NAVYRIX LABS`}</h1>
            <span style={{
            fontSize: `0.65rem`,
            fontWeight: 700,
            color: `var(--accent-copper)`,
            textTransform: `uppercase`,
            letterSpacing: `0.1em`
          }}>{`Core Admin Engine v1.0`}</span>
          </div>
          <nav style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `0.5rem`
        }}>
            <button onClick={() => {
            y(`dashboard`);
            ae(!1);
            re(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `dashboard` ? `#222222` : `transparent`,
            color: v === `dashboard` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <LayoutDashboard size={16} />
              {`Dashboard`}
            </button>
            <button onClick={() => {
            y(`profile`);
            ae(!1);
            re(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `profile` ? `#222222` : `transparent`,
            color: v === `profile` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <UserCog size={16} />
              {`Profile Editor`}
            </button>
            <button onClick={() => {
            y(`projects`);
            ae(!1);
            re(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `projects` ? `#222222` : `transparent`,
            color: v === `projects` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <FolderGit2 size={16} />
              {`Project Manager`}
            </button>
            <button onClick={() => {
            y(`partners`);
            ae(!1);
            re(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `partners` ? `#222222` : `transparent`,
            color: v === `partners` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <ImageIcon size={16} />
              {`Trusted Partners`}
            </button>
            <button onClick={() => {
            y(`blogs`);
            k(!1);
            se(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `blogs` ? `#222222` : `transparent`,
            color: v === `blogs` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <BookOpen size={16} />
              {`Blog Manager`}
            </button>
            <button onClick={() => {
            y(`talks`);
            setTalkFormOpen(false);
            setEditingTalk(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `talks` ? `#222222` : `transparent`,
            color: v === `talks` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <Mic2 size={16} />
              {`Talks Manager`}
            </button>
            <button onClick={() => {
            y(`leads`);
            ae(!1);
            re(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `leads` ? `#222222` : `transparent`,
            color: v === `leads` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <Inbox size={16} />
              {`Contact Leads (`}
              {e.leads.length}
              {`)`}
            </button>
            <button onClick={() => {
            y(`settings`);
            ae(!1);
            re(null);
          }} style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.75rem`,
            padding: `0.8rem 1rem`,
            width: `100%`,
            textAlign: `left`,
            border: `none`,
            background: v === `settings` ? `#222222` : `transparent`,
            color: v === `settings` ? `#FAF8F5` : `#8C8A87`,
            fontWeight: 600,
            fontSize: `0.85rem`,
            cursor: `pointer`,
            borderRadius: `4px`,
            transition: `all 0.2s ease`
          }}>
              <SettingsIcon size={16} />
              {`System Settings`}
            </button>
          </nav>
        </div>
        <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `1rem`
      }}>
          <a href="#/" style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: `0.5rem`,
          padding: `0.8rem`,
          width: `100%`,
          border: `1px dashed rgba(255,255,255,0.15)`,
          borderRadius: `4px`,
          fontSize: `0.8rem`,
          fontWeight: 700,
          color: `#FAF8F5`,
          backgroundColor: `#1E1E1E`,
          cursor: `pointer`
        }}>
            {`VIEW PORTFOLIO`}
            <ExternalLink size={14} />
          </a>
          <button onClick={() => confirmWithToast({
          title: 'Reset profile and settings?',
          description: 'This restores profile and SEO/contact settings to defaults. Leads, blog posts, projects, and talks are not affected.',
          actionLabel: 'Reset settings',
          onConfirm: async () => {
            try {
              await u();
              toast.success('Profile and settings restored.');
              window.location.reload();
            } catch (error) {
              toast.error(error.message || 'Could not reset settings.');
            }
          },
        })} style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: `0.5rem`,
          padding: `0.6rem`,
          width: `100%`,
          border: `none`,
          background: `transparent`,
          color: `#8C8A87`,
          fontSize: `0.75rem`,
          fontWeight: 600,
          cursor: `pointer`,
          marginBottom: `0.5rem`
        }}>
            <RotateCcw size={12} />
            {`Reset Factory Data`}
          </button>
          <button onClick={ne} style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: `0.5rem`,
          padding: `0.8rem`,
          width: `100%`,
          border: `none`,
          background: `#3D1C1C`,
          color: `#FF7F7F`,
          fontSize: `0.75rem`,
          fontWeight: 700,
          cursor: `pointer`,
          borderRadius: `4px`
        }}>{`LOG OUT SESSION`}</button>
        </div>
      </aside>
      <main style={{
      padding: `3rem 4rem`,
      overflowY: `auto`,
      height: `100vh`
    }}>
        {v === `dashboard` && <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `2.5rem`
      }}>
            <div>
              <h2 style={{
            fontSize: `2rem`,
            fontWeight: 800,
            textTransform: `uppercase`,
            color: `#FAF8F5`
          }}>{`ADMIN METRICS CONTROL`}</h2>
              <p style={{
            color: `#8C8A87`,
            fontSize: `0.9rem`,
            margin: 0
          }}>{`Overview of database stats, lead generation pipelines, and publication statuses.`}</p>
            </div>
            <div style={{
          display: `grid`,
          gridTemplateColumns: `repeat(4, 1fr)`,
          gap: `1.5rem`
        }} className="admin-cards-grid">
              <div style={{
            backgroundColor: `#161616`,
            padding: `2rem`,
            border: `1px solid rgba(255,255,255,0.05)`
          }}>
                <span style={{
              fontSize: `0.7rem`,
              fontWeight: 800,
              color: `#8C8A87`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>{`Total Inquiries`}</span>
                <span style={{
              display: `block`,
              fontSize: `3rem`,
              fontWeight: 300,
              color: `var(--accent-copper)`,
              margin: `0.5rem 0`
            }}>
                  {e.leads.length}
                </span>
                <span style={{
              fontSize: `0.8rem`,
              color: `#8C8A87`
            }}>{`Stored leads`}</span>
              </div>
              <div style={{
            backgroundColor: `#161616`,
            padding: `2rem`,
            border: `1px solid rgba(255,255,255,0.05)`
          }}>
                <span style={{
              fontSize: `0.7rem`,
              fontWeight: 800,
              color: `#8C8A87`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>{`Projects`}</span>
                <span style={{
              display: `block`,
              fontSize: `3rem`,
              fontWeight: 300,
              color: `var(--accent-copper)`,
              margin: `0.5rem 0`
            }}>
                  {e.projects.length}
                </span>
                <span style={{
              fontSize: `0.8rem`,
              color: `#8C8A87`
            }}>{`Showcase projects`}</span>
              </div>
              <div style={{
            backgroundColor: `#161616`,
            padding: `2rem`,
            border: `1px solid rgba(255,255,255,0.05)`
          }}>
                <span style={{
              fontSize: `0.7rem`,
              fontWeight: 800,
              color: `#8C8A87`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>{`Blog Articles`}</span>
                <span style={{
              display: `block`,
              fontSize: `3rem`,
              fontWeight: 300,
              color: `var(--accent-copper)`,
              margin: `0.5rem 0`
            }}>
                  {e.blogs?.length || 0}
                </span>
                <span style={{
              fontSize: `0.8rem`,
              color: `#8C8A87`
            }}>{`Published posts`}</span>
              </div>
              <div style={{
            backgroundColor: `#161616`,
            padding: `2rem`,
            border: `1px solid rgba(255,255,255,0.05)`
          }}>
                <span style={{
              fontSize: `0.7rem`,
              fontWeight: 800,
              color: `#8C8A87`,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>{`Sync Engine`}</span>
                <span style={{
              display: `block`,
              fontSize: `2.5rem`,
              fontWeight: 300,
              color: `#3D644E`,
              margin: `0.9rem 0`
            }}>{`LIVE`}</span>
                <span style={{
              fontSize: `0.8rem`,
              color: `#8C8A87`
            }}>{`Local sync active`}</span>
              </div>
            </div>
            <div style={{
          backgroundColor: `#161616`,
          padding: `2.5rem`,
          border: `1px solid rgba(255,255,255,0.05)`,
          display: `flex`,
          flexDirection: `column`,
          gap: `1.5rem`
        }}>
              <div style={{
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`
          }}>
                <h3 style={{
              fontSize: `1.1rem`,
              fontWeight: 700,
              textTransform: `uppercase`,
              margin: 0
            }}>{`Recent Client Enquiries`}</h3>
                <button onClick={() => y(`leads`)} style={{
              border: `none`,
              background: `transparent`,
              color: `var(--accent-copper)`,
              fontSize: `0.8rem`,
              fontWeight: 700,
              cursor: `pointer`
            }}>{`VIEW ALL INBOX`}</button>
              </div>
              {e.leads.length === 0 ? <p style={{
            color: `#8C8A87`,
            fontSize: `0.9rem`,
            margin: 0
          }}>{`No leads available.`}</p> : <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `1rem`
          }}>
                  {e.leads.slice(0, 2).map(e => <div key={e.id} style={{
              backgroundColor: `#1E1E1E`,
              padding: `1.5rem`,
              border: `1px solid rgba(255,255,255,0.02)`,
              display: `grid`,
              gridTemplateColumns: `1.5fr 3fr 1.5fr`,
              gap: `1.5rem`,
              alignItems: `center`
            }} className="lead-preview-row">
                      <div>
                        <span style={{
                  fontWeight: 700,
                  display: `block`,
                  fontSize: `0.9rem`
                }}>
                          {e.name}
                        </span>
                        <span style={{
                  fontSize: `0.75rem`,
                  color: `#8C8A87`
                }}>
                          {e.company || `No Company`}
                        </span>
                      </div>
                      <p style={{
                fontSize: `0.85rem`,
                color: `#A09E9B`,
                margin: 0,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
                whiteSpace: `nowrap`
              }}>
                        {e.description}
                      </p>
                      <div style={{
                textAlign: `right`,
                fontSize: `0.8rem`,
                color: `#8C8A87`
              }}>
                        {new Date(e.date).toLocaleDateString()}
                      </div>
                    </div>)}
                </div>}
            </div>
          </div>}
        {v === `profile` && <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `2.5rem`
      }}>
            <div>
              <h2 style={{
            fontSize: `2rem`,
            fontWeight: 800,
            textTransform: `uppercase`,
            color: `#FAF8F5`
          }}>{`Profile Editor`}</h2>
              <p style={{
            color: `#8C8A87`,
            fontSize: `0.9rem`,
            margin: 0
          }}>{`Configure personal headers, taglines, biographies, and coordinates.`}</p>
            </div>
            <form onSubmit={fe} style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `2rem`
        }}>
              <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`
          }} className="admin-inputs-row">
                <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                  <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`,
                color: `#FAF8F5`
              }}>{`First Name`}</label>
                  <input type="text" value={b.firstName} onChange={e => S({
                ...b,
                firstName: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                </div>
                <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                  <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`,
                color: `#FAF8F5`
              }}>{`Last Name`}</label>
                  <input type="text" value={b.lastName} onChange={e => S({
                ...b,
                lastName: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                </div>
              </div>
              <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`,
              color: `#FAF8F5`
            }}>{`Professional Role Title / Subtitle`}</label>
                <input type="text" value={b.roleDescription} onChange={e => S({
              ...b,
              roleDescription: e.target.value
            })} style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`
            }} />
              </div>
              <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`,
              color: `#FAF8F5`
            }}>{`Hero Bold Headline Statement`}</label>
                <input type="text" value={b.tagline} onChange={e => S({
              ...b,
              tagline: e.target.value
            })} style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`
            }} />
              </div>
              <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`,
              color: `#FAF8F5`
            }}>{`Short Bio summary (Hero column)`}</label>
                <textarea value={b.shortBio} onChange={e => S({
              ...b,
              shortBio: e.target.value
            })} rows="3" style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`,
              resize: `none`,
              fontFamily: `var(--font-sans)`
            }} />
              </div>
              <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`,
              color: `#FAF8F5`
            }}>{`About Editorial Biography Intro`}</label>
                <textarea value={b.aboutIntro} onChange={e => S({
              ...b,
              aboutIntro: e.target.value
            })} rows="5" style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`,
              resize: `none`,
              fontFamily: `var(--font-sans)`
            }} />
              </div>
              <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`
          }} className="admin-inputs-row">
                <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                  <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`,
                color: `#FAF8F5`
              }}>{`Avatar Image Path`}</label>
                  <input type="text" value={b.avatarUrl} onChange={e => S({
                ...b,
                avatarUrl: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                  <AdminImageUpload value={b.avatarUrl} recommendation="Recommended portrait: 900 × 1200 px." onChange={avatarUrl => S(current => ({ ...current, avatarUrl }))} />
                </div>
                <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                  <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`,
                color: `#FAF8F5`
              }}>{`Discovery Calendly URL`}</label>
                  <input type="text" value={b.ctaDiscoveryUrl} onChange={e => S({
                ...b,
                ctaDiscoveryUrl: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-accent" style={{
              padding: `1rem 2.5rem`
            }}>
                  <Save size={16} style={{
                marginRight: `0.5rem`
              }} />
                  {`Save Profile Changes`}
                </button>
              </div>
            </form>
          </div>}
        {v === `partners` && <PartnersManager />}
        {v === `projects` && <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `2.5rem`
      }}>
            <div style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `flex-start`
        }}>
              <div>
                <h2 style={{
              fontSize: `2rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `#FAF8F5`
            }}>{`Project Manager`}</h2>
                <p style={{
              color: `#8C8A87`,
              fontSize: `0.9rem`,
              margin: 0
            }}>{`Add, edit, or delete horizontal showcase case studies.`}</p>
              </div>
              {!ie && !T && <button onClick={me} className="btn btn-accent" style={{
            padding: `0.8rem 1.5rem`,
            fontSize: `0.75rem`
          }}>
                  <Plus size={16} style={{
              marginRight: `0.4rem`
            }} />
                  {`ADD NEW PROJECT`}
                </button>}
            </div>
            {ie || T ? <form onSubmit={_e} style={{
          backgroundColor: `#161616`,
          border: `1px solid rgba(255,255,255,0.05)`,
          padding: `3rem`,
          display: `flex`,
          flexDirection: `column`,
          gap: `2rem`
        }}>
                <h3 style={{
            fontSize: `1.25rem`,
            fontWeight: 700,
            textTransform: `uppercase`,
            borderBottom: `1px solid rgba(255,255,255,0.05)`,
            paddingBottom: `1rem`,
            margin: 0
          }}>
                  {ie ? `Create New Case Study` : `Edit Case Study: ${T.title}`}
                </h3>
                <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`
          }} className="admin-inputs-row">
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Project Title *`}</label>
                    <input type="text" required={!0} value={E.title} onChange={e => oe({
                ...E,
                title: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                  </div>
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Industry / Category *`}</label>
                    <input type="text" required={!0} value={E.category} placeholder="e.g. Agritech / Edge AI + IoT" onChange={e => oe({
                ...E,
                category: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                  </div>
                </div>
                <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`
          }} className="admin-inputs-row">
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Your Role *`}</label>
                    <input type="text" required={!0} value={E.role} placeholder="e.g. Lead Architect / Co-Founder" onChange={e => oe({
                ...E,
                role: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                  </div>
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Image Path`}</label>
                    <input type="text" value={E.image} onChange={e => oe({
                ...E,
                image: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                    <AdminImageUpload value={E.image} recommendation="Recommended cover: 1200 × 800 px." onChange={image => oe(current => ({ ...current, image }))} />
                  </div>
                </div>
                <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                  <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`
            }}>{`Short Summary Description *`}</label>
                  <textarea required={!0} value={E.shortDescription} rows="2" onChange={e => oe({
              ...E,
              shortDescription: e.target.value
            })} style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`,
              resize: `none`,
              fontFamily: `var(--font-sans)`
            }} />
                </div>
                <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                  <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`
            }}>{`Technologies Used (comma separated) *`}</label>
                  <input type="text" required={!0} value={E.technologies} placeholder="e.g. 6LoWPAN, Zigbee, Wi-Fi, G3-PLC, STM32" onChange={e => oe({
              ...E,
              technologies: e.target.value
            })} style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`
            }} />
                </div>
                <div style={{
            borderTop: `1px solid rgba(255, 255, 255, 0.05)`,
            paddingTop: `1.5rem`,
            display: `flex`,
            flexDirection: `column`,
            gap: `1.5rem`
          }}>
                  <span style={{
              fontSize: `0.85rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--accent-copper)`
            }}>{`Detailed Story Parameters`}</span>
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`The Challenge`}</label>
                    <textarea value={E.challenge} rows="3" onChange={e => oe({
                ...E,
                challenge: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`,
                resize: `none`,
                fontFamily: `var(--font-sans)`
              }} />
                  </div>
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`The Solution`}</label>
                    <textarea value={E.solution} rows="3" onChange={e => oe({
                ...E,
                solution: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`,
                resize: `none`,
                fontFamily: `var(--font-sans)`
              }} />
                  </div>
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`The Outcome`}</label>
                    <textarea value={E.outcome} rows="3" onChange={e => oe({
                ...E,
                outcome: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`,
                resize: `none`,
                fontFamily: `var(--font-sans)`
              }} />
                  </div>
                </div>
                <div style={{
            display: `flex`,
            gap: `1.5rem`,
            marginTop: `1rem`
          }}>
                  <button type="submit" className="btn btn-accent" style={{
              padding: `1rem 2.5rem`
            }}>
                    <Save size={16} style={{
                marginRight: `0.5rem`
              }} />
                    {ie ? `Publish Project` : `Save Changes`}
                  </button>
                  <button type="button" onClick={() => {
              ae(!1);
              re(null);
            }} className="btn btn-secondary" style={{
              border: `1px solid rgba(255,255,255,0.1)`,
              color: `#FAF8F5`,
              padding: `1rem 2.5rem`
            }}>{`Cancel`}</button>
                </div>
              </form> : <div style={{
          display: `flex`,
          flexDirection: `column`,
          border: `1px solid rgba(255,255,255,0.05)`
        }}>
                {e.projects.map(e => <div key={e.id} style={{
            display: `grid`,
            gridTemplateColumns: `80px 1.5fr 3fr 150px`,
            padding: `2rem`,
            borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
            backgroundColor: `#161616`,
            alignItems: `center`
          }} className="admin-proj-row">
                    <span style={{
              fontSize: `1.25rem`,
              fontWeight: 300,
              color: `var(--accent-copper)`,
              fontFamily: `var(--font-serif)`,
              fontStyle: `italic`
            }}>
                      {e.number}
                    </span>
                    <div>
                      <h4 style={{
                fontSize: `1.1rem`,
                fontWeight: 700,
                margin: 0,
                textTransform: `uppercase`
              }}>
                        {e.title}
                      </h4>
                      <span style={{
                fontSize: `0.75rem`,
                color: `#8C8A87`,
                textTransform: `uppercase`
              }}>
                        {e.category}
                      </span>
                    </div>
                    <p style={{
              fontSize: `0.85rem`,
              color: `#A09E9B`,
              margin: 0,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
              whiteSpace: `nowrap`,
              paddingRight: `2rem`
            }}>
                      {e.shortDescription}
                    </p>
                    <div style={{
              display: `flex`,
              gap: `0.8rem`,
              justifyContent: `flex-end`
            }}>
                      <button onClick={() => he(e)} style={{
                border: `none`,
                background: `#2C2C2C`,
                color: `#FAF8F5`,
                padding: `0.5rem`,
                cursor: `pointer`
              }} title="Edit Project">
                        <PenLine size={16} />
                      </button>
                      <button onClick={() => ye(e.id)} style={{
                border: `none`,
                background: `#3D1C1C`,
                color: `#FF7F7F`,
                padding: `0.5rem`,
                cursor: `pointer`
              }} title="Delete Project">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>)}
              </div>}
          </div>}
        {v === `blogs` && <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `2.5rem`
      }}>
            <div style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `flex-start`
        }}>
              <div>
                <h2 style={{
              fontSize: `2rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `#FAF8F5`
            }}>{`Blog Manager`}</h2>
                <p style={{
              color: `#8C8A87`,
              fontSize: `0.9rem`,
              margin: 0
            }}>{`Add, edit, or delete articles and insights.`}</p>
              </div>
              {!O && !D && <button onClick={ue} className="btn btn-accent" style={{
            padding: `0.8rem 1.5rem`,
            fontSize: `0.75rem`
          }}>
                  <Plus size={16} style={{
              marginRight: `0.4rem`
            }} />
                  {`ADD NEW POST`}
                </button>}
            </div>
            {O || D ? <form onSubmit={M} style={{
          backgroundColor: `#161616`,
          border: `1px solid rgba(255,255,255,0.05)`,
          padding: `3rem`,
          display: `flex`,
          flexDirection: `column`,
          gap: `2rem`
        }}>
                <h3 style={{
            fontSize: `1.25rem`,
            fontWeight: 700,
            textTransform: `uppercase`,
            borderBottom: `1px solid rgba(255,255,255,0.05)`,
            paddingBottom: `1rem`,
            margin: 0
          }}>
                  {O ? `Create New Blog Post` : `Edit Post: ${D.title}`}
                </h3>
                <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`
          }} className="admin-inputs-row">
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Article Title *`}</label>
                    <input type="text" required={!0} value={A.title} onChange={e => ce({
                ...A,
                title: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                  </div>
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Category / Tag *`}</label>
                    <input type="text" required={!0} value={A.category} placeholder="e.g. Agritech, IoT Systems, Agile Leadership" onChange={e => ce({
                ...A,
                category: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                  </div>
                </div>
                <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gap: `1.5rem`
          }} className="admin-inputs-row">
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Read Time *`}</label>
                    <input type="text" required={!0} value={A.readTime} placeholder="e.g. 5 min read" onChange={e => ce({
                ...A,
                readTime: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                  </div>
                  <div style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `0.5rem`
            }}>
                    <label style={{
                fontSize: `0.75rem`,
                fontWeight: 700,
                textTransform: `uppercase`
              }}>{`Featured Image URL`}</label>
                    <input type="text" value={A.image} onChange={e => ce({
                ...A,
                image: e.target.value
              })} style={{
                backgroundColor: `#1E1E1E`,
                border: `1px solid rgba(255,255,255,0.05)`,
                color: `#FAF8F5`,
                padding: `0.8rem`,
                outline: `none`
              }} />
                    <AdminImageUpload value={A.image} recommendation="Recommended featured image: 1200 × 800 px." onChange={image => ce(current => ({ ...current, image }))} />
                  </div>
                </div>
                <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                  <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`
            }}>{`Brief Excerpt / Summary *`}</label>
                  <textarea required={!0} value={A.excerpt} rows="2" onChange={e => ce({
              ...A,
              excerpt: e.target.value
            })} style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`,
              resize: `none`,
              fontFamily: `var(--font-sans)`
            }} />
                </div>
                <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `0.5rem`
          }}>
                  <label style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              textTransform: `uppercase`
            }}>{`Article Content (Markdown supported) *`}</label>
                  <textarea required={!0} value={A.content} rows="12" onChange={e => ce({
              ...A,
              content: e.target.value
            })} style={{
              backgroundColor: `#1E1E1E`,
              border: `1px solid rgba(255,255,255,0.05)`,
              color: `#FAF8F5`,
              padding: `0.8rem`,
              outline: `none`,
              fontFamily: `monospace`,
              lineHeight: `1.5`
            }} />
                </div>
                <div style={{
            display: `flex`,
            gap: `1.5rem`,
            marginTop: `1rem`
          }}>
                  <button type="submit" className="btn btn-accent" style={{
              padding: `1rem 2.5rem`
            }}>
                    <Save size={16} style={{
                marginRight: `0.5rem`
              }} />
                    {O ? `Publish Article` : `Save Changes`}
                  </button>
                  <button type="button" onClick={() => {
              k(!1);
              se(null);
            }} className="btn btn-secondary" style={{
              border: `1px solid rgba(255,255,255,0.1)`,
              color: `#FAF8F5`,
              padding: `1rem 2.5rem`
            }}>{`Cancel`}</button>
                </div>
              </form> : <div style={{
          display: `flex`,
          flexDirection: `column`,
          border: `1px solid rgba(255,255,255,0.05)`
        }}>
                {(e.blogs || []).map(e => <div key={e.id} style={{
            display: `grid`,
            gridTemplateColumns: `150px 2fr 1fr 120px`,
            padding: `2rem`,
            borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
            backgroundColor: `#161616`,
            alignItems: `center`
          }} className="admin-proj-row">
                    <span style={{
              fontSize: `0.8rem`,
              color: `var(--accent-copper)`,
              fontWeight: 700,
              textTransform: `uppercase`,
              letterSpacing: `0.05em`
            }}>
                      {e.category}
                    </span>
                    <div>
                      <h4 style={{
                fontSize: `1.1rem`,
                fontWeight: 700,
                margin: 0,
                textTransform: `uppercase`
              }}>
                        {e.title}
                      </h4>
                      <span style={{
                fontSize: `0.75rem`,
                color: `#8C8A87`
              }}>
                        {e.date}
                        {` | `}
                        {e.readTime}
                      </span>
                    </div>
                    <p style={{
              fontSize: `0.85rem`,
              color: `#A09E9B`,
              margin: 0,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
              whiteSpace: `nowrap`,
              paddingRight: `2rem`
            }}>
                      {e.excerpt}
                    </p>
                    <div style={{
              display: `flex`,
              gap: `0.8rem`,
              justifyContent: `flex-end`
            }}>
                      <button onClick={() => j(e)} style={{
                border: `none`,
                background: `#2C2C2C`,
                color: `#FAF8F5`,
                padding: `0.5rem`,
                cursor: `pointer`
              }} title="Edit Article">
                        <PenLine size={16} />
                      </button>
                      <button onClick={() => de(e.id)} style={{
                border: `none`,
                background: `#3D1C1C`,
                color: `#FF7F7F`,
                padding: `0.5rem`,
                cursor: `pointer`
              }} title="Delete Article">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>)}
              </div>}
          </div>}
        {v === `talks` && <div style={{ display: `flex`, flexDirection: `column`, gap: `2.5rem` }}>
            <div style={{ display: `flex`, justifyContent: `space-between`, alignItems: `flex-start`, gap: `1rem` }}>
              <div>
                <h2 style={{ margin: 0, fontSize: `2rem`, fontWeight: 800, textTransform: `uppercase`, color: `#FAF8F5` }}>{`Talks Manager`}</h2>
                <p style={{ margin: `0.5rem 0 0`, color: `#8C8A87`, fontSize: `0.9rem` }}>{`Manage public lectures, seminars, and speaking sessions.`}</p>
              </div>
              {!talkFormOpen && <button onClick={openNewTalk} className="btn btn-accent" style={{ padding: `0.8rem 1.2rem`, fontSize: `0.75rem` }}><Plus size={16} style={{ marginRight: `0.4rem` }} />{`ADD TALK`}</button>}
            </div>
            {talkFormOpen ? <form onSubmit={saveTalk} style={{ display: `flex`, flexDirection: `column`, gap: `1.2rem`, maxWidth: `900px`, padding: `2rem`, background: `#161616`, border: `1px solid rgba(255,255,255,0.06)` }}>
                <h3 style={{ margin: 0, color: `#FAF8F5`, fontSize: `1.1rem`, textTransform: `uppercase` }}>{editingTalk ? `Edit Talk` : `New Talk`}</h3>
                <div style={{ display: `grid`, gridTemplateColumns: `1fr 1fr`, gap: `1rem` }} className="admin-inputs-row">
                  <label style={{ display: `flex`, flexDirection: `column`, gap: `0.45rem`, color: `#A09E9B`, fontSize: `0.72rem`, fontWeight: 700, textTransform: `uppercase` }}>{`Date / Period *`}<input required value={talkDraft.date} onChange={event => setTalkDraft(current => ({ ...current, date: event.target.value }))} placeholder="e.g. Dec 2025" style={adminFieldStyle} /></label>
                  <label style={{ display: `flex`, flexDirection: `column`, gap: `0.45rem`, color: `#A09E9B`, fontSize: `0.72rem`, fontWeight: 700, textTransform: `uppercase` }}>{`Event / Venue *`}<input required value={talkDraft.event} onChange={event => setTalkDraft(current => ({ ...current, event: event.target.value }))} placeholder="Event, organization, or venue" style={adminFieldStyle} /></label>
                </div>
                <label style={{ display: `flex`, flexDirection: `column`, gap: `0.45rem`, color: `#A09E9B`, fontSize: `0.72rem`, fontWeight: 700, textTransform: `uppercase` }}>{`Talk Title *`}<input required value={talkDraft.topic} onChange={event => setTalkDraft(current => ({ ...current, topic: event.target.value }))} placeholder="Session or lecture title" style={adminFieldStyle} /></label>
                <label style={{ display: `flex`, flexDirection: `column`, gap: `0.45rem`, color: `#A09E9B`, fontSize: `0.72rem`, fontWeight: 700, textTransform: `uppercase` }}>{`Full Talk Details`}<textarea value={talkDraft.description} onChange={event => setTalkDraft(current => ({ ...current, description: event.target.value }))} placeholder="Add the session summary, key themes, and audience takeaways." rows={5} style={{ ...adminFieldStyle, resize: `vertical`, fontFamily: `var(--font-sans)`, lineHeight: 1.5 }} /></label>
                <div style={{ display: `flex`, flexDirection: `column`, gap: `0.5rem` }}>
                  <label style={{ color: `#A09E9B`, fontSize: `0.72rem`, fontWeight: 700, textTransform: `uppercase` }}>{`Talk / Event Image`}</label>
                  <AdminImageUpload value={talkDraft.image} recommendation="Recommended event image: 1200 × 800 px." onChange={image => setTalkDraft(current => ({ ...current, image }))} />
                </div>
                <div style={{ display: `flex`, gap: `0.8rem` }}>
                  <button type="submit" className="btn btn-accent" style={{ padding: `0.8rem 1.2rem` }}><Save size={15} style={{ marginRight: `0.4rem` }} />{`Save Talk`}</button>
                  <button type="button" onClick={() => { setTalkFormOpen(false); setEditingTalk(null); }} className="btn btn-secondary" style={{ padding: `0.8rem 1.2rem`, color: `#FAF8F5` }}>{`Cancel`}</button>
                </div>
              </form> : <div style={{ display: `flex`, flexDirection: `column`, border: `1px solid rgba(255,255,255,0.06)` }}>
                {(e.talks || []).length ? e.talks.map(talk => <div key={talk.id} className="admin-proj-row" style={{ display: `grid`, gridTemplateColumns: `72px 130px minmax(0, 1fr) minmax(0, 1.4fr) 100px`, alignItems: `center`, gap: `1rem`, padding: `1.25rem 1.5rem`, background: `#161616`, borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                  {talk.image ? <img src={talk.image} alt="" style={{ width: `64px`, height: `48px`, objectFit: `cover`, borderRadius: `2px` }} /> : <span style={{ width: `64px`, height: `48px`, display: `grid`, placeItems: `center`, background: `#222`, color: `#777`, fontSize: `0.65rem` }}>{`NO IMAGE`}</span>}
                    <span style={{ color: `var(--accent-copper)`, fontSize: `0.78rem`, fontWeight: 700 }}>{talk.date}</span>
                    <span style={{ color: `#FAF8F5`, fontWeight: 700 }}>{talk.event}</span>
                    <span style={{ color: `#A09E9B`, fontSize: `0.85rem` }}>{talk.topic}{talk.description ? <small style={{ display: `block`, marginTop: `0.3rem`, color: `#777` }}>{talk.description.slice(0, 110)}{talk.description.length > 110 ? `…` : ``}</small> : null}</span>
                    <div style={{ display: `flex`, justifyContent: `flex-end`, gap: `0.5rem` }}>
                      <button onClick={() => openEditTalk(talk)} title="Edit talk" style={{ border: `none`, background: `#2C2C2C`, color: `#FAF8F5`, padding: `0.5rem`, cursor: `pointer` }}><PenLine size={15} /></button>
                      <button onClick={() => confirmDeleteTalk(talk)} title="Delete talk" style={{ border: `none`, background: `#3D1C1C`, color: `#FF7F7F`, padding: `0.5rem`, cursor: `pointer` }}><Trash2 size={15} /></button>
                    </div>
                  </div>) : <p style={{ padding: `2rem`, margin: 0, color: `#8C8A87` }}>{`No talks yet. Add your first event above.`}</p>}
              </div>}
          </div>}
        {v === `leads` && <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `2.5rem`
      }}>
            <div>
              <h2 style={{
            fontSize: `2rem`,
            fontWeight: 800,
            textTransform: `uppercase`,
            color: `#FAF8F5`
          }}>{`Contact Leads Inbox`}</h2>
              <p style={{
            color: `#8C8A87`,
            fontSize: `0.9rem`,
            margin: 0
          }}>{`Review inbound requests, projected budgets, and timelines.`}</p>
            </div>
            {e.leads.length === 0 ? <div style={{
          textAlign: `center`,
          padding: `4rem`,
          border: `1px dashed rgba(255,255,255,0.05)`,
          color: `#8C8A87`
        }}>{`No enquiries submitted yet.`}</div> : <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `1.5rem`
        }}>
                {e.leads.map(e => <div key={e.id} style={{
            backgroundColor: `#161616`,
            border: `1px solid rgba(255,255,255,0.05)`,
            padding: `2.5rem`,
            display: `flex`,
            flexDirection: `column`,
            gap: `1.5rem`
          }}>
                    <div style={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `flex-start`,
              borderBottom: `1px solid rgba(255,255,255,0.05)`,
              paddingBottom: `1rem`
            }}>
                      <div>
                        <h3 style={{
                  fontSize: `1.25rem`,
                  fontWeight: 700,
                  color: `#FAF8F5`,
                  margin: 0
                }}>
                          {e.name}
                        </h3>
                        <span style={{
                  fontSize: `0.8rem`,
                  color: `var(--accent-copper)`
                }}>
                          {e.email}
                          {` `}
                          {e.company ? `| ${e.company}` : ``}
                          {` `}
                          {e.industry ? `(${e.industry})` : ``}
                        </span>
                      </div>
                      <div style={{
                display: `flex`,
                alignItems: `center`,
                gap: `1.5rem`
              }}>
                        <span style={{
                  fontSize: `0.8rem`,
                  color: `#8C8A87`
                }}>
                          {new Date(e.date).toLocaleString()}
                        </span>
                        <button onClick={() => be(e.id)} style={{
                  border: `none`,
                  background: `transparent`,
                  color: `#FF7F7F`,
                  cursor: `pointer`,
                  display: `flex`,
                  alignItems: `center`
                }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p style={{
              fontSize: `0.95rem`,
              lineHeight: `1.6`,
              color: `#E5E2DD`,
              margin: 0,
              backgroundColor: `#1E1E1E`,
              padding: `1.5rem`,
              borderLeft: `2px solid var(--accent-copper)`
            }}>
                      {e.description}
                    </p>
                    <div style={{
              display: `flex`,
              gap: `2rem`,
              fontSize: `0.8rem`,
              textTransform: `uppercase`,
              fontWeight: 700
            }}>
                      <div>
                        <span style={{
                  color: `#8C8A87`,
                  marginRight: `0.5rem`
                }}>{`Budget:`}</span>
                        <span style={{
                  color: `var(--text-light)`
                }}>
                          {e.budget}
                        </span>
                      </div>
                      <div>
                        <span style={{
                  color: `#8C8A87`,
                  marginRight: `0.5rem`
                }}>{`Timeline:`}</span>
                        <span style={{
                  color: `var(--text-light)`
                }}>
                          {e.timeline}
                        </span>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>}
        {v === `settings` && <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `3rem`
      }}>
            <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `1.5rem`
        }}>
              <div>
                <h2 style={{
              fontSize: `1.5rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `#FAF8F5`
            }}>{`Contact Information & Coordinates`}</h2>
                <p style={{
              color: `#8C8A87`,
              fontSize: `0.85rem`,
              margin: 0
            }}>{`Define footer contacts and system phone coordinates.`}</p>
              </div>
              <form onSubmit={pe} style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `1.5rem`
          }}>
                <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `1.5rem`
            }} className="admin-inputs-row">
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `0.5rem`
              }}>
                    <label style={{
                  fontSize: `0.75rem`,
                  fontWeight: 700,
                  textTransform: `uppercase`
                }}>{`Contact Email`}</label>
                    <input type="email" value={C.contactEmail} onChange={e => ee({
                  ...C,
                  contactEmail: e.target.value
                })} style={{
                  backgroundColor: `#1E1E1E`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  color: `#FAF8F5`,
                  padding: `0.8rem`,
                  outline: `none`
                }} />
                  </div>
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `0.5rem`
              }}>
                    <label style={{
                  fontSize: `0.75rem`,
                  fontWeight: 700,
                  textTransform: `uppercase`
                }}>{`Contact Phone`}</label>
                    <input type="text" value={C.contactPhone} onChange={e => ee({
                  ...C,
                  contactPhone: e.target.value
                })} style={{
                  backgroundColor: `#1E1E1E`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  color: `#FAF8F5`,
                  padding: `0.8rem`,
                  outline: `none`
                }} />
                  </div>
                </div>
                <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `1.5rem`
            }} className="admin-inputs-row">
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `0.5rem`
              }}>
                    <label style={{
                  fontSize: `0.75rem`,
                  fontWeight: 700,
                  textTransform: `uppercase`
                }}>{`LinkedIn Handle (relative URL)`}</label>
                    <input type="text" value={C.contactLinkedin} onChange={e => ee({
                  ...C,
                  contactLinkedin: e.target.value
                })} style={{
                  backgroundColor: `#1E1E1E`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  color: `#FAF8F5`,
                  padding: `0.8rem`,
                  outline: `none`
                }} />
                  </div>
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `0.5rem`
              }}>
                    <label style={{
                  fontSize: `0.75rem`,
                  fontWeight: 700,
                  textTransform: `uppercase`
                }}>{`Location Coordinates`}</label>
                    <input type="text" value={C.contactLocation} onChange={e => ee({
                  ...C,
                  contactLocation: e.target.value
                })} style={{
                  backgroundColor: `#1E1E1E`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  color: `#FAF8F5`,
                  padding: `0.8rem`,
                  outline: `none`
                }} />
                  </div>
                </div>
                <div style={{
              borderTop: `1px solid rgba(255,255,255,0.05)`,
              paddingTop: `2rem`,
              display: `flex`,
              flexDirection: `column`,
              gap: `1.5rem`
            }}>
                  <h3 style={{
                fontSize: `1.15rem`,
                fontWeight: 700,
                textTransform: `uppercase`,
                margin: 0
              }}>{`Change Admin Password`}</h3>
                  <div style={{
                display: `grid`,
                gridTemplateColumns: `1fr 1fr 1fr`,
                gap: `1.5rem`
              }} className="admin-inputs-row">
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.5rem`
                }}>
                      <label style={{
                    fontSize: `0.75rem`,
                    fontWeight: 700,
                    textTransform: `uppercase`
                  }}>{`Current Password`}</label>
                      <input type="password" value={ke.current} onChange={e => Se({
                    ...ke,
                    current: e.target.value
                  })} style={{
                    backgroundColor: `#1E1E1E`,
                    border: `1px solid rgba(255,255,255,0.05)`,
                    color: `#FAF8F5`,
                    padding: `0.8rem`,
                    outline: `none`
                  }} />
                    </div>
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.5rem`
                }}>
                      <label style={{
                    fontSize: `0.75rem`,
                    fontWeight: 700,
                    textTransform: `uppercase`
                  }}>{`New Password`}</label>
                      <input type="password" value={ke.next} onChange={e => Se({
                    ...ke,
                    next: e.target.value
                  })} style={{
                    backgroundColor: `#1E1E1E`,
                    border: `1px solid rgba(255,255,255,0.05)`,
                    color: `#FAF8F5`,
                    padding: `0.8rem`,
                    outline: `none`
                  }} />
                    </div>
                    <div style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `0.5rem`
                }}>
                      <label style={{
                    fontSize: `0.75rem`,
                    fontWeight: 700,
                    textTransform: `uppercase`
                  }}>{`Confirm New Password`}</label>
                      <input type="password" value={ke.confirm} onChange={e => Se({
                    ...ke,
                    confirm: e.target.value
                  })} style={{
                    backgroundColor: `#1E1E1E`,
                    border: `1px solid rgba(255,255,255,0.05)`,
                    color: `#FAF8F5`,
                    padding: `0.8rem`,
                    outline: `none`
                  }} />
                    </div>
                  </div>
                  {Ce && <span style={{
                fontSize: `0.8rem`,
                color: `#FF7F7F`,
                fontWeight: 600
              }}>
                    {Ce}
                  </span>}
                  <div>
                    <button type="button" onClick={Ee} className="btn btn-secondary" style={{
                  padding: `0.9rem 2rem`,
                  fontSize: `0.75rem`
                }}>{`UPDATE PASSWORD`}</button>
                  </div>
                </div>
                <div style={{
              borderTop: `1px solid rgba(255,255,255,0.05)`,
              paddingTop: `2rem`,
              display: `flex`,
              flexDirection: `column`,
              gap: `1.5rem`
            }}>
                  <h3 style={{
                fontSize: `1.15rem`,
                fontWeight: 700,
                textTransform: `uppercase`,
                margin: 0
              }}>{`Search Engine Optimization (SEO)`}</h3>
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `0.5rem`
              }}>
                    <label style={{
                  fontSize: `0.75rem`,
                  fontWeight: 700,
                  textTransform: `uppercase`
                }}>{`Meta Title`}</label>
                    <input type="text" value={C.seoTitle} onChange={e => ee({
                  ...C,
                  seoTitle: e.target.value
                })} style={{
                  backgroundColor: `#1E1E1E`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  color: `#FAF8F5`,
                  padding: `0.8rem`,
                  outline: `none`
                }} />
                  </div>
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `0.5rem`
              }}>
                    <label style={{
                  fontSize: `0.75rem`,
                  fontWeight: 700,
                  textTransform: `uppercase`
                }}>{`Meta Keywords`}</label>
                    <input type="text" value={C.seoKeywords} onChange={e => ee({
                  ...C,
                  seoKeywords: e.target.value
                })} style={{
                  backgroundColor: `#1E1E1E`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  color: `#FAF8F5`,
                  padding: `0.8rem`,
                  outline: `none`
                }} />
                  </div>
                  <div style={{
                display: `flex`,
                flexDirection: `column`,
                gap: `0.5rem`
              }}>
                    <label style={{
                  fontSize: `0.75rem`,
                  fontWeight: 700,
                  textTransform: `uppercase`
                }}>{`Meta Description`}</label>
                    <textarea value={C.seoDescription} rows="3" onChange={e => ee({
                  ...C,
                  seoDescription: e.target.value
                })} style={{
                  backgroundColor: `#1E1E1E`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  color: `#FAF8F5`,
                  padding: `0.8rem`,
                  outline: `none`,
                  resize: `none`,
                  fontFamily: `var(--font-sans)`
                }} />
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-accent" style={{
                padding: `1rem 2.5rem`
              }}>
                    <Save size={16} style={{
                  marginRight: `0.5rem`
                }} />
                    {`Save SEO & Settings`}
                  </button>
                </div>
              </form>
            </div>
            <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `1.5rem`,
          borderTop: `1px solid rgba(255,255,255,0.05)`,
          paddingTop: `2.5rem`
        }}>
              <div>
                <h2 style={{
              fontSize: `1.5rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `#FAF8F5`,
              margin: 0
            }}>{`Media Library`}</h2>
                <p style={{
              color: `#8C8A87`,
              fontSize: `0.85rem`,
              margin: 0
            }}>{`Use the partner and project editors to upload published images.`}</p>
              </div>
              <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(4, 1fr)`,
            gap: `1.5rem`
          }} className="admin-media-grid">
                <div style={{
              border: `1px solid rgba(255,255,255,0.05)`,
              backgroundColor: `#161616`,
              padding: `1.5rem`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              gap: `1rem`,
              textAlign: `center`
            }}>
                  <ImageIcon size={32} style={{
                color: `var(--accent-copper)`
              }} />
                  <span style={{
                fontSize: `0.8rem`,
                fontWeight: 700,
                display: `block`,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
                width: `100%`
              }}>{`dipen_portrait.png`}</span>
                  <span style={{
                fontSize: `0.65rem`,
                color: `#8C8A87`
              }}>{`Avatar Image`}</span>
                </div>
                <div style={{
              border: `1px solid rgba(255,255,255,0.05)`,
              backgroundColor: `#161616`,
              padding: `1.5rem`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              gap: `1rem`,
              textAlign: `center`
            }}>
                  <ImageIcon size={32} style={{
                color: `var(--accent-copper)`
              }} />
                  <span style={{
                fontSize: `0.8rem`,
                fontWeight: 700,
                display: `block`,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
                width: `100%`
              }}>{`me2millet.png`}</span>
                  <span style={{
                fontSize: `0.65rem`,
                color: `#8C8A87`
              }}>{`Project Cover`}</span>
                </div>
                <div style={{
              border: `1px solid rgba(255,255,255,0.05)`,
              backgroundColor: `#161616`,
              padding: `1.5rem`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              gap: `1rem`,
              textAlign: `center`
            }}>
                  <ImageIcon size={32} style={{
                color: `var(--accent-copper)`
              }} />
                  <span style={{
                fontSize: `0.8rem`,
                fontWeight: 700,
                display: `block`,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
                width: `100%`
              }}>{`nebulae_iot.png`}</span>
                  <span style={{
                fontSize: `0.65rem`,
                color: `#8C8A87`
              }}>{`Project Cover`}</span>
                </div>
                <button type="button" style={{
              border: `1px dashed rgba(255,255,255,0.1)`,
                background: `transparent`,
                color: `inherit`,
              padding: `1.5rem`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              justifyContent: `center`,
              gap: `0.5rem`,
              cursor: `pointer`
              }} onClick={() => y(`partners`)}>
                    <ImageIcon size={24} style={{
                color: `#8C8A87`
              }} />
                  <span style={{
                fontSize: `0.8rem`,
                color: `#8C8A87`
                }}>{`Manage Partner Logos`}</span>
                  </button>
              </div>
            </div>
          </div>}
      </main>
      <style>{`
        .admin-proj-row button:hover {
          opacity: 0.8;
        }
        @media (max-width: 991px) {
          .admin-root {
            grid-template-columns: 1fr !important;
          }
          aside {
            display: none !important;
          }
          main {
            padding: 2rem 1.5rem !important;
          }
          .admin-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-media-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .admin-inputs-row {
            grid-template-columns: 1fr !important;
          }
          .lead-preview-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem;
          }
          .lead-preview-row > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
    </> : <div style={{
    minHeight: `100vh`,
    backgroundColor: `#0F0F0F`,
    color: `#E5E2DD`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: `2rem`,
    fontFamily: `var(--font-sans)`
  }}>
      <div style={{
      width: `100%`,
      maxWidth: `420px`,
      backgroundColor: `#161616`,
      border: `1px solid rgba(255, 255, 255, 0.05)`,
      padding: `3rem 2.5rem`,
      display: `flex`,
      flexDirection: `column`,
      gap: `2rem`
    }}>
        <div>
          <h1 style={{
          fontWeight: 850,
          fontSize: `1.25rem`,
          color: `#FAF8F5`,
          letterSpacing: `-0.02em`,
          textTransform: `uppercase`,
          margin: 0
        }}>{`NAVYRIX LABS`}</h1>
          <span style={{
          fontSize: `0.65rem`,
          fontWeight: 700,
          color: `var(--accent-copper)`,
          textTransform: `uppercase`,
          letterSpacing: `0.12em`,
          display: `block`,
          marginTop: `4px`
        }}>{`SECURE ADMINISTRATOR CONSOLE`}</span>
        </div>
        <p style={{
        fontSize: `0.85rem`,
        color: `#8C8A87`,
        margin: 0,
        lineHeight: `1.5`
      }}>{`Access is restricted to authorized personnel. Please enter your administrator passcode.`}</p>
        <form onSubmit={te} style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `1.5rem`
      }}>
          <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `0.5rem`
        }}>
            <label style={{
            fontSize: `0.7rem`,
            fontWeight: 700,
            textTransform: `uppercase`,
            letterSpacing: `0.05em`
          }}>{`Passcode`}</label>
            <input type="password" value={p} onChange={e => m(e.target.value)} placeholder="••••••••••••" style={{
            backgroundColor: `#1E1E1E`,
            border: h ? `1px solid #FF7F7F` : `1px solid rgba(255,255,255,0.05)`,
            color: `#FAF8F5`,
            padding: `0.8rem`,
            outline: `none`,
            fontSize: `1rem`,
            letterSpacing: `0.1em`
          }} required={!0} />
            {h && <span style={{
            fontSize: `0.75rem`,
            color: `#FF7F7F`,
            fontWeight: 600
          }}>
              {h}
            </span>}
          </div>
          <button type="submit" className="btn btn-accent" style={{
          padding: `1rem`,
          width: `100%`,
          fontSize: `0.8rem`
        }}>{`AUTHENTICATE ACCESS`}</button>
        </form>
        <div style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `1rem`,
        borderTop: `1px solid rgba(255,255,255,0.05)`,
        paddingTop: `1.5rem`,
        alignItems: `center`
      }}>
          <a href="#/" style={{
          fontSize: `0.8rem`,
          color: `#8C8A87`,
          fontWeight: 600
        }} className="nav-link">{`RETURN TO PUBLIC PORTFOLIO`}</a>
          <span style={{
          fontSize: `0.65rem`,
          fontFamily: `monospace`,
          color: `#555`
        }}>{`(Default passcode: dipen123)`}</span>
        </div>
      </div>
    </div>;
}

export default AdminPanel;
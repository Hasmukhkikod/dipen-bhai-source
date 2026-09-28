import { useState } from 'react';
import { LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

var LinkedInIcon = ({
  size: e = 24,
  ...t
}) => <svg viewBox="0 0 24 24" width={e} height={e} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...t}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>;

function Contact() {
  let {
      data: e,
      addLead: t
    } = useContent(),
    n = e.settings || {},
    [r, i] = useState({
      name: ``,
      email: ``,
      company: ``,
      industry: ``,
      description: ``
    }),
    [a, o] = useState(`idle`),
    s = e => {
      let {
        name: t,
        value: n
      } = e.target;
      i(e => ({
        ...e,
        [t]: n
      }));
    };
  return <section id="contact" style={{
    backgroundColor: `var(--bg-dark)`,
    color: `var(--text-light)`,
    padding: `8rem 0`,
    borderTop: `1px solid var(--border-thin-dark)`
  }} className="admin-theme">
      <div className="container-custom">
        <div style={{
        display: `grid`,
        gridTemplateColumns: `1.1fr 0.9fr`,
        gap: `5rem`,
        alignItems: `start`
      }} className="contact-layout">
          <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `2.5rem`
        }}>
            <div>
              <span style={{
              fontSize: `0.75rem`,
              fontWeight: 700,
              color: `var(--text-light-secondary)`,
              textTransform: `uppercase`,
              letterSpacing: `0.12em`,
              display: `block`,
              marginBottom: `1rem`
            }}>{`10 / GET IN TOUCH`}</span>
              <h2 style={{
              fontSize: `clamp(2.5rem, 4.5vw, 4rem)`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--text-light)`,
              lineHeight: `1.05`,
              marginBottom: `1.5rem`
            }}>
                {`Have a product `}
                <br />
                {`idea? Let's `}
                <span className="serif-italic" style={{
                textTransform: `lowercase`,
                fontWeight: 300,
                color: `var(--accent-copper)`
              }}>{`build it.`}</span>
              </h2>
              <p style={{
              fontSize: `1.1rem`,
              color: `var(--text-light-secondary)`,
              lineHeight: `1.6`,
              maxWidth: `480px`
            }}>{`Whether you're validating an IoT concept, building an embedded prototype, or taking a product toward production, let's talk.`}</p>
            </div>
            <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `1.2rem`,
            marginTop: `1rem`
          }}>
              <a href={`mailto:${n.contactEmail}`} style={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`,
              color: `var(--text-light-secondary)`
            }} className="nav-link">
                <Mail size={18} style={{
                color: `var(--accent-copper)`
              }} />
                <span style={{
                fontSize: `0.95rem`
              }}>
                  {n.contactEmail}
                </span>
              </a>
              <a href={`tel:${n.contactPhone}`} style={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`,
              color: `var(--text-light-secondary)`
            }} className="nav-link">
                <Phone size={18} style={{
                color: `var(--accent-copper)`
              }} />
                <span style={{
                fontSize: `0.95rem`
              }}>
                  {n.contactPhone}
                </span>
              </a>
              <a href={`https://${n.contactLinkedin}`} target="_blank" rel="noreferrer" style={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`,
              color: `var(--text-light-secondary)`
            }} className="nav-link">
                <LinkedInIcon size={18} style={{
                color: `var(--accent-copper)`
              }} />
                <span style={{
                fontSize: `0.95rem`
              }}>
                  {n.contactLinkedin}
                </span>
              </a>
              <div style={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`,
              color: `var(--text-light-secondary)`
            }}>
                <MapPin size={18} style={{
                color: `var(--accent-copper)`
              }} />
                <span style={{
                fontSize: `0.95rem`
              }}>
                  {n.contactLocation}
                </span>
              </div>
            </div>
          </div>
          <div style={{
          backgroundColor: `var(--bg-dark-secondary)`,
          border: `1px solid var(--border-thin-dark)`,
          padding: `3.5rem 3rem`
        }} className="contact-form-container">
            {a === `success` ? <div style={{
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            textAlign: `center`,
            padding: `3rem 0`,
            gap: `1.5rem`,
            animation: `fadeInUp 0.4s ease`
          }}>
                <div style={{
              width: `60px`,
              height: `60px`,
              borderRadius: `50%`,
              backgroundColor: `rgba(61, 100, 78, 0.2)`,
              color: `var(--accent-green-light)`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              fontSize: `2rem`
            }}>{`✓`}</div>
                <h3 style={{
              fontSize: `1.5rem`,
              fontWeight: 700,
              textTransform: `uppercase`
            }}>{`Transmission Successful`}</h3>
                <p style={{
              fontSize: `0.95rem`,
              color: `var(--text-light-secondary)`,
              maxWidth: `320px`,
              margin: 0
            }}>{`Your message has been encrypted and recorded. Dipen will review the proposal parameters and respond within 24 hours.`}</p>
                <div style={{
              fontSize: `0.7rem`,
              fontFamily: `monospace`,
              color: `var(--accent-copper)`,
              backgroundColor: `rgba(18, 18, 18, 0.5)`,
              padding: `0.5rem 1rem`,
              border: `1px solid var(--border-thin-dark)`,
              marginTop: `1rem`
            }}>{`SIMULATION: Node Mailer Triggered Successfully.`}</div>
                <button onClick={() => o(`idle`)} className="btn btn-secondary" style={{
              border: `1px solid var(--border-thin-dark)`,
              color: `var(--text-light)`,
              marginTop: `1.5rem`
            }}>{`SEND ANOTHER MESSAGE`}</button>
              </div> : <form onSubmit={async e => {
            if (e.preventDefault(), !r.name || !r.email || !r.description) {
              alert(`Please fill in Name, Email, and Project Description.`);
              return;
            }
            o(`loading`);
            try {
              await t(r);
              console.log(`%c[SIMULATION] Email trigger dispatched to: ${n.contactEmail || `dipen238@gmail.com`}`, `color: #C15C3D; font-weight: bold;`);
              console.log(`[SIMULATION] Payload Details:`, r);
              o(`success`);
              i({
                name: ``,
                email: ``,
                company: ``,
                industry: ``,
                description: ``
              });
            } catch {
              o(`error`);
            }
          }} style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `2rem`
          }}>
                <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `1.5rem`
            }} className="form-inputs-row">
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
                }}>{`Your Name *`}</label>
                    <input type="text" name="name" value={r.name} onChange={s} required={!0} placeholder="e.g. John Doe" style={{
                  backgroundColor: `transparent`,
                  border: `none`,
                  borderBottom: `1px solid var(--border-thin-dark)`,
                  color: `var(--text-light)`,
                  padding: `0.6rem 0`,
                  fontSize: `0.95rem`,
                  outline: `none`
                }} className="form-input" />
                  </div>
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
                }}>{`Email Address *`}</label>
                    <input type="email" name="email" value={r.email} onChange={s} required={!0} placeholder="e.g. john@company.com" style={{
                  backgroundColor: `transparent`,
                  border: `none`,
                  borderBottom: `1px solid var(--border-thin-dark)`,
                  color: `var(--text-light)`,
                  padding: `0.6rem 0`,
                  fontSize: `0.95rem`,
                  outline: `none`
                }} className="form-input" />
                  </div>
                </div>
                <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `1.5rem`
            }} className="form-inputs-row">
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
                }}>{`Company`}</label>
                    <input type="text" name="company" value={r.company} onChange={s} placeholder="e.g. Acme Corp" style={{
                  backgroundColor: `transparent`,
                  border: `none`,
                  borderBottom: `1px solid var(--border-thin-dark)`,
                  color: `var(--text-light)`,
                  padding: `0.6rem 0`,
                  fontSize: `0.95rem`,
                  outline: `none`
                }} className="form-input" />
                  </div>
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
                }}>{`Industry`}</label>
                    <input type="text" name="industry" value={r.industry} onChange={s} placeholder="e.g. Agritech / Smart Grid" style={{
                  backgroundColor: `transparent`,
                  border: `none`,
                  borderBottom: `1px solid var(--border-thin-dark)`,
                  color: `var(--text-light)`,
                  padding: `0.6rem 0`,
                  fontSize: `0.95rem`,
                  outline: `none`
                }} className="form-input" />
                  </div>
                </div>
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
              }}>{`Project Description *`}</label>
                  <textarea name="description" value={r.description} onChange={s} required={!0} rows="4" placeholder="Briefly describe the hardware requirements, protocols, and estimated product scope..." style={{
                backgroundColor: `transparent`,
                border: `none`,
                borderBottom: `1px solid var(--border-thin-dark)`,
                color: `var(--text-light)`,
                padding: `0.6rem 0`,
                fontSize: `0.95rem`,
                outline: `none`,
                resize: `none`,
                fontFamily: `var(--font-sans)`
              }} className="form-input" />
                </div>
                <div style={{
              marginTop: `1rem`
            }}>
                  <button type="submit" disabled={a === `loading`} className="btn btn-accent" style={{
                width: `100%`,
                padding: `1.2rem`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                gap: `0.5rem`
              }}>
                    {a === `loading` ? <>
                        <LoaderCircle size={16} className="animate-spin" />
                        {`TRANSMITTING TELEMETRY...`}
                      </> : <>
                        {`TRANSMIT PROJECT PROPOSAL`}
                        <Send size={16} />
                      </>}
                  </button>
                </div>
              </form>}
          </div>
        </div>
      </div>
      <style>{`
        .form-input:focus {
          border-bottom: 1px solid var(--accent-copper) !important;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .contact-form-container {
            padding: 2.5rem 1.5rem !important;
          }
        }
        @media (max-width: 768px) {
          .form-inputs-row {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>;
}

export default Contact;
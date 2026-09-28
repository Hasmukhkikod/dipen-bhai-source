import { CodeXml, Landmark, Layers } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function Journey() {
  let {
    data: e
  } = useContent();
  return <section id="journey" style={{
    backgroundColor: `var(--bg-secondary)`,
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
        }}>{`05 / EXPERIENCE METRICS`}</span>
          <h2 style={{
          fontSize: `clamp(2.5rem, 4.5vw, 4.5rem)`,
          fontWeight: 800,
          textTransform: `uppercase`,
          color: `var(--text-primary)`,
          lineHeight: `1`,
          margin: 0
        }}>
            {`Track record `}
            <span className="serif-italic" style={{
            textTransform: `lowercase`,
            fontWeight: 300,
            color: `var(--accent-copper)`
          }}>{`& domains.`}</span>
          </h2>
        </div>
        <div style={{
        display: `grid`,
        gridTemplateColumns: `repeat(3, 1fr)`,
        gap: `3.5rem`
      }} className="record-grid">
          <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `1.8rem`
        }} className="record-col">
            <div style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.8rem`,
            borderBottom: `1px solid var(--border-thin)`,
            paddingBottom: `1rem`
          }}>
              <Layers size={20} style={{
              color: `var(--accent-copper)`
            }} />
              <h3 style={{
              fontSize: `1.15rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--text-primary)`,
              margin: 0
            }}>{`Domains Worked`}</h3>
            </div>
            <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `1.5rem`
          }}>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`Smart Utilities & Grids`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`High-security energy metering systems meeting strict European and UK SMETS2 wireless regulations.`}</p>
              </div>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`Agritech & Edge AI`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Low-power sub-GHz mesh sensor nodes and edge classification for livestock health metrics and sustainable farming.`}</p>
              </div>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`Smart Cities & Metering`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Carrier-grade network middleware coordinating high-density sensor networks across municipal utilities.`}</p>
              </div>
            </div>
          </div>
          <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `1.8rem`
        }} className="record-col">
            <div style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.8rem`,
            borderBottom: `1px solid var(--border-thin)`,
            paddingBottom: `1rem`
          }}>
              <Landmark size={20} style={{
              color: `var(--accent-copper)`
            }} />
              <h3 style={{
              fontSize: `1.15rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--text-primary)`,
              margin: 0
            }}>{`Organizations & MNCs`}</h3>
            </div>
            <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `1.5rem`
          }}>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`Qualcomm Platforms`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Senior testing, Board Support Package (BSP) drivers validation, and hardware verification for Snapdragon-powered endpoints.`}</p>
              </div>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`System Level Solutions (SLS)`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Over a decade of engineering leadership delivering enterprise smart energy gateways and custom IoT communication stacks.`}</p>
              </div>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`i-Hub Gujarat & Incubators`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Evaluating early-stage hardware designs, guiding startups through PCB routing, component sourcing, and validation.`}</p>
              </div>
            </div>
          </div>
          <div style={{
          display: `flex`,
          flexDirection: `column`,
          gap: `1.8rem`
        }} className="record-col">
            <div style={{
            display: `flex`,
            alignItems: `center`,
            gap: `0.8rem`,
            borderBottom: `1px solid var(--border-thin)`,
            paddingBottom: `1rem`
          }}>
              <CodeXml size={20} style={{
              color: `var(--accent-copper)`
            }} />
              <h3 style={{
              fontSize: `1.15rem`,
              fontWeight: 800,
              textTransform: `uppercase`,
              color: `var(--text-primary)`,
              margin: 0
            }}>{`Technologies Deployed`}</h3>
            </div>
            <div style={{
            display: `flex`,
            flexDirection: `column`,
            gap: `1.5rem`
          }}>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`Embedded OS & Firmware`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Embedded C/C++, Linux Kernel BSP customizations, driver development, U-Boot, and RTOS (FreeRTOS) kernels.`}</p>
              </div>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`IoT Protocols & Mesh`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`Asynchronous networks integration using 6LoWPAN, Zigbee mesh, sub-GHz proprietary radios, DLMS/COSEM, and G3-PLC.`}</p>
              </div>
              <div>
                <h4 style={{
                fontSize: `0.98rem`,
                fontWeight: 750,
                color: `var(--text-primary)`,
                margin: `0 0 0.4rem 0`,
                textTransform: `uppercase`
              }}>{`Product Validation Standards`}</h4>
                <p style={{
                fontSize: `0.88rem`,
                lineHeight: `1.5`,
                color: `var(--text-secondary)`,
                margin: 0
              }}>{`MISRA C standard compliance, ISO 9001 and ISO 27001 internal security audits, CE/FCC regulatory pipelines.`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .record-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .record-col {
            border-bottom: 1px solid var(--border-thin);
            padding-bottom: 2.5rem;
          }
          .record-col:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </section>;
}

export default Journey;
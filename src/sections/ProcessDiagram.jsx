const copper = 'var(--accent-copper)';
const ink = 'var(--text-primary)';
const muted = 'var(--text-secondary)';
const line = 'var(--border-thin)';

function DiagramBase({ title, children }) {
  return (
    <svg className="process-vector" viewBox="0 0 420 290" role="img" aria-label={title} style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}>
      <defs>
        <pattern id="process-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={line} strokeWidth="0.65" opacity="0.55" />
        </pattern>
        <marker id="process-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L6,3.5 L0,7" fill="none" stroke={copper} strokeWidth="1.2" />
        </marker>
      </defs>
      <style>{`
        .process-vector .diagram-drawing {
          transform-origin: center;
          animation: process-vector-arrive 650ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }
        .process-vector .diagram-drawing > * {
          animation: process-part-reveal 420ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }
        .process-vector .diagram-drawing > :nth-child(1) { animation-delay: 70ms; }
        .process-vector .diagram-drawing > :nth-child(2) { animation-delay: 130ms; }
        .process-vector .diagram-drawing > :nth-child(3) { animation-delay: 190ms; }
        .process-vector .diagram-drawing > :nth-child(4) { animation-delay: 250ms; }
        .process-vector .diagram-drawing > :nth-child(5) { animation-delay: 310ms; }
        .process-vector .diagram-drawing > :nth-child(6) { animation-delay: 370ms; }
        .process-vector .diagram-drawing > :nth-child(7) { animation-delay: 430ms; }
        .process-vector .diagram-drawing > :nth-child(8) { animation-delay: 490ms; }
        .process-vector .diagram-drawing > :nth-child(9) { animation-delay: 550ms; }
        .process-vector .diagram-drawing > path,
        .process-vector .diagram-drawing > line {
          stroke-dasharray: 420;
          stroke-dashoffset: 420;
          animation-name: process-part-trace;
        }
        .process-vector .diagram-drawing > circle {
          transform-box: fill-box;
          transform-origin: center;
          animation-name: process-part-node;
        }
        .process-vector .signal-route {
          stroke-dasharray: 3 6;
          animation: process-signal-flow 2.8s linear infinite;
        }
        .process-vector .status-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: process-status-pulse 2.2s ease-out infinite;
        }
        .process-vector .status-core {
          animation: process-status-glow 2.2s ease-in-out infinite;
        }
        @keyframes process-vector-arrive {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes process-part-reveal {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes process-part-trace {
          from { opacity: 0.25; stroke-dashoffset: 420; }
          to { opacity: 1; stroke-dashoffset: 0; }
        }
        @keyframes process-part-node {
          from { opacity: 0; transform: scale(0.45); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes process-signal-flow {
          to { stroke-dashoffset: -36; }
        }
        @keyframes process-status-pulse {
          0% { opacity: 0.7; transform: scale(0.65); }
          75%, 100% { opacity: 0; transform: scale(1.8); }
        }
        @keyframes process-status-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-vector .diagram-drawing,
          .process-vector .diagram-drawing > *,
          .process-vector .signal-route,
          .process-vector .status-ring,
          .process-vector .status-core {
            animation: none !important;
          }
        }
      `}</style>
      <rect x="20" y="20" width="380" height="250" rx="4" fill="url(#process-grid)" opacity="0.65" />
      <g className="diagram-drawing">{children}</g>
      <path className="signal-route" d="M34 258 H386" fill="none" stroke={copper} strokeWidth="1.2" opacity="0.55" />
      <circle className="status-ring" cx="382" cy="39" r="7" fill="none" stroke={copper} strokeWidth="1" />
      <circle className="status-core" cx="382" cy="39" r="2.5" fill={copper} />
    </svg>
  );
}

function DiscoveryDiagram() {
  return (
    <DiagramBase title="Product discovery vector: requirements, feasibility, and specification flow">
      <text x="34" y="43" fill={muted} fontSize="9" fontWeight="700" letterSpacing="1.5">REQUIREMENTS TRACE</text>
      <rect x="42" y="67" width="116" height="54" rx="3" fill="var(--bg-primary)" stroke={copper} strokeWidth="1.5" />
      <text x="100" y="89" textAnchor="middle" fill={ink} fontSize="10" fontWeight="700">USER NEED</text>
      <text x="100" y="105" textAnchor="middle" fill={muted} fontSize="8">problem + context</text>
      <path d="M158 94 H205" fill="none" stroke={copper} strokeWidth="1.5" markerEnd="url(#process-arrow)" />
      <rect x="218" y="67" width="150" height="54" rx="3" fill="var(--bg-primary)" stroke={line} strokeWidth="1.2" />
      <text x="293" y="89" textAnchor="middle" fill={ink} fontSize="10" fontWeight="700">SYSTEM SPEC</text>
      <text x="293" y="105" textAnchor="middle" fill={muted} fontSize="8">power · cost · compliance</text>
      <path d="M293 121 V153 M293 153 H101 V177 M293 153 V177" fill="none" stroke={line} strokeWidth="1.2" />
      <rect x="46" y="178" width="110" height="42" rx="3" fill="var(--bg-primary)" stroke={line} />
      <text x="101" y="196" textAnchor="middle" fill={ink} fontSize="9" fontWeight="700">FEASIBILITY</text>
      <text x="101" y="210" textAnchor="middle" fill={muted} fontSize="8">risk + sourcing</text>
      <rect x="238" y="178" width="110" height="42" rx="3" fill="var(--bg-primary)" stroke={line} />
      <text x="293" y="196" textAnchor="middle" fill={ink} fontSize="9" fontWeight="700">TEST PLAN</text>
      <text x="293" y="210" textAnchor="middle" fill={muted} fontSize="8">measurable targets</text>
      <circle cx="42" cy="247" r="3" fill={copper} />
      <text x="53" y="250" fill={muted} fontSize="8">INPUTS MAPPED TO VERIFIABLE REQUIREMENTS</text>
    </DiagramBase>
  );
}

function PcbDiagram() {
  return (
    <DiagramBase title="PCB design vector: controller, power, radio, and routed board connections">
      <text x="34" y="43" fill={muted} fontSize="9" fontWeight="700" letterSpacing="1.5">SYSTEM ARCHITECTURE · PCB</text>
      <rect x="116" y="75" width="188" height="142" rx="12" fill="var(--bg-primary)" stroke={copper} strokeWidth="1.5" />
      <rect x="177" y="117" width="66" height="56" rx="3" fill="var(--bg-secondary)" stroke={ink} strokeWidth="1.3" />
      <text x="210" y="141" textAnchor="middle" fill={ink} fontSize="10" fontWeight="700">MCU</text>
      <text x="210" y="157" textAnchor="middle" fill={muted} fontSize="8">ARM / STM32</text>
      {[0, 1, 2, 3].map((i) => <g key={`pin-${i}`} stroke={line} strokeWidth="1.2"><path d={`M${187 + i * 14} 117 V105`} /><path d={`M${187 + i * 14} 173 V185`} /></g>)}
      {[0, 1, 2].map((i) => <g key={`side-${i}`} stroke={line} strokeWidth="1.2"><path d={`M177 ${129 + i * 14} H164`} /><path d={`M243 ${129 + i * 14} H256`} /></g>)}
      <path d="M164 129 H139 V96 H92" fill="none" stroke={copper} strokeWidth="1.5" />
      <path d="M256 129 H280 V96 H327" fill="none" stroke={copper} strokeWidth="1.5" />
      <path d="M164 157 H141 V194 H93" fill="none" stroke={line} strokeWidth="1.3" />
      <path d="M256 157 H278 V194 H327" fill="none" stroke={line} strokeWidth="1.3" />
      <circle cx="92" cy="96" r="4" fill={copper} /><circle cx="327" cy="96" r="4" fill={copper} />
      <circle cx="93" cy="194" r="4" fill={ink} /><circle cx="327" cy="194" r="4" fill={ink} />
      <text x="44" y="84" fill={muted} fontSize="8">POWER</text><text x="332" y="84" fill={muted} fontSize="8">RF</text>
      <text x="43" y="211" fill={muted} fontSize="8">SENSORS</text><text x="332" y="211" fill={muted} fontSize="8">I/O</text>
      <text x="136" y="245" fill={muted} fontSize="8" letterSpacing="1">SIGNAL ROUTING · COMPONENT PLACEMENT</text>
    </DiagramBase>
  );
}

function FirmwareDiagram() {
  return (
    <DiagramBase title="Connected product vector: device firmware, gateway, cloud, and update path">
      <text x="34" y="43" fill={muted} fontSize="9" fontWeight="700" letterSpacing="1.5">CONNECTED PRODUCT STACK</text>
      <rect x="42" y="88" width="87" height="93" rx="5" fill="var(--bg-primary)" stroke={line} strokeWidth="1.2" />
      <rect x="54" y="102" width="63" height="22" rx="2" fill="var(--bg-secondary)" stroke={copper} />
      <text x="85" y="116" textAnchor="middle" fill={ink} fontSize="8" fontWeight="700">SENSOR NODE</text>
      <path d="M62 143 H109 M62 153 H101 M62 163 H105" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <path d="M129 134 H190" fill="none" stroke={copper} strokeWidth="1.6" markerEnd="url(#process-arrow)" />
      <circle cx="157" cy="119" r="3" fill={copper} /><circle cx="169" cy="149" r="2.5" fill={copper} />
      <rect x="202" y="88" width="79" height="93" rx="5" fill="var(--bg-primary)" stroke={line} strokeWidth="1.2" />
      <path d="M220 130 Q241 109 262 130 M226 138 Q241 123 256 138 M236 146 Q241 141 246 146" fill="none" stroke={copper} strokeWidth="1.5" />
      <circle cx="241" cy="151" r="2.5" fill={copper} />
      <text x="241" y="168" textAnchor="middle" fill={ink} fontSize="8" fontWeight="700">GATEWAY</text>
      <path d="M281 134 H321" fill="none" stroke={copper} strokeWidth="1.6" markerEnd="url(#process-arrow)" />
      <path d="M331 105 C331 98 348 96 354 102 C364 101 372 107 370 115 C378 122 372 131 363 131 H337 C326 131 322 119 331 114 Z" fill="var(--bg-primary)" stroke={ink} strokeWidth="1.2" />
      <text x="350" y="120" textAnchor="middle" fill={ink} fontSize="8" fontWeight="700">CLOUD</text>
      <path d="M350 135 V159 H84 V183" fill="none" stroke={line} strokeWidth="1.1" strokeDasharray="4 4" markerEnd="url(#process-arrow)" />
      <rect x="142" y="197" width="155" height="34" rx="3" fill="var(--bg-secondary)" stroke={line} />
      <text x="219" y="218" textAnchor="middle" fill={ink} fontSize="8" fontWeight="700">SECURE OTA UPDATE · VERIFIED</text>
      <text x="43" y="250" fill={muted} fontSize="8" letterSpacing="1">DEVICE · CONNECTIVITY · PLATFORM</text>
    </DiagramBase>
  );
}

function ValidationDiagram() {
  return (
    <DiagramBase title="Validation vector: test instrument trace and field device measurement">
      <text x="34" y="43" fill={muted} fontSize="9" fontWeight="700" letterSpacing="1.5">LAB VALIDATION · FIELD TRIAL</text>
      <rect x="49" y="76" width="184" height="127" rx="5" fill="var(--bg-primary)" stroke={line} strokeWidth="1.3" />
      <rect x="64" y="91" width="154" height="82" rx="2" fill="var(--bg-secondary)" stroke={line} />
      <path d="M71 133 H92 L103 112 L117 151 L132 121 L145 139 H164 L176 104 L188 147 L200 129 H211" fill="none" stroke={copper} strokeWidth="2" strokeLinejoin="round" />
      <path d="M66 183 H216" stroke={line} strokeWidth="1" />
      <circle cx="76" cy="190" r="3" fill={copper} /><circle cx="89" cy="190" r="3" fill={line} />
      <text x="139" y="194" textAnchor="middle" fill={muted} fontSize="8">OSCILLOSCOPE</text>
      <path d="M235 139 H281" fill="none" stroke={copper} strokeWidth="1.5" markerEnd="url(#process-arrow)" />
      <rect x="296" y="96" width="71" height="88" rx="8" fill="var(--bg-primary)" stroke={ink} strokeWidth="1.3" />
      <circle cx="331" cy="121" r="12" fill="var(--bg-secondary)" stroke={line} />
      <path d="M317 152 H345 M317 162 H339" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <text x="331" y="201" textAnchor="middle" fill={muted} fontSize="8">FIELD NODE</text>
      <path d="M302 222 H361" stroke={line} strokeWidth="1" />
      <circle cx="308" cy="222" r="3" fill={copper} />
      <text x="272" y="245" fill={muted} fontSize="8">LINK · POWER · THERMAL</text>
    </DiagramBase>
  );
}

function ProductionDiagram() {
  return (
    <DiagramBase title="Scale production vector: assembly line, inspection, and packed product">
      <text x="34" y="43" fill={muted} fontSize="9" fontWeight="700" letterSpacing="1.5">QUALITY · SCALE PRODUCTION</text>
      <path d="M43 190 H377" stroke={ink} strokeWidth="2" />
      <path d="M60 198 H360" stroke={line} strokeWidth="5" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => <circle key={`roller-${i}`} cx={78 + i * 65} cy="207" r="6" fill="var(--bg-primary)" stroke={line} strokeWidth="1.5" />)}
      <rect x="66" y="128" width="55" height="54" rx="3" fill="var(--bg-primary)" stroke={copper} strokeWidth="1.3" />
      <rect x="79" y="140" width="29" height="20" fill="var(--bg-secondary)" stroke={line} />
      <text x="94" y="174" textAnchor="middle" fill={muted} fontSize="7">ASSEMBLE</text>
      <path d="M145 103 V185 M132 103 H158 M136 112 H154" fill="none" stroke={ink} strokeWidth="1.3" />
      <path d="M137 111 L153 111 L148 124 L142 124 Z" fill="var(--bg-secondary)" stroke={copper} />
      <text x="145" y="98" textAnchor="middle" fill={muted} fontSize="7">PICK & PLACE</text>
      <rect x="184" y="128" width="55" height="54" rx="3" fill="var(--bg-primary)" stroke={line} strokeWidth="1.3" />
      <circle cx="211" cy="146" r="11" fill="none" stroke={copper} strokeWidth="1.5" />
      <path d="M205 146 L209 150 L217 141" fill="none" stroke={copper} strokeWidth="1.5" />
      <text x="211" y="174" textAnchor="middle" fill={muted} fontSize="7">QA CHECK</text>
      <rect x="303" y="122" width="52" height="60" rx="3" fill="var(--bg-primary)" stroke={ink} strokeWidth="1.3" />
      <path d="M303 139 H355 M329 122 V139" stroke={line} strokeWidth="1.2" />
      <text x="329" y="161" textAnchor="middle" fill={ink} fontSize="8" fontWeight="700">PACK</text>
      <text x="43" y="245" fill={muted} fontSize="8" letterSpacing="1">REPEATABLE TEST · TRACEABLE RELEASE</text>
    </DiagramBase>
  );
}

function ProcessDiagram({ step }) {
  const diagrams = [DiscoveryDiagram, PcbDiagram, FirmwareDiagram, ValidationDiagram, ProductionDiagram];
  const ActiveDiagram = diagrams[step];
  return ActiveDiagram ? <ActiveDiagram /> : null;
}

export default ProcessDiagram;

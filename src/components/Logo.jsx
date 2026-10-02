
function Logo({
  size = 100,
  showText = false,
  textColor = 'var(--text-primary)'
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <img
        src="/Navyrix%20logo.png"
        alt="Navyrix Labs logo"
      
        style={{
          display: 'block',
          width: `${size}px`,
          height: '72px',
          padding: 0,
          boxSizing: 'border-box',
          objectFit: 'contain',
          objectPosition: 'center bottom',
          borderRadius: '8px',
          filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
        }}
      />
    </div>
  );
}

export default Logo;
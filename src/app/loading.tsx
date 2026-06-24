import "./globals.css";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme'),s=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t==='system'&&s)||(!t&&s))document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

export default function Loading() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Loading · iziship</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <style>{`
          *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

          html, body {
            height: 100%;
            font-family: var(--font-sans, system-ui, sans-serif);
            background: var(--background);
            overflow: hidden;
          }
          body {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            gap: 28px; position: relative;
          }
          body::before {
            content: ''; position: fixed; inset: 0;
            background-image: radial-gradient(color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 1px);
            background-size: 28px 28px; pointer-events: none;
          }
          body::after {
            content: ''; position: fixed; inset: 0;
            background: radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 68%);
            pointer-events: none;
          }

          /* ── Logo ── */
          .wordmark {
            position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
            z-index: 20; text-decoration: none;
          }
          .logo-light { display: block; height: 32px; width: auto; }
          .logo-dark  { display: none;  height: 32px; width: auto; }
          html.dark .logo-light { display: none; }
          html.dark .logo-dark  { display: block; }

          /* ── Orbital loader ── */
          .loader { position: relative; width: 72px; height: 72px; z-index: 1; }

          .ring {
            position: absolute; inset: 0; border-radius: 50%;
            border: 1px solid color-mix(in oklch, var(--primary) 20%, transparent);
          }
          .orbit {
            position: absolute; inset: 0; border-radius: 50%;
            animation: spin linear infinite;
          }
          .orbit::before {
            content: ''; position: absolute;
            top: 0; left: 50%; transform: translate(-50%, -50%);
            border-radius: 50%; background: var(--primary);
          }

          .orbit-1 { animation-duration: 1.4s; }
          .orbit-1::before {
            width: 7px; height: 7px;
            box-shadow: 0 0 10px var(--primary), 0 0 20px color-mix(in oklch, var(--primary) 45%, transparent);
          }
          .orbit-2 { inset: 12px; animation-duration: 2s; animation-direction: reverse; }
          .orbit-2::before {
            width: 5px; height: 5px;
            background: color-mix(in oklch, var(--primary) 65%, transparent);
          }
          .orbit-3 { inset: 24px; animation-duration: 2.8s; }
          .orbit-3::before {
            width: 4px; height: 4px;
            background: color-mix(in oklch, var(--primary) 40%, transparent);
          }

          .hub { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
          .hub svg { animation: hubPulse 1.8s ease-in-out infinite; }
          @keyframes hubPulse {
            0%,100% { opacity: .45; transform: scale(1); }
            50%     { opacity: .9;  transform: scale(1.08); }
          }
          @keyframes spin { to { transform: rotate(360deg); } }

          /* ── Label ── */
          .label { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
          .label-text {
            font-size: 12.5px; font-weight: 600;
            color: var(--muted-foreground);
            letter-spacing: .08em; text-transform: uppercase;
          }
          .ellipsis { display: flex; gap: 4px; align-items: center; }
          .ellipsis span {
            width: 3.5px; height: 3.5px; border-radius: 50%;
            background: var(--primary); opacity: .5;
            animation: dot 1.2s ease-in-out infinite;
          }
          .ellipsis span:nth-child(2) { animation-delay: .2s; }
          .ellipsis span:nth-child(3) { animation-delay: .4s; }
          @keyframes dot {
            0%,80%,100% { transform: scale(.6); opacity: .2; }
            40%         { transform: scale(1);  opacity: .7; }
          }

          @media (max-width: 480px) {
            .loader { width: 60px; height: 60px; }
            .orbit-2 { inset: 10px; }
            .orbit-3 { inset: 20px; }
            .logo-light, .logo-dark { height: 28px; }
            .wordmark { top: 18px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .orbit, .hub svg, .ellipsis span { animation: none !important; }
          }
        `}</style>
      </head>
      <body>
        <a href="/" className="wordmark" aria-label="iziship">
          <img src="/logo.svg"      alt="iziship" className="logo-light" width={120} height={32} />
          <img src="/logo-dark.svg" alt="iziship" className="logo-dark"  width={120} height={32} />
        </a>

        <div className="loader" role="status" aria-label="Loading">
          <div className="ring" />
          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />
          <div className="orbit orbit-3" />
          <div className="hub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--primary)" }}>
              <path d="M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8l1 10a2 2 0 002 2h8a2 2 0 002-2L19 8" />
            </svg>
          </div>
        </div>

        <div className="label">
          <span className="label-text">Routing your shipment</span>
          <div className="ellipsis" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "./globals.css";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme'),s=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t==='system'&&s)||(!t&&s))document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number, t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx!.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      r: 0.8 + Math.random() * 1.6,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      op: 0.08 + Math.random() * 0.16,
    }));

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const dark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, W, H);
      t += 0.007;

      for (let i = 0; i < dots.length - 2; i += 4) {
        const a = dots[i], b = dots[i + 2];
        const ax = (a.x / 100) * W, ay = (a.y / 100) * H + Math.sin(t + a.phase) * 5;
        const bx = (b.x / 100) * W, by = (b.y / 100) * H + Math.sin(t + b.phase) * 5;
        ctx.strokeStyle = `rgba(27,110,243,${dark ? 0.05 : 0.12})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo((ax + bx) / 2, Math.min(ay, by) - 28, bx, by);
        ctx.stroke();
      }
      for (const d of dots) {
        const x = (d.x / 100) * W;
        const y = (d.y / 100) * H + Math.sin(t * d.speed + d.phase) * 7;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.1 + d.phase);
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(27,110,243,${(dark ? d.op : d.op * 0.8) * (0.6 + 0.4 * pulse)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>404 — Page not found · iziship</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <style>{`
          *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

          html, body {
            height: 100%;
            font-family: var(--font-sans, system-ui, sans-serif);
            background: var(--background);
            color: var(--foreground);
            overflow: hidden;
          }
          body {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            position: relative;
          }

          canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

          .radial {
            position: fixed; inset: 0; pointer-events: none; z-index: 1;
            background: radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%);
          }
          .dot-grid {
            position: fixed; inset: 0; pointer-events: none; z-index: 1;
            background-image: radial-gradient(color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 1px);
            background-size: 28px 28px;
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

          /* ── Card ── */
          main {
            position: relative; z-index: 10;
            display: flex; flex-direction: column; align-items: center; text-align: center;
            padding: 0 20px; max-width: 480px; width: 100%;
          }

          /* ── Badge ── */
          .badge {
            display: inline-flex; align-items: center; gap: 6px;
            border: 1px solid color-mix(in oklch, var(--primary) 35%, transparent);
            background: color-mix(in oklch, var(--primary) 10%, transparent);
            color: var(--primary);
            font-size: 10.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
            padding: 5px 13px; border-radius: 999px; margin-bottom: 20px;
            animation: fadeUp .6s .08s cubic-bezier(.22,1,.36,1) both;
          }
          .badge-dot {
            width: 5px; height: 5px; border-radius: 50%;
            background: var(--primary);
            animation: blink 1.4s ease-in-out infinite;
          }
          @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:.25 } }

          /* ── 404 glyph ── */
          .glyph {
            font-size: clamp(88px, 16vw, 144px); font-weight: 900;
            letter-spacing: -0.06em; line-height: 1; margin-bottom: 32px;
            display: flex; align-items: center; gap: 0.02em;
            animation: fadeUp .65s cubic-bezier(.22,1,.36,1) both;
          }
          .g4 {
            color: transparent;
            -webkit-text-stroke: 1.5px color-mix(in oklch, var(--foreground) 25%, transparent);
          }
          .g0 {
            position: relative; color: transparent;
            -webkit-text-stroke: 2px var(--primary);
            animation: glowPulse 2.8s ease-in-out infinite;
          }
          @keyframes glowPulse {
            0%,100% { filter: drop-shadow(0 0 10px color-mix(in oklch, var(--primary) 45%, transparent)); }
            50%     { filter: drop-shadow(0 0 24px color-mix(in oklch, var(--primary) 75%, transparent)); }
          }
          .scan {
            position: absolute; left: -6%; width: 112%; height: 1.5px;
            background: linear-gradient(90deg, transparent, var(--primary) 30%, color-mix(in oklch, var(--primary) 60%, white) 50%, var(--primary) 70%, transparent);
            border-radius: 1px;
            animation: scan 2.6s ease-in-out infinite .5s;
            pointer-events: none;
          }
          @keyframes scan {
            0%   { top: 8%;  opacity: 0; }
            6%   {           opacity: 1; }
            88%  {           opacity: 1; }
            100% { top: 92%; opacity: 0; }
          }

          /* ── Text ── */
          h1 {
            font-size: clamp(19px, 3vw, 27px); font-weight: 800;
            letter-spacing: -.025em; line-height: 1.2;
            color: var(--foreground); margin-bottom: 13px;
            animation: fadeUp .65s .16s cubic-bezier(.22,1,.36,1) both;
          }
          .sub {
            font-size: 15px; line-height: 1.68;
            color: var(--muted-foreground);
            max-width: 350px; margin-bottom: 36px;
            animation: fadeUp .65s .22s cubic-bezier(.22,1,.36,1) both;
          }

          /* ── Buttons ── */
          .actions {
            display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
            animation: fadeUp .65s .3s cubic-bezier(.22,1,.36,1) both;
          }
          .btn-p {
            display: inline-flex; align-items: center; gap: 7px;
            background: var(--primary); color: var(--primary-foreground);
            font-size: 13.5px; font-weight: 700; padding: 11px 22px;
            border-radius: var(--radius-xl); text-decoration: none;
            box-shadow: 0 6px 24px color-mix(in oklch, var(--primary) 30%, transparent);
            transition: filter .15s, box-shadow .15s, transform .12s;
            border: none;
          }
          .btn-p:hover {
            filter: brightness(1.1);
            box-shadow: 0 10px 32px color-mix(in oklch, var(--primary) 45%, transparent);
            transform: translateY(-1px);
          }
          .btn-p:focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }

          .btn-g {
            display: inline-flex; align-items: center; gap: 7px;
            background: color-mix(in oklch, var(--foreground) 6%, transparent);
            color: var(--muted-foreground);
            font-size: 13.5px; font-weight: 600; padding: 11px 22px;
            border-radius: var(--radius-xl); text-decoration: none;
            border: 1px solid var(--border);
            transition: background .14s, color .14s, transform .12s;
          }
          .btn-g:hover {
            background: color-mix(in oklch, var(--foreground) 10%, transparent);
            color: var(--foreground);
            transform: translateY(-1px);
          }
          .btn-g:focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }

          @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }

          @media (max-width: 480px) {
            .glyph { font-size: clamp(72px, 22vw, 100px); margin-bottom: 24px; }
            h1 { font-size: 18px; }
            .sub { font-size: 14px; margin-bottom: 28px; }
            .btn-p, .btn-g { font-size: 13px; padding: 10px 18px; }
            .logo-light, .logo-dark { height: 28px; }
            .wordmark { top: 18px; }
          }
          @media (prefers-reduced-motion: reduce) {
            main * { animation: none !important; }
            .g0 { filter: none; animation: none !important; }
            .scan { display: none; }
          }
        `}</style>
      </head>
      <body>
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="radial" aria-hidden="true" />
        <div className="dot-grid" aria-hidden="true" />

        <a href="/" className="wordmark" aria-label="iziship — back to home">
          <img src="/logo.svg"      alt="iziship" className="logo-light" width={120} height={32} />
          <img src="/logo-dark.svg" alt="iziship" className="logo-dark"  width={120} height={32} />
        </a>

        <main>
          <div className="badge" role="status">
            <span className="badge-dot" aria-hidden="true" />
            Error 404
          </div>

          <div className="glyph" aria-label="404">
            <span className="g4">4</span>
            <span className="g0">0<span className="scan" aria-hidden="true" /></span>
            <span className="g4">4</span>
          </div>

          <h1>This page got lost in transit</h1>
          <p className="sub">The route you requested doesn't exist — it may have moved, expired, or never shipped. Check the URL and try again.</p>

          <div className="actions">
            <Link href="/" className="btn-p">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Back to home
            </Link>
            <a href="mailto:support@iziship.com" className="btn-g">Contact support</a>
          </div>
        </main>
      </body>
    </html>
  );
}

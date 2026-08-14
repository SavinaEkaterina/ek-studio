const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function generateAsset(svgContent, relativePath, width = 800, height = 800) {
  const fullSvg = '<?xml version="1.0" encoding="utf-8"?>\n' + svgContent.trim();
  const tmpSvg = '/tmp/master_' + Math.random().toString(36).substr(2, 6) + '.svg';
  const tmpWebp = '/tmp/master_' + Math.random().toString(36).substr(2, 6) + '.webp';
  fs.writeFileSync(tmpSvg, fullSvg, 'utf8');
  
  try {
    execSync(`ffmpeg -y -i ${tmpSvg} -vf scale=${width}:${height} -c:v libwebp -lossless 1 ${tmpWebp}`);
  } catch (e) {
    console.error('FFmpeg error for', relativePath, e.message);
    return;
  }

  const size = fs.statSync(tmpWebp).size;
  if (size < 500) {
    console.error('FAILED: generated WebP is too small (' + size + ' bytes) for ' + relativePath);
    return;
  }

  const dests = [
    path.join('src/assets/Portfolio/03_Assets', relativePath),
    path.join('public/Portfolio/03_Assets', relativePath),
    path.join('Portfolio/03_Assets', relativePath),
    path.join('dist/Portfolio/03_Assets', relativePath)
  ];

  dests.forEach(dest => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(tmpWebp, dest);
  });

  fs.unlinkSync(tmpSvg);
  fs.unlinkSync(tmpWebp);
  console.log('SUCCESS:', relativePath, '(' + size + ' bytes)');
}

// 1. DESK LAMP
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <radialGradient id="lightGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.6"/>
      <stop offset="45%" stop-color="#d97706" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="baseMetal" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#44403c"/>
      <stop offset="60%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#0c0a09"/>
    </radialGradient>
    <linearGradient id="brassArm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="16" dy="28" stdDeviation="18" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
  </defs>
  <circle cx="540" cy="280" r="240" fill="url(#lightGlow)" />
  <g filter="url(#shadow)">
    <circle cx="280" cy="520" r="110" fill="url(#baseMetal)" stroke="#d97706" stroke-width="4"/>
    <circle cx="280" cy="520" r="88" fill="none" stroke="#78350f" stroke-width="2.5" stroke-dasharray="6,6"/>
    <circle cx="280" cy="520" r="20" fill="url(#brassArm)" />
    <circle cx="280" cy="520" r="8" fill="#fef08a" />
    <path d="M280 520 Q380 440 480 320" fill="none" stroke="url(#brassArm)" stroke-width="20" stroke-linecap="round"/>
    <path d="M280 520 Q380 440 480 320" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
    <circle cx="480" cy="320" r="22" fill="url(#baseMetal)" stroke="#eab308" stroke-width="3"/>
    <circle cx="540" cy="280" r="80" fill="url(#baseMetal)" stroke="#eab308" stroke-width="4"/>
    <circle cx="540" cy="280" r="68" fill="#78350f"/>
    <circle cx="540" cy="280" r="58" fill="#fef08a"/>
    <circle cx="540" cy="280" r="50" fill="#ffffff"/>
  </g>
</svg>`, 'Lamp/lamp.webp', 800, 800);

// 2. CAMERA
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="700" viewBox="0 0 800 700">
  <defs>
    <linearGradient id="silverBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <radialGradient id="lensGlass" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="25%" stop-color="#1e293b"/>
      <stop offset="70%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="12" dy="24" stdDeviation="16" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="100" y="160" width="600" height="360" rx="40" fill="#18181b" stroke="#52525b" stroke-width="3"/>
    <rect x="100" y="250" width="600" height="270" rx="30" fill="#09090b"/>
    <path d="M 100 200 Q 100 160 140 160 L 660 160 Q 700 160 700 200 L 700 250 L 100 250 Z" fill="url(#silverBody)" />
    <rect x="160" y="120" width="68" height="40" rx="6" fill="url(#silverBody)" stroke="#64748b"/>
    <rect x="560" y="126" width="54" height="34" rx="6" fill="url(#silverBody)" stroke="#64748b"/>
    <circle cx="640" cy="144" r="26" fill="url(#silverBody)" stroke="#475569" stroke-width="3"/>
    <circle cx="640" cy="144" r="15" fill="#dc2626"/>
    <circle cx="190" cy="290" r="20" fill="#dc2626"/>
    <text x="190" y="296" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="sans-serif">Ekaterina</text>
    <circle cx="400" cy="340" r="150" fill="#27272a" stroke="#71717a" stroke-width="6"/>
    <circle cx="400" cy="340" r="125" fill="#18181b" stroke="#e2e8f0" stroke-width="3"/>
    <circle cx="400" cy="340" r="100" fill="url(#lensGlass)"/>
    <ellipse cx="370" cy="310" rx="50" ry="25" fill="#ffffff" opacity="0.3" transform="rotate(-25 370 310)"/>
    <circle cx="400" cy="340" r="40" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.8"/>
  </g>
</svg>`, 'Camera/Top.webp', 800, 700);

// 3. COFFEE
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="12" dy="20" stdDeviation="14" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
    <radialGradient id="ceramic" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </radialGradient>
    <radialGradient id="liquid" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="25%" stop-color="#78350f"/>
      <stop offset="75%" stop-color="#451a03"/>
      <stop offset="100%" stop-color="#270e02"/>
    </radialGradient>
  </defs>
  <g filter="url(#shadow)">
    <path d="M 420 220 C 540 220 540 380 420 380" fill="none" stroke="url(#ceramic)" stroke-width="42" stroke-linecap="round"/>
    <circle cx="300" cy="300" r="170" fill="url(#ceramic)" stroke="#e2e8f0" stroke-width="3"/>
    <circle cx="300" cy="300" r="148" fill="#e2e8f0"/>
    <circle cx="300" cy="300" r="138" fill="url(#liquid)"/>
    <path d="M 270 270 Q 300 220 330 270 Q 300 340 270 270 Z" fill="#fef3c7" opacity="0.9"/>
    <path d="M 285 285 Q 300 250 315 285 Q 300 320 285 285 Z" fill="#78350f" opacity="0.5"/>
    <ellipse cx="250" cy="240" rx="38" ry="16" fill="#ffffff" opacity="0.3" transform="rotate(-30 250 240)"/>
  </g>
</svg>`, 'Coffee/coffee.webp', 600, 600);

// 4. LAPTOP
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="680" viewBox="0 0 900 680">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#52525b"/>
      <stop offset="50%" stop-color="#27272a"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
    <linearGradient id="screen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>
  <g filter="url(#shadow)">
    <rect x="100" y="80" width="700" height="520" rx="36" fill="url(#metal)" stroke="#71717a" stroke-width="3"/>
    <rect x="130" y="110" width="640" height="320" rx="16" fill="url(#screen)" stroke="#3f3f46" stroke-width="2"/>
    <rect x="160" y="140" width="180" height="18" rx="6" fill="#f59e0b"/>
    <rect x="160" y="176" width="360" height="12" rx="4" fill="#38bdf8" opacity="0.85"/>
    <rect x="160" y="200" width="280" height="12" rx="4" fill="#a855f7" opacity="0.85"/>
    <rect x="160" y="224" width="440" height="12" rx="4" fill="#64748b" opacity="0.6"/>
    <rect x="560" y="140" width="180" height="260" rx="12" fill="#1e293b" stroke="#334155"/>
    <circle cx="650" cy="220" r="45" fill="#f59e0b" opacity="0.25"/>
    <rect x="130" y="448" width="640" height="132" rx="12" fill="#09090b" stroke="#27272a"/>
    <rect x="146" y="460" width="608" height="18" rx="4" fill="#18181b" stroke="#27272a"/>
    <rect x="146" y="484" width="608" height="18" rx="4" fill="#18181b" stroke="#27272a"/>
    <rect x="146" y="508" width="608" height="18" rx="4" fill="#18181b" stroke="#27272a"/>
    <rect x="360" y="538" width="180" height="34" rx="6" fill="#18181b" stroke="#3f3f46"/>
  </g>
</svg>`, 'Laptop/laptop.webp', 900, 680);

// 5. MOUSE
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="680" viewBox="0 0 500 680">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="10" dy="18" stdDeviation="12" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
    <linearGradient id="mouseBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#52525b"/>
      <stop offset="70%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <g filter="url(#shadow)">
    <path d="M 250 100 Q 360 100 360 280 Q 360 540 250 540 Q 140 540 140 280 Q 140 100 250 100 Z" fill="url(#mouseBody)" stroke="#71717a" stroke-width="3"/>
    <line x1="250" y1="102" x2="250" y2="260" stroke="#18181b" stroke-width="4"/>
    <rect x="236" y="140" width="28" height="60" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
    <line x1="236" y1="160" x2="264" y2="160" stroke="#475569" stroke-width="3"/>
    <line x1="236" y1="175" x2="264" y2="175" stroke="#475569" stroke-width="3"/>
    <path d="M 170 320 Q 250 360 330 320" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.85"/>
  </g>
</svg>`, 'Mouse/Mouse.webp', 500, 680);

// 6. NOTEBOOK
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="700" height="800" viewBox="0 0 700 800">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="14" dy="22" stdDeviation="14" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="60" y="60" width="580" height="680" rx="24" fill="#1c1917" stroke="#44403c" stroke-width="3"/>
    <rect x="76" y="76" width="548" height="648" rx="12" fill="#fef3c7"/>
    <rect x="346" y="76" width="8" height="648" fill="#d97706" opacity="0.35"/>
    <line x1="130" y1="150" x2="300" y2="150" stroke="#d97706" stroke-width="4"/>
    <text x="130" y="140" font-size="22" font-weight="bold" fill="#78350f" font-family="sans-serif">UX UI Philosophy</text>
    <rect x="130" y="180" width="180" height="120" rx="8" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="6,6"/>
    <text x="220" y="245" font-size="16" text-anchor="middle" fill="#92400e" font-family="sans-serif">WIREFRAME</text>
    <text x="380" y="140" font-size="22" font-weight="bold" fill="#78350f" font-family="sans-serif">Ekaterina Savina</text>
    <line x1="380" y1="180" x2="590" y2="180" stroke="#f59e0b" stroke-width="2"/>
    <line x1="380" y1="215" x2="590" y2="215" stroke="#f59e0b" stroke-width="2"/>
    <line x1="380" y1="250" x2="560" y2="250" stroke="#f59e0b" stroke-width="2"/>
    <line x1="380" y1="285" x2="530" y2="285" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 348 60 L 348 760 L 364 730 L 380 760 L 380 60 Z" fill="#dc2626"/>
  </g>
</svg>`, 'Notebook/OpenNotes.webp', 700, 800);

// 7. PEN
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="260" height="800" viewBox="0 0 260 800">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="10" dy="16" stdDeviation="8" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
    <linearGradient id="penBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#27272a"/>
      <stop offset="50%" stop-color="#71717a"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
  </defs>
  <g filter="url(#shadow)">
    <rect x="110" y="120" width="40" height="540" rx="20" fill="url(#penBody)" stroke="#3f3f46"/>
    <rect x="124" y="140" width="12" height="160" rx="6" fill="url(#gold)" />
    <rect x="108" y="320" width="44" height="16" rx="3" fill="url(#gold)" />
    <rect x="108" y="610" width="44" height="10" rx="3" fill="url(#gold)" />
    <path d="M 110 660 L 130 730 L 150 660 Z" fill="url(#gold)" />
    <circle cx="130" cy="730" r="4" fill="#09090b" />
  </g>
</svg>`, 'Pen/pen.webp', 260, 800);

// 8. POLAROID
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="12" dy="20" stdDeviation="14" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="50" y="50" width="500" height="600" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
    <rect x="84" y="84" width="432" height="432" rx="6" fill="#18181b"/>
    <circle cx="300" cy="260" r="80" fill="#f59e0b" opacity="0.35"/>
    <path d="M 180 460 C 180 340 420 340 420 460" fill="#d97706" opacity="0.8"/>
    <circle cx="300" cy="240" r="60" fill="#fef08a"/>
    <text x="300" y="595" font-size="30" text-anchor="middle" fill="#1c1917" font-family="serif" font-style="italic">Ekaterina Savina</text>
  </g>
</svg>`, 'Polaroid/Polaroid.webp', 600, 700);

// 9. SMARTPHONE
generateAsset(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="840" viewBox="0 0 480 840">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="12" dy="24" stdDeviation="16" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
    <linearGradient id="screen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>
  <g filter="url(#shadow)">
    <rect x="40" y="50" width="400" height="740" rx="56" fill="#18181b" stroke="#71717a" stroke-width="4"/>
    <rect x="58" y="68" width="364" height="704" rx="46" fill="url(#screen)"/>
    <rect x="180" y="84" width="120" height="28" rx="14" fill="#000000"/>
    <text x="240" y="170" font-size="22" font-weight="bold" text-anchor="middle" fill="#f59e0b" font-family="sans-serif">PORTFOLIO APP</text>
    <rect x="88" y="200" width="304" height="140" rx="20" fill="#312e81" stroke="#4338ca"/>
    <rect x="88" y="360" width="140" height="140" rx="20" fill="#065f46"/>
    <rect x="252" y="360" width="140" height="140" rx="20" fill="#831843"/>
    <rect x="88" y="650" width="304" height="70" rx="35" fill="#f59e0b"/>
    <text x="240" y="694" font-size="18" font-weight="bold" text-anchor="middle" fill="#000000" font-family="sans-serif">Contact via Telegram</text>
  </g>
</svg>`, 'Smartphone/Smartphone.webp', 480, 840);

console.log('--- MASTER GENERATOR COMPLETED ---');

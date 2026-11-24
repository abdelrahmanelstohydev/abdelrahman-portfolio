const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  path.join(__dirname, '..', 'src', 'assets', 'files'),
  path.join(__dirname, '..', 'src', 'assets', 'images'),
  path.join(__dirname, '..', 'public', 'assets', 'files'),
  path.join(__dirname, '..', 'public', 'assets', 'images')
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// Create valid PDF for CV
const createPdf = () => {
  const content = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length 550
>>
stream
BT
/F2 24 Tf
50 720 Td
(Abdelrahman Elstohy - Curriculum Vitae) Tj
0 -30 Td
/F1 12 Tf
(Computer Science Student | Mansoura University) Tj
0 -20 Td
(Backend Developer | Software Engineer | Full-Stack Developer) Tj
0 -40 Td
/F2 16 Tf
(Professional Summary) Tj
0 -25 Td
/F1 11 Tf
(Passionate Computer Science student with a strong foundation in backend development,) Tj
0 -16 Td
(software architecture, and modern full-stack web solutions.) Tj
0 -40 Td
/F2 16 Tf
(Notice: Placeholder CV File) Tj
0 -25 Td
/F1 11 Tf
(To replace this placeholder CV with your actual resume, simply overwrite:) Tj
0 -18 Td
(src/assets/files/cv.pdf or public/assets/files/cv.pdf) Tj
0 -18 Td
(with your finalized PDF document.) Tj
ET
endstream
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000289 00000 n 
0000000892 00000 n 
0000000963 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1039
%%EOF`;

  const cvPaths = [
    path.join(__dirname, '..', 'src', 'assets', 'files', 'cv.pdf'),
    path.join(__dirname, '..', 'public', 'assets', 'files', 'cv.pdf')
  ];

  cvPaths.forEach(p => fs.writeFileSync(p, content, 'utf8'));
  console.log('CV PDF created.');
};

// Create a high quality SVG profile image and save as profile.svg & profile.png (SVG based or data uri)
const createProfileSvg = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B293B" />
      <stop offset="50%" stop-color="#2F4A63" />
      <stop offset="100%" stop-color="#131B2B" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5B91A3" />
      <stop offset="100%" stop-color="#89C4D8" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#5B91A3" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#131B2B" stop-opacity="0" />
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Outer circle background -->
  <circle cx="250" cy="250" r="240" fill="url(#bgGrad)" stroke="url(#accentGrad)" stroke-width="4" />
  <circle cx="250" cy="250" r="220" fill="url(#glowGrad)" />

  <!-- Code brackets in background -->
  <text x="80" y="200" font-family="monospace" font-size="48" fill="#5B91A3" opacity="0.3">&lt;/&gt;</text>
  <text x="360" y="320" font-family="monospace" font-size="40" fill="#5B91A3" opacity="0.25">{ ; }</text>

  <!-- Modern Avatar Illustration -->
  <g transform="translate(0, 10)">
    <!-- Body / Shoulders -->
    <path d="M 140 440 C 140 340, 200 320, 250 320 C 300 320, 360 340, 360 440 Z" fill="#203449" stroke="#5B91A3" stroke-width="2" />
    <!-- Collar / Hoodie V-shape -->
    <polygon points="250,370 230,320 270,320" fill="#131B2B" />
    
    <!-- Neck -->
    <rect x="230" y="270" width="40" height="60" rx="8" fill="#E2BA99" />
    
    <!-- Head -->
    <ellipse cx="250" cy="220" rx="65" ry="75" fill="#F0C7A6" />
    
    <!-- Modern styled hair -->
    <path d="M 180 210 C 180 140, 210 130, 250 130 C 290 130, 320 145, 320 210 C 305 180, 280 170, 250 170 C 220 170, 195 185, 180 210 Z" fill="#1C202A" />
    
    <!-- Glasses -->
    <rect x="200" y="200" width="40" height="28" rx="8" fill="none" stroke="#5B91A3" stroke-width="3" />
    <rect x="260" y="200" width="40" height="28" rx="8" fill="none" stroke="#5B91A3" stroke-width="3" />
    <line x1="240" y1="214" x2="260" y2="214" stroke="#5B91A3" stroke-width="3" />

    <!-- Eyes inside glasses -->
    <circle cx="220" cy="214" r="4" fill="#1C202A" />
    <circle cx="280" cy="214" r="4" fill="#1C202A" />

    <!-- Smile -->
    <path d="M 235 255 Q 250 268 265 255" fill="none" stroke="#8A4A36" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- Monogram Badge -->
  <g transform="translate(370, 370)">
    <circle cx="25" cy="25" r="32" fill="#131B2B" stroke="#5B91A3" stroke-width="3" filter="url(#glow)" />
    <text x="25" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#F4F0E2" text-anchor="middle">AE</text>
  </g>
</svg>`;

  const svgPaths = [
    path.join(__dirname, '..', 'src', 'assets', 'images', 'profile.svg'),
    path.join(__dirname, '..', 'public', 'assets', 'images', 'profile.svg'),
    path.join(__dirname, '..', 'src', 'assets', 'images', 'profile.png'),
    path.join(__dirname, '..', 'public', 'assets', 'images', 'profile.png')
  ];

  svgPaths.forEach(p => fs.writeFileSync(p, svg, 'utf8'));
  console.log('Profile images created.');
};

createPdf();
createProfileSvg();

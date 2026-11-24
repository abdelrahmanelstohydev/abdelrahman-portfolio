const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'projects');
const testimonialDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'testimonials');
const publicProjectDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'projects');
const publicTestimonialDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'testimonials');

[projectDir, testimonialDir, publicProjectDir, publicTestimonialDir].forEach(d => fs.mkdirSync(d, { recursive: true }));

const writeBoth = (fileName, content, isTestimonial = false) => {
  const p1 = isTestimonial ? path.join(testimonialDir, fileName) : path.join(projectDir, fileName);
  const p2 = isTestimonial ? path.join(publicTestimonialDir, fileName) : path.join(publicProjectDir, fileName);
  fs.writeFileSync(p1, content, 'utf8');
  fs.writeFileSync(p2, content, 'utf8');
};

// 1. E-Commerce SVG
const ecommerceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141E30" />
      <stop offset="100%" stop-color="#243B55" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5B91A3" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#2F4A63" stop-opacity="0.2" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <!-- UI Dashboard window -->
  <rect x="60" y="50" width="680" height="400" rx="16" fill="#1B293B" stroke="#5B91A3" stroke-width="2" stroke-opacity="0.4"/>
  <!-- Window header -->
  <path d="M 60 50 Q 60 50 740 50" stroke="#5B91A3" stroke-opacity="0.2"/>
  <circle cx="90" cy="75" r="6" fill="#FF5F56"/>
  <circle cx="110" cy="75" r="6" fill="#FFBD2E"/>
  <circle cx="130" cy="75" r="6" fill="#27C93F"/>
  <text x="400" y="80" fill="#B8C6D3" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" text-anchor="middle" font-weight="600">E-Commerce Management Dashboard &bull; ASP.NET Core &amp; Angular</text>

  <!-- Left Sidebar -->
  <rect x="80" y="105" width="160" height="320" rx="10" fill="#131B2B" stroke="#5B91A3" stroke-opacity="0.2"/>
  <rect x="95" y="130" width="130" height="24" rx="6" fill="#5B91A3" fill-opacity="0.25"/>
  <rect x="95" y="165" width="130" height="20" rx="6" fill="#2F4A63" fill-opacity="0.3"/>
  <rect x="95" y="195" width="130" height="20" rx="6" fill="#2F4A63" fill-opacity="0.3"/>
  <rect x="95" y="225" width="130" height="20" rx="6" fill="#2F4A63" fill-opacity="0.3"/>
  <rect x="95" y="255" width="130" height="20" rx="6" fill="#2F4A63" fill-opacity="0.3"/>

  <!-- Main stats cards -->
  <rect x="260" y="105" width="140" height="80" rx="10" fill="url(#cardGrad)" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="275" y="135" fill="#B8C6D3" font-family="sans-serif" font-size="12">Total Orders</text>
  <text x="275" y="165" fill="#F4F0E2" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="bold">1,482</text>

  <rect x="420" y="105" width="140" height="80" rx="10" fill="url(#cardGrad)" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="435" y="135" fill="#B8C6D3" font-family="sans-serif" font-size="12">Revenue</text>
  <text x="435" y="165" fill="#5B91A3" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="bold">$48,250</text>

  <rect x="580" y="105" width="140" height="80" rx="10" fill="url(#cardGrad)" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="595" y="135" fill="#B8C6D3" font-family="sans-serif" font-size="12">Stock Items</text>
  <text x="595" y="165" fill="#F4F0E2" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="bold">8,920</text>

  <!-- Data table mockup -->
  <rect x="260" y="205" width="460" height="220" rx="10" fill="#131B2B" stroke="#5B91A3" stroke-opacity="0.2"/>
  <line x1="280" y1="240" x2="700" y2="240" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="280" y="232" fill="#5B91A3" font-family="sans-serif" font-size="12" font-weight="bold">ORDER ID</text>
  <text x="380" y="232" fill="#5B91A3" font-family="sans-serif" font-size="12" font-weight="bold">CUSTOMER</text>
  <text x="520" y="232" fill="#5B91A3" font-family="sans-serif" font-size="12" font-weight="bold">STATUS</text>
  <text x="650" y="232" fill="#5B91A3" font-family="sans-serif" font-size="12" font-weight="bold">TOTAL</text>

  <text x="280" y="275" fill="#F4F0E2" font-family="monospace" font-size="12">#ORD-9821</text>
  <text x="380" y="275" fill="#B8C6D3" font-family="sans-serif" font-size="12">Mansoura Tech Co</text>
  <rect x="515" y="260" width="65" height="20" rx="10" fill="#5B91A3" fill-opacity="0.2"/>
  <text x="547" y="274" fill="#5B91A3" font-family="sans-serif" font-size="11" text-anchor="middle">Shipped</text>
  <text x="650" y="275" fill="#F4F0E2" font-family="sans-serif" font-size="12">$340.00</text>

  <text x="280" y="315" fill="#F4F0E2" font-family="monospace" font-size="12">#ORD-9822</text>
  <text x="380" y="315" fill="#B8C6D3" font-family="sans-serif" font-size="12">Alexandria Logistics</text>
  <rect x="515" y="300" width="65" height="20" rx="10" fill="#27C93F" fill-opacity="0.2"/>
  <text x="547" y="314" fill="#27C93F" font-family="sans-serif" font-size="11" text-anchor="middle">Complete</text>
  <text x="650" y="315" fill="#F4F0E2" font-family="sans-serif" font-size="12">$820.50</text>

  <text x="280" y="355" fill="#F4F0E2" font-family="monospace" font-size="12">#ORD-9823</text>
  <text x="380" y="355" fill="#B8C6D3" font-family="sans-serif" font-size="12">Cairo Retail Ltd</text>
  <rect x="515" y="340" width="65" height="20" rx="10" fill="#FFBD2E" fill-opacity="0.2"/>
  <text x="547" y="354" fill="#FFBD2E" font-family="sans-serif" font-size="11" text-anchor="middle">Pending</text>
  <text x="650" y="355" fill="#F4F0E2" font-family="sans-serif" font-size="12">$1,150.00</text>
</svg>`;

// 2. Student Management SVG
const studentSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B293B" />
      <stop offset="100%" stop-color="#131B2B" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg2)"/>
  <rect x="60" y="50" width="680" height="400" rx="16" fill="#1B293B" stroke="#5B91A3" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="90" cy="75" r="6" fill="#FF5F56"/>
  <circle cx="110" cy="75" r="6" fill="#FFBD2E"/>
  <circle cx="130" cy="75" r="6" fill="#27C93F"/>
  <text x="400" y="80" fill="#B8C6D3" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" text-anchor="middle" font-weight="600">Student &amp; Academic Record Management &bull; Mansoura University CS</text>

  <!-- Profile Card Left -->
  <rect x="90" y="115" width="220" height="300" rx="12" fill="#131B2B" stroke="#5B91A3" stroke-opacity="0.3"/>
  <circle cx="200" cy="180" r="42" fill="#2F4A63" stroke="#5B91A3" stroke-width="3"/>
  <text x="200" y="188" fill="#F4F0E2" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="bold" text-anchor="middle">CS</text>
  <text x="200" y="245" fill="#F4F0E2" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Computer Science</text>
  <text x="200" y="265" fill="#5B91A3" font-family="sans-serif" font-size="12" text-anchor="middle">Undergraduate Portal</text>

  <rect x="110" y="295" width="180" height="35" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.2"/>
  <text x="125" y="318" fill="#B8C6D3" font-family="sans-serif" font-size="12">GPA Index: <tspan fill="#27C93F" font-weight="bold">3.88</tspan></text>
  <rect x="110" y="340" width="180" height="35" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.2"/>
  <text x="125" y="363" fill="#B8C6D3" font-family="sans-serif" font-size="12">Credits: <tspan fill="#5B91A3" font-weight="bold">114 / 136</tspan></text>

  <!-- Right Cards Courses List -->
  <rect x="340" y="115" width="370" height="300" rx="12" fill="#131B2B" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="365" y="145" fill="#F4F0E2" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="bold">Enrolled Courses &amp; Semesters</text>

  <g transform="translate(365, 170)">
    <rect width="320" height="45" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <text x="15" y="28" fill="#F4F0E2" font-family="sans-serif" font-size="13" font-weight="bold">Data Structures &amp; Algorithms</text>
    <text x="280" y="28" fill="#5B91A3" font-family="sans-serif" font-size="13" font-weight="bold">A+</text>
  </g>

  <g transform="translate(365, 230)">
    <rect width="320" height="45" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <text x="15" y="28" fill="#F4F0E2" font-family="sans-serif" font-size="13" font-weight="bold">Database Management Systems (SQL)</text>
    <text x="280" y="28" fill="#5B91A3" font-family="sans-serif" font-size="13" font-weight="bold">A</text>
  </g>

  <g transform="translate(365, 290)">
    <rect width="320" height="45" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <text x="15" y="28" fill="#F4F0E2" font-family="sans-serif" font-size="13" font-weight="bold">Software Engineering Fundamentals</text>
    <text x="280" y="28" fill="#5B91A3" font-family="sans-serif" font-size="13" font-weight="bold">A+</text>
  </g>

  <g transform="translate(365, 350)">
    <rect width="320" height="45" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <text x="15" y="28" fill="#F4F0E2" font-family="sans-serif" font-size="13" font-weight="bold">Object Oriented Programming (C#)</text>
    <text x="280" y="28" fill="#5B91A3" font-family="sans-serif" font-size="13" font-weight="bold">A+</text>
  </g>
</svg>`;

// 3. Task Management SVG
const taskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2F4A63" />
      <stop offset="100%" stop-color="#131B2B" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg3)"/>
  <rect x="60" y="50" width="680" height="400" rx="16" fill="#1B293B" stroke="#5B91A3" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="90" cy="75" r="6" fill="#FF5F56"/>
  <circle cx="110" cy="75" r="6" fill="#FFBD2E"/>
  <circle cx="130" cy="75" r="6" fill="#27C93F"/>
  <text x="400" y="80" fill="#B8C6D3" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" text-anchor="middle" font-weight="600">Task Management &amp; Kanban Productivity Hub</text>

  <!-- Column 1: To Do -->
  <rect x="90" y="110" width="185" height="310" rx="10" fill="#131B2B" stroke="#5B91A3" stroke-opacity="0.2"/>
  <text x="105" y="135" fill="#5B91A3" font-family="sans-serif" font-size="13" font-weight="bold">TO DO (3)</text>
  <rect x="105" y="150" width="155" height="70" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="115" y="175" fill="#F4F0E2" font-family="sans-serif" font-size="12" font-weight="bold">Design ERD Schema</text>
  <rect x="115" y="190" width="55" height="18" rx="4" fill="#FF5F56" fill-opacity="0.2"/>
  <text x="142" y="203" fill="#FF5F56" font-family="sans-serif" font-size="10" text-anchor="middle">High</text>

  <rect x="105" y="230" width="155" height="70" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="115" y="255" fill="#F4F0E2" font-family="sans-serif" font-size="12" font-weight="bold">Unit Test Endpoints</text>
  <rect x="115" y="270" width="65" height="18" rx="4" fill="#FFBD2E" fill-opacity="0.2"/>
  <text x="147" y="283" fill="#FFBD2E" font-family="sans-serif" font-size="10" text-anchor="middle">Medium</text>

  <!-- Column 2: In Progress -->
  <rect x="305" y="110" width="185" height="310" rx="10" fill="#131B2B" stroke="#5B91A3" stroke-opacity="0.2"/>
  <text x="320" y="135" fill="#FFBD2E" font-family="sans-serif" font-size="13" font-weight="bold">IN PROGRESS (2)</text>
  <rect x="320" y="150" width="155" height="70" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="330" y="175" fill="#F4F0E2" font-family="sans-serif" font-size="12" font-weight="bold">Implement JWT Auth</text>
  <rect x="330" y="190" width="55" height="18" rx="4" fill="#5B91A3" fill-opacity="0.25"/>
  <text x="357" y="203" fill="#5B91A3" font-family="sans-serif" font-size="10" text-anchor="middle">Backend</text>

  <!-- Column 3: Completed -->
  <rect x="520" y="110" width="185" height="310" rx="10" fill="#131B2B" stroke="#5B91A3" stroke-opacity="0.2"/>
  <text x="535" y="135" fill="#27C93F" font-family="sans-serif" font-size="13" font-weight="bold">COMPLETED (5)</text>
  <rect x="535" y="150" width="155" height="70" rx="8" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.3"/>
  <text x="545" y="175" fill="#F4F0E2" font-family="sans-serif" font-size="12" font-weight="bold">Angular Routing Setup</text>
  <rect x="545" y="190" width="60" height="18" rx="4" fill="#27C93F" fill-opacity="0.2"/>
  <text x="575" y="203" fill="#27C93F" font-family="sans-serif" font-size="10" text-anchor="middle">Verified</text>
</svg>`;

// 4. RESTful API Architecture SVG
const apiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg4)"/>
  <rect x="60" y="50" width="680" height="400" rx="16" fill="#131B2B" stroke="#5B91A3" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="90" cy="75" r="6" fill="#FF5F56"/>
  <circle cx="110" cy="75" r="6" fill="#FFBD2E"/>
  <circle cx="130" cy="75" r="6" fill="#27C93F"/>
  <text x="400" y="80" fill="#B8C6D3" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" text-anchor="middle" font-weight="600">RESTful API Architecture &bull; Clean Architecture &amp; Swagger</text>

  <!-- Endpoint 1: GET -->
  <g transform="translate(90, 115)">
    <rect width="620" height="60" rx="10" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <rect x="15" y="15" width="65" height="30" rx="6" fill="#27C93F" fill-opacity="0.2"/>
    <text x="47" y="35" fill="#27C93F" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">GET</text>
    <text x="95" y="36" fill="#F4F0E2" font-family="monospace" font-size="15">/api/v1/students/{id}/transcripts</text>
    <rect x="525" y="18" width="80" height="24" rx="4" fill="#2F4A63" fill-opacity="0.4"/>
    <text x="565" y="34" fill="#5B91A3" font-family="monospace" font-size="12" text-anchor="middle">200 OK</text>
  </g>

  <!-- Endpoint 2: POST -->
  <g transform="translate(90, 190)">
    <rect width="620" height="60" rx="10" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <rect x="15" y="15" width="65" height="30" rx="6" fill="#5B91A3" fill-opacity="0.25"/>
    <text x="47" y="35" fill="#5B91A3" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">POST</text>
    <text x="95" y="36" fill="#F4F0E2" font-family="monospace" font-size="15">/api/v1/auth/login</text>
    <rect x="525" y="18" width="80" height="24" rx="4" fill="#2F4A63" fill-opacity="0.4"/>
    <text x="565" y="34" fill="#5B91A3" font-family="monospace" font-size="12" text-anchor="middle">JWT Bearer</text>
  </g>

  <!-- Endpoint 3: PUT -->
  <g transform="translate(90, 265)">
    <rect width="620" height="60" rx="10" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <rect x="15" y="15" width="65" height="30" rx="6" fill="#FFBD2E" fill-opacity="0.2"/>
    <text x="47" y="35" fill="#FFBD2E" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">PUT</text>
    <text x="95" y="36" fill="#F4F0E2" font-family="monospace" font-size="15">/api/v1/orders/{orderId}/status</text>
    <rect x="525" y="18" width="80" height="24" rx="4" fill="#2F4A63" fill-opacity="0.4"/>
    <text x="565" y="34" fill="#5B91A3" font-family="monospace" font-size="12" text-anchor="middle">204 No Cont</text>
  </g>

  <!-- Endpoint 4: DELETE -->
  <g transform="translate(90, 340)">
    <rect width="620" height="60" rx="10" fill="#1B293B" stroke="#5B91A3" stroke-opacity="0.25"/>
    <rect x="15" y="15" width="65" height="30" rx="6" fill="#FF5F56" fill-opacity="0.2"/>
    <text x="47" y="35" fill="#FF5F56" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">DEL</text>
    <text x="95" y="36" fill="#F4F0E2" font-family="monospace" font-size="15">/api/v1/tasks/{taskId}</text>
    <rect x="525" y="18" width="80" height="24" rx="4" fill="#2F4A63" fill-opacity="0.4"/>
    <text x="565" y="34" fill="#5B91A3" font-family="monospace" font-size="12" text-anchor="middle">200 OK</text>
  </g>
</svg>`;

// Testimonials Avatars
const makeAvatar = (initials, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="${bg}" stroke="#5B91A3" stroke-width="3"/>
  <text x="50" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="30" fill="#F4F0E2" text-anchor="middle">${initials}</text>
</svg>`;

writeBoth('ecommerce.svg', ecommerceSvg);
writeBoth('student.svg', studentSvg);
writeBoth('tasks.svg', taskSvg);
writeBoth('api.svg', apiSvg);

writeBoth('avatar1.svg', makeAvatar('AP', '#2F4A63'), true);
writeBoth('avatar2.svg', makeAvatar('CM', '#1B293B'), true);
writeBoth('avatar3.svg', makeAvatar('SL', '#203449'), true);

console.log('Project and testimonial assets successfully written.');

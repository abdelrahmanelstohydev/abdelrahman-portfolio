const http = require('http');

const endpoints = [
  '/',
  '/assets/files/cv.pdf',
  '/assets/images/profile.png',
  '/assets/images/projects/ecommerce.svg',
  '/assets/images/projects/student.svg',
  '/assets/images/projects/tasks.svg',
  '/assets/images/projects/api.svg',
  '/assets/images/testimonials/avatar1.svg',
  '/assets/images/testimonials/avatar2.svg',
  '/assets/images/testimonials/avatar3.svg',
];

const checkEndpoint = (path) => {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:4200${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
};

(async () => {
  console.log('Testing Portfolio Web Server Endpoints:');
  for (const ep of endpoints) {
    const res = await checkEndpoint(ep);
    console.log(`${res.status === 200 ? '✅' : '❌'} ${ep} -> Status: ${res.status}, Type: ${res.contentType}, Bytes: ${res.length || 0}`);
  }
})();

const path = require('path');
const https = require('https');
const fs = require('fs');
const outPath = path.join(__dirname, 'src', 'pdf', 'amiriFont.ts');
const url = 'https://github.com/google/fonts/raw/main/ofl/amiri/Amiri-Regular.ttf';
function fetch(u) {
  return new Promise((resolve, reject) => {
    https.get(u, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}
fetch(url).then(buf => {
  console.log('Downloaded', buf.length, 'bytes');
  if (buf.length < 10000) { console.log('Too small, likely error:', buf.toString().slice(0,200)); process.exit(1); }
  const b64 = buf.toString('base64');
  const content = 'export const amiriBase64 = `' + b64 + '`;\n';
  fs.writeFileSync(outPath, content);
  console.log('Wrote amiriFont.ts (' + Math.round(b64.length/1024) + 'KB)');
}).catch(e => { console.error(e); process.exit(1); });

const fs = require('fs');
const path = 'c:\\Users\\reddy\\Desktop\\Project\\Project\\Fpj\\Project\\src\\locales\\te.json';
try {
  const s = fs.readFileSync(path, 'utf8');
  JSON.parse(s);
  console.log('OK');
} catch (e) {
  console.error('ERR', e.message);
  process.exit(1);
}

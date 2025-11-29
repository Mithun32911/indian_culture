const fs = require('fs');
const path = 'c:\\Users\\reddy\\Desktop\\Project\\Project\\Fpj\\Project\\src\\locales\\te.json';
const s = fs.readFileSync(path, 'utf8');
const key = '"adminDashboard"';
const idx = s.indexOf(key);
const start = Math.max(0, idx-40);
const end = Math.min(s.length, idx+40);
console.log('region start', start, 'end', end);
for(let i=start;i<end;i++){
  const ch = s[i];
  const code = ch.charCodeAt(0);
  process.stdout.write(i + ':' + code + '[' + (ch==='\n'?'\\n':ch) + '] ');
}
console.log();
console.log('string slice visible:\n', s.slice(start,end).replace(/\n/g,'\\n'));

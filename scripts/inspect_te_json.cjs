const fs = require('fs');
const path = 'c:\\Users\\reddy\\Desktop\\Project\\Project\\Fpj\\Project\\src\\locales\\te.json';
const s = fs.readFileSync(path, 'utf8');
const key = '"adminDashboard"';
const idx = s.indexOf(key);
console.log('file length:', s.length);
if(idx === -1) {
	console.log('adminDashboard not found');
	process.exit(0);
}
console.log('adminDashboard index:', idx);
// show 120 chars before and after
const before = s.slice(Math.max(0, idx-120), idx);
const after = s.slice(idx, Math.min(s.length, idx+120));
console.log('\n--- before (visible newlines) ---\n', before.replace(/\n/g,'\\n'));
console.log('\n--- after (visible newlines) ---\n', after.replace(/\n/g,'\\n'));
// show last 6 lines before the key and first 6 lines after
const lines = s.split('\n');
let lineNum = s.slice(0, idx).split('\n').length;
console.log('\nline number at key start:', lineNum);
console.log('\n6 lines before:');
for(let i=lineNum-6;i<=lineNum-1;i++) if(i>=0 && i<lines.length) console.log((i+1).toString().padStart(4,' '), '|', lines[i]);
console.log('\n6 lines after:');
for(let i=lineNum;i<lineNum+6;i++) if(i>=0 && i<lines.length) console.log((i+1).toString().padStart(4,' '), '|', lines[i]);

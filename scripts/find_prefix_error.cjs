const fs = require('fs');
const path = 'c:\\Users\\reddy\\Desktop\\Project\\Project\\Fpj\\Project\\src\\locales\\te.json';
const s = fs.readFileSync(path, 'utf8');
let low = 0, high = s.length, best = 0;
while(low <= high){
  const mid = Math.floor((low + high) / 2);
  try{
    JSON.parse(s.slice(0, mid));
    best = mid;
    low = mid + 1;
  }catch(e){
    high = mid - 1;
  }
}
console.log('best prefix parse length:', best);
console.log('char at best:', s[best-1], 'code', s.charCodeAt(best-1));
console.log('next chars:', s.slice(best-5, best+20).replace(/\n/g,'\\n'));
// show line number at best
const lines = s.slice(0,best).split('\n');
console.log('line at best:', lines.length);
console.log('last 6 lines before best:\n', lines.slice(-6).join('\n'));

const fs = require('fs');
const path = 'c:\\Users\\reddy\\Desktop\\Project\\Project\\Fpj\\Project\\src\\locales\\te.json';
const s = fs.readFileSync(path, 'utf8');
let depth = 0;
let inString = false;
let escapeNext = false;
let line = 1;
const lines = s.split('\n');
let charIndex = 0;
for(let li=0; li<lines.length; li++){
  const ln = lines[li] + '\n';
  for(let i=0;i<ln.length;i++){
    const ch = ln[i];
    if(inString){
      if(escapeNext){ escapeNext=false; }
      else if(ch === '\\') escapeNext=true;
      else if(ch === '"') inString=false;
    } else {
      if(ch === '"') inString = true;
      else if(ch === '{') depth++;
      else if(ch === '}') depth--;
    }
    charIndex++;
  }
  if(depth<=1 || li>190 && li<210) console.log('line', (li+1).toString().padStart(3,' '), 'depth', depth, '|', lines[li]);
}
console.log('final depth', depth);

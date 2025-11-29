const fs = require('fs');
const path = 'c:\\Users\\reddy\\Desktop\\Project\\Project\\Fpj\\Project\\src\\locales\\te.json';
const s = fs.readFileSync(path, 'utf8');
let depth = 0;
let inString = false;
let escapeNext = false;
let rootClosePos = -1;
for(let i=0;i<s.length;i++){
  const ch = s[i];
  if(inString){
    if(escapeNext){ escapeNext=false; continue; }
    if(ch === '\\') { escapeNext=true; continue; }
    if(ch === '"') { inString = false; continue; }
    continue;
  } else {
    if(ch === '"'){ inString = true; continue; }
    if(ch === '{'){ depth++; continue; }
    if(ch === '}'){ depth--; if(depth===0){ rootClosePos = i; break; } continue; }
  }
}
console.log('rootClosePos index:', rootClosePos);
if(rootClosePos!==-1){
  console.log('char after rootClosePos codes:');
  for(let j=rootClosePos+1;j<Math.min(s.length, rootClosePos+30); j++){
    const c=s[j];
    console.log(j, c==='\n'?'\\n':c, c.charCodeAt(0));
  }
  const rest = s.slice(rootClosePos+1).trim();
  console.log('rest starts with:', rest.slice(0,50).replace(/\n/g,'\\n'));
}

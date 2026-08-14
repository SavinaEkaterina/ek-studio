const fs = require('fs');
const files = fs.readdirSync('dist/assets');
const jsFile = files.find(f => f.endsWith('.js'));
if (jsFile) {
  const code = fs.readFileSync('dist/assets/' + jsFile, 'utf8');
  console.log('Matches for logo in bundle:');
  const matches = code.match(/.{0,50}logo.{0,50}/g);
  console.log(matches);
}

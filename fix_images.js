const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public', 'Сіткомети протидронові');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg')).sort();
console.log(files.map(f => `"/Сіткомети протидронові/${f}"`));

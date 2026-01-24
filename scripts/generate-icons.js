const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '../public/site-logo.png');
const OUT = path.join(__dirname, '../public');

if (!fs.existsSync(SRC)) {
  console.error('❌ public/site-logo.png not found');
  process.exit(1);
}

async function run() {
  await sharp(SRC).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
  await sharp(SRC).resize(32, 32).png().toFile(path.join(OUT, 'favicon-32.png'));
  await sharp(SRC).resize(16, 16).png().toFile(path.join(OUT, 'favicon-16.png'));

  console.log('✅ Icons generated successfully');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

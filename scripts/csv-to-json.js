import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const SRC_DIR = path.resolve(process.cwd(), 'web_content');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'content');

async function ensureOut() {
  await fs.promises.mkdir(OUT_DIR, { recursive: true });
}

async function convertAll() {
  await ensureOut();
  const files = await fs.promises.readdir(SRC_DIR);
  for (const file of files) {
    if (!file.toLowerCase().endsWith('.csv')) continue;
    const name = file.replace(/\.csv$/i, '').replace(/_export$/i, '');
    const srcPath = path.join(SRC_DIR, file);
    const outPath = path.join(OUT_DIR, `${name}.json`);
    try {
      const rows = await csv({ trim: true }).fromFile(srcPath);
      await fs.promises.writeFile(outPath, JSON.stringify(rows, null, 2));
      console.log(`Converted ${file} -> public/content/${name}.json`);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }
}

convertAll().catch((err) => {
  console.error(err);
  process.exit(1);
});

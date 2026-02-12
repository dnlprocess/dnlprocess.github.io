import fs from 'fs';
import path from 'path';

const PHOTOS_DIR = path.resolve(process.cwd(), 'public', 'photos');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'content');
const PROJECTS_OUT = path.join(OUT_DIR, 'Project.json');
const PHOTOS_OUT = path.join(OUT_DIR, 'Photo.json');

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');
}

async function ensureOut() {
  await fs.promises.mkdir(OUT_DIR, { recursive: true });
}

async function readJsonSafe(file) {
  try {
    const txt = await fs.promises.readFile(file, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    return [];
  }
}

async function writeJson(file, data) {
  await fs.promises.writeFile(file, JSON.stringify(data, null, 2));
}

async function generate() {
  await ensureOut();

  const existingProjects = await readJsonSafe(PROJECTS_OUT);
  const existingPhotos = await readJsonSafe(PHOTOS_OUT);

  const projects = [];
  const photos = [];

  let folders = [];
  try {
    folders = await fs.promises.readdir(PHOTOS_DIR, { withFileTypes: true });
  } catch (e) {
    console.warn('No photos directory found at', PHOTOS_DIR);
    // Still write out whatever existing files were present
    await writeJson(PROJECTS_OUT, existingProjects);
    await writeJson(PHOTOS_OUT, existingPhotos);
    return;
  }

  for (const dirent of folders) {
    if (!dirent.isDirectory()) continue;
    const folderName = dirent.name;
    const folderPath = path.join(PHOTOS_DIR, folderName);
    let fileNames = await fs.promises.readdir(folderPath).catch(() => []);
    // filter image files
    fileNames = fileNames.filter((f) => /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(f));
    if (fileNames.length === 0) continue;

    const title = folderName;
    const slug = slugify(title);
    const cover = `./photos/${encodeURIComponent(folderName)}/${encodeURIComponent(fileNames[0])}`;

    const existing = existingProjects.find((p) => p.slug === slug || p.title === title) || {};

    const project = {
      title: existing.title ?? title,
      slug: existing.slug ?? slug,
      cover_image: existing.cover_image ?? cover,
      description: existing.description ?? '',
      year: existing.year ?? '',
      order: existing.order ?? 0,
    };

    projects.push(project);

    // photos
    fileNames.sort();
    for (let i = 0; i < fileNames.length; i++) {
      const f = fileNames[i];
      const image_url = `./photos/${encodeURIComponent(folderName)}/${encodeURIComponent(f)}`;
      const existingPhoto = existingPhotos.find((ph) => ph.image_url === image_url) || {};
      const photo = {
        title: existingPhoto.title ?? f.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        image_url,
        project: existingPhoto.project ?? project.title,
        location: existingPhoto.location ?? '',
        year: existingPhoto.year ?? project.year ?? '',
        description: existingPhoto.description ?? '',
        order: existingPhoto.order ?? i + 1,
      };
      photos.push(photo);
    }
  }

  await writeJson(PROJECTS_OUT, projects);
  await writeJson(PHOTOS_OUT, photos);

  console.log('Generated', PROJECTS_OUT, 'and', PHOTOS_OUT);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});

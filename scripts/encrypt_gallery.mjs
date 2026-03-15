import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "gallery_source");
const OUT_DIR = path.join(ROOT, "public", "gallery");
const INPUT_MANIFEST = path.join(SRC_DIR, "manifest.json");

const PASSWORD = process.env.GALLERY_PASSWORD;
if (!PASSWORD) {
  console.error("GALLERY_PASSWORD není nastaven. Spusť: GALLERY_PASSWORD='...' npm run gallery:encrypt");
  process.exit(1);
}

const getMime = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".webm") return "video/webm";
  return "application/octet-stream";
};

const main = async () => {
  const raw = await fs.readFile(INPUT_MANIFEST, "utf8");
  const input = JSON.parse(raw);
  const items = Array.isArray(input.items) ? input.items : [];

  const iterations = 250000;
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(PASSWORD, salt, iterations, 32, "sha256");

  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  const outputItems = [];

  for (const item of items) {
    if (!item.file) {
      throw new Error(`Položka ${item.id} nemá 'file'.`);
    }
    const inputPath = path.join(SRC_DIR, item.file);
    const data = await fs.readFile(inputPath);
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const tag = cipher.getAuthTag();
    const payload = Buffer.concat([encrypted, tag]);

    const outName = `${item.id}.bin`;
    const outPath = path.join(OUT_DIR, outName);
    await fs.writeFile(outPath, payload);

    outputItems.push({
      id: item.id,
      title: item.title,
      type: item.type,
      size: item.size,
      src: outName,
      iv: iv.toString("base64"),
      mime: getMime(item.file)
    });
  }

  const outputManifest = {
    version: 1,
    salt: salt.toString("base64"),
    kdf: {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations
    },
    items: outputItems
  };

  await fs.writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(outputManifest, null, 2));

  console.log(`Hotovo. Zašifrováno ${outputItems.length} položek.`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

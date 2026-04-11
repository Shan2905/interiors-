import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../data/db.json");

export const readDB = () => {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
};

export const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
};

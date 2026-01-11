import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Correcting Google GenAI version...");

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Fix: Use "*" to let npm find the latest valid version automatically
// This avoids the "No matching version" error
packageJson.dependencies['@google/genai'] = "*";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("✅ Updated '@google/genai' version to '*' (latest).");
console.log("👉 Now run: npm install && npm run build");
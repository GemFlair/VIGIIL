import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Fixing missing Google GenAI dependency...");

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the missing Google GenAI library
// This fixes the "Rollup failed to resolve import @google/genai" error
packageJson.dependencies['@google/genai'] = "^0.1.0";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("✅ Added '@google/genai' to package.json.");
console.log("👉 You can now run the install command.");
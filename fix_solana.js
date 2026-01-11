import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Fixing missing Solana dependencies...");

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the missing Solana library
packageJson.dependencies['@solana/web3.js'] = "^1.91.0";

// Add framer-motion as it is often required alongside these components
packageJson.dependencies['framer-motion'] = "^11.0.0";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("✅ Added '@solana/web3.js' to package.json.");
console.log("👉 You can now run the install command.");
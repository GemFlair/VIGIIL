import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Starting automatic fixes...");

// --- 1. Fix server.js ---
// We use a simple string to avoid syntax errors during copy-paste
const serverCode = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT) || 8080;
const host = '0.0.0.0';

const distPath = path.join(__dirname, 'dist');

console.log('Serving static files from: ' + distPath);

if (!fs.existsSync(distPath)) {
  console.error('ERROR: "dist" folder not found. Ensure "npm run build" runs before starting.');
}

app.use(express.static(distPath, { maxAge: '1y', etag: false }));

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Error: Application not built. Run npm run build.');
  }
});

app.listen(port, host, () => {
  console.log('Server listening on http://' + host + ':' + port);
});
`;

fs.writeFileSync(path.join(__dirname, 'server.js'), serverCode);
console.log('✅ server.js fixed.');

// --- 2. Fix package.json ---
const packageJson = {
  "name": "vigil",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "start": "node server.js",
    "postinstall": "npm run build"
  },
  "dependencies": {
    "express": "^4.19.2",
    "@google-cloud/vertexai": "^1.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
};

fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(packageJson, null, 2));
console.log('✅ package.json fixed.');

// --- 3. Fix React Component Syntax Errors ---
// This finds the files mentioned in your errors and escapes the ">" characters.

const filesToFix = [
  {
    name: 'FieldUnitHub.tsx',
    replacements: [
      { find: '>> BUFFER_CAPTURED_IDENT', replace: "{'>'}{'>'} BUFFER_CAPTURED_IDENT" }
    ]
  },
  {
    name: 'FlagshipHeaderArchitect.tsx',
    replacements: [
      { find: '>_', replace: "{'>'}_" }
    ]
  },
  {
    name: 'MeshQueryTerminal.tsx',
    replacements: [
      { find: '>> QUERY_MODE', replace: "{'>'}{'>'} QUERY_MODE" }
    ]
  },
  {
    name: 'Pricing.tsx',
    replacements: [
      { find: '>></span>', replace: "{'>'}{'>'}</span>" }
    ]
  }
];

// Look for files in 'src/components' or just 'components'
const dirsToCheck = ['src/components', 'components'];

filesToFix.forEach(file => {
    let fullPath = '';
    let found = false;

    for (const dir of dirsToCheck) {
        const testPath = path.join(__dirname, dir, file.name);
        if (fs.existsSync(testPath)) {
            fullPath = testPath;
            found = true;
            break;
        }
    }

    if (found) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        file.replacements.forEach(rep => {
            if (content.includes(rep.find)) {
                content = content.split(rep.find).join(rep.replace);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(fullPath, content);
            console.log(`✅ Fixed syntax in: ${file.name}`);
        } else {
            console.log(`ℹ️  No issues found in: ${file.name}`);
        }
    } else {
        console.warn(`⚠️  Could not find file: ${file.name} (Check folder structure)`);
    }
});

console.log("\n🎉 AUTOMATIC FIXES COMPLETE!");
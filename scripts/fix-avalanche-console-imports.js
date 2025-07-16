#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to calculate relative path from source to target
function getRelativePath(from, to) {
  // Get the directory of the 'from' file
  const fromDir = path.dirname(from);
  // Calculate relative path
  let relativePath = path.relative(fromDir, to);
  
  // Ensure it starts with './' or '../'
  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  
  // Remove .tsx or .ts extension
  relativePath = relativePath.replace(/\.(tsx?|jsx?)$/, '');
  
  return relativePath;
}

// Map of @/ imports to their actual locations
const importMap = {
  '@/components/ui/': 'components/ui/',
  '@/hooks/': 'hooks/',
  '@/lib/': 'lib/',
  '@/constants/': 'constants/',
  '@/components/': 'components/',
};

// Find all TypeScript/React files in avalanche-console components
const files = glob.sync('components/avalanche-console/**/*.{ts,tsx}', {
  cwd: process.cwd()
});

console.log(`Found ${files.length} files to process`);

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Replace each @/ import
  Object.entries(importMap).forEach(([alias, actualPath]) => {
    const regex = new RegExp(`from ["']${alias.replace('/', '\\/')}([^"']+)["']`, 'g');
    
    content = content.replace(regex, (match, importPath) => {
      const targetPath = path.join(process.cwd(), actualPath, importPath);
      const relativePath = getRelativePath(filePath, targetPath);
      modified = true;
      console.log(`  ${file}: ${alias}${importPath} → ${relativePath}`);
      return `from "${relativePath}"`;
    });
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Updated ${file}`);
  }
});

console.log('Import fixing complete!'); 
const fs = require('fs');
const path = require('path');

// Read package.json files
const mainPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));
const consolePackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

// Get dependencies
const mainDeps = { ...mainPackageJson.dependencies, ...mainPackageJson.devDependencies };
const consoleDeps = { ...consolePackageJson.dependencies, ...consolePackageJson.devDependencies };

// Find duplicates
const duplicates = {};
const uniqueToConsole = {};

Object.entries(consoleDeps).forEach(([dep, version]) => {
  if (mainDeps[dep]) {
    duplicates[dep] = {
      main: mainDeps[dep],
      console: version
    };
  } else {
    uniqueToConsole[dep] = version;
  }
});

console.log('=== DUPLICATE DEPENDENCIES ===');
console.log(`Found ${Object.keys(duplicates).length} duplicate dependencies:\n`);
Object.entries(duplicates).forEach(([dep, versions]) => {
  if (versions.main !== versions.console) {
    console.log(`❌ ${dep}: main(${versions.main}) vs console(${versions.console})`);
  } else {
    console.log(`✅ ${dep}: ${versions.main} (same version)`);
  }
});

console.log('\n=== UNIQUE TO AVALANCHE-CONSOLE ===');
console.log(`Found ${Object.keys(uniqueToConsole).length} unique dependencies:\n`);
Object.entries(uniqueToConsole).forEach(([dep, version]) => {
  console.log(`📦 ${dep}: ${version}`);
});

// Generate cleaned package.json
const cleanedPackageJson = {
  ...consolePackageJson,
  dependencies: {},
  devDependencies: {}
};

// Only keep unique dependencies
Object.entries(consolePackageJson.dependencies || {}).forEach(([dep, version]) => {
  if (!mainDeps[dep]) {
    cleanedPackageJson.dependencies[dep] = version;
  }
});

Object.entries(consolePackageJson.devDependencies || {}).forEach(([dep, version]) => {
  if (!mainDeps[dep]) {
    cleanedPackageJson.devDependencies[dep] = version;
  }
});

// Write cleaned package.json
fs.writeFileSync(
  path.join(__dirname, '../package.cleaned.json'),
  JSON.stringify(cleanedPackageJson, null, 2)
);

console.log('\n✨ Created package.cleaned.json with only unique dependencies'); 
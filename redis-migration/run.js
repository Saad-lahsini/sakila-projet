const { exec } = require('child_process');

const scripts = [
  'migrate-countries.js',
  'migrate-cities.js',
];

function runAll(index = 0) {
  if (index >= scripts.length) {
    console.log('🎯 All Redis migrations completed!');
    return;
  }

  const file = scripts[index];
  exec(`node ${file}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Error in ${file}:\n${stderr}`);
    } else {
      console.log(stdout);
    }
    runAll(index + 1);
  });
}

runAll();

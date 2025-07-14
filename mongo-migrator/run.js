const { exec } = require('child_process');

const scripts = [
  'migrate-languages.js',
  'migrate-categories.js',
  'migrate-actors.js',
  'migrate-films.js'
];

function runSequentially(index = 0) {
  if (index >= scripts.length) return console.log('🎉 All MongoDB migrations done!');
  
  const script = scripts[index];
  exec(`node ${script}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Error in ${script}:`, stderr);
    } else {
      console.log(stdout);
    }
    runSequentially(index + 1);
  });
}

runSequentially();

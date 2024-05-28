#!/usr/bin/node
const fs = require('fs');

const args = process.argv;
// as args[0] will contain the path to the Node.js executable,
// and args[1] will contain the path to the script itself.

if (args.length !== 4) {
  process.exit(1);
}

fs.writeFile(args[2], args[3], 'utf8', (err) => {
  if (err) {
    console.error(err);
  }
});

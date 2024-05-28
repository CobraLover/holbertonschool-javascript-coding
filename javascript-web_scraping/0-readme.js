#!/usr/bin/node
const fs = require('fs');

const args = process.argv;
// as args[0] will contain the path to the Node.js executable,
// and args[1] will contain the path to the script itself.

if (args.length !== 3) {
  process.exit(1);
}

fs.readFile(args[2], 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

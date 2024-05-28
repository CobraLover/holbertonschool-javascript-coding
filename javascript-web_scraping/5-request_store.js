#!/usr/bin/node
const request = require('request');
const fs = require('fs');

const args = process.argv;
if (args.length !== 4) {
  process.exit(1);
}
const url = args[2];
const file = args[3];
request(url, function (error, response, body) {
  if (error) {
    console.log('error: ', error);
  }
  fs.writeFile(file, body, 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
});

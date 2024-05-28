#!/usr/bin/node
const request = require('request');

const args = process.argv;

if (args.length !== 3) {
  process.exit(1);
}
request(args[2], function (error, response, body) {
  if (error) {
    console.log('code:', response.statusCode);
  }
  console.log('code:', response.statusCode);
});

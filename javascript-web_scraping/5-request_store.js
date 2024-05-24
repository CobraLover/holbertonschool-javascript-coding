#!/usr/bin/node

const request = require('request');
const fs = require('fs');

function getContentAndStore (url, filePath) {
  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      if (response.statusCode === 200) {
        fs.writeFile(filePath, body, 'utf-8', (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Content successfully saved to ${filePath}`);
          }
        });
      } else {
        console.error(`Failed to retrieve data. Status code: ${response.statusCode}`);
      }
    }
  });
}

if (process.argv.length !== 4) {
  console.log('Usage: node script.js <url> <file_path>');
} else {
  const url = process.argv[2];
  const filePath = process.argv[3];
  getContentAndStore(url, filePath);
}

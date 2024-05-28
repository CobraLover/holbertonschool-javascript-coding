#!/usr/bin/node
const request = require('request');

const args = process.argv;
if (args.length !== 3) {
  process.exit(1);
}
const filmNumber = args[2];
const url = `https://swapi-api.hbtn.io/api/films/${filmNumber}`;
request(url, function (error, response, body) {
  if (error) {
    console.log('error: ', error);
  }
  const film = JSON.parse(body);
  console.log(film.title);
});

#!/usr/bin/node
const request = require('request');

const args = process.argv;
let url;
if (args.length !== 3) {
  url = 'https://swapi-api.hbtn.io/api/films/';
} else {
  url = args[2];
}
request(url, function (error, response, body) {
  if (error) {
    console.log('error: ', error);
  }
  const films = JSON.parse(body);
  const results = films.results;
  const filteredFilms = results.filter((film) => film.characters.some(character => character.includes(18)));
  console.log(filteredFilms.length);
});

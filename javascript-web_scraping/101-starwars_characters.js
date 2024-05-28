#!/usr/bin/node

const request = require('request');

function printCharacters (movieId) {
  const apiUrl = `https://swapi.dev/api/films/${movieId}/`;
  request.get(apiUrl, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      if (response.statusCode === 200) {
        const movieData = JSON.parse(body);
        const charactersUrls = movieData.characters;
        const charactersNames = [];
        let charactersCount = 0;

        charactersUrls.forEach(characterUrl => {
          request.get(characterUrl, (error, response, body) => {
            if (error) {
              console.error(error);
            } else {
              if (response.statusCode === 200) {
                const characterData = JSON.parse(body);
                charactersNames[charactersUrls.indexOf(characterUrl)] = characterData.name;
                charactersCount++;
                if (charactersCount === charactersUrls.length) {
                  charactersNames.forEach(name => {
                    console.log(name);
                  });
                }
              } else {
                console.error(`Failed to retrieve character data. Status code: ${response.statusCode}`);
              }
            }
          });
        });
      } else {
        console.error(`Failed to retrieve movie data. Status code: ${response.statusCode}`);
      }
    }
  });
}

if (process.argv.length !== 3) {
  console.log('Usage: node script.js <movie_id>');
} else {
  const movieId = process.argv[2];
  printCharacters(movieId);
}

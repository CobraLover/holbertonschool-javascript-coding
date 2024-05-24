const request = require('request');

function getMovieTitle(movieId) {
    const url = `https://swapi.dev/api/films/${movieId}/`;
    request.get(url, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                const movieData = JSON.parse(body);
                console.log(`Title: ${movieData.title}`);
            } else {
                console.error(`Failed to retrieve data. Status code: ${response.statusCode}`);
            }
        }
    });
}

if (process.argv.length !== 3) {
    console.log('Usage: node script.js <movie_id>');
} else {
    const movieId = process.argv[2];
    getMovieTitle(movieId);
}

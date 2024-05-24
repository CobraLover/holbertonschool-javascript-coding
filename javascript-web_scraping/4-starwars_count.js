const request = require('request');

function countMoviesWithCharacter(apiUrl, characterId) {
    request.get(apiUrl, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                const data = JSON.parse(body);
                let count = 0;
                data.results.forEach(movie => {
		    movie.characters.forEach(character => {
			if (character.includes(`/people/${characterId}/`)) {
			    count++;
                	}
                    });
            	});
                console.log(`Number of movies where "Wedge Antilles" is present: ${count}`);
            } else {
                console.error(`Failed to retrieve data. Status code: ${response.statusCode}`);
            }
        }
    });
}

if (process.argv.length !== 3) {
    console.log('Usage: node script.js <api_url>');
} else {
    const apiUrl = process.argv[2];
    const characterId = 18;
    countMoviesWithCharacter(apiUrl, characterId);
}

const request = require('request');

function displayStatusCode(url) {
    request.get(url, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`code: ${response.statusCode}`);
        }
    });
}

if (process.argv.length !== 3) {
    console.log('Usage: node script.js <url>');
} else {
    const url = process.argv[2];
    displayStatusCode(url);
}

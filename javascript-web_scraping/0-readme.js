const fs = require('fs');

function readFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    });
}

if (process.argv.length !== 3) {
    console.log('Usage: node script.js <file_path>');
} else {
    const filePath = process.argv[2];
    readFile(filePath);
}

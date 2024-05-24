const request = require('request');

function countCompletedTasks(apiUrl) {
    request.get(apiUrl, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                const todos = JSON.parse(body);
                const completedTasks = {};

                todos.forEach(todo => {
                    if (todo.completed) {
                        if (completedTasks[todo.userId]) {
                            completedTasks[todo.userId]++;
                        } else {
                            completedTasks[todo.userId] = 1;
                        }
                    }
                });

                console.log(JSON.stringify(completedTasks, null, 2));
            } else {
                console.error(`Failed to retrieve data. Status code: ${response.statusCode}`);
            }
        }
    });
}

function formatOutput(completedTasks) {
    let output = '{';
    Object.keys(completedTasks).forEach(key => {
        output += ` '${key}': ${completedTasks[key]},`;
    });
    output = output.slice(0, -1); // remove trailing comma
    output += ' }';
    return output;
}

if (process.argv.length !== 3) {
    console.log('Usage: node script.js <api_url>');
} else {
    const apiUrl = process.argv[2];
    countCompletedTasks(apiUrl);
}

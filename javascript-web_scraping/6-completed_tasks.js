#!/usr/bin/node
const request = require('request');

const args = process.argv;
let url;
if (args.length !== 3) {
  url = 'https://jsonplaceholder.typicode.com/todos';
} else {
  url = args[2];
}
request(url, function (error, response, body) {
  if (error) {
    console.log('error: ', error);
  }
  const tasks = JSON.parse(body);
  const obj = {};
  if (tasks.length) {
    for (const i of tasks) {
      if (i.completed) {
        if (!(i.userId in obj)) {
          obj[i.userId] = 0;
        }
        obj[i.userId] += 1;
      }
    }
  }
  console.log(obj);
});

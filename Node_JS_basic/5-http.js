const http = require('http');
const fs = require('fs');

function messageGenerator(array, field = '') {
  if (!Array.isArray(array)) {
    throw new Error('array is empty.');
  }
  const message = 'Number of students:';
  if (!field) {
    return `${message} ${array.length}`;
  }
  const messageWithField = `Number of students in ${field}:`;
  const firstnameList = [];
  for (const line of array) {
    const student = line.split(',');
    if (student[3] === field) {
      firstnameList.push(student[0]);
    }
  }
  return `${messageWithField} ${firstnameList.length}. List: ${firstnameList.join(', ')}`;
}

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.trim().split('\n').slice(1);
      const filteredLines = lines.filter((line) => line.trim() !== '');
      const array = [];
      array.push(messageGenerator(filteredLines));
      array.push(messageGenerator(filteredLines, 'CS'));
      array.push(messageGenerator(filteredLines, 'SWE'));
      resolve(array);
    });
  });
}

const PORT = 1245;
const [, , dbFilePath] = process.argv;
const app = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Holberton School!');
      break;
    case '/students':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('This is the list of our students\n');
      countStudents(dbFilePath)
        .then((data) => {
          data.forEach((student, index) => {
            const newLine = data.length === index + 1 ? '' : '\n';
            res.write(student + newLine);
          });
          res.end();
        })
        .catch((error) => {
          res.end(error.message);
        });
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      break;
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;

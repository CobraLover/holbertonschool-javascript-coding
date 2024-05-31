const express = require('express');
const fs = require('fs');
const PORT = 1245;

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

const app = express();
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  let text = 'This is the list of our students\n';
  countStudents(process.argv[2])
    .then((data) => {
      data.forEach((student, index) => {
        const newLine = data.length === index + 1 ? '' : '\n';
        text += student + newLine;
      });
      res.write(text);
      res.end();
    })
    .catch((error) => {
      res.status(500).send(`This is the list of our students\n${error.message}`);
    });
});
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;

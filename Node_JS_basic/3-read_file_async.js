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

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.trim().split('\n').slice(1);
      const filteredLines = lines.filter((line) => line.trim() !== '');
      console.log(messageGenerator(filteredLines));
      console.log(messageGenerator(filteredLines, 'CS'));
      console.log(messageGenerator(filteredLines, 'SWE'));
      resolve();
    });
  });
}

module.exports = countStudents;

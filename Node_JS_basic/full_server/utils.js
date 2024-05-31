import fs from 'fs';

export default function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').slice(1);
      const students = {};

      lines.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (students[field]) {
          students[field].push(firstname);
        } else {
          students[field] = [firstname];
        }
      });

      resolve(students);
    });
  });
}

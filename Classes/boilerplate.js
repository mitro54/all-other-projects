const fs = require('fs');
const folderName = process.argv[2] || 'Project';

// fs.mkdir('testingDir', { recursive: true }, (err) => {
//     console.log('in the cb')
//     if (err) throw err;
// });

try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, '');
    fs.writeFileSync(`${folderName}/app.js`, '');
    fs.writeFileSync(`${folderName}/styles.css`, '');
} catch (e) {
    console.log("SOMETHING WENT WRONG!!!");
    console.log(e);
}

// own note, it will create the directory where the code is ran
// so depends where the code is run

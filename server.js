// const http = require('http'); 
import http from 'http'; 
import fs from 'fs'; 
import path from 'path'; 
 
// console.log(process.argv[1]); 
const serverPath = path.dirname(process.argv[1]); 
const homeworks = JSON.parse(fs.readFileSync(path.join(serverPath, 'static', 'homeworks.json'), 'utf-8')); 
// console.log(serverPath); 
 
const PORT = 5000; 
// const htmlContent = fs.readFileSync(path.join(serverPath, 'static', 'index.html'), 'utf-8'); 
// console.log(htmlContent); 
 
const server = http.createServer((req, res) => { 
    if (req.url === '/homeworks') { 
        res.write(` 
        <!DOCTYPE html> 
            <html lang="en"> 
            <head> 
                <meta charset="UTF-8"> 
                <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                <title>Document</title> 
            </head> 
            <body> 
                <ol> 
        `); 
        homeworks.forEach(homework => { 
            res.write(`<li>${homework.title}</li>`); 
        }); 
 
        res.write(` 
                </ol> 
            </body> 
        </html> 
        `); 
        // res.write(homeworks); 
        res.end(); 
    } else { 
 
        const indexPath = path.join(serverPath, 'static', req.url); 
 
        fs.readFile(indexPath, (err, htmlContent) => { 
            if (err) { 
                res.statusCode = 400; 
                res.end(); 
            } 
            console.log(`sending ${req.url} ${htmlContent.length} bytes`); 
            res.end(htmlContent); 
        }); 
    } 
}); 
 
server.listen(PORT, () => { 
    console.log('Server is running ' + PORT); 
});
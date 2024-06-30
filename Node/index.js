const http = require('http')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    return res.send("Hello From Home page")
})

app.get('/about', (req, res) => {
    return res.send("Hello From About page")
})

app.listen(8000, () => {
    console.log(`server Started`);
})


// const myServer = http.createServer((req, res) => {
//     const log = `${Date.now()}:New Req Recived\n`
//     const myurl = url.parse(req.url, true)
//     fs.appendFile("log.txt", log, (err, result) => {
//         switch (myurl.pathname) {
//             case "/":
//                 res.end("Home Page")
//                 break;
//             case "/about":
//                 const username = myurl.query.myname;
//                 res.end(`Hii ${username}`)
//                 break;
//             case "/search":
//                 const search = myurl.query.search_query;
//                 res.end(`Here are you result ${search}`)
//             default:
//                 res.end("404 Not found")
//         }
//         console.log(result);
//     })
// })

// const myHandler = http.createServer(app);

// myHandler.listen(8000, () => {
//     console.log('server Started');
// })
import express from 'express';

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const PORT = 5000;
let data =  [
    {"title":"Title1","url":"http://example.org/example1","img":"images/contento1.jpg"},
    {"title":"Title2","url":"http://example.org/example2","img":"images/contento2.jpg"},
    {"title":"Title3","url":"http://example.org/example3","img":"images/contento3.jpg"},
    {"title":"Title4","url":"http://example.org/example4","img":"images/contento4.jpg"}
];

app.post('/getAll', (req, res) => {
    const data =  [
        {"title":"Title1","url":"http://example.org/example1","img":"images/contento1.jpg"},
        {"title":"Title2","url":"http://example.org/example2","img":"images/contento2.jpg"},
        {"title":"Title3","url":"http://example.org/example3","img":"images/contento3.jpg"},
        {"title":"Title4","url":"http://example.org/example4","img":"images/contento4.jpg"}
    ];
    res.status(200).send({
        success: true,
        content: data
    })
});
app.post('/getSingle', (req, res) => {
    const row = data.find(function(el) {
       return el.url ===  req.body.url;
    });
    res.status(200).send({
        success: row != null,
        content: row
    })
});

app.post('/update', (req, res) => {
    const LoremIpsum = require("lorem-ipsum").LoremIpsum;
    const lorem = new LoremIpsum();
    let rows = [];
    if(Math.random() > 0.5) {
        for(let i = 0; i < Math.floor(Math.random() * 3) + 1; i++ ) {
            rows.push({
                "title":lorem.generateSentences(1),
                "url":"http://example.org/"+lorem.generateWords(1),
                "img":"images/contento"+(Math.floor(Math.random() * 4) + 1)+".jpg"
            })
        }
        data = data.concat(rows);
    }
    res.status(200).send({
        content: rows
    })
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
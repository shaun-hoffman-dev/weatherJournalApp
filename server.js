//ENDPOINT
projectData = {};

//BOILERPLATE REQUIREMENTS AND SPIN UP SERVER
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));
const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

//ROUTING
    // GET route
    app.get('/all', sendData);

    function sendData (request, response) {
    response.send(projectData);
    };

    // POST route
    app.post('/add', callBack);

    function callBack(req,res){
    res.send('POST received');
    };

    // POST Entry
    const data = [];

    app.post('/addEntry', addEntry);

    function addEntry (req,res){
        data.push(req.body);
    };


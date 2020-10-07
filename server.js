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
    // GET CURRENT STATUS SAVED AS OBJECT
    app.get('/all', sendData);
    function sendData (req, res) {
    res.send(projectData);
    };

    // GET DATA ARRAY FOR PRIOR ENTRIES
    app.get('/allData', sendAllData);
    function sendAllData (req, res) {
    res.send(data);
    };

    // POST ENTRY
    const data = [];
    app.post('/addEntry', addEntry);
    function addEntry (req,res){
        data.push(req.body);
        projectData = {
            city: req.body.city,
            country: req.body.country,
            mapURL: req.body.mapURL,
            date: req.body.date,
            time: req.body.time,
            temperature: req.body.temperature,
            conditions: req.body.conditions,
            wind: req.body.wind,
            weatherIconURL: req.body.weatherIconURL,
            mood: req.body.mood 
        }
    };


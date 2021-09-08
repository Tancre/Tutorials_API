// import fetch from 'node-fetch';   

// For some reason node-fetch doesn't work
// maybe I have to upgrade node

const { response } = require('express');
const express = require('express');
const Datastore = require('nedb');

const app = express();
//const fs = require('fs'); 

const port = 3000;
app.listen(port, () => console.log('listening at ' + port));
app.use(express.static('public')); 
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

//let saveGeolocs = [];
//let counter = 0;

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return
        }
        res.json(data);
    });
});

app.post('/api', (req, res) => {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp
    database.insert(data);
    res.json(data);

    // PUSH TO ARRAY
    // console.log('Push to Array');
    // saveGeolocs[counter] = data;
    // counter++
    // console.log(saveGeolocs);

    // PUSH TO FILE
    // console.log('Save to file...')
    // const newJSON = JSON.stringify(saveGeolocs);
    // fs.writeFile('geolocs.json', newJSON, function (err) {
    //     if (err) throw err;
    //         console.log('Saved!');
    // });
});

// REVERSE PROXY TO ACCESS API WITH CORS disabled
// app.get('/weather', async (req, res) => {
//     console.log(fetch)
//     const key = '0ffbda025ad4440fd3d66bb44e1a9582'
//     let api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.8976222&lon=4.5125857&exclude=minutely,hourly,daily&appid=${key}`
//     // const response = await fetch(api_url);
//         const response = await fetch(api_url)
//         console.log(response);
//         const json = await response.json();
//         res.json(json);
// });


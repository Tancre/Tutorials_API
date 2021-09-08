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


const express = require('express');
const app = express();
const fs = require('fs'); 

const port = 3000;
app.listen(port, () => console.log('listening at ' + port));
app.use(express.static('public')); 
app.use(express.json({ limit: '1mb' }));

let saveGeolocs = [];
let counter = 0;

app.post('/api', (req, res) => {
    console.log('I got a request!');
    const data = req.body;
    console.log(req.body);
    res.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.long
    });

    console.log('Push to Array');
    saveGeolocs[counter] = data;
    counter++
    console.log(saveGeolocs);

    console.log('Save to file...')
    const newJSON = JSON.stringify(saveGeolocs);
    fs.writeFile('geolocs.json', newJSON, function (err) {
        if (err) throw err;
            console.log('Saved!');
    });
});
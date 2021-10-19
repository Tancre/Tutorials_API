const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;
app.listen(port, () => console.log("listening to port " + port ))

app.use(express.static('website')); 

let data = fs.readFileSync('words.json');
let words = JSON.parse(data);
console.log(words);

// TEST ROUTES
app.get('/search/:obj/:num', sendFlower);

function sendFlower(req, res) {
    let data = req.params;
    let num = data.num;
    let reply = "";
    for (let i = 0; i < num; i++) {
        reply += "I love " + data.obj + " too" + "<br>"
    }

    res.send(reply);
}

// SEND ALL ENTRIES
app.get('/all', sendAll);

function sendAll(req,res) {
    res.send(words)
}

// ADD A NEW ENTRY
app.get('/add/:word/:score?', sendFlower);

function sendFlower(req, res) {
    let data = req.params;
    let word = data.word;
    let score = Number(data.score);
    let reply;

    if (!score) { 
        reply = {
            msg: "Score is required!"
        }
        res.send(reply);
    }else {
        words[word] = score;
        let data = JSON.stringify(words, null, 2);
        fs.writeFile('words.json', data, finished);

        function finished() {
            console.log('All set.');
            reply = {
                word: word,
                score: score,
                status: "Success!"
            }
            res.send(reply);
        }
    }

    
}

// SEARCH ENTRY
app.get('/search/:word/', searchWord);
function searchWord(req, res) {
    let word = req.params.word;
    let reply;

    if (words[word]) {
        reply = {
            status: "Found!",
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: "Not found.",
            word: word
        }
    }

    res.send(reply);
}
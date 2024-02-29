const express = require('express');
const { lstat } = require('fs');
const app = express();
const path = require('path');
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, 'public')));

// no need to require, using this line will require it
// in the background.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home') //No need to include .ejs if view engine is set to ejs
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
});

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 100) + 1;
    res.render('random', { rand: num });
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
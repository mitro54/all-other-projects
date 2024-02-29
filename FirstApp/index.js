const express = require('express');
const app = express();

// app.use((req, res) => {
//     console.log('We got a new request...')
//     res.send('Server responds with: This is your response.')
// })

app.get('/', (req, res) => {
    res.send('This is the home / root.')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${[subreddit]} subreddit.</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit.</h1>`)
})

app.get('/path', (req, res) => {
    res.send('Response for /path.')
})

app.post('/path', (req, res) => {
    res.send('Response for post request on /path.')
})

app.get('/cats', (req, res) => {
    res.send('meow.')
})

app.get('/dogs', (req, res) => {
    res.send('woof.')
})

app.get('/search', (req, res) => {
    console.log(req.query);
    const { q } = req.query;
    if (!q) {
        res.send('Nothing found if nothing searched.')
    }
    res.send(`<h1> Search results for: ${q}</h1>`)
})

app.get('*', (req, res) => {
    res.send('Cannot find that path...')
})


app.listen(3000, () => {
    console.log('Listening on port 3000...')
})

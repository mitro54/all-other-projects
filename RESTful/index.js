const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lololol'
    },
    {
        id: uuid(),
        username: 'Jarmo',
        comment: 'SEO JUST NII'
    },
    {
        id: uuid(),
        username: 'Pete',
        comment: 'on hieno nimi'
    },
    {
        id: uuid(),
        username: 'Veera',
        comment: 'Sauks on best!!!!!'
    },
    {
        id: uuid(),
        username: 'Tony',
        comment: 'wow thats so dum'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id == id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id == id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Ok, here is recap of your data: ${qty} ${meat}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

// CRUD blueprint
// GET /comments - list all comments
// POST /comments - create a new comment
// GET /comments/:id - get one comment (using ID)
// PATCH /comments/:id - update one comment
// DELETE /comments/:id - delete one comment
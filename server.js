const express = require('express');
const app = express();
const path = require('path');

const { sequelize, syncAndSeed, Book } = require('./db/db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/books', async(req, res, next) => {
    try {
        res.send(await Book.findAll());
    }
    catch(err) {
        next(err);
    }
});

app.delete('/api/books/:id', async(req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        await book.destroy();
        res.sendStatus(204);
    }
    catch(err) {
        next(err);
    }
});


app.post('/api/books', async(req, res, next) => {
    try {
        res.status(201).send(await Book.generateRandom());
    }
    catch(err) {
        next(err);
    }
});

const setup = async() => {
    try {
        await syncAndSeed();
        
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch(err) {
        console.log(err);
    }
};

setup();
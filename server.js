const express = require('express');
const app = express();
const path = require('path');

const { sequelize, Book } = require('./db/db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

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

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));

const setup = async() => {
    try {
        await sequelize.sync({ force: true });
        console.log('CONNECTED TO DB')
        /*
        const leguin = await Author.create({ name: 'Ursula K. LeGuin' });
        const butler = await Author.create({ name: 'Octavia Butler' });
        const dick = await Author.create({ name: 'Philip K. Dick' });
        */

        await Book.create({ title: 'Left Hand of Darkness' });
        await Book.create({ title: 'The Dispossesed' });
        await Book.create({ title: 'Kindred' });
        await Book.create({ title: 'Parable of the Sower' });
        await Book.create({ title: 'A Scanner Darkly' });
        await Book.create({ title: 'Do Androids Dream of Electric Sheep?' });
    }
    catch(err) {
        console.log(err);
    }
};

setup();
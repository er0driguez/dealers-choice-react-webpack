/*
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/sci_fi_library');


const Book = sequelize.define('book', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4
    }, 
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Author = sequelize.define('author', {
    name: {
        type: Sequelize.STRING
    }
});

Book.generateRandom = function() {
    return this.create({ title: `Book ${ Math.floor(Math.random()  * 1000)}` });
}

Book.belongsTo(Author);
Author.hasMany(Book);
*/
const express = require('express');
const app = express();
const path = require('path');

const { sequelize, Book, Author } = require('./db/db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));

const setup = async() => {
    try {
        await sequelize.sync({ force: true });
        console.log('CONNECTED TO DB')

        const leguin = await Author.create({ name: 'Ursula K. LeGuin' });
        const butler = await Author.create({ name: 'Octavia Butler' });
        const dick = await Author.create({ name: 'Philip K. Dick' });

        await Book.create({ title: 'Left Hand of Darkness', authorId: leguin.id });
        await Book.create({ title: 'The Dispossesed', auhtorId: leguin.id });
        await Book.create({ title: 'Kindred', authorId: butler.id });
        await Book.create({ title: 'Parable of the Sower', authorId: butler.id });
        await Book.create({ title: 'A Scanner Darkly', authorId: dick.id });
        await Book.create({ title: 'Do Androids Dream of Electric Sheep?', authorId: dick.id });
    }
    catch(err) {
        console.log(err);
    }
};

setup();
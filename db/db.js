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
/*
//Experimenting with Second Table
const Author = sequelize.define('author', {
    name: {
        type: Sequelize.STRING
    }
});
*/

Book.generateRandom = function() {
    return this.create({ title: `Sci-Fi Book ${ Math.floor(Math.random()  * 1000)}` });
}
/*
Book.belongsTo(Author);
Author.hasMany(Book);
*/

const syncAndSeed = async() => {
        await sequelize.sync({ force: true });
        /*
        //Experimenting with Second Table
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

module.exports = {
    sequelize,
    syncAndSeed,
    Book
}
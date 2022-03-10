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

module.exports = {
    sequelize,
    Book
}
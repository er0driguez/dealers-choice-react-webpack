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

Book.belongsTo(Author);
Author.hasMany(Book);

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
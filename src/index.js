import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            books: []
        };
        this.create = this.create.bind(this);
    }
    
    async componentDidMount() {
       const response = await axios.get('/api/books');
        const books = response.data;
        this.setState({ books });
    }

    async destroy(book){
        await axios.delete(`api/books/${book.id}`);
        const books = this.state.books.filter(_book => _book.id !== book.id);
        this.setState({ books });
    }

    async create(){
            const response = await axios.post('/api/books');
            const book  = response.data;
            const books = [...this.state.books, book];
            this.setState({ books })
    }

    render() {
        const books = this.state.books;
        return (
            <div>
                <h1> Sci-Fi Library ({ books.length }) </h1>
                <button onClick={ this.create }> Check In Book </button>
                <ul>
                    {
                        books.map( book => {
                            return (
                                <li> { book.title } <button onClick ={ ()=> this.destroy(book)}> Check Out </button></li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
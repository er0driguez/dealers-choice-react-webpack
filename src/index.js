import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
        console.log('in constructor!')
    }
    
    render() {
        return (
            <div>
                <h1> Sci-Fi Library </h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
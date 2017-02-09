import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let loginInput = ReactDOM.findDOMNode(this.refs.currency);
        console.log(loginInput);
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input placeholder="GitHub login" ref="currency"/>
            <button>GO</button>
        </form>;
    }
}



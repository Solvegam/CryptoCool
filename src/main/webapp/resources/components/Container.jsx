import React from 'react';
import ReactDOM from 'react-dom';

import Card from './Card.jsx';
import SearchForm from './SearchForm.jsx'

export default class ContainerDiv extends React.Component{
    constructor(props) {
        super(props);
        this.addCard = this.addCard.bind(this);
        this.state = {
            curencies: []
        };
    }

    addCard(currency) {
        let component = this;
        this.setState({curencies: component.state.curencies.concat(currency)});
    }

    render() {
        let cards = this.state.curencies.map(function (currency) {
            return <Card key={currency} name={currency} />
        });
        return <div className="container">
            <div className="row row-offcanvas row-offcanvas-right">
                <h3>Search by github name</h3>
                <SearchForm addCard={this.addCard}/>
                {cards}
            </div>
        </div>;
    }
}

ReactDOM.render(
    <ContainerDiv/>,
    document.getElementById('container')
);
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
        let cards = this.state.curencies.map((currency) => <Card key={currency+1} name={currency} />);

        return <div>
            <div className="page-header">
                <h1>Crypto Cool
                    <small>  best trade and analytics platform</small>
                </h1>
            </div>
            <div className="container">
                <div className="row row-offcanvas row-offcanvas-right">
                    <h3>Search by github name</h3>
                    <SearchForm addCard={this.addCard}/>
                    {cards}
                </div>
            </div>
        </div>;
    }
}

ReactDOM.render(
    <ContainerDiv/>,
    document.getElementById('container')
);
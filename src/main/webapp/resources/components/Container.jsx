import React from 'react';
import ReactDOM from 'react-dom';

import Card from './Card.jsx';
import SearchForm from './SearchForm.jsx'
import TradeWindow from './trade_window/TradeWindow.jsx'

export default class ContainerDiv extends React.Component{
    constructor(props) {
        super(props);
        this.addCard = this.addCard.bind(this);
        this.state = {
            curencies: [],
            selectedCurrency: null
        };
        this.selectCurrency = this.selectCurrency.bind(this);
        this.closeTradeWindow = this.closeTradeWindow.bind(this);
    }

    addCard(currency) {
        let component = this;
        this.setState({curencies: component.state.curencies.concat(currency)});
    }

    closeTradeWindow() {
        this.setState({selectedCurrency: null});
    }

    selectCurrency(name){
        this.setState({selectedCurrency: name});
    }

    render() {
        if ( this.state.selectedCurrency ){
            return <TradeWindow closeTradeWindow={this.closeTradeWindow}/>
        }
        var self = this;
        let cards = this.state.curencies.map(function (currency) {
            return <Card key={currency} name={currency} onClick={self.selectCurrency} />
        });
        return <div className="container">
            {/*<TradeWindow/>*/}
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
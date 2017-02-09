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

        let content;
        if ( this.state.selectedCurrency ){
            content = <div className="row"><TradeWindow closeTradeWindow={this.closeTradeWindow}/></div>
        }
        else {
            let cards = this.state.curencies.map((currency) => <Card key={currency+1} name={currency} onClick={this.selectCurrency} />);
            content = <div className="row row-offcanvas row-offcanvas-right">
                <h3>Search by github name</h3>
                <SearchForm addCard={this.addCard}/>
              {cards}
            </div>
        }


        return <div>
            <div className="page-header" style={{"textAlign": "center"}}>
                <h1>Crypto Cool
                    <small>  best trade and analytics platform</small>
                </h1>
            </div>
            <div className="container">
              {content}
            </div>
        </div>;
    }
}

ReactDOM.render(
    <ContainerDiv/>,
    document.getElementById('container')
);
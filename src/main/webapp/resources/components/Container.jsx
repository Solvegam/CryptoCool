import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Card from './Card.jsx';
import SearchForm from './SearchForm.jsx'
import TradeWindow from './trade_window/TradeWindow.jsx'

export default class ContainerDiv extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            curencies: [],
            selectedCurrency: null
        };
        this.selectCurrency = this.selectCurrency.bind(this);
        this.closeTradeWindow = this.closeTradeWindow.bind(this);
    }

    componentDidMount() {
        let component = this;
        $.ajax({
            url: 'webapi/mainresource/coinmarker',
            dataType: 'json',
            success: function(data){
                console.log(data);
                component.setState({cardsData: data});
            }
        });
    }

    closeTradeWindow() {
        this.setState({selectedCurrency: null});
    }

    selectCurrency(name){
        this.setState({selectedCurrency: name});
    }

    render() {

        let content = null;
        if ( this.state.selectedCurrency ){
            content = <div className="row"><TradeWindow closeTradeWindow={this.closeTradeWindow}/></div>
        }
        else if (this.state.cardsData ) {
            let cards = this.state.cardsData.map((data) => {
              let avatarName = data.symbol.toLocaleLowerCase();
              let avatar_url = "http://capfeed.com/images/currencyicons/" + avatarName + "-64.png";
              return <Card key={data.id} data={data} avatar_url={avatar_url} onClick={this.selectCurrency}/>
            });
            content = <div className="row">
              {cards}
            </div>
        }

        return <div>
            <div className="page-header" style={{"textAlign": "center"}}>
                <h1>Crypto Cool
                    <small>  by Swissquote powered by Watson</small>
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
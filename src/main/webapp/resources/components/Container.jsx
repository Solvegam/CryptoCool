import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Card from './Card.jsx';
import SearchForm from './SearchForm.jsx'
import TradeWindow from './trade_window/TradeWindow.jsx'

export default class ContainerDiv extends React.Component{
  constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
    this.state = {
      curencies: [],
      selectedCurrency: null,
      cards:[]
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

  componentDidMount() {
    let component = this;
    $.ajax({
      url: '/webapi/mainresource/coinmarker',
      dataType: 'json',
      success: function(data){
        console.log(data);
        let newCards = [];
        data.forEach(cardData => {
          let avatarName = cardData.symbol.toLocaleLowerCase();
          // let avatar_url = "https://coinmarketcap.com/static/img/coins/16x16/" + avatarName + ".png";
          // let avatar_url_2 = "http://www.coinwarz.com/charts/difficulty-charts/content/images/" + avatarName + "-64x64.png";
          let avatar_url_3 = "http://capfeed.com/images/currencyicons/" + avatarName + "-64.png";

          newCards.push({
            name: cardData.name,
            symbol: cardData.symbol,
            rank: cardData.rank,
            price_usd: cardData.price_usd,
            price_btc: cardData.price_btc,
            avatar_url: avatar_url_3
          });
        } );

        component.setState({ cards: newCards});
      }
    });
  }

  render() {

    let content;
    if ( this.state.selectedCurrency ){
      content = <div className="row"><TradeWindow closeTradeWindow={this.closeTradeWindow}/></div>
    }
    else {
      {/*let cards = this.state.curencies.map((currency) => <Card key={currency+1} name={currency} onClick={this.selectCurrency} />);*/}
      let cards = this.state.cards.map((card) => <Card
        key={card.symbol+1}
        name={card.name}
        symbol={card.symbol}
        rank={card.rank}
        price_usd={card.price_usd}
        price_btc={card.price_btc}
        avatar_url={card.avatar_url}
        onClick={this.selectCurrency} />);

      content = <div className="row row-offcanvas row-offcanvas-right">
          <h3>Search by github name</h3>
          <SearchForm addCard={this.addCard}/>
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
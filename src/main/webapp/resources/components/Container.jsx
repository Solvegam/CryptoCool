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
      selectedCurrency: null,
      price: null
    };
    this.selectCurrency = this.selectCurrency.bind(this);
    this.closeTradeWindow = this.closeTradeWindow.bind(this);
  }

  componentDidMount() {
    let component = this;
    $.ajax({
      url: 'webapi/mainresource/coinmarker',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        component.setState({cardsData: data});
      }
    });
  }

  closeTradeWindow() {
    this.setState({selectedCurrency: null});
  }

  selectCurrency(name, price){
    this.setState({selectedCurrency: name, price: price});
  }

  render() {

    let content = null;
    if ( this.state.selectedCurrency ){
      content = <div className="row"><TradeWindow price={this.state.price} closeTradeWindow={this.closeTradeWindow}/></div>
    }
    else if (this.state.cardsData) {
      let cards = this.state.cardsData.map((data) => {
        let avatarName = data.symbol.toLocaleLowerCase();
        let avatar_url = "/webapi/mainresource/getImageForCoin/" + avatarName;
        return <Card key={data.id} data={data} avatar_url={avatar_url} onClick={this.selectCurrency}/>
      });
      content = <div className="row">
        {cards}
      </div>
    }

    return <div>
      <div className="page-header" style={{"textAlign": "center", "borderBottom": "4px solid #FF6633"}}>
        <h1>Crypto Cool
          <small> by Swissquote powered by Watson</small>
        </h1>
        <img alt="Swissquote - The Swiss Leader in Online Banking" title="Home"
             src="https://www.swissquote.ch/sqw-navigation/sq-css-theme-static/images/navigation/logo--swissquote.png"
             style={{
               "position": "absolute",
               "float": "left",
               "display": "absolute",
               "left": "25px",
               "top": "45px"
             }}/>
      </div>
      <div className="container">
        {content}
      </div>
    </div>
  }
}

ReactDOM.render(
  <ContainerDiv/>,
  document.getElementById('container')
);
import React from 'react';
import $ from 'jquery';

export default class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      riskLvl: "NON-RISKY",
      avatar_url: "http://capfeed.com/images/currencyicons/" + this.props.data.symbol.toLocaleLowerCase() + "-64.png",
      avatar_default_url: "http://photos.gograph.com/thumbs/CSP/CSP966/k9660009.jpg"
    };
    this.onClickHandler =  this.onClickHandler.bind(this)
  }

    onClickHandler(price){
      this.props.onClick(this.props.data.symbol, price);
    }

  render() {

    const DIGIT_FORMATTER = new Intl.NumberFormat("de-CH", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 20
    });

    let computeRiskClasslvl = (randtradeAdvice) => {
      if (randtradeAdvice<40) return 'progress-bar progress-bar-danger';
      else if (randtradeAdvice>60) return 'progress-bar progress-bar-success';
      else if (randtradeAdvice<60 || randtradeAdvice>40) return 'progress-bar progress-bar-warning';
    };
    let getRiskLabel= (tradeAdvice) => {
      if (tradeAdvice<40) return 'High';
      else if (tradeAdvice>60) return 'Low';
      else if (tradeAdvice<60 || tradeAdvice>40) return 'Medium';
    };
    var data = this.props.data;
    let tradeAdvice = (data) => { if(!data.available_supply) return 10;
                                  else if(Math.abs(100 - data.available_supply / data.total_supply * 100) === 0) return Math.random() * 20;
                                  else if(data.available_supply) return Math.abs(100 - data.available_supply / data.total_supply * 100)};
      return <div className="col-6 col-lg-4">
        <div className="thumbnail">
          <img src={this.state.avatar_url} onError={(e)=>{e.target.src=this.state.avatar_default_url}} width="80"/>
          <div className="caption">
            <p><label>SYMBOL: </label> {data.symbol}</p>
            <p><label>NAME: </label> {data.name}</p>
            <p><label>PRICE USD: </label> {DIGIT_FORMATTER.format(data.price_usd)}</p>
            <p><label>CROSS COIN: </label> {data.symbol + '/' + 'BTC'}</p>
            <p><label>PRICE BTC: </label> {DIGIT_FORMATTER.format(data.price_btc)}</p>
            <p><label>RISK LEVEL: </label> {getRiskLabel(tradeAdvice(data))}</p>
            <p><label>STABILITY LEVEL: </label></p>
            <div className='progress'>
              <div className={computeRiskClasslvl(tradeAdvice(data))}
                   role='progressbar'
                   aria-valuenow={tradeAdvice(data)}
                   aria-valuemin='0'
                   aria-valuemax='100'
                   style={{width: `${tradeAdvice(data)}%`}}>
              </div>
            </div>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => this.onClickHandler(DIGIT_FORMATTER.format(data.price_usd + 1))} role="button">  Trade  </button>
          </div>
        </div>
      </div>;
  }
}


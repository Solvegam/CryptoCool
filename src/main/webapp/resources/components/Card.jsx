import React from 'react';
import $ from 'jquery';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        //     symbol: "BTC",
        //     price_usd: "1000 USD",
        //     pair: "BTC/LTC",
        //     price_btc: "1000 USD",
            riskLvl: "NON-RISKY",
            avatar_url: "http://bitcoin.org/img/icons/opengraph.png"
        };
        this.onClickHandler =  this.onClickHandler.bind(this)
    }

    onClickHandler(){
      this.props.onClick(this.props.data.symbol);
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
        var tradeAdvice = data.available_supply / data.total_supply * 100;
        return <div className="col-6 col-lg-4">
            <div className="thumbnail">
                <img src={this.props.avatar_url} width="80"/>
                <div className="caption">
                    <p><label>SYMBOL</label> {data.symbol}</p>
                    <p><label>NAME</label> {data.name}</p>
                    <p><label>PRICE USD</label> {DIGIT_FORMATTER.format(data.price_usd)}</p>
                    <p><label>PAIR/BTC</label> {data.symbol + '/' + 'BTC'}</p>
                    <p><label>PRICE BTC</label> {DIGIT_FORMATTER.format(data.price_btc)}</p>
                    <p><label>RISK LVL</label> {getRiskLabel(tradeAdvice)}</p>
                    <div className='progress'>
                        <div className={computeRiskClasslvl(tradeAdvice)}
                             role='progressbar'
                             aria-valuenow={tradeAdvice}
                             aria-valuemin='0'
                             aria-valuemax='100'
                             style={{width: `${tradeAdvice}%`}}>
                        </div>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={this.onClickHandler} role="button">  Trade  </button>
                </div>
            </div>
        </div>;
    }
}


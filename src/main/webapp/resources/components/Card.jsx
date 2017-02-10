import React from 'react';
import $ from 'jquery';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            symbol: "BTC",
            price_usd: "1000 USD",
            pair: "BTC/LTC",
            price_btc: "1000 USD",
            riskLvl: "NON-RISKY",
            avatar_url: "http://bitcoin.org/img/icons/opengraph.png"
        };
        this.onClickHandler =  this.onClickHandler.bind(this)
    }

    componentDidMount() {
        let component = this;
        $.ajax({
            url: 'webapi/mainresource/coinmarker',
            dataType: 'json',
            success: function(data){
                console.log(data);
                component.setState(data);
            }
        });
    }

    onClickHandler(){
      this.props.onClick(this.state.symbol);
    }

    render() {

        let rand = Math.abs(Math.floor(Math.random() * (1 - 100 + 1)) + 1);
        console.log(rand);
        let computeRiskClasslvl = (rand) => {
            if (rand<40) return 'progress-bar progress-bar-success';
            else if (rand>60) return 'progress-bar progress-bar-danger';
            else if (rand<60 || rand>40) return 'progress-bar progress-bar-warning';
        };
        return <div className="col-6 col-lg-4">
            <div className="thumbnail">
                <img src={this.state.avatar_url} width="80"/>
                <div className="caption">
                    <p>SYMBOL {this.state.symbol}</p>
                    <p>NAME {this.state.name}</p>
                    <p>PRICE USD {this.state.price_usd}</p>
                    <p>PAIR/BTC {this.state.symbol + '/' + 'BTC'}</p>
                    <p>PRICE BTC {this.state.price_btc}</p>
                    <p>RISK LVL {this.state.riskLvl}</p>
                    <div className='progress'>
                        <div className={computeRiskClasslvl(rand)}
                             role='progressbar'
                             aria-valuenow={rand}
                             aria-valuemin='0'
                             aria-valuemax='100'
                             style={{width: `${rand}%`}}>
                            <span className='sr-only'>70% Complete</span>
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


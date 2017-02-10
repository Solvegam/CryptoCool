import React from 'react';

export default class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      symbol: "",
      rank: 0,
      price_usd: 0,
      price_btc: 0,
      avatar_url: ""
    };
    this.onClickHandler =  this.onClickHandler.bind(this)
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
            <img src={this.props.avatar_url} width="80"/>
            <div className="caption">
                <p>SYMBOL {this.props.symbol}</p>
                <p>NAME {this.props.name}</p>
                <p>PRICE USD {this.props.price_usd}</p>
                <p>PAIR/BTC {this.props.symbol + '/' + 'BTC'}</p>
                <p>PRICE BTC {this.props.price_btc}</p>
                <p>RISK LVL {this.props.rank}</p>
                <div className='progress'>
                    <div className={computeRiskClasslvl(this.props.rank)}
                         role='progressbar'
                         aria-valuenow={this.props.rank}
                         aria-valuemin='0'
                         aria-valuemax='100'
                         style={{width: `${this.props.rank}%`}}>
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


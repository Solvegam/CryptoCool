import React from 'react';
import MarketDepth from './MarketDepth.jsx';
import Chart from './Chart.jsx';

export default class TradeWindow extends React.Component {

  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
  }

  back() {
    this.props.closeTradeWindow();
  }

  render() {
    return <div>
      <button className="btn btn-primary" role="button" onClick={this.back} style={{"marginBottom": "10px"}}>
        <img src="resources/images/back_button.png"
             style={{"width": "15px", "marginRight": "4px", "marginTop": "-3px"}}/>
        Back
      </button>
      <div className="row">
        <div className="col-xs-7"><Chart price={this.props.price}/></div>
        <div className="col-xs-5"><MarketDepth/></div>
      </div>
    </div>
  }

}
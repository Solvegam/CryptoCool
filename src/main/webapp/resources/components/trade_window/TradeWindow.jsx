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
      <button className="btn btn-primary" role="button" onClick={this.back}>
        <img src="http://codenamekash.com/aau/wnm617/midterm/image/back_button.png"
             style={{"width": "15px", "marginRight": "4px", "marginTop": "-3px"}}/>
        Back
      </button>
      <div className="row">
        <div className="col-xs-6"><Chart/></div>
        <div className="col-xs-6"><MarketDepth/></div>
      </div>
    </div>
  }

}
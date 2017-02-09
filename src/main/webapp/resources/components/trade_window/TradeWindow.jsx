import React from 'react';
import MarketDepth from './MarketDepth.jsx';

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
      <div onClick={this.back}>Back</div>
      <MarketDepth/>
    </div>
  }

}
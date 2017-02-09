import React from 'react';
import $ from 'jquery';
import l from 'lightstreamer-client';
//AXY_COMP_BUYSIDE
//SF_TECH_BUYSIDE
// var ls = require("lightstreamer-client");
var hotTime = 350;

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var myClient = new LightstreamerClient("http://push.lightstreamer.com", "MARKETDEPTH");

    var buyGrid = new DynaGrid("buyside", true);
    buyGrid.setAutoCleanBehavior(true, false);
    buyGrid.setSort("key", true, true);
    // buyGrid.setMaxDynaRows(15);
    // buyGrid.setAutoScroll("PAGE", "buy-elemet");
    buyGrid.addListener({
      onVisualUpdate: function (key, info) {
        if (info == null) {
          return;
        }
        // visual effects on updates
        info.setHotTime(hotTime);
        info.setStyle("lshotB", "lscoldB");
        info.setCellStyle("command", "commandhot", "commandcold")
      }
    });
    var buySubscription = new Subscription("COMMAND", "AXY_COMP_BUYSIDE", ["command", "key", "qty"]);
    buySubscription.setRequestedSnapshot("yes");

    buySubscription.addListener(buyGrid);
    buySubscription.addListener({
      onClearSnapshot: function (itemName, itemPos) {
        console.info("Clear Snapshot: " + itemName + ".");
      },
      onItemLostUpdates: function (itemName, itemPos, lostUpdates) {
        console.error("Lost Updates for " + itemName + ": " + lostUpdates);

        // Unsubcribe and then subscribe again the Item in order that the snapshot restore the list.

        myClient.unsubscribe(buySubscription);
        myClient.subscribe(buySubscription);
      }
    });
    myClient.subscribe(buySubscription);
    myClient.connect();

    // SELL side subscription:

    var sellGrid = new DynaGrid("sellside", true);
    sellGrid.setAutoCleanBehavior(true, false);
    sellGrid.setSort("key", false, true);
    sellGrid.addListener({
      onVisualUpdate: function (key, info) {
        if (info == null) {
          return;
        }
        // visual effects on updates
        info.setHotTime(hotTime);
        info.setStyle("lshotS", "lscoldS");
        info.setCellStyle("command", "commandhot", "commandcold")
      }
    });

    var sellSubscription = new Subscription("COMMAND", "AXY_COMP_SELLSIDE", ["command", "key", "qty"]);

    sellSubscription.setRequestedSnapshot("yes");

    sellSubscription.addListener(sellGrid);
    sellSubscription.addListener({
      onClearSnapshot: function (itemName, itemPos) {
        console.info("Clear Snapshot: " + itemName + ".");
      },
      onItemLostUpdates: function (itemName, itemPos, lostUpdates) {
        console.error("Lost Updates for " + itemName + ": " + lostUpdates);

        // Unsubcribe and then subscribe again the Item in order that the snapshot restore the list.

        client.unsubscribe(sellSubscription);
        client.subscribe(sellSubscription);
      }
    });
    myClient.subscribe(sellSubscription);


    var sellGrid = new DynaGrid("sellside", true);
    sellGrid.setAutoCleanBehavior(true, false);
    sellGrid.setSort("key", false, true);
    sellGrid.addListener({
      onVisualUpdate: function (key, info) {
        if (info == null) {
          return;
        }
        // visual effects on updates
        info.setHotTime(hotTime);
        info.setStyle("lshotS", "lscoldS");
        info.setCellStyle("command", "commandhot", "commandcold")
      }
    });

    sellSubscription = new Subscription("COMMAND", "AXY_COMP_SELLSIDE", ["command", "key", "qty"]);

    sellSubscription.setRequestedSnapshot("yes");

    sellSubscription.addListener(sellGrid);
    sellSubscription.addListener({
      onClearSnapshot: function (itemName, itemPos) {
        console.info("Clear Snapshot: " + itemName + ".");
      },
      onItemLostUpdates: function (itemName, itemPos, lostUpdates) {
        console.error("Lost Updates for " + itemName + ": " + lostUpdates);

        // Unsubcribe and then subscribe again the Item in order that the snapshot restore the list.

        myClient.unsubscribe(sellSubscription);
        myClient.subscribe(sellSubscription);
      }
    });
    myClient.subscribe(sellSubscription);

  }

  render() {
    return <div>
      <div id="wrap">
        <div style={{'height' : "456px", "overflow" : "hidden"}}>
          <form id="order-ins" className="tablespacer">
            <table className="inputPanel" width="490px" cellPadding="0" cellSpacing="0">
              <tbody>
              <tr className="inputPanel" height="35px">
                <td width="210px" style={{"textAlign": "center"}}>
                  <input type="submit" id="buy" className="buttonBuy" disabled value="Buy"/>
                  <input type="submit" id="sell" className="buttonSell" disabled value="Sell"/>
                </td>
              </tr>
              </tbody>
            </table>
          </form>

          <div id="needforscroll" style={{"height": "160px", "overflowX": "hidden", "overflowY": "scroll", "display": "none"}}>
            <table width="470px" cellSpacing="1" cellPadding="2">
              <tbody>
              <tr className="tableTitle">
                <td colSpan="6">Orders Log</td>
              </tr>
              <tr>
                <td width="90px" id="col_ord_prog" className="tableTitle">
                  {/*<a href="#" onClick="changeSortOrders('prog');return false;">Prog</a>*/}
                  <img width="10" src="images/spacer.gif" id="img_ord_prog"/></td>
                <td width="140px" id="col_ord_stock" className="tableTitle">
                  {/*<a href="#" onClick="changeSortOrders('stock');return false;">Stock</a>*/}
                  <img width="10" src="images/spacer.gif" id="img_ord_stock"/></td>
                <td width="55px" id="col_ord_side" className="tableTitle">
                  {/*<a href="#" onClick="changeSortOrders('side');return false;">Order</a>*/}
                  <img width="10" src="images/spacer.gif" id="img_ord_side"/></td>
                <td width="105px" id="col_ord_qty" className="tableTitle">
                  {/*<a href="#" onClick="changeSortOrders('qty');return false;">Quantity</a>*/}
                  <img width="10" src="images/spacer.gif" id="img_ord_qty"/></td>
                <td width="105px" id="col_ord_px" className="tableTitle">
                  {/*<a href="#" onClick="changeSortOrders('px');return false;">Price</a>*/}
                  <img width="10" src="images/spacer.gif" id="img_ord_px"/></td>
                <td width="170px" id="col_ord_status" className="tableTitle">
                  {/*<a href="#" onClick="changeSortOrders('status');return false;">Status</a>*/}
                  <img width="10" src="images/spacer.gif" id="img_ord_status"/></td>
              </tr>
              <tr className="tablerow" id="orders" data-source="lightstreamer">
                <td>
                  <div data-source="lightstreamer" data-field="prog"></div>
                </td>
                <td>
                  <div data-source="lightstreamer" data-field="stock"></div>
                </td>
                <td>
                  <div data-source="lightstreamer" data-field="side"></div>
                </td>
                <td>
                  <div data-source="lightstreamer" data-field="qty"></div>
                </td>
                <td>
                  <div data-source="lightstreamer" data-field="px"></div>
                </td>
                <td>
                  <div data-source="lightstreamer" data-field="status"></div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <table width="490px" className="tablespacer">
            <tbody>
            <tr>
              <td className="tablebook">
                <table width="245px" cellSpacing="1" cellPadding="1">
                  <tbody>
                  <tr id="buyside" data-source="lightstreamer">
                    <td width="50%" style={{"textAlign": "right"}}>
                      <div data-source="lightstreamer" data-field="qty"></div>
                    </td>
                    <td width="50%" style={{"textAlign": "center"}}>
                      <div data-source="lightstreamer" data-field="key"></div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
              <td className="tablebook">
                <table width="245px" cellSpacing="1" cellPadding="1">
                  <tbody>
                  <tr id="sellside" data-source="lightstreamer">
                    <td width="50%" style={{"textAlign": "center"}}>
                      <div data-source="lightstreamer" data-field="key"></div>
                    </td>
                    <td width="50%" style={{"textAlign": "right"}}>
                      <div data-source="lightstreamer" data-field="qty"></div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
          <table width="490px" style={{"marginBottom": "150px"}}>
            <tbody>
            <tr>
              <td>
                <div className="verysmall" style={{"textAlign": "left"}} data-source="lightstreamer" data-grid="Sintesi" data-item="1"
                     data-field="buy_depth">
                </div>
              </td>
              <td>
                <div className="verysmall" style={{"textAlign": "center"}}>Market Depth</div>
              </td>
              <td>
                <div className="verysmall" style={{"textAlign": "right"}} data-source="lightstreamer" data-grid="Sintesi" data-item="1"
                     data-field="sell_depth">
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }
};
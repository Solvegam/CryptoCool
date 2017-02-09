import React from 'react';
import $ from 'jquery';


export default class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let component = this;
    $.ajax({
      url: 'http://localhost:8080/webapi/mainresource/chart/1500',
      success: function (data) {
        var values = data.split("|");
        var items = [];
        var now = new Date();
        for (var i = 0; i < values.length; i++) {
          now.setTime(now.getTime() + 1000);
          items.push({x: now.getTime(), y: parseFloat(values[i])});
        }

        var container = document.getElementById('visualization');
        var options = {
          start: new Date(),
          end: new Date(items[0].x + 10000),
          dataAxis: {
            left: {
              format: function (value) {
                return '' + value.toPrecision(7);
              }
            }
          }
        };
        var dataset = new vis.DataSet(items.slice(0, 2));
        var Graph2d = new vis.Graph2d(container, dataset, options)

        var index = 7;
        setInterval(function () {
          Graph2d.destroy();
          var end;
          if (items[index].x - items[0].x > 10000) {
            end = items[index].x;
          }
          else {
            end = new Date(items[0].x + 10000);
          }
          var options = {
            start: items[0].x,
            end: end,
            dataAxis: {
              left: {
                format: function (value) {
                  return '' + value.toPrecision(7);
                }
              }
            }
          };
          var dataset = new vis.DataSet(items.slice(0, index));
          Graph2d = new vis.Graph2d(container, dataset, options)
          index++;
        }, 1000)
      }
    });
  }

  render() {
    return <div id="visualization"></div>;
  }
}
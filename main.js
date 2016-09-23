dataset = [1,2,3,4,5];

d3.edge = {};

d3.edge.table = function module () {
  var fontSize = '10',
      fontColor = 'red';

  var dispatch = d3.dispatch('customHover');
  function exports(_selection) {
    _selection.each(function(_data) {
      d3.select(this)
        .append('div')
        .style('font-size', fontSize + 'px')
        .style('color', fontColor)
        .html('Hello World: ' + _data)
        .on('mouseover', function(_data, i) {
          dispatch.call('customHover', this, _data, i)
         });
    });
  }
  exports.fontSize = function(_x) {
    if (!arguments.length) return fontSize;
    fontColor = _x;
    return this;
  }
  exports.fontColor = function(_x) {
    if (!arguments.length) return fontColor;
    fontColor = _x;
    return this;
  }
  exports.on = function() {
    console.log("on is called");
    var value = dispatch.on.apply(dispatch, arguments);
    return value === dispatch ? exports : value;
  }
  // d3.rebind(exports, dispatch, "on");
  return exports;
};

var table = d3.edge.table().fontSize('20').fontColor('green');
table.on('customHover', function(d, i){
  console.log('Custom Hover' + d, i);
});

d3.select('body')
  .datum(dataset)
  .call(table)

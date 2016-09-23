// Copies a variable number of methods from source to target.
d3.rebind = function(target, source) {
  var i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
  return function() {
    var value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}

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
  console.log('no idea' + d, i);
});

d3.select('body')
  .datum(dataset)
  .call(table)

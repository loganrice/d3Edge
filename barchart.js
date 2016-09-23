dataset = [1,2,3,4,5];

d3.custom = {};

d3.custom.barChart = function module() {
  var w = 400,
      h = 300;
  var dispatch = d3.dispatch('customHover');

  function exports(_selection) {
    _selection.each(function(_data) {
      var barW = w / _data.length,
          scaling = h / d3.max(_data);
      d3.select(this)  
        .append('svg')
        .attr('class', "chart2")
        .attr('width', w)
        .attr('height', h)
        .selectAll(".bar")
        .data(_data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return i * barW; })
        .attr("y", function(d, i) { return h - d * scaling; })
        .attr("width", barW)
        .attr("height", function(d, i) { return d * scaling; })
        .on("mouseover", function(d, i) {
          dispatch.call('customHover', this, d, i)
        });
    });
  }
  exports.w = function(_x) {
    if (!arguments.length) return w;
    w = _x;
    return this;
  }
  exports.h = function(_x) {
    if (!arguments.length) return h;
    h = _x;
    return this;
  }
  exports.on = function() {
    var value = dispatch.on.apply(dispatch, arguments);
    return value === dispatch ? exports : value;
  }
  return exports;
}

var msg = (function () {
  var selection = d3.select("#message");
  return function (text_message) {
    selection.text(text_message);
  };
})();

var chart = d3.custom.barChart()
              .w(100)
              .h(200)
              .on('customHover', function(d, i) { msg("chart1: " + d); });

var data1 = [10,20,30,40];

d3.select('#chart')
  .datum(data1)
  .call(chart)

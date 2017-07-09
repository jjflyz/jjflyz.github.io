var $__initTailRecursiveFunction = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/initTailRecursiveFunction.js", "indexAll.js")).default;
var $__continuation = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/continuation.js", "indexAll.js")).default;
var $__call = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/call.js", "indexAll.js")).default;
var $__createClass = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/createClass.js", "indexAll.js")).default;
var ChartShow = $__initTailRecursiveFunction(function() {
  return $__call(function() {
    "use strict";
    function ChartShow() {}
    return $__continuation($__createClass, null, [ChartShow, {
      construct: function(canvasEle) {
        this.width = canvasEle.width;
        this.height = canvasEle.height;
        this.canvasEle = canvasEle.getContext('2d');
        this.chart = new Chart(this.canvasEle);
        alert(this.chart);
      },
      setContent: function() {
        var data = {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            data: [65, 59, 90, 81, 56, 55, 40]
          }, {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: [28, 48, 40, 19, 96, 27, 100]
          }]
        };
        this.chart.PolarArea(data);
      }
    }, {}]);
  }, this, arguments);
})();
(function main() {
  var canvasId = document.querySelectorAll("#canvas-table"),
      chartObj = new ChartShow(canvasId);
  chartObj.setContent();
  alert(canvasId.id);
})();

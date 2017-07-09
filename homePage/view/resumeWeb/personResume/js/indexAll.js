/**
 * Created by tianjian on 17/7/5.
 */
//import './chart.js';
class ChartShow{
    construct(canvasEle){
        this.width=canvasEle.width;
        this.height=canvasEle.height;
        this.canvasEle=canvasEle.getContext('2d');
        this.chart=new Chart(this.canvasEle);
        alert(this.chart);
    }
    setContent(){
        var data = {
            labels : ["January","February","March","April","May","June","July"],
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    data : [65,59,90,81,56,55,40]
                },
                {
                    fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    data : [28,48,40,19,96,27,100]
                }
            ]
        };
        this.chart.PolarArea(data);

    }

}
(function main(){
    var canvasId=document.querySelectorAll("#canvas-table"),
      //  chartObj=new ChartShow(canvasId);
    //chartObj.setContent();
    //alert(canvasId.id);


})();
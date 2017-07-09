/**
 * Created by tianjian on 17/7/5.
 */
/*画技能图表*/
var ctx = document.getElementById("canvas-table").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["HTML", "CSS", "JS", "PHP", "ES6", "NodeJs",'C++'],
        datasets: [{
            label: '技能掌握程度',
            data: [80, 70, 85, 50, 60, 30,20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(23, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 19, 4, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
//画object表；
function canvasTable(elem,range){
    var ctx = elem.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["负责范围", "未负责"],
            datasets: [{
                label: '技能掌握程度',
                data: [range, 100-range],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',

                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
!(function main(){
    var object1=document.querySelector("#object-3"),
        object2=document.querySelector("#object-2"),
        object3=document.querySelector("#object-1");
    canvasTable(object1,97);
    canvasTable(object2,99);
    canvasTable(object3,55);
    //alert('ddd');
})();


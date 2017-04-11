(function(){
    function drawTriangle(id){
        var context=id.getContext('2d');
        context.beginPath();
        context.strokeStyle='rgba(9,99,12,0.9)';
        context.fillStyle='rgba(9,99,12,0.9)';
        context.lineTo(0,0);
        context.lineTo(120,15);
        context.lineTo(120,50);
        context.lineTo(0,0);
        context.closePath();
        context.fill();
        context.stroke();
    }
    var canvas=document.querySelector("#triangle-can");
    drawTriangle(canvas);
})();

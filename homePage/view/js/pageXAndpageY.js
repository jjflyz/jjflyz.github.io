/**
 * Created by tianjian on 17/6/17.
 */
!(function page(){
    function showPageXAndPageY(){
        var body=document.body;
        EventUtil.addEventHandler(body,'mousemove',function(event){
            var event=event||window.event,
                pageX=event.pageX,
                pageY=event.pageY;
            if(pageX==undefined){
                pageX=event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft);
            }
            if(pageY==undefined){
                pageY=event.clientY+(document.body.scrollLeft||document.documentElement.scrollLeft);
            }
            console.log('pageX: '+pageX+"  "+"pageY: "+pageY);
        });
    }


})();

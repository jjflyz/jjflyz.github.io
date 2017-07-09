/**
 * Created by tianjian on 17/6/17.
 */
!(function mouseWheel(){
    function getWheelDelta(event){
       event=event||window.event;
       if(event.wheelDelta){
           return (client.engine.opera&&client.engine.opera<9.3)?-event.wheelDelta:event.wheelDelta;
       }else{
           return -event.detail*40;
       }
    }
    function liuLanqiMes(){
        var navg=window.navigator;
        console.log('navigator.userAgent: '+navg.userAgent);
        console.log('navigator.appName: '+navg.appName);
        console.log('navigator.appVersion: '+navg.appVersion);
        console.log('navigator.appCodeName: '+navg.appCodeName);
        console.log('navigator.online: '+navg.onLine);
        console.log('version:   '+parseInt(navg.appVersion));
    }
    function mouseWheelEvent(){
        EventUtil.addEventHandler(document,'mousewheel',function(event){
           // event=event||window.event;
            //console.log(event.wheelDelta);
           // var detal=getWheelDelta(event);
            console.log(detal);
        });
    }
    //mouseWheelEvent();
    liuLanqiMes();
})();

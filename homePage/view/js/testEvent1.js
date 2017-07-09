/**
 * Created by tianjian on 17/6/16.
 */
!(function main(){
    var div=document.querySelector('#div-show');
    EventUtil.addEventHandler(div,'click',function(event){
        event=EventUtil.getEvent(event);
        var keys=new Array();
        if(event.shiftKey){
            keys.push("shift");
        }
        if(event.ctrlKey){
            keys.push("ctrl");
        }
        if(event.altKey){
            keys.push('alt');
        }
        if(event.metaKey){
            keys.push('meta');
        }
        console.log(keys.join(','));
    });
})();
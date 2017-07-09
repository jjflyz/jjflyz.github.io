/**
 * Created by tianjian on 17/6/19.
 */
var handler={
    message:"Event handler",
    handleClick:function(event){
        alert(this.message+":::"+event.type);
    }
};
function bind(fn,context){
    return function(){
        return fn.apply(context,arguments);
    };
}
(function main(){
    var divId=document.getElementById('div-id');
    //由于this的指向不是handler对象，所以无法访问到this.message;
    //EventUtil.addEventHandler(divId,'click',handler.handleClick);

    //通过闭包设置this，使this指向handler对象；
    // EventUtil.addEventHandler(divId,'click',function(event){
    //     handler.handleClick(event);
    // })

    //通过调用bind函数设置上下文；
    // EventUtil.addEventHandler(divId,'click',bind(handler.handleClick,handler));

    //ES5为每个函数定义了一个原生的bind函数；
    EventUtil.addEventHandler(divId,'click',handler.handleClick.bind(handler));

})();
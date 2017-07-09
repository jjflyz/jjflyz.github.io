/**
 * Created by tianjian on 17/7/5.
 */
var EventUtil={
    addEventHandler:function(elem,type,callback){
        if(elem.addEventListener){
            elem.addEventListener(type,callback,false);
        }else if(elem.attachEvent){
            elem.attachEvent('on'+type,callback,false);
        }else{
            elem['on'+type]=callback;
        }
    }
}
class Test{
    constructor(EventUtil){
        this.EventUtil=EventUtil;
    }
    setData(elem){
        this.elem=elem;
    }
    setClick(){
        this.EventUtil.addEventHandler(this.elem,'click',function(){
                window.location.reload();
        });
    }
    setMouseenter(callBack){
        this.EventUtil.addEventHandler(this.elem,'mouseenter',callBack);
    }
}
(function main(){
    var elemst=document.querySelectorAll('#circleCur');
    var elem=document.querySelector('#circleCur');
    var test1=new Test(EventUtil);
    var elem1=document.querySelector("#circleCur-1");
    var elem2=document.querySelector("#circleCur-2");
    var elemSpans=document.querySelectorAll(".circle-cur");
    elemst[Symbol.iterator]=Array.prototype[Symbol.iterator];
    //alert('dfdf');
    for( let ele of elemst){
        console.log(ele);
        test1.setData(ele,EventUtil);
        test1.setClick();
    }
    //设置鼠标事件；
    test1.setData(elem);
    test1.setMouseenter(function(){
       elem.style.visibility="visible";
    });
    test1.setData(elem1);
    test1.setMouseenter(function(){
       // alert('dsfsd');
       //elemSpans.item(1).style.visibility='visible';
        console.log(elemSpans);
    });

})();
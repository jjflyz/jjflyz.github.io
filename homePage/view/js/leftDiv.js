/**
 * Created by tianjian on 17/6/13.
 */
function ComputedCss(){
    this.learnComputedCss=function(element){
        var computedStyle=document.defaultView.getComputedStyle(element,null);
        console.log(computedStyle.width);
        console.log(computedStyle.height);
    };
    this.addCssText=function(element,cssText){
        element.style.cssText=cssText;
    };
    this.setPropValue=function(element,prop,value){
        element.style.setProperty(prop,value,'');
    };
    //IE不支持getComputedStyle()方法；
    this.IEComputedStyle=function(element){
        //currentStyle是个属性；
        var computedStyle=element.currentStyle;
        console.log("supported IE");
        console.log(computedStyle.width);
        console.log(computedStyle.height);
    }

}
function CssStyleSheet(){

}
CssStyleSheet.prototype.isSupportStyleSheets=function(){
    return document.implementation.hasFeature("StyleSheets","2.0");
};
CssStyleSheet.prototype.getElementPropertyValue=function(element,prop){
    return element.style.getPropertyValue(prop);
};
CssStyleSheet.prototype.getElementPropertyCssValue=function(element,prop){
    return element.style.getPropertyCSSValue(prop);
};
//操作样式表；
//得到样式表；
CssStyleSheet.prototype.getStyleSheets=function(){
  return document.styleSheets;
};
//得到样式表二
CssStyleSheet.prototype.getStyleSheetsOther=function(){
    var links=document.getElementsByTagName('link');
    var element=links[1];
    return element.sheet||element.stylesheet;
};
CssStyleSheet.prototype.getCssRulesAndStyle=function(){
    var sheet=this.getStyleSheets(),
        leftDivLink=sheet[1];
    //取得规则；
    var rules=leftDivLink.cssRules||leftDivLink.rules;
    var rule=rules[1];
    console.log(rule.style.cssText);
    console.log(rule.selectorText);
    console.log(rule.style.width);
    rule.style.width="400px";
    rule.style.backgroundColor="blue";
    return rule;
};
CssStyleSheet.prototype.deleteRule=function(){
    var rule=this.getCssRulesAndStyle();
    if(rule.deleteRule){
        rule.deleteRule(0);
    }else if(rule.removeRule){
        rule.removeRule(0);
    }

};
//动态的添加属性；
CssStyleSheet.prototype.insertStyle=function(){
    var style=document.createElement('style'),
        head=document.getElementsByTagName('head')[0];
    style.type="text/css";
    try{
        style.appendChild(document.createTextNode('body{ width:1000px; height:800px; background-color:yellow}'))
    }catch(e){
        style.cssText='body{ width:1000px; height:800px; background:yellow}';
    }
    head.appendChild(style);
};

//遍历DOM结构；
var TraverDom={
    isSuport:function(){
        console.log(document.implementation.hasFeature("Traversal","2.0"));
        console.log(typeof document.createNodeIterator=='function');
        console.log(typeof document.createTreeWalker=="function");
    },
    testIterator:function() {
        var div = document.querySelector('#show-id');
        var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, null, false);
        var node = iterator.nextNode();
        while (node !== null) {
            console.log(node.tagName);
            node = iterator.nextNode();
        }

    },
    filterFunc:function(node){
         return node.tagName.toLowerCase()=="a"?
                NodeFilter.FILTER_ACCEPT:
                NodeFilter.FILTER_SKIP;
    },
    testIteratorFilter:function(){
        var div=document.querySelector('#show-div');
        var iterator=document.createNodeIterator(div,NodeFilter.SHOW_ELEMENT,this.filterFunc,false);
        var node=iterator.nextNode();
        while(node!==null){
            console.log("filter:"+node.tagName);
            node=iterator.nextNode();
        }
    },
    testTreeWalker:function(){
        var div=document.querySelector("#show-div");
        var iterator=document.createTreeWalker(div,NodeFilter.SHOW_ELEMENT,null,false);
        var node=iterator.nextNode();
        while(node!==null){
            console.log("treeWalker:"+node.tagName);
            node=iterator.nextNode();
        }
    },
    testTreeWalkerFileter:function(){
        var filterFunc=function(node){
            //return node.tagName=="a"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
            return node.tagName=="a"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_ACCEPT;
        };
        var div=document.querySelector("#show-div");
        var iterator=document.createTreeWalker(div,NodeFilter.SHOW_ALL,filterFunc,false);
        var node=iterator.nextNode();
        while(node!==null){
            console.log("treeWalkerFilter "+node.tagName);
            node=iterator.nextNode();
        }
    },
    noFilterTreeWalker:function(){
        var div=document.querySelector("#show-div");
        var walker=document.createTreeWalker(div,NodeFilter.SHOW_ELEMENT,null,false);
        walker.firstChild();
        walker.nextSibling();
        var node=walker.firstChild();
        console.log(node.tagName);
        while(node!==null){
            console.log(walker.tagName);
            node=walker.nextSibling();
        }
    }

};
//事件处理程序；
var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type]=handler;
        }

    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type]=handler;
        }
    }

};
!(function main2(){
    var itemAll=document.querySelectorAll(".class1");
    function handler(){
        alert(this.innerHTML);
    }

    alert(itemAll.length);
    for(var i=0;i<itemAll.length;i++){
        EventUtil.addHandler(itemAll[i],'click',handler);
    }

})();

(function main(){
    var leftDiv=document.querySelector('.left'),
        rightDiv=document.querySelector('.right'),
        cssText="width:600px;height:200px;background-color:red;display:inline-block;float:left",
        computedObj=new ComputedCss(),
        cssStyleObj=new CssStyleSheet();
    computedObj.setPropValue(leftDiv,'float','left');
    computedObj.learnComputedCss(leftDiv);
    computedObj.addCssText(rightDiv,cssText);
    //computedObj.IEComputedStyle(leftDiv);
    console.log(cssStyleObj.isSupportStyleSheets());
    console.log("******************************************");
    var cssObj=new CssStyleSheet();
    cssObj.getCssRulesAndStyle();
    cssObj.insertStyle();
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    var traverObj=TraverDom;
    traverObj.isSuport();
    traverObj.testIterator();
    traverObj.testIteratorFilter();
    traverObj.testTreeWalker();
    traverObj.testTreeWalkerFileter();
    console.log("############################################");
    //traverObj.noFilterTreeWalker();

})();
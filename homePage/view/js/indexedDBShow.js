(function(){

    function getStyleSheetCss(element,attr){
        //兼容IE
       if(element.currentStyle){
            return element.currentStyle[attr];
        }else{
            //非IE
            return window.getComputedStyle(element,null)[attr];
        }

    }
    //区分浏览器；
    //有bug 无法检测出Opera与Chrome的区别；
    function whichOneBrowser(){
        var userAgent=window.navigator.userAgent;
        //var isOpera=window.navigator.appName.indexOf('opera')>-1;
        //alert(isOpera);
        if(userAgent.indexOf('Opera')>-1){
            return 'Opera';
        }else if(userAgent.indexOf('Firefox')>-1){
            return 'Firefox';
        }else if(userAgent.indexOf('Chrome')>-1){
            return 'Chrome';
        }else if(userAgent.indexOf('Safari')>-1){
            return 'Safari';
        };
        //判断恶心的IE；
        if(userAgent.indexOf('compatible')>-1&&userAgent.indexOf('MSIE')>-1&&!isOpera){
            return 'IE';
        }
    }
    //alert(whichOneBrowser());
    //设置位置；
    function setPosition(absoluteX,absoluteY){
        var canvasEle=document.querySelector("#triangle-can");
        canvasEle.style.left=absoluteX;
        canvasEle.style.top=absoluteY;
    }
    //将设置参数封装成函数；
    function setParamsFunc(elem,w,h,x,y){
        elem.style.position='absolute';
        elem.style.width=w;
        elem.style.height=h;
        elem.style.left=x;
        elem.style.top=y;
    }
    //设置right-document系列类的大小和位置；
    function setWidthAndHeightAndPosition(whichOne,elem,absoluteX,absoluteY){
        //alert(whichOne);
        switch(whichOne){
            case 0:
                setParamsFunc(elem,'550px','400px',absoluteX,absoluteY);
                break;
            case 1:
                setParamsFunc(elem,'600px','300px',absoluteX,'80px');
                break;
            case 2:
                setParamsFunc(elem,'600px','500px',absoluteX,absoluteY);
                break;
            case 3:
                setParamsFunc(elem,'600px','500px',absoluteX,absoluteY);
                break;
            case 4:
                setParamsFunc(elem,'600px','500px',absoluteX,absoluteY);
                break;
            case 5:
                setParamsFunc(elem,'600px','400px',absoluteX,absoluteY);
                break;
            case 6:
                setParamsFunc(elem,'500px','400px',absoluteX,'100px');
                break;
            case 7:
                setParamsFunc(elem,'500px','400px',absoluteX,absoluteY);
                break;
            case 8:
                setParamsFunc(elem,'500px','600px',absoluteX,absoluteY);
                break;
            case 9:
                setParamsFunc(elem,'600px','500px',absoluteX,'150px');
                break;
            case 10:
                setParamsFunc(elem,'500px','400px',absoluteX,'200px');
                break;
            default:
                break;
        }
    }
    //设置显示区的位置
    function showDivAbsolutePos(absoluteX,absoluteY,counts,whichOne){
        var divs=document.querySelectorAll(".right-document");
        for(var i=0;i<counts;i++){
            if(i==whichOne){
                divs[i].style.display='block';
                setWidthAndHeightAndPosition(whichOne,divs[i],absoluteX,absoluteY);
            }else{
                divs[i].style.display='none';
            }
        }
        // div.style.position='absolute';
        // div.style.left=absoluteX;
        // div.style.top=absoluteY;
    }
    //添加事件函数；
    function addEventToAelems(element,absoluteX,absoluteY,counts,whichOne){
        EventUtil.addEventHandler(element,'click',function(e){
            e.preventDefault();
            var absLeft=parseInt(absoluteX),
                absTop=parseInt(absoluteY),
                browser=whichOneBrowser();
            if(browser=='Safari'){
                setPosition(absoluteX,absoluteY);
                showDivAbsolutePos(absLeft+80+'px',50+'px',counts,whichOne);
            }else{
                setPosition((absLeft+20)+'px',absTop+'px');
                showDivAbsolutePos(absLeft+20+80+'px',50+'px',counts,whichOne);
            }

        });
    }
    function initFunc(){
        var divs=document.querySelectorAll(".right-document");
        for(var i=0;i<divs.length;i++){
            if(i==0){
                divs[0].style.display='block';
            }else{
                divs[i].style.display='none';
            }
        }

    }
    //遍历添加函数
    function setAllElemEvent(){
        var aElems=document.querySelectorAll('.left-title li a');
        for(var i=0;i<aElems.length;i++){
            switch(i){
                case 0:
                    addEventToAelems(aElems[0],'185px','180px',aElems.length,i)
                case 1:
                    addEventToAelems(aElems[1],'150px','220px',aElems.length,i);
                    break;
                case 2:
                    addEventToAelems(aElems[2],'150px','250px',aElems.length,i);
                    break;
                case 3:
                    addEventToAelems(aElems[3],'182px','280px',aElems.length,i);
                    break;
                case 4:
                    addEventToAelems(aElems[4],'182px','312px',aElems.length,i);
                    break;
                case 5:
                    addEventToAelems(aElems[5],'182px','342px',aElems.length,i);
                    break;
                case 6:
                    addEventToAelems(aElems[6],'182px','372px',aElems.length,i);
                    break;
                case 7:
                    addEventToAelems(aElems[7],'182px','402px',aElems.length,i);
                    break;
                case 8:
                    addEventToAelems(aElems[8],'182px','432px',aElems.length,i);
                    break;
                case 9:
                    addEventToAelems(aElems[9],'182px','462px',aElems.length,i);
                    break;
                case 10:
                    addEventToAelems(aElems[10],'214px','492px',aElems.length,i);
                    break;
                default:
                    break;
            }
        }
    }
    setAllElemEvent();
    initFunc();
})();

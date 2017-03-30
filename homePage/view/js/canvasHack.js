function CanvasHack(){
	var _strNum='11101110110000111110101',
		_canvasCon='',
		_fontSize=14,
		_canvas='',
		_width='',
		_height='',
		_column='',
		_drop=new Array(),
		_text=new Array();
	function _setText(){
		_text=_strNum.split("");	
		//alert(_text[0]);
	}
	function _setCanvas(){//设置canvas;
		_canvas=document.getElementById("canvas-id");
		_canvasCon=_canvas.getContext('2d');
		//_width=_canvas.style.width;
		//_height=_canvas.style.height;
		_width=90;
		_height=2090;
		_canvas.width=_width;
		_canvas.height=_height;
		//_width=parseInt(_width);
		//alert(_width);
		//_height=parseInt(_height);
		
	}
	function _setColumn(){//设置列数；
		_setText();
		_setCanvas();
		_column=_width/_fontSize;
	}
	function _setInitial(){//初始化
		_setColumn();
		for(let i=0;i<_column;i++){
			_drop[i]=1;	
		}
	}
	function _draw(){
	
		//alert(_width);
		_canvasCon.fillStyle="rgba(42,42,42,0.05)";	
		_canvasCon.fillRect(0,0,_width,_height);
		//文字颜色；
		_canvasCon.fillStyle="#0F0";
		//文字字体
		_canvasCon.font=_fontSize+'px arial';
		//逐行输出文字
		//alert(_drop.length);
		for(let i=0;i<_drop.length;i++){
			//var iCount=Math.floor(Math.random()*_text.length);
			//alert('ss');
			var txt=_text[Math.floor(Math.random()*_text.length)];
			_canvasCon.fillText(txt, i*_fontSize, _drop[i]*_fontSize);
			//_canvasCon.fillText(txt,30,30);
			if(_drop[i]*_fontSize > _height || Math.random() > 0.95)
            	_drop[i] = 0;
			_drop[i]++;
		}
	}
	return {
		test:function(){
			_setInitial();
			//_draw();	
			setInterval(_draw,33);
		}
	}
}

var test=new CanvasHack();
test.test();
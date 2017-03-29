var EventUtil={
	addEventHandler:function(element,type,listener){
		if(element.addEventListener){
			element.addEventListener(type,listener,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,listener);	
		}else{
			element['on'+type]=listener;	
		}
	},
	removeEventHandler:function(element,type,listener){
		if(element.removeEventListener){
			element.removeEventListener(type,listener,false);	
		}else if(element.detachEvent){
			element.detachEvent('on'+type,listener);	
		}else{
			element['on'+type]=null;	
		}
	}
	
}
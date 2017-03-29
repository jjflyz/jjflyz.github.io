function GetOrPost(){
	var _url='',
		_postData='';
	//创建私有XHR对象
	function _createXHR(){
		return new XMLHttpRequest();	
	}
	function _setUrl(url){
		_url=url;
	}
	//私有为get方式添加参数
	function _addGetParam(name,param){
		_url+=(_url.indexOf("?")===-1)?'?':'&';
		_url+=encodeURIComponent(name)+'='+encodeURIComponent(param);
		//return url;	
	}
	//私有get方法
	function _doGet(){
		var xhr=_createXHR();
		//xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState===4){
				if((xhr.status>=200&& xhr.status<300)||xhr.status===304){
					alert('sucess');
					alert(xhr.responseText);	
				}else{
					alert('unsucess'+xhr.status);	
				}
			}
		}
		
		xhr.open("get",_url,true);
		xhr.send(null);
	}
	//给私有的post方法添加参数；
	function _addPostParam(name,param){
		if(_postData===''){
			_postData=name+"="+param;	
		}else{
			_postData+=(_postData.indexOf("&")===-1)?"&":'';
			_postData+=name+"="+param;	
		}
	}
	//私有post方法
	function _doPost(callBack){
		var xhr=_createXHR();
		xhr.onreadystatechange=function(){
			if(xhr.readyState===4){
				if((xhr.status>=200&&xhr.status<300)||xhr.status===304){
					alert('success');
					alert(xhr.responseText);
					callBack(xhr.responseText);
				}else{
					alert('unsuccess'+xhr.status);	
				}
			}
		}
		xhr.open('post',_url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(_postData);
	}
	return {
		setUrl:function(url){
			_setUrl(url);
		},
		addGetParam:function(name,param){
			_addGetParam(name,param);	
		},
		doGet:function(){
			_doGet();
		},
		addPostParam:function(name,param){
			_addPostParam(name,param);	
		},
		doPost:function(callBack){
			_doPost(callBack);
		}
	}
}
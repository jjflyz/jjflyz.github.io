var url=require('url'),
	querystring=require('querystring');

function PostOrGetMethod(){
	function _postMethod(req,res,callBack){
		var postData="";
		req.setEncoding('utf-8');
		req.addListener('data',function(chunk){
			postData+=chunk;	
		});
		req.addListener('end',function(){
			var params=querystring.parse(postData);
			callBack(params);
		});
	}
	function _getMethod(){
		
	}
	return {
		postMethod:function(req,res,callBack){
			_postMethod(req,res,callBack);	
		},
		getMethod:function(){
			_getMethod();	
		}
		
	}
	
}
exports.postOrGetServer=new PostOrGetMethod();

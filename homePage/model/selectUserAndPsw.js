//	引入连接mysql	的模块；
var conn=require('./connMysql');
function selectUserAndPsw(){
	var DATABASE='userTable',
		TABLE='user',
		_client='',
		_sql='',
		_userName='',
		_password='',
		_jsonObj='';
	function _setSql(sql){
		_sql=sql;
		//_sql="SELECT* FROM "+TABLE;
	}
	function _setData(){
		if(_userName!=''&&_password!=''){
			var jsonStr='{"user":"'+_userName+'","psw":"'+_password+'"}';
			 _jsonObj=JSON.parse(jsonStr);
			// console.log(_jsonObj);
		}
	}
	//无法得到值，回调函数未执行完；所以无法获得_jsonObj
	function _returnData(){
		console.log(_jsonObj.user);
		return _jsonObj;	
	}
	function _selectData(callBack){
		_client=conn.connMysqlObj.conn();
		_client.connect();
		_client.query('use userTable');
		_client.query(_sql,function(err,results,fields){
			if(err){
				console.log('exec sql error');
				throw(err);	
			}
			if(results){
				//console.log(fields);
				for(let i=0;i<results.length;i++){	
					//console.log("%s\t%s",results[i].userName,results[i].password);
					_userName=results[i].userName;
					_password=results[i].password;
					//console.log(_userName);
				}
			}
			_client.end();
			//非阻塞式，必须将此函数的调用写在回调函数中；
			_setData();
			callBack(_jsonObj);
		}); 
			
	}
	return {
		setSql:function(sql){
			_setSql(sql);
		},
		selectData:function(callBack){
			_selectData(callBack);		
		},
		returnData:function(){
			return _returnData();
		}
	}
}

//var data=new selectUserAndPsw();
//data.setSql("select *from user where userName='tianjian'");
//data.selectData(function(jsonObj){
	//console.log(jsonObj);
//});
//data.returnData();
exports.selectSql=new selectUserAndPsw();
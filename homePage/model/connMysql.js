//引入mysql数据库；
var mysql=require('mysql');
//建立连接数据库的类；
function ConnMysql(){
	var DATABASE='userTable',
		USER='root',
		PSW='root',
		_client='';
	function _conn(){
		 _client=mysql.createConnection({
			user:'root',
			password:'root'
		});
	}
	return {
		conn:function(){
			_conn();
			return _client;	
		}
	}
}
var obj=new ConnMysql();
exports.connMysqlObj=obj;
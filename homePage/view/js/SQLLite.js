window.onload=function(){
$("body").css("width",$(window).width());
	//数据库操作类；
var dataObj=(function(){
	var instance;
	//数据库操作类；
	function DataSet(){
		var _db=null;
		//初始化；参数tx代表事务；
		function _initial(){
			//创建数据库；
			_db=openDatabase('MyData','1.0','my database', 102400);	
			//创建表
			_db.transaction(function(tx){
				tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT,time INTEGER)',[]);
			});
		}
		function _error(tx,error){
			alert(error.message);	
		}
		function _success(tx,result){
			console.log('Insert Success');
		}
		//保存当前的时间；
		function _setTime(){
			var timeObj=new Date(),
				time='';
			time=timeObj.getTime();
			time=timeObj.toUTCString(time);
			return time;
		}
		//保存数据；
		function _saveData(name,message){
			var time='';
			time=_setTime();
			_db.transaction(function(tx){
				tx.executeSql('INSERT INTO MsgData VALUES(?,?,?)',[name,message,time],_success,_error);	
			});
		}
		//查询数据；
		function _selectData(name,callBack){
			_db.transaction(function(tx){
				tx.executeSql("SELECT name,message,time FROM MsgData WHERE name=?",[name],function(tx,result){
					var data='<tr><td>Name</td><td>Message</td><td>Time</td></tr>';
					//对于多行数据用for
					for(var i=0;i<result.rows.length;i++){
						//alert(result.rows.item(i).name+result.rows.item(i).message);	
						data+='<tr><td>'+result.rows.item(i).name+'</td><td>'+result.rows.item(i).message+'</td><td>'+result.rows.item(i).time+'</td>';
					}
					//判断回调函数是否存在；存在则执行；
					if(typeof callBack=='function'){
						callBack(data);	
					}
				},_error);	
			});	
		}
		//删除表中所有数据；
		function _removeAllDataFromDBTable(){
			console.log(_db);
			_db.transaction(function(tx){
				//对于删除语句不能用？代替索引字段；
				tx.executeSql("Delete from Msgdata where 1=1");	
				//tx.executeSql('drop table if exists Msgdata');
			});
		}
		//公用方法；
		return{
			saveData:function(name,message)	{
				_initial();
				_saveData(name,message);	
			},
			selectData:function(name,callBack){
				_initial();
				_selectData(name,callBack);
			},
			removeAllDataFromDBTable:function(){
				_initial();
				_removeAllDataFromDBTable();
			}
		};
	}
	//设置单例模式；
	return{
		getInstance:function(){
			if(!instance){
				instance=new DataSet();	
			}
			return instance;
		}
	};
})();
//主函数；
(function main(dataObj){
	var dataBase=dataObj.getInstance(),
		name=document.querySelector("#name"),
		message=document.querySelector("#memo"),
		inputId=document.querySelector("#saveId"),
		tableShow=document.querySelector("#dataTable"),
		searchBtn=document.querySelector("#searchBtn"),
		searchId=document.querySelector("#searchId");
	inputId.addEventListener('click',function(){
		var nameStr=name.value,
			messageStr=message.value;
		dataBase.saveData(nameStr,messageStr);
	},false);
	searchBtn.addEventListener('click',function(){
		var searchStr=searchId.value;
		dataBase.selectData(searchStr,function(data){
			tableShow.innerHTML=data;
		});
	},false);
})(dataObj);
	
};


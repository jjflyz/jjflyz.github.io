/**
 * Created by tianjian on 17/4/4.
 */
window.onload=function(){
    //设置兼容性；
    (function setIndexedDB(){
        window.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
        window.IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction||window.mozIDBTransaction||window.msIDBTransaction;
        window.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.mozIDBKeyRange||window.msIDBKeyRange;
        window.IDBCursor=window.IDBCursor||window.webkitIDBCursor||window.mozIDBCursor||window.msIDBCursor;
    })();
    //单例模式；
    var indexedDBInstance=(function(){
        var instance;
        //indexedDB类
        function IndexedDB(){
            var _dbName;
            var _dbVersion;
            var _idb;
            //创建indexedDB类;
            function _createOrOpenIndexedDB(name,ver){
                _dbName=name;
                _dbVersion=ver;
                var dbConnect=indexedDB.open(_dbName,_dbVersion);
                //连接成功时的响应事件；
                dbConnect.onsuccess=function(e){
                    _idb=e.target.result;

                    alert('数据库创建成功');
                    //开启事务；
                    var tx=_idb.transaction(['Users'],'readwrite');
                    var store=tx.objectStore('Users');
                    data={
                        userName:'tianjian2',
                        address:'dizhi3'
                    }
                   // _saveData(data,store);
                   // var idx=store.get('userName');
                   // _getData(store);
                   // _getDataFormIndex(store);
                    //_searchDataByMainKey(store);
                    _allCount(store);
                    _searchDataByIndex(store);


                }
                dbConnect.onerror=function(){
                    alert('数据库连接失败');
                }
                //更新数据库版本；
                dbConnect.onupgradeneeded=function(e){
                    //e.target.result 为一个IDBDatabase对象，代表成功的连接到数据库；
                    _idb=e.target.result;
                    //e.target.transaction是一个IDBTransaction事务对象，这里代表的是版本更新事务；
                    var tx=e.target.transaction;
                    var oldVer=e.oldVersion;
                    var newVer=e.newVersion;
                    alert('数据库版本更新成功，旧的版本号是:'+oldVer+',新的版本号是:'+newVer);
                    //创建仓库；
                    var name='Users';
                    var optionalParameters={
                        keyPath:'userId',
                        autoIncrement:true
                    }
                    var store=_idb.createObjectStore(name,optionalParameters);
                    alert('创建仓库成功');
                    //创建索引；
                    //索引名；
                    var indexName='userName';
                    //数据库中的那个字段为索引；
                    var keyPath='userName';
                    var optionalParameters={
                        unique:false,
                        multiEntry:false
                    }
                    var idx=store.createIndex(indexName,keyPath,optionalParameters);
                    alert('创建索引成功');

                }
            }
            //添加数据；
            function _saveData(data,store){
                var req=store.put(data);
                req.onsucess=function(){
                    alert('数据保存成功');
                }
                req.onerror=function(){
                    alert('保存数据失败');
                }
            }
            //获取数据，用userId；
            function _getData(store){
                var idx=store.get(1);
                //var req=idx.get('tianjian');
                idx.onsuccess=function(){
                    //alert(this.result.userName)
                    if(this.result==undefined){
                        alert('没有符合条件的数据');
                    }else{
                        alert(this.result.address);
                        document.write(this.result.address);
                    }

                }
                idx.onerror=function(){
                    alert('获取数据出错');
                }
            }
            //通过索引得到数据；
            function _getDataFormIndex(store){
                var idx=store.index('userName');
                var req=idx.get('tianjian');
                req.onsuccess=function(){
                    if(this.result==undefined){
                        alert('没有符合条件的数据');
                    }else{
                        alert(this.result.address)
                        document.write(this.result.address);
                    }
                }
                req.onerror=function(){
                    alert('获取数据出错');
                }

            }
            //根据主键值检索数据（数据范围）；
            function _searchDataByMainKey(store){
                var range=IDBKeyRange.bound(1,2);
                var direction='next';
                var req=store.openCursor(range,direction);
                req.onsuccess=function(){
                    var cursor=this.result;
                    if(cursor){
                        document.write('检索到一条数据，用户名为'+cursor.value.userName+'<br>');
                        cursor.continue();
                    }else{
                        document.write('检索结束');
                    }
                }
                req.onerror=function(){
                    alert('检索数据失败');
                }

            }
            //根据索引来检索数据（数据范围）；
            function _searchDataByIndex(store){
                var idx=store.index('userName');
                var range=IDBKeyRange.bound('tianjian','tianjian2');
                var direction='next';
                var req=idx.openCursor(range,direction);
                req.onsuccess=function(){
                    var cursor=this.result;
                    if(cursor){
                        document.write('检索到一条数据，用户名为'+cursor.value.userName+'<br>');
                        cursor.continue();
                    }else{
                        document.write('检索结束');
                    }
                }
                req.onerror=function(){
                    alert('检索数据失败');
                }
            }
            //复合索引来查询，前提是创建的索引是复合型的；
            /*
            * 在更新数据库事件中创建复合索引
            * indexName='userNameAndAddress';
            * keyPath=['userName','address'];
            */
            function _searchDataMaxIndex(store){
                var idx=store.index('userNameAndAddress');
                var req=idx.get(['tianjian','dizhi1']);
                req.onsuccess=function(){
                    //var res=this.result;
                    if(this.result==undefined){
                        document.write('没有符合要求的数据');
                    }else {
                        document.write('检索到一条数据，用户名为'+this.result.userName);
                    }
                }
            }
            //统计对象仓库中的数据数量；
            function _allCount(store){
                var req=store.count();
                req.onsuccess=function(){
                    document.write('该仓库中共有'+req.result+'条');
                }

            }
            //删除数据库
            function _deleteDatabase(name){
                indexedDB.deleteDatabase(name);
            }

            //公有方法；
            return{
                createOrOpenIndexedDB:function(name,ver){
                    _createOrOpenIndexedDB(name,ver);
                },
                deleteDatabase:function(name){
                    _deleteDatabase(name);
                }
            }
        }
        return{
            getInstance:function(){
                if(!instance){
                   instance=new IndexedDB();
                }
                return instance;
            }
        }
    })();

    //main function;
    (function main(){
        var indexed=indexedDBInstance.getInstance();
        indexed.createOrOpenIndexedDB('indexedDBTest4',20170405);
        //indexed.deleteDatabase('indexedDBTest');
    })();
}

/**
 * Created by tianjian on 17/4/5.
 */
(function(){
    //设置兼容型；
    window.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
    window.IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction||window.mozIDBTransaction||window.msIDBTransaction;
    window.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.mozIDBKeyRange||window.msIDBKeyRange;
    window.IDBCursor=window.IDBCursor||window.webkitIDBCursor||window.mozIDBCursor||window.msIDBCursor;
    //单例模式和模块模式结合；
    var indexDB=(function(){
        var instance;
        //indexedDB类；
        function IndexedDBClass(){
            //创建数据库；
            var _openDB,
                _arrData=new Array();
            function _createOrOpenDB(dbName,dbVersion){
                _openDB=indexedDB.open(dbName,dbVersion);
            }
            //更新数据库；
            /*
             *参数说明；
             * name仓库名；
             * mainKey仓库主键
             * isAutoIncrement自动增长
             * indexName索引名（与数据库中的字段名一致）
             * isUnique唯一型；
             * isMultiEntry是否多对一；
             */
            function _upgradeneededDB(name,mainKey,isAutoIncrement,indexName,isUnique,isMultiEntry){
                _openDB.onupgradeneeded=function(e){
                    //e.target.result是一个IDBDatabase对象；
                    var idbDB=e.target.result,
                    //e.target.transaction是一个IDBTransaction对象；
                        tx=e.target.transaction,
                    //创建仓库；
                        optionalParameters={
                            keyPath:mainKey,
                            autoIncrement:isAutoIncrement
                        },
                        optionalIndexParams={
                            unique:isUnique,
                            multiEntry:isMultiEntry
                        };
                    var store=idbDB.createObjectStore(name,optionalParameters);
                    store.createIndex(indexName,indexName,optionalIndexParams);
                }
            }
            //保存数据；
            /*
            *data是对象字面量形式；
            */
            function _setSaveData(data){
                _arrData.push(data);
            }
            /*
            * storeName是仓库名；
            * readOrWrite设置读写性
            */
            function _saveData(storeName,readOrWrite){
                _openDB.onsuccess=function(e){
                    var idb=e.target.result;
                    //事务
                    var tx=idb.transaction([storeName],readOrWrite);
                    //选择一个存储的仓库；
                    var store=tx.objectStore(storeName);
                     for(var i=0;i<_arrData.length;i++){
                         store.add(_arrData[i]);
                     }
                     _closeDB(idb);
                }
            }
            //通过索引检索数据；
            /*
            * indexName 创建时的索引名
            * indexValue 检索值
            * callBack 回调函数
            */
            function _searchDataByIndex(indexName,indexValue,storeName,readOrWrite,callBack){
                _openDB.onsuccess=function(e){
                    var idb=e.target.result,
                        tx=idb.transaction([storeName],readOrWrite),
                        store=tx.objectStore(storeName),
                        idx=store.index(indexName),
                        req=idx.get(indexValue);
                    req.onsuccess=function(){
                        if(this.result==undefined){
                            alert('没有符合的条件的数据!');
                        }else{
                            callBack(this.result);
                        }
                    }
                    _closeDB(idb);
                }
            }
            //通过索引和游标检索；
            /*
            * indexRange1 索引上限
            * indexRange2 索引下限
            * direction 索引方向
            */
            function  _searchDataByIndexCursor(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack){
                _openDB.onsuccess=function(e){
                    var idb=e.target.result,
                        tx=idb.transaction([storeName],readOrWrite),
                        store=tx.objectStore(storeName),
                        idx=store.index(indexName),
                        range=IDBKeyRange.bound(indexRange1,indexRange2),
                        req=idx.openCursor(range,direction);
                    req.onsuccess=function(){
                        var cursor=this.result;
                        if(cursor){
                            callBack(cursor.value);
                            cursor.continue();
                        }else{
                            console.log('search over');
                        }
                    }
                    _closeDB(idb);

                }
            }
            //通过索引游标来修改数据库中的值
            function _changeDataByIndexCursor(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack){
                _openDB.onsuccess=function(e){
                    var idb=e.target.result,
                        tx=idb.transaction([storeName],readOrWrite),
                        store=tx.objectStore(storeName),
                        range=IDBKeyRange.bound(indexRange1,indexRange2),
                        idx=store.index(indexName),
                        req=idx.openCursor(range,direction);
                    req.onsuccess=function(){
                        var cursor=this.result;
                        if(cursor) {
                            callBack(cursor);
                            cursor.continue();
                        }else{
                            console.log('chage over');
                        }
                    }
                    _closeDB(idb);
                }
            }
            //通过索引游标来修改数据库中的值；
            function _deleteDataByIndexCursor(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack){
                _openDB.onsuccess=function(e){
                    var idb=e.target.result,
                        tx=idb.transaction([storeName],readOrWrite),
                        store=tx.objectStore(storeName),
                        idx=store.index(indexName),
                        range=IDBKeyRange.bound(indexRange1,indexRange2),
                        req=idx.openCursor(range,direction);
                    req.onsuccess=function(){
                        var cursor=this.result;
                        if(cursor){
                            if(typeof callBack=='function'){
                                callBack(cursor);
                            }
                            cursor.delete();
                            cursor.continue();
                        }else{
                            console.log('delete Over');
                        }
                    }
                    _closeDB(idb);
                }
            }
            //关闭数据库；
            function _closeDB(idb){
                idb.close();
            }
            //删除数据库；
            function _deleteDatabase(dbName){
                indexedDB.deleteDatabase(dbName);
            }

            //公用函数；
            return{
                createOrOpenDB:function(dbName,dbVersion){
                    _createOrOpenDB(dbName,dbVersion);
                },
                upgradeneededDB:function(name,mainKey,isAutoIncrement,indexName,isUnique,isMultiEntry) {
                    _upgradeneededDB(name, mainKey, isAutoIncrement, indexName, isUnique, isMultiEntry);
                },
                setSaveData:function(data){
                   _setSaveData(data);
                },
                saveData:function(storeName,readOrWrite) {
                    _saveData(storeName, readOrWrite);
                },
                searchDataByIndex:function(indexName,indexValue,storeName,readOrWrite,callBack){
                    _searchDataByIndex(indexName,indexValue,storeName,readOrWrite,callBack)
                },
                searchDataByIndexCursor:function(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack){
                    _searchDataByIndexCursor(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack);
                },
                changeDataByIndexCursor:function(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack){
                    _changeDataByIndexCursor(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack);
                },
                deleteDataByIndexCursor:function(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack){
                    _deleteDataByIndexCursor(storeName,readOrWrite,indexName,indexRange1,indexRange2,direction,callBack);
                },
                deleteDatabase:function(dbName){
                    _deleteDatabase(dbName);
                }
            }
        }

        return{
            getInstance:function(){
                if(!instance){
                   instance=new IndexedDBClass();
                }
                return instance;
            }
        }
    })();

    /*测试数据*/
    // var idxDBObj=indexDB.getInstance();
    // //alert(idxDBObj);
    // idxDBObj.createOrOpenDB('indexedDB',20170406);
    // idxDBObj.upgradeneededDB('Users','userId',true,'userName',false,false);
    // var data1={
    //     userName:'tianjian',
    //     password:'123'
    // };
    // var data2={
    //     userName:'chengliang',
    //     password:'456'
    // };
    // var data3={
    //     userName:'dacao',
    //     password:'789'
    // };
    // var storeName='Users';
    // var readOrWrite='readwrite';
    // // idxDBObj.setSaveData(data1);
    // // idxDBObj.setSaveData(data2);
    // // idxDBObj.setSaveData(data3);
    // // idxDBObj.saveData(storeName,readOrWrite);
    // // //idxDBObj.deleteDatabase('indexedDB1');
    // // idxDBObj.searchDataByIndex('userName','tianjian','Users','readwrite',function(result){
    // //     document.write(result.userName+'||'+result.password+'<br>')
    // // });
    // // idxDBObj.searchDataByIndexCursor('Users','readwrite','userName','tianjian','tianjian','next',function(result){
    // //     document.write('userName:'+result.userName+'--'+'password:'+result.password+'<br>');
    // // });
    // // idxDBObj.changeDataByIndexCursor('Users','readwrite','userName','chengliang','dacao','next',function(cursor){
    // //     // cursor.update({
    // //     //     userName:'tianjian',
    // //     //     password:'tianjian'
    // //     // });
    // //     cursor.update({
    // //         userName:cursor.key,
    // //         password:'tianjian',
    // //         userId:cursor.value.userId
    // //     });
    // //     //alert(cursor.value.userId);
    // // });
    // idxDBObj.deleteDataByIndexCursor('Users','readwrite','userName','dacao','daocao','next',function(cursor){
    //     document.write('userName:'+cursor.value.userName+'<br>');
    // });

})();

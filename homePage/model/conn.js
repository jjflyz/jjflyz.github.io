// JavaScript Document
var mysql = require('mysql');  
      
var TEST_DATABASE = 'userTable';  
var TEST_TABLE = 'user';  
  
//创建连接  
var client = mysql.createConnection({  
  user: 'root',  
  password: 'root',  
});  

client.connect();
client.query("use " + TEST_DATABASE);

client.query(  
  'SELECT * FROM '+TEST_TABLE,  
  function selectCb(err, results, fields) {  
    if (err) {  
      throw err;  
    }  
      
      if(results)
      {
          for(var i = 0; i < results.length; i++)
          {
              console.log("t%s\t%s",  results[i].userName, results[i].password);
          }
      }    
    client.end();  
  }  
)
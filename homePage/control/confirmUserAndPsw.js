// JavaScript Document
var fs=require('fs');		
	getUserPsw=require('../model/selectUserAndPsw'),
	serverGetPost=require('./postOrGetServer');
exports.userPsw=function(req,res,mainDir){
	serverGetPost.postOrGetServer.postMethod(req,res,function(param){
		console.log(param);
		getUserPsw.selectSql.setSql("select *from user where userName='"+param.user+"'");
		getUserPsw.selectSql.selectData(function(result){
			//console.log(result);
			var viewPath=mainDir+"/view",
				photoWellHtml=viewPath+"/html/"+"photoWell.html";
			if(result.user=='tianjian'){
				//console.log(result.user);
				//var photoWellPage=fs.readFileSync(photoWellHtml);	
				res.writeHead(200,{"Content-Type":"text/plain"});
				//res.write(photoWellPage,'utf-8');
				res.end('userRight');
			}
		});
	});
}
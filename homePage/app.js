var http=require('http'),
	url=require('url'),
	fs=require('fs'),
	staticFile=require('./control/loadStatic'),
	userPswCheck=require('./control/confirmUserAndPsw');
	querystring=require('querystring');
//默认读取的文件；
function defaultIndex(req,res){
	var realPath=__dirname+"/view/html/index.html";
	var indexPage=fs.readFileSync(realPath);	
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end(indexPage);
}
//设置路由；
function setRouter(pathname,req,res){
	var mainDir=__dirname;
	switch(pathname){
		case '/':
			defaultIndex(req,res);
		break;
		case '/index':
			defaultIndex(req,res);
		break;
		case '/favicon.ico':
			return;
		break;
		case '/confirmUserPsw':
			userPswCheck.userPsw(req,res,mainDir);
		break;
		default:
			staticFile.staticFileObj.loadStaticFile(pathname,res,mainDir);
		break;	
	}	
}
http.createServer(function(req,res){
	//console.log('hello');
	var pathname=url.parse(req.url).pathname;
	console.log(pathname);
	setRouter(pathname,req,res);
}).listen(3000,'127.0.0.1');
console.log('server is running');
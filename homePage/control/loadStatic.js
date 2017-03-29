var path=require('path'),
	fs=require('fs');
//设置全局变量；
var BASE_DIR=__dirname,
	CONF=BASE_DIR+'/conf/';
	//STATIC=BASE_DIR+'/view';

function LoadStatic(){
	function _getConfFile(){
		var mmie_type={};
		var strFile=fs.readFileSync(CONF+'mmie_type.json','utf8');
		mmie_type=JSON.parse(strFile);
		return mmie_type;	
	}
	function _loadStaticFile(pathname,res,mainDir){
		var mmieConf=_getConfFile();
		var extname=path.extname(pathname);
		extname=extname?extname.slice(1):'';
		var mmieType=mmieConf[extname]?mmieConf[extname]:'text/plain';
		var realPath=mainDir+'/view'+pathname;
		console.log(realPath+"===="+mmieType);
		
		fs.exists(realPath,function(exists){
			if(exists){
				fs.readFile(realPath,'binary',function(err,file){
					if(err){
						res.writeHead(500,{"Content-Type":"text/plain"});
						res.end();	
					}else{
						res.writeHead(200,{"Content-Type":mmieType});
						//一定要加入binary二进制写入，不然图片无法加入；
						res.write(file,'binary');
						res.end();	
					}
					
				});	
				
			}else{
				res.writeHead(404,{"Content-Type":"text/plain"});
				res.end();	
			}
		});	
	}
	//公有方法
	return {
		loadStaticFile:function(pathname,res,mainDir){
			_loadStaticFile(pathname,res,mainDir);	
		}
		
	}
}

var staticObj=new LoadStatic();
exports.staticFileObj=staticObj;
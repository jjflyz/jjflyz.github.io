// JavaScript Document
$(document).ready(function(e){
	$("body").css("width", $(window).width()); 
	$('.set-main-photo').mouseenter(function(){
		$('.text-div').show(1000);
	});
	$('.set-main-photo').mouseleave(function(){
		$('.text-div').hide(1000);
	})
	$('.text-span a').on('click',function(){
		var path='https://mp.weixin.qq.com/s?__biz=MzI3MDA5ODExNA==&mid=2650067135&idx=2&sn=68d33e54d71caaf59755ae37553f7d4e&chksm=f2d63b12c5a1b2048ed198538f14e592fe4232975974da5aa124cb66b8d063ff9b0be04c0f77&mpshare=1&scene=1&srcid=03201VB7JnFgL4f3phcWZj3m&key=36445014435f49895368e3bf249b0cc75c0a33b2a91262054612cce682fab914f918e19b01e9fbbc3a66a413359961a16e8103d22407742bf9381f69cf0c3931569c203b5402030db442cfc6e6c269bf&ascene=0&uin=NjI1ODE2OTAw&devicetype=iMac+MacBookPro11%2C4+OSX+OSX+10.11.6+build(15G1217)&version=12020010&nettype=WIFI&fontScale=100&pass_ticket=KWjiQrBbuMtbTMaZkb7JPX2xF5e5SOkgqXRL3fwQExh73RrcCgJVNtsrNLnkgqcX';
		$(this).attr('href',path)	
	});
	//鼠标放在圆圈上变边框颜色；
	function changeCircleBorderColor(circle){
		circle.addEventListener('mouseenter',function(){
			circle.style.borderColor='#FFFFFF';	
		},false);
		circle.addEventListener('mouseleave',function(){
			this.style.borderColor='#515151';	
		},false);
	}
	//添加circle
	function setCircleDistance(){
		var arr=document.getElementsByClassName('circle');
		var distance=290;
		for(let i=0;i<arr.length;i++){
			arr[i].style.top=(45+distance*i)+'px';
			changeCircleBorderColor(arr[i]);
		}
	}
	//canvas画圆
	function canvasCircle(){
		var myCanvas=document.getElementById("circle-music");
		if(!myCanvas.getContext){
			alert("no support canvas");
			return;
		}
		var ctx=myCanvas.getContext('2d');
		ctx.beginPath();
		ctx.strokeStyle='black';
		var circle={
			x:100,
			y:80,
			r:50
		};
		ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2,true);
		ctx.stroke();
		//alert(ctx);
	}
	//旋转图片；
	function transformImage(){
		var tran_div=document.getElementById("musicImage");
		var aduioElement=document.getElementById("audio-id");
		var i=0;
		start=setInterval(function(){
			i++;
			if(i==360){
				i=0;	
			}
			$("#musicImage").css('transform','rotate('+i+'deg)');
		},10);	
	}
	
	//判断播放；
	function playOrNot(){
		var audioElement=document.getElementById("audio-id");
		var pauseOrPlay=document.getElementById("pausePlay");
		//
		play='yes';
		//pauseOrPlay.style.backgroundImage='url(../img/pause.ico)';
		pauseOrPlay.innerHTML='play';	
		pauseOrPlay.addEventListener('click',function(){
			if(play=='yes'){
				pauseOrPlay.innerHTML='stop';
				audioElement.play();
				transformImage();
				play='no';
			}else{
				play='yes';
				pauseOrPlay.innerHTML='play';
				audioElement.pause();
				clearInterval(start);
			}
		},false);
	}
	//显示歌曲信息
	function musicInfo(){
		var audioElement=document.getElementById("audio-id");
		var musicInfoLi=document.getElementsByClassName('music-info-list');
		var src=audioElement.src;
		var arr=new Array();
		var arrName=new Array();
		src=decodeURIComponent(src);
		arr=src.split('/');
		var i=arr.length-1;
		//alert(arr[i]);
		arrName=arr[i].split('-');
		musicInfoLi[0].innerHTML='歌手：'+arrName[0];
		musicInfoLi[1].innerHTML='歌名：'+arrName[1];
		
	}
	//导航栏btn绑定事件
	function bindBtn(){
		var btn1=document.querySelector(".btn-one");
		btn1.addEventListener('click',function(e){
			window.location="duoLanBuJu.html";	
		},false);	
	}
	//主函数入口；
	!(function(){
		setCircleDistance();
		playOrNot();
		musicInfo();
		bindBtn();
	})();
	
})
!(function(){
		//alert(subId);
	var subId=document.getElementById('submit-id'),
		userText=document.getElementById('user-id'),
		pswText=document.getElementById('psw-id');
	function addEventAndSubmit(){
		EventUtil.addEventHandler(subId,'click',function(){
			var userValue=userText.value,
			pswValue=pswText.value;	
			alert(userValue);
			//alert('sfs');
			var getOrPost=new GetOrPost();
			getOrPost.setUrl("http://127.0.0.1:3000/confirmUserPsw");
			getOrPost.addPostParam('user',userValue);
			getOrPost.addPostParam('psw',pswValue);
			getOrPost.doPost(function(result){
				if(result=='userRight'){
					//window.location="html/photoWell.html";
					//window.location="html/mainPage.html";
					//将跳转页面设置为照片墙；
					window.location="html/photoWell.html";
				}
			});
		});
	}
	//addEventAndSubmit();
	EventUtil.addEventHandler(subId,'click',function(){
		window.location="mainPage.html";
	});
		
})();
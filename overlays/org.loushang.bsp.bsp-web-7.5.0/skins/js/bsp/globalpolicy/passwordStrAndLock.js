
$(function(){
	
	$("#saveForm").uValidform({
	    btnSubmit:"#saveVal",
	    datatype:{ 
	        "validIsPositiveInt":validIsPositiveInt,
	        "validIsInt":validIsInt,
	        "pwdMaxLengthChk": pwdMaxLengthChk
	    },
	    
	    //表单验证完成后的回调函数
	    callback:function(form){
		   	$("#saveVal").click(save());
		    }
	    
	});
	
	//验证密码最大长度、是否为正整数
	function pwdMaxLengthChk(gets, obj, curform, regxp){
		var pwdMinLength=$("#pwdMinLength").val();
		if(gets == null || gets == ""){
			return false;
		}
		var re = /^[1-9][0-9]{0,}/;
		if(!re.test(gets)){			
			obj.attr("errormsg",L.getLocaleMessage("bsp.globalpolicy.040","请输入正整数"));
			return false;
		}
		if(parseInt(gets) > 2147483647){
			obj.attr("errormsg",L.getLocaleMessage("bsp.globalpolicy.041","请输入小于2147483647的正整数"));
			return false;
		}
		if (parseInt(gets) < parseInt(pwdMinLength)) {
			obj.attr("errormsg",L.getLocaleMessage("bsp.globalpolicy.042","不能小于密码最小长度"));
			return false;
		}

	}

	//验证整数，包括负整数、0和正整数
	function validIsInt(gets, obj, curform, regxp){
		if(gets == null || gets == ""){
			return false;
		}
		var re = /^-?[1-9]\d*$|^0$/;
		if(!re.test(gets)){			
			obj.attr("errormsg",L.getLocaleMessage("bsp.globalpolicy.043","请输入整数"));
			return false;
		}
		if(parseInt(gets)>2147483647 || parseInt(gets)< -2147483648){
			obj.attr("errormsg",L.getLocaleMessage("bsp.globalpolicy.044","请输入-2147483648~2147483647的整数"));
			return false;
		}
		
	}
	
	//验证正整数
	function validIsPositiveInt(gets, obj, curform, regxp){
		if(gets == null || gets == ""){
			return false;
		}
		var re = /^[1-9][0-9]*$/;
		if(!re.test(gets)){			
			obj.attr("errormsg",L.getLocaleMessage("bsp.globalpolicy.040","请输入正整数"));
			return false;
		}
		if(parseInt(gets)>2147483647){
			obj.attr("errormsg",L.getLocaleMessage("bsp.globalpolicy.041","请输入小于2147483647的正整数"));
			return false;
		}
	}
	
	
	//提交请求
	function save(){
		var pwdMinLength = $("#pwdMinLength").val();
		var pwdMaxLength = $("#pwdMaxLength").val();
		
		var isUpCase,isLowerCase,isSpecialChar,isNum;
		if($("#isUpCase").is(':checked')){
			isUpCase=1;//勾选复选框
		}else{
			isUpCase = 0;
		}
		if($("#isLowerCase").is(':checked')){
			isLowerCase=1;//勾选复选框
		}else{
			isLowerCase = 0;
		}
		if($("#isSpecialChar").is(':checked')){
			isSpecialChar=1;//勾选复选框
		}else{
			isSpecialChar = 0;
		}
		if($("#isNum").is(':checked')){
			isNum=1;//勾选复选框
		}else{
			isNum = 0;
		}
		
		var loginAttempts = $("#loginAttempts").val();
		var pwdLockTime = $("#pwdLockTime").val();
		var pwdLifeTime = $("#pwdLifeTime").val();
		var pwdGraceTime = $("#pwdGraceTime").val();
		var url = context+"/service/bsp/globalpolicy/save";
		$.ajax({
			type:"POST",
			url: url,
			data:{
				'pwdMinLength':pwdMinLength,
				'pwdMaxLength':pwdMaxLength,
				'isUpCase':isUpCase,
				'isLowerCase':isLowerCase,
				'isNum':isNum,
				'isSpecialChar':isSpecialChar,
				'loginAttempts':loginAttempts,
				'pwdLockTime':pwdLockTime,
				'pwdLifeTime':pwdLifeTime,
				'pwdGraceTime':pwdGraceTime,
				
				},
			
			success:function(result){
				if(result=='0') {
					//diaFailure();						
				}else {
					//diaSuccess();	
					sticky(L.getLocaleMessage("bsp.globalpolicy.045","保存成功！"));
				}
			}
	}); 	
	}
	
	function alert(msg) {
		$.dialog({
			type : "alert",
			content : msg
		});
	}
	//提示信息
	function sticky(msg, style, position) {		
		var type = style ? style : 'success';
		var place = position ? position : 'top';
		$.sticky(
			    msg, //提示框显示内容
			    {
			        autoclose : 1000, 
			        position : place,
			        style : type
			    });
	}
	
	
	//回显checkbox
	/*
	 * 使用$().each() 函数遍历 checkbox 表单域
	 * 通过 jquery 的属性操作修改 checkbox 的 checked 状态
	 */
	$(":checkbox").each(function(){
		var value=$(this).val();
		if(value==1){
			$(this).attr("checked",true);
		}else{
			$(this).attr("checked",false);
		}
	});
	
	//重置策略
	$("#reset").click(function(){	      
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("bsp.globalpolicy.046",'您确定要重置吗？'),
            ok: function () {reset();},
            cancel: function () {}
        });
	});
	function reset(){
		var url = context+"/service/bsp/globalpolicy/reset";
		$.ajax({
			type:"POST",
			url: url,			
			success:function(result){
				if(result=='0') {
					//diaFailure();						
				}else {
					//diaSuccess();	
					sticky(L.getLocaleMessage("bsp.globalpolicy.047","重置策略成功！"));
					setTimeout(function(){
						
						window.location = context + "/service/bsp/globalpolicy";
					},1000);
				}
			}
	}); 	
	}
})
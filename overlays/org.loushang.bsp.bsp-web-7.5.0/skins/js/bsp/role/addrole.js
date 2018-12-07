//////////////////////////////////////////////校验///////////////////////////////////////////
var count_role = 0;
var Validform;
$(function() {	
	initValidform();
	//初始化岗位下拉列表
	$.ajax({
		url:context+"/service/bsp/role/queryAllPositionType",
		dataType:"json",
		success:initPositionTypeList
	});
		//查看所有权限
	$(".queryAllroles").click(function() {
		window.location = context + "/service/bsp/role";
	});
	//取消按钮
	$("#returnBtn").click(function() {
		window.location = context + "/service/bsp/role";
	});
	
});
//初始化表单校验
function initValidform(){
	//表单校验
	    Validform = $("#saveForm").Validform({
		btnSubmit:"#saveBtn",
		tiptype:function(msg,o,cssctl){
				var objtip=o.obj.siblings(".Validform_checktip");
			    cssctl(objtip,o.type);
			    objtip.text(msg);
		},
		datatype:{
			"code": ValidAccount
		},
		callback:function(form){
			var isGlobal = $("input[type=radio]:checked").val();
			var relationName  = $("#relationName").val()
			isGlobal == "0"&&relationName=="" ? tip():save();
		}
	});	
};
function ValidAccount(gets, obj, curform, regxp){
	var msg1 = L.getLocaleMessage("bsp.role.033","不能超过30个字符");
	var msg2 = L.getLocaleMessage("bsp.role.034","角色编码已存在");
	var isExist;
	if(gets == null || gets == ""){
		return false;
	}
	if(gets.length >30){
		obj.attr("errormsg",msg1);
		return false;
	}
	$.ajax({
		url: context + "/service/bsp/role/isExistRoleCode?roleCode="+gets,
		type: "post",
		async: false,
		success: function(result){
			if(result == "true"){
				obj.attr("errormsg",msg2);
				isExist = true;
			}else{
				isExist = false;
			}
		}
	});
	
	return !isExist;
}
//初始化岗位下拉列表
function initPositionTypeList(positionTypeList){
	for(index in positionTypeList){
		var option ='<option value='+positionTypeList[index].code+'>'+positionTypeList[index].name+'</option>'
		$("#positionType").append(option);
	}
}
//保存表单实例
function save(){
	var url=context+"/service/bsp/role/addrole";
	
	$("#saveForm").ajaxSubmit({
		url:url,
		type:"POST",
		success: showTable
	});
}
//新增角色后显示表格
function showTable(returnVal){
	var msg1 = L.getLocaleMessage("bsp.role.018","全局");
	var roleData = returnVal.roleId
	if(roleData!=null){
	count_role++
	var isGlobal = $("input[type=radio]:checked").val();
	var positionType =$("#positionType option:selected").val();
	var trTplData ={
			roleId:roleData,
			roleCode:$("#roleCode").val(),
			roleName:$("#roleName").val(),
			positionType:positionType == "" ? "":$("#positionType option:selected")[0].text,
			isGlobal:isGlobal == "1" ? msg1 :$("#relationName").val()
	}
	var trTpl = template('trTpl', trTplData);
	$("#roleList tbody").append(trTpl);
	$(".rolesum").text(L.getLocaleMessage("bsp.role.057", "已添加了{0}个角色", count_role));
	$(".addreturn").show();
	Validform.resetForm();//表单重置
	$("#relationId").val("");//手动清空隐藏域的值
	$("#relationId").parents(".form-group").show();//显示隐藏的域
	}else{
		$(".Validform_span").text("");
		var expMsg = returnVal.expMsg
		$.dialog({
			type:"alert",
			content:expMsg});
	}
}
//显示选择组织机构输入框
function showOrgan(data){
	var organ =	$(data).val();
	if(organ=="1"){
		$("#relationId").parents(".form-group").hide();
	}else{
		$("#relationId").parents(".form-group").show();
	}
};	
function selectOrgan(){
	var msg = L.getLocaleMessage("bsp.role.040","选择所属组织");
	$.dialog({
	    type: 'iframe',
		url: context + "/service/bsp/organHelp?isChkbox=0&isCascadeSelect=1&selType=1;2&struType=00&showableType=1;2",
		title: msg,
		width: 580,
		height: 400,
		onclose: function(){
			var node = this.returnValue;
			if(typeof node!='string'){
				if(node.length>0){
					var organName = node[0].organName;
					var struId = node[0].struId;
					$("#relationName").val(organName);
					$("#relationId").val(struId);
				} else {
					$("#relationName").val("");
					$("#relationId").val("");
				}
			}
			
		} 
	});
}
function renderstatus(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.role.018","全局");
	var msg2 = L.getLocaleMessage("bsp.role.048","机构");
	if(data != "" || data != null)
	{
	  if(data == "1"){
		  data = msg1;
	  }
	  if(data == "0"){
		  data = msg2;
	  }			    		    			  
	}
return data;
};
function roleAuthrize(data){
	var msg = L.getLocaleMessage("bsp.role.025","角色授权");
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/role/roleauthrize.jsp?roleId="+data,
		title:msg,
		width:580,
		height:440,
		onclose:function(){}
	});
	$(".ui-dialog-body").css("padding","0px");
};
//批量用户授权
function roleBatchAuthorize(data){
	var msg = L.getLocaleMessage("bsp.role.043","将角色批量授权给用户");
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/role/rolebatchauthorize.jsp?roleId="+data,
		title:msg,
		width:750,
		height:470,
		onclose:function(){}
	});
	$(".ui-dialog-body").css("padding","0px");
};

function tip(){
	var msg = L.getLocaleMessage("bsp.role.049","请选择所属组织！");
	$.dialog({
		type:"alert",
		content:msg,
		autofouse:true
	});
}

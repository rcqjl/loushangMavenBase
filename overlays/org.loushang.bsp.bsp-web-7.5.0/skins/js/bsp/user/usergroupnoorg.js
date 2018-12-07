var isGroupSelected;

$(document).ready(function(){
	
	// 初始化datatable
	initGroupTable();
	
	// 查询 
	$("#queryGroup").on("click",function() { 
		queryGroupForm(); 
	});
	
	// 回车事件
	$("#toGroupName").keydown(function(event) {
		if(event.keyCode==13){ 
			queryGroupForm();
		}
	});
	
	// 选择组类型（可选和已选）
	$("#selectallgroup").on("click",function(){
		$("#selectgroupBtn").html($("#selectallgroup").html()+"<span class='caret'>");
		querySelGroup("all");
	});
	
	$("#selectegroups").on("click",function(){
		$("#selectgroupBtn").html($("#selectegroups").html()+"<span class='caret'>");
		querySelGroup("0");
	});
	
	$("#selectedgroups").on("click",function(){
		$("#selectgroupBtn").html($("#selectedgroups").html()+"<span class='caret'>");
		querySelGroup("1");
	});
	
});

///////////////////////////////////////////// 表单// ///////////////////////////////////////////////////////
//初始化表格
function initGroupTable() {
	var options = {
		"ordering": false,
		"btnDefs": [
					
				  ]
	};
	var url = context+"/service/bsp/group/usergroup";
	gridGroup = new L.FlexGrid("groupList",url);
	gridGroup.setParameter("userId",$("#userId").val());
	gridGroup.init(options);
}

// 用户状态转换
function groupOperations(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.001","添加");
	var msg2 = L.getLocaleMessage("bsp.user.002","移除");
	var status = "";
	if(full.id == "5000") {
		status="disabled='disabled'";
	}
	
	if(data != "" && data != null)
	{
	  if(data == "0"){
		  data = "<button type='button' class='add-user-group btn ue-btn-primary' "+status+"/>"+msg1+"</button>";
	  }
	  if(data == "1"){
		  data = "<button type='button' class='add-user-group btn ue-btn' "+status+"/>"+msg2+"</button>";
	  }
	}
	
	return data;
}

// 查询
function queryGroupForm(){
	var groupName = $("#toGroupName").val();
	var url = context+"/service/bsp/group/usergroup";
	var param={"groupId":groupName,"userId":$("#userId").val(),"isSelected":isGroupSelected};
	//url=encodeURI(url,"utf-8");
	gridGroup.reload(url,param);
}

// 可选/已选组查询
function querySelGroup(isSel){
	isGroupSelected = isSel;
	var groupName = $("#toGroupName").val();
	var url = context+"/service/bsp/group/usergroup";
	var param={"groupId":groupName,"userId":$("#userId").val(),"isSelected":isGroupSelected};
	//url=encodeURI(url,"utf-8");
	gridGroup.reload(url,param);
}

// 操作
$(document).on("click",".add-user-group",function() {
	var msg1 = L.getLocaleMessage("bsp.user.084","用户ID为空不可添加");
	var msg2 = L.getLocaleMessage("bsp.user.085","加入组成功!");
	var msg3 = L.getLocaleMessage("bsp.user.086","从组中移除成功!");
	var msgAdd = L.getLocaleMessage("bsp.user.001","添加");
	var msgDel = L.getLocaleMessage("bsp.user.002","移除");

	var groupId = gridGroup.oTable.row($(this).parents("tr")).data().id;
	var isGroupSelected = gridGroup.oTable.row($(this).parents("tr")).data().isSelect;
	var userId = $("#userId").val();
	var temp=$(this).parents("tr").find("button[type='button']").html();

	if(temp==msgAdd){
		isGroupSelected="0";
		$(this).parents("tr").find("button[type='button']").removeClass("ue-btn-primary");
		$(this).parents("tr").find("button[type='button']").addClass("ue-btn");
		$(this).parents("tr").find("button[type='button']").html(msgDel);
	}else{
		isGroupSelected="1";
		$(this).parents("tr").find("button[type='button']").removeClass("ue-btn");
		$(this).parents("tr").find("button[type='button']").addClass("ue-btn-primary");
		$(this).parents("tr").find("button[type='button']").html(msgAdd);
	}
	
	if(userId == "" || userId == null || userId ==undefined){
		$.dialog({
			type: 'confirm',
			content: msg1,
		    autofocus: true
		});
	}else {
		if(isGroupSelected=="0"){
			$.ajax({
	            url:context+"/service/bsp/group/groupmember/add",
	            data:{"groupId":groupId,"userId":userId},
	            type:"post",
	            success:function(){
	            	sticky(msg2);
	            }
	        });
		}
		if(isGroupSelected=="1"){
			$.ajax({
	            url:context+"/service/bsp/group/groupmember/delete",
	            data:{"groupId":groupId,"userId":userId},
	            type:"post",
	            success:function(){
	            	sticky(msg3);
	            }
	        });
		}
	}
});
$(function(){
	var url = context + "/service/bsp/group/data";
	init(url);
	$("#add").click(function(){
		var url = context+"/service/bsp/group/addPage"
		$.dialog({
			type: "iframe",
			url: url,
			title: "创建组",
			width: 580,
			height: 200,
			autofocus: true,
			onclose: function() {
				if(this.returnValue) {
					sticky("创建组成功");
					grid.reload();
				}
			}
		});
	});
	$("#batchdel").click(function(){
	   var msg1 = L.getLocaleMessage("bsp.group.035","确认删除选中记录?");
	   var msg2 = L.getLocaleMessage("bsp.group.036","删除成功！");
	   var msg5 = L.getLocaleMessage("bsp.group.039","请选择要删除的记录!");
	   var groupIdArr = getCheckBoxValue();
	   if(groupIdArr.length>0){
		   $.dialog({
			   autofocus:true,
			   type : 'confirm',
			   content : msg1,
			   ok : function(){
				   $.ajax({
						url:context + "/service/bsp/group/delete",
					    data:"groupIds="+groupIdArr,
					    type:"post",
					    dataType:"json",
					    success:function(data){
					    	if(data.length==0){
					    		sticky(msg2)
					    		grid.reload();
					    	}else{
					    		var groupId="";
					    		for(index in data){
					    			groupId = "[" + data[index] +"] "+  groupId 
					    		}
					    		$.dialog({
					    			type:"alert",
					    			content: groupId+"含有组成员，不能删除"
					    		});
					    		grid.reload();
					    	}
					    },
					    error: function(XHR, textStatus, errorThrown) {
							$.dialog({
								type: 'alert',
								content: errorThrown,
							    autofocus: true,
							});
						}
					});
			   },
			   cancel : function() {
			   }
		   });
		   
	   }else{
		   $.dialog({
				autofocus:true,
				type : "alert",
				content : msg5
			});
			return;
	   }
	});
	// checkbox全选
	$("#selectAll").click(function(){
		selectAll(this.checked);
	});
	$("#query").click(function(){
	   var groupId = $("#groupId").val();
		queryGroup(groupId);
	});
});
//条件查询组信息
function queryGroup(groupId){
	var url = context+"/service/bsp/group/data";
	grid.setParameter("groupId", groupId);
	grid.reload(url);
}
//初始化表格
function init(url){
	var options = {};
	grid = new L.FlexGrid("groupList",url);
	grid.init(options);
}

function rendercheckbox(data, type, full) {
	if(full.id == "5000"){
		return '';
	} else {
		return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkboxlist"/>';
	}
};

function renderOpt(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.group.041","编辑");
	var msg3 = L.getLocaleMessage("bsp.group.026","编辑组成员");
	return '<div>'
	+'<a onclick="update('+"'"+ full.id+"')"+'">' +msg1+'</a>'
	+'<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="editGroupMembers('+"'"+ data
	+ "'"+')">'+msg3+'</a></div>'
};

//编辑组成员
function editGroupMembers(data){
	var msg = L.getLocaleMessage("bsp.group.043","编辑组成员");
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/group/groupmembers.jsp?groupId="+data,
		title:msg,
		width:750,
		height:470,
		onclose:function(){
		}
	});
	$(".ui-dialog-body").css("padding","0px");
};
//编辑
function update(id){
	var msg1 = L.getLocaleMessage("bsp.group.044","编辑组");
	var msg2 = L.getLocaleMessage("bsp.group.042","保存成功！");
	var url = context+"/service/bsp/group/edit/"+id;
	$.dialog({
	    type: 'iframe',
		url: url,
		title: msg1,
		width: 580,
		height: 200,
		onclose: function(){
			if(this.returnValue){
				sticky("编辑组成功");
				grid.reload();
			}
		} 
	});
}
//checkbox全选 
function selectAll(checked){
	$(":checkbox[name=checkboxlist]").prop("checked", checked);
}

// 获取选中的复选框中的值
// 返回值为数组，数组中的每一项为一个表单ID
function getCheckBoxValue() {
	var idArr = new Array();
	$(":checkbox[name=checkboxlist]:checked").each(function(){
		idArr.push(this.value);
	});
	
	return idArr;
};

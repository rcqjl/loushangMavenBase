$(document).ready(function() {
	//初始化datatable
	 var url = context+"/service/cportal/widgets/data";
	 init(url);
	//初始化微件类别树
	 typeTree = initwidgetTypeTree();
		
		  //根据微件名称查询微件
		  $("#query").bind("click",function() {
						var widgetName = $("#widgetName").val();

						if ((widgetName == "" || widgetName == null)) {
							var url = context + "/service/cportal/widgets/data";
							grid.reload(url);
						} else {
							var url = context + "/service/cportal/widgets/findByWidgetName";
							var options = {
									"name":widgetName
							};
							grid.reload(url,options);
						}
					});
		  //增加微件
		  $("#add").on("click",function(){
			  var zTree = $.fn.zTree.getZTreeObj("widgetTypeTree");
			  var nodes =zTree.getSelectedNodes();
			  var node;
			  for(var i=0;i<nodes.length;i++){
				  node=nodes[i];
			  }
			  if(nodes.length==1&&!node.isParent){
				  window.location.href = context + "/jsp/cportal/widget/addwidget.jsp?typeId="+node.id;
			  }else{
				  $.dialog({
						type : "alert",
						content : L.getLocaleMessage("tip-type","请选择一个类别！")
					});
					return;
			  } 
		  });
		//批量删除微件
		  $("#batchdel").on("click",function(){
				 var recordIds =getCheckBoxValue("checkboxlist");
				 if (recordIds.length < 1) {
						$.dialog({
							autofocus:true,
							type : "alert",
							content : L.getLocaleMessage("tip-select","请至少选择一条记录!")
						});
						return;
					}
					    $.dialog({
					    	autofocus:true,
						    type: 'confirm',
						    content: L.getLocaleMessage("tip-delete","确认删除该记录?"),
						ok: function(){
							$.ajax({
								dataType:"json",
								url:context + "/service/cportal/widgets/queryWidget?recordIds="+recordIds,
								success:function(returnInfo){
									var msg=returnInfo.msg;
									var widgetId=returnInfo.widgetId;
									if(msg=="true"){
										window.location.href = context + "/service/cportal/widgets/delete?recordIds="+recordIds;
									}else{
										$.dialog({
											autofocus:true,
											type:"alert",
											content:widgetId+" "+L.getLocaleMessage("tip-used","微件已被使用")
										})
									}
								},
								cancel: function(){}
								})
							},
						cancel: function(){}
					});
			 });
		  //单独修改微件的类别
		  $("#updateWidgetType").on("click",function(){
			  var widgetId =getCheckBoxValue("checkboxlist");
				 if (widgetId.length < 1) {
						$.dialog({
							type : "alert",
							content : L.getLocaleMessage("tip-select","请至少选择一条记录!")
						});
						return;
					}
			  $.dialog({
				    type: 'iframe',
					url: context+"/jsp/cportal/widget/selectwidgettype.jsp",
					title: L.getLocaleMessage("cportal.widget.updateType","修改类别"),
					width: 770,
					height: 360,
					onclose: function(){
						var typeId=	this.returnValue
						if(typeId!=null&&typeId!=""){
							var url = context+"/service/cportal/widgets/selectType?widgetId="
							+widgetId+"&typeId="+typeId ;
							url=encodeURI(encodeURI(url));
							$.ajax({
								url:url,
								success:function(){
									grid.reload();
								}
							});
						}
					} 
			  });
		  });
});
//初始化表格
function init(url){
	var options = {};
	grid = new L.FlexGrid("widgetList",url);
	grid.init(options);
}
//单条删除微件
function del(widgetId){
	 $.dialog({
		    autofocus:true,
		    type: 'confirm',
		    content: L.getLocaleMessage("tip-delete","确认删除该记录?"),
		ok: function(){
			$.ajax({
				dataType:"json",
				url:context + "/service/cportal/widgets/queryWidget?recordIds="+widgetId,
				success:function(returnInfo){
					if(returnInfo.msg=="true"){
						
						window.location.href =context + "/service/cportal/widgets/delete?recordIds="+widgetId;
					}else{
						$.dialog({
							autofocus:true,
							type:"alert",
							content:L.getLocaleMessage("tip-used","该微件已被引用!")
						})
					}
				},
				cancel: function(){}
				})
			},
		cancel: function(){}
	});
}

/////////////////////////////////////////////////////////////////////////////////////////////
//初始化微件类别树
function initwidgetTypeTree() {
	var widgetTypeTree = [];
	// 根节点
	var rootJson = {
			id:'-1', 
			name: L.getLocaleMessage("cportal.treeName","微件类别树"), 
			isParent: true,
			iconSkin:"icon01",
			isRoot: true,
	}; 
	widgetTypeTree.push(rootJson);

	var treeSetting = {
		edit : {
			enable : true,
		},
		data : {
			keep:{//删除所有子节点后依然保持父节点状态
				parent:true,
				leaf:true
			},
			key : {
				name : "name"
			},
			simpleData : {
				enable : true,
				idKey : "id"
			}
		},
		async : {
			enable : true,
			url : context+"/service/cportal/widgets/typedata" ,
			dataFilter : dataFilter
		},
		callback : {
			onClick: onClick ,
		},
		edit : {
			drag : {
				prev:canPrev,
				next:canNext,
				inner:canInner
			},
			enable : true,
			showRemoveBtn :false,
			showRenameBtn :false,
		},
		view : {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom
		}
	};

	var tree = $.fn.zTree.init($("#widgetTypeTree"), treeSetting, widgetTypeTree);
	tree.expandNode(tree.getNodes()[0],true,false,true);
}
//禁止拖拽到根节点前面
function canPrev(treeId, nodes, targetNode){
	return !targetNode.isParent;

}
//禁止拖拽到根节点下面
function canNext(treeId, nodes, targetNode){
	return !targetNode.isParent;
}
//禁止拖拽到节点里面，即不允许生成父节点
function canInner(treeId, nodes, targetNode){
	return false;
}
//设置根节点不显示删除按钮
function setRemoveBtn(treeId,treeNode){
	return !treeNode.isParent;
}
// 鼠标悬停在节点上显示自定义按钮
function addHoverDom(treeId, treeNode) {
	if(treeNode.isParent){
		// 判断如果是根节点在显示添加按钮
		addNewNodes(treeId,treeNode);
		 return;
		}else{  
		//不是根节点显示编辑按钮
   		 updateNodes(treeId,treeNode);
   		 addDelBtn(treeId,treeNode);
		}
};
//添加“增加”按钮
function addNewNodes(treeId,treeNode) {
	// 组装“增加”按钮的id
	var newBtnId = treeNode.tId + "_new";
	if ($("#"+newBtnId).length>0) {
		return;
	}
	var addStr = "<span id='"+newBtnId+"' class='button add' title='"+L.getLocaleMessage("cportal.widget.new","新增")+"'></span>";
	$("#" + treeNode.tId + "_a").append(addStr);
	
	$("#"+newBtnId).bind("click", function(){
		addDialog(treeNode);
		});
};
//添加“修改”按钮
function updateNodes(treeId,treeNode){
	// 组装“修改”按钮的id
	var editBtnId = treeNode.tId + "_edit";
	if ($("#"+editBtnId).length>0) {
		return;
	}
	var editBtn = "<span id='"+editBtnId+"' class='button edit' title='"+L.getLocaleMessage("cportal.widget.modify","修改")+"'></span>";
	$("#" + treeNode.tId + "_a").append(editBtn);
	// 绑定事件
	$("#"+editBtnId).bind("click", function(){
		updateDialog(treeNode)
	});
}
//添加“删除”按钮
function addDelBtn(treeId, treeNode){
	// 组装“删除”按钮的id
	var delBtnId = treeNode.tId + "_remove";
	if ($("#"+delBtnId).length>0) {
		return;
	}
	
	var delBtn = "<span id='"+delBtnId+"' class='button remove' title='"+L.getLocaleMessage("cportal.widget.delete","删除")+"'></span>";
	$("#" + treeNode.tId + "_a").append(delBtn);
	
	// 绑定事件
	$("#"+delBtnId).bind("click", function(){
		remove(treeId, treeNode);
	});
}
function updateDialog(treeNode){
	var url = context+"/jsp/cportal/widget/updatewidgettype.jsp?name="+treeNode.name+"&id="+treeNode.id+"&description="+treeNode.description+"&displayOrder="+treeNode.displayOrder 
	url=encodeURI(encodeURI(url));
	 $.dialog({
			type: 'iframe',
			url: url,
			title: L.getLocaleMessage("cportal.widgetType.update","更新"),
			width: 490,
			height: 350,
			onclose: function () {
				var dataObj = this.returnValue;
				if(dataObj){
					// 执行后台更新操作
					$.ajax({
						type: "POST",
						url:context+"/service/cportal/widgets/updateSaveWidgetType",
						data:dataObj,
						success:function(){
							//更新前台树节点名称
							var zTree = $.fn.zTree.getZTreeObj("widgetTypeTree");
							treeNode.name = dataObj.name;
							treeNode.description=dataObj.description;
							treeNode.displayOrder=dataObj.displayOrder;
							zTree.updateNode(treeNode);
						}
					});
			   }
			},
			oniframeload: function () {
				
			}
	});
};
function addDialog(treeNode){
	$.dialog({
		type: 'iframe',
		url: context+"/jsp/cportal/widget/addwidgettype.jsp",
		title: L.getLocaleMessage("cportal.widgetType.new","新增"),
		width: 490,
		height: 350,
		onclose: function () {
			var dataObj = this.returnValue;
			if(dataObj){
				// 执行后台添加操作
				$.ajax({
					type:"POST",
					url:context+"/service/cportal/widgets/saveWidgetType",
					data:dataObj
				});
				// ztree添加相应的节点
				var zTree = $.fn.zTree.getZTreeObj("widgetTypeTree");
				zTree.addNodes(treeNode, {id:dataObj.id, pId:"-1", name:dataObj.name,description:dataObj.description,displayOrder:dataObj.displayOrder});
		   }
		}
	});
};
// 鼠标离开节点时的动作
function removeHoverDom(treeId, treeNode) {
	$("#"+treeNode.tId + "_new").unbind().remove();
	$("#"+treeNode.tId + "_remove").unbind().remove();
	$("#"+treeNode.tId + "_edit").unbind().remove();
};

function dataFilter(treeId, parentNode, childNodes) {
	return childNodes;
}

function onClick(e,treeId, treeNode) {
	$("#widgetName").val("");
	//查询微件类别下的微件
	var typeId=treeNode.id
	//判断如果不是根节点执行查询
	if(!treeNode.isParent){
		var url = context + "/service/cportal/widgets/findByTypeId";
		var options = {
				"typeId":typeId
		};
		grid.reload(url,options);
	}else{
		var url = context + "/service/cportal/widgets/data";
		grid.reload(url);
	}
}

//删除节点
function remove(treeId,treeNode){
	$.dialog({
		type : "confirm",
		content : L.getLocaleMessage("tip-delete","确认删除该记录?"),
		autofocus:true,
		ok:function(){
			$.ajax({
				url:context + "/service/cportal/widgets/queryType?typeId=" + treeNode.id,
				async:false,
				success:function(flag){
					if(flag == "true"){
						$.ajax({url:context + "/service/cportal/widgets/deleteType?typeId=" +treeNode.id,
							success:function(){
								var treeObj = $.fn.zTree.getZTreeObj("widgetTypeTree");
								treeObj.removeNode(treeNode);
							}})
					}else{
						$.dialog({
							autofocus:true,
							type:"alert",
							content:L.getLocaleMessage("tip-used","该类别已被引用")
						})
					}
				}
			})
		},
		cancel:function(){
			
		}
	});
	return false;//若不return false 无论后台是否删除节点，ztree都会前台默认删除节点
}
/////////////////////////////////////////////  表单  ///////////////////////////////////////////////////////
//更新微件
function modify(widgetId){
	  window.location.href = context + "/service/cportal/widgets/updateWidget?widgetId="+widgetId;
}
//操作列按钮 
function operation(data, type, full) {
	return '<div><a onclick="del('+"'"+ data
	+ "'"+')">'+L.getLocaleMessage("cportal.widget.delete","删除")+'</a>'
	+'<span>&nbsp;&nbsp</span>'
	+'<a onclick="modify('+"'"+ data
	+ "'"+')">'+L.getLocaleMessage("cportal.widget.modify","编辑")+'</a></div>'
}
function modifyLink(data, type, full){
	return '<a onclick="modify('+"'"+full.id+"'"+')">'+data+'</a>'
}
function rendercheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
};
function rendername(data, type, full){
	return '<span title="'+data+'">'+data+'</span>';
}

function renderauthor(data, type, full){
	return '<span title="'+data+'">'+data+'</span>';
}
//checkbox全选
function selectAll(obj, iteName) {
	if (obj.checked) {
		$("input[name='checkboxlist']").each(function() {
			this.checked = true;
		});
	} else {
		$("input[name='checkboxlist']").each(function() {
			this.checked = false;
		});
	}
}
//获取选中的复选框的记录
function getCheckBoxValue(attrKey) {
	var confCheckBox = $("input:checkbox[name=" + attrKey + "]");
	var selectedValue = "";
	for ( var i = 0; i < confCheckBox.length; i++) {
		if (confCheckBox[i].checked) {
			if ("" == selectedValue) {
				selectedValue = confCheckBox[i].value;
			} else {

				selectedValue = selectedValue + "," + confCheckBox[i].value;
			}
		}
	}
	return selectedValue;
}

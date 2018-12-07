$(function($){
	//全局变量
	var resultArray;
	var num=0;
	var setting = {
		view: {
			dblClickExpand: true,
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom
		},
		async: {
			enable: true,
			url:WFlow.fullWebPath+"/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/"
			+ "getOrganStructure",
			autoParam:["struId"]
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onAsyncSuccess: zTreeOnAsyncSuccess,
			onClick: onClick
		}
	};
	
	function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
		var objs = eval(msg);
		var obj=objs[0];
		if(objs[0].success!=undefined){
			showDialog("alert",objs[0].errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
		}
		if (resultArray&&resultArray.length>0) {
			expandNodes();
		}
	};
	
	//选中参与者
	function selectedParty(treeNode){
		var pOwner = {};
		pOwner.typeId="commonly";
		pOwner.typeName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D075","一般");
		pOwner.itemId="unit";
		pOwner.itemName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D072","组织机构");
		pOwner.organId=treeNode.organId;
		pOwner.organName=treeNode.organName;
		pOwner.internalId=pOwner.typeId+"|"+pOwner.itemId+"|"+pOwner.organId;
		addParticipantElement(pOwner);
	}

	function addHoverDom(treeId, treeNode) {
		if(treeNode.id!="-1"){
			var aObj = $("#" + treeNode.tId + "_a");
			if ($("#tree"+treeNode.id).length>0) return;
			var pitchBut="<span class='button addPic' id='tree" +treeNode.id+"'></span>";
			aObj.append(pitchBut);
			var btn = $("#tree"+treeNode.id);
			if (btn){
				$(btn).css({
					"height":"16px",
					"left":"5px",
					"position":"relative"
					});
				btn.bind("click", function(event){
					selectedParty(treeNode);
					event.stopPropagation();
				});
			} 	
		}
	}
	function removeHoverDom(treeId, treeNode) {
		if(treeNode.id!="-1"){
			$("#tree"+treeNode.id).unbind().remove();
			$("#treeSpace" +treeNode.id).unbind().remove();
		}
	}
	
	function onClick(e,treeId, treeNode) {
//		if(treeNode.id!="-1"){
			var zTree = $.fn.zTree.getZTreeObj("treeContext");
			zTree.expandNode(treeNode);
//		}
	}
	
	//查询组织用户
	$("#querybtn").click(function(e){
		searchOrgan();
	});	
	//查询组织用户
	$("#pre").click(function(e){
		searchOrgan(--num);
	});	
	//查询组织用户
	$("#next").click(function(e){
		searchOrgan(++num);
	});	
	
	//绑定回车事件
	$("#queryOrganName").bind("keypress",function(event){
		if(event.keyCode == "13"){
			searchOrgan();
        }
	})
	
	//搜索框
	function searchOrgan(num){
		var organName=$("#queryOrganName").val();
		if(organName != "") {
			$.ajax({
				type:"POST",
				url: WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/getStruPathByOrganName",
				data:{
					"organName":organName,
					"struType":"00",
					"num":num,
				},
				dataType:"json",
				async:false,
				success:function (data){
					if(data && data.success){
						if(data.count && data.count>1){
							$("#pre_next").show();
							if(num<=0){
								$("#pre").attr("disabled","disabled");
							}else{
								$("#pre").removeAttr("disabled");
							}
							if(num>=(data.count-1)){
								$("#next").attr("disabled","disabled");
							}else{
								$("#next").removeAttr("disabled");
							}
						}else{
							$("#pre_next").hide();
						}
						selectNode(data.struPaths);
					}else{
						showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
					}
				},
				error:function(){
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				}
			});
		}
	};
	function selectNode(data){
		if(data && data.length > 0){
			$.fn.zTree.init($("#treeContext"), setting);
			var treeObj = $.fn.zTree.getZTreeObj("treeContext");
			var queryNode = treeObj.getNodeByParam("struId",data[data.length - 1]);
			if(queryNode){// 该节点已经在树上展现，则直接选中
				var nodes = treeObj.getSelectedNodes();
				if (nodes.length>0) { 
					treeObj.cancelSelectedNode(nodes[0]);
				}
				treeObj.selectNode(queryNode,true);
			} else{// 重新渲染
				resultArray=data;
				$.fn.zTree.init($("#treeContext"), setting);
			}
		} else{
			showInfo(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D241","没有查到该组织员工!"));
		}
	};
	function expandNodes(){
		var treeObj = $.fn.zTree.getZTreeObj("treeContext");
		// 展开节点
		for(var i=0;i<resultArray.length;i++){
			var node = treeObj.getNodeByParam("struId",resultArray[i]);
			treeObj.expandNode(node, true, false);
		}
		// 选中节点
		var node = treeObj.getNodeByParam("struId",resultArray[resultArray.length - 1]);
		treeObj.selectNode(node,true);
	}
	
	$(function() {
		$.fn.zTree.init($("#treeContext"), setting);
	});
});
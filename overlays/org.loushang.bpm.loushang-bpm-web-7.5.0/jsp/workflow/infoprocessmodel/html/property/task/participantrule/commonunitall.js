$(function($){
	var setting = {
		view: {
			dblClickExpand: false,
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom
		},
		async: {
			enable: true,
			url:WFlow.fullWebPath+"/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/"
			+ "getOrganStruForAllPeople",
			autoParam:["struId","struType"]
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
	};

	//选中参与者
	function selectedParty(treeNode){
		var pOwner = {};
		pOwner.typeId="commonly";
		pOwner.typeName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D075","一般");
		pOwner.itemId="unitAllEmp";
		pOwner.itemName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D072","组织机构");
		pOwner.organId=treeNode.organId+":";
		if(treeNode.struType){
			pOwner.organId+=treeNode.struType;
		}
		pOwner.organName=treeNode.organName;
		pOwner.internalId=pOwner.typeId+"|"+pOwner.itemId+"|"+pOwner.organId;
		addParticipantElement(pOwner);
	}

	function addHoverDom(treeId, treeNode) {
		if(treeNode.id!="-1"){
			var aObj = $("#" + treeNode.tId + "_a");
			if ($("#tree"+treeNode.id).length>0) return;
			if(treeNode.isVirtual!="1"){
				var pitchBut="<span class='button addPic' id='tree" +treeNode.id+"'></span>";
				aObj.append(pitchBut);
			}
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
		if(treeNode.id!="-1"){
			var zTree = $.fn.zTree.getZTreeObj("unitallContext");
			zTree.expandNode(treeNode);
		}
	}	
	
	$(function() {
		$.fn.zTree.init($("#unitallContext"), setting);
	});
	
});
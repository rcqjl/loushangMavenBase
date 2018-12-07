//为了正确显示选择参与者的先后顺序，对参与者的处理进行了修改
//之前的作法是为了同一修改参与者的添加删除不更改potentialOwner的id，该id为动态增加的
var tmpOwnerList={};
var ownerLinkedList=new LinkedList(); 
var activity;
var struTypeList=[];
var conNum=0;
$(function($){
	//获取所有的组织视角
	initStruTypes=function(){
		$.ajax({
			type : "POST",
			url:WFlow.fullWebPath+"/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/"
			+ "getAllStruTypes",
			data : {},
			dataType: "json",
			async : false,
			success : function(data) {
				if(data && data.success){
					for(var i=0; i<data.struTypeList.length; i++){
						struTypeList.push(data.struTypeList[i]);
					}
				}else{
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				} 
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错！"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	};
	
	//获取所设置的参与者的种类
	initPartyList=function(partList){
		var num=0;
		for(var i=0; i<partList.length; i++){
			if(partList[i].name==L.getLocaleMessage("BPM.INFOPROCESSMODEL.D082","历史环节处理人") || partList[i].name==L.getLocaleMessage("BPM.INFOPROCESSMODEL.D080","创建人") || partList[i].name==L.getLocaleMessage("BPM.INFOPROCESSMODEL.D81","发送人") || partList[i].name==L.getLocaleMessage("BPM.INFOPROCESSMODEL.D088","上下文相关") ){
				if(hasPreAct()){
					showTab(i, partList[i].partUrl, partList[i].name);
					num++;
				}
			}else{
				showTab(i, partList[i].partUrl, partList[i].name);
				num++;
			}
		}
		if(num>0){
			setTab();
			switchTab("tab0","con0");
		}else{
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D119","未找到有效的参与者页面！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
		}
	};
	
	//设置tab中li的宽度
	function setTab(){
		if(conNum>5){
			var liWidth=($("#tabsArea").width()-0.1)/conNum;
			$("#tabsArea li").css("width", liWidth+"px");
		}
	}
	//展现tab
	function showTab(i, partUrl, name){
		//展现tab选项
		var tabId="tab"+conNum;
		var conId="con"+conNum;
		var tabLi = $("<li></li>").attr("id",tabId).attr("num",conNum).attr("url",partUrl);
		$("#tabsArea ul").append(tabLi);
		var tabLiA = $("<div></div>").text(name);
		tabLi.append(tabLiA);
		$(tabLiA).bind("click",function(){
			switchTab(tabId,conId);
		});
		conNum++;
	};
	
	function loadPage(conId, partUrl){
		//展现对应参与者页面
		if(partUrl!=null && partUrl!="" && partUrl.substring(0,1)=="/"){
			partUrl=partUrl.substring(1);			
		}
		var filePath=WFlow.fullWebPath+"/"+partUrl;
		var pageDiv=$("<div></div>").addClass("con").addClass("frameDiv").attr("id",conId);
		//加载页面
		$.ajax({
			type : "POST",
			async : false,
			url : filePath,
			dataType:"html",
			success:function(data){
				$(pageDiv).append(data);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D120","加载页面失败"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
		$("#optionArea").append(pageDiv);
	}
	
	//监听tab事件
	switchTab = function(ProTag, ProBox) {
		var partUrl=$("#"+ProTag).attr("url");
		$("#"+ProTag).addClass("on");
		$("#tabsArea li:not('#"+ProTag+"')").removeClass("on");
		if($("#"+ProBox).length<1){
			//加载对应的参与者页面
			loadPage(ProBox, partUrl);
		}
		$("#"+ProBox).show();
		$(".con:not('#"+ProBox+"')").hide();
		var num=$("#"+ProTag).attr("num");
		var liWidth=$("#tabsArea li").width();
		var tmpW = $(".triangle").width();
		var tmpFW = (parseInt(num)+0.5)*liWidth;
		$(".triangle").css("left",(tmpFW - tmpW/2)+"px");
	};

	init=function(){
		initStruTypes();
		initParam();
		initParticipants();
	};
	function initParam(){
		// 从父窗口传递来的值
		var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
		activity=fromParentParam.activity;
		for(pId in activity.potentialOwnerList){
			tmpOwnerList[pId] = activity.potentialOwnerList[pId];
			ownerLinkedList.addLast(tmpOwnerList[pId]);
		}
		initPartyList(fromParentParam.partList);
		 // 单击某个按钮时，关闭子页面
		$('#confirm').click(function() {
			var returnList={};
			for(var i=0; i<ownerLinkedList.size(); i++){
				var tmpOwner = ownerLinkedList.get(i);
				returnList[tmpOwner.internalId]=tmpOwner;
			}
			// 设置传给父页面的内容
			var retObj = {potentialOwnerList : returnList};
			// 关闭弹出框
			closeDialog(retObj);
		});
		 // 单击某个按钮时，关闭子页面
		$('#cancel').click(function() {
			// 关闭弹出框
			closeDialog(null);
		});
	}
	function setReturnText(retObj){
		if($(".selectedDiv").length<1){
			retObj.isSet=false;
			return retObj;
		}
		retObj.isSet=true;
		retObj.value=$(".selectedDiv:eq(0)").text();
		var extendValue="";
		$(".selectedDiv").each(function(){
			extendValue = extendValue+$(this).text()+" ";
		});
		retObj.extendValue = extendValue;
		return retObj;
	}
	
	function hasPreAct(){
		var nodeDic=parent.WFModel.process.nodeDic;
		var preAct={};
		flag=false;
		for(var nodeId in nodeDic){
			var node=nodeDic[nodeId];
			if(node.type=="userTask" && node.id!=activity.id){
				if(findRoad(node.id, activity.id)){
					flag=true;
					break;
				}
			}
		}
		return flag;
	}

	function findRoad(startActId, endActId){
		flag=false;
		for(seqId in parent.WFModel.process.seqFlowDic){
			if(flag) break;
			var line=parent.WFModel.process.seqFlowDic[seqId];
			if(line.sourceNode.model.id==startActId){
				if(line.targetNode.model.id==endActId){
					flag=true;
					break;
				}
			}
		}
		return flag;
	}
	
	init();
});
function initParticipants(){
	for(pOwnerId in tmpOwnerList){
		var node = tmpOwnerList[pOwnerId];
		addParticipantView(node);
	}
}
//处理选中的参与者，将其展现在参与者列表中
function addParticipantElement(pOwner){
	if(tmpOwnerList[pOwner.internalId])//该参与者已选
		return false;
	tmpOwnerList[pOwner.internalId]=pOwner;
	ownerLinkedList.addLast(pOwner);
	//展现参与者
	addParticipantView(pOwner);
}

//将参与者展现在页面上
function addParticipantView(pOwner){
	var organInfo=dealPartsData(pOwner);
	var partyDiv = $("<div></div>").addClass("selectedDiv").text(organInfo);
	$("#showArea").append($(partyDiv));
	var delPicture=$("<div></div>").addClass("delArea");
	partyDiv.append(delPicture);
	$(partyDiv).width($(partyDiv).width()+20);
	if($("#showArea").height>75){
		$("#showArea").css("overflow-x","scroll");
	}else{
		$("#showArea").css("overflow-x","hidden");
	}
	$(delPicture).hide();
	$(partyDiv).bind("mouseover",function(){
		$(delPicture).show();
	});
	$(partyDiv).bind("mouseout",function(){
		$(delPicture).hide();
	});
	
	//绑定删除操作
	$(delPicture).bind("click", function(){
		//删除对象
		ownerLinkedList.remove(pOwner);
		delete tmpOwnerList[pOwner.internalId];
		$(this.parentNode).remove();
		if($("#showArea").height>75){
			$("#showArea").css("overflow-x","scroll");
		}else{
			$("#showArea").css("overflow-x","hidden");
		}
	});
}
function dealPartsData(pOwner){
	if(pOwner.typeId=="creator"||pOwner.typeId=="sender"){
		if(pOwner.organName!=null && pOwner.organName!=""){
			return pOwner.itemName+"-"+pOwner.organName;
		}else{
			return pOwner.itemName;
		}
	}else if(pOwner.typeId=="historyactselect"){
		var index=pOwner.organName.indexOf("&");
		if(index!=-1){
			return "["+pOwner.organName.substring(0,index)+"]"+pOwner.itemName+"-"+
				pOwner.organName.substring(index+1);
		}else{
			return "["+pOwner.organName+"]"+pOwner.itemName;
		}
	}else if(pOwner.typeId=="extend"){
		return pOwner.itemName.substring(0,4)+
			"["+pOwner.organId.substring(0,pOwner.organId.indexOf(":"))+"]"+
			pOwner.itemName.substring(4)+"-"+pOwner.organName;
	}
	else if(pOwner.itemId=="unitAllEmp"){
		return pOwner.organName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D121","(所有人)");
	}
	return pOwner.organName;
}
//添加组织视角
function setStruType(pageDiv){
	for(var i=0; i<struTypeList.length; i++){
		var struType=struTypeList[i];
		var option=$("<option></option>").val(struType.type).text(struType.typeName);
		$(pageDiv).find('.struType').append(option);
	}
	if(struTypeList.length<=1){
		$(pageDiv).find('.struType').hide();
	}
}
function closefn(){
	closeDialog(null);
}
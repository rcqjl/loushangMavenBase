$(function($){
	var pageType=0;
	var pageSize=7;
	var organTypeInfo=null;
	
	function getOrganType(){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/getAllOrganType",
			dataType:"json",
			async:false,
			success:function (data){
				if(data && data.success){
					if(data.typeList.length==0){
						showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
					}else{
						showType(data.typeList);
					}
				}else{
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				} 
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	};
	
	function showType(typeList){
		var m;
		if(pageType=="1"){
			$(".tableHeadDiv").css("height","60px");
			$("#thTypeId").css("width","280px");
			$("#thTypeName").css("width","280px");
			$("#typeTable").css("margin-left","20px");
			$("#typeTable").css("height","361px");
			$("#typeTable thead").css("top","30px");
		}else{
			$("#thTypeId").css("width","249px");
			$("#thTypeName").css("width","249px");
			$("#typeAdd").css("width","39px");
			$("#typeTable").css("margin-top","10px");
			$("#typeTable").css("margin-left","0px");
			$("#typeTable").css("height","211px");
			$("#typeTable thead").css("top","65px");
		}
		for(var n in typeList){
			var trDiv=$("<tr></tr>");
			var typeId=typeList[n].type;
			var typeName=typeList[n].typeName;
			var typeDiv=$("<td></td>").text(typeId);
			var typeNameDiv=$("<td></td>").text(typeName);
			if(pageType=="1"){
				typeDiv.css("width","280px");
				typeNameDiv.css("width","280px");
			}else{
				typeDiv.css("width","250px");
				typeNameDiv.css("width","250px");
			}
			var tdDiv=$("<td style='width:40px;'></td>").addClass("addTD");
			var addDiv=$("<div></div>").addClass("addPic");
			$(tdDiv).append(addDiv);
			addDiv.bind("click", function(event){
				var tId=$(this).parent().parent().attr("typeId");
				var tName=$(this).parent().parent().attr("typeName");
				selectedParty(tId, tName);
			});
			$(trDiv).attr("typeId",typeId).attr("typeName",typeName)
				.append(typeDiv).append(typeNameDiv).append(tdDiv);
			$("#typeTable tbody").append(trDiv);
			if(pageType=="1"){
				trDiv.bind("click", function(event){
					$(this).siblings().css("background-color","#FAFAFA");
					$(this).css("background-color","#F2F2F2");
					var tId=$(this).attr("typeId");
					var tName=$(this).attr("typeName");
					organTypeInfo={"typeId":tId, "typeName":tName};
				});
			}
			m=n;
		}
		m++;
		for(;m<pageSize;m++){
			var trDiv=$("<tr></tr>");
			if(pageType=="1"){
				trDiv.append("<td></td><td></td>");
			}else{
				trDiv.append("<td></td><td></td><td></td>");
			}
			$("#typeTable tbody").append(trDiv);
		}
		$("#typeTable tbody tr:odd").addClass("odd");
		if(pageType=="1"){
			$("#typeSearch").css("margin-top","45px");
			$("#typeAdd").hide();
			$(".addTD").hide();
		}
	}
	function initData(){
		getOrganType();
	}	
	$(function(){
		initParam();
		initData();
	});
	
	function initParam(){
		var pFrame= window.parent.document.getElementById("popupFrame1");
		if(pFrame!=null){
			pageType="1";
			pageSize=12;
			$("#typeBtnArea").show();
			// 从父窗口传递来的值
			var fromParentParam = pFrame.inParam;
			 // 单击某个按钮时，关闭子页面
			$('#typeConfirm').click(function() {
				var typeInfo=confirmList();
				if(typeInfo==false)
					return false;
				// 设置传给父页面的内容
				retObj={typeId:typeInfo.typeId,typeName:typeInfo.typeName,divId:fromParentParam.divId};
				// 关闭弹出框
				closeDialog1(retObj);
			});
			 // 单击某个按钮时，关闭子页面
			$('#typeCancel').click(function() {
				// 关闭弹出框
				closeDialog1(null);
			});
		}
	}
	function confirmList(){
		if(organTypeInfo==null){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D077","请选择类型！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}else{
			return organTypeInfo;
		}
	}
	//选中参与者
	function selectedParty(tId, tName){
		var pOwner = {};
		pOwner.typeId="commonly";
		pOwner.typeName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D075","一般");
		pOwner.itemId="organType";
		pOwner.itemName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D078","组织类型");
		pOwner.organId=tId;
		pOwner.organName=tName;
		pOwner.internalId=pOwner.typeId+"|"+pOwner.itemId+"|"+pOwner.organId;
		addParticipantElement(pOwner);
	}
});
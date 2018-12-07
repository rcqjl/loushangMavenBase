$(function($){
	var pageType=0;
	var pageSize=5;
	var recordCount=0;
	var currentPage=0;
	var pageCount=0;
	var addRoleList={};
	$("#roleSearchBtn").bind("click", function(event){
		var struId=$("#struId").val();
		var roleName=$("#roleName").val();
		getRole(struId, roleName, 0, pageSize);
	});
	$("#rolePreDiv").bind("click", function(event){
		if(currentPage!=0){
			var struId=$("#struId").val();
			var roleName=$("#roleName").val();
			currentPage=currentPage-1;
			getRole(struId, roleName, currentPage, pageSize);
		}
	});
	$("#roleNextDiv").bind("click", function(event){
		if(currentPage<pageCount-1){
			var struId=$("#struId").val();
			var roleName=$("#roleName").val();
			currentPage=currentPage+1;
			getRole(struId, roleName, currentPage, pageSize);
		}
	});
	function getRole(organName, roleName, startNum, pageSize){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/getRoleList",
			data:{			
				"organName":organName,
				"roleName":roleName,
				"startNum":startNum*pageSize,
				"pageSize":pageSize
			},
			dataType:"json",
			async:false,
			success:function (data){
				if(data && data.success){
					showRole(data);
				}else{
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	};
	
	function showRole(data){
		var roleList=null;
		if(data!=null){
			roleList=data.roleList;
			recordCount=data.pageCount;
			pageCount=Math.ceil(recordCount/pageSize);
		}
		$("#roleTable tbody tr").remove();
		var m;
		for(var n in roleList){
			var trDiv=$("<tr></tr>");
			var roleId=roleList[n].roleId;
			var roleName=roleList[n].roleName;
			var chkDiv=$("<td style='width:10%;'><input type='checkbox' class='chk'></td>").addClass("chkTD");
			if(addRoleList[roleId]){
				$(chkDiv).find(".chk").prop({checked:true});
			}
			var nameDiv=$("<td style='width:45%;'></td>").text(roleName);
			var relationName=$("<td style='width:45%;'></td>").text(roleList[n].relationName);
			var tdDiv=$("<td style='width:10%;'></td>").addClass("addTD");
			var addDiv=$("<div></div>").addClass("addPic");
			$(tdDiv).append(addDiv);
			addDiv.bind("click", function(event){
				var rId=$(this).parent().parent().attr("roleid");
				var rName=$(this).parent().parent().attr("rolename");
				selectedParty(rId, rName);
			});
			$(trDiv).attr("roleid",roleId).attr("rolename",roleName)
				.append(chkDiv).append(nameDiv).append(relationName).append(tdDiv);
			$("#roleTable tbody").append(trDiv);
			m=n;
		}
		m++;
		for(;m<pageSize;m++){
			var trDiv=$("<tr><td></td><td></td><td></td></tr>");
			$("#roleTable tbody").append(trDiv);
		}
		$("#roleTable tbody tr").removeClass("selected");
		$("#roleTable tbody tr:odd").addClass("odd");
		$("#roleTable tbody tr").bind("click",function(){
			$("#roleTable tbody tr").removeClass("selected");
			$(this).addClass("selected");
		});
		$("#rolePageNum span").text(pageCount);
		if(pageType=="0"){
			$("#roleChk").hide();
			$(".chkTD").hide();
			$("#roleTable").css("margin-left","0px");
		}else{
			$("#roleSearch").css("margin-top","35px");
			$("#roleAdd").hide();
			$(".addTD").hide();
			$("#roleTable").css("margin-left","20px");
		}
		$(".chk").bind("change",function(){
			var roleId=$(this).parent().parent().attr("roleid");
			var roleName=$(this).parent().parent().attr("rolename");
			if($(this).is(":checked")){
				addRoleList[roleId]={"roleId":roleId, "roleName":roleName};
			}else{
				delete addRoleList[roleId];
			}
		});
		showPageTool();
	}
	function showPageTool(){
		if(pageCount>1){
			$('#rolePreAndNext').show();
			if(currentPage==0){
				$("#rolePreDiv span").removeClass("preSpan");
				$("#rolePreDiv span").addClass("disPreSpan");
			}else{
				$("#rolePreDiv span").removeClass("disPreSpan");
				$("#rolePreDiv span").addClass("preSpan");
			}
			if(currentPage<pageCount-1){
				$("#roleNextDiv span").removeClass("disNextSpan");
				$("#roleNextDiv span").addClass("nextSpan");
			}else{
				$("#roleNextDiv span").removeClass("nextSpan");
				$("#roleNextDiv span").addClass("disNextSpan");
			}
		}else{
			$('#rolePreAndNext').hide();
		}
	}
	function initData(){
		getRole(null, null, 0, pageSize);
	}	
	$(function(){
		initParam();
		initData();
	});
	
	function initParam(){
		var pFrame= window.parent.document.getElementById("popupFrame1");
		if(pFrame!=null){
			pageType="1";
			pageSize=10;
			$("#roleBtnArea").show();
			// 从父窗口传递来的值
			var fromParentParam = pFrame.inParam;
			addRoleList=fromParentParam.addRoleList;
			if(!addRoleList) addRoleList={};
			 // 单击某个按钮时，关闭子页面
			$('#roleConfirm').click(function() {
				var roleInfo=confirmList();
				if(roleInfo==false)
					return false;
				// 设置传给父页面的内容
				retObj={roleId:roleInfo.roleId,roleName:roleInfo.roleName,divId:fromParentParam.divId,addRoleList:addRoleList};
				// 关闭弹出框
				closeDialog1(retObj);
			});
			 // 单击某个按钮时，关闭子页面
			$('#roleCancel').click(function() {
				// 关闭弹出框
				closeDialog1(null);
			});
		}
	}
	function confirmList(){
		var roleId="";
		var roleName="";
		for(var id in addRoleList){
			roleId+=id+"#";
			roleName+=addRoleList[id].roleName+"#";
		}
		roleId=roleId.substring(0,roleId.length-1);
		roleName=roleName.substring(0,roleName.length-1);
		if(addRoleList.length==0){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D074","请选择角色！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}
		return {roleId:roleId, roleName:roleName};
	}
	//选中参与者
	function selectedParty(rId, rName){
		var pOwner = {};
		pOwner.typeId="commonly";
		pOwner.typeName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D075","一般");
		pOwner.itemId="role";
		pOwner.itemName=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D076","角色");
		pOwner.organId=rId;
		pOwner.organName=rName;
		pOwner.internalId=pOwner.typeId+"|"+pOwner.itemId+"|"+pOwner.organId;
		addParticipantElement(pOwner);
	}
});
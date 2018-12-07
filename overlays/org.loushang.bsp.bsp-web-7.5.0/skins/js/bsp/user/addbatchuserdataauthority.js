$(document).ready(function(){
	//请求下拉框内容
	$.ajax({
        url:context+"/service/bsp/user/OrganPerspective",
        type:"post",
        async:false,
        success:function(data){
       // 组装options
		var options = "";
		for(var i = 0; i < data.length; i++){
			var saveVal = data[i].struType;
			var showVal = data[i].struTypeName;		
			var option = "<option value='"+saveVal+"'>"+ showVal +"</option>";
			options += option;	
		}
		// 添加到页面
		$("#OrganPerspective").append(options);
	   }
    });
	
	//初始化表单
	initAddBatchUserDataAuthority();
	
	//组织视角
	$("#OrganPerspective").bind("change",function(){
		gridAddBatchData.setParameter("userIds",userIds);
		gridAddBatchData.setParameter("userId",signId);
		gridAddBatchData.setParameter("struType",$("#OrganPerspective").val());
		gridAddBatchData.reload();
	});
	
	//查询
	$("#addBatchDataQuery").on("click",function(){
		addBatchDataQuery();
	});
	
	//回车查询事件
	$("#bachtOrganName").keydown(function(event){
		if(event.keyCode == 13){
			addBatchDataQuery();
		}
	});
});

//初始化表单
function initAddBatchUserDataAuthority(){
	var options = {
			"ordering": false,
			"btnDefs": [

			            ]
			};
			var url = context +　"/service/bsp/user/addDataAut";
			gridAddBatchData = new L.FlexGrid("AddBatchDatasAutList",url);
			gridAddBatchData.setParameter("userId",signId);
			gridAddBatchData.setParameter("userIds",userIds);
			gridAddBatchData.setParameter("struType",$("#OrganPerspective").val());
			gridAddBatchData.init(options);
}

function rendercheckbox1(data, type, full) {
    return '<input type="checkbox" value="1" id="isScope" name="isScope"/>';
}
function rendercheckbox2(data, type, full) {
    return '<input type="checkbox" value="1" id="isDefault" name="isDefault"/>';
}

//操作
function permitPerations(data,type,full){
	var msg = L.getLocaleMessage("bsp.user.001","添加");
	data = "<button type='button' class='add btn ue-btn-primary'/>"+msg+"</button>";
	return data;
}

//添加
$(document).on("click",".add",function() {
	var organType = gridAddBatchData.oTable.row($(this).parents("tr")).data().organType;
	var organId = gridAddBatchData.oTable.row($(this).parents("tr")).data().organId;
	var organName = gridAddBatchData.oTable.row($(this).parents("tr")).data().organName;
	var struType = $("#OrganPerspective").val(); 
	var isScope = $(this).parents("tr").find(" :checked").val();
	if(isScope == undefined){
		isScope = "0";
	}
	var isDefault = $(this).parents("tr").find("input[name='isDefault']:checked").val();
	if(isDefault == undefined){
		isDefault = "0";
	}
	$.ajax({
        url:context+"/service/bsp/user/addUserDataPermit",
        data:JSON.stringify({"organType":organType,"organId":organId,"organName":organName,"struType":struType,"isScope":isScope,"isDefault":isDefault,"userId":userIds}),
        type:"post",
        contentType: "application/json",
        async:false,
        success:function(){
        	gridAddBatchData.reload();
        }
    });
});

//查询
function addBatchDataQuery(){
	var organName = $("#bachtOrganName").val();
	var url = context + "/service/bsp/user/addDataAut";
	var param = {"organName":organName,"userIds":userIds,"userId":signId,"struType":$("#OrganPerspective").val()};
	url = encodeURI(url,"utf-8");
	gridAddBatchData.reload(url,param);
}
//提示信息
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(
		    msg, //提示框显示内容
		    {
		        autoclose : 1000, 
		        position : place,
		        style : type
		    });
}

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
	
	// 数据权限增加页面
	initDataPermit();
	
	// 查询 
	$("#addDataQuery").on("click",function() { 
		queryDataPermitForm(); 
	});
	  
	$("#toOrganName").keydown(function(event) {
		if(event.keyCode==13){ 
			queryDataPermitForm();
			}
	});
	
	//组织视角
	$("#OrganPerspective").bind("change",function(){
		gridAddData.setParameter("userIds",userIds);
		gridAddData.setParameter("userId",signId);
		gridAddData.setParameter("struType",$("#OrganPerspective").val());
		gridAddData.reload();
	});
});
function initDataPermit(){
	var options = {
			"ordering": false,
			"btnDefs": [

			            ]
			};
			var url = context +　"/service/bsp/user/addDataAut";
			gridAddData = new L.FlexGrid("AddDatas",url);
			gridAddData.setParameter("userIds",userIds);
			gridAddData.setParameter("userId",signId);
			gridAddData.setParameter("struType",$("#OrganPerspective").val());
			gridAddData.init(options);
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

//查询
function queryDataPermitForm(){
	var organName = $("#toOrganName").val();
	var url = context+"/service/bsp/user/addDataAut";
	var param={"organName":organName,"userIds":userIds,"userId":signId,"struType":$("#OrganPerspective").val()};
	url=encodeURI(url,"utf-8");
	gridAddData.reload(url,param);
}

//添加
$(document).on("click",".add",function() {
	var msg = L.getLocaleMessage("bsp.user.085","添加成功！");
	var organType = gridAddData.oTable.row($(this).parents("tr")).data().organType;
	var organId = gridAddData.oTable.row($(this).parents("tr")).data().organId;
	var organName = gridAddData.oTable.row($(this).parents("tr")).data().organName;
	var struType = $("#OrganPerspective").val(); 
	var isScope = $(this).parents("tr").find("input[name='isScope']:checked").val();
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
        success:function(data){
        	gridAddData.reload();
        	sticky(msg);
        }
    });
});
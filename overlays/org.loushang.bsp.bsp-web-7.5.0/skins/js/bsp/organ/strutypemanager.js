// 提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(
		    msg,
		    {
		        autoclose : 2000,
		        position : place,
		        style : type
		    }
	);
}
$(function() {
	// 点击组织视角
	$(".stru-type-name").on({
		click: function(e) {
			var struTypeId = $(this).parent().data("type");
			struTypeId=encodeURI(encodeURI(struTypeId));
			var struTypeName = $(this).find("span").text();
			window.location.href = context + "/service/bsp/organ/forOrganDetail"
									+ "?struType="+struTypeId;
		}
	});
	
	// 组织视角悬停时，切换按钮的显示与隐藏
	$(".stru-type").on({
		mouseenter: function(e) {
			var msg1 = L.getLocaleMessage("bsp.organ.008","删除");
			var msg2 = L.getLocaleMessage("bsp.organ.066","编辑");
			$(this).find(".oper-btn").append("<span class='del'>"+msg1+"</span><span class='edit'>"+msg2+"</span>");
		},
		mouseleave: function(e) {
			$(this).find(".oper-btn").empty();
		}
	});
	
	// 组织视角的“删除”和“编辑”按钮事件
	$(".oper-btn").on("click", function(e){
		var msg1 = L.getLocaleMessage("bsp.organ.099","确定删除该记录？");
		var msg2 = L.getLocaleMessage("bsp.organ.100","修改组织视角");
		var msg3 = L.getLocaleMessage("bsp.organ.004","取消");
		var $target = $(e.target);
		var struTypeId = $target.closest(".stru-type").data("type");
		if($target.hasClass("del")) {
			$.dialog({
				type: "confirm",
				content: msg1,
				autofocus: true,
				ok: function() {
					delStruType(struTypeId);
				},
				cancel: function(){}
			});
		}
		if($target.hasClass("edit")) {
			var struTypeId = $(this).parent().data("type");
			$.dialog({
				type: "iframe",
				url: context + "/service/bsp/organ/forUpdateStruType/" + struTypeId + "?status=edit",
				title: msg2,
				cancelVal: msg3,
				width: 600,
				height: 260,
				onclose: function () {
					if(this.returnValue) {
						location.reload();
					}
				}
			});
		}
	});
	
	// 增加组织视角
	$(".add-stru-type").click(function() {
		addStruType();
	});
})

function addStruType() {
	var msg1 = L.getLocaleMessage("bsp.organ.101","新增组织视角");
	var msg2 = L.getLocaleMessage("bsp.organ.004","取消");
	$.dialog({
		type: "iframe",
		url: context + "/service/bsp/organ/forAddStruType" + "?status=create",
		title: msg1,
		cancelVal: msg2,
		width: 600,
		height: 260,
		onclose: function () {
			var returnVal = this.returnValue;
			if(returnVal) {
				location.reload();
			}
		}
	});
}

// 删除组织视角
function delStruType(struTypeId) {
	$.ajax({
		url: context + "/service/bsp/organ/deleteStruType/" + struTypeId,
		async: false,
		success: function() {
			location.reload();
		},
		error: function(e) {
			alert(e.responseText);
		}
	});
}
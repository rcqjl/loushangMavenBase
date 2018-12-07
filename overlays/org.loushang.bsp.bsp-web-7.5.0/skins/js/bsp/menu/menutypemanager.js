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
	// 点击菜单
	$(".menu-type-name").on({
		click: function(e) {
			var menuTypeId = $(this).parent().data("type");
			var menuTypeName = $(this).find("span").text();
			window.location.href = context + "/service/bsp/menu/forMenuDetail"
									+ "?menuTypeId="+menuTypeId;
		}
	});
	
	// 菜单类别悬停时，切换按钮的显示与隐藏
	$(".menu-type").on({
		
		mouseenter: function(e) {
			var msg1 = L.getLocaleMessage("bsp.menu.001","删除");
			var msg2 = L.getLocaleMessage("bsp.menu.002","编辑");
			$(this).find(".oper-btn").append("<span class='del'>"+msg1+"</span><span class='edit'>"+msg2+"</span>");
		},
		mouseleave: function(e) {
			$(this).find(".oper-btn").empty();
		}
	});
	
	// 菜单类别的“删除”和“编辑”按钮事件
	$(".oper-btn").on("click", function(e){
		var msg1 = L.getLocaleMessage("bsp.menu.003","确定删除该记录？");
		var msg2 = L.getLocaleMessage("bsp.menu.004","修改菜单类别");
		var msg3 = L.getLocaleMessage("bsp.menu.005","取消");
		var $target = $(e.target);
		var menuTypeId = $target.closest(".menu-type").data("type");
		if($target.hasClass("del")) {
			$.dialog({
				type: "confirm",
				content: msg1,
				autofocus: true,
				ok: function() {
					delMenuType(menuTypeId);
				},
				cancel: function(){}
			});
		}
		if($target.hasClass("edit")) {
			var menuTypeId = $(this).parent().data("type");
			$.dialog({
				type: "iframe",
				url: context + "/service/bsp/menu/forUpdateMenuType/" + menuTypeId + "?status=edit",
				title: msg2,
				cancelVal: msg3,
				width: 580,
				height: 200,
				onclose: function () {
					if(this.returnValue) {
						location.reload();
					}
				}
			});
		}
	});
	
	// 增加菜单
	$(".add-menu-type").click(function() {
		addMenuType();
	});
})

function showMenu(menuTypeId) {
}

function addMenuType() {
	var msg1 = L.getLocaleMessage("bsp.menu.006","新增菜单类别");
	var msg2 = L.getLocaleMessage("bsp.menu.005","取消");
	$.dialog({
		type: "iframe",
		url: context + "/service/bsp/menu/forCreateMenuType" + "?status=create",
		title: msg1,
		cancelVal: msg2,
		width: 580,
		height: 200,
		onclose: function () {
			var returnVal = this.returnValue;
			if(returnVal) {
				location.reload();
			}
		}
	});
}

// 删除菜单类别
function delMenuType(menuTypeId)  {
	$.ajax({
		url: context + "/service/bsp/menu/deleteMenuType/" + menuTypeId,
		async: false,
		success: function() {
			location.reload();
		},
		error: function(e) {
			$.dialog({
				type: 'alert',
				content: e.responseText,
			    autofocus: true
			});
		}
	});
}
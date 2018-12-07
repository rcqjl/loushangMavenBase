/*
 * 流程组件属性弹出框静态类
 */
(function($) {
	if (typeof WFHelp == "undefined") {
		WFHelp = {};
	}

	// 初始化
	$(function() {
		// 设置必填符号
		$(".cfIsRequired").each(function() {
			$(this).prev('label').after('<font style="color:red;">*</font>');
		});
		
		// tab页初始化
		$(".ui-tabs .ui-tabs-nav li").on(
				'click',
				function() {
					var tabs = $(this).parent().children("li");
					var panels = $('.ui-tabs-panel');
					var index = $.inArray(this, tabs);
					if (panels.eq(index)[0]) {
						tabs.removeClass("ui-tabs-selected").eq(index).addClass(
								"ui-tabs-selected");
						panels.addClass("ui-tabs-hide").eq(index).removeClass(
								"ui-tabs-hide");
					}
				
				}
		);
		
		// 为确定键添加回车绑定
		$('body').keydown(function(evt){
			if(evt.keyCode == 13 || evt.keyCode == 42){
				$('#confirmBtn').trigger('click');
			}
		});
	});
	
	/**
	 * 设置域是否根据名称自动生成Id
	 * @param isCreateFromParent 从父窗口中传入的值，用于初始化控件的值
	 * @param createIdElemId 自动生成Id控件的Id
	 * @param src 源
	 * @param target 目标
	 * @param evt 事件名称
	 */
	WFHelp.setCreateId = function(isCreateFromParent, createIdElemId, src, target, evt){
		// 初始化复选框
		if(isCreateFromParent && isCreateFromParent == '1'){
			$('#' + createIdElemId).attr('checked', true);
		}
		
		// 复选框监听单击事件，如果选中
		$('#' + createIdElemId).click(function(){
			if($(this).is(':checked')){
				setPinyin(src, target);
			}
			
		});
		
		$(src).on(evt, function(e){
			if($('#' + createIdElemId).is(':checked')){
				setPinyin(src, target);
			}
		});
	};
	
	/**
	 * 生成拼音
	 */
	function setPinyin(srcElement, targetElement){
		
		var val = $(srcElement).val();
		var pinyin = '';
		if(val){
			var o = new Pinyin();
			pinyin = o.getFullChars(val);
			//去除特殊字符
			pinyin=removeSpecialChar(pinyin);
		}
		
		if(pinyin !== ''){
			// 域长度限制为30
			if(pinyin.length > 30){
				$(targetElement).val(pinyin.substring(0,30));
			}else{
				$(targetElement).val(pinyin);
			}
		}
	};
	
	/**
	 * 去除特殊字符
	 * 
	 * @param s
	 *            值
	 * @return 
	 */
	function removeSpecialChar(s){
		var pattern = /[a-zA-Z0-9_]{1}/;
		var rs = ""; 

		for (var i = 0; i < s.length; i++) { 
			var single = s.substr(i, 1);
			if(single.match(pattern)){
				rs = rs + single;
			} 
		}
		
		return rs;
	};
})(jQuery);
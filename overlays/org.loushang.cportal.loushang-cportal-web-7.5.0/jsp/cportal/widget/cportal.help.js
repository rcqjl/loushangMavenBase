/*
 * 表单组件属性弹出框静态类
 */
(function($) {
	if (typeof CPHelp == "undefined") {
		CPHelp = {};
	}
	
	// 校验
	CPHelp.validate = function() {
		var result = true;
		// 非空校验
		$(".cfIsRequired:visible").each(function(i, field) {
			if (!$.trim($(field).val())) {
				showDialog("alert", $(field).attr("name") +L.getLocaleMessage("tip-nullmsg","不能为空！"),L.getLocaleMessage("tip-message","提示信息"),L.getLocaleMessage("cportal.confirm","确定"),L.getLocaleMessage("cportal.cancel","取消"),300);
				result = false;
				return false;
			}
		});

		if(!result){
			return false;
		}
		
		// 数字校验
		$(".cfIsNumber").each(function(i, field) {
			var fv = $.trim($(field).val());
			if (fv && !$.isNumeric(fv)) {
				showDialog("alert","域[" + $(field).attr("name") + "]只能输入数字！","提示信息",300);
				result = false;
				return false;
			}
		});
		
		if(!result){
			return false;
		}
		
		// 不能以数字开头
		$('.cfNotStartWithNum').each(function(i, field){
			if(/^\d+[^0-9]*$/.test($(field).val())){
				showDialog("alert","域[" + $(field).attr("name") + "]不能以数字开头！","提示信息",300);
				result = false;
				return false;
			}
		});
		
		if(!result){
			return false;
		}
		
		// 正则表达式
		$('.cfRegExp').each(function(i, field){
			var value = $.trim($(field).val());
			if (value && !/^\/[\s\S]*\/$/.test(value)) {
				showDialog("alert","域[" + $(field).attr("name") + "]必须以/开头，以/结尾！","提示信息",300);
				result = false;
				return false;
			}
		});
		
		if(!result){
			return false;
		}
		
		// 特殊字符
		$('[id=fieldId],[id=zoneId],[id=formId]').each(function(i, field){
			if($(field).val() && !((/^[A-Za-z_][A-Za-z0-9_]*$/).test($(field).val()))){
				showDialog("alert","域[" + $(field).attr("name") + "]包含特殊字符！","提示信息",300);
				result = false;
				return false;
			}
		});
		
		return result;
	}
	
	/**
	 * 设置域是否根据名称自动生成Id
	 * @param isCreateFromParent 从父窗口中传入的值，用于初始化控件的值
	 * @param createIdElemId 自动生成Id控件的Id
	 * @param src 源
	 * @param target 目标
	 * @param evt 事件名称
	 */
	CPHelp.setCreateId = function(isCreateFromParent, createIdElemId, src, target, evt){
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
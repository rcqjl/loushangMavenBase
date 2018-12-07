/*
 * Simplified Chinese translation
 * By DavidHu
 * 09 April 2007
 */

L5.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">加载中...</div>';

if(L5.View){
   L5.View.prototype.emptyText = "";
}

if(L5.grid.GridPanel){
   L5.grid.GridPanel.prototype.ddText = "{0} 选择行";
   L5.grid.GridPanel.prototype.dataLoadingText = "数据加载中...";
}

if(L5.TabPanelItem){
   L5.TabPanelItem.prototype.closeText = "关闭";
}

if(L5.form.Field){
   L5.form.Field.prototype.invalidText = "输入值非法";
}

Date.monthNames = [
   "一月",
   "二月",
   "三月",
   "四月",
   "五月",
   "六月",
   "七月",
   "八月",
   "九月",
   "十月",
   "十一月",
   "十二月"
];

Date.dayNames = [
   "日",
   "一",
   "二",
   "三",
   "四",
   "五",
   "六"
];

if(L5.MessageBox){
   L5.MessageBox.buttonText = {
      ok     : "确定",
      cancel : "取消",
      yes    : "是",
      no     : "否"
   };
}

if(L5.util.Format){
   L5.util.Format.date = function(v, format){
      if(!v) return "";
      if(!(v instanceof Date)) v = new Date(Date.parse(v));
      return v.dateFormat(format || "y年m月d日");
   };
}

if(L5.DatePicker){
   L5.apply(L5.DatePicker.prototype, {
      todayText         : "今天",
      minText           : "日期在最小日期之前",
      maxText           : "日期在最大日期之后",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames        : Date.monthNames,
      dayNames          : Date.dayNames,
      nextText          : '下月 (Control+Right)',
      prevText          : '上月 (Control+Left)',
      monthYearText     : '选择一个月 (Control+Up/Down 来改变年)',
      todayTip          : "{0} (空格键选择)",
      format            : "y年m月d日",
      okText            : "确定",
      cancelText        : "取消"
   });
}

if(L5.PagingToolbar){
   L5.apply(L5.PagingToolbar.prototype, {
      beforePageText : "第",
      afterPageText  : "页 共 {0} 页",
      firstText      : "第一页",
      prevText       : "前一页",
      nextText       : "下一页",
      lastText       : "最后页",
      refreshText    : "刷新",
      displayMsg     : "显示 {0} - {1}，共 {2} 条",
      emptyMsg       : '没有数据需要显示'
   });
}

if(L5.form.TextField){
   L5.apply(L5.form.TextField.prototype, {
      minLengthText : "该输入项的最小长度是 {0}",
      maxLengthText : "该输入项的最大长度是 {0}",
      blankText     : "该输入项为必输项",
      regexText     : "",
      emptyText     : null
   });
}

if(L5.form.NumberField){
   L5.apply(L5.form.NumberField.prototype, {
      minText : "该输入项的最小值是 {0}",
      maxText : "该输入项的最大值是 {0}",
      nanText : "{0} 不是有效数值"
   });
}

if(L5.form.DateField){
   L5.apply(L5.form.DateField.prototype, {
      disabledDaysText  : "禁用",
      disabledDatesText : "禁用",
      minText           : "该输入项的日期必须在 {0} 之后",
      maxText           : "该输入项的日期必须在 {0} 之前",
      invalidText       : "{0} 是无效的日期 - 必须符合格式： {1}",
      format            : "y年m月d日"
   });
}

if(L5.form.ComboBox){
   L5.apply(L5.form.ComboBox.prototype, {
      loadingText       : "加载...",
      valueNotFoundText : undefined
   });
}

if(L5.form.VTypes){
   L5.apply(L5.form.VTypes, {
      emailText    : '该输入项必须是电子邮件地址，格式如： "user@domain.com"',
      urlText      : '该输入项必须是URL地址，格式如： "http:/'+'/www.domain.com"',
      alphaText    : '该输入项只能包含字符和_',
      alphanumText : '该输入项只能包含字符,数字和_'
   });
}

if(L5.grid.GridView){
   L5.apply(L5.grid.GridView.prototype, {
      sortAscText  : "正序",
      sortDescText : "逆序",
      lockText     : "锁列",
      unlockText   : "解锁列",
      columnsText  : "列",
      msgLabelWithHeader : '第{0}行[{1}]列{2}'
   });
}

if(L5.grid.GroupingView){
	 L5.apply(L5.grid.GroupingView.prototype, {
		 groupByText: "按照当前字段分组",
		 showGroupsText: "分组显示"
	   });
}

if(L5.tree.BatchTreeLoaderProxy){
	 L5.apply(L5.tree.BatchTreeLoaderProxy.prototype, {
		 uncorrespondText: "请求的loader与返回的数据不能对应"
	   });
}

if(L5.grid.PropertyColumnModel){
   L5.apply(L5.grid.PropertyColumnModel.prototype, {
      nameText   : "名称",
      valueText  : "值",
      dateFormat : "y年m月d日"
   });
}
L5.columnModel_modifyTest = "修改";

if(L5.layout.BorderLayout && L5.layout.BorderLayout.SplitRegion){
   L5.apply(L5.layout.BorderLayout.SplitRegion.prototype, {
      splitTip            : "拖动来改变尺寸.",
      collapsibleSplitTip : "拖动来改变尺寸. 双击隐藏."
   });
}

L5.connectionError="连接服务器失败";
L5.turnPage="页号太大或太小";
L5.turnPageFirst="已经是第一页";
L5.turnPageLast="已经是最后一页";
L5.valError="校验错误";
L5.parseReturnError="解析返回值异常";
L5.loadDateError="加载数据出错：";
L5.radio="选择";
L5.notfind="找不到";

if(L5.HtmlExt){
	L5.HtmlExt.errorTip = {
			require : "不能为空。",
			date :  "不是正确的日期格式。",
			equal : "不相等。",
			regex : "格式不正确。",
			compare : "不符合校验规则。",
			length : "长度不正确。",
			lengthUTF8 : "长度不正确。",
			lengthGBK : "长度不正确。",
			custom : "不正确。",
			def : "格式不正确。",
			
			notEqualToValue : "不等于 {0}。",
			notEqualToRuleValue : "不等于 {0} 域的值。",
			
			mustLess : "必须小于 {0}。",
			mustLarger : "必须大于 {0}。"
		};
}


L5.alertText = "提示";
L5.pleaseSelect = "请选择……";

L5.saveSuccess = "保存成功！";

L5.unlogged = "用户没有登录！";
L5.cmdFailed ="获取服务器端信息出错!"
	
if(L5.grid.GridSummary){
	   L5.apply(L5.grid.GridSummary.prototype, {
		   sumText   : "合计:"
	   });
}

if(L5.DataPilot){
	   L5.apply(L5.DataPilot.prototype, {
		    firstRecordText:"第一条记录",
			prevRecordText:"上一条记录",
			nextRecordText:"下一条记录",
			prevPageText:"上一页",
			nextPageText:"下一页",
			lastRecordText:"最后一条记录"
	   });
}

L5.data_showText = {
		selectDataText : "选择日期：",
		startText : "从：",
		endText:"到：",
		dataSelectText:"日期选择",
		yesText:"确定",
		closeText:"关闭",
		clearText:"清除",
		yearText:"年",
		dataDetailText:"具体日期",
		byTimeperiodText:"按时间段",
		byMonthText:"按月份",
		byYearText:"按年份",
		selectMonthText:"请选择月份：",
		selectYearText:"请选择年份：",
		pleaseSelectDataText:"请选择日期",
		invalidDataFormatText:"日期格式不正确,正确格式是:{0}",
		pleaseInputStartDataText:"请输入开始日期",
		invalidStartDataFormatText:"开始日期格式不正确,正确格式是:{0}",
		pleaseInputEndDataText:"请输入结束日期",
		invalidStartDataFormatText:"结束日期格式不正确,正确格式是:{0}",
		endVSStartDataText:"结束日期不能早于开始日期",
		invalidYearFormatText:"年份格式不正确",
		invalidMonthFormatText:"月份格式不正确"
};
L5.data_Date_monthNames = [
                       "1月",
                       "2月",
                       "3月",
                       "4月",
                       "5月",
                       "6月",
                       "7月",
                       "8月",
                       "9月",
                       "10月",
                       "11月",
                       "12月"
];

if(L5.GridHelpWindow){
	   L5.apply(L5.GridHelpWindow.prototype, {
		   title:'帮助信息' 
	   });
}

L5.help_showText = {
		queryText:'查询',
		yesText:'确定',
		closeText:'关闭',
		clearText:'清除',
		displayMsgText:"从第{0}条到{1}条，一共{2}条",
		emptyMsgText :"没有记录",
		selectRecordText:"请选择记录",
		selectedRecordText:"已选记录",
		deleteText:"删除",
		deleteAllText:"全部删除"

};

if(L5.QueryWindow){
	   L5.apply(L5.QueryWindow.prototype, {
		   title:'查询窗口' 
	   });
}

L5.query_showText = {
		queryText:'查询',
		closeText:'关闭',
		inputParamTip:'请在下面输入查询条件',
		pleaseSelectText:'请选择'
};

L5.sysAlert = "系统提示";
L5.noMethodError = "该类不支持此方法！"
	
L5.toLegendText = "已选内容";
L5.fromLegendText = "可选内容";


L5.Time_TimeUnitNames = {
		minute : "分",
		hour : "时"
};

L5.yesText = L5.okText = "确定";
L5.enterToSelectText = "回车选择";

if(L5.Validator){
	L5.Validator.errorMsg = {
		require : "不能为空。",
		date :  "不是正确的日期格式。",
		regex : "格式不正确。",
		notEqualToValue : "不等于 {0}。",
		notEqualToRuleValue : "不等于 {0} 域的值。",
		mustLess : "必须小于 {0}。",
		mustLarger : "必须大于 {0}。",
		uniqueConstraints: "违反唯一性约束。",
		length_e_c: "英文(中文)长度不能超过{0}({1})个字符。",
		length:"长度不能超过{0}个字符。"
	};
}
L5.undefineInModel = "没有定义";
L5.validMsg ="[{0}]{1}";
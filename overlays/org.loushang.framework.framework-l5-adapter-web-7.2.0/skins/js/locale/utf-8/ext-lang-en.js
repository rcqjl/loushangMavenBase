/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 *
 * English Translations
 * updated to 2.2 by Condor (8 Aug 2008)
 */

L5.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Loading...</div>';

if(L5.DataView){
  L5.DataView.prototype.emptyText = "";
}

if(L5.grid.GridPanel){
  L5.grid.GridPanel.prototype.ddText = "{0} selected row{1}";
  L5.grid.GridPanel.prototype.dataLoadingText = "Data loading...";
}

if(L5.LoadMask){
  L5.LoadMask.prototype.msg = "Loading...";
}

Date.monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

Date.getShortMonthName = function(month) {
  return Date.monthNames[month].substring(0, 3);
};

Date.monthNumbers = {
  Jan : 0,
  Feb : 1,
  Mar : 2,
  Apr : 3,
  May : 4,
  Jun : 5,
  Jul : 6,
  Aug : 7,
  Sep : 8,
  Oct : 9,
  Nov : 10,
  Dec : 11
};

Date.getMonthNumber = function(name) {
  return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

Date.dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

Date.getShortDayName = function(day) {
  return Date.dayNames[day].substring(0, 3);
};

Date.parseCodes.S.s = "(?:st|nd|rd|th)";

if(L5.MessageBox){
  L5.MessageBox.buttonText = {
    ok     : "OK",
    cancel : "Cancel",
    yes    : "Yes",
    no     : "No"
  };
}

if(L5.util.Format){
  L5.util.Format.date = function(v, format){
    if(!v) return "";
    if(!(v instanceof Date)) v = new Date(Date.parse(v));
    return v.dateFormat(format || "m/d/Y");
  };
}

if(L5.DatePicker){
  L5.apply(L5.DatePicker.prototype, {
    todayText         : "Today",
    minText           : "This date is before the minimum date",
    maxText           : "This date is after the maximum date",
    disabledDaysText  : "",
    disabledDatesText : "",
    monthNames        : Date.monthNames,
    dayNames          : Date.dayNames,
    nextText          : 'Next Month (Control+Right)',
    prevText          : 'Previous Month (Control+Left)',
    monthYearText     : 'Choose a month (Control+Up/Down to move years)',
    todayTip          : "{0} (Spacebar)",
    format            : "m/d/y",
    okText            : "&#160;OK&#160;",
    cancelText        : "Cancel",
    startDay          : 0
  });
}

if(L5.PagingToolbar){
  L5.apply(L5.PagingToolbar.prototype, {
    beforePageText : "Page",
    afterPageText  : "of {0}",
    firstText      : "First Page",
    prevText       : "Previous Page",
    nextText       : "Next Page",
    lastText       : "Last Page",
    refreshText    : "Refresh",
    displayMsg     : "Displaying {0} - {1} of {2}",
    emptyMsg       : 'No data to display'
  });
}

if(L5.form.Field){
  L5.form.Field.prototype.invalidText = "The value in this field is invalid";
}

if(L5.form.TextField){
  L5.apply(L5.form.TextField.prototype, {
    minLengthText : "The minimum length for this field is {0}",
    maxLengthText : "The maximum length for this field is {0}",
    blankText     : "This field is required",
    regexText     : "",
    emptyText     : null
  });
}

if(L5.form.NumberField){
  L5.apply(L5.form.NumberField.prototype, {
    decimalSeparator : ".",
    decimalPrecision : 2,
    minText : "The minimum value for this field is {0}",
    maxText : "The maximum value for this field is {0}",
    nanText : "{0} is not a valid number"
  });
}

if(L5.form.DateField){
  L5.apply(L5.form.DateField.prototype, {
    disabledDaysText  : "Disabled",
    disabledDatesText : "Disabled",
    minText           : "The date in this field must be after {0}",
    maxText           : "The date in this field must be before {0}",
    invalidText       : "{0} is not a valid date - it must be in the format {1}",
    format            : "m/d/y",
    altFormats        : "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
  });
}

if(L5.form.ComboBox){
  L5.apply(L5.form.ComboBox.prototype, {
    loadingText       : "Loading...",
    valueNotFoundText : undefined
  });
}

if(L5.form.VTypes){
  L5.apply(L5.form.VTypes, {
    emailText    : 'This field should be an e-mail address in the format "user@domain.com"',
    urlText      : 'This field should be a URL in the format "http:/'+'/www.domain.com"',
    alphaText    : 'This field should only contain letters and _',
    alphanumText : 'This field should only contain letters, numbers and _'
  });
}

if(L5.form.HtmlEditor){
  L5.apply(L5.form.HtmlEditor.prototype, {
    createLinkText : 'Please enter the URL for the link:',
    buttonTips : {
      bold : {
        title: 'Bold (Ctrl+B)',
        text: 'Make the selected text bold.',
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: 'Italic (Ctrl+I)',
        text: 'Make the selected text italic.',
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: 'Underline (Ctrl+U)',
        text: 'Underline the selected text.',
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: 'Grow Text',
        text: 'Increase the font size.',
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: 'Shrink Text',
        text: 'Decrease the font size.',
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: 'Text Highlight Color',
        text: 'Change the background color of the selected text.',
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: 'Font Color',
        text: 'Change the color of the selected text.',
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: 'Align Text Left',
        text: 'Align text to the left.',
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: 'Center Text',
        text: 'Center text in the editor.',
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: 'Align Text Right',
        text: 'Align text to the right.',
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: 'Bullet List',
        text: 'Start a bulleted list.',
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: 'Numbered List',
        text: 'Start a numbered list.',
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: 'Hyperlink',
        text: 'Make the selected text a hyperlink.',
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: 'Source Edit',
        text: 'Switch to source editing mode.',
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(L5.grid.GridView){
  L5.apply(L5.grid.GridView.prototype, {
    sortAscText  : "Sort Ascending",
    sortDescText : "Sort Descending",
    columnsText  : "Columns",
    msgLabelWithHeader : 'The {0}th row [{1}] column {2}'
  });
}

if(L5.grid.GroupingView){
  L5.apply(L5.grid.GroupingView.prototype, {
    emptyGroupText : '(None)',
    groupByText    : 'Group By This Field',
    showGroupsText : 'Show in Groups'
  });
}

if(L5.grid.GroupingView){
	 L5.apply(L5.grid.GroupingView.prototype, {
		 groupByText: 'Group by current text',
		 showGroupsText: 'Show groups'
	   });
}

if(L5.tree.BatchTreeLoaderProxy){
	 L5.apply(L5.tree.BatchTreeLoaderProxy.prototype, {
		 uncorrespondText: 'The loader of the request and the data returned do not correspond to each other.'
	   });
}

if(L5.grid.PropertyColumnModel){
  L5.apply(L5.grid.PropertyColumnModel.prototype, {
    nameText   : "Name",
    valueText  : "Value",
    dateFormat : "m/j/Y"
  });
}

L5.columnModel_modifyTest = "Modify";

if(L5.layout.BorderLayout && L5.layout.BorderLayout.SplitRegion){
  L5.apply(L5.layout.BorderLayout.SplitRegion.prototype, {
    splitTip            : "Drag to resize.",
    collapsibleSplitTip : "Drag to resize. Double click to hide."
  });
}

if(L5.form.TimeField){
  L5.apply(L5.form.TimeField.prototype, {
    minText : "The time in this field must be equal to or after {0}",
    maxText : "The time in this field must be equal to or before {0}",
    invalidText : "{0} is not a valid time",
    format : "g:i A",
    altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
  });
}

if(L5.form.CheckboxGroup){
  L5.apply(L5.form.CheckboxGroup.prototype, {
    blankText : "You must select at least one item in this group"
  });
}

if(L5.form.RadioGroup){
  L5.apply(L5.form.RadioGroup.prototype, {
    blankText : "You must select one item in this group"
  });
}

L5.connectionError = "Failed to connect to server failed.";
L5.turnPage = "Page num is too large or too small.";
L5.turnPageFirst = "Page num is too small.";
L5.turnPageLast = "Page num too large.";
L5.valError = "Validate error.";
L5.parseReturnError = "Error parse return value.";
L5.loadDateError = "Error loadding date: ";
L5.radio = "select";

if(L5.HtmlExt){
	L5.HtmlExt.errorTip = {
			require : "is required field.",
			date :  "is an invalid date format.",
			equal : "is not euqle.",
			regex : "is an invalid format.",
			compare : "cannot meet the validation rules.",
			length : "is an invalid length.",
			lengthUTF8 : "is an invalid length.",
			lengthGBK : "is an invalid length.",
			custom : "is an invalid value.",
			def : "is an invalid format.",
			
			notEqualToValue : "is not equal to {0}.",
			notEqualToRuleValue : "is not equal to the value of {0}.",
			
			mustLess : "must less than {0}.",
			mustLarger : "must larger than {0}."
	};
}

L5.alertText = "Note";
L5.pleaseSelect = "Please select……";

L5.saveSuccess = "Saved successfully."

L5.unlogged = "User is not logged.";
L5.cmdFailed = "Failed to access the server.";

if(L5.grid.GridSummary){
	   L5.apply(L5.grid.GridSummary.prototype, {
		   sumText   : "sum:"
	   });
}

if(L5.DataPilot){
	   L5.apply(L5.DataPilot.prototype, {
		    firstRecordText:"First Record",
			prevRecordText:"Previous Record",
			nextRecordText:"Next Record",
			prevPageText:"Previous Page",
			nextPageText:"Next Page",
			lastRecordText:"Last Record"
	   });
}

L5.data_showText = {
		selectDataText : "Select Data: ",
		startText : "Start: ",
		endText:"End: ",
		dataSelectText:"Data Selector",
		yesText:"OK",
		closeText:"Close",
		clearText:"Clear",
		yearText:"Year",
		dataDetailText:"Data",
		byTimeperiodText:"By Time Period",
		byMonthText:"By Month",
		byYearText:"By Year",
		selectMonthText:"Select Month: ",
		selectYearText:"Select Year: ",
		pleaseSelectDataText:"Please select data.",
		invalidDataFormatText:"Invalid data format,the valid format: {0}.",
		pleaseInputStartDataText:"Please input start data.",
		invalidStartDataFormatText:"Invalid  start data format,the valid format: {0}.",
		pleaseInputEndDataText:"Please input end data.",
		invalidStartDataFormatText:"Invalid start data format,the valid format: {0}.",
		endVSStartDataText:"End data should later than start data.",
		invalidYearFormatText:"Invalid year format.",
		invalidMonthFormatText:"Invalid month format."
};
L5.data_Date_monthNames = [
                       "January",
                       "February",
                       "March",
                       "April",
                       "May",
                       "June",
                       "July",
                       "August",
                       "September",
                       "October",
                       "November",
                       "December"
];
if(L5.GridHelpWindow){
	   L5.apply(L5.GridHelpWindow.prototype, {
		   title:'Help' 
	   });
}
L5.help_showText = {
		queryText:'Query',
		yesText:'OK',
		closeText:'Close',
		clearText:'Clear',
		displayMsgText:"rec.{0} to rec.{1}, total: {2}records",
		emptyMsgText :"no record",
		selectRecordText:"Please select record",
		selectedRecordText:"Select Records",
		deleteText:"Delete",
		deleteAllText:"Delete All"

};

if(L5.QueryWindow){
	   L5.apply(L5.QueryWindow.prototype, {
		   title:'Query Window' 
	   });
}
L5.query_showText = {
		queryText:'Query',
		closeText:'Close',
		inputParamTip:'Please input query conditions.',
		pleaseSelectText:'Please select.'
};

L5.sysAlert = "System Alert";
L5.noMethodError = "This class does not support this method.";

L5.toLegendText = "Selected Items";
L5.fromLegendText = "Optional Items";

L5.Time_TimeUnitNames = {
		minute : "m",
		hour : "h"
};

L5.yesText = L5.okText = "OK";
L5.enterToSelectText = "Enter to Select";

if(L5.Validator){
	L5.Validator.errorMsg = {
			require : "is required field.",
			date :  "is an invalid date format.",
			regex : "is an invalid format.",
			notEqualToValue : "is not equal to {0}.",
			notEqualToRuleValue : "is not equal to the value of {0}.",
			mustLess : "must less than {0}.",
			mustLarger : "must larger than {0}.",
			uniqueConstraints:"It violates unique constraints.",
			length_e_c: "must no longer than {0} English letters or {1} character length.",
			length: "must no longer than {0} letters length."
	};
}
L5.undefineInModel = " is undefine in model";
L5.validMsg ="[{0}] {1}";
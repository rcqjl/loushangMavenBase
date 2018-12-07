
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

function alert(msg) {
	$.dialog({
		type: "alert",
		content: msg
	});
}

// 常量
var Constants = {
	
		RadioName:{Radio:"organradio"},
		CheckboxName:{Checkbox:"organcheckbox"}
	};


function organradio(data, type, full) {
    return '<input type="radio" value="' + data + '" title="' + data + '" id="radio" name="'+Constants.RadioName.Radio+'"/>';
};

function organcheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="'+Constants.CheckboxName.Checkbox+'"/>';
};


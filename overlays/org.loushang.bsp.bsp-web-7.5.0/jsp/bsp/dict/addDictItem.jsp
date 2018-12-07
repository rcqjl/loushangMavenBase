<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加字典项</title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/dict/addDictItem.css'/>" />

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
<script type="text/javascript" src="<l:asset path='arttemplate.js'/>"></script>
</head>
<body>
	<div class="container text-center" id="sandbox-container">
		<form class="form-horizontal" id="dictItemForm" name="dictItemForm"
			onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-right"><spring:message code="bsp.dict.019" text="编号"></spring:message>
				<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="itemCode" name="itemCode" datatype="ls32,dictItemCode"
						nullmsg="<spring:message code="bsp.dict.024" text="请输入编号"></spring:message>"
						<c:if test="${status == 'update'}"> value="${itemCode}" readonly="readonly"</c:if> />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-right"><spring:message code="bsp.dict.020" text="名称"></spring:message>
				<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="itemValue" name="itemValue" value="${itemValue}"
						datatype="ls100" nullmsg="<spring:message code="bsp.dict.025" text="请输入名称"></spring:message>" />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-right"><spring:message code="bsp.dict.021" text="序号"></spring:message></label>
				<div class="col-xs-10 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="xh" name="xh" value="${xh}" datatype="n1-9" ignore="ignore"/> 
						<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-right"><spring:message code="bsp.dict.012" text="描述"></spring:message></label>
				<div class="col-xs-10 col-md-10">
					<textarea type="text" class="form-control ue-form Validform_input"
						id="note" name="note" value="${note}" datatype="ls100"
						ignore="ignore">${note}</textarea>
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<input type="hidden" id="dictCode" name="dictCode" value="${dictCode}" /> 
			<input type="hidden" id="parentCode" name="parentCode" value="${parentCode}" />
			<div class="form-group">
			 <label class="col-xs-2 col-md-2  text-right"></label>
				<div class="col-xs-10 col-md-10">
				<div style="float:left;">
					<button type="button" class="btn ue-btn-primary" id="saveVal">
						<spring:message code="bsp.dict.001" text="保存"></spring:message>
					</button>
					<button type="button" class="btn ue-btn" id="cancel">
						<spring:message code="bsp.dict.005" text="取消"></spring:message>
					</button>
					</div>
				</div>
			</div>
		</form>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
	var status = "${status}";
	var dictCode = "${dictCode}";
	var dialog = parent.dialog.get(window);

	$(function() {
		
		// 校验
		$("#dictItemForm").Validform({
			btnSubmit : "#saveVal",
			tiptype : function(msg, o, cssctl) {
				var objtip = o.obj.siblings(".Validform_checktip");
				cssctl(objtip, o.type);
				objtip.text(msg);
			},
			datatype : {
				"dictItemCode" : ValidDictItemCode
			},
			callback : function(form) {
				saveVal();
			}
		});

		//取消按钮
		$("#cancel").click(function() {
			cancel();
		});
	})
	
	//保存
	function saveVal() {
	
		if (status == "create") {
		var	url = context + "/service/bsp/dict/saveDictItem";
		} else {
		var url = context + "/service/bsp/dict/updateDictItem";	
		}

		$("#dictItemForm").ajaxSubmit({
			type : "post",
			url : url,
			success : function() {
				dialog.close(true);
				dialog.remove();
				return false;
			}
		});
		return false;
	}
	
	//取消
	function cancel() {
		dialog.close();
		dialog.remove();
		return false;
	}
	
	//校验
	function ValidDictItemCode(gets, obj, curform, regxp) {
		var msg = L.getLocaleMessage("bsp.dict.026", "编号已存在");
		var flag;

		if (gets == null || gets == "") {
			return false;
		}

		if (status == "create") {
			$.ajax({
				url : context
						+ "/service/bsp/dict/dictItemIsExist?dictCode="
						+ dictCode + "&itemCode=" + gets,
				type : "post",
				async : false,
				success : function(returns) {
					if ("None" == returns) {
						flag = true;
					} else if("Exist" == returns){
						flag = false;
					}
				}
			});

			if (flag) {
				return true;
			} else {
				obj.attr("errormsg", msg);
				return false;
			}
		}
	}
</script>
</html>
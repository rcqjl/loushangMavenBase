<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加字典</title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/dict/addDict.css'/>" />

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
		<form class="form-horizontal" id="saveDictForm" name="saveDictForm"
			onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-right"><spring:message
						code="bsp.dict.010" text="字典编号"></spring:message><span
					class="required">*</span></label>
				<div class="col-xs-10 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="dictCode" name="dictCode" datatype="ls32,dictCodeValid"
						nullmsg="<spring:message code="bsp.dict.022" text="请输入字典编号"></spring:message>"
						<c:if test="${status == 'update'}"> value="${dictCode}" readonly="readonly"</c:if> />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-right"><spring:message
						code="bsp.dict.011" text="字典名称"></spring:message><span
					class="required">*</span></label>
				<div class="col-xs-10 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="dictName" name="dictName" value="${dictName}"
						datatype="ls60"
						nullmsg="<spring:message code="bsp.dict.018" text="请输入字典名称"></spring:message>" />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-right"><spring:message
						code="bsp.dict.012" text="字典描述"></spring:message></label>
				<div class="col-xs-10 col-md-10">
					<textarea type="text" class="form-control ue-form Validform_input"
						id="note" name="note" value="${note}" ignore="ignore"
						datatype="ls100">${note}</textarea>
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
			 <label class="col-xs-2 col-md-2  text-right"></label>
				<div class="col-xs-10 col-md-10">
				<div style="float:left;">
					<button type="button" class="btn ue-btn-primary" id="saveBtn">
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
	var dialog = parent.dialog.get(window);
	
	$(function() {
		
		// 校验
		$("#saveDictForm").Validform({
			btnSubmit : "#saveBtn",
			tiptype : function(msg, o, cssctl) {
				var objtip = o.obj.siblings(".Validform_checktip");
				cssctl(objtip, o.type);
				objtip.text(msg);
			},
			datatype : {
				"dictCodeValid" : ValidDictCode
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
		var url = context + "/service/bsp/dict/saveDict";
		} else {
		var url = context + "/service/bsp/dict/updateDict";	
		}

		$("#saveDictForm").ajaxSubmit({
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
	function ValidDictCode(gets, obj, curform, regxp) {
		var msg = L.getLocaleMessage("bsp.dict.023", "字典编号已存在");
		var results;
		if (gets == null || gets == "") {
			return false;
		}
		if (status == "create") {
			$.ajax({
				url : context + "/service/bsp/dict/dictIsExist?dictCode="
						+ gets,
				type : "post",
				async : false,
				success : function(flag) {
					if (flag) {
						results = true;
					} else {
						results = false;
					}
				}
			});

			if (results) {
				return true;
			} else {
				obj.attr("errormsg", msg);
				return false;
			}
		}
	}
</script>
</html>
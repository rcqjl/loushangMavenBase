<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="bsp.location.001" text="行政区划"/></title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/location/addcant.css'/>" />

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
		<form class="form-horizontal" id="saveCantForm" name="saveCantForm"
			onsubmit="return false">
			<input type="hidden" name="superCode" value="${cant.superCode}" />
			<input type="hidden" name="countryCode" value="${cant.countryCode}" />
			<div class="form-group">
				<label class="col-xs-3 col-md-3 text-right">
					<spring:message code="bsp.location.009" text="上级行政区划"/>
				</label>
				<div class="col-xs-9 col-md-9">
					<div id="parentCant" class="parentCant">${cant.superName }</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-3 text-right">
					<spring:message code="bsp.location.007" text="行政区划类型"/>
					<span class="required">*</span>
				</label>
				<div class="col-xs-9 col-md-9">
					<fieldset id="location">
						<div class="cantTypeSel">
							<select id="cantTypeSel" name="cantType" class="form-control ue-form canttype" data-value="${cant.cantType }"></select>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-3 text-right">
					<spring:message code="bsp.location.004" text="行政区划代码"/>
					<span class="required">*</span>
				</label>
				<div class="col-xs-9 col-md-9">
					<input type="text" class="form-control ue-form Validform_input"
						id="cantCode" name="cantCode" datatype="lse,s1-20,dictCodeValid"
						nullmsg="<spring:message code="bsp.location.013" text="请输入代码"/>"
						errormsg="<spring:message code="bsp.location.014" text="请输入20内的数字、英文或下划线"/>"
						<c:if test="${cant.status == 'edit'}"> value="${cant.cantCode}" readonly="readonly"</c:if> />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-3 text-right">
					<spring:message code="bsp.location.005" text="行政区划名称"/><span class="required">*</span>
				</label>
				<div class="col-xs-9 col-md-9">
					<input type="text" class="form-control ue-form Validform_input"
						id="cantName" name="cantName" value="${cant.cantName}"
						datatype="s0-60"
						nullmsg="<spring:message code="bsp.location.015" text="请输入名称"/>"
						errormsg="<spring:message code="bsp.location.016" text="请输入60内的名称"/>" />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-3 text-right">
					<spring:message code="bsp.location.006" text="行政区划简称"/>
				</label>
				<div class="col-xs-9 col-md-9">
					<input type="text" class="form-control ue-form Validform_input"
						id="shortName" name="shortName" value="${cant.shortName}"
						datatype="s0-60"
						nullmsg="<spring:message code="bsp.location.017" text="请输入简称"/>"
						errormsg="<spring:message code="bsp.location.018" text="请输入60内的简称"/>" />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
			 <label class="col-xs-3 col-md-3  text-right"></label>
				<div class="col-xs-9 col-md-9">
				<div style="float:left;">
					<button type="button" class="btn ue-btn-primary" id="saveBtn">
						<spring:message code="bsp.location.010" text="保存"></spring:message>
					</button>
					<button type="button" class="btn ue-btn" id="cancel">
						<spring:message code="bsp.location.011" text="取消"></spring:message>
					</button>
				 </div>
				</div>
			</div>
		</form>
	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
	var status = "${cant.status}";
	var dialog = parent.dialog.get(window);
	
	$(function() {
		if(status == "edit") {
			$("#cantTypeSel").append("<option>${cant.typeName}</option>");
			$("#cantTypeSel").attr("readonly", "readonly");
			
		}else {
			$.cxSelect.defaults.url = context + "/service/bsp/location/cant/types";
			$('#location').cxSelect({
			    selects: ['canttype'],
			    jsonName: 'typeName',
			    jsonValue: 'cantType',
			    nodata: 'none',
			    required: true
			});
		}
		
		// 校验
		$("#saveCantForm").Validform({
			btnSubmit : "#saveBtn",
			tiptype : function(msg, o, cssctl) {
				var objtip = o.obj.siblings(".Validform_checktip");
				cssctl(objtip, o.type);
				objtip.text(msg);
			},
			datatype : {
				"dictCodeValid" : ValidCantCode
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
		var url;
		if (status == "add") {
			url = context + "/service/bsp/location/cant/adding";
		} else {
			url = context + "/service/bsp/location/cant/editing";	
		}

		$("#saveCantForm").ajaxSubmit({
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
	function ValidCantCode(gets, obj, curform, regxp) {
		var msg = L.getLocaleMessage("bsp.location.019", "行政区划代码已存在");
		var results;
		if (gets == null || gets == "") {
			return false;
		}
		if (status == "add") {
			$.ajax({
				url : context + "/service/bsp/location/cant/unique?cantcode=" + gets,
				type : "get",
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

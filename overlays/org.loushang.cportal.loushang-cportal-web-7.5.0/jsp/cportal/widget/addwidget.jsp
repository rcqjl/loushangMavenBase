<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>微件增加</title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<l:script path="jquery.js,bootstrap.js,form.js,ui.js"></l:script>
<script type="text/javascript" src='pinyin.js' /></script>
<script type="text/javascript" src='../builder/skin/js/cportal.help.js' /></script>
<style type="text/css">
	.htext {
		font-size: 14px;
		font-weight: bold;
	}
	
	.fenge {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	
	.container {
		width: 100%;
		margin-left: 0px;
		margin-right: 0px;
	}
	.form-horizontal .control-label {
    	float: left;
    }
</style>
<script type="text/javascript">
 var context="<%=request.getContextPath()%>";
	$(function() {
		CPHelp.setCreateId('1', 'createId', $('#name'), $('#id'), 'blur');
		$("#name").blur(function(){
    		$("#id").focus();
    	});
		$("#saveForm").uValidform({
			btnSubmit:"#saveBtn",
			datatype:{//传入自定义datatype类型;
			     "reg":function(gets,obj,curform,regxp){
					//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
					var reg1=/^[A-Za-z0-9]{1,32}$/;
					if(reg1.test(gets)){return true;}
					return false;
				},
				"name":function(gets,obj,curform,regxp){
					if(gets.length<100){
						var reg = /^[\u4E00-\u9FA5A-Za-z0-9_\s]+$/;
						if(reg.test(gets)){return true;}
					}
					return false;
				}
			},
			callback:function(form){
				$.dialog({
					type: 'confirm',
					content: L.getLocaleMessage("tip-submit","确认提交表单？"),
					ok: function(){
						var displayOrder = $(form).find("input[id=displayOrder]").val();
						displayOrder>0?true:$(form).find("input[id=displayOrder]").val(0)
						save(form[0]);
						},
					cancel: function(){}
				});
			}
		});	 
		//返回widget页面
		$("#returnBtn").click(function() {
			window.location = context + "/jsp/cportal/widget/querywidget.jsp";
		})
	});
	//保存实例
	function save(saveForm){
		var url = "<%=request.getContextPath()%>/service/cportal/widgets/saveWidget";
		saveForm.action = url;
		saveForm.method = "POST";
		saveForm.submit();
	}
</script>
</head>
<body>
	<div class="container text-center" id="sandbox-container">
		<h2 class="text-left htext">
		<spring:message code="cportal.addNewWidget" text="新增微件"/></h2>
		<hr class="fenge" />
		<br />
		<div class="col-xs-12 col-md-12">
			<form class="form-horizontal" id="saveForm" name="saveForm"	onsubmit="return false">
				<div class="form-group">
					<label class="col-sm-3 control-label"><spring:message code="cportal.widget.name" text="名称"/></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"	id="name" name="name" value="" 
							placeholder="<spring:message code="cportal.widget.name" text="名称"/>"
							datatype="name" errormsg="<spring:message code="tip-nametip" text="中文、字母、数字、下划线"/>" 
							nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>"/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label"></label>
					<div class="colxs-5 col-md-5 text-left">
						<div class="checkbox">
							<label><input type="checkbox" id="createId" name="createId" value="1" checked />&nbsp<spring:message code="cportal.autoId" text="自动生成ID"/></label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.id" text="ID"/>
					<span class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="id" name="id" value="" placeholder="<spring:message code="cportal.widget.id" text="ID"/>" 
							datatype="reg" errormsg="<spring:message code="tip-alphanumeric" text="字母、数字"/>" 
							nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>"
							ajaxurl="<%=request.getContextPath()%>/service/cportal/widgets/checkId" ;/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.URL" text="访问地址"/>
					<span class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="content" name="content" value="" 
							placeholder="<spring:message code="cportal.widget.URL" text="访问地址"/>"
							datatype="*1-255" errormsg="<spring:message code="tip-Maximum255" text="最多255个字符"/>"
							nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>" />
						<div class="Validform_checktip Validform_span"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.URL2" text="访问地址二"/></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="expandContent" name="expandContent" value="" 
							placeholder="<spring:message code="cportal.widget.URL2" text="访问地址"/>"
							datatype="*0-255" errormsg="<spring:message code="tip-Maximum255" text="最多255个字符"/>"/>
						<div class="Validform_checktip Validform_span"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.author" text="作者"/>
					<span class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="author" name="author" value="" 
							placeholder="<spring:message code="cportal.widget.author" text="作者"/>"
							datatype="*1-32" errormsg="<spring:message code="tip-Maximum32" text="最多32个字符"/>" 
							nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>" />
						<div class="Validform_checktip Validform_span"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.icon" text="图标"/>
					<span class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"	id="icon" name="icon"
							value="/jsp/cportal/builder/skin/images/widget/widget.png"
							placeholder="<spring:message code="cportal.widget.icon" text="图标"/>" 
							datatype="*1-255" errormsg="<spring:message code="tip-Maximum255" text="最多255个字符"/>"
							nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>" />
						<div class="Validform_checktip Validform_span"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.height" text="高度"/>
					<span class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"	id="height" name="height" value="" 
							placeholder="<spring:message code="cportal.widget.height" text="高度"/>" datatype="n"
							errormsg="<spring:message code="tip-numbers" text="只能是数字"/>" 
							nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>" />
						<div class="Validform_checktip Validform_span"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.displayOrder" text="显示顺序"/></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"	id="displayOrder" name="displayOrder" value="" 
							placeholder="<spring:message code="cportal.widget.displayOrder" text="显示顺序"/>" datatype="n" ignore="ignore"
							errormsg="<spring:message code="tip-numbers" text="只能是数字"/>" />
						<div class="Validform_checktip Validform_span"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.loadType" text="加载方式"/><span
						class="required">*</span></label>
					<div class="col-sm-8 text-left radio">
						<label><input type="radio" id="loadType" name="loadType"
							value="0" checked="true" />Include</label> <label><input
							type="radio" id="loadType" name="loadType" value="1" />Iframe</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">
					<spring:message code="cportal.widget.description" text="微件描述"/>
					</label>
					<div class="col-xs-8 col-md-8">
						<textarea class="form-control ue-form Validform_input" rows="2"
							id="description" name="description" value="" datatype="*0-100"
							placeholder="<spring:message code="cportal.widget.description" text="微件描述"/>"
							errormsg="<spring:message code="tip-Maximum100" text="最多100个字符"/>"></textarea>
						<div class="Validform_checktip Validform_span"></div>
					</div>
				</div>
				<input type="hidden" id="typeId" name="typeId"
					value="<%=request.getParameter("typeId")%>">
				<div class="form-group">
					<label class="col-xs-3 col-md-3  text-right text-name"></label>
					<div class="col-xs-8 col-md-8" style="text-align: left">
						<button type="button" class="btn ue-btn-primary" id="saveBtn">
							<spring:message code="cportal.confirm" text="确定"/>
						</button>
						<button type="button" class="btn ue-btn" id="returnBtn">
							<spring:message code="cportal.cancel" text="取消"/>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
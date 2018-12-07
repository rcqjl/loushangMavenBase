<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
<style>
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
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<l:script path="jquery.js,bootstrap.js,form.js,ui.js"></l:script>
<script type="text/javascript">
 var context="<%=request.getContextPath()%>";
	$(function() {
		$("input:radio[value='${widget.loadType}']" ).attr('checked','true');
		$("#saveForm").uValidform({
			btnSubmit:"#saveBtn",
			datatype:{//传入自定义datatype类型;
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
			window.location = context + "/service/cportal/widgets/getpage";
		});
	});
	//保存实例
	function save(saveForm){
		var url = "<%=request.getContextPath()%>/service/cportal/widgets/updateSaveWidget";
	    saveForm.action = url;
	    saveForm.method = "POST";
	    saveForm.submit();
	    
	}

</script>
</head>
<body>	
	<div class="container text-center" id="sandbox-container">
	  <h2 class="text-left htext">
	  <spring:message code="cportal.updateWidget" text="更新微件"/>
	  </h2>
	  <hr class="fenge"/>
	  <br/>
	  <div class="col-xs-12 col-md-12">
		<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
		<div class="form-group">
				<label class="col-sm-3 control-label">
				<spring:message code="cportal.widget.name" text="名称"/></label>
				<div class="col-xs-8 col-md-8">
					<input type="text" class="form-control ue-form Validform_input" id="name"
						name="name" value="${widget.name}" 
						placeholder="<spring:message code="cportal.widget.name" text="名称"/>" datatype="name" 
						errormsg="<spring:message code="tip-nametip" text="中文、字母、数字、下划线"/>" 
						nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>" />						
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><spring:message code="cportal.widget.id" text="ID"/></label>
				<div class="col-xs-8 col-md-8">
					<input type="text" class="form-control ue-form Validform_input" id="id"
						name="id" value="${widget.id }" readOnly="true" />						
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
	      <div class="form-group">
				<label class="col-sm-3 control-label"><spring:message code="cportal.widget.URL" text="访问地址"/>
				<span class="required">*</span></label>
				<div class="col-xs-8 col-md-8">
					<input type="text" class="form-control ue-form Validform_input" id="content"
						name="content" value="${widget.content}"
						placeholder="<spring:message code="cportal.widget.URL" text="访问地址"/>" 
						datatype="*1-255" errormsg="<spring:message code="tip-Maximum255" text="最多255个字符"/>" 
						nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>" />
					<div class="Validform_checktip Validform_span"></div>
				</div>
			</div>
	      <div class="form-group">
				<label class="col-sm-3 control-label">
				<spring:message code="cportal.widget.URL" text="访问地址"/></label>
				<div class="col-xs-8 col-md-8">
					<input type="text" class="form-control ue-form Validform_input" id="expandContent"
						name="expandContent" value="${widget.expandContent}"
						placeholder="<spring:message code="cportal.widget.URL" text="访问地址"/>" 
						datatype="*0-255" errormsg="<spring:message code="tip-Maximum255" text="最多255个字符"/>"/>
					<div class="Validform_checktip Validform_span"></div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">
				<spring:message code="cportal.widget.author" text="作者"/>
				<span class="required">*</span></label>
				<div class="col-xs-8 col-md-8">
					<input type="text" class="form-control ue-form Validform_input" id="author"
						name="author" value="${widget.author}"
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
					<input type="text" class="form-control ue-form Validform_input" id="icon"
						name="icon" value="${widget.icon}"
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
					<input type="text" class="form-control ue-form Validform_input" id="height"
						name="height" value="${widget.height}"
						placeholder="<spring:message code="cportal.widget.height" text="高度"/>" 
						datatype="n" errormsg="<spring:message code="tip-numbers" text="只能是数字"/>" 
						nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>" />
					<div class="Validform_checktip Validform_span"></div>
				</div>
			</div>	
			<div class="form-group">
				<label class="col-sm-3 control-label">
				<spring:message code="cportal.widget.displayOrder" text="显示顺序"/></label>
				<div class="col-xs-8 col-md-8">
					<input type="text" class="form-control ue-form Validform_input"	id="displayOrder" name=displayOrder value="${widget.displayOrder}"
						placeholder="<spring:message code="cportal.widget.displayOrder" text="显示顺序"/>" datatype="n" ignore="ignore"
						errormsg="<spring:message code="tip-numbers" text="只能是数字"/>" />
					<div class="Validform_checktip Validform_span"></div>
				</div>
			</div>
			<div class="form-group">
			    <label  class="col-sm-3 control-label">
			    <spring:message code="cportal.widget.loadType" text="加载方式"/>
			    <span class="required">*</span></label>
			    	<div class="col-sm-8 text-left radio">
			    		<label>
			    		<input type="radio" id="loadType" name="loadType" value="0" />Include</label>
			    		<label>
			    		<input type="radio" id="loadType" name="loadType" value="1" />Iframe</label>
			    	</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">
				<spring:message code="cportal.widget.description" text="微件描述"/>
				</label>
				<div class="col-xs-8 col-md-8">
					<textarea class="form-control ue-form Validform_input" rows="2" 
					datatype="*0-100" errormsg="<spring:message code="tip-Maximum100" text="最多100个字符"/>"
					id="description" name="description" placeholder="<spring:message code="cportal.widget.description" text="微件描述"/>">${widget.description}</textarea>
					<div class="Validform_checktip Validform_span"></div>
				</div>
			</div>	
			<div class="form-group" >
			<label class="col-sm-3 control-label" ></label>
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
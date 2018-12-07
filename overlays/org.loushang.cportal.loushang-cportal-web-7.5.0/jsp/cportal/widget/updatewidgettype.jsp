<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->

    <!-- 需要引用的CSS -->
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
    <style type="text/css">
</style>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
	<!-- 页面结构 -->
	<form class="form-horizontal">
		<div class="form-group">
		    <label for="name" class="col-xs-3 col-md-3  text-right control-label">
		    <spring:message code="cportal.widgetType.name" text="名称"/></label>
		    <div class="col-xs-8 col-md-8">
		      <input type="text" class="form-control ue-form Validform_input " id="name" value="<%=URLDecoder.decode(request.getParameter("name"),"UTF-8")%>" 
		      datatype="*1-100" errormsg="<spring:message code="tip-Maximum100" text="最多100个字符"/>" 
		      nullmsg="<spring:message code="tip-nullmsg" text="不能为空"/>">
		      <span class="Validform_checktip Validform_span"></span>
		    </div>
		</div>

		<div class="form-group">
		    <label for="id" class="col-xs-3 col-md-3  text-right control-label">
		    <spring:message code="cportal.widgetType.id" text="ID"/>
		    </label>
		    <div class="col-xs-8 col-md-8">
		      <input type="text" class="form-control ue-form Validform_input" id="id" value="<%=URLDecoder.decode(request.getParameter("id"),"UTF-8")%>" readonly="true">
		    <span class="Validform_checktip Validform_span"></span>
		    </div>
		</div>
		<div class="form-group">
			<label for="description" class="col-xs-3 col-md-3 control-label text-right">
			<spring:message code="cportal.widgetType.displayOrder" text="显示顺序"/>
			</label>
			<div class="col-xs-8 col-md-8">
				<input type="text" class="form-control ue-form Validform_input" id="displayOrder" value="<%=URLDecoder.decode(request.getParameter("displayOrder"),"UTF-8")%>"
			      datatype="n" ignore="ignore" errormsg="<spring:message code="tip-numbers" text="只能是数字"/>" />
			    <span class="Validform_checktip Validform_span"></span>
			 </div>
		</div>
		<div class="form-group">
			    <label for="description" class="col-xs-3 col-md-3  text-right control-label">
			    	<spring:message code="cportal.widgetType.description" text="描述"/>
			    </label>
			    <div class="col-xs-8 col-md-8">
			    	<textarea class="form-control ue-form Validform_input" rows="2"
			    	 id="description" datatype="*0-100" errormsg="<spring:message code="tip-Maximum100" text="最多100个字符"/>"><%=URLDecoder.decode(request.getParameter("description"),"UTF-8")%></textarea>
			         <span class="Validform_checktip Validform_span"></span>
			    </div>
			</div>
		<div class="form-group">
		<label class="col-xs-3 col-md-3  text-right control-label"></label>
	        <div class="col-xs-8 col-md-8">
	          <button id="save" class="btn ue-btn-primary" >
	          	<spring:message code="cportal.confirm" text="确定"/>
	          </button>
	           <button id="cancel" class="btn ue-btn">
	           	<spring:message code="cportal.cancel" text="取消"/>
	           </button>
	        </div>
      	</div>
	</form>
    <!-- 需要引用的JS -->
    <l:script path="jquery.js,bootstrap.js,form.js,ui.js"></l:script>
    <script type="text/javascript">
    $(function() {
    	var dialog = parent.dialog.get(window);
		$(".form-horizontal").uValidform({
		    btnSubmit:"#save",
			datatype:{//传入自定义datatype类型;
			      "idcard":idcard,
			},
			callback:function(){
				var rtns={
					name: $("#name").val(),
					id: $("#id").val(),
					displayOrder: ($("#displayOrder").val()>0?$("#displayOrder").val():0),
					description: $("#description").val()
				}
				dialog.close(rtns);
				dialog.remove();
				return false;
			}
		});	 
		 $("#cancel").on('click',function() {
			dialog.close();
			dialog.remove();
		});
    });
    
    </script>
  </body>
</html>
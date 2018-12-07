<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>  
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="useredit" text="自然资源登记单元详情"></spring:message></title>
<!-- 引入css文件 -->
<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,framework/demo/user/user.css" />

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="<l:asset path='html5shiv.js'/>"></script>
  <script src="<l:asset path='respond.js'/>"></script>
<![endif]-->

<!-- 引入js文件 -->
<l:script path="jquery.js,bootstrap.js,form.js,jquery.form.js,ui.js" />

<script type="text/javascript">
	//项目上下文
	var context="<%=request.getContextPath()%>";
	var assetPath = "<l:assetcontext/>";
</script>
</head>
<body>
	<div class="container" id="sandbox-container">
		<h2 class="text-left htext">
			<spring:message code="useredit" text="自然资源登记单元详情" />
		</h2>
		<hr class="fenge" />
		<br />
		<div class="col-xs-10 col-md-10">
			<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false" enctype="multipart/form-data">
				

				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.BSM_DY" text="登记单元标识码" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="BSM_DY" name="BSM_DY" value="${share.BSM_DY}"
							placeholder="<spring:message code="share.BSM_DY" text="登记单元标识码"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.XZQDM" text="行政区代码" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="XZQDM" name="XZQDM" value="${share.XZQDM}"
							placeholder="<spring:message code="share.XZQDM" text="行政区代码"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.XZQMC" text="行政区名称" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="XZQMC" name="XZQMC" value="${share.XZQMC}"
							placeholder="<spring:message code="Share.XZQMC" text="行政区名称"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.XMMC" text="项目名称" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="XMMC" name="XMMC" value="${share.XMMC}"
							placeholder="<spring:message code="share.XMMC" text="项目名称"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.ZRZYDJDYH" text="自然资源登记单元号" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="ZRZYDJDYH" name="ZRZYDJDYH" value="${share.ZRZYDJDYH}"
							placeholder="<spring:message code="share.ZRZYDJDYH" text="自然资源登记单元号"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.ZRZYDYMC" text="自然资源单元名称" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="ZRZYDYMC" name="ZRZYDYMC" value="${share.ZRZYDYMC}"
							placeholder="<spring:message code="share.ZRZYDYMC" text="自然资源单元名称"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.DJDYLX" text="登记单元类型" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="DJDYLX" name="DJDYLX" value="${share.DJDYLX}"
							placeholder="<spring:message code="share.DJDYLX" text="登记单元类型"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.SYQR" text="所有权人" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="SYQR" name="SYQR" value="${share.SYQR}"
							placeholder="<spring:message code="user.SYQR" text="所有权人"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<!-- 
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.SYQDBXSZTCJ" text="所有权代表行使主体层级" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="SYQDBXSZTCJ" name="SYQDBXSZTCJ" value="${share.SYQDBXSZTCJ}"
							placeholder="<spring:message code="share.SYQDBXSZTCJ" text="所有权代表行使主体层级"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.SYQDBXSZT" text="所有权代表行使主体" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="SYQDBXSZT" name="SYQDBXSZT" value="${share.SYQDBXSZT}"
							placeholder="<spring:message code="share.SYQDBXSZT" text="所有权代表行使主体"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.SYQDBXSNR" text="所有权代表行使内容" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="SYQDBXSNR" name="SYQDBXSNR" value="${share.SYQDBXSNR}"
							placeholder="<spring:message code="share.SYQDBXSNR" text="所有权代表行使内容"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				 -->
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.ZL" text="坐落" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="ZL" name="ZL" value="${share.ZL}"
							placeholder="<spring:message code="share.ZL" text="坐落"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.ZMJ" text="总面积" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="ZMJ" name="ZMJ" value="${share.ZMJ}"
							placeholder="<spring:message code="share.ZMJ" text="总面积"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.ZSL" text="总数量" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="ZSL" name="ZSL" value="${share.ZSL}"
							placeholder="<spring:message code="share.ZSL" text="总数量"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.DCSJ" text="调查时间" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="DCSJ" name="DCSJ" value="${share.DCSJ}"
							placeholder="<spring:message code="share.DCSJ" text="调查时间"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.DCDW" text="调查单位" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="DCDW" name="DCDW" value="${share.DCDW}"
							placeholder="<spring:message code="share.DCDW" text="调查单位"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"><spring:message
							code="share.BZ" text="备注" /></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="BZ" name="BZ" value="${share.BZ}"
							placeholder="<spring:message code="share.BZ" text="备注"/>" 	/>
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>


				<div class="form-group">
					<label class="col-xs-3 col-md-3 control-label"></label>
					<div class="col-xs-8 col-md-8">
						
						<button type="button" class="btn ue-btn" id="returnBtn">
							<spring:message code="return" text="返回" />
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
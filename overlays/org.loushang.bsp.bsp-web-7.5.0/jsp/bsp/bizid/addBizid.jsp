<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><spring:message code="bsp.bizid.011" text="增加业务流水号"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/bizid/bizid.css'/>"/>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
    
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/bizid/bizid.js'/>"></script>
	
</head>
<body>
	<div class="bizid-left">
		<form class="form-horizontal"
			action="<%=request.getContextPath()%>/service/bsp/bizid/save"
			id="saveForm" name="saveForm" onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><spring:message
						code="bsp.bizid.015" text="全局流水" /></label>
				<div class="col-xs-8 col-md-10">
					<input type="checkbox" id="isGlobal" name="isGlobal" value="1"
						checked> <span class="Validform_checktip"></span>
				</div>
			</div>
			<div id="organIdDiv" style="display: none;" class="form-group">
				<label class="col-xs-3 col-md-2 control-label"></label>
				<div class="col-xs-8 col-md-10">
					<div class="input-group Validform_input">
						<input id="organName" title="hide" name="organName"
							readonly="readonly"
							value="<spring:message code="bsp.bizid.031" text="选择组织"/>"
							class="form-control ue-form select-organ" type="text">
						<div class="input-group-addon ue-form-btn select-organ">
							<span class="fa fa-user"></span>
						</div>
					</div>
					<input id="organId" name="organId" value="" type="text"
						style="display: none"> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><span
					class="required">*</span>
				<spring:message code="bsp.bizid.001" text="编码" /></label>
				<div class="col-xs-8 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="idId" name="idId" value=""
						placeholder="<spring:message code="bsp.bizid.001" text="编码"/>"
						datatype="idId,ls30" errormsg="<spring:message code="bsp.bizid.032" text="请输入30内的中、英文或下划线"/>"
						nullmsg="<spring:message code="bsp.bizid.014" text="请输入编码"/>">
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><span
					class="required">*</span>
				<spring:message code="bsp.bizid.002" text="名称" /></label>
				<div class="col-xs-8 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="idName" name="idName" value=""
						placeholder="<spring:message code="bsp.bizid.002" text="名称"/>"
						datatype="ls50"
						errormsg = ""
						nullmsg="<spring:message code="bsp.bizid.033" text="请输入名称"/>">
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><span
					class="required">*</span><spring:message code="bsp.bizid.004" text="流水号长度"/></label>
				<div class="col-xs-8 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="idLength" name="idLength" value=""
						placeholder="<spring:message code="bsp.bizid.004" text="流水号长度"/>"
						datatype="n1-4"
						errormsg="<spring:message code="bsp.bizid.034" text="流水号长度应为1-4位的整数"/>"
						nullmsg="<spring:message code="bsp.bizid.035" text="请输入流水号长度"/>">
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><span
					class="required">*</span><spring:message code="bsp.bizid.003" text="当前值"/></label>
				<div class="col-xs-8 col-md-10">
					<input type="text" class="form-control ue-form Validform_input"
						id="idValue" name="idValue" value=""
						placeholder="<spring:message code="bsp.bizid.003" text="当前值"/>"
						datatype="n1-10"
						errormsg="<spring:message code="bsp.bizid.036" text="当前值应为0-2147483647之间的整数"/>"
						nullmsg="<spring:message code="bsp.bizid.037" text="请输入当前值"/>">
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><spring:message
						code="bsp.bizid.005" text="前缀" /></label>
				<div class="col-xs-8 col-md-10">
					<input type="checkbox" id="idPrefix" name="idPrefix"> <span
						class="Validform_checktip"></span>
				</div>
			</div>
			<div id="idPrefixTextDiv" style="display: none;" class="form-group">
				<label class="col-xs-3 col-md-2 control-label"></label>
				<div class="col-xs-8 col-md-10">
					<input type="text" title="hide" style="display: none;"
						class="form-control ue-form Validform_input" id="idPrefixText"
						name="idPrefixText" value=""
						placeholder="<spring:message code="bsp.bizid.005" text="前缀"/>"
						datatype="idPrefix"> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><spring:message
						code="bsp.bizid.006" text="后缀" /></label>
				<div class="col-xs-8 col-md-10">
					<input type="checkbox" id="idSuffix" name="idSuffix"> <span
						class="Validform_checktip"></span>
				</div>
			</div>
			<div id="idSuffixTextDiv" style="display: none;" class="form-group">
				<label class="col-xs-3 col-md-2 control-label"></label>
				<div class="col-xs-8 col-md-10">
					<input type="text" title="hide" style="display: none;"
						class="form-control ue-form Validform_input" id="idSuffixText"
						name="idSuffixText" value=""
						placeholder="<spring:message code="bsp.bizid.006" text="后缀"/>"
						datatype="idSuffix"> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label text-right"><spring:message
						code="bsp.bizid.007" text="流水类型" /></label>
				<div class="col-xs-9 col-md-10">
					<select class="form-control ue-form Validform_input" id="idType"
						name="idType">
						<option value="00"><spring:message code="bsp.bizid.038"
								text="请选择" />
						</option>
						<option value="01"><spring:message code="bsp.bizid.039"
								text="按年流水" />
						</option>
						<option value="02"><spring:message code="bsp.bizid.040"
								text="按月流水" />
						</option>
						<option value="03"><spring:message code="bsp.bizid.041"
								text="按日流水" />
						</option>
					</select> <span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 control-label"></label>
				<div class="col-xs-8 col-md-10">
					<button type="button" class="btn ue-btn-primary" id="validate">
						<spring:message code="bsp.bizid.016" text="保存" />
					</button>
					<button type="button" class="btn ue-btn" id="cancel">
						<spring:message code="bsp.bizid.017" text="返回" />
					</button>
					<span id="msgdemo"></span>
				</div>
			</div>
		</form>

	</div>

	<div class="bizid-right">
		<p>
			<strong><spring:message code="bsp.bizid.018" text="说明" />：</strong>
		</p>
		<p><spring:message code="bsp.bizid.019" text="1)假设当前时间为2010年1月2日3时11分23秒，如果前缀或后缀包含下列字符串" /></p>
		<p><spring:message code="bsp.bizid.020" text="YYYY：生成的业务流水号将该字符串替换为2010" /></p>
		<p><spring:message code="bsp.bizid.021" text="YY：生成的业务流水号将该字符串替换为10" /></p>
		<p><spring:message code="bsp.bizid.022" text="MM：生成的业务流水号将该字符串替换为01" /></p>
		<p><spring:message code="bsp.bizid.023" text="DD：生成的业务流水号将该字符串替换为02" /></p>
		<p><spring:message code="bsp.bizid.024" text="HH：生成的业务流水号将该字符串替换为03" /></p>
		<p><spring:message code="bsp.bizid.025" text="MI：生成的业务流水号将该字符串替换为11" /></p>
		<p><spring:message code="bsp.bizid.026" text="SS：生成的业务流水号将该字符串替换为23" /></p>
		<p><spring:message code="bsp.bizid.027" text="2)流水类型" /></p>
		<p><spring:message code="bsp.bizid.028" text="按年流水表示按年份进行流水，比如当前年份为2009年，当变为2010年时，流水号从1开始重新计数" /></p>
		<p><spring:message code="bsp.bizid.029" text="按年流水需结合前缀进行使用，当选择了按年流水时，前缀必须包含“YYYY”，按月流水和按日流水原理相同，按月流水前缀必须包含“YYYYMM”,按日流水前缀必须包含“YYYYMMDD”" /></p>
		<p><spring:message code="bsp.bizid.030" text="3)以上日期时间字符，YYYYMMDDHHMISS，不区分大小写" /></p>
	</div>

	<script type="text/javascript">
		var context = "<l:assetcontext/>";
	</script>

</body>
</html>
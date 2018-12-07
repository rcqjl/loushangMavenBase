<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><spring:message code="bsp.bizid.000" text="业务流水号"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/functionmanager.css'/>"/>
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
	<script type="text/javascript" src="<l:asset path='bsp/bizid/bizid.js'/>"></script>
	
</head>
<body>
	<div class="container">
		<div class="row">
			<form class="form-horizontal" onsubmit="return false;">
		        <div class="input-group pull-left">
			        <input class="form-control ue-form" type="text" id="idId" placeholder="<spring:message code="bsp.bizid.014" text="请输入编码"/>">
			        <div class="input-group-addon ue-form-btn" id="query">
			        	<span class="fa fa-search"></span>
			        </div>
		        </div>	
		        
		        <div class="btn-group pull-right">
					<button  type="button" class="btn ue-btn" id="addBizid">
						<span class="fa fa-plus"></span><spring:message code="bsp.bizid.011" text="增加"/>
					</button>
					<button type="button" class="btn ue-btn" id="delBizid">
						<span class="fa fa-trash"></span><spring:message code="bsp.bizid.012" text="删除"/>
					</button>
				</div>
		    </form>
		</div>
	        
			<table id="list" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="4%" data-field="idId" data-sortable="false" data-render="checkbox">
							<input  type="checkbox"/>
						</th>
						<th width="15%" data-field="idId" data-render="rendTipBox"><spring:message code="bsp.bizid.001" text="编码"/></th>
						<th width="15%" data-field="idName" data-render="rendTipBox"><spring:message code="bsp.bizid.002" text="名称"/></th>
						<th width="8%" data-field="idValue"><spring:message code="bsp.bizid.003" text="当前值"/></th>
						<th width="8%" title="<spring:message code="bsp.bizid.004" text="流水号长度"/>" data-field="idLength"><spring:message code="bsp.bizid.004" text="流水号长度"/></th>
						<th width="8%" data-field="idPrefix" data-render="rendTipBox"><spring:message code="bsp.bizid.005" text="前缀"/></th>
						<th width="8%" data-field="idSuffix" data-render="rendTipBox"><spring:message code="bsp.bizid.006" text="后缀"/></th>
						<th width="10%" title="<spring:message code="bsp.bizid.007" text="流水类型"/>" data-field="idType" data-render="bizidType"><spring:message code="bsp.bizid.007" text="流水类型"/></th>
						<th width="7%" title="<spring:message code="bsp.bizid.008" text="是否全局流水"/>" data-field="isGlobal" data-render="bizidGlobal"><spring:message code="bsp.bizid.008" text="是否全局流水"/></th>
						<th width="7%" title="<spring:message code="bsp.bizid.009" text="组织内码"/>" data-field="organId" data-render="rendTipBox"><spring:message code="bsp.bizid.009" text="组织内码"/></th>						
						<th width="10%" data-field="idId" data-render="bizidOperation"><spring:message code="bsp.bizid.010" text="操作"/></th>
					</tr>
				</thead>
			</table>
		</div>
		
		
</body>

<script type="text/javascript">
	 var context = "<l:assetcontext/>";
</script>

</html>
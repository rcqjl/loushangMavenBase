<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>功能管理</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/function/functionmanager.css'/>"/>

    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/function/functionmanager.js'/>"></script>
	
</head>
<body>
	<div class="ue-menu-wrap">
		<div class="ue-menu-left">
			<ul id="functionTree" class="ztree"></ul>
			<div class="hint-div">
			  <span class="hint-ico hint-app-ico" style=""></span><span><spring:message code="bsp.function.000" text="应用"/></span>&nbsp;
			  <span class="hint-ico hint-module-ico" style=""></span><span><spring:message code="bsp.function.001" text="模块"/></span>&nbsp;
			  <span class="hint-ico hint-function-ico" style=""></span><span><spring:message code="bsp.function.002" text="功能"/></span>&nbsp;
			  <span class="hint-ico hint-operation-ico" style=""></span><span><spring:message code="bsp.function.003" text="操作"/></span>
			</div>
		</div>
		<div class="ue-menu-right">
			<div class="row appRow">
				<form class="form-inline" onsubmit="return false;">										
					<div class="input-group">
				        <input class="form-control ue-form" type="text" id="appName" placeholder='<spring:message code="bsp.function.004" text="应用名称"/>'/>
				        <div class="input-group-addon ue-form-btn" id="queryApp">
				        	<span class="fa fa-search"></span>
				        </div>
			        </div>
				    <div class="btn-group pull-right">
						<button id="addApp" type="button" class="btn ue-btn">
							<span class="fa fa-plus"></span> <spring:message code="bsp.function.005" text="添加应用"/>
						</button>
						<button id="batchDelApp" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span> <spring:message code="bsp.function.006" text="删除应用"/>
						</button>
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="bsp.function.007" text="更多"/><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				               <li><a class="import"><span class="fa fa-upload"></span><spring:message code="bsp.function.008" text="导入"/></a></li>
				               <li><a class="export"><span class="fa fa-download"></span><spring:message code="bsp.function.009" text="导出"/></a></li>
				            </ul>
				        </div>
					</div>
				</form>
				<table id="appList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%" data-field="appCode" data-sortable="false" data-render="appCheckbox">
								<input type="checkbox" id="selectAllApps" />
							</th>
							<th width="20%" data-field="appName"><spring:message code="bsp.function.004" text="应用名称"/></th>
							<th width="15%" data-field="transport"><spring:message code="bsp.function.010" text="传输协议"/></th>
							<th width="20%" data-field="serverHost"><spring:message code="bsp.function.011" text="服务器地址"/></th>
							<th width="25%" data-field="context"><spring:message code="bsp.function.012" text="上下文根"/></th>
							<th width="10%" data-field="seq"><spring:message code="bsp.function.013" text="顺序号"/></th>
							<th width="75px" data-field="appCode" data-render="rendBtn"><spring:message code="bsp.function.014" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
			<div style="display:none;" class="row moduleRow">
				<form class="form-inline" onsubmit="return false;">										
					<div class="input-group">
				        <input class="form-control ue-form" type="text" id="moduleName" placeholder='<spring:message code="bsp.function.015" text="模块名称"/>'/>
				        <div class="input-group-addon ue-form-btn" id="queryModule">
				        	<span class="fa fa-search"></span>
				        </div>
			        </div>
				    <div class="btn-group pull-right">
						<button id="addModule" type="button" class="btn ue-btn addBtn">
							<span class="fa fa-plus"></span> <spring:message code="bsp.function.016" text="添加模块"/>
						</button>
						<button id="batchDelModule" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span> <spring:message code="bsp.function.017" text="删除模块"/>
						</button>
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="bsp.function.007" text="更多"/><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				               <li class="changeBtn" style="display:none"><a class="change"><span class="fa fa-random"></span><spring:message code="bsp.function.018" text="变更隶属"/> </a></li>
				               <li><a class="import"><span class="fa fa-upload"></span><spring:message code="bsp.function.008" text="导入"/></a></li>
				               <li><a class="export"><span class="fa fa-download"></span><spring:message code="bsp.function.009" text="导出"/></a></li>
				            </ul>
				        </div>
					</div>
				</form>
				<table id="moduleList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%" data-field="moduleCode" data-sortable= "false" data-render="moduleCheckbox">
								<input type="checkbox" id="selectAllModules" />
							</th>
							<th width="30%" data-field="moduleName"><spring:message code="bsp.function.015" text="模块名称"/></th>
							<th width="25%" data-field="isMenu" data-render="rendYesOrNo"><spring:message code="bsp.function.019" text="是否菜单"/></th>
							<th width="20%" data-field="isLeafModule" data-render="rendYesOrNo"><spring:message code="bsp.function.020" text="是否末级模块"/></th>
							<th width="10%" data-field="seq"><spring:message code="bsp.function.013" text="顺序号"/></th>
							<th width="75px" data-field="moduleCode" data-render="rendBtn"><spring:message code="bsp.function.014" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
			<div style="display:none;" class="row functionRow">
				<form class="form-inline" onsubmit="return false;">
					<div class="input-group">
				        <input class="form-control ue-form" type="text" id="functionName" placeholder='<spring:message code="bsp.function.021" text="功能名称"/>'/>
				        <div class="input-group-addon ue-form-btn" id="queryFunction">
				        	<span class="fa fa-search"></span>
				        </div>
			        </div>
				    <div class="btn-group pull-right">
						<button id="addFunction" type="button" class="btn ue-btn">
							<span class="fa fa-plus"></span> <spring:message code="bsp.function.022" text="添加功能"/>
						</button>
						<button id="batchDelFunction" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span> <spring:message code="bsp.function.023" text="删除功能"/>
						</button>
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="bsp.function.007" text="更多"/><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				               <li><a class="change"><span class="fa fa-random"></span> <spring:message code="bsp.function.018" text="变更隶属"/></a></li>
				               <li><a class="import"><span class="fa fa-upload"></span><spring:message code="bsp.function.008" text="导入"/></a></li>
				               <li><a class="export"><span class="fa fa-download"></span><spring:message code="bsp.function.009" text="导出"/></a></li>
				            </ul>
				        </div>
					</div>
				</form>
				<table id="functionList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%" data-field="functionCode" data-sortable= "false" data-render="functionCheckbox">
								<input type="checkbox" id="selectAllFunctions" />
							</th>
							<th width="40%" data-field="functionName"><spring:message code="bsp.function.021" text="功能名称"/></th>
							<th width="20%" data-field="isMenu" data-render="rendYesOrNo"><spring:message code="bsp.function.019" text="是否菜单"/></th>
							<th width="15%" data-field="icon"><spring:message code="bsp.function.024" text="图标路径"/></th>
							<th width="10%" data-field="seq"><spring:message code="bsp.function.013" text="顺序号"/></th>
							<th width="75px" data-field="functionCode" data-render="rendBtn"><spring:message code="bsp.function.014" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
			<div style="display:none;" class="row operationRow">
				<form class="form-inline" onsubmit="return false;">
					<div class="input-group">
				        <input class="form-control ue-form" type="text" id="operationName" placeholder='<spring:message code="bsp.function.025" text="操作名称"/>'>
				        <div class="input-group-addon ue-form-btn" id="queryOperation">
				        	<span class="fa fa-search"></span>
				        </div>
			        </div>
				    <div class="btn-group pull-right">
						<button id="addFunction" type="button" class="btn ue-btn">
							<span class="fa fa-plus"></span> <spring:message code="bsp.function.026" text="添加操作"/>
						</button>
						<button id="batchDelFunction" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span> <spring:message code="bsp.function.027" text="删除操作"/>
						</button>
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="bsp.function.007" text="更多"/><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				               <li><a class="change"><span class="fa fa-random"></span> <spring:message code="bsp.function.018" text="变更隶属"/></a></li>
				               <li><a class="import"><span class="fa fa-upload"></span><spring:message code="bsp.function.008" text="导入"/></a></li>
				               <li><a class="export"><span class="fa fa-download"></span><spring:message code="bsp.function.009" text="导出"/></a></li>
				            </ul>
				        </div>
					</div>
				</form>
				<table id="operationList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%" data-field="operationCode" data-sortable= "false" data-render="operationCheckbox">
								<input type="checkbox" id="selectAllOperations" />
							</th>
							<th width="25%" data-field="operationName" data-render="rendTipBox"><spring:message code="bsp.function.025" text="操作名称"/></th>
							<th width="25%" data-field="operationCode" data-render="rendTipBox"><spring:message code="bsp.function.025" text="操作编码"/></th>
							<th width="15%" data-field="operationTypeCode" data-render="rendOptType"><spring:message code="bsp.function.028" text="操作类型"/></th>
							<th width="10%" data-field="isDefault" data-render="rendYesOrNo"><spring:message code="bsp.function.029" text="是否默认操作"/></th>
							<th width="10%" data-field="seq"><spring:message code="bsp.function.013" text="顺序号"/></th>
							<th width="75px" data-field="operationCode" data-render="rendBtn"><spring:message code="bsp.function.014" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
			<div style="display:none;" class="row urlRow">
				<form class="form-inline" onsubmit="return false;">
					<div class="input-group">
				        <input class="form-control ue-form" type="text" id="urlName" placeholder='<spring:message code="bsp.function.030" text="URL名称"/>'/>
				        <div class="input-group-addon ue-form-btn" id="queryUrl">
				        	<span class="fa fa-search"></span>
				        </div>
			        </div>
				    <div class="btn-group pull-right">
						<button id="addUrl" type="button" class="btn ue-btn">
							<span class="fa fa-plus"></span><spring:message code="bsp.function.031" text="增加URL"/>
						</button>
						<button id="batchDelUrl" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span><spring:message code="bsp.function.032" text="删除URL"/>
						</button>
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="bsp.function.007" text="更多"/><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				               <li><a class="change"><span class="fa fa-random"></span> <spring:message code="bsp.function.018" text="变更隶属"/></a></li>
				               <li><a class="import"><span class="fa fa-upload"></span><spring:message code="bsp.function.008" text="导入"/></a></li>
				               <li><a class="export"><span class="fa fa-download"></span><spring:message code="bsp.function.009" text="导出"/></a></li>
				            </ul>
				        </div>
					</div>
				</form>
				<table id="urlList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%" data-field="urlCode" data-sortable= "false" data-render="urlCheckbox">
								<input type="checkbox" id="selectAllUrls" />
							</th>
							<th width="20%" data-field="urlName"><spring:message code="bsp.function.033" text="URL名称"/></th>
							<th width="50%" data-field="urlContent" data-render="rendTipBox"><spring:message code="bsp.function.034" text="URL内容"/></th>
							<th width="20%" data-field="seq" data-render="showIsDefault"><spring:message code="bsp.function.035" text="是否默认"/></th>
							<th width="75px" data-field="urlCode" data-render="rendBtn"><spring:message code="bsp.function.014" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
</script>
</html>
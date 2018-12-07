<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><spring:message code="bsp.rolegroup.014" text="角色组管理"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/rolegroup/queryrolegroup.css'/>"/>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<script  type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bsp/rolegroup/queryrolegroup.js'/>"></script>
	<script type="text/javascript">
		var context="<%=request.getContextPath()%>";
	</script>
</head>
<body>
	<div class="container">
		<div class="row">
			<form class="form-inline" onsubmit="return false">
			    <div class="input-group">
					<input type="text" class="form-control ue-form " id="queryRoleGroupName" placeholder="<spring:message code="bsp.rolegroup.000" text="请输入角色组名称"/>"/>											
					<div class="input-group-addon ue-form-btn" id="query">
						<span class="fa fa-search"></span>
				    </div>
			    </div>
			    <div class="btn-group pull-right">
					<button id="addRoleGroup" type="button" class="btn ue-btn"  data-target="#addRoleGroupModal">
						<span class="fa fa-plus"></span><spring:message code="bsp.rolegroup.001" text="添加角色组"/>
					</button>
					<button id="batchdel" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="bsp.rolegroup.002" text="删除角色组"/>
					</button>
				</div>
			</form>
			
		</div>
		<div class="row">
			<table id="roleGroupList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%" data-field="roleGroupId" data-sortable="false" data-render="rendercheckbox" >
							<input type="checkbox" id="selectAll"/>
						</th>
						<th width="18%" data-field="roleGroupName" data-sortable="false"><spring:message code="bsp.rolegroup.003" text="角色组名称"/></th>
						<th width="18%" data-field="corporationName" data-sortable="false"><spring:message code="bsp.rolegroup.004" text="所属组织"/></th>
						<th width="15%" data-field="scopeValueName" data-sortable="false"><spring:message code="bsp.rolegroup.005" text="应用范围"/></th>
						<th width="26%" data-field="roleGroupId" data-sortable="false" data-render="renderOpt"><spring:message code="bsp.rolegroup.006" text="操作"/></th>
					</tr>
				</thead>
			</table>
		</div>
		
      <div class="modal" id="addRoleGroupModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
	        <div class="modal-content">
	          <div i="header" class="ui-dialog-header">
		        <button   title="cancel" class=" ui-dialog-close " data-dismiss="modal" aria-label="Close">×</button>
		        <div  class="ui-dialog-title modal-title" ><spring:message code="bsp.rolegroup.001" text="添加角色组"/></div>    
	          </div>
	          <div class="modal-body">
	           	<form class="form-horizontal" id="addRoleGroupForm" onsubmit="return false" style="margin-left: 30px;">
				   <div class="form-group form-group2" style="margin-right: 0px;margin-left: 15px;">
				      <label class="col-xs-3 col-md-3 text-right" for="roleGroupName" style="padding-left: 0px;padding-top: 3px;width: 85px;"><spring:message code="bsp.rolegroup.003" text="角色组名称"/><span class="required">*</span></label>
				      <div class="col-xs-8 col-md-9" style="height: 30px;">
				         <input id="roleGroupName" name="roleGroupName"  class="form-control ue-form Validform_input" type="text" value="${roleGroupName}"  datatype="valid_roleGroupNameOrOrganName" nullmsg="<spring:message code="bsp.rolegroup.000" text="请输入角色组名称"/>" errormsg="" style="width: 198px;">
				         <span class="Validform_checktip Validform_span" style="width: 153px;"></span>
				      </div>
				   </div>
				   
				   <div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for="organName" style="padding-top: 3px;width: 100px;"><spring:message code="bsp.rolegroup.004" text="所属组织"/><span class="required">*</span></label>
						<div class="col-xs-8 col-md-6">
							<div class="input-group Validform_input">
								<input id="organName" name="organName" readonly="readonly"
									value="" class="form-control ue-form Validform_input"
									type="text" datatype="valid_roleGroupNameOrOrganName" nullmsg="<spring:message code="bsp.rolegroup.017" text="请选择所属组织"/>" errormsg="" style="width: 162px;">
								<div class="input-group-addon ue-form-btn select-organName" >
									<span class="fa fa-user"></span>
								</div>
								<span class="Validform_checktip Validform_span"></span>
							</div>
							<input id="organName_struId" name="organName_struId" value="${data.corporation}"
								type="text" style="display: none">
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for="useCorporationName" style="width: 100px;"><spring:message code="bsp.rolegroup.005" text="应用范围"/></label>
						<div class="col-xs-8 col-md-6">
							<div class="input-group Validform_input" style="width: 198px;">
								<input id="useCorporationName" name="useCorporationName" readonly="readonly"
									value="" class="form-control ue-form"
									type="text">
								<div class="input-group-addon ue-form-btn select-useCorporationName">
									<span class="fa fa-user"></span>
								</div>
							</div>
							<input id="useCorporationName_struId" name="useCorporationName_struId" value="${data.useCorporationNameId}"
								type="text" style="display: none">
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for="principalName" style="width: 100px;"><spring:message code="bsp.rolegroup.011" text="描述"/></label>
						<div class="col-xs-8 col-md-6">
							<div class="input-group ">
								<textarea rows="3" cols="40" class="form-control" name="description" id="description"></textarea>
							</div>
						</div>
					</div>
				   <div class="form-group">
				      <label class="col-xs-3 col-md-3  text-right" style="width: 100px;"></label>
				      <div class="col-xs-8 col-md-8">
				      	<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.rolegroup.012" text="保存"/></button>
				      	<button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.rolegroup.013" text="取消"/></button>
				      </div>
				   </div>
				</form>
	          </div>
	        </div>
        </div>
      </div>
	</div>
</body>
</html>
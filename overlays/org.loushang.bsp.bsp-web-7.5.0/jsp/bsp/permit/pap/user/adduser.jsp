<!DOCTYPE html>
<%@ page isELIgnored="false" contentType="text/html; charset=utf-8"%>
<%@ page import="org.loushang.bsp.api.user.UserServiceFactory"%>
<%@	page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%
	String signId = GetBspInfo.getBspInfo().getUserId();
%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>增加用户</title>

<!-- 需要引用的CSS -->
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/user/adduser.css'/>" />
<!--[if lt IE 9]>
	<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/RSA.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/adduser.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/funauthority.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/dataauthority.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/userauthentication.js'/>"></script>
</head>
<body>
	<div id="bread" class="bread"></div>
	<ul id="myTab" class="nav nav-tabs ue-tabs">
		<li class="active"><a href="#zhxx" data-toggle="tab" id="zhxxTab"><spring:message code="bsp.user.012" text="账号信息"></spring:message></a></li>
		<li><a href="#gnqx" data-toggle="tab" id="gnqxTab"><spring:message code="bsp.user.013" text="功能权限"></spring:message></a></li>
		<li><a href="#sjqx" data-toggle="tab" id="sjqxTab"><spring:message code="bsp.user.014" text="数据权限"></spring:message></a>
		<li class="rzcl"><a href="#rzcl"  data-toggle="tab" id="rzclTab"><spring:message code="bsp.user.015" text="认证策略"></spring:message></a></li>
	</ul>
	<div id="myTabContent" class="tab-content">
		<div class="tab-pane active" id="zhxx">
			<form class="form-horizontal form_height" id="addForm"
				onsubmit="return false">
				<input type="hidden" value="${user.accountStatus}" name="oldAccountStatus" />
				<input type="hidden" value="${user.userTypeId}" name="userTypeId" />
				<input type="hidden" value="${user.password}" name="oldPassword" id="oldPassword" />
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right" for="userId"><spring:message code="bsp.user.006" text="账号"></spring:message><span
						class="required">*</span></label>
					<div class="col-xs-8 col-md-6">
						<input id="userId" name="userId" value="${ user.userId }"
							class="form-control ue-form Validform_input" type="text"
							datatype="account" nullmsg="<spring:message code="bsp.user.063" text="账号不能为空"></spring:message>" errormsg="<spring:message code="bsp.user.057" text="账号已存在"></spring:message>"
							placeholder="<spring:message code="bsp.user.064" text="不能修改，30位以内中英文均可"></spring:message>"> 
							<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right" for="userName"><spring:message code="bsp.user.007" text="名称"></spring:message><span
						class="required">*</span></label>
					<div class="col-xs-8 col-md-6">
						<input id="userName" name="userName" value="${user.userName }"
							class="form-control ue-form Validform_input" type="text"
							datatype="ls30" errormsg="<spring:message code="bsp.user.099" text="请输入30内的中、英文或下划线"></spring:message>" nullmsg="<spring:message code="bsp.user.066" text="名称不能为空"></spring:message>"> <span
							class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right" for="password"><spring:message code="bsp.user.016" text="密码"></spring:message><span
						class="required">*</span></label>
					<div class="col-xs-8 col-md-6">
						<input id="passWord" type="password" name="passWord"
							value="${user.password }"
							class="form-control ue-form Validform_input" datatype="password"
							nullmsg="<spring:message code="bsp.user.067" text="密码不能为空"></spring:message>"> <span
							class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right" for="passWord"><spring:message code="bsp.user.017" text="确认密码"></spring:message><span
						class="required">*</span></label>
					<div class="col-xs-8 col-md-6">
						<input id="re_passWord" datatype="*" type="password"
							name="re_passWord" value="${user.password }"
							class="form-control ue-form Validform_input" recheck="passWord"
							nullmsg="<spring:message code="bsp.user.068" text="确认密码不能为空"></spring:message>" errormsg="<spring:message code="bsp.user.069" text="密码不匹配"></spring:message>"> <span
							class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1  text-right" for="isSys"><spring:message code="bsp.user.018" text="管理员"></spring:message></label>
					<div class="col-xs-8 col-md-6">
						<div class="input-group">
							
							<label><input type="checkbox" id="isSys" name="isSys"
								value="1" /></label>
							<span class="issys-hint text-right">&nbsp;&nbsp;&nbsp;&nbsp;<spring:message code="bsp.user.060" text="(勾选管理员，设置所辖范围)"></spring:message></span>
						</div>
						
					</div>
				</div>
				<div class="form-group isSystem">
					<label class="col-xs-2 col-md-1  text-right" for="isSystem"><spring:message code="bsp.user.019" text="所辖范围"></spring:message></label>
					<div class="col-xs-8 col-md-6">
						<div class="input-group Validform_input">
							<input id="organNames" name="organNames" readonly="readonly"
								value="${user.organNames }" class="form-control ue-form"
								type="text">
							<div class="input-group-addon ue-form-btn select-jurisdiction">
								<span class="fa fa-user"></span>
							</div>
						</div>
						<input id="organIds" name="organIds" value="${user.organIds }"
							type="text" style="display: none"> <input id="struIds"
							name="struIds" type="text" value="${user.struIds }"
							style="display: none"> <input id="dataTypeCode"
							name="dataTypeCode" value="${user.dataTypeCode }" type="text"
							style="display: none">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1  text-right" for="accountStatus"><spring:message code="bsp.user.020" text="用户状态"></spring:message></label>
					<div class="col-xs-8 col-md-6">
						<div class="radio">
							<label><input type="radio" id="accountStatus1"
								name="accountStatus" value="11" checked /><spring:message code="bsp.user.021" text="打开"></spring:message></label> <label><input
								type="radio" id="accountStatus2" name="accountStatus" value="00"><spring:message code="bsp.user.022" text="锁定"></spring:message></label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right" for="principalName"><spring:message code="bsp.user.023" text="员工姓名"></spring:message></label>
					<div class="col-xs-8 col-md-6">
						<div class="input-group Validform_input">
							<input id="staffName" name="staffName" readonly="readonly"
								value="${user.organName }" class="form-control ue-form"
								type="text">
							<div class="input-group-addon ue-form-btn select-principal">
								<span class="fa fa-user"></span>
							</div>
						</div>
						<input id="staffId" name="staffId" value="${user.struId }"
							type="text" style="display: none">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right" for="principalName"><spring:message code="bsp.user.024" text="单位"></spring:message></label>
					<div class="col-xs-8 col-md-6">
						<div class="input-group Validform_input">
							<input id="cropName" name="cropName" readonly="readonly"
								value="${user.corpName }" class="form-control ue-form"
								type="text">
						</div>
						<input id="corpId" name="corpId" value="${user.corpId }"
							type="text" style="display: none">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right" for="principalName"><spring:message code="bsp.user.025" text="部门"></spring:message></label>
					<div class="col-xs-8 col-md-6">
						<div class="input-group Validform_input">
							<input id="deptName" name="deptName" readonly="readonly"
								value="${user.deptName }" class="form-control ue-form"
								type="text">
						</div>
						<input id="deptId" name="deptId" value="${user.deptId }"
							type="text" style="display: none">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-2 col-md-1 text-right"></label>
					<div class="col-xs-5 col-md-5">
						<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.user.026" text="保存"></spring:message></button>
						<button id="saveValBack" type="button" class="btn ue-btn-primary"><spring:message code="bsp.user.026" text="保存并返回"></spring:message></button>
					    <button type="button" class="btn ue-btn cancel" id="cancel"><spring:message code="bsp.user.027" text="取消"></spring:message></button>
					</div>
				</div>
			</form>
		</div>
		<div class="tab-pane" id="gnqx">
			<div class="ue-menu-wrap">
				<div class="container-fluid">
					<form class="form-inline" onsubmit="return false">
						<div class="btn-group">
							<div class="dropdown">
								<button class="btn ue-btn dropdown-toggle" id="selectBtn"
									type="button" data-toggle="dropdown"><spring:message code="bsp.user.028" text="可选/已选角色"></spring:message>
									<span class="fa fa-caret-down"></span>
								</button>
								<ul class="dropdown-menu ue-dropdown-menu">
									<li><a id="selectall"><spring:message code="bsp.user.028" text="可选/已选角色"></spring:message></a></li>
									<li><a id="selectes"><spring:message code="bsp.user.029" text="可选角色"></spring:message></a></li>
									<li><a id="selecteds"><spring:message code="bsp.user.030" text="已选角色"></spring:message></a></li>								
								</ul>
							</div>
							<div class="dropdown">
								<button class="btn ue-btn dropdown-toggle" id="allRoles"
									type="button" data-toggle="dropdown"><spring:message code="bsp.user.031" text="角色类型"></spring:message>
									<span class="fa fa-caret-down"></span>
								</button>
								<ul class="dropdown-menu ue-dropdown-menu">
									<li><a id="typeRole"><spring:message code="bsp.user.031" text="角色类型"></spring:message></a></li>
									<li><a id="commonRole"><spring:message code="bsp.user.032" text="普通角色"></spring:message></a></li>
									<li><a id="globalRole"><spring:message code="bsp.user.033" text="全局角色"></spring:message></a></li>
									<li><a id="interiorRole"><spring:message code="bsp.user.034" text="内置角色"></spring:message></a></li>
								</ul>
							</div>
						</div>
						<div class="input-group pull-right min">
							<input type="text" class="form-control ue-form" id="toRoleName"
								placeholder="<spring:message code="bsp.user.070" text="请输入名称查询"></spring:message>" />
							<div class="input-group-addon ue-form-btn" id="queryUser">
								<span class="fa fa-search"></span>
							</div>
						</div>
					</form>
					<table id="functionList" class="table table-bordered table-hover">
						<thead>
							<tr>
								<th width="45%" data-field="roleName" data-sortable="false"><spring:message code="bsp.user.035" text="角色名称"></spring:message></th>
								<th width="45%" data-field="roleCode"><spring:message code="bsp.user.036" text="角色编码"></spring:message></th>
								<th width="10%" data-field="isSelected" data-render="operations"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
		<div class="tab-pane" id="sjqx">
			<div class="ue-menu-wrap">
				<div class="container-fluid">
					<form class="form-inline" onsubmit="return false;">
						<label><strong><spring:message code="bsp.user.037" text="已选择的数据授权"></spring:message></strong></label>
						<div class="btn-group pull-right button-spacing">
							<button id="addDateAutority" type="button"
								class="btn ue-btn-primary">
								<span class="fa fa-plus"></span><spring:message code="bsp.user.001" text="增加"></spring:message>
							</button>
							<button id="delDateAutority" type="button"
								class="btn ue-btn button">
								<span class="fa fa-trash"></span><spring:message code="bsp.user.002" text="删除"></spring:message>
							</button>
						</div>
					</form>
					<table id="dataList" class="table table-bordered table-hover">
						<thead>
							<tr>
								<th width="5%" data-field="id" data-sortable="false"
									data-render="rendercheckbox"><input type="checkbox"
									id="selectAll" /></th>
								<th width="15%" data-field="organType"><spring:message code="bsp.user.038" text="组织类型"></spring:message></th>
								<th width="20%" data-field="organName"><spring:message code="bsp.user.039" text="组织名称"></spring:message></th>
								<th width="30%" data-field="struTypeName"><spring:message code="bsp.user.040" text="业务组织结构"></spring:message></th>
								<th width="10%" data-field="isScope" data-render="renderIsScope"
									title="是否包含下级"><spring:message code="bsp.user.041" text="是否包含下级"></spring:message></th>
								<th width="10%" data-field="isDefault"
									data-render="renderIsDefault"><spring:message code="bsp.user.042" text="是否默认"></spring:message></th>
								<th width="10%" data-field="organType"
									data-render="renderOrganType"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>

		<div class="tab-pane" id="rzcl">

			<div class="container-fluid">
				<form class="form-horizontal form_height" id="PolicyForm"
					onsubmit="return false">
					<div class="form-group hideheight">
						<input id="copyuserId" name="userId" value="">
					</div>

					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right down" for=""><spring:message code="bsp.user.043" text="最大会话数"></spring:message><span
							class="required">*</span></label>
						<div class="col-xs-8 col-md-6">
							<input id="maxsession" name="maxsession" value=""
								class="form-control ue-form Validform_input" type="text"
								datatype="maxsession" nullmsg="<spring:message code="bsp.user.071" text="会话数不能为空"></spring:message>" errormsg=""> <span
								class="Validform_checktip Validform_span"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for=""><spring:message code="bsp.user.044" text="启用IP策略"></spring:message></label>
						<div class="col-xs-8 col-md-6">
							<label><input id="isUseIp" name="isUseIp" type="checkbox" value="0" /> </label>
						</div>
					</div>
					<div class="form-group ip-policy">
						<label class="col-xs-2 col-md-1 text-right" for=""></label>
						<div class="col-xs-8 col-md-6">
							
							<textarea style="resize:none;" class="form-control ue-form ipPolicyValue" name="ipPolicyValue" rows="5px" nullmsg="" ></textarea>
							<span class="Validform_checktip Validform_span"
								style="width: 200px;"></span>
							
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for=""></label>
						<div class="col-xs-8 col-md-6">
							
								<button type="button" class="btn ue-btn-primary saveBtn"
									id="saveBtn"><spring:message code="bsp.user.026" text="保存"></spring:message></button>
								<button type="button" class="btn ue-btn cancel" id="cancelForRzcl"><spring:message code="bsp.user.027" text="取消"></spring:message></button>


						</div>

					</div>

					
					<div class="form-group">
						<div class="hint" style="width: 420px"></div>
						<div class="explain">
							<strong><spring:message code="bsp.user.045" text="相关帮助"></spring:message></strong>
							<ol style="margin-top: 10px; margin-left: 20px;">
								<li>1.&nbsp;&nbsp;<spring:message code="bsp.user.046" text="最大会话数功能描述"></spring:message></li>
								<li>2.&nbsp;&nbsp;<spring:message code="bsp.user.047" text="IP策略功能描述，配置规则如下："></spring:message></li>
								<li>
								<ul style="margin-left: 10px;">
									<li>1)&nbsp;&nbsp;<spring:message code="bsp.user.048" text="允许使用通配符“*”，例如：10.162.12.*；"></spring:message></li>
									<li>2)&nbsp;&nbsp;<spring:message code="bsp.user.049" text="两个IP用“-”隔开表示IP范围段，例如：10.162.11-10.162.11.69；"></spring:message></li>
									<li>3)&nbsp;&nbsp;<spring:message code="bsp.user.050" text="禁止某IP用“-”开头，例如：-10.162.12.12-10.162.12.56；"></spring:message></li>
									<li>4)&nbsp;&nbsp;<spring:message code="bsp.user.051" text="各个IP间用“；”隔开，例如：10.162.12.12；10.162.12.56；"></spring:message></li>
								</ul>
								</li>
							</ol>
						</div>
					</div>

				</form>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var time = 0;//判断点击保存按钮时是保存还是修改
	var context = '<%=request.getContextPath()%>';
	var signId = '<%=signId%>';
	var check = '${user.accountStatus}';
	var isSysCheck = '${user.isSys}';
	
</script>
</html>
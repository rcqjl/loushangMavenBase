<!DOCTYPE html>
<%@ page isELIgnored="false" contentType="text/html; charset=utf-8"%>
<%@	page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>增加用户</title>

<!-- 需要引用的CSS -->
<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css,bsp/user/css/user/addusernoorg.css" />
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
	<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<l:script path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js,jquery.form.js,bsp/bsp-common.js,bsp/user/RSA.js,bsp/user/addusernoorg.js,bsp/user/funauthoritynoorg.js,bsp/user/usergroupnoorg.js"/>
</head>
<body>
	<ul id="myTab" class="nav nav-tabs ue-tabs tabs-edituser">
		<li id="firstTab">
			<a href="#zhxx" data-toggle="tab">
				<spring:message code="bsp.user.012" text="账号信息"></spring:message>
			</a>
		</li>
		<li id="secondTab">
			<a href="#gnqx" data-toggle="tab" id="gnqxTab">
				<spring:message code="bsp.user.013" text="分配角色"></spring:message>
			</a>
		</li>
		<li id="thirdTab">
			<a href="#sjqx" data-toggle="tab" id="sjqxTab">
				<spring:message code="bsp.user.014" text="加入组"></spring:message>
			</a>
		</li>
	</ul>
	<div id="myTabContent" class="tab-content">
		<div class="tab-pane" id="zhxx">
			<div class="ue-menu-wrap">
				<form class="form-horizontal form_height" id="addForm" onsubmit="return false">
					<input type="hidden" value="${user.accountStatus}" name="oldAccountStatus" />
					<input type="hidden" value="${user.userTypeId}" name="userTypeId" />
					<input type="hidden" value="${user.password}" name="oldPassword" id="oldPassword" />
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for="userId">
							<spring:message code="bsp.user.006" text="账号" />
							<span class="required">*</span>
						</label>
						<div class="col-xs-10 col-md-6">
							<input id="userId" name="userId" value="${ user.userId }"
								class="form-control ue-form Validform_input"
								type="text"
								datatype="account"
								nullmsg="<spring:message code="bsp.user.063" text="账号不能为空"></spring:message>"
								errormsg="<spring:message code="bsp.user.057" text="账号已存在"></spring:message>"
								placeholder="<spring:message code="bsp.user.064" text="不能修改，30位以内中英文均可"></spring:message>"> 
							<span class="Validform_checktip Validform_span"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for="userName">
							<spring:message code="bsp.user.007" text="名称"></spring:message>
							<span class="required">*</span>
						</label>
						<div class="col-xs-10 col-md-6">
							<input id="userName" name="userName" value="${user.userName }"
								class="form-control ue-form Validform_input" type="text"
								datatype="ls30"
								errormsg="<spring:message code="bsp.user.099" text="请输入30内的中、英文或下划线"></spring:message>"
								nullmsg="<spring:message code="bsp.user.066" text="名称不能为空"></spring:message>">
							<span class="Validform_checktip Validform_span"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for="password">
							<spring:message code="bsp.user.016" text="密码"></spring:message>
							<span class="required">*</span>
						</label>
						<div class="col-xs-10 col-md-6">
							<input id="passWord" type="password" name="passWord"
								value="${user.password }"
								class="form-control ue-form Validform_input"
								datatype="password"
								nullmsg="<spring:message code="bsp.user.067" text="密码不能为空"></spring:message>">
							<span class="Validform_checktip Validform_span"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right" for="passWord">
							<spring:message code="bsp.user.017" text="确认密码"></spring:message>
							<span class="required">*</span>
						</label>
						<div class="col-xs-10 col-md-6">
							<input id="re_passWord" datatype="*" type="password"
								name="re_passWord" value="${user.password }"
								class="form-control ue-form Validform_input" recheck="passWord"
								nullmsg="<spring:message code="bsp.user.068" text="确认密码不能为空"></spring:message>"
								errormsg="<spring:message code="bsp.user.069" text="密码不匹配"></spring:message>">
							<span class="Validform_checktip Validform_span"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-2 col-md-1  text-right" for="accountStatus"><spring:message code="bsp.user.020" text="用户状态"></spring:message></label>
						<div class="col-xs-10 col-md-6">
							<div class="radio">
								<label><input type="radio" id="accountStatus1"
									name="accountStatus" value="11" checked /><spring:message code="bsp.user.021" text="打开"></spring:message></label> <label><input
									type="radio" id="accountStatus2" name="accountStatus" value="00"><spring:message code="bsp.user.022" text="锁定"></spring:message></label>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-2 col-md-1 text-right"></label>
						<div class="col-xs-10 col-md-5">
							<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.user.026" text="保存"></spring:message></button>
						    <button type="button" class="btn ue-btn cancel" id="cancel"><spring:message code="bsp.user.027" text="取消"></spring:message></button>
						</div>
					</div>
				</form>
			</div>
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
							
						</div>
						<div class="input-group pull-right min">
							<input type="text" class="form-control ue-form" id="toRoleName"
								placeholder="<spring:message code="bsp.user.070" text="请输入角色名称查询"></spring:message>" />
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
					<form class="form-inline" onsubmit="return false">
						<div class="btn-group">
							<div class="dropdown">
								<button class="btn ue-btn dropdown-toggle" id="selectgroupBtn"
									type="button" data-toggle="dropdown"><spring:message code="bsp.user.028" text="可加入/已加入组"></spring:message>
									<span class="fa fa-caret-down"></span>
								</button>
								<ul class="dropdown-menu ue-dropdown-menu">
									<li><a id="selectallgroup"><spring:message code="bsp.user.028" text="可加入/已加入组"></spring:message></a></li>
									<li><a id="selectegroups"><spring:message code="bsp.user.029" text="可加入组"></spring:message></a></li>
									<li><a id="selectedgroups"><spring:message code="bsp.user.030" text="已加入组"></spring:message></a></li>								
								</ul>
							</div>
							
						</div>
						<div class="input-group pull-right min">
							<input type="text" class="form-control ue-form" id="toGroupName"
								placeholder="<spring:message code="bsp.user.070" text="请输入组名称查询"></spring:message>" />
							<div class="input-group-addon ue-form-btn" id="queryGroup">
								<span class="fa fa-search"></span>
							</div>
						</div>
					</form>
					<table id="groupList" class="table table-bordered table-hover">
						<thead>
							<tr>
								<th width="45%" data-field="groupId" data-sortable="false"><spring:message code="bsp.user.035" text="组名称"></spring:message></th>
								<th width="10%" data-field="isSelect" data-render="groupOperations"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
		
	</div>
</body>
<script type="text/javascript">
	var time = 0;//判断点击保存按钮时是保存还是修改
	var context = '<%=request.getContextPath()%>';
	var dialog = parent.dialog.get(window);
	var check = '${user.accountStatus}';
	var flagStatus = '${flagStatus.flagStatus}';
</script>
</html>
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
  <title>组织机构管理</title>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/organ/organmanager.css'/>"/>
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
  <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='bsp/organ/organmanager.js'/>"></script>
</head>
<body>
  <div class="ue-menu-wrap">

    <div class="ue-menu-left">
      <button class="btn select-stru-type">
    		<span class="stru-type-name" title="${object.typeName }">${object.typeName }</span>
    		<span class="fa fa-angle-right"></span>
  	  </button>
  	  <div class="searchContainer">
        <div class="input-group searchDiv">
          <input class="form-control ue-form" type="text" id="queryorganName" placeholder="<spring:message code="bsp.organ.005" text="组织名称"/>">
          <div class="input-group-addon ue-form-btn" id="query">
            <span class="fa fa-search"></span>
          </div>
        </div>
      </div>
      <ul id="organTree" class="ztree"></ul>
    </div>

    <div class="ue-menu-right">
      <div class="row">
        <form class="form-inline" onsubmit="return false;">
          <span class="tableTitle"><spring:message code="bsp.organ.006" text="组织树"/></span>
          <div class="btn-group pull-right">
            <button id="addOrgan" type="button" class="btn ue-btn">
               <span class="fa fa-plus"></span><spring:message code="bsp.organ.007" text="增加下级"/>
            </button>
            <button id="del" type="button" class="btn ue-btn">
               <span class="fa fa-trash"></span><spring:message code="bsp.organ.008" text="删除"/>
            </button>
            <button id="change" type="button" class="btn ue-btn">
              <span class="fa fa-random"></span> <spring:message code="bsp.organ.009" text="变更隶属"/>
            </button>
            <div class="btn-group">
	            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
					<spring:message code="bsp.organ.010" text="更多"/><span class="fa fa-caret-down"></span>
	            </button>
	            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				   <li><a id="sort"><span class="fa fa-arrows-v"></span> <spring:message code="bsp.organ.011" text="排序"/></a></li>
	               <li><a id="import"><span class="fa fa-upload"></span> <spring:message code="bsp.organ.012" text="导入"/></a></li>
	               <li><a id="export"><span class="fa fa-download"></span><spring:message code="bsp.organ.013" text="导出"/></a></li>
	            </ul>
	        </div>
          </div>
        </form>
        <table id="organList" class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="5%" data-field="struId" data-sortable="false" data-render="rendCheckbox">
                <input type="checkbox" id="selectAllOrgans" />
              </th>
              <th width="30%" data-field="organCode" data-render="rendOrganCode"><spring:message code="bsp.organ.014" text="组织代码"/></th>
              <th width="35%" data-field="organName" data-render="rendOrganName"><spring:message code="bsp.organ.015" text="组织名称"/></th>
              <th width="15%" data-field="organTypeName"><spring:message code="bsp.organ.016" text="组织类型"/></th>
              <th width="75px" data-field="struId" data-render="rendBtn"><spring:message code="bsp.organ.017" text="操作"/></th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 新增 -->
      <div class="modal" id="addOrganModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div i="header" class="ui-dialog-header">
          <button   title="cancel" class=" ui-dialog-close " data-dismiss="modal" aria-label="Close">×</button>
          <div  class="ui-dialog-title modal-title" ><spring:message code="bsp.organ.018" text="增加组织项"/></div>    
          </div>
        
        
          <!-- </div> -->
         
          <div class="modal-body">
            <form class="form-horizontal" id="organForm" name="organForm" onsubmit="return false">
            
              <div class="form-group field biz-organ">
                <label class="col-xs-3 col-md-3 text-right"><spring:message code="bsp.organ.019" text="业务机构类型"/></label>
                <div class="col-xs-8 col-md-8">
                  <label><input type='radio' name="bizType" value="0" checked="checked"/> <spring:message code="bsp.organ.020" text="行政机构"/> </label>&nbsp;&nbsp;
                  <label><input type='radio' name="bizType" value="1"/> <spring:message code="bsp.organ.021" text="虚拟机构"/></label>
                  <span class="Validform_checktip Validform_span"></span>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-xs-3 col-md-3 text-right" for="organType"><spring:message code="bsp.organ.016" text="组织类型"/></label>
                <div class="col-xs-8 col-md-8">
                  <select id="organType" name="organType" class="form-control ue-form Validform_input">
                  </select>
                  <input id="organTypeRO" readonly="readonly" style="display:none;" class="form-control ue-form Validform_input">
                  <span class="Validform_checktip Validform_span"></span>
                </div>
              </div>
              
              <div class="form-group field select-organ">
                <label class="col-xs-3 col-md-3 text-right" for="selectedOrganName"><spring:message code="bsp.organ.022" text="选择已有组织"/><span class="required">*</span></label>
                <div class="col-xs-8 col-md-8">
                  <div class="input-group Validform_input">
                    <input id="selectedOrganName" name="selectedOrganName" datatype="*" nullmsg="<spring:message code="bsp.organ.023" text="请选择下级"/>" readonly="readonly" class="form-control ue-form" type="text">
                 	<input id="selectedStruId" name="selectStruId" type="text" style="display:none">
                    <div class="input-group-addon ue-form-btn select-organ-btn">
                      <span class="fa fa-sitemap"></span>
                    </div>
                  </div>
                  <span class="Validform_checktip Validform_span"></span>
                </div>
              </div>
              
              <div class="form-group field organ position">
                <label class="col-xs-3 col-md-3 text-right" for="organCode"><spring:message code="bsp.organ.014" text="组织代码"/><span class="required">*</span></label>
                <div class="col-xs-8 col-md-8">
                  <input id="organCode" name="organCode" class="form-control ue-form Validform_input" type="text" datatype="organCode" nullmsg="<spring:message code="bsp.organ.024" text="组织代码不能为空"/>">
                  <input id="parentId" name="parentId" type="hidden">
                  <input id="struType" name="struType" type="hidden">
                  <input id="struId" name="struId" type="hidden">
                  <span class="Validform_checktip Validform_span"></span>
                </div>
              </div>
              
              <div class="form-group field organ position">
                <label class="col-xs-3 col-md-3 text-right" for="organName"><spring:message code="bsp.organ.015" text="组织名称"/><span class="required">*</span></label>
                <div class="col-xs-8 col-md-8">
                  <input id="organName" name="organName" class="form-control ue-form Validform_input" type="text" datatype="*" nullmsg="<spring:message code="bsp.organ.025" text="组织名称不能为空"/>">
                  <span class="Validform_checktip Validform_span"></span>
                </div>
              </div>
              
              <div class="form-group field organ position">
                <label class="col-xs-3 col-md-3 text-right" for="shortName"><spring:message code="bsp.organ.026" text="组织简称"/></label>
                <div class="col-xs-8 col-md-8">
                  <input id="shortName" name="shortName" class="form-control ue-form Validform_input" type="text">
                </div>
              </div>
              
               <div class="form-group struOrder" >
                <label class="col-xs-3 col-md-3 text-right" for="struOrder"><spring:message code="bsp.organ.027" text="显示序号"/><span class="required">*</span></label>
                <div class="col-xs-8 col-md-8">
                  <input id="struOrder" name="struOrder" class="form-control ue-form Validform_input" value="0" type="text" datatype="struOrder" nullmsg="<spring:message code="bsp.organ.028" text="序号不能为空"/>">
               	  <span class="Validform_checktip Validform_span"></span>
                </div>
              </div> 
              
              <div class="form-group field organ">
                <label class="col-xs-3 col-md-3 text-right" for="principalName"><spring:message code="bsp.organ.029" text="负责人"/></label>
                <div class="col-xs-8 col-md-8">
                  <div class="input-group Validform_input">
                    <input id="principalName" name="principalName" readonly="readonly" class="form-control ue-form" type="text">
                    <div class="input-group-addon ue-form-btn select-principal">
                      <span class="fa fa-user"></span>
                    </div>
                  </div> 
                  <input id="principalId" name="principalId" type="text" style="display:none">
                </div>
              </div>
              
              <div class="form-group field position">
                <label class="col-xs-3 col-md-3 text-right" for="employeeName"><spring:message code="bsp.organ.030" text="员工"/></label>
                <div class="col-xs-8 col-md-8">
                  <div class="input-group Validform_input">
                    <input id="empOrganName" name="empOrganName" readonly="readonly" class="form-control ue-form" type="text">
	                <input id="empStruId" name="empStruId" type="text" style="display:none">
                    <div class="input-group-addon ue-form-btn select-emp">
                      <span class="fa fa-user"></span>
                    </div>
                  </div>
                  <span class="Validform_checktip Validform_span"></span>
                </div>
              </div>
              
              <div class="form-group button">
                <label class="col-xs-3 col-md-3  text-right"></label>
                <div class="col-xs-8 col-md-8">
                  <button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.organ.003" text="保存"/></button>
                  <button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.organ.004" text="取消"/></button>
                </div>
              </div>
          </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</body>
<script type="text/javascript">
  var struType = "${param.struType}";
  if(!struType) {
    struType = "00";
  }
  var context = "<l:assetcontext/>";
</script>
</html>
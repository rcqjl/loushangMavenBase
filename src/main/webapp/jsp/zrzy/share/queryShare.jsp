<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>



<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>自然资源登记单元列表</title>
<!-- 引入css文件 -->
<l:link
    path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/datatables.css" />
<style>
.container {
    width: 100%;
}

.row {
    margin:0;
}
.topdist{
        margin-top:10px;
      }
      .popover {
		min-width: 320px;
	  }
	  .form-group {
		width: 100%;
		margin-top:10px;
	  }
	  @media(max-width:768px) {
		.max-width {
			width:150px;
			float:left;
		}
	  }

</style>
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
<!-- 引入js文件 -->
<l:script
    path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js,zrzy/share/sharelist.js" />
<script type="text/javascript">
        //项目上下文
        var context="<%=request.getContextPath()%>";


</script>
<script id="searchpanel" type="text/html">
        <div id="searchtemp">
           
			<div class="form-group">
				<label for="taskCode" class="text-name">行政区名称：</label> 
				<input type="text" class="form-control ue-form" id="xzqmc" placeholder="行政区名称">
			</div>
			<div class="form-group">
				<label for="taskCode" class="text-name">登记类型：</label> 
				
			<select class="form-control ue-form" id="djdylx">
                    <option value="">全部</option>
                    <option value="森林">森林</option>
                    <option value="草地">草地</option>
					<option value="水流">水流</option>
					<option value="滩涂">滩涂</option>
					<option value="山岭">山岭</option>
					<option value="荒地">荒地</option>
					<option value="矿产">矿产</option>
                </select> 
			</div>
			<div class="form-group">
				<label for="taskCode" class="text-name">所有权人：</label> 
				<input type="text" class="form-control ue-form" id="syqr" placeholder="所有权人">
			</div>
			
			<div class="form-group" style="padding-left: 65px">
				<button id="search" class="btn ue-btn-primary"><span class="fa fa-search"></span>搜索</button>
                <button id="reset" class="btn ue-btn-primary"><span class="fa fa-refresh"></span>重置</button>
			</div>
		<div>
</script>
</head>
<body>
    <div class="topdist"></div>
    <div class="container">        
        <div class="row">
        <form class="form-inline" onsubmit="return false;">                                     
            <div class="input-group max-width">
                <input class="form-control ue-form" type="text" id="zrzydymc" placeholder="自然资源单元名称"/>
                <div class="input-group-addon ue-form-btn" id="query">
                    <span class="fa fa-search"></span>
                </div>
            </div>
            <a class="btn ue-btn dbtn" id="moresearch">更多搜索<i class="fa fa-angle-down"></i></a>       
        </form>
        </div>
        <div class="row">
            <table id="logList" class="table table-bordered table-hover">
                <thead>
                    <tr class="trd0">                      
                        <th width="10%" data-field="bsm_DY" data-sortable="false">登记单元标识码</th>
                        <th width="10%" data-field="xzqmc" data-sortable="false">行政区名称</th>
                        <th width="10%" data-field="xmmc" data-sortable="false">项目名称</th>
                        <th width="12%" data-field="djdylx" data-sortable="false">登记单元类型</th>
                        <th width="16%" data-field="zrzydymc" data-sortable="false">自然资源单元名称</th>
                        <th width="16%" data-field="syqr" data-sortable="false">所有权人</th>
                        <th width="10%" data-field="zmj" data-sortable="false">总面积</th> 
                        <th width="10%" data-field="dcdw" data-sortable="false">调查单位</th> 
                        <th width="10%" data-field="dcsj" data-sortable="false" data-render="dateFormat">调查时间</th> 
                        <!-- <th width="10%" data-field="SHAPEFILE_DR_ID" data-sortable="false">数据流编码</th> -->
                        <th width="10%" data-field="operate" data-render="detailoptions" data-sortable="false">详情</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</body>
</html>

<!DOCTYPE html>
<%@ page  isELIgnored="false" contentType="text/html; charset=utf-8" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title><spring:message code="bsp.workcalendar.000" text="工作日历管理"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/workcalendar/workcalendar.css'/>"/>
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/workcalendar/workcalendar.js'/>"></script>
</head>

<body class="editPage">
	<div class="container-fluid">
		<form class="form-inline" onsubmit="return false;">								  
		    <div class="btn-group pull-right">
				<button id="save" type="button" class="btn ue-btn"><spring:message code="bsp.workcalendar.003" text="保存"/></button>
			</div>
		</form>
		<form>
		    <input type="hidden" name="solarDate" id="solarDate" value="${solarDate }"/> 
            <input type="hidden" name="organId" id="organId" value="1"/> 
			<div class="calendar-info">
			     <p class="editTitle"><spring:message code="bsp.workcalendar.001" text="设置工作日历"/></p>
			     <p class="editMessage">
				     <span class="editYear"><spring:message code="bsp.workcalendar.007" text="年份"/>: ${solarDate }</span>
				     <span class="editOrgan"><spring:message code="bsp.workcalendar.008" text="机构名称"/>: ${organName }</span>
			     </p>
			</div>
			<div class="month123" id="month">${monthStr123}</div>
	        <div class="month456" id="month">${monthStr456}</div>
	        <div class="month789" id="month">${monthStr789}</div>
	        <div class="month101112" id="month">${monthStr101112}</div>		
		</form>
		
	</div>
</body>
<script type="text/javascript">
    var context = '<%=request.getContextPath()%>';
    var day = $(".calendarDay td");
    for(var i=0;i<day.length;i++){
    	if(day[i].childNodes[1]&&day[i].childNodes[1].tagName == "INPUT"){
        	var checkbox = day[i].childNodes[1];
        	if(checkbox.checked){
        		day[i].style.backgroundColor = "rgb(190,242,255)";
        	}
        }
    } 
   
    $(".calendarDay td").on("click",function(event){
    	var clickElement = event.target;
    	
    	if(clickElement.tagName != "TD"){
    		clickElement = clickElement.parentElement;
    	}
   		if(clickElement.style.backgroundColor != ""){
   			clickElement.style.backgroundColor = "";
   			$(clickElement.childNodes[1]).removeAttr("checked");
   		}else {
       		clickElement.style.backgroundColor = "rgb(190,242,255)";
           	if(clickElement.childNodes[1].tagName == "INPUT"){
           		clickElement.childNodes[1].checked = true;
           	}
       	}
    
    	
    	
    });
</script>
</html>
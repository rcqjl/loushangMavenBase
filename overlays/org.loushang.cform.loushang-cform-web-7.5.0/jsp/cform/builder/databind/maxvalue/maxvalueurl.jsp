<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>

<label for="dataBindParam" style="display:block;"><s:message code="cf.bdr.swiftnumber" text="业务流水号"/></label>
<input type="text" id="dataBindParam" name="dataBindParam" style="display:inline;" readonly="readonly"/>
<a href='javascript:void(0);' id='bizMeanBtn' class='cformhelp-helpbtn' onclick="bizMeanBtnHandler();"></a>
<script type="text/javascript">
	function bizMeanBtnHandler(){
		var windowParam=' left='+(screen.availWidth-420)/2+',top='+(screen.availHeight-400)/2+',width=420px,height=400px,scrollbars=no,resizable=yes,toolbar=no,location=no';
		var newindow = window.open('<%=request.getContextPath()%>/jsp/cform/builder/databind/maxvalue/selectmaxvalue.jsp',"_blank",windowParam);
		newindow.onbeforeunload = function(){
			var result= newindow.returnValue
			if(result){
				$('#dataBindParam').val(result.id);
			}else if(typeof result == 'string' && !result){
				$('#dataBindParam').val('');
			}
		}
		
	}
</script>
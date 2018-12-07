<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>

<label for="dataBindParam"><s:message code="cf.bdr.dictionary" text="字典项"/></label><br/>
<div style="position:absolute;">
<input type="text" id="dataBindParam" name="dataBindParam" readonly="readonly"/>
<a href='javascript:void(0);' id='dictBtn' class='cformhelp-helpbtn' style="position:absolute;top:0px;left:205px;" onclick="dictBtnHandler();"></a>
</div>
<script type="text/javascript">
	function dictBtnHandler(){
		var value = $('#dataBindParam').val();
		var windowParam=' left='+(screen.availWidth-784)/2+',top='+(screen.availHeight-384)/2+',width=784px,height=384px,scrollbars=no,resizable=yes,toolbar=no,location=no';
		var newindow = window.open('<%=request.getContextPath()%>/jsp/cform/builder/databind/dictservice/querydict.jsp',"_blank",windowParam);
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
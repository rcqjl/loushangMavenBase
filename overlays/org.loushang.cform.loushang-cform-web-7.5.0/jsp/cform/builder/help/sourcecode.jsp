<!DOCTYPE html > 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.bdr.soucrcemodal" text="源码模式"/></title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/codemirror.css">
		<style type="text/css">
		body {
		    padding: 0px;
		    margin: 0px;
		    font-size: 13px;
		}
		.sourceCodeDiv, .CodeMirror {
			height: 100%;
		}
		</style>
		<script src="<%=request.getContextPath()%>/jsp/cform/skin/js/jquery.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/codemirror.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/codemirror.xml.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/codemirror.javascript.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/codemirror.css.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/codemirror.htmlmixed.js"></script>
	</head>
	<body>
		<div class="sourceCodeDiv">
			<textarea id="sourceCodeText" name="sourceCodeText"></textarea>
		</div>
	</body>
	<script type="text/javascript">
	$(function(){
		var mixedMode = {
		        name: "htmlmixed",
		        scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
		                       mode: null},
		                      {matches: /(text|application)\/(x-)?vb(a|script)/i,
		                       mode: "vbscript"}]
		      };
		window.parent.CForm.editor = CodeMirror.fromTextArea(
				document.getElementById("sourceCodeText"), 
				{
					lineNumbers: true, 
					lineWrapping: true,
					mode: mixedMode, 
					tabMode: "indent"
				});
		window.parent.CForm.getFormatCode = function(code){
			var codeObj = {
				"code":code	
			}
			$.ajax({
				url:"<%=request.getContextPath()%>/service/cform/builder/codeformat",
				async : false,
				dataType : "json",
				contentType: "application/json",  
				data: JSON.stringify(codeObj),
				type : "POST",
				success:function(data){
					if(data!=""){
						code = data.code;
					}
				}
			})
			return code;
		}
	});
	</script>
</html>
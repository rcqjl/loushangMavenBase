<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.net.*" %>
<%@ page import="java.util.Arrays" %>
<%@ page import="org.loushang.next.i18n.ResourceBundle" %>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%
ResourceBundle res = ResourceBundle.getPackageBundle("ui.common");
%>
<html>
<head>
    <next:ScriptManager></next:ScriptManager>
    <resource:resource localeDir="ui.common"></resource:resource>
    <style type="text/css">
	<!--
	.gridPrintTitle {
		text-align:center; 
		font-weight: bold; 
	}
	.l-grid3-td-checker {
		display:none;
	}
	-->
	</style>
<script>
//初始化页面大小
window.resizeTo(window.screen.availWidth,window.screen.availHeight);
window.moveTo(0,0);
//从父页面获取内容
var father = window.opener;
function setContent(id){
	 if(id=="")return;
	 if(father != null){
	    //获取父页面需要打印的内容
	    var doc=father.document;
	    var obj=doc.getElementById(id);
	    var content=L5.query(".l-grid3-header-offset",obj);
	    var idHead=id+"Head";
	    document.getElementById(idHead).innerHTML =  content[0].innerHTML;  
		var idBody=id+"Body";
	    var content=L5.query(".l-grid3-body",obj);
	    document.getElementById(idBody).innerHTML =  content[0].innerHTML;  
	  }
}
function print(){
  document.all.WebBrowser.ExecWB(7,1);
  window.close();
}
</script>
</head>
<body style="background-color:White; ">
    <!--注册打印控件-->
    <object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
    <div id="printContent">
<% 
String ids=request.getParameter("id");
if(ids==null||"".equals(ids)){
	throw new RuntimeException(res.getLocaleMsg("UI.COMMON.005","参数ID不能为空"));
}
String[] idsArray=ids.split(",");

String title=request.getParameter("title");
if(title!=null){
	title=URLDecoder.decode(title,"utf-8");
}else{
	title="";
}
String[] titleArray=title.split(",");
if(titleArray.length<idsArray.length){
	String [] temp=new String[idsArray.length];
	Arrays.fill(temp,"");
	System.arraycopy(titleArray, 0, temp, 0, titleArray.length);
	titleArray=temp;
}
for(int i=0;i<idsArray.length;i++){
%>	
	<!--设置打印标题-->
    <div id="<%=idsArray[i]%>Title" class="gridPrintTitle"><%=titleArray[i]%>
    </div>
    <br />
    <!--设置打印的列标题-->
    <div id="<%=idsArray[i]%>Head">
    </div>
    <!--设置打印的数据-->
    <div id="<%=idsArray[i]%>Body">
    </div>
    
    <br/>
    
    <script>
    setContent("<%=idsArray[i]%>");
    </script>
<%	
}
%>

    </div>
<script>
//打印预览
print();
</script>    
</body>
</html>

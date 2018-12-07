<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ page import="org.loushang.next.i18n.LocaleHolder" %>
<% 
String language =LocaleHolder.getLocale().getLanguage();
%>
<HTML>
	<HEAD>
	<style type="text/css">
	</style>
	</HEAD>
	<body>
		<%
              if(language.equals("zh")){
              %>
		<img alt="" width="100%" height="100%" src="images/pic.JPG">
			<%
              }else if(language.equals("en")){
              %>
		<img alt="" width="100%" height="100%" src="images/pic_en_US.JPG">
			<%
              }
             %>
	</body>
</HTML>
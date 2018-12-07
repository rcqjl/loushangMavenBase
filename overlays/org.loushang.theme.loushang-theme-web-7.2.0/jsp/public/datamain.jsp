<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="org.loushang.next.i18n.ResourceBundle" %>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%
ResourceBundle res = ResourceBundle.getPackageBundle("ui.common");
%>


<html>
<head>
</head>

<body topmargin="10px">
<DIV class=HdrProps>
<TABLE class=Form>
	<COLGROUP>
		<COL width="20%">
		<COL width="80%">
	</COLGROUP>
	<TBODY>
		<TR class=Section>
			<TH colSpan=2><%=res.getLocaleMsg("UI.COMMON.025","初&nbsp;始&nbsp;化&nbsp;数&nbsp;据&nbsp;库")%></TH>
		</TR>
	</TBODY>
</TABLE>
</DIV>

<hr>
<FORM style="MARGIN-TOP: 0px" name=frmMain method=post	action="initing.jsp">
	<div>
	<BUTTON class=btn id=btnClear accessKey=R name=btnClear type=reset><%=res.getLocaleMsg("UI.COMMON.026","重&nbsp;置")%></BUTTON>
	<BR>
	<hr>
	<TABLE class=Form>
		<COLGROUP>
			<COL width="50%">
			<COL width="50%">
		</COLGROUP>
		<TBODY>
			<TR class=Separator>
				<TD class=sep1 colSpan=2 align="center"><%=res.getLocaleMsg("UI.COMMON.027","使用配置文件中的数据源连接数据库")%><BR>
				<HR>
				</TD>
			</TR>
			<tr>
				<td class=Field>
				<BUTTON class=btn id=btnSave3 accessKey=S name=btnSave3 type=button
					onClick="OnSubmit31()"><%=res.getLocaleMsg("UI.COMMON.028","初始化数据")%></BUTTON>
				</td>
				<td class=Field>
				<BUTTON class=btn id=btnSave33 accessKey=S name=btnSave33 type=button
					onClick="OnSubmit32()"><%=res.getLocaleMsg("UI.COMMON.029","自定义SQL的执行")%></BUTTON>
				</td>
			</tr>
		</TBODY>
	</TABLE>
	</div>

	<br>
	<hr>
	<TABLE class=Form>
		<COLGROUP>
			<COL width="20%">
			<COL width="80%">
		</COLGROUP>
		<TBODY>
			<TR class=Separator>
				<TD class=sep1 colSpan=2 align="center"><%=res.getLocaleMsg("UI.COMMON.030","直接连接数据库")%><BR>
				<HR>
				</TD>
			</TR>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.031","数据库类型")%></td>
				<td class=Field><select name=dbtype>
					<option value="1">SqlServer</option>
					<option value="2">Oracle</option>
					<option value="3" selected>IBM_db2<%=res.getLocaleMsg("UI.COMMON.032","(应用服务器安装了客户端)")%></option>
					<option value="4">IBM_db2_type4<%=res.getLocaleMsg("UI.COMMON.033","(应用服务器未安装客户端)")%></option>
					<option value="5">MySQL</option>
					<option value="jndi"><%=res.getLocaleMsg("UI.COMMON.034","使用JNDI连接")%></option>
					<option value="dataSource"><%=res.getLocaleMsg("UI.COMMON.027","使用配置文件中的数据源连接数据库")%></option>
				</select></td>
			</tr>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.035","数据库服务器")%>IP</td>
				<td class=Field><input accesskey=Z name=dbserver maxlength="20"
					value="127.0.0.1"></td>
			</tr>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.036","数据库名称")%></td>
				<td class=Field><input accesskey=Z name=dbname maxlength="20"
					value="loushang"></td>
			</tr>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.037","用户名")%></td>
				<td class=Field><input accesskey=Z name=username maxlength="20"
					value="sa"></td>
			</tr>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.038","密  码")%></td>
				<td class=Field><input accesskey=Z type=password name=password
					maxlength="20" value=""></td>
			</tr>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.039","使用现有数据库")%></td>
				<td class=Field>
				<BUTTON class=btn id=btnSave1 accessKey=S name=btnSave1 type=button
					onClick="OnSubmit11()"><%=res.getLocaleMsg("UI.COMMON.040","开始创建初始化数据")%></BUTTON>
				&nbsp;
				<BUTTON class=btn id=btnSave11 accessKey=S name=btnSave11 type=button
					onClick="OnSubmit12()"><%=res.getLocaleMsg("UI.COMMON.041","连接数据库,并执行自定义SQL")%></BUTTON>
				</td>
			</tr>
		</TBODY>
	</TABLE>

	<hr>
	<TABLE class=Form>
		<COLGROUP>
			<COL width="20%">
			<COL width="80%">
		</COLGROUP>
		<TBODY>
			<TR class=Separator>
				<TD class=sep1 colSpan=2 align="center">JNDI<BR>
				<HR>
				</TD>
			</TR>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.042","JNDI类型")%></td>
				<td class=Field><select name=jndiType>
					<option value="1" selected>&nbsp;Websphere,Weblogic&nbsp;</option>
					<option value="2">&nbsp;Tomcat&nbsp;</option>
				</select></td>
			</tr>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.043","JNDI名称")%></td>
				<td class=Field><input accesskey=Z name=jndiName maxlength="20"
					value=""></td>
			</tr>
			<tr>
				<td><%=res.getLocaleMsg("UI.COMMON.034","使用JNDI连接")%></td>
				<td class=Field>
				<BUTTON class=btn id=btnSave2 accessKey=S name=btnSave2 type=button
					onClick="OnSubmit21()"><%=res.getLocaleMsg("UI.COMMON.040","开始创建初始化数据")%></BUTTON>
				&nbsp;&nbsp;
	
				<BUTTON class=btn id=btnSave22 accessKey=S name=btnSave22 type=button
					onClick="OnSubmit22()"><%=res.getLocaleMsg("UI.COMMON.041","连接数据库,并执行自定义SQL")%></BUTTON>
				</td>
			</tr>
		</TBODY>
	</TABLE>
</FORM>

<div><font color=red size=2> </font></div>
<HR>

<HR>
<script language="javascript">
	function check(){
		var dbserver= document.frmMain.dbserver.value;
	
		if(dbserver==""){
			alert('<%=res.getLocaleMsg("UI.COMMON.058","请输入数据库服务器IP!")%>');
			return false;
		}
			
		var username= document.frmMain.username.value;
		
		if(username==""){
			alert('<%=res.getLocaleMsg("UI.COMMON.059","请输入用户名!")%>');
			return false;
		}
		var dbname= document.frmMain.dbname.value;
		if(dbname==""){
			alert('<%=res.getLocaleMsg("UI.COMMON.060","请输入数据库名!")%>');
			return false;
		}
		
		var dbtype= document.frmMain.dbtype;
		if(dbtype.value=="jndi"){	
			alert('<%=res.getLocaleMsg("UI.COMMON.061","使用JNDI，请填写下面的JNDI名称信息，并点击下面\"开始创建\"按钮")%>');
			dbtype.select();
			dbtype.focus();
			return false;
		}
		return true;
	}
	
	function check2(){
		var jndiName= document.frmMain.jndiName.value;
		
		if(jndiName==""){
			alert('<%=res.getLocaleMsg("UI.COMMON.062","请输入JNDI名称!")%>');
			return false;
		}
		 return true;
	}
	function diableButton(){
		document.frmMain.btnSave1.disabled = true;
		document.frmMain.btnSave11.disabled = true;
		document.frmMain.btnSave2.disabled = true;
		document.frmMain.btnSave22.disabled = true;
		document.frmMain.btnSave3.disabled = true;
		document.frmMain.btnSave33.disabled = true;
	}
	
	function OnSubmit11(){
		if(!check()) 
			return;
	    diableButton();
		document.frmMain.submit();
	}
	
	function OnSubmit21(){
		if(!check2()) return;
		var dbtype=document.frmMain.dbtype;		
		dbtype.value="jndi";
		diableButton();
		document.frmMain.submit();
	}
	
	function OnSubmit31(){	
		var dbtype=document.frmMain.dbtype;	
		dbtype.value="dataSource";			
		diableButton();
		document.frmMain.submit();
	}
	function OnSubmit12(){
		if(!check()) return;
		document.frmMain.action="loadsql.jsp";
	    diableButton();
		document.frmMain.submit();
	}
	
	function OnSubmit22(){
		if(!check2()) return;
		var dbtype=document.frmMain.dbtype;
		document.frmMain.action="loadsql.jsp";		
		dbtype.value="jndi";
		diableButton();
		document.frmMain.submit();
	}
	function OnSubmit32(){	
		var dbtype=document.frmMain.dbtype;		
		document.frmMain.action="loadsql.jsp";
		dbtype.value="dataSource";
		diableButton();
		document.frmMain.submit();
	}
</script>
</body>
</html>
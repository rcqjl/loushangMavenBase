<%@ page contentType="text/html; charset=UTF-8" language="java" isThreadSafe="true" %>
<%@ page import="javax.naming.*,java.util.*,java.sql.*,javax.sql.*,java.io.*,org.apache.commons.fileupload.*,org.apache.commons.fileupload.disk.*,org.apache.commons.fileupload.servlet.*,org.loushang.next.i18n.*"%>
<%@ page import="org.loushang.next.i18n.ResourceBundle" %>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%
ResourceBundle res = ResourceBundle.getPackageBundle("ui.common");
%>
<%! 
	public String null2String(String s) {
		return s != null ? s : "";
	}
	//该方法得到当前查询ＳＱＬ的表名
	public static String getTableName(String sql){
			String tableName=null;
			String SQL2=sql.toUpperCase();
			//System.out.println("sql="+SQL2);
			int from=SQL2.indexOf("FROM")+4;
			int where=SQL2.indexOf("WHERE");
			if(where>-1)
			tableName=sql.substring(from,where);
			else
				tableName=sql.substring(from);
			//System.out.println("tableName="+tableName);
	    	if(tableName.endsWith(";")) {
	    	    tableName = tableName.substring(0,tableName.length() - 1);
	    	}
			return tableName;
	}
	public static String excuteFile(File file, String linepara, Statement stmt,
			org.loushang.next.i18n.ResourceBundle res) {
		if (!file.isFile())
			return res.getLocaleMsg("UI.COMMON.068","当前URL不是指向一个文件") + file;
		BufferedReader is = null;
		StringBuffer message = new StringBuffer();
		message.append("<BR><font color=blue>" + res.getLocaleMsg("UI.COMMON.069","读取文件") + file.getName() + "</font>");
		try {
			is = new BufferedReader(new InputStreamReader(new FileInputStream(
					file), "UTF-8"));
			String readline = "";
			StringBuffer sqlstr = new StringBuffer();
			int i = 0;
			while ((readline = is.readLine()) != null) {
				readline = readline.trim();

				if (readline.startsWith("--")
						|| readline.equalsIgnoreCase("COMMIT;"))
					continue;
				sqlstr.append(" " + readline);
			
				if (readline.endsWith(linepara)) {
					try {						
						sqlstr.append(linepara);
						
						stmt.executeUpdate(sqlstr.toString().replaceAll(
								linepara + linepara, ""));						
						i++;						
					} catch (SQLException e) {
						message.append("<br><font color=red>"
								+ res.getLocaleMsg("UI.COMMON.070","执行SQL出错：")
								+ sqlstr.toString().replaceAll(
										linepara + linepara, "")
								+ "</font><br>"
								+ res.getLocaleMsg("UI.COMMON.071","错误异常信息：") + e);

					}
					sqlstr = new StringBuffer();
				}
				
			}
			//添加对文件中；的校验
			if(i==0){
				message.append("<BR><font color=red>"+ res.getLocaleMsg("UI.COMMON.100","文件中的SQL未全部执行成功，")
						+ res.getLocaleMsg("UI.COMMON.085","请确认每条SQL语句必须以\";\"结尾!")  + "</font>");
			}
			is.close();
			is = null;
			message.append("<BR><font color=blue>"
					+ res.getLocaleMsg("UI.COMMON.072","完毕。执行成功的ＳＱＬ语句有：") + i
					+ res.getLocaleMsg("UI.COMMON.073","条") + "</font>");
			File fileDir = file.getParentFile();
			if(file.delete()) {
				fileDir.delete();			
			}
		} catch (FileNotFoundException e) {
			message.append("<br><font color=red>"+res.getLocaleMsg("UI.COMMON.084","文件") + file
					+ res.getLocaleMsg("UI.COMMON.074","未找到：") + e);
			e.printStackTrace();
		} catch (IOException e) {
			message.append("<br><font color=red>"
					+ res.getLocaleMsg("UI.COMMON.069","读取文件") + file
					+ res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		} finally {
			if (is != null)
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			is = null;
		}
		return message.toString();
	}
	public boolean haveSemicolon(String sql) {
		boolean semicolon = false;
		int singleQuote = 0;
		boolean end = true;
		char[] sqlChar = sql.toCharArray();
		for(int i=0; i<sqlChar.length; i++) {
			if('\'' == sqlChar[i]) {
				singleQuote += 1;
				if((singleQuote%2) == 0) {
					end = true;
				} else {
					end = false;
				}
			} else if(';' == sqlChar[i]){
				if(end) {
					semicolon = false;
				} else {
					semicolon = true;
					break;
				}
			}
		}
		return semicolon;
	}
%>

<%
	String dbserver = null2String(request.getParameter("dbserver"));
	String dbname = null2String(request.getParameter("dbname"));
	String username = null2String(request.getParameter("username"));
	String password = null2String(request.getParameter("password"));
	String dbtype = null2String(request.getParameter("dbtype"));
	String jndiType = null2String(request.getParameter("jndiType"));
	String jndiName = null2String(request.getParameter("jndiName"));
	String jndiNameTmp=jndiName;
	String url = "";
	String forname = "";
	StringBuffer message = new StringBuffer();

	Connection conn = null;
	Statement stmt = null;
	ResultSet set = null;
	out.println("<BR>"+res.getLocaleMsg("UI.COMMON.086","连接数据库")+"<BR>");
	response.flushBuffer();
	
	if (dbtype.equals(""))
		dbtype = "dataSource";
	if (dbtype.equals("dataSource")) {
		try {// 取默认的数据源对象
			out.println("<BR>"+res.getLocaleMsg("UI.COMMON.027","使用配置文件中的数据源连接数据库"));
			DataSource dataSource = org.loushang.persistent.jdbc.datasource.DataSourceFactory.defaultFactory
			.getDataSource("dataSource");
			conn = dataSource.getConnection();
	
		} catch (Exception f) {
			message.append(res.getLocaleMsg("UI.COMMON.063","获取默认的数据源连接dataSource错误：") + f);
		}
	} else if (dbtype.equals("jndi")) {
		if (jndiType.equals("2"))
			jndiName = "java:comp/env/" + jndiName;
		out.println("<BR>"+res.getLocaleMsg("UI.COMMON.075","连接类型：使用JNDI，")+"jndiName=" + jndiName);
		try {
			Context ctx = new InitialContext(); // 访问jndi根目录
			DataSource ds = (DataSource) ctx.lookup(jndiName);
			conn = ds.getConnection();
			// path="";
		} catch (NamingException e1) {
	
			message.append("<BR>"+res.getLocaleMsg("UI.COMMON.064","出错了：") + e1);
			e1.printStackTrace();
			// throw new RuntimeException(e1);
	
		} catch (SQLException e1) {	
			message.append("<BR>"+res.getLocaleMsg("UI.COMMON.064","出错了：") + e1);
			e1.printStackTrace();
		}
	} else {
		if (dbtype.equals("1")) {
			url = "jdbc:microsoft:sqlserver://" + dbserver
					+ ":1433;DatabaseName=" + dbname;
			forname = "com.microsoft.jdbc.sqlserver.SQLServerDriver";
	
		} else if (dbtype.equals("2")) {
			url = "jdbc:oracle:thin:@" + dbserver + ":1521:" + dbname;
			forname = "oracle.jdbc.OracleDriver";
		} else if (dbtype.equals("4")) {
			url = "jdbc:db2://" + dbserver + ":50000/" + dbname;
			// forname = "COM.ibm.db2.jdbc.net.DB2Driver";
			forname = "com.ibm.db2.jcc.DB2Driver";
		} else if (dbtype.equals("3")) {
			url = "jdbc:db2:" + dbname;
			forname = "COM.ibm.db2.jdbc.app.DB2Driver";
		}else if(dbtype.equals("5")){
			url = "jdbc:mysql://" + dbserver+":3306/"+dbname+"?useUnicode=true&characterEncoding=utf-8";
			forname = "org.gjt.mm.mysql.Driver";
		}
		try {
			out.println("<BR>"+res.getLocaleMsg("UI.COMMON.076","连接类型：直接连接，")+"url=" + url);
			Driver driver = (Driver) Class.forName(forname).newInstance();
			DriverManager.registerDriver(driver);
			Properties props = new Properties();
			props.put("user", username);
			props.put("password", password);
			props.put("CHARSET", "UTF-8");
			conn = DriverManager.getConnection(url, props);
		} catch (InstantiationException e) {
			message.append("<BR>"+res.getLocaleMsg("UI.COMMON.065","可能原因：数据库驱动程序不正确：") + e);
			e.printStackTrace();
			
		} catch (IllegalAccessException e) {
		
			message.append("<BR>"+res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			
			message.append("<BR>"+res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		} catch (SQLException e) {			
			message.append("<BR>"+res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		}
	
	}
	if (!message.toString().equals("")) {
		out.println("<BR>"+res.getLocaleMsg("UI.COMMON.066","数据库连接失败！")+"<BR>");	
		message.append("<br><A HREF=\"datamain.jsp\">"+res.getLocaleMsg("UI.COMMON.067","返回")+"</A>");
		out.println(message);
		try {
			if (conn != null)
				conn.close();
		} catch (java.sql.SQLException se) {
		}
		conn = null;
		return;
	}
	String isQuery = null2String(request.getParameter("isQuery")).trim();
	String sql = null2String(request.getParameter("sql")).trim();
	sql=new String(sql.getBytes("iso-8859-1"),"UTF-8");
	String sqlfile = null2String(request.getParameter("sqlfile")).trim();
	sqlfile=new String(sqlfile.getBytes("iso-8859-1"),"UTF-8");
%>

<html>
<style>
	td
	{
		font-size:10pt;
		border:1 solid #5b99c8;
	}
	th
	{
		font-size:12pt;
		background-color:#8fcae9;
		border:1 solid #5b99c8;
	}
</style>
<head>
<title><%=res.getLocaleMsg("UI.COMMON.087","定义SQL执行") %></title>
</head>
<script language="javascript">
	function check(){
		var sql=document.form1.sql.value;
		if(sql==""){
			alert('<%=res.getLocaleMsg("UI.COMMON.088","请输入自定义SQL语句,必须以\";\"结尾。")%>');
			return false;
			}
		return true;
	}
	
	function query(){
		if(!check())
			return;
		var sql=document.form1.sql.value;
		var indexNo = parseInt(sql.indexOf(";"));
		var lastNo = parseInt(sql.lastIndexOf(";"));	
		if(indexNo != -1) {
			if(indexNo != lastNo) {
				alert('<%=res.getLocaleMsg("UI.COMMON.089","请确认输入的SQL语句，只能执行一条")%>');
				return;
			}
		} else {
			alert('<%=res.getLocaleMsg("UI.COMMON.085","请确认每条SQL语句必须以\";\"结尾!")%>');
			return;
		}
		var sqls = sql.split(";");
		if(sqls.length > 1 && sqls[1].length!=0) {
			alert('<%=res.getLocaleMsg("UI.COMMON.089","请确认输入的SQL语句，只能执行一条")%>');
			return;
		}	
				
		var isQuery=document.form1.isQuery;		
		isQuery.value="query";
		document.form1.action="loadsql.jsp";		
		document.form1.submit();
	}
	
	function update(){
		if(!check())
			return;
		var sql=document.form1.sql.value;
		var indexNo = parseInt(sql.indexOf(";"));
		if(indexNo == -1) {
			alert('<%=res.getLocaleMsg("UI.COMMON.085","请确认每条SQL语句必须以\";\"结尾!")%>');
			return;
		}
		
		var isQuery=document.form1.isQuery;		
		isQuery.value="update";
		document.form1.action="loadsql.jsp";		
		document.form1.submit();
	}
	
	function createInsertSql(){
		if(!check())
			return;
		var isQuery=document.form1.isQuery;		
		isQuery.value="createInsertSql";
		document.form1.action="loadsql.jsp";		
		document.form1.submit();
	}
	
	function getInsertSqlFile(){
		if(!check())
			return;
		var sql=document.form1.sql.value;
		var sqls = sql.split(";");
		if(sqls.length > 1 && sqls[1].length!=0) {
			alert('<%=res.getLocaleMsg("UI.COMMON.089","请确认输入的SQL语句，只能执行一条")%>');
			return;
		}	
		document.form1.action="downSql.jsp";
		document.form1.submit();
	}
	function executeSqlFile(){
		var sqlFile=document.getElementById("sqlfile").value;
		var fileType = sqlFile.substring(sqlFile.length-4, sqlFile.length);		if(sqlFile==""){
			alert('<%=res.getLocaleMsg("UI.COMMON.090","SQL文件所在路径为空")%>');
			return false;
		}
		if(fileType!=".sql" && fileType!=".SQL") {
			alert('<%=res.getLocaleMsg("UI.COMMON.091","此文件不是SQL文件")%>');
			return false;
		}
		document.form2.action="loadsql.jsp?sqlfile="+sqlFile;
		document.form2.submit();
	}
</script>
<body topmargin="10px">

<p align="center"><%=res.getLocaleMsg("UI.COMMON.087","定义SQL执行") %></p>
<hr>
<form action="loadsql.jsp"  name=form1 method=post>
	<INPUT TYPE="hidden" name="dbserver" value="<%=dbserver%>">
	<INPUT TYPE="hidden" name="dbname" value="<%=dbname%>">
	<INPUT TYPE="hidden" name="username" value="<%=username%>">
	<INPUT TYPE="hidden" name="password" value="<%=password%>">
	<INPUT TYPE="hidden" name="dbtype" value="<%=dbtype%>">
	<INPUT TYPE="hidden" name="jndiType" value="<%=jndiType%>">
	<INPUT TYPE="hidden" name="jndiName" value="<%=jndiNameTmp%>">
	<INPUT TYPE="hidden" name="isQuery" value="">
<table cellpadding=2 cellspacing=0 border=0>
	<tr>
	<td style="border:0"><%=res.getLocaleMsg("UI.COMMON.079","数据库连接成功！") %></td>
	<td style="border:0"><A HREF="datamain.jsp"><%=res.getLocaleMsg("UI.COMMON.092","重新连接新的数据库") %></A></td>
	</tr>	
	<tr>
	<td style="border:0"><p><%=res.getLocaleMsg("UI.COMMON.088","请输入自定义SQL语句,必须以\";\"结尾。") %></p></td>
	<td style="border:0"><textarea rows="8" name="sql" cols="89" ><%=sql%></textarea></td>
	<td style="border:0">
	<BUTTON class=btn id=btnSave1 accessKey=S name=btnSave1 type=button  onClick="query()"><%=res.getLocaleMsg("UI.COMMON.093","执行查询") %></BUTTON>
	<BR>
	<BUTTON class=btn id=btnSave2 accessKey=S name=btnSave2 type=button  onClick="update()"><%=res.getLocaleMsg("UI.COMMON.094","执行更新") %></BUTTON>
	<BR>
	<BUTTON class=btn id=btnSave3 accessKey=S name=btnSave3 type=button  onClick="createInsertSql()"><%=res.getLocaleMsg("UI.COMMON.095","生成插入SQL") %></BUTTON>
	<BUTTON class=btn id=btnSave4 accessKey=S name=btnSave4 type=button  onClick="getInsertSqlFile()"><%=res.getLocaleMsg("UI.COMMON.096","生成SQL文件") %></BUTTON>
	</tr>
</table>
</form>
<form action="loadsql.jsp"  name=form2 method=post enctype="multipart/form-data">
	<table cellpadding=2 cellspacing=0 border=0>
		<tr>
		      <td style="border:0"><%=res.getLocaleMsg("UI.COMMON.097","选择要执行的文件：") %></td>
		      <td style="border:0">
		        <input type="file" name="sqlfile" id="sqlfile" size="100" value="" />
		      </td>
		      <td style="border:0">
		        <input type="button" class=btn accessKey=S name="btnSave5" value="<%=res.getLocaleMsg("UI.COMMON.098","批量执行SQL文件") %>" onclick="executeSqlFile()">
			  </td>
		</tr>
	</table>
	<input type="hidden" id="fileName"></input>
</form>
<hr>
<div align="center">
<%
	ResultSetMetaData rm = null;
	// 结果集的列数（字段数）
	int col_number = 0;
	// 每一列的宽度
	int[] col_widths = null;
	// 总宽度
	int sum_w = 0;
	
	try {
		stmt = conn.createStatement();
		//执行批量sql文件
		if(sqlfile!=null && sqlfile!="") {
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			String linepara = ";";
			try {	
				List items = upload.parseRequest(request);
				if(items!=null && items.size()!=0) {
					FileItem item = (FileItem) items.get(0);
					String fileName = item.getName();
					if (!item.isFormField() && fileName!=null && !fileName.equals("")) {
						File fileDir = new File(request.getRealPath("/") + "uploadsqlfile");
						if(fileDir.exists()) {
							File[] files = fileDir.listFiles();
							for(int i=0; i<files.length; i++) {
								files[i].delete();
							}
							fileDir.delete();
						}
						if(fileDir.mkdir()) {
							File tempFile = new File(item.getName());
							File file = new File(request.getRealPath("/") + "uploadsqlfile",
									tempFile.getName());
							item.write(file);
							String result = excuteFile(file, linepara, stmt, res);
							message.append(result);
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//执行textarea中sql语句
		if (sql.equals(""))
			return;
		if(isQuery.equals("update")){
			int execCount = 0;
			//如果单条sql语句中没有";"
			if(!haveSemicolon(sql)) {
				String[] sqls = sql.split(";");
				for(int i=0; i<sqls.length; i++) {
					execCount += stmt.executeUpdate(sqls[i]);
				}
			} else {
				int singleQuote = 0;
				boolean end = true;
				int semicolonPos = 0;
				List sqls = new ArrayList();
				char[] sqlChar = sql.toCharArray();
				for(int i=0; i<sqlChar.length; i++) {
					if('\'' == sqlChar[i]) {
						singleQuote += 1;
						if((singleQuote%2) == 0) {
							end = true;
						} else {
							end = false;
						}
					} else if(';' == sqlChar[i]){
						if(end) {
							StringBuffer sqlsb = new StringBuffer();
							if(semicolonPos == 0)
								sqlsb.append(sql.substring(0, i));
							else
								sqlsb.append(sql.substring(semicolonPos+1, i));	
							semicolonPos = i;
							sqls.add(sqlsb.toString());
						} 
					}
				}
				for(int i=0; i<sqls.size(); i++) {
					execCount += stmt.executeUpdate((String)sqls.get(i));
				}
			}
			message.append(res.getLocaleMsg("UI.COMMON.099","执行成功!影响记录行数为:")).append(execCount);
			return;
		}
		
		//"；"的判断
		int indexNo = sql.indexOf(";");
		int lastNo = sql.lastIndexOf(";");
		if(indexNo != -1) {
			if(indexNo == lastNo) {
				sql = sql.substring(0, indexNo);
			} else {
				message.append(res.getLocaleMsg("UI.COMMON.089","请确认输入的SQL语句，只能执行一条"));
				return;
			}
		} else {
			message.append(res.getLocaleMsg("UI.COMMON.085","请确认每条SQL语句必须以\";\"结尾!"));
			return;
		}
		
		set = stmt.executeQuery(sql);
		rm = set.getMetaData();
		col_number = rm.getColumnCount();
	
		if(isQuery.equals("createInsertSql")){//如果是产生插入语句的话
				out.println("<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse;border:1 solid #5b99c8;\" cellpadding=2 cellspacing=0  id=\"AutoNumber1\" width=\"90%\">");
				String tableName = getTableName(sql);
				//out.println("tableName=" + tableName);
				
				StringBuffer insertInit = new StringBuffer();
				insertInit.append("INSERT INTO " + tableName + " (");
				for (int i = 1; i <= col_number-1; i++) {
					insertInit.append(rm.getColumnName(i) + ", ");
				}
				insertInit.append(rm.getColumnName(col_number) + " ) VALUES ( ");
				int buffer = 1;
				while (set.next()) {
					out.println("<TR>");
					out.println("<Td>");
					
					StringBuffer insertSql = new StringBuffer();
					insertSql.append(insertInit);
					for (int i = 1; i <= col_number - 1; i++) {
						int type = rm.getColumnType(i);
						String col=set.getString(i);
						if(col == null) {
							insertSql.append(null + ", ");
						} else {
	    					if (type == Types.BIGINT || type == Types.DECIMAL
	    							|| type == Types.DOUBLE || type == Types.FLOAT
	    							|| type == Types.INTEGER || type == Types.NUMERIC
	    							|| type == Types.SMALLINT) {
	    						insertSql.append(col + ", ");
	    					} else {
	    						insertSql.append("'" + col + "', ");
	    					}
						}
					}
					
					/*
					int type = rm.getColumnType(col_number);
					if (type == Types.BIGINT || type == Types.DECIMAL
							|| type == Types.DOUBLE || type == Types.FLOAT
							|| type == Types.INTEGER || type == Types.NUMERIC
							|| type == Types.SMALLINT) {
						insertSql.append(set.getString(col_number) + " );");
					} else {
						insertSql.append("'" + set.getString(col_number) + "' );");
					}
					*/
					
					int type = rm.getColumnType(col_number);
					String col=set.getString(col_number);
					if(col == null) {
						insertSql.append(null + " );");
					} else {
						if (type == Types.BIGINT || type == Types.DECIMAL
								|| type == Types.DOUBLE || type == Types.FLOAT
								|| type == Types.INTEGER || type == Types.NUMERIC
								|| type == Types.SMALLINT) {
							insertSql.append(col + " );");
						} else {
							insertSql.append("'" + col + "' );");
						}
					}
						
	
					out.println(insertSql);
					out.println("</td></tr>");
					buffer++;
					 if (buffer > 20){
						 buffer=buffer/20;
						 response.flushBuffer();
					 }
				}
		}else{
	
		col_widths = new int[col_number + 1];
		for (int i = 1; i <= col_number; i++) {
			col_widths[i] = rm.getColumnDisplaySize(i);					
			sum_w += col_widths[i];
		}
		
		out.println("<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse;border:1 solid #5b99c8;\" cellpadding=2 cellspacing=0  id=\"AutoNumber1\" width="
						+ sum_w + ">");
	
		out.println("<TR align=\"CENTER\">");
		out.println("<Th width=60>record number</th>");
		for (int i = 1; i <= col_number; i++)
			out.print("<th width=" + col_widths[i]+10 + ">"+ rm.getColumnName(i) + "</th> ");
		out.println("</TR>");
		int buffer=1;
		while (set.next()) {
			out.println("<TR align=\"CENTER\">");
			out.println("<Td width=60>"+buffer+"</td>");
			for (int i = 1; i <= col_number; i++)
				out.print("<td width=" + col_widths[i]+10 + ">"+ set.getString(i) + "</td> ");
			out.println("</TR>");
			buffer++;
			if(buffer>20)
				response.flushBuffer();
		}
		out.println("</table>");
		}
		
	} catch (SQLException e2) {
		message.append( "<br>"+res.getLocaleMsg("UI.COMMON.064","出错了：") + e2);
		
	} finally {
		if (set != null) {
			try {
				set.close();
			} catch (SQLException e) {
			}
			set = null;
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
			}
			stmt = null;
		}
		try {
			if (conn != null)
				conn.close();
		} catch (java.sql.SQLException se) {
		}
		conn = null;
	
	if( !message.toString().equals("") ){
%>
</div>
	<p><font color="#FF0000"> <%=message%></font></p>
</body>
</html>
<%
 }
}
%>
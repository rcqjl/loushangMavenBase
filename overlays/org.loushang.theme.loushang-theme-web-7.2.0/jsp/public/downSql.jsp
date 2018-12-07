<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.io.*,java.net.*"%>
<%@ page import="javax.naming.*,java.util.*,java.sql.*,javax.sql.*"%>
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

		int from=SQL2.indexOf("FROM")+4;
		int where=SQL2.indexOf("WHERE");
		if(where>-1)
		tableName=sql.substring(from,where);
		else
			tableName=sql.substring(from);

		return tableName;
	}

	public void Flush(ServletOutputStream output , String forout) throws IOException {
		byte[] todown = forout.getBytes();
		output.write(todown);
		output.flush();
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
	String jndiNameTmp = jndiName;
	String url = "";
	String forname = "";
	StringBuffer message = new StringBuffer();

	Connection conn = null;
	Statement stmt = null;
	ResultSet set = null;

	if (dbtype.equals(""))
		dbtype = "dataSource";
	if (dbtype.equals("dataSource")) {
		try {// 取默认的数据源对象

				DataSource dataSource = org.loushang.persistent.jdbc.datasource.DataSourceFactory.defaultFactory
				.getDataSource("dataSource");
				conn = dataSource.getConnection();

			} catch (Exception f) {
				message.append(res.getLocaleMsg("UI.COMMON.063","获取默认的数据源连接dataSource错误：") + f);
			}
		} else if (dbtype.equals("jndi")) {
			if (jndiType.equals("2"))
				jndiName = "java:comp/env/" + jndiName;

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
				// out.println("<BR>连接类型：直接连接，url=" + url);
				Driver driver = (Driver) Class.forName(forname).newInstance();
				DriverManager.registerDriver(driver);
				Properties props = new Properties();
				props.put("user", username);
				props.put("password", password);
				props.put("CHARSET", "ISO");
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
			message.append("<BR>"+res.getLocaleMsg("UI.COMMON.066","数据库连接失败！")+"<BR>");

			message.append("<br><A HREF=\"datamain.jsp\">"+res.getLocaleMsg("UI.COMMON.067","返回")+"</A>");

			// out.println(message);
			try {
				if (conn != null)
					conn.close();
			} catch (java.sql.SQLException se) {
			}
			conn = null;
			return ;
		}

		String sql = null2String(request.getParameter("sql")).trim();
		//删除sql语句中的最后一个分号
			if(sql.endsWith(";")){
			sql=sql.substring(0,sql.length()-1);
		}
		// System.out.println("---sql="+sql);
		ServletOutputStream output =null;
		try {
			ResultSetMetaData rm = null;
			// 结果集的列数（字段数)
			int col_number = 0;

			StringBuffer downsql = new StringBuffer();
			String tableName = getTableName(sql);
			String fileName = tableName + ".sql";
			// 下载文件名称
			request.setCharacterEncoding("GBK");
			// 定义下载的文件字符集,以及当前页面为下载页面
			response.setContentType("application/x-download; charset=GBK");
			// 设置报头信息,定义下载的文件的保存文件名为fileName
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ new String(fileName.getBytes(), "ISO-8859-1") + "\"");
			// 下载的输出流，注意需要从response对象中取得，这样才能使得用户能够得到对应的文件
			output = response.getOutputStream();
			try {
				if (sql.equals(""))
					return ;
				stmt = conn.createStatement();
				set = stmt.executeQuery(sql);
				rm = set.getMetaData();
				col_number = rm.getColumnCount();
				StringBuffer insertInit = new StringBuffer();

				insertInit.append("INSERT INTO " + tableName + "(");
				for (int i = 1; i <= col_number - 1; i++) {
					insertInit.append(rm.getColumnName(i) + ", ");
				}
				insertInit
						.append(rm.getColumnName(col_number) + " ) VALUES ( ");
				while (set.next()) {
					StringBuffer insertSql = new StringBuffer();
					insertSql.append(insertInit);
					for (int i = 1; i <= col_number - 1; i++) {
						int type = rm.getColumnType(i);
						String col = set.getString(i);
						if (col == null) {
							insertSql.append(null + ", ");
						} else {
							if (type == Types.BIGINT || type == Types.DECIMAL
									|| type == Types.DOUBLE
									|| type == Types.FLOAT
									|| type == Types.INTEGER
									|| type == Types.NUMERIC
									|| type == Types.SMALLINT) {
								insertSql.append(col + ", ");
							} else {
								insertSql.append("'" + col + "', ");
							}
						}
					}
					int type = rm.getColumnType(col_number);
					if (type == Types.BIGINT || type == Types.DECIMAL
							|| type == Types.DOUBLE || type == Types.FLOAT
							|| type == Types.INTEGER || type == Types.NUMERIC
							|| type == Types.SMALLINT) {
						insertSql.append(set.getString(col_number) + " );\n");
					} else {
						insertSql.append("'" + set.getString(col_number)
								+ "' );\n");
					}
					downsql.append(insertSql);
					if (downsql.length() > 1024) {
						Flush(output,downsql.toString());
						downsql=new StringBuffer();
					}

				}

			} catch (SQLException e2) {
				message.append("<br>"+res.getLocaleMsg("UI.COMMON.064","出错了：") + e2);

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

				if (!message.toString().equals("")) {
				//	response.setContentType("charset=GBK");
					System.out.println(message);
					return ;
				}
			}

			if(downsql.length()>0)
				Flush(output,downsql.toString());


		} catch (Exception e) {
			throw new RuntimeException(res.getLocaleMsg("UI.COMMON.064","出错了：")+ e);
		} finally {
			try {
				if(output!=null)
					output.close();
			} catch (Exception e1) {
				e1.printStackTrace();
			}

		}
	%>
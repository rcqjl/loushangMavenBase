<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page
	import="java.io.*,java.util.*,java.sql.*,javax.sql.*,javax.naming.*"%>
<%@ page import="org.loushang.next.i18n.ResourceBundle"%>
<%@ page import="org.loushang.next.i18n.LocaleHolder"%>
<%@ page import="org.loushang.next.utils.FileUtil"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource"%>
<%
ResourceBundle res = ResourceBundle.getPackageBundle("ui.common");
String language =LocaleHolder.getLocale().getLanguage();
%>
<html>
<head>
</head>
<body>

<%!public static String excuteFile(File file, String linepara, Statement stmt,
			org.loushang.next.i18n.ResourceBundle res) {
		if (!file.isFile())
			return res.getLocaleMsg("UI.COMMON.068","当前URL不是指向一个文件") + file;
		BufferedReader is = null;
		StringBuffer message = new StringBuffer();
		message.append("<BR>" + res.getLocaleMsg("UI.COMMON.069","读取文件") + file);
		try {
			is = new BufferedReader(new InputStreamReader(new FileInputStream(
					file), "UTF-8"));
			String readline = "";
			StringBuffer sqlstr = new StringBuffer();
			int i = 0;
			while ((readline = is.readLine()) != null) {
				readline = readline.trim();

				if (readline.startsWith("--")
						|| readline.equalsIgnoreCase("COMMIT;") || readline.startsWith("##"))
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
			is.close();
			is = null;
			message.append("<BR><font color=blue>"
					+ res.getLocaleMsg("UI.COMMON.072","完毕。执行成功的ＳＱＬ语句有：") + i
					+ res.getLocaleMsg("UI.COMMON.073","条") + "</font>");
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
	};


	public List findFile(File dir) {
		//out.println("<br>查看文件路径：" + dir + "下面的文件");
		if (dir == null || !dir.isDirectory())
			return new ArrayList();
		File files[] = queue(dir.listFiles());
		List list = new ArrayList();
		for (int i = 0; i < files.length; i++) {
			if (files[i].isFile())
				list.add(files[i]);
		}
		return list;
	}

	public List findDirectoy(File dir) {
		//out.println("<br>查看文件路径：" + dir + "下面的文件");
		if (dir == null || !dir.isDirectory())
			return new ArrayList();
		File files[] = queue(dir.listFiles());
		List list = new ArrayList();
		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory())
				list.add(files[i]);
		}
		return list;
	}

	public List findAllFile(File dir) {
		if (dir == null || !dir.isDirectory())
			return new ArrayList();
		List filelist = new ArrayList();
		filelist.addAll(findFile(dir));
		List directorylist = findDirectoy(dir);

		for (int i = 0; i < directorylist.size(); i++)
			filelist.addAll(findAllFile((File) directorylist.get(i)));

		return filelist;
	}

	public String null2String(String s) {
		return s != null ? s : "";
	}

	public static File[] queue(File fileList[]) {
		for (int i = 0; i < fileList.length; i++) {
			for (int j = i + 1; j < fileList.length; j++) {
				if (fileList[i].compareTo(fileList[j]) > 0) {
					File tmpfileList = fileList[i];
					fileList[i] = fileList[j];
					fileList[j] = tmpfileList;
				}
			}
		}
		return fileList;
	}
	public static List queueFile(List filelist) {
		List createTableFiles = new ArrayList();
		List initTableFiles = new ArrayList();
		
		for (int i = 0; i < filelist.size(); i++) {
			try {
				File sqlFile = (File) filelist.get(i);
				if (sqlFile.toString().indexOf("1_Create") != -1) {
					createTableFiles.add(sqlFile);
				} else {
					initTableFiles.add(sqlFile);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		for (int i = 0; i < initTableFiles.size(); i++) {
			try {
				File initSqlFile = (File) initTableFiles.get(i);
				createTableFiles.add(initSqlFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return createTableFiles;
	}
%>
<%
	response.setHeader("cache-control", "no-cache");
	response.setHeader("pragma", "no-cache");

	String dbserver = null2String(request.getParameter("dbserver"));
	String dbname = null2String(request.getParameter("dbname"));
	String username = null2String(request.getParameter("username"));
	String password = null2String(request.getParameter("password"));
	String dbtype = null2String(request.getParameter("dbtype"));
	String jndiType = null2String(request.getParameter("jndiType"));
	String jndiName = null2String(request.getParameter("jndiName"));
%>
<%
	String url = "";
	String forname = "";
	StringBuffer message = new StringBuffer();
	String path = FileUtil.getRealPath(getServletConfig().getServletContext(),
			"/sql");
	String linepara = ";";
	String sqlfile = "";

	Connection conn = null;
	Statement stmt = null;
	ResultSet set = null;

	response.flushBuffer();
	if (dbtype.equals(""))
		dbtype = "dataSource";
	if (dbtype.equals("dataSource")) {
		try {//取默认的数据源对象
			out.println("<BR>"
					+ res.getLocaleMsg("UI.COMMON.027","使用配置文件中的数据源连接数据库"));
			DataSource dataSource = org.loushang.persistent.jdbc.datasource.DataSourceFactory.defaultFactory
					.getDataSource("dataSource");
			conn = dataSource.getConnection();
		} catch (Exception f) {
			message.append(res
					.getLocaleMsg("UI.COMMON.063","获取默认的数据源连接dataSource错误：")
					+ f);
		}
	} else if (dbtype.equals("jndi")) {
		if (jndiType.equals("2"))
			jndiName = "java:comp/env/" + jndiName;
		out.println("<BR>" + res.getLocaleMsg("UI.COMMON.075","连接类型：使用JNDI，")
				+ "jndiName=" + jndiName);
		try {
			Context ctx = new InitialContext(); // 访问jndi根目录
			DataSource ds = (DataSource) ctx.lookup(jndiName);
			conn = ds.getConnection();			
		} catch (NamingException e1) {

			message.append("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e1);
			e1.printStackTrace();
			// throw new RuntimeException(e1);

		} catch (SQLException e1) {

			message.append("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e1);
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
			out.println("<BR>"
					+ res.getLocaleMsg("UI.COMMON.076","连接类型：直接连接，")
					+ "url=" + url);
			Driver driver = (Driver) Class.forName(forname)
					.newInstance();
			DriverManager.registerDriver(driver);
			Properties props = new Properties();
			props.put("user", username);
			props.put("password", password);
			props.put("CHARSET", "ISO");
			conn = DriverManager.getConnection(url, props);
		} catch (InstantiationException e) {
			message.append("<BR>" + res.getLocaleMsg("UI.COMMON.065","可能原因：数据库驱动程序不正确：")
					+ e);
			e.printStackTrace();
			//throw new RuntimeException("可能原因：数据库驱动程序不正确", e);
		} catch (IllegalAccessException e) {
			//out.println("<BR>出错了：" + e);
			message.append("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			//out.println("<BR>出错了：" + e);
			message.append("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		} catch (SQLException e) {
			//out.println("<BR>出错了：" + e);
			message.append("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		}

	}
	if (!message.toString().equals("")) {
		out.println("<BR>" + res.getLocaleMsg("UI.COMMON.066","数据库连接失败！")
				+ "<BR>");
		message.append("<BR><A HREF=\"../../\">"
				+ res.getLocaleMsg("UI.COMMON.077","进入系统") + "</A>");
		message.append("<br><A HREF=\"datamain.jsp\">"
				+ res.getLocaleMsg("UI.COMMON.067","返回") + "</A>");

		out.println(message);
		try {
			if (conn != null)
				conn.close();
		} catch (java.sql.SQLException se) {
		}
		conn = null;
		return;
	}

	String dbName = null;
	if(language.equals("zh")){
	try {
		if (conn != null) {
			DatabaseMetaData dbmd = conn.getMetaData();
			if (dbmd != null) {
				dbName = dbmd.getDatabaseProductName();
				out.println("<br>" + res.getLocaleMsg("UI.COMMON.078","数据库类型") + ":"
						+ dbName);
				if (dbName != null && dbName.startsWith("DB2/")) {
					path = FileUtil.getRealPath(getServletConfig().getServletContext(),
							"/sql/DB2");//DB2 
				} else if (dbName != null
						&& dbName.startsWith("Adaptive")) {
					path = FileUtil.getRealPath(getServletConfig().getServletContext(),
							"/sql/Sybase");//Sybase 
				} else if (dbName != null
						&& dbName.startsWith("Microsoft")) {
					path = FileUtil.getRealPath(getServletConfig().getServletContext(),
							"/sql/SqlServer");//Microsoft SQL Server
				} else if (dbName != null
						&& dbName.startsWith("Oracle")) {
					path = FileUtil.getRealPath(getServletConfig().getServletContext(),
							"/sql/Oracle");//Oracle
				}else if (dbName != null
						&& dbName.startsWith("MySQL")) {
					path = FileUtil.getRealPath(getServletConfig().getServletContext(),
							"/sql/MySQL");//MySql
				}
			}

		}

	} catch (SQLException e1) {
		e1.printStackTrace();
	}
	}else if(language.equals("en")){
		try {
			if (conn != null) {
				DatabaseMetaData dbmd = conn.getMetaData();
				if (dbmd != null) {
					dbName = dbmd.getDatabaseProductName();
					out.println("<br>" + res.getLocaleMsg("UI.COMMON.078","数据库类型") + ":"
							+ dbName);
					if (dbName != null && dbName.startsWith("DB2/")) {
						path = FileUtil.getRealPath(getServletConfig().getServletContext(),
								"/sql-en_US/DB2");//DB2 
					} else if (dbName != null
							&& dbName.startsWith("Adaptive")) {
						path = FileUtil.getRealPath(getServletConfig().getServletContext(),
								"/sql-en_US/Sybase");//Sybase 
					} else if (dbName != null
							&& dbName.startsWith("Microsoft")) {
						path = FileUtil.getRealPath(getServletConfig().getServletContext(),
								"/sql-en_US/SqlServer");//Microsoft SQL Server
					} else if (dbName != null
							&& dbName.startsWith("Oracle")) {
						path = FileUtil.getRealPath(getServletConfig().getServletContext(),
								"/sql-en_US/Oracle");//Oracle
					}else if (dbName != null
							&& dbName.startsWith("MySQL")) {
						path = FileUtil.getRealPath(getServletConfig().getServletContext(),
								"/sql-en_US/MySQL");//Oracle
					}
				}

			}

		} catch (SQLException e1) {
			e1.printStackTrace();
		}
	}

	out.println("<BR>" + res.getLocaleMsg("UI.COMMON.079","数据库连接成功！")
			+ "<BR>");
	out.println("<BR>" + res.getLocaleMsg("UI.COMMON.080","开始读取初始化数据文件！")
			+ "<BR>");
	File dir = null;
	String fileList[] = null;

	try {
		try {
			dir = new File(path);
			fileList = dir.list();
			if(language.equals("zh")){
			if (fileList == null) {
				dir = new File(FileUtil.getRealPath(getServletConfig().getServletContext(),
						"/sql"));
				fileList = dir.list();
			}
			}else if(language.equals("en")){
				if (fileList == null) {
					dir = new File(FileUtil.getRealPath(getServletConfig().getServletContext(),
							"/sql-en_US"));
					fileList = dir.list();
				}
			}
		} catch (Exception e) {
			out.println("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
			e.printStackTrace();
		}
		if (fileList == null) {
			out
					.println("<BR>"
							+ res
									.getLocaleMsg("UI.COMMON.081","出错了：找不到\\sql文件夹,系统绝对路径为：")
							+ path);
			out.println("<BR><A HREF=\"../../\">"
					+ res.getLocaleMsg("UI.COMMON.077","进入系统") + "</A>");
			out.println("<br><A HREF=\"datamain.jsp\">"
					+ res.getLocaleMsg("UI.COMMON.067","返回") + "</A>");
			return;
		}
		out.println("<br>" + res.getLocaleMsg("UI.COMMON.082","开始执行SQL！"));
		stmt = conn.createStatement();

		List filelist = findAllFile(dir);
		filelist = queueFile(filelist);
		for (int i = 0; i < filelist.size(); i++) {
			try {
				File sqlFile = (File) filelist.get(i);

				if (sqlFile.toString().endsWith(".sql")) {
					out
							.println(excuteFile(sqlFile, linepara,
									stmt, res));
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	} catch (SQLException e) {
		out.println("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
		e.printStackTrace();
	} catch (Exception e) {
		out.println("<BR>" + res.getLocaleMsg("UI.COMMON.064","出错了：") + e);
		e.printStackTrace();
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
	}	
%>
<%//=message%>
<br>
<br>
<%=res.getLocaleMsg("UI.COMMON.083","初始化完成！")%>
<br>
<A HREF="../../"><%=res.getLocaleMsg("UI.COMMON.077","进入系统")%></A>
<BR>
<A HREF="datamain.jsp"><%=res.getLocaleMsg("UI.COMMON.067","返回")%></A>

</body>
</html>

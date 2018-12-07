
INSERT INTO WF_PROPERTY_CONFIG(ID,PROPERTY_KEY,PROPERTY_VALUE,PROPERTY_DESCRIPTION) VALUES('propertyconfig123','DB_TYPE','2','MYSQL');

##默认生成一条记录
INSERT INTO  WF_SYS_SUBJECT_DEF(ID,SUBJECT_KEY,SUBJECT_ALIAS,SUBJECT_ORDER,SUBJECT_WIDTH,IS_QUERY_CONDITION)
VALUES('8a228bf229cbe1cc0129cbe1cc530001','default_sys_subject','Title',0,'150','1');

##流程插件定义
INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE)
	VALUES ('Default Jsp Form', 'wfd_jspform','jsp/workflow/infoprocessmodel/xpdl/JspFormFlowDesigner.html', 'org.loushang.workflow.infoprocessmodel.transform.xpdl.jspform.JspFormXmlParserAndLoader','0');

INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE)
	VALUES ('Business Primary Key Jsp Form', 'wfd_jspformwithpk','jsp/workflow/infoprocessmodel/xpdl/JspFormWithPKFlowDesigner.html', 'org.loushang.workflow.infoprocessmodel.transform.xpdl.jspformwithpk.JspFormWithPKXmlParserAndLoader','0');

INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE) 
	VALUES ('Custom Business Correlation', 'wfd_bizform','jsp/workflow/infoprocessmodel/xpdl/BizFormFlowDesigner.html', 'org.loushang.workflow.infoprocessmodel.transform.xpdl.bizform.BizFormXmlParserAndLoader','0');


INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE,ITEM_TYPE,JS_PATH,JS_OBJECT,FILE_PARSER)
	VALUES ('Custom form plugin', 'wfd_bizform_html','jsp/workflow/infoprocessmodel/bizform/wfdesigner.jsp?lineType=1', '','0','1','jsp/workflow/infoprocessmodel/bizform/wform.js','WFBizForm','org.loushang.workflow.infoprocessmodel.bizform.cmd.FormExchange');
INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE,ITEM_TYPE,JS_PATH,JS_OBJECT,FILE_PARSER)
	VALUES ('Default', 'wfd_form_html','jsp/workflow/infoprocessmodel/form/wfdesigner.jsp?lineType=1', '','0','1','jsp/workflow/infoprocessmodel/form/wform.js','WForm','org.loushang.workflow.infoprocessmodel.form.cmd.FormExchange');
##流程定义页面按钮
INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
    VALUES ('1_bpm_form', 'Default', 1,'Default add plugin', 'wfd_form_html', '1', '1');

INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
    VALUES ('2_bpm_bizform', 'Custom added', 2,'Custom added', 'wfd_bizform_html', '0', '0');

INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
    VALUES ('3_bpm_form_xpdl', 'Create Default JSP', 3,'Create Default JSP', 'wfd_jspform', '1', '0');

INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
    VALUES ('4_bpm_formpk_xpdl', 'Create Business Primary Key JSP', 4,'Create Business Primary Key JSP', 'wfd_jspformwithpk', '1', '0');

INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
    VALUES ('5_bpm_bizform_xpdl', 'Custom added 2', 5,'Custom added with xpdl', 'wfd_bizform', '1', '0');

##流程监控配置0：使用旧的概要、详细图模式（虚环节图标是圆角矩形）；1：使用新图（没有概要图，可能有泳道图，虚环节图标是菱形，名称为网关），默认为0
INSERT INTO WF_MONITOR_PROPERTY_CONFIG (ID,PROPERTY_KEY,PROPERTY_VALUE,PROPERTY_DESCRIPTION) 
	VALUES ('processMonitorViewerConfig','PROCESS_MONITOR_VIEWER_CONFIG','0','Use old summary and detailed map mode (virtual link icon is rounded rectangle)');

INSERT INTO WF_PART_URL_DEF(ID, NAME, DISPLAY_ORDER, IS_VISIBLE, PART_URL, PART_CATEGORY)
	VALUES ('unit','Organization',0,'1','jsp/workflow/infoprocessmodel/html/property/task/participantrule/commonly-unit.jsp','0');
INSERT INTO WF_PART_URL_DEF(ID, NAME, DISPLAY_ORDER, IS_VISIBLE, PART_URL, PART_CATEGORY)
	VALUES ('unitall','All members of the organization',1,'0','jsp/workflow/infoprocessmodel/html/property/task/participantrule/commonly-unitall.jsp','0');
INSERT INTO WF_PART_URL_DEF(ID, NAME, DISPLAY_ORDER, IS_VISIBLE, PART_URL, PART_CATEGORY)
	VALUES ('role','role',2,'1','jsp/workflow/infoprocessmodel/html/property/task/participantrule/commonly-role.jsp','0');
INSERT INTO WF_PART_URL_DEF(ID, NAME, DISPLAY_ORDER, IS_VISIBLE, PART_URL, PART_CATEGORY)
	VALUES ('organtype','Organization type',3,'0','jsp/workflow/infoprocessmodel/html/property/task/participantrule/commonly-type.jsp','0');
INSERT INTO WF_PART_URL_DEF(ID, NAME, DISPLAY_ORDER, IS_VISIBLE, PART_URL, PART_RULE, PART_CATEGORY)
	VALUES ('context','Context sensitive',4,'1','jsp/workflow/infoprocessmodel/html/property/task/participantrule/contextpart.jsp','08,18,19,21,25,31', '0');
    
##注册表单默认任务列表转向URL
INSERT INTO WF_TASK_LIST_FORWARD_URL(ID,APP_CODE,RELATIVE_PATH,FORWARD_TYPE,FORWARD_VALUE,IS_ENABLED) VALUES('jspformDefaultUrl','','jsp/workflow/tasklist/jspformforward.jsp','0','','0');

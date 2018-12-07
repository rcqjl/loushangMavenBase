--流程定义删除事件监听类定义
INSERT INTO WF_PROPERTY_CONFIG(ID,PROPERTY_KEY,PROPERTY_VALUE,PROPERTY_DESCRIPTION,PARSER_TYPE) 
	VALUES('CFormProcDefDelEvtListener','PROCESS_DEF_DELETE_EVENT','org.loushang.cform.procdef.event.ProcessDefDeleteEvent','ProcessDefDeleteEvent','0');

--流程实例删除事件监听类定义
INSERT INTO WF_PROPERTY_CONFIG(ID,PROPERTY_KEY,PROPERTY_VALUE,PROPERTY_DESCRIPTION,PARSER_TYPE) 
	VALUES('CFormProcDelEvtListener','PROCESS_DELETE_EVENT','org.loushang.cform.process.event.ProcessDeleteEvent','ProcessDeleteEvent','0');
	
--流程插件定义
INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE,ITEM_TYPE,JS_PATH,JS_OBJECT,FILE_PARSER)
	VALUES ('CForm', 'cfd_cform','jsp/cform/procdef/html/cfdesigner.jsp?hideBranch=1', '','0','1','jsp/cform/procdef/html/cfd.js','CFlow','org.loushang.cform.procdef.html.cmd.FormExchange');

--流程定义页面按钮定义
INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
	VALUES ('btn_cfd_cform', 'CFNew', 10,'CFNew', 'cfd_cform', '0', '1');

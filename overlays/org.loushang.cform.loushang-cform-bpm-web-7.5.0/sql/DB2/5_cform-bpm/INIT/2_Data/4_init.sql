--流程定义删除事件监听类定义
INSERT INTO WF_PROPERTY_CONFIG(ID,PROPERTY_KEY,PROPERTY_VALUE,PROPERTY_DESCRIPTION,PARSER_TYPE) 
	VALUES('CFormProcDefDelEvtListener','PROCESS_DEF_DELETE_EVENT','org.loushang.cform.procdef.event.ProcessDefDeleteEvent','云表单流程定义删除事件监听类','0');

--流程插件定义
INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE)
	VALUES ('云表单(xpdl)', 'wfd_cform','jsp/cform/procdef/CFormFlowDesigner.html', 'org.loushang.cform.procdef.xpdl.common.CommonXmlParserAndLoaderImpl','0');

--流程定义页面按钮定义
INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
	VALUES ('cformId', '云表单新增(xpdl)', 8,'云表单新增(xpdl)', 'wfd_cform', '0', '0');

--云表单默认任务列表转向URL
INSERT INTO CF_TASK_LIST_FORWARD_URL(ID,APP_CODE,RELATIVE_PATH,FORWARD_TYPE,FORWARD_VALUE,TASK_TYPE) VALUES('cformDefaultUrl','','jsp/cform/tasklist/formforward.jsp','0','','-1');

--云表单默认操作类别
INSERT INTO CF_BTN_TYPE(ID,NAME,DESCRIPTION,IS_DISPLAY,DISPLAY_ORDER) VALUES('cfBtnType','系统默认','系统默认操作类别','1',0);

--本地操作初始化
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_createBtn','创建流程','cfBtnType','create()',0,'cf_createBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_createAndSendBtn','创建并发送','cfBtnType','createAndSend()',1,'cf_createAndSendBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_createAndSelectAndSendBtn','创建并选择发送','cfBtnType','createAndSelectAndSend()',2,'cf_createAndSelectAndSendBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_sendBtn','发送流程','cfBtnType','send()',3,'cf_sendBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_jumpSendBtn','跳转发送','cfBtnType','jumpSend()',4,'cf_jumpSendBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_selectAndSendBtn','选择发送','cfBtnType','selectAndSend()',5,'cf_selectAndSendBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_backBtn','回退流程','cfBtnType','back()',6,'cf_backBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_jumpBackBtn','跳转退回','cfBtnType','jumpBack()',7,'cf_jumpBackBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_revokeBtn','撤回流程','cfBtnType','revoke()',8,'cf_revokeBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_suspendBtn','挂起流程','cfBtnType','suspend()',9,'cf_suspendBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_resumeBtn','恢复流程','cfBtnType','resume()',10,'cf_resumeBtn');
INSERT INTO CF_BTN (ACTION_ID,ACTION_NAME,ACTION_TYPE,FUNCTION_NAME,DISPLAY_ORDER,CLASS_NAME) VALUES ('cf_terminateBtn','终止流程','cfBtnType','terminate()',11,'cf_terminateBtn');

--流程实例删除事件监听类定义
INSERT INTO WF_PROPERTY_CONFIG(ID,PROPERTY_KEY,PROPERTY_VALUE,PROPERTY_DESCRIPTION,PARSER_TYPE) 
	VALUES('CFormProcDelEvtListener','PROCESS_DELETE_EVENT','org.loushang.cform.process.event.ProcessDeleteEvent','云表单流程实例删除事件监听类','0');
--流程插件定义

INSERT INTO WF_INFO_PROC_PLUGIN_DEF (PLUGIN_NAME, PLUGIN_TYPE, PLUGIN_PATH, XML_PARSER, PARSER_TYPE,ITEM_TYPE,JS_PATH,JS_OBJECT,FILE_PARSER)
	VALUES ('云表单', 'cfd_cform','jsp/cform/procdef/html/cfdesigner.jsp?hideBranch=1', '','0','1','jsp/cform/procdef/html/cfd.js','CFlow','org.loushang.cform.procdef.html.cmd.FormExchange');

--流程定义页面按钮定义
INSERT INTO WF_INFO_PROC_PAGE_BUTTON_DEF (ID, DISPLAY_NAME, DISPLAY_ORDER, DESCRIPTION, PLUGIN_TYPE, NEED_SET_PROC_TYPE, IS_VISIBLE)
	VALUES ('btn_cfd_cform', '云表单新增', 10,'云表单新增', 'cfd_cform', '0', '1');

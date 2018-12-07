CREATE TABLE DEMO_WF_TRAVEL
(
    ID VARCHAR (32) NOT NULL ,
    TRAVELLER VARCHAR (100) NOT NULL ,
    TRAVEL_DEST VARCHAR (100) NOT NULL ,
    TRAVEL_FEE VARCHAR (32) NOT NULL ,
    LEADER_APPROVE VARCHAR (100) ,
    FINANCE_APPROVE VARCHAR (100) 
);
ALTER TABLE DEMO_WF_TRAVEL ADD CONSTRAINT DemoWfTravelPk PRIMARY KEY (ID);

INSERT INTO WF_JSP_FORM_DEF(FORM_ID, FORM_NAME, APP_PATH, FORM_DESCRIPTION) 
    VALUES('wfDemoDpTravelloan','出差借款类申请','','出差借款类申请表');

INSERT INTO WF_JSP_FORM_FIELD_DEF(ID, FORM_ID, FIELD_ID, FIELD_NAME, FIELD_TYPE, FIELD_DESCRIPTION) 
    VALUES('1_traveller','wfDemoDpTravelloan','traveller','出差人','text','');
INSERT INTO WF_JSP_FORM_FIELD_DEF(ID, FORM_ID, FIELD_ID, FIELD_NAME, FIELD_TYPE, FIELD_DESCRIPTION) 
    VALUES('2_travelDest','wfDemoDpTravelloan','travelDest','出差目的地','text','');
INSERT INTO WF_JSP_FORM_FIELD_DEF(ID, FORM_ID, FIELD_ID, FIELD_NAME, FIELD_TYPE, FIELD_DESCRIPTION) 
    VALUES('3_travelFee','wfDemoDpTravelloan','travelFee','出差费用','text','');
INSERT INTO WF_JSP_FORM_FIELD_DEF(ID, FORM_ID, FIELD_ID, FIELD_NAME, FIELD_TYPE, FIELD_DESCRIPTION) 
    VALUES('4_leaderApprove','wfDemoDpTravelloan','leaderApprove','领导审批意见','text','');
INSERT INTO WF_JSP_FORM_FIELD_DEF(ID, FORM_ID, FIELD_ID, FIELD_NAME, FIELD_TYPE, FIELD_DESCRIPTION) 
    VALUES('5_financeApprove','wfDemoDpTravelloan','financeApprove','财务审批意见','text','');

INSERT INTO WF_JSP_FORM_ACTION_DEF(ID, FORM_ID, ACTION_ID, ACTION_NAME, ACTION_FUNCTION, ACTION_DESCRIPTION) 
    VALUES('1_save','wfDemoDpTravelloan','save','保存','save()','保存表单数据');
INSERT INTO WF_JSP_FORM_ACTION_DEF(ID, FORM_ID, ACTION_ID, ACTION_NAME, ACTION_FUNCTION, ACTION_DESCRIPTION) 
    VALUES('2_create','wfDemoDpTravelloan','create','创建流程','create()','保存表单数据，创建流程');
INSERT INTO WF_JSP_FORM_ACTION_DEF(ID, FORM_ID, ACTION_ID, ACTION_NAME, ACTION_FUNCTION, ACTION_DESCRIPTION) 
    VALUES('3_createAndSend','wfDemoDpTravelloan','createAndSend','创建并发送流程','createAndSend()','保存表单数据，创建流程并提交流程至下一环节');
INSERT INTO WF_JSP_FORM_ACTION_DEF(ID, FORM_ID, ACTION_ID, ACTION_NAME, ACTION_FUNCTION, ACTION_DESCRIPTION) 
    VALUES('4_send','wfDemoDpTravelloan','send','发送流程','send()','保存表单数据，提交流程至下一环节');
INSERT INTO WF_JSP_FORM_ACTION_DEF(ID, FORM_ID, ACTION_ID, ACTION_NAME, ACTION_FUNCTION, ACTION_DESCRIPTION) 
    VALUES('6_back','wfDemoDpTravelloan','back','退回流程','back()','保存表单数据，退回流程至前一环节');
INSERT INTO WF_JSP_FORM_ACTION_DEF(ID, FORM_ID, ACTION_ID, ACTION_NAME, ACTION_FUNCTION, ACTION_DESCRIPTION) 
    VALUES('8_revoke','wfDemoDpTravelloan','revoke','撤回流程','revoke()','从已办任务中撤回流程');

INSERT INTO WF_JSP_FORM_REQUEST_URL_DEF(ID, FORM_ID, URL_ID, URL_NAME, URL_VALUE) 
    VALUES('1_travel','wfDemoDpTravelloan','travel_url','借款申请表','jsp/demo/workflow/travel/travelloan.jsp');

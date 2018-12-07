CREATE TABLE WF_ACT_DEF_JSP_FORM(
	ID VARCHAR(32) NOT NULL,
	FORM_ID VARCHAR(32) NOT NULL,
	ACT_DEF_UNIQUE_ID VARCHAR(32) NOT NULL
);
ALTER TABLE WF_ACT_DEF_JSP_FORM ADD CONSTRAINT ACT_JSP_FORM_PK 
PRIMARY KEY(ID);

CREATE TABLE WF_JSP_FORM_DEF(
	FORM_ID VARCHAR(32) NOT NULL,
	FORM_NAME VARCHAR(100) NOT NULL,
	APP_PATH VARCHAR(100),
	FORM_DESCRIPTION VARCHAR(100),
	ORGAN_ID VARCHAR(32)
);
ALTER TABLE WF_JSP_FORM_DEF ADD CONSTRAINT JSP_FORM_PK PRIMARY 
KEY(FORM_ID);

CREATE TABLE WF_JSP_FORM_FIELD_DEF(
	ID VARCHAR(32) NOT NULL,
	FORM_ID VARCHAR(32) NOT NULL,
	FIELD_ID VARCHAR(32) NOT NULL,
	FIELD_NAME VARCHAR(100) NOT NULL,
	FIELD_TYPE VARCHAR(32) ,
	DEVICE_TYPE CHAR(1) DEFAULT '0',
	FIELD_DESCRIPTION VARCHAR(100) 
);

ALTER TABLE WF_JSP_FORM_FIELD_DEF ADD CONSTRAINT 
JSP_FORM_FLD_PK PRIMARY KEY(ID);


CREATE TABLE WF_JSP_FORM_REQUEST_URL_DEF(
	ID VARCHAR(32) NOT NULL,
	FORM_ID VARCHAR(32) NOT NULL,
	URL_ID VARCHAR(32),
	URL_NAME VARCHAR(100),
	URL_VALUE VARCHAR(100),
	PHONE_URL_VALUE VARCHAR(100),
	PAD_URL_VALUE VARCHAR(100)
);
ALTER TABLE WF_JSP_FORM_REQUEST_URL_DEF ADD CONSTRAINT 
JSP_FORM_URL_PK PRIMARY KEY(ID);

CREATE TABLE WF_JSP_FORM_ACTION_DEF(
	ID VARCHAR(32) NOT NULL,
	FORM_ID VARCHAR(32) NOT NULL,
	ACTION_ID VARCHAR(32) NOT NULL,
	ACTION_NAME VARCHAR(32) NOT NULL,
	ACTION_FUNCTION VARCHAR(32) ,
	DEVICE_TYPE CHAR(1) DEFAULT '0',
	ACTION_DESCRIPTION VARCHAR(100)
);
ALTER TABLE WF_JSP_FORM_ACTION_DEF ADD CONSTRAINT 
JSP_FORM_ACTION_PK PRIMARY KEY(ID);

##外键
ALTER TABLE WF_ACT_DEF_JSP_FORM ADD CONSTRAINT ACT_JSP_FORM_FK2 
FOREIGN KEY(ACT_DEF_UNIQUE_ID) REFERENCES WF_ACTIVITY_DEF(ID);
ALTER TABLE WF_JSP_FORM_REQUEST_URL_DEF ADD CONSTRAINT 
JSP_FORM_URL_FK1 FOREIGN KEY(FORM_ID) REFERENCES 
WF_JSP_FORM_DEF(FORM_ID);
ALTER TABLE WF_JSP_FORM_FIELD_DEF ADD CONSTRAINT 
JSP_FORM_FLD_FK1 FOREIGN KEY(FORM_ID) REFERENCES 
WF_JSP_FORM_DEF(FORM_ID);
ALTER TABLE WF_JSP_FORM_ACTION_DEF ADD CONSTRAINT 
JSPFORMACTIONFK1 FOREIGN KEY(FORM_ID) REFERENCES 
WF_JSP_FORM_DEF(FORM_ID);

##任务列表转向url
CREATE TABLE WF_TASK_LIST_FORWARD_URL
(
    ID VARCHAR (32) NOT NULL,
    APP_CODE VARCHAR(30) ,
    RELATIVE_PATH VARCHAR(512) NOT NULL,
    FORWARD_TYPE CHAR(1) NOT NULL,
    FORWARD_VALUE VARCHAR(32),
    IS_ENABLED CHAR(1) DEFAULT '1'
);
ALTER TABLE WF_TASK_LIST_FORWARD_URL
    ADD CONSTRAINT TASK_LIST_FORWARD_URL_PK 
PRIMARY KEY (ID);
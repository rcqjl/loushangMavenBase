-- for sybase
----------------------------业务流水号开始-------------------
-------数据
INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('ORGAN_ID', 1, '组织内码', 'O', '1', 20, '0', '', '1', '', '00', '');

INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('STRU_ID', 1, '结构内码', 'S', '1', 20, '0', '', '1', '', '00', '');

INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('STRU_EXT_ID', 1, '组织结构关系内码', '', '0', 20, '0', '', '1', '', '00', '');

INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('RULE_ID', 1, '规则内码', '', '0', 30, '0', '', '1', '', '00', '');

INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('ROLE_GROUP_ID', 1, '角色组内码', '', '0', 30, '0', '', '1', '', '00', '');

INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('MENU_ID', 1, '菜单内码', '', '0', 30, '0', '', '1', '', '00', '');

INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('MENU_STRU_ID', 1, '菜单结构内码', '', '0', 30, '0', '', '1', '', '00', '');

INSERT INTO PUB_IDTABLE (ID_ID, ID_VALUE, ID_NAME, ID_PREFIX, IS_PREFIX, ID_LENGTH, IS_SUFFIX, ID_SUFFIX, IS_GLOBAL, ORGAN_ID, ID_TYPE, ID_DATE)
VALUES ('MENU_TYPE_ID', 1, '菜单类型内码', '', '0', 10, '0', '', '1', '', '00', '');

----------------------------业务流水号结束-------------------


-----------------------------组织结构相关开始----------------------------------------

-------组织类型-------
INSERT INTO PUB_ORGAN_TYPE (ORGAN_TYPE, TYPE_NAME, PARENT_TYPE, IN_USE)
VALUES ('1', '单位', '1', '1');

INSERT INTO PUB_ORGAN_TYPE (ORGAN_TYPE, TYPE_NAME, PARENT_TYPE, IN_USE)
VALUES ('2', '部门', '2', '1');

INSERT INTO PUB_ORGAN_TYPE (ORGAN_TYPE, TYPE_NAME, PARENT_TYPE, IN_USE)
VALUES ('6', '岗位', '6', '1');

INSERT INTO PUB_ORGAN_TYPE (ORGAN_TYPE, TYPE_NAME, PARENT_TYPE, IN_USE)
VALUES ('8', '员工', '8', '1');

-----组织结构类型-------
INSERT INTO PUB_STRU_TYPE (STRU_TYPE, TYPE_NAME, ROOT_ID, IS_DEFAULT, NOTE, IN_USE)
VALUES ('00', '人力资源', '1', '1', '人力资源', '1');
INSERT INTO PUB_STRU_TYPE (STRU_TYPE, TYPE_NAME, ROOT_ID, IS_DEFAULT, NOTE, IN_USE)
VALUES ('01', '业务资源', '1', '0', '初始化的非人力资源组织视角，可以修改名称后使用。新增组织结构和规则通过表维护', '1');

------组织结构规则
INSERT INTO PUB_STRU_RULE VALUES ('00:1:1', '00', '1', '1', '单位下可以成立新的单位');
INSERT INTO PUB_STRU_RULE VALUES ('00:1:2', '00', '1', '2', '单位下可以成立新的部门');
INSERT INTO PUB_STRU_RULE VALUES ('00:1:8', '00', '1', '8', '单位下可以增加员工');
INSERT INTO PUB_STRU_RULE VALUES ('00:2:2', '00', '2', '2', '部门下可以成立新的部门');
INSERT INTO PUB_STRU_RULE VALUES ('00:2:8', '00', '2', '8', '部门下可以增加员工');
INSERT INTO PUB_STRU_RULE VALUES ('01:1:1', '01', '1', '1', '单位下可以成立新的单位');
INSERT INTO PUB_STRU_RULE VALUES ('01:1:2', '01', '1', '2', '单位下可以成立新的部门');
INSERT INTO PUB_STRU_RULE VALUES ('01:1:6', '01', '1', '6', '单位下可以设置岗位');
INSERT INTO PUB_STRU_RULE VALUES ('01:2:2', '01', '2', '2', '部门下可以成立新的部门');
INSERT INTO PUB_STRU_RULE VALUES ('01:2:6', '01', '2', '6', '部门下可以设置岗位');
INSERT INTO PUB_STRU_RULE VALUES ('01:6:8', '01', '6', '8', '岗位下可以委派职工');

-----组织机构-----------------
---organ
INSERT INTO PUB_ORGAN (ORGAN_ID, ORGAN_CODE, ORGAN_NAME, SHORT_NAME, ORGAN_TYPE, IN_USE)
VALUES ('1', '9999', '我的单位', '我的单位', '1', '1');
----stru
INSERT INTO PUB_STRU (STRU_ID, ORGAN_ID, STRU_TYPE, PARENT_ID, STRU_LEVEL, STRU_PATH, STRU_ORDER, IS_LEAF, IN_USE)
VALUES ('1', '1', '00', 'rootId', 1, 'rootId#1', 1, '0', '1');
-----stru_ext
INSERT INTO PUB_STRU_EXT (ID, TYPE, SRC_ID, TARGET_ID, STRU_TYPE, STRU_ID)
VALUES ('SE001', '00', '1', '1', '00', '1');

INSERT INTO PUB_STRU_EXT (ID, TYPE, SRC_ID, TARGET_ID, STRU_TYPE, STRU_ID)
VALUES ('SE002', '01', '1', '1', '00', '1');

-----------------------------组织结构相关结束----------------------------------------


--系统预置菜单
INSERT INTO PUB_MENU_TYPE(MENU_TYPE_ID,MENU_TYPE_NAME,IS_SYS,IS_SYS_DEFAULT) VALUES('1','系统预置菜单','1','1');
------操作类型--
INSERT INTO PUB_OPERATION_TYPE (OPERATION_TYPE_CODE,OPERATION_TYPE_NAME) VALUES ('00','查询');
INSERT INTO PUB_OPERATION_TYPE (OPERATION_TYPE_CODE,OPERATION_TYPE_NAME) VALUES ('01','操作');
INSERT INTO PUB_APPS (APP_CODE,APP_NAME,TRANSPORT,SERVER_HOST,PORT,CONTEXT,URI,SEQ,NOTE) VALUES
                     ('-1',		'系统默认',			'',			'',		'',	'',		'',	0,	'');

-----------------------------用户开始------------------------------------------------
----用户类型
INSERT INTO PUB_USER_TYPE(USER_TYPE_CODE,USER_TYPE_NAME,IS_USE)VALUES('00','内部用户','1');
----用户
INSERT INTO PUB_USERS (USER_ID,USER_TYPE_CODE,USER_NAME,PASSWORD,ACCOUNT_STATUS,IS_SYS,CREATE_TIME,LOCK_TIME,EXPIRED_TIME,PWD_UPT_TIME,PWD_TIME) VALUES('SUPERADMIN','00','SUPERADMIN','99c6b157085564b43b85711360ec6166','11','1','20100120',NULL,NULL,NULL,NULL);
INSERT INTO PUB_USERS (USER_ID,USER_TYPE_CODE,USER_NAME,PASSWORD,ACCOUNT_STATUS,IS_SYS,CREATE_TIME,LOCK_TIME,EXPIRED_TIME,PWD_UPT_TIME,PWD_TIME) VALUES('SYSADMIN','00','SYSADMIN','99c6b157085564b43b85711360ec6166','11','1','20100120',NULL,NULL,NULL,NULL);
INSERT INTO PUB_USERS (USER_ID,USER_TYPE_CODE,USER_NAME,PASSWORD,ACCOUNT_STATUS,IS_SYS,CREATE_TIME,LOCK_TIME,EXPIRED_TIME,PWD_UPT_TIME,PWD_TIME) VALUES('PUBLIC','00','PUBLIC','99c6b157085564b43b85711360ec6166','11','0','20100120',NULL,NULL,NULL,NULL);
INSERT INTO PUB_USERS (USER_ID,USER_TYPE_CODE,USER_NAME,PASSWORD,ACCOUNT_STATUS,IS_SYS,CREATE_TIME,LOCK_TIME,EXPIRED_TIME,PWD_UPT_TIME,PWD_TIME) VALUES('DEMO','00','demo','61de73dbbd7a2bfc22edb0a1d12198f3','11','0','20151222',NULL,NULL,NULL,NULL);
----用户员工表
INSERT INTO PUB_USER_EMPLOYEE(USER_ID,CORPORATION_ID,DEPARTMENT_ID,EMPLOYEE_ID) VALUES('SYSADMIN','1','1',NULL);
----用户策略
INSERT INTO PUB_USER_POLICY(USER_ID,IS_USE_IP,IP_POLICY_VALUE,MAX_SESSION_NUMBER)VALUES('SUPERADMIN','0',NULL,-1);
INSERT INTO PUB_USER_POLICY(USER_ID,IS_USE_IP,IP_POLICY_VALUE,MAX_SESSION_NUMBER)VALUES('SYSADMIN','0',NULL,-1);
INSERT INTO PUB_USER_POLICY(USER_ID,IS_USE_IP,IP_POLICY_VALUE,MAX_SESSION_NUMBER)VALUES('PUBLIC','0',NULL,-1);
INSERT INTO PUB_USER_POLICY(USER_ID,IS_USE_IP,IP_POLICY_VALUE,MAX_SESSION_NUMBER)VALUES('DEMO','0',NULL,-1);

-----------------------------用户结束------------------------------------------------

------------------------------数据权限开始--------------------------------------------
----数据类型
INSERT INTO PUB_DATA_TYPE(DATA_TYPE_CODE,DATA_TYPE_NAME,IS_ORGAN,SOURCE_TABLE,SOURCE_TABLE_DES,SEL_COL,SEL_COL_DES,DISP_COL,DISP_COL_DES,IS_USE_WHERE,WHERE_CONDITION,NOTE) VALUES('1','单位','1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO PUB_DATA_TYPE(DATA_TYPE_CODE,DATA_TYPE_NAME,IS_ORGAN,SOURCE_TABLE,SOURCE_TABLE_DES,SEL_COL,SEL_COL_DES,DISP_COL,DISP_COL_DES,IS_USE_WHERE,WHERE_CONDITION,NOTE) VALUES('2','部门','1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO PUB_DATA_TYPE(DATA_TYPE_CODE,DATA_TYPE_NAME,IS_ORGAN,SOURCE_TABLE,SOURCE_TABLE_DES,SEL_COL,SEL_COL_DES,DISP_COL,DISP_COL_DES,IS_USE_WHERE,WHERE_CONDITION,NOTE) VALUES('8','员工','1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO PUB_DATA_TYPE(DATA_TYPE_CODE,DATA_TYPE_NAME,IS_ORGAN,SOURCE_TABLE,SOURCE_TABLE_DES,SEL_COL,SEL_COL_DES,DISP_COL,DISP_COL_DES,IS_USE_WHERE,WHERE_CONDITION,NOTE) VALUES('6','岗位','1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
----数据权限
INSERT INTO PUB_USER_DATA_PERMIT(USER_DATA_PERMIT_ID,USER_ID,OBJECT_VALUE,DATA_TYPE_CODE,IS_DEFAULT,STRU_ID,STRU_TYPE,SCOPE_TYPE,SCOPE_VALUE,START_TIME,END_TIME) VALUES('BSPDATAPERMIT000000000001','SUPERADMIN','1','1','1','1','00','0',NUll,'20000101 00:00:00','99991231 23:59:59');

------------------------------数据权限结束--------------------------------------------
INSERT INTO PUB_ROLES VALUES('SUPERADMIN','超级管理员',NULL,NULL,NULL);
INSERT INTO PUB_ROLES VALUES('SYSADMIN','系统管理员','1',NULL,NULL);
INSERT INTO PUB_ROLES VALUES('PUBLIC','系统公用角色',NULL,NULL,NULL);

INSERT INTO PUB_USER_ROLE VALUES('BSPRULE00001','00','SUPERADMIN','SUPERADMIN');
INSERT INTO PUB_USER_ROLE VALUES('BSPRULE00002','00','SYSADMIN','SYSADMIN');
INSERT INTO PUB_USER_ROLE VALUES('BSPRULE00003','00','PUBLIC','PUBLIC');
INSERT INTO PUB_USER_ROLE VALUES('BSPRULE00004','00','DEMO','SUPERADMIN');

----------------------------功能权限开始--------------------------------------------------------
------模块--
INSERT INTO PUB_MODULES (MODULE_CODE,MODULE_NAME,PARENT_MODULE_CODE,IS_LEAF_MODULE,APP_CODE,MODULE_PATH,MODULE_PATH_NAME,SEQ) VALUES ('BSP00010','组织结构管理','-1','1','-1','BSP00010','组织结构管理',0);
INSERT INTO PUB_MODULES (MODULE_CODE,MODULE_NAME,PARENT_MODULE_CODE,IS_LEAF_MODULE,APP_CODE,MODULE_PATH,MODULE_PATH_NAME,SEQ) VALUES ('BSP00011','安全管理','-1','1','-1','BSP00011','安全管理',1);
INSERT INTO PUB_MODULES (MODULE_CODE,MODULE_NAME,PARENT_MODULE_CODE,IS_LEAF_MODULE,APP_CODE,MODULE_PATH,MODULE_PATH_NAME,SEQ) VALUES ('BSP00012','其他构件','-1','1','-1','BSP00012','其他构件',2);
INSERT INTO PUB_MODULES (MODULE_CODE,MODULE_NAME,PARENT_MODULE_CODE,IS_LEAF_MODULE,APP_CODE,MODULE_PATH,MODULE_PATH_NAME,SEQ) VALUES ('BSP00013','个人设置','-1','1','-1','BSP00013','个人设置',4);

-----功能---
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000100','组织类型维护','BSP00010',0);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000101','组织结构规则维护','BSP00010',1);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000102','组织视角管理','BSP00010',2);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000110','功能管理','BSP00011',0);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000112','角色管理','BSP00011',2);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000113','用户管理','BSP00011',3);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000120','菜单分类管理','BSP00012',0);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000121','业务流水管理','BSP00012',1);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000122','工作日历管理','BSP00012',1);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('BSP000130','修改我的密码','BSP00013',0);

DROP INDEX URL_CONTENT_INDEX;

----组织视角管理功能----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP00010200','查看组织视角','BSP000102','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000102000','查看组织视角','service/bsp/organ','BSP00010200','BSP000102',0,'http');

----组织类型维护功能----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP00010000','查看组织类型','BSP000100','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000100000','查询组织类型','service/bsp/organType','BSP00010000','BSP000100',0,'http');

----组织机构规则维护功能----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP00010100','查看组织结构规则','BSP000101','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000101000','查看组织结构规则','service/bsp/organtyperule','BSP00010100','BSP000101',1,'http');

--------功能管理-----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP00011000','查看功能树','BSP000110','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000110000','展现功能树','service/bsp/function','BSP00011000','BSP000110',0,'http');

-------角色管理----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP00011200','查看角色树','BSP000112','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000112000','展开角色树','service/bsp/role','BSP00011200','BSP000112',1,'http');

-------用户管理----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP00011300','查看用户树','BSP000113','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000113000','查看用户树','service/bsp/user','BSP00011300','BSP000113',0,'http');

-------菜单类型管理----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP00012000','查看菜单类型列表','BSP000120','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000120000','展现菜单类型','service/bsp/menu','BSP00012000','BSP000120',0,'http');

--------业务流水管理功能----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP0001210','查看业务流水号','BSP000121','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP00012100','展现业务流水号','service/bsp/bizid','BSP0001210','BSP000121',0,'http');

--------工作日历管理功能----
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP0001220','查看工作日历','BSP000122','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP00012200','展现工作日历','service/bsp/workcalendar','BSP0001220','BSP000122',0,'http');

INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('BSP0001300','修改我的密码','BSP000130','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('BSP000130000','修改我的密码','service/bsp/userinfo','BSP0001300','BSP000130',1,'http');

----菜单项
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,MODULE_CODE,APP_CODE,IS_LEAF,ICON) VALUES('BSP00010','组织机构管理','BSP00010','-1','0','platform/img/organization.png');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,MODULE_CODE,APP_CODE,IS_LEAF,ICON) VALUES('BSP00011','安全管理','BSP00011','-1','0','platform/img/safety.png');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,MODULE_CODE,APP_CODE,IS_LEAF,ICON) VALUES('BSP00012','其他构件','BSP00012','-1','0','platform/img/other.png');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,MODULE_CODE,APP_CODE,IS_LEAF,ICON) VALUES('BSP00013','个人设置','BSP00013','-1','0','platform/img/personal.png');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000102','组织视角管理','service/bsp/organ','1','BSP00010','BSP000102','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000101','组织结构规则维护','service/bsp/organtyperule','1','BSP00010','BSP000101','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000100','组织类型维护','service/bsp/organType','1','BSP00010','BSP000100','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000110','功能管理','service/bsp/function','1','BSP00011','BSP000110','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000112','角色管理','service/bsp/role','1','BSP00011','BSP000112','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000113','用户管理','service/bsp/user','1','BSP00011','BSP000113','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000120','菜单分类管理','service/bsp/menu','1','BSP00012','BSP000120','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000121','业务流水号管理','service/bsp/bizid','1','BSP00012','BSP000121','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000122','工作日历管理','service/bsp/workcalendar','1','BSP00012','BSP000122','-1');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('BSP000130','修改我的密码','service/bsp/userinfo','1','BSP00013','BSP000130','-1');

INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP00000000000000000000000001','1','BSP00010','BSP00010',0,'BSP00010','组织结构管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSPSTRU00000000000000000000010','1','BSP000100','BSP00010',0,'BSP00010#BSP000100','组织结构管理#组织类型维护');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSPSTRU00000000000000000000011','1','BSP000102','BSP00010',1,'BSP00010#BSP000102','组织结构管理#组织视角管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSPSTRU00000000000000000000012','1','BSP000101','BSP00010',2,'BSP00010#BSP000101','组织结构管理#组织结构规则维护'
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP00000000000000000000000002','1','BSP00011','BSP00011',1,'BSP00011','安全管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP000000000000000000000000020','1','BSP000110','BSP00011',0,'BSP00011#BSP000110','安全管理#功能管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP000000000000000000000000021','1','BSP000112','BSP00011',2,'BSP00011#BSP000112','安全管理#角色管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP000000000000000000000000022','1','BSP000113','BSP00011',3,'BSP00011#BSP000113','安全管理#用户管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP00000000000000000000000003','1','BSP00012','BSP00012',2,'BSP00012','其他构件');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP000000000000000000000000030','1','BSP000120','BSP00012',0,'BSP00012#BSP000120','其他构件#菜单分类管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSPID0000000000000000000000031','1','BSP000121','BSP00012',1,'BSP00012#BSP000121','其他构件#业务流水号管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSPID0000000000000000000000032','1','BSP000122','BSP00012',2,'BSP00012#BSP000122','其他构件#工作日历管理');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP00000000000000000000000004','1','BSP00013','BSP00013',4,'BSP00013','个人设置');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP000000000000000000000000040','1','BSP000130','BSP00013',0,'BSP00013#BSP000130','个人设置#修改我的密码');

----权限初始化
INSERT INTO PUB_ROLE_OPERATION SELECT 'SUPERADMIN',OPERATION_CODE FROM PUB_OPERATIONS ;

############################案例开发########################################################

######模块##
INSERT INTO PUB_MODULES (MODULE_CODE,MODULE_NAME,PARENT_MODULE_CODE,IS_LEAF_MODULE,APP_CODE,MODULE_PATH,MODULE_PATH_NAME,SEQ) VALUES ('example00','案例','-1','1','-1','example00','案例',0);

#####功能###
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('usermanager00','用户管理','example00',0);

####操作####
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('usermanager01','用户查询','usermanager00','00','1',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('usermanager010','用户信息查询','jsp/framework/demo/user/queryuser.jsp','usermanager01','usermanager00',0,'http');

####菜单项####
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,MODULE_CODE,APP_CODE,IS_LEAF,ICON) VALUES('example00','案例','example00','-1','0','platform/img/case.png');
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('usermanager00','用户管理','jsp/framework/demo/user/queryuser.jsp','1','example00','usermanager00','-1');

####菜单结构####
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSP00000000000000000000000006','1','example00','example00',0,'example00','案例');
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSPSTRU00000000000000000000060','1','usermanager00','example00',0,'example00#usermanager00','案例#用户管理');

####操作授权####
INSERT INTO PUB_ROLE_OPERATION values ('SUPERADMIN', 'usermanager01');
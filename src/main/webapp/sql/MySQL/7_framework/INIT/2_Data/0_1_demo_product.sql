#####功能###
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE,FUNCTION_NAME,MODULE_CODE,SEQ) VALUES ('productmanager00','商品管理','example00',0);

#####操作###
INSERT INTO PUB_OPERATIONS (OPERATION_CODE,OPERATION_NAME,FUNCTION_CODE,OPERATION_TYPE_CODE,IS_DEFAULT,SEQ) VALUES ('productmanager01','商品查询','productmanager00','00','0',0);
INSERT INTO PUB_URLS (URL_CODE,URL_NAME,URL_CONTENT,OPERATION_CODE,FUNCTION_CODE,SEQ,ACCESS_TYPE) VALUES('productmanager010','商品信息查询','jsp/framework/demo/product/queryproduct.jsp','productmanager01','productmanager00',0,'http');

####菜单项####
INSERT INTO PUB_MENU_ITEM(MENU_ID,MENU_NAME,REQUEST_ACTION,IS_LEAF,MODULE_CODE,FUNCTION_CODE,APP_CODE) VALUES('productmanager00','商品管理','jsp/framework/demo/product/queryproduct.jsp','1','example00','productmanager00','-1');

####菜单结构####
INSERT INTO PUB_MENU_STRU(MENU_STRU_ID,MENU_TYPE_ID,MENU_ID,PARENT_MENU_ID,SEQ,MENU_PATH,PATH_NAME) VALUES ('BSPSTRU00000000000000000000061','1','productmanager00','example00',0,'example00#productmanager00','案例#商品管理');

####操作授权####
INSERT INTO PUB_ROLE_OPERATION values ('SUPERADMIN', 'productmanager01');

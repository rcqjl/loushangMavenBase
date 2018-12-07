----从Loushang v6开始，初始化数据需要执行本目录下的sql，用于修改各个模块的菜单数据---

----模块 图标---
UPDATE PUB_MODULES SET ICON = 'platform/img/cform.png' WHERE MODULE_CODE = 'CFORM';
UPDATE PUB_MODULES SET ICON = 'platform/img/cportal.png' WHERE MODULE_CODE = 'CPORTAL';
UPDATE PUB_MODULES SET ICON = 'platform/img/bpm.png' WHERE MODULE_CODE = 'WORKFLOW';
UPDATE PUB_MODULES SET ICON = 'platform/img/case.png' WHERE MODULE_CODE = 'example00';
UPDATE PUB_MODULES SET ICON = 'platform/img/organization.png' WHERE MODULE_CODE = 'BSP00010';
UPDATE PUB_MODULES SET ICON = 'platform/img/safety.png' WHERE MODULE_CODE = 'BSP00011';
UPDATE PUB_MODULES SET ICON = 'platform/img/other.png' WHERE MODULE_CODE = 'BSP00012';

----模块功能 是否菜单---
UPDATE PUB_MODULES SET IS_MENU = '1';
UPDATE PUB_FUNCTIONS SET IS_MENU = '1';

----角色 角色编码---
UPDATE PUB_ROLES SET ROLE_CODE = ROLE_ID;
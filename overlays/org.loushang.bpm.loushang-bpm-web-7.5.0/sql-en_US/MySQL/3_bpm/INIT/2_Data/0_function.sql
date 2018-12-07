
###
### Table: PUB_MODULES
###


INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES 
    ('WORKFLOW', 'Workflow', '-1', '0', '-1', 'WORKFLOW', 'Workflow', 0);

INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES 
    ('WORKFLOW01', 'Workflow Management', 'WORKFLOW', '1', '-1', 'WORKFLOW#WORKFLOW01', 'Workflow#Workflow Management', 1);

INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES 
    ('WORKFLOW_FORM_MGR', 'Form Management', 'WORKFLOW', '1', '-1', 'WORKFLOW#WORKFLOW_FORM_MGR', 'Workflow#Form Management', 2);

INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES
	('WORKFLOW_PROC_ANALYSIS', 'Statistic Analysis', 'WORKFLOW', '1', '-1', 'WORKFLOW#WORKFLOW_PROC_ANALYSIS', 'Workflow#Statistic Analysis', 8);

INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES 
    ('WORKFLOW_CONFIG_PROCDEF', 'Workflow Definition', 'WORKFLOW_CONFIG_MGR', '1', '-1', 'WORKFLOW#WORKFLOW_CONFIG_MGR#WORKFLOW_CONFIG_PROCDEF', 'Workflow#Configuration#Workflow Definition', 1);

INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES 
    ('WORKFLOW_TASK_LIST', 'Task List', 'WORKFLOW', '1', '-1', 'WORKFLOW#WORKFLOW_TASK_LIST', 'Workflow#Task List', 0);

INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES 
    ('WORKFLOW_CONFIG_MGR', 'Configuration', 'WORKFLOW', '0', '-1', 'WORKFLOW#WORKFLOW_CONFIG_MGR', 'Workflow#Configuration', 4);

INSERT INTO PUB_MODULES (MODULE_CODE, MODULE_NAME, PARENT_MODULE_CODE, IS_LEAF_MODULE, APP_CODE, MODULE_PATH, MODULE_PATH_NAME, SEQ) VALUES 
   ('WORKFLOW_PROPERTY_CONFIG', 'Workflow Attribute', 'WORKFLOW_CONFIG_MGR', '1', '-1', 'WORKFLOW#WORKFLOW_CONFIG_MGR#WORKFLOW_PROPERTY_CONFIG', 'Workflow#Configuration#Workflow Attribute', 1);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW0100', 'Workflow Definition', 'WORKFLOW01', 0);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW0101', 'Management', 'WORKFLOW01', 1);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW0102', 'Workflow Type', 'WORKFLOW01', 2);
    
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_CONFIG_PROCDEF_BTN', 'Plugin Button', 'WORKFLOW_CONFIG_PROCDEF', 0);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_FORM_MGR_JSP_DEF', 'Form Definition', 'WORKFLOW_FORM_MGR', 0);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_TASK_LIST_DEFAULT_NEW', 'Create Task', 'WORKFLOW_TASK_LIST', 0);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_TASK_LIST_DEFAULT_DB', 'To-Do Task', 'WORKFLOW_TASK_LIST', 1);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_TASK_LIST_DEFAULT_YB', 'Done Task', 'WORKFLOW_TASK_LIST', 2);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_TASK_LIST_DEFAULT_END', 'End Task', 'WORKFLOW_TASK_LIST', 3);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_PROCESS_RESUME_EVENT', 'Workflow resume monitoring', 'WORKFLOW_PROPERTY_CONFIG', 0);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_PROC_PERMISSION_CONF', 'Workflow Permit', 'WORKFLOW_PROPERTY_CONFIG', 1);

INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_PLUGIN_TYPE_REGISTER', 'Plugin Register', 'WORKFLOW_CONFIG_PROCDEF', 1);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES 
    ('WORKFLOW_PARTICIPANT_CONFIG', 'Participants config', 'WORKFLOW_CONFIG_PROCDEF', 1);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES
	('WORKFLOW_ALL_PROCESS_ANALYSIS', 'Workflow Analysis', 'WORKFLOW_PROC_ANALYSIS', 0);
INSERT INTO PUB_FUNCTIONS (FUNCTION_CODE, FUNCTION_NAME, MODULE_CODE, SEQ) VALUES
	('WORKFLOW_ALL_PART_ANALYSIS', 'Organ Analysis', 'WORKFLOW_PROC_ANALYSIS', 1);
   
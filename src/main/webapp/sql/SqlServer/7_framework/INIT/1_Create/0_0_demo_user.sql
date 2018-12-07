
-- 用户
CREATE TABLE demo_user (	   
	id varchar(32) not null,
	user_id varchar(30) not null,
	user_name varchar(30) not null,
	nickname varchar(30),
	password varchar(128) not null,
	act_status char(1) default 'N' not null ,
	primary key (id)
);
EXEC sys.sp_addextendedproperty @name=N'MS_Description',
@value=N'N: 正常 L: 锁定(待激活) X：删除' ,
@level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',
@level1name=N'demo_user', @level2type=N'COLUMN',@level2name=N'act_status'


-- 用户档案
CREATE TABLE demo_archives (
	id varchar(32) not null,
	gender char(1) not null,
	birthday char(15),
	education char(1) ,
	school varchar(30) ,
	email  varchar(30) ,
	primary key (id),
	CONSTRAINT demo_archives_fk1 foreign key (id) references demo_user(id)
);
EXEC sys.sp_addextendedproperty @name=N'MS_Description',
@value=N'M:男 F:女 N:未知',@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'demo_archives', @level2type=N'COLUMN',@level2name=N'gender'

EXEC sys.sp_addextendedproperty @name=N'MS_Description',
@value=N'学历',@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'demo_archives', @level2type=N'COLUMN',@level2name=N'education'

EXEC sys.sp_addextendedproperty @name=N'MS_Description',
@value=N'学校',@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'demo_archives', @level2type=N'COLUMN',@level2name=N'school'

EXEC sys.sp_addextendedproperty @name=N'MS_Description',
@value=N'邮箱',@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'demo_archives', @level2type=N'COLUMN',@level2name=N'email'

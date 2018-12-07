create table demo_user(
id varchar2(32) not null,
user_id varchar2(30) not null,
user_name varchar2(30) not null,
nickname varchar2(30),
password varchar2(128) not null,
act_status char(1) default 'N' not null ,
primary key (id)
);
comment on column demo_user.act_status is 'N: 正常 L: 锁定(待激活) X：删除'; 

-- 用户档案
CREATE TABLE demo_archives (
	id varchar2(32) not null,
	gender char(1) not null,
	birthday char(15),
	education char(1) ,
	school varchar2(30) ,
	email  varchar2(30) ,
	primary key (id),
	CONSTRAINT demo_archives_fk1 foreign key (id) references demo_user(id)
);
comment on column demo_archives.gender is 'M:男 F:女 N:未知'; 
comment on column demo_archives.education is '学历'; 
comment on column demo_archives.school is '学校'; 
comment on column demo_archives.email is '邮箱'; 

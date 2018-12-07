drop table if exists demo_archives;
drop table if exists demo_user ;

####用户#####
CREATE TABLE demo_user (
	id varchar(32) not null,
	user_id varchar(30) not null,
	user_name varchar(30) not null,
	nickname varchar(30),
	password varchar(128) not null,
	act_status char(1) not null default 'N' comment 'N: 正常 L: 锁定(待激活) X：删除',
	primary key (id)
);

######用户档案##
CREATE TABLE demo_archives (
	id varchar(32) not null,
	gender char(1) not null comment 'M:男 F:女 N:未知',
	birthday char(15),
	education char(1) comment '学历',
	school varchar(30) comment '学校',
	email  varchar(30) comment '邮箱',
	icon  longblob comment '用户头像',
	primary key (id),
	CONSTRAINT demo_archives_fk1 foreign key (id) references demo_user(id)
);
package org.loushang.framework.demo.user.dao;

import java.util.List;
import java.util.Map;

import org.loushang.framework.demo.user.data.User;
import org.loushang.framework.mybatis.mapper.EntityMapper;

/**
 * Dao层 接口类，用于持久化数据处理
 * 
 * @author 框架产品组
 * 
 */
public interface UserMapper extends EntityMapper<User> {

    /**
     * 查询所有用户数据
     * 
     * @param map, key 分别为 ： 
     *              <code>orderfield<code>[排序列] 
     *              <code>orderdir<code>[排序方向desc或asc] 
     *              <code>start<code>[起始行]
     *              <code>limit<code>[每页显示条数]
     *              
     * @return List, 内容为User对象列表
     * 
     */
    List<User> findAll(Map map);
}

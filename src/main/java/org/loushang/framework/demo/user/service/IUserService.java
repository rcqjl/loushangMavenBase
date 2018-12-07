package org.loushang.framework.demo.user.service;

import java.util.List;
import java.util.Map;

import org.loushang.framework.demo.user.data.User;
import org.loushang.framework.demo.user.data.UserArchive;

/**
 * Service层 接口类，用于业务逻辑处理，事务控制等
 * 
 * @author 框架产品组
 * 
 */
public interface IUserService {
	
    // ////////////////////////////////新增、修改//////////////////////////////////

    /**
     * 保存新增和修改后的用户信息
     * 
     * @param user
     * 
     * @return User
     * 
     */
    public User save(User user);

    // ////////////////////////////////删除//////////////////////////////////

    /**
     * 根据ID删除用户
     * 
     * @param id [ID主键]
     * 
     */
    public void delete(String id);

    /**
     * 根据ID批量删除用户
     * 
     * @param ids [ID主键数组]
     * 
     */
    public void delete(String[] ids);

    // ////////////////////////////////查询//////////////////////////////////

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
    public List<User> findAll(Map map);

    /**
     * 根据ID获取用户信息
     * 
     * @param id [ID主键]
     * 
     * @return User
     * 
     */
    public User findOne(String id);

    /**
     * 根据id查询用户档案信息
     * 
     * @param id [ID主键]
     * 
     * @return UserArchive
     * 
     */
    public UserArchive findArchive(String id);
}

package com.inspur.zrzy.share.dao;

import java.util.List;
import java.util.Map;

import org.loushang.framework.mybatis.mapper.EntityMapper;

import com.inspur.zrzy.share.data.Share;

/**
 * Dao层 接口类，用于持久化数据处理
 * 
 * @author 框架产品组
 * 
 */
public interface ShareMapper extends EntityMapper<Share> {

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
    List<Share> findAll(Map map);
}

package com.inspur.zrzy.share.service.impl;

import java.util.List;
import java.util.Map;

import org.loushang.framework.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inspur.zrzy.share.dao.ShareMapper;
import com.inspur.zrzy.share.data.Share;
import com.inspur.zrzy.share.service.IShareService;

/**
 * Service层 实现类，用于业务逻辑处理，事务控制等
 * 
 * @author 框架产品组
 * 
 */
@Service("shareService")
public class ShareServiceImpl implements IShareService {

    @Autowired
    private ShareMapper shareMapper;

 

    // ////////////////////////////////查询//////////////////////////////////

    /**
     * 查询所有自然资源登记单元数据
     * 
     * @param map, key 分别为 ： 
     *              <code>orderfield<code>[排序列] 
     *              <code>orderdir<code>[排序方向desc或asc] 
     *              <code>start<code>[起始行]
     *              <code>limit<code>[每页显示条数]
     *              
     * @return List, 内容为Share对象列表
     * 
     */
    public List<Share> findAll(Map map) {
        return shareMapper.findAll(map);
    }

    /**
     * 根据BSM_DY获取自然资源登记单元信息
     * 
     * @param BSM_DY [BSM_DY主键]
     * 
     * @return Share
     * 
     */
    public Share findOne(String BSM_DY) {
        return shareMapper.get(BSM_DY);
    }

 
}

package org.loushang.framework.demo.product.service;

import java.util.List;
import java.util.Map;

import org.loushang.framework.demo.product.data.Product;

/**
 * Service层 接口类，用于业务逻辑处理，事务控制等
 * 
 * @author 框架产品组
 * 
 */
public interface IProductService {
    
	// ////////////////////////////////新增、修改//////////////////////////////////
	
	public void add(Product product);
	public void update(Product product);
	public void save(List<Product> productList);
	
	// ////////////////////////////////删除//////////////////////////////////
	
	public void delete(String id);
	public void delete(String[] ids);
	 
	// ////////////////////////////////查询//////////////////////////////////
	 
    /**
     * 查询所有商品数据
     * 
     * @param map, key 分别为 ： 
     *              <code>orderfield<code>[排序列] 
     *              <code>orderdir<code>[排序方向desc或asc] 
     *              <code>start<code>[起始行]
     *              <code>limit<code>[每页显示条数]
     *              
     * @return List, 内容为Product对象列表
     * 
     */
    public List<Product> query(Map map);
} 

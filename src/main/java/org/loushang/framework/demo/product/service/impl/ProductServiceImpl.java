package org.loushang.framework.demo.product.service.impl;

import java.util.List;
import java.util.Map;

import org.loushang.framework.demo.product.dao.ProductMapper;
import org.loushang.framework.demo.product.data.Product;
import org.loushang.framework.demo.product.service.IProductService;
import org.loushang.framework.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service层 实现类，用于业务逻辑处理，事务控制等
 * 
 * @author 框架产品组
 * 
 */
@Service("productService")
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductMapper productMapper;
    
    // ////////////////////////////////新增、修改//////////////////////////////////
    
    @Override
    public void add(Product product) {
        productMapper.insert(product);
    }
    
    @Override
    public void update(Product product) {
        productMapper.update(product);
    }
    
    @Transactional("mybatisTransactionManager")
	public void save(List<Product> productList) {
        //业务主键处理
        if(productList!=null && productList.size()>0){
            for(int i=0; i<productList.size(); i++){
                if(productList.get(i).getState()==1){
                    productList.get(i).setId(UUIDGenerator.getUUID());
                }
            }
        }
        productMapper.save(productList);
	}
    
    // ////////////////////////////////删除//////////////////////////////////
    
    /**
     * 根据ID删除商品
     * 
     * @param id [ID主键]
     * 
     */
    @Transactional("mybatisTransactionManager")
	public void delete(String id) {
		productMapper.delete(id);
		
	}

    /**
     * 根据ID批量删除商品
     * 
     * @param ids [ID主键数组]
     * 
     */
    @Transactional("mybatisTransactionManager")
	public void delete(String[] ids) {
		productMapper.batchDelete(ids);		
	}

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
    public List<Product> query(Map map) {
        return productMapper.query(map);
    }
}

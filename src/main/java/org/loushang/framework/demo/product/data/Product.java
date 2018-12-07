package org.loushang.framework.demo.product.data;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.loushang.framework.data.StatefulDatabean;

/**
 *  Bean
 * 
 * @author 框架产品组
 * 
 */
@Table(name = "DEMO_PRODUCT")
public class Product extends StatefulDatabean implements Serializable {

    /**
     * 
     */

    @Id
    private String id;

    @Column(name = "product_code")
    private String productCode;
    
    @Column(name = "product_name")
    private String productName;
    
    @Column(name = "product_type")
    private String productType;
    
    @Column(name = "product_manu")
    private String productManu;
    
    @Column(name = "product_num")
    private int productNum;

    @Column(name = "product_date")
    private String productDate;
    
    @Column(name = "product_price")
    private double productPrice;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public String getProductManu() {
		return productManu;
	}

	public void setProductManu(String productManu) {
		this.productManu = productManu;
	}

	public int getProductNum() {
		return productNum;
	}

	public void setProductNum(int productNum) {
		this.productNum = productNum;
	}

	public String getProductDate() {
		return productDate;
	}

	public void setProductDate(String productDate) {
		this.productDate = productDate;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}
    

	

	
   

}

package com.inspur.zrzy.share.data;

import java.io.Serializable;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * Share Bean
 * 
 * @author 框架产品组
 * 
 */
@Table(name = "NRDY")
public class Share implements Serializable {

    @Id
    @Column(name = "BSM_DY")
    private String BSM_DY;

    @Column(name = "XZQDM")
    private String XZQDM;

    @Column(name = "XZQMC")
    private String XZQMC;
    
    @Column(name = "XMMC")
    private String XMMC;

    @Column(name = "ZRZYDJDYH")
    private String ZRZYDJDYH;

    @Column(name = "KCZYCLGSFWBH")
    private String KCZYCLGSFWBH;

    @Column(name = "ZRZYDYMC")
    private String ZRZYDYMC;
    
    @Column(name = "DJDYLX")
    private String DJDYLX;

    @Column(name = "SYQR")
    private String SYQR;

    @Column(name = "SYQDBXSZTCJ")
    private char SYQDBXSZTCJ;

    @Column(name = "SYQDBXSZT")
    private String SYQDBXSZT;

    @Column(name = "SYQDBXSNR")
    private String SYQDBXSNR;

    @Column(name = "ZL")
    private String ZL;

    
    @Column(name = "CLGSJZRQ")
    private Date CLGSJZRQ;

    @Column(name = "ZMJ")
    private float ZMJ;

    @Column(name = "MJDW")
    private String MJDW;

    @Column(name = "ZSL")
    private float ZSL;

    @Column(name = "WKWZSZ")
    private String WKWZSZ;

    @Column(name = "QSLYZM")
    private String QSLYZM;

    @Column(name = "YTGZYQ")
    private String YTGZYQ;

    @Column(name = "STHXYQ")
    private String STHXYQ;

    @Column(name = "TSBHYQ")
    private String TSBHYQ;

    @Column(name = "DCDW")
    private String DCDW;

    @DateTimeFormat(pattern="yyyy-MM-dd hh:mm:ss")
    @Column(name = "DCSJ")
    private Date DCSJ;

    @Column(name = "FT")
    private String FT;

    @Column(name = "ZT")
    private char ZT;

    @Column(name = "BZ")
    private String BZ;

	public String getBSM_DY() {
		return BSM_DY;
	}

	public void setBSM_DY(String bSM_DY) {
		BSM_DY = bSM_DY;
	}

	public String getXZQDM() {
		return XZQDM;
	}

	public void setXZQDM(String xZQDM) {
		XZQDM = xZQDM;
	}

	public String getXZQMC() {
		return XZQMC;
	}

	public void setXZQMC(String xZQMC) {
		XZQMC = xZQMC;
	}

	public String getXMMC() {
		return XMMC;
	}

	public void setXMMC(String xMMC) {
		XMMC = xMMC;
	}

	public String getZRZYDJDYH() {
		return ZRZYDJDYH;
	}

	public void setZRZYDJDYH(String zRZYDJDYH) {
		ZRZYDJDYH = zRZYDJDYH;
	}

	public String getKCZYCLGSFWBH() {
		return KCZYCLGSFWBH;
	}

	public void setKCZYCLGSFWBH(String kCZYCLGSFWBH) {
		KCZYCLGSFWBH = kCZYCLGSFWBH;
	}

	public String getZRZYDYMC() {
		return ZRZYDYMC;
	}

	public void setZRZYDYMC(String zRZYDYMC) {
		ZRZYDYMC = zRZYDYMC;
	}

	public String getDJDYLX() {
		return DJDYLX;
	}

	public void setDJDYLX(String dJDYLX) {
		DJDYLX = dJDYLX;
	}

	public String getSYQR() {
		return SYQR;
	}

	public void setSYQR(String sYQR) {
		SYQR = sYQR;
	}

	public char getSYQDBXSZTCJ() {
		return SYQDBXSZTCJ;
	}

	public void setSYQDBXSZTCJ(char sYQDBXSZTCJ) {
		SYQDBXSZTCJ = sYQDBXSZTCJ;
	}

	public String getSYQDBXSZT() {
		return SYQDBXSZT;
	}

	public void setSYQDBXSZT(String sYQDBXSZT) {
		SYQDBXSZT = sYQDBXSZT;
	}

	public String getSYQDBXSNR() {
		return SYQDBXSNR;
	}

	public void setSYQDBXSNR(String sYQDBXSNR) {
		SYQDBXSNR = sYQDBXSNR;
	}

	public String getZL() {
		return ZL;
	}

	public void setZL(String zL) {
		ZL = zL;
	}

	public Date getCLGSJZRQ() {
		return CLGSJZRQ;
	}

	public void setCLGSJZRQ(Date cLGSJZRQ) {
		CLGSJZRQ = cLGSJZRQ;
	}

	public float getZMJ() {
		return ZMJ;
	}

	public void setZMJ(float zMJ) {
		ZMJ = zMJ;
	}

	public String getMJDW() {
		return MJDW;
	}

	public void setMJDW(String mJDW) {
		MJDW = mJDW;
	}

	public float getZSL() {
		return ZSL;
	}

	public void setZSL(float zSL) {
		ZSL = zSL;
	}

	public String getWKWZSZ() {
		return WKWZSZ;
	}

	public void setWKWZSZ(String wKWZSZ) {
		WKWZSZ = wKWZSZ;
	}

	public String getQSLYZM() {
		return QSLYZM;
	}

	public void setQSLYZM(String qSLYZM) {
		QSLYZM = qSLYZM;
	}

	public String getYTGZYQ() {
		return YTGZYQ;
	}

	public void setYTGZYQ(String yTGZYQ) {
		YTGZYQ = yTGZYQ;
	}

	public String getSTHXYQ() {
		return STHXYQ;
	}

	public void setSTHXYQ(String sTHXYQ) {
		STHXYQ = sTHXYQ;
	}

	public String getTSBHYQ() {
		return TSBHYQ;
	}

	public void setTSBHYQ(String tSBHYQ) {
		TSBHYQ = tSBHYQ;
	}

	public String getDCDW() {
		return DCDW;
	}

	public void setDCDW(String dCDW) {
		DCDW = dCDW;
	}

	public Date getDCSJ() {
		return DCSJ;
	}

	public void setDCSJ(Date dCSJ) {
		DCSJ = dCSJ;
	}

	public String getFT() {
		return FT;
	}

	public void setFT(String fT) {
		FT = fT;
	}

	public char getZT() {
		return ZT;
	}

	public void setZT(char zT) {
		ZT = zT;
	}

	public String getBZ() {
		return BZ;
	}

	public void setBZ(String bZ) {
		BZ = bZ;
	}

  




}

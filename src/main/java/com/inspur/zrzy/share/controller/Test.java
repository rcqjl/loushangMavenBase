package com.inspur.zrzy.share.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Test {

	public static void main(String[] args){
		String date = "Sat Sep 01 11:54:28 CST 2018";
		Date f = new Date(date);
		try {
		String c = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(f);
		System.out.println(c);
		Date datenew = new Date(c);
		System.out.println(datenew.toString());
		} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		}

	}
}

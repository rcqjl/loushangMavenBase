package com.inspur.zrzy.share.controller;


import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.framework.mybatis.PageUtil;
import org.loushang.framework.util.DownloadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.inspur.zrzy.share.data.Share;
import com.inspur.zrzy.share.service.IShareService;

/**
 * Controller层，用于前后台交互、前后台数据格式转换
 * 
 * @author 框架产品组
 * 
 */
@Controller
@RequestMapping(value = "/zrzy/share")
//@Api(tags = "二：用户信息") //swagger分类标题注解
public class ShareController {
	
	public static Log log = LogFactory.getLog(ShareController.class);
    @Autowired
    IShareService shareService;

    /**
     * 跳转用户列表页面
     * 
     * @return 用户列表页面
     */
    @RequestMapping
    public String getPage() {
        return "zrzy/share/shareDetail";
    }
    
    // ////////////////////////////////新增、修改//////////////////////////////////

    /**
     * 用户修改页面的跳转
     * 
     *
     * 
     * @return Map key为
     *          <code>user<code>[User对象]
     * 
     */
    @RequestMapping("/detail")
    public ModelAndView editPage(@RequestParam(value = "BSM_DY", required = false) String BSM_DY) {
        Share share = null;
        if (BSM_DY != null && !"".equals(BSM_DY)) {
        	share = shareService.findOne(BSM_DY);
            
        }
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("share", share);
        return new ModelAndView("zrzy/share/shareDetail", model);
    }

 
    // ////////////////////////////////查询//////////////////////////////////
    /**
     * 用户信息数据的查询
     * 
     * @param parameters, key 分别为 ： 
     *              <code>orderfield<code>[排序列]
     *              <code>orderdir<code>[排序方向desc或asc] 
     *              <code>start<code>[起始行] 
     *              <code>limit<code>[每页显示条数]
     * 
     * @return Map, key分别为：
     *              <code>total<code>[总记录条数] 
     *              <code>data<code>[用户信息列表], List 内容为 User
     * @throws ParseException 
     * 
     */
    @RequestMapping("/query")
    @ResponseBody
    
//    @ApiOperation(httpMethod = "POST", value = "个人信息")//swagger 当前接口注解
    public Map query(@RequestBody Map<String, Object> parameters) throws ParseException {
    	log.info("query start..........");
        parameters.put("orderfield", "XZQDM");
        parameters.put("orderdir", "desc");
        Map<String, Object> shareData = new HashMap<String, Object>();
        List<Share> shares = shareService.findAll(parameters);
//        for(Share share : shares){
//        	 SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        	 String date = share.getDCSJ().toString();
//        	 System.out.println(share.getDCSJ().toString());
//        	 
//        }
        shareData.put("data", shares);
        // 获取总记录条数
        int total = PageUtil.getTotalCount();
        shareData.put("total", total != -1 ? total : shares.size());

        return shareData;
    }
}

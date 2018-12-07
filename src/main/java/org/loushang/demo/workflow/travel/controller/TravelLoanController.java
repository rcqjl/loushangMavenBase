package org.loushang.demo.workflow.travel.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.demo.workflow.travel.data.TravelLoan;
import org.loushang.demo.workflow.travel.service.ITravelLoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/demo/workflow/travelloan")
public class TravelLoanController {

	private static final Log log = LogFactory.getLog(TravelLoanController.class);

	@Autowired
	ITravelLoanService travelLoanService;

	/**
	 * 创建流程
	 * @param travelLoan
	 * @param procDefUniqueId
	 * @param startActDefUniqueId
	 * @return
	 */
	@RequestMapping({ "/create" })
	@ResponseBody
	public boolean create(TravelLoan travelLoan,
			@RequestParam(value = "procDefUniqueId", required = false) String procDefUniqueId,
			@RequestParam(value = "startActDefUniqueId", required = false) String startActDefUniqueId) {
		try {
			travelLoanService.create(travelLoan, procDefUniqueId, startActDefUniqueId);
			return true;
		} catch (Exception e) {
			log.error("创建流程失败" + e);
			return false;
		}
	}

	/**
	 * 创建并发送流程
	 * @param travelLoan
	 * @param startActDefUniqueId
	 * @param procDefUniqueId
	 * @return
	 */
	@RequestMapping({ "/createAndSend" })
	@ResponseBody
	public boolean createAndSend(TravelLoan travelLoan,
			@RequestParam("startActDefUniqueId") String startActDefUniqueId,
			@RequestParam("procDefUniqueId") String procDefUniqueId) {
		try {
			travelLoanService.createAndSend(travelLoan, procDefUniqueId, startActDefUniqueId);
			return true;
		} catch (Exception e) {
			log.error("发送失败" + e);
			return false;
		}
	}

	/**
	 * 发送流程
	 * @param travelLoan
	 * @param assignmentId
	 * @return
	 */
	@RequestMapping({"/send"})
	@ResponseBody
	public boolean send(TravelLoan travelLoan,
			@RequestParam("assignmentId") String assignmentId) {
		try {
			travelLoanService.send(travelLoan, assignmentId);
			return true;
		} catch (Exception e) {
			log.error("发送失败" + e);
			return false;
		}
	}

	/**
	 * 回退流程
	 * @param travelLoan
	 * @param assignmentId
	 * @return
	 */
	@RequestMapping({"/back"})
	@ResponseBody
	public boolean back(TravelLoan travelLoan,
			@RequestParam("assignmentId") String assignmentId) {
		try {
			travelLoanService.back(travelLoan, assignmentId);
			return true;
		} catch (Exception e) {
			log.error("退回失败" + e);
			return false;
		} 
	}

	/**
	 * 撤回流程
	 * @param travelLoan
	 * @param assignmentId
	 * @return
	 */
	@RequestMapping({"/revoke"})
	@ResponseBody
	public boolean revoke(TravelLoan travelLoan,
			@RequestParam("assignmentId") String assignmentId) {
		try {
			travelLoanService.revoke(travelLoan, assignmentId);
			return true;
		} catch (Exception e) {
			log.error("撤回失败" + e);
			return false;
		}
	}

	/**
	 * 更新
	 * @param travelLoan
	 * @param assignmentId
	 * @return
	 */
	@RequestMapping({"update"})
	@ResponseBody
	public boolean update(TravelLoan travelLoan,
			@RequestParam("assignmentId") String assignmentId) {
		try {
			travelLoanService.update(travelLoan, assignmentId);
			return true;
		} catch (Exception e) {
			log.error("保存失败" + e);
			return false;
		} 
	}

	/**
	 * 流程相关信息查询
	 * @param param
	 * @return
	 */
	@RequestMapping({"/query"})
	@ResponseBody
	public Map<String, String> query(@RequestParam Map<String, Object> param) {
		TravelLoan travelLoan = null;
		Map<String, String> map = new HashMap<String, String>();
		String id = (String) param.get("id");
		if ((id != null) && (!("").equals(id))) {
			travelLoan = travelLoanService.getTravelLoan(id);
			if (travelLoan != null) {
				map.put("id", travelLoan.getId());
				map.put("traveller", travelLoan.getTraveller());
				map.put("travelDest", travelLoan.getTravelDest());
				map.put("travelFee", travelLoan.getTravelFee());
				map.put("leaderApprove", travelLoan.getLeaderApprove());
				map.put("financeApprove", travelLoan.getFinanceApprove());
				return map;
			}
		}
		return null;
	}
}

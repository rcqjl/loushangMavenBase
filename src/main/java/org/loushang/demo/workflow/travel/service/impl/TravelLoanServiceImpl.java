package org.loushang.demo.workflow.travel.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.loushang.demo.workflow.travel.dao.TravelLoanMapper;
import org.loushang.demo.workflow.travel.data.TravelLoan;
import org.loushang.demo.workflow.travel.service.ITravelLoanService;
import org.loushang.framework.util.UUIDGenerator;
import org.loushang.workflow.api.WfQuery;
import org.loushang.workflow.api.WfTaskLoginContext;
import org.loushang.workflow.api.WfTaskRequestWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("travelLoanService")
public class TravelLoanServiceImpl implements ITravelLoanService {

	@Autowired
	private TravelLoanMapper travelLoanMapper;

	public String getUuid(){
		return UUIDGenerator.getUUID();
	}
	
	public TravelLoan getTravelLoan(String id){
		return travelLoanMapper.get(id);
	}
	
	/*
	 * 创建流程
	 */
	@Transactional
	public void create(TravelLoan travelLoan, String procDefUniqueId, String startActDefUniqueId) {
		travelLoan.setId(getUuid());
		travelLoanMapper.insert(travelLoan);
		
		Map<String, String> context = new HashMap<String, String>();
		context.put("dataId", travelLoan.getId());
		context.put("moneyCount", travelLoan.getTravelFee());
		
		String subjectKey = WfQuery.getProcessSubjectKeyByProcDefUniqueId(procDefUniqueId);
		context.put(subjectKey, travelLoan.getTraveller());
		
		WfTaskLoginContext.getInstance().create(procDefUniqueId, startActDefUniqueId, context);
	}

	 /*
     * 创建并发送流程
     */
	@Transactional
	public void createAndSend(TravelLoan travelLoan, String procDefUniqueId, String startActDefUniqueId) {
		travelLoan.setId(getUuid());
		travelLoanMapper.insert(travelLoan);
		
		Map<String, String> context = new HashMap<String, String>();
		context.put("dataId", travelLoan.getId());
		context.put("moneyCount", travelLoan.getTravelFee());
		
		String subjectKey = WfQuery.getProcessSubjectKeyByProcDefUniqueId(procDefUniqueId);
		context.put(subjectKey, travelLoan.getTravelDest());
		
		WfTaskLoginContext.getInstance().createAndSend(procDefUniqueId, startActDefUniqueId, null, context);
	}
	
    /*
    * 发送流程
    */	
	@Transactional
	public void send(TravelLoan travelLoan, String assignmentId) {
		String pk = travelLoan.getId();
		
		if((pk == null) || ("".equals(pk))) {
			travelLoan.setId(getUuid());
			travelLoanMapper.insert(travelLoan);
		} else {
			travelLoanMapper.update(travelLoan);
		}
		Map<String, String> context = new HashMap<String, String>();
		context.put("dataId", travelLoan.getId());
		context.put("moneyCount", travelLoan.getTravelFee());
		
		WfTaskLoginContext.getInstance().send(assignmentId, null, context);
	}
	
    /*
    * 回退流程
    */	
	@Transactional
	public void back(TravelLoan travelLoan, String assignmentId) {
		String pk = travelLoan.getId();
		if ((pk == null) || ("".equals(pk))) {
			travelLoan.setId(getUuid());
			travelLoanMapper.insert(travelLoan);
		} else {
			travelLoanMapper.update(travelLoan);
		}
		Map<String, String> context = new HashMap<String, String>();
		context.put("dataId", travelLoan.getId());
		context.put("moneyCount", travelLoan.getTravelFee());
		
		WfTaskLoginContext.getInstance().back(assignmentId, null, context);
	}

    /*
     * 撤回流程
     */
	@Transactional
	public void revoke(TravelLoan travelLoan, String assignmentId) {
		String pk = travelLoan.getId();
		if ((pk == null) || ("".equals(pk))) {
			travelLoan.setId(getUuid());
			travelLoanMapper.insert(travelLoan);
		} else {
			travelLoanMapper.update(travelLoan);
		}
		Map<String, String> context = new HashMap<String, String>();
		context.put("dataId", travelLoan.getId());
		context.put("moneyCount", travelLoan.getTravelFee());
		
		//WfTaskRequestWrapper.getInstance().revoke();	
		WfTaskLoginContext.getInstance().revoke(assignmentId);
	}

    /*
     * 更新流程
     *  更新表单业务信息和流程标题
     */
	@Transactional
	public void update(TravelLoan travelLoan, String assignmentId) {
		String pk = travelLoan.getId();
		if((pk == null) || ("".equals(pk))) {
			travelLoan.setId(getUuid());
			travelLoanMapper.insert(travelLoan);
		} else {
			travelLoanMapper.update(travelLoan);
		}
		String subject = travelLoan.getTraveller();
		
		WfTaskRequestWrapper.getInstance().updateDefaultTaskListSubjectByAssignmentId(assignmentId, subject);
	}
}

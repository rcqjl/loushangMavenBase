package org.loushang.demo.workflow.travel.service;

import org.loushang.demo.workflow.travel.data.TravelLoan;

public interface ITravelLoanService {

    // 创建流程
	void create(TravelLoan paramTravelLoan, String procDefUniqueId, String startActDefUniqueId);

	// 创建并发送流程
	void createAndSend(TravelLoan paramTravelLoan, String procDefUniqueId, String startActDefUniqueId);

	// 发送流程
	void send(TravelLoan paramTravelLoan, String assignmentId);

	// 更新
	void update(TravelLoan paramTravelLoan, String assignmentId);

	// 回退流程
	void back(TravelLoan paramTravelLoan, String assignmentId);

	// 撤回流程
	void revoke(TravelLoan paramTravelLoan, String assignmentId);

	TravelLoan getTravelLoan(String id);
}

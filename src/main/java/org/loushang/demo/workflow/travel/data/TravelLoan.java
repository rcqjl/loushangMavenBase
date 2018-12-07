package org.loushang.demo.workflow.travel.data;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="DEMO_WF_TRAVEL")
public class TravelLoan implements Serializable {
	
	@Id
	private String id;
	
	@Column(name="TRAVELLER")
	private String traveller;
	
	@Column(name="TRAVEL_DEST")
	private String travelDest;
	
	@Column(name="TRAVEL_FEE")
	private String travelFee;
	
	@Column(name="LEADER_APPROVE")
	private String leaderApprove;
	
	@Column(name="FINANCE_APPROVE")
	private String financeApprove;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTraveller() {
		return traveller;
	}

	public void setTraveller(String traveller) {
		this.traveller = traveller;
	}

	public String getTravelFee() {
		return travelFee;
	}

	public void setTravelFee(String travelFee) {
		this.travelFee = travelFee;
	}

	public String getTravelDest() {
		return travelDest;
	}

	public void setTravelDest(String travelDest) {
		this.travelDest = travelDest;
	}

	public String getLeaderApprove() {
		return leaderApprove;
	}

	public void setLeaderApprove(String leaderApprove) {
		this.leaderApprove = leaderApprove;
	}

	public String getFinanceApprove() {
		return financeApprove;
	}

	public void setFinanceApprove(String financeApprove) {
		this.financeApprove = financeApprove;
	}

}
	if (typeof WFBizForm == "undefined") {
		WFBizForm = {};
	}
	WFBizForm.releaseModel=function(procDefUniqueIds){
		var command = new L5.Command(
		"org.loushang.workflow.infoprocessmodel.bizform.cmd.ProcDefCmd");
		command.setParameter("procDefUniqueIds",procDefUniqueIds);
		command.execute("release");
		if (command.error) {
			var error={"error":command.error};
			return error;
		}
	}
	WFBizForm.deleteModel=function(procDefUniqueIds){
		var command = new L5.Command(
		"org.loushang.workflow.infoprocessmodel.bizform.cmd.ProcDefCmd");
		command.setParameter("procDefUniqueIds",procDefUniqueIds);
		command.execute("delete");
		if (command.error) {
			var error={"error":command.error};
			return error;
		}
	}
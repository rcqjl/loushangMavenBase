	if (typeof WForm == "undefined") {
		WForm = {};
	}
	WForm.releaseModel=function(procDefUniqueIds){
		var command = new L5.Command(
		"org.loushang.workflow.infoprocessmodel.form.cmd.ProcDefCmd");
		command.setParameter("procDefUniqueIds",procDefUniqueIds);
		command.execute("release");
		if (command.error) {
			var error={"error":command.error};
			return error;
		}
	}
	WForm.deleteModel=function(procDefUniqueIds){
		var command = new L5.Command(
		"org.loushang.workflow.infoprocessmodel.form.cmd.ProcDefCmd");
		command.setParameter("procDefUniqueIds",procDefUniqueIds);
		command.execute("delete");
		if (command.error) {
			var error={"error":command.error};
			return error;
		}
	}
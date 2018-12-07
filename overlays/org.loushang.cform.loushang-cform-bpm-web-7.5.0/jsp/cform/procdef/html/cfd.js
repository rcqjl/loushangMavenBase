if (typeof CFlow == "undefined") {
	CFlow = {};
}
	CFlow.releaseModel=function(procDefUniqueIds){
		var command = new L5.Command(
		"org.loushang.cform.procdef.html.cmd.ProcDefCmd");
		command.setParameter("procDefUniqueIds",procDefUniqueIds);
		command.execute("release");
		if (command.error) {
			var error={"error":command.error};
			return error;
		}
	}
	CFlow.deleteModel=function(procDefUniqueIds){
		var command = new L5.Command(
		"org.loushang.cform.procdef.html.cmd.ProcDefCmd");
		command.setParameter("procDefUniqueIds",procDefUniqueIds);
		command.execute("delete");
		if (command.error) {
			var error={"error":command.error};
			return error;
		}
	}
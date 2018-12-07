var retObj={}
var fromParentParam = window.parent.document.getElementById("popupFrame1").inParam;
var dataObject=new Array();
$(function(){
	if(fromParentParam.fieldId){
		var div1=$("<div />").text(fromParentParam.fieldName).append($("<div/>").addClass("delImage").hide().click(function(){
			var id=$("#floatConfirmDiv div").has(this).attr("id");
			$("#floatConfirmDiv div").has(this).remove();
			$("#floatRightDiv div[id='"+id+"']").children("input").prop("checked",false);
		})).attr("id",fromParentParam.fieldId);
		$("#floatConfirmDiv").append(div1);
		$(div1).width($(div1).width()+20);
		$(div1).hover(function(){
			$(this).children("div").show();
		},function(){
			$(this).children("div").hide();
		});
		dataObject[fromParentParam.fieldId]=fromParentParam.fieldName;
	}
	if(fromParentParam.isdefault){
		$(".floatFooter > div:eq(0)").show();
		$(".floatFooter > div:eq(0)").height(100);
		$(".floatFooter").height(100);
		$("#union input").val(fromParentParam.refSubjectJoin);
		var fields=fromParentParam.refSubjectField.split("#");
		for(var n in fields){
			if(fields[n]=="") continue;
			var div2=$("<div />").text(fields[n].split(":")[1]).append($("<div/>").addClass("delImage").hide().click(function(){
				var id=$("#floatConfirmDiv div").has(this).attr("id");
				$("#floatConfirmDiv div").has(this).remove();
				$("#floatRightDiv div[id='"+id+"']").children("input").prop("checked",false);
			})).attr("id",fields[n].split(":")[0]);
			$(div2).hover(function(){
				$(this).children("div").show();
			},function(){
				$(this).children("div").hide();
			});
			$("#floatConfirmDiv").append(div2);
			$(div2).width($(div2).width()+20);
			dataObject[fields[n].split(":")[0]]=fields[n].split(":")[0];
		}
	}
	$.ajax({
				type : "POST",
				url : WFlow.fullWebPath
						+ "/command/dispatcher/"
						+ "org.loushang.cform.procdef.html.cmd.FormDispatcherCmd/"
						+ "getFormArea",
				data : {
					"formId" : fromParentParam.formId
				},
				dataType : "json",
				async : false,
				success : function(data) {
					showFormArea1(data);
				},
				error : function() {
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D228","请求信息出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);

				}
			});
	
	function showFormArea1(data){
		var setting = {
				view : {
					showLine : true,
					showIcon : true
				},
				callback:{
					onClick:onClick
				}
			};
		var zNodes = new Array();
		root={};
		root.id=data.form.id;
		root.name=data.form.name;
		root.children=getChildren(root,data.form.childNodes);
		
		
		zNodes[0] = root;
		$.fn.zTree.init($("#tree"), setting, root.children);
		treeObj = $.fn.zTree.getZTreeObj("tree");
		$("#tree_1_ico").trigger("click");
		treeObj.expandAll(true);

	}
	
	function onClick(event, treeId, treeNode, clickFlag) {
			initField(treeNode);
	}
	
	function initField(treeNode){
		if(treeNode.area){
			$("#floatRightDiv div").remove();
			for(var n in treeNode.area){
				var div=$("<div />").addClass("areaDiv").attr("id",treeNode.area[n].id);
				var checkbox=$("<input />").attr("type","checkbox");
				if(dataObject[treeNode.area[n].id]){
					$(checkbox).prop("checked",true);
				}
				var label=$("<label />").text(treeNode.area[n].name);
				$(div).append(checkbox).append(label);
				$("#floatRightDiv").append(div);
				$(checkbox).click(function(){
					if($(this).prop("checked")){
						if(fromParentParam.isdefault){
							
						}else{
							$("input[type='checkbox']").prop("checked",false);
							$(this).prop("checked",true);
							$("#floatConfirmDiv div").remove();
						}
						delete dataObject[$("#floatRightDiv div").has(this).attr("id")];
						$('#floatConfirmDiv div[id="'+$("#floatRightDiv div").has(this).attr("id")+'"]').remove();
						dataObject[$("#floatRightDiv div").has(this).attr("id")]=$("#floatRightDiv div").has(this).children("label").text();
						var div1=$("<div />").text($("#floatRightDiv div").has(this).children("label").text()).append($("<div/>").addClass("delImage").hide().click(function(){
							var id=$("#floatConfirmDiv div").has(this).attr("id");
							$("#floatConfirmDiv div").has(this).remove();
							$("#floatRightDiv div[id='"+id+"']").children("input").prop("checked",false);
						})).attr("id",$("#floatRightDiv div").has(this).attr("id"));
						$(div1).hover(function(){
							$(this).children("div").show();
						},function(){
							$(this).children("div").hide();
						});
						$("#floatConfirmDiv").append(div1);
						$(div1).width($(div1).width()+20);
					}else{
						delete dataObject[$("#floatRightDiv div").has(this).attr("id")];
						$('#floatConfirmDiv div[id="'+$("#floatRightDiv div").has(this).attr("id")+'"]').remove();
					}
				});
			}
		}else{
			$("#floatRightDiv div").remove();
		}
	}
	function getChildren(parent,nodes){
		var children=new Array();
		for(var n in nodes){
			if(nodes[n].subform){
				children.push(getChild1(nodes[n]));
			}else{
				if(typeof parent.area=='undefined'){
					parent.area=new Array();
				}
				parent.area.push(getField(nodes[n]));
			}
		}
		return children;
	}
	
	function getChild1(node){
		var child=new Object();
		child.id=node.subform.id;
		child.name=node.subform.name;
		child.children=getChildren(child,node.subform.childNodes);
		return child;
	}
	
	function getField(node){
		var field=new Object();
		field.id=node.field.id;
		field.name=node.field.name;
		field.children=node.field.childNodes;
		return field;
	}
	
	$("#confirm").click(function(){
		var name="";
		var id="";
		var nameInfo="";
		if(fromParentParam.isdefault){
			var divs=$("#floatConfirmDiv > div");
			if(divs.length>1){
				if($("#union input").val()){
					retObj.refSubjectJoin=$("#union input").val();
				}else{
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D229","请设置连接符！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
					$("#union input").focus();
					return false;
				}
			}else{
				retObj.refSubjectJoin="";
			}
		}else{
			retObj.refSubjectJoin="";
		}
		$("#floatConfirmDiv > div").each(function(){
			if(fromParentParam.isdefault){
				if(name){
					nameInfo+=retObj.refSubjectJoin;
					nameInfo+=$(this).text();
					name+=("#"+$(this).text());
					id+=("#"+$(this).attr("id")+":"+$(this).text());
				}else{
					nameInfo+=$(this).text();
					name+=$(this).text();
					name+=$(this).text();
					id+=$(this).attr("id")+":"+$(this).text();
				}
			}else{
				name=$(this).text();
				id=$(this).attr("id");	
			}
			
			
		});
		retObj.name=name;
		retObj.id=id;
		retObj.nameInfo=nameInfo;
		closeDialog1(retObj);
	});
	$("#cancel").click(function(){
		closeDialog1();
	});
});
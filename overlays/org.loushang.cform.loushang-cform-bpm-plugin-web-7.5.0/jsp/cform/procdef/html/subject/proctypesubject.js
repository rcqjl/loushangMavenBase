var retObj={}
var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var root;
var trindex;
$(function() {
	showSubject(fromParentParam.data)
	function showSubject(data){
		for(var n in data){
			var li=$("<li></li>")
				.append($("<label></label>").text(data[n].name+":"))
				.append($("<input />").attr("type","text").keydown(function(){
					return false;
				}))
				.append($("<input />").attr("type","button").val(L.getLocaleMessage("CForm.BPM.D278","设置")).addClass("rconfirm").click(function(){
					trindex=$(this).parent().index();
					var fieldId="";
					var fieldName="";
					var li=$("ul li").has(this);
					if($(li).children(":eq(1)").attr("id")){
						fieldId=$(li).children(":eq(1)").attr("id");
						fieldName=$(li).children(":eq(1)").val();
					}
					var param={formId:fromParentParam.formId,fieldId:fieldId,fieldName:fieldName};
					setButton=$(this);
					parent.SD_Dialog.showAreaDiv(param);
				}))
				.append($("<button />").text(L.getLocaleMessage("CForm.BPM.D279","清除")).addClass("rreset").click(function(){
					$(this).parent().children(":eq(1)").val("").attr("id","");
				}))
				.attr("id",data[n].id);
			$("ul").append(li);
		}
		var subjects=fromParentParam.subjects;
		for(var n in subjects){
			//if(subjects[n].type!="procType") continue;
			$("#"+subjects[n].subjectKey+" input:eq(0)").val(subjects[n].fieldName).attr("id",subjects[n].fieldId);
		}
	};
	$("#confirm").bind("click",function(){
		var retArr=new Array();
		var nameInfo="";
			var lis=$(".show li");
			for(var i=0;i<lis.length;i++){
				if($(lis[i]).children(":eq(1)").val()=="") continue;
				var obj=new Object();
				obj.fieldId=$(lis[i]).children(":eq(1)").attr("id");
				obj.fieldName=$(lis[i]).children(":eq(1)").val();
				obj.subjectKey=$(lis[i]).attr("id");
				obj.subjectAlias=$(lis[i]).children(":eq(0)").text().substring(0,$(lis[i]).children(":eq(0)").text().length-1);
				nameInfo+=obj.subjectAlias+"-"+obj.fieldName+";";
				retArr.push(obj);
			}
			retObj=retArr;
			retObj['nameInfo']=nameInfo.substring(0,nameInfo.length-1);
			closeDialog(retObj);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	
	/*function showFormArea1(data){
		var setting = {
				view : {
					showLine : true,
					showIcon : false
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
		//初始化已选择域
			var subjects=fromParentParam.subjects;
				for(var n in subjects){
					if(subjects[n].type!="procType") continue;
					$("#"+subjects[n].subjectKey+" input:eq(0)").val(subjects[n].fieldName).attr(subjects[n].fieldId);
				}
			$(".rightMain tbody tr").removeClass("odd");
			$(".rightMain tbody tr:odd").addClass("odd");
			$("#tree_1_ico").trigger("click");
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
	
	function onClick(event, treeId, treeNode, clickFlag) {
			initField1(treeNode);
	}
	function initField1(treeNode){
		if(treeNode.area){
			$(".rightMain tbody tr").remove();
			for(var n in treeNode.area){
				var tr=$("<tr></tr>");
				$(tr).append($("<td></td>").text(treeNode.area[n].name));
				$(tr).attr("id",treeNode.area[n].id);
				$(".rightMain tbody").append(tr);
			}
			$(".rightMain tbody tr:odd").addClass("odd");
			$(".rightMain tbody tr").click(function(){
				$(".rightMain tbody tr").removeClass("selected");
				$(this).addClass("selected");
			});
		}else{
			$(".rightMain tbody tr").remove();
		}
	}*/
	if(typeof parent.SD_Dialog == "undefined"){
		parent.SD_Dialog={};
	}
	parent.SD_Dialog.showAreaDiv=function(param){
		var url=parent.CFlow.webPath+"/jsp/cform/procdef/html/form/formarea.jsp";
		parent.SD_Dialog.showWindow1(L.getLocaleMessage("CForm.BPM.D211","选择表单域"), url, 500, 390,param, afterCloseForm1);
		function afterCloseForm1(backData){
			if(backData&&backData.id){
				var li=$("ul li:eq("+trindex+")");
				$(li).children(":eq(1)").attr("id",backData.id);
				$(li).children(":eq(1)").val(backData.name);
			}
		}
	}
});
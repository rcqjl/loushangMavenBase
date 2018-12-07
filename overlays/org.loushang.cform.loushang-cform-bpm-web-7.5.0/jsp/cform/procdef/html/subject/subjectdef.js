var retObj={}
var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var root;
var dataArray=new Array();
var setButton=null;
$(function() {
	function getDiv(){
		var divDel=$("<div></div>").addClass("delImage");
		$(divDel).bind("click",delImg);
		var divUp=$("<div></div>").addClass("upImage");
		$(divUp).click(function(){
			var tr=$("tbody tr").has(this);
			$(tr).insertBefore($(tr).prev());
		});
		var divDown=$("<div></div>").addClass("downImage");
		$(divDown).click(function(){
			var tr=$("tbody tr").has(this);
			$(tr).insertAfter($(tr).next());
		});
		return $("<div></div>").addClass("opt").append(divDown).append(divUp).append(divDel);
	}
	var newLine=function(){
		var index=$(" tbody tr").length+1;
		var tr=$("<tr></tr>")
					.append($("<td></td>").css({
						"padding-left":"10px"
					}).append($("<input />").attr("type","text").bind("blur",checkTitle)))
					.append($("<td></td>").append($("<input />").attr("type","text").val(150).keydown(function(e){
						if((e.keyCode<48  || e.keyCode>57) && e.keyCode!=8){
							return false;
						}
					})))
					.append($("<td></td>")
							.append($("<input />").attr("type","checkbox").bind("click",function(){
								if($(this).prop("checked")){
									$(this).next("div").show();
								}else{
									$(this).next("div").hide();
								}
							}))
							.append($("<div />").hide().append($("<label />").text(L.getLocaleMessage("CForm.BPM.D280","显示顺序"))).append($("<input />").css({
								'width':'20px',
								'border':'none',
								'border-bottom':'1px solid #dcdcdc',
								'display':'inline-block'
							}))
									))
					.append($("<td></td>").append($("<input />").attr("type","button").val(L.getLocaleMessage("CForm.BPM.D281","点击此处设置")).css({
						"color":"#A5A5A3",
						"font-size":"12px"
					}).click(floatDiv)))
					.append($("<td></td>").append(getDiv()));
		$(tr).hover(function(){
			$(this).children("td:eq(2)").children("div").children("input").addClass("hover");
			
			$(this).children().each(function(){
				$(this).addClass("hover");
				$(this).children().each(function(){
					$(this).addClass("hover");
				});
			});
		},function(){
			$(this).children("td:eq(2)").children("div").children("input").removeClass("hover");
			$(this).children().each(function(){
				$(this).removeClass("hover");
				$(this).children().each(function(){
					$(this).removeClass("hover");
				});
			});
		});
		$(" tbody").append(tr);
		$(" tbody tr:odd").addClass("odd");
		$(" tbody tr:odd td").children().addClass("odd");
	}
	
	var floatDiv=function(){
		var fieldId="";
		var fieldName="";
		if($(this).attr("id")){
			fieldId=$(this).attr("id");
			fieldName=$(this).val();
		}
		var param={formId:fromParentParam.formId,fieldId:fieldId,fieldName:fieldName};
		setButton=$(this);
		parent.SD_Dialog.showFloatDiv(param);
	}
	
	//标题定义删除按钮事件
	var delImg=function (){
		var tr=$(" tbody tr").has(this);
		var data=$(tr).children(":eq(0)").children(":eq(0)").val();
		if(data!=""){
			data=parent.WFlow.getPinyin(data);
		var trs=$("#con2 .rightTableArea tbody tr");
		
		//判断该标题在流程级别是否绑定域
		for(var n=0;n<trs.length;n++){
			if($(trs[n]).children(":eq(0)").attr("id")==data){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D282","该标题在流程中已设置关联，不能删除！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				return false;
			};
		}
		
		//判断该标题在环节级别是否绑定域
		var activities=parent.CFProcess.activities;
		for(var n in activities.childList){
			if(n=="") continue;
			var activity=activities.childList[n];
			if(activity.subjects && activity.subjects.childList){
				for(var n in activity.subjects.childList){
					var subject = activity.subjects.childList[n];
					if(data==subject.subjectKey){
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D284","该标题在[")+activity.name+L.getLocaleMessage("CForm.BPM.D283","]中已设置关联，不能删除！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
						return false;
					}
				}
			}
		}
		var tr=$(" tbody tr").has(this);
		var data=$(tr).children(":eq(0)").children(":eq(0)").val();
			delete dataArray[data];
		}
		$(" tbody tr").has(this).remove();
		$(" tbody tr").removeClass("odd");
		$(" tbody tr td").children().removeClass("odd");
		$(" tbody tr:odd").addClass("odd");
		$(" tbody tr:odd td").children().addClass("odd");
	}
	//检测标题合法性
	var checkTitle=function (){
		var data=parent.WFlow.getPinyin($(this).val());
		if($(this).val()=="" || data==$(this).attr("id")) return false;
		if(dataArray[data]==null){
			dataArray[data]=$(this).val();
			$(this).attr("id",data);
		}else{
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D285","该显示名称与其他名称发生冲突,请重设"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			$(this).val("");
			$(this).focus();
			return false;
		}
	}
	//添加按钮点击事件
	$("#add").click(function(){
		newLine();
	});
	$(".addImg1").click(function(){
		newLine();
	});
	//如果是流程类型标题设置，则加载相应标题
	if(fromParentParam.isShow){
		var defs=fromParentParam.defs;
		for(var n in defs){
			var tr=$("<tr></tr>");
			$(tr).append($("<td></td>").css({
				"padding-left":"10px"
			}).append($("<input />").attr({"type":"text","id":defs[n].subjectKey}).val(defs[n].subjectAlias).bind("blur",checkTitle)));
			$(tr).append($("<td></td>").append($("<input />").attr("type","text").val(defs[n].subjectWidth).keydown(function(e){
				if((e.keyCode<48  || e.keyCode>57) && e.keyCode!=8){
					return false;
				}
			})));
			$(tr).append($("<td></td>").append($("<input />").attr("type","checkbox").prop("checked",defs[n].isQueryCondition).bind("click",function(){
				if($(this).prop("checked")){
					$(this).next("div").show();
				}else{
					$(this).next("div").hide();
				}
			})).append($("<div />").hide().append($("<label />").text(L.getLocaleMessage("CForm.BPM.D280","显示顺序"))).append($("<input />").css({
				'width':'20px',
				'border':'none',
				'border-bottom':'1px solid #dcdcdc',
				'display':'inline-block'
			}).val(defs[n].subjectOrder2))));
			$(tr).append($("<td></td>").append($("<input />").attr("type","button").val(L.getLocaleMessage("CForm.BPM.D281","点击此处设置")).css({
				"color":"#A5A5A3",
				"font-size":"12px"
			}).click(floatDiv)));
			$(tr).append($("<td></td>").append(getDiv()));
			$(tr).hover(function(){
				$(this).children("td:eq(2)").children("div").children("input").addClass("hover");
				$(this).children().each(function(){
					$(this).addClass("hover");
					$(this).children().each(function(){
						$(this).addClass("hover");
					});
				});
			},function(){
				$(this).children("td:eq(2)").children("div").children("input").removeClass("hover");
				$(this).children().each(function(){
					$(this).removeClass("hover");
					$(this).children().each(function(){
						$(this).removeClass("hover");
					});
				});
			});
			$(".defTable tbody").append(tr);
			if(defs[n].isQueryCondition){
				$(tr).children("td:eq(2)").children("div").show();
			}
			dataArray[defs[n].subjectKey]=defs[n].subjectAlias;
		}
		
		var subjects=fromParentParam.subjects;
		for(var n in subjects){
			if(subjects[n].type!="proc") continue;
			var tr=$(".defTable tbody tr").has('td input[id="'+subjects[n].subjectKey+'"]');
			$(tr).children(":eq(3)").children(":eq(0)").val(subjects[n].fieldName).attr("id",subjects[n].fieldId);
		
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
					//showFormArea1(data);
				},
				error : function() {
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D228","请求信息出错"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);

				}
			});
	
	$("#confirm").bind("click",function(){
		
		if(fromParentParam.isShow){
			var retArr=new Array();
			var retArr2=new Array();
			var retArr3=new Array();
			var trs=$(".defTable tbody tr");
			var nameInfo="";
			for(var i=0;i<trs.length;i++){
				if($(trs[i]).children(":eq(0)").children(":eq(0)").val()=="") continue;
				//流程定义
				var obj1=new Object();
				obj1.subjectAlias=$(trs[i]).children(":eq(0)").children(":eq(0)").val();
				obj1.subjectKey=$(trs[i]).children(":eq(0)").children(":eq(0)").attr("id");
				obj1.subjectOrder=i+1;
				obj1.subjectWidth=$(trs[i]).children(":eq(1)").children(":eq(0)").val();
				obj1.isQueryCondition=$(trs[i]).children(":eq(2)").children(":eq(0)").prop("checked");
				retArr2.push(obj1);
				var index=$(trs[i]).children(":eq(2)").children("div").children("input").val();
				if(obj1.isQueryCondition && index!=""){
					var obj2=new Object();
					obj2.index="0";
					obj2.subjectKey=obj1.subjectKey;
					obj2.subjectAlias=obj1.subjectAlias;
					obj2.subjectOrder=index;
					obj2.subjectFieldType="TEXT";
					retArr3.push(obj2);
				}
				//流程关联设置
				if($(trs[i]).children(":eq(3)").children(":eq(0)").attr("id")){
					obj=new Object();
					obj.fieldId=$(trs[i]).children(":eq(3)").children(":eq(0)").attr("id");
					obj.fieldName=$(trs[i]).children(":eq(3)").children(":eq(0)").val();
					obj.subjectKey=$(trs[i]).children(":eq(0)").children(":eq(0)").attr("id");
					obj.subjectAlias=$(trs[i]).children(":eq(0)").children(":eq(0)").val();
					nameInfo+=obj.subjectAlias+"-"+obj.fieldName+";"
					retArr.push(obj);
				}
			}
			retObj.retArr=retArr;
			retObj.retArr2=retArr2;
			retObj.retArr3=retArr3;
			retObj.nameInfo=nameInfo.substring(0,nameInfo.length-1);
		}else{
			if($(".rightTableArea tbody tr").length>1 && $(".joinLabelArea input").val()==""){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D229","请设置连接符"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				return false;
			}
			var refSubjectJoin=$(".joinLabelArea input").val();
			var refSubjectField="";
			var trs=$(".rightTableArea tbody tr");
			if(trs.length>1){
				refSubjectField=$(trs[0]).attr("id")+":"+$(trs[0]).children(":eq(0)").text();
				for(var i=1;i<trs.length;i++){
					refSubjectField+="#"+$(trs[i]).attr("id")+":"+$(trs[i]).children(":eq(0)").text();
				}
			}else if(trs.length==1){
				refSubjectField=$(trs[0]).attr("id")+":"+$(trs[0]).children(":eq(0)").text();
			}
			retObj.refSubjectJoin=refSubjectJoin;
			retObj.refSubjectField=refSubjectField;
		}	
		closeDialog(retObj);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	
	function showFormArea1(data){
		var setting = {
				view : {
					showLine : false,
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
		//初始化已选择域
		if(fromParentParam.isShow){
			var subjects=fromParentParam.subjects;
			for(var n in subjects){
				if(subjects[n].type!="proc") continue;
				var tr=$(".defTable tbody tr").has('td input[id="'+subjects[n].subjectKey+'"]');
				$(tr).children(":eq(5)").children(":eq(0)").val(subjects[n].subjectAlias).attr("id",subjects[n].subjectKey);
			
			}
		}else{
			$(".joinLabelArea input").val(fromParentParam.refSubjectJoin);
			if(fromParentParam.refSubjectJoin!=null&&fromParentParam.refSubjectField!=""){
				var field=fromParentParam.refSubjectField.split("#");
				for(var n in field){
					var fields=field[n].split(":");
					$(".rightTableArea tbody")
					.append($("<tr></tr>")
							.append($("<td></td>").text(fields[1]))
							.append($("<td></td>").append($("<img/>").attr("src",WFlow.fullWebPath+"/jsp/cform/procdef/html/skin/images/del.jpg")))
							.attr("id",fields[0]));
				}
				$(".rightTableArea img").click(function(){
					$(".rightTableArea tr").has(this).remove();
					$(".rightTableArea tbody tr").removeClass("odd");
					$(".rightTableArea tbody tr:odd").addClass("odd");
				});
				$(".rightTableArea tbody tr").removeClass("odd");
				$(".rightTableArea tbody tr:odd").addClass("odd");
			}
		}
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
		if(fromParentParam.isShow){
			initField1(treeNode);
		}else{
			initField(treeNode);
		}
		
	}
	function initField1(treeNode){
		if(treeNode.area){
			$(".leftTableArea tbody tr").remove();
			for(var n in treeNode.area){
				var tr=$("<tr></tr>");
				$(tr).append($("<td></td>").text(treeNode.area[n].name));
				$(tr).append($("<td></td>").append($("<img/>").attr("src",WFlow.fullWebPath+"/jsp/cform/procdef/html/skin/images/add.jpg")));
				$(tr).attr("id",treeNode.area[n].id);
				$(".leftTableArea tbody").append(tr);
			}
			$(".leftTableArea tbody tr:odd").addClass("odd");
			$(".leftTableArea tbody tr").click(function(){
				$(".leftTableArea tbody tr").removeClass("selected");
				$(this).addClass("selected");
			});
			$(".leftTableArea img").click(function(){
				if($("#con2 select").val()==null){
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D286","请选择标题"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);

					return false;
				}
				
				var tr=$("tr").has(this);
				var trs=$(".rightTableArea tbody tr");
				for(var i =0;i<trs.length;i++){
					if($(trs[i]).children("td:eq(0)").attr("id")==$("#con2 select").val()){
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D287","标题[")+$("#con2 select").children("option:selected").text()+L.getLocaleMessage("CForm.BPM.D288","]已添加关联!"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
						return false;
					}
				}
				var trr=$(tr).clone();
				$(trr).removeClass("selected");
				$(trr).prepend($("<td></td>").text($("#con2 select").children("option:selected").text()).attr("id",$("#con2 select").val()));
				var image=$(trr).children("td").children("img");
				$(image).attr("src",WFlow.fullWebPath+"/jsp/cform/procdef/html/skin/images/del.jpg")
				$(image).unbind("click");
				$(image).click(function(){
					$(".rightTableArea tr").has(this).remove();
					$(".rightTableArea tbody tr").removeClass("odd");
					$(".rightTableArea tbody tr:odd").addClass("odd");
				});
				$(".rightTableArea tbody").append(trr);
				$(".rightTableArea tbody tr").removeClass("odd");
				$(".rightTableArea tbody tr:odd").addClass("odd");
				
			});
		}else{
			$(".leftTableArea tbody tr").remove();
		}
	}
	function initField(treeNode){
		if(treeNode.area){
			$(".leftTableArea tbody tr").remove();
			for(var n in treeNode.area){
				var tr=$("<tr></tr>");
				$(tr).append($("<td></td>").text(treeNode.area[n].name));
				$(tr).append($("<td></td>").append($("<img/>").attr("src",WFlow.fullWebPath+"/jsp/cform/procdef/html/skin/images/add.jpg")));
				$(tr).attr("id",treeNode.area[n].id);
				$(".leftTableArea tbody").append(tr);
			}
			$(".leftTableArea tbody tr:odd").addClass("odd");
			$(".leftTableArea tbody tr").click(function(){
				$(".leftTableArea tbody tr").removeClass("selected");
				$(this).addClass("selected");
			});
			$(".leftTableArea img").click(function(){
				var tr=$("tr").has(this);
				var trs=$(".rightTableArea tbody tr");
				for(var i =0;i<trs.length;i++){
					if($(trs[i]).attr("id")==$(tr).attr("id")){
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D289","不能重复添加"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);

						return false;
					}
				}
				var trr=$(tr).clone();
				$(trr).removeClass("selected");
				var image=$(trr).children("td").children("img");
				$(image).attr("src",WFlow.fullWebPath+"/jsp/cform/procdef/html/skin/images/del.jpg")
				$(image).unbind("click");
				$(image).click(function(){
					$(".rightTableArea tr").has(this).remove();
					$(".rightTableArea tbody tr").removeClass("odd");
					$(".rightTableArea tbody tr:odd").addClass("odd");
				});
				$(".rightTableArea tbody").append(trr);
				$(".rightTableArea tbody tr").removeClass("odd");
				$(".rightTableArea tbody tr:odd").addClass("odd");
				
			});
		}else{
			$(".leftTableArea tbody tr").remove();
		}
	}
	function getArea(child,nodes,bindObj) {
		if(bindObj.childList==null){
			bindObj.childList={};
		}
		var area = new Array();
		for ( var n in nodes) {
			if(nodes[n].subform){
				if(nodes[n].subform.childNodes[0].subform){
					child.children = getChild(nodes[n].subform.childNodes,child.bindObj);
				}else{
					child.area=getArea(child,nodes[n].subform.childNodes,child.bindObj);
					
				}
			}else{
				var a = new Object();
				a.id = nodes[n].field.id;
				a.bindObj=new parent.CFField();
				a.bindObj.id=a.id;
				a.name = nodes[n].field.name;
				a.bindObj.name=a.name;
				a.bindObj.ttype="field";
				area[n] = a;
				bindObj.childList[n]=a.bindObj;
			}
			
		}
		return area;
	}
	if(typeof parent.SD_Dialog == "undefined"){
		parent.SD_Dialog={};
	}
	parent.SD_Dialog.showFloatDiv=function(param){
		var url=parent.CFlow.webPath+"/jsp/cform/procdef/html/form/formarea.jsp";
		parent.SD_Dialog.showWindow1(L.getLocaleMessage("CForm.BPM.D211","选择表单域"), url, 500, 390,param, afterCloseForm);
		function afterCloseForm(backData){
			if(backData&&backData.name){
				$(setButton).val(backData.name);
				$(setButton).attr("id",backData.id);	
			}else{
				$(setButton).val(L.getLocaleMessage("CForm.BPM.D281","点击此处设置"));
				$(setButton).attr("id","");
			}
			
		}
	}
	//默认新增一行
	newLine();
});
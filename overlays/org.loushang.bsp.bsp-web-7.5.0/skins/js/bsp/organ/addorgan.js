
$(function(){

	// 校验表单
		$("#organItemForm").uValidform({
			btnSubmit: "#saveVal",
			datatype:{ 
		          "valid_organType": valid_organType
		    },
		    
			callback: function(form){
				saveVal();
			}
		});

		// 取消按钮
		$("#cancel").click(function(){
			cancel();
		});
		
		
		//校验类型编码
		/*
		 * 1、以父结点id开头命名
		 * 2、去除空格、唯一性（从数据库中校对）
		 * gets: 参数gets是获取到的表单元素值
		 * obj: obj 为当前表单元素
		 * curform: curform为当前验证的表单
		 * regxp: regxp为内置的一些正则表达式的引用
		 */
		function valid_organType(gets, obj, curform, regxp){
			var msg1 = L.getLocaleMessage("bsp.organ.059","组织类型");
			var msg5 = L.getLocaleMessage("bsp.organ.063","类型编码已存在!");
			var organType = gets.replace(/[ ]/g,"");
			if(organType==null||organType==""){
				return false;
			}
			if(parentTypeName!=msg1){				
				var index=organType.indexOf(parentOrganType);
				if(index!=0){
					obj.attr("errormsg",L.getLocaleMessage("bsp.organ.060","请以父类型[{0}]的编码[{1}]开头", parentTypeName, parentOrganType));
					return false;
				}
			}
			var rtn = false;
			$.ajax({
				   type: "POST",
				   async: false,//默认是异步的，需要取消异步
				   url: context+"/service/bsp/organType/queryOrganType",
				   data: "organType="+organType,
				   success: function(flag){
					   if(flag=="1"){
						   obj.attr("errormsg",msg5);
						   rtn = false;
					   } else {
						   rtn = true;
					   }
				   }
				});				
			return rtn;
			
		}

		 // 保存
		function saveVal() {
			var url = context + "/service/bsp/organType/createOrganType";
			if(status == "update") {
				url = context + "/service/bsp/organType/updateOrganType?organType="+update_organType;
			}
			if($("#parentOrganType").val()=="rootId"){
				var organType=$("#organType").val();
				$("#parentOrganType").val(organType);
			}
			//jquery.form.js的ajaxSubmit使用
			$("#organItemForm").ajaxSubmit({
		        type: "post",
		        url: url,
		        error:function(data){
		            alert("error："+data);  
		        },
		        success:function(data){
		        	dialog.close(true);//关闭后会重新刷新页面
		    		dialog.remove();
		    		return false;
		        }  
		    });
			return false;
		} 

		// 取消
		function cancel() {
			dialog.close();
			dialog.remove();
			return false;
		}
})

	
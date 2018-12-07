<!DOCTYPE html> 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.bdr.fieldpropprev" text="属性批量预览"/></title>
		<link rel="stylesheet" href="../skin/css/ztree.css">
		<link rel="stylesheet" href="../skin/css/dialog.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/help.css" />
		<style type="text/css">
			body{
				overflow-y: hidden;	
				font-size: 14px;
			}
			#formTreeDiv{
				width: 250px;
				height: 325px;
				overflow-y: auto;
				border-right: 1px dashed #ccc;	
				
			}
			#fieldDiv{
				float: right;
				width: 250px;
				height: 325px;
				border-right: 1px dashed #ccc;
			}
			#fieldDiv ul{
				list-style: none;
				padding-left: 0;
			}
			#fieldDiv li{
				line-height: 30px;	
			}
			#fieldDiv li label{
				display: block;	
			}
			#fieldDiv li input{
				display: block;	
			}
			ul.ztree{
				height: 315px;
			}
			#dynCheckDiv{
				float: right;
			    width: 270px;
			    height: 325px;
			    padding-left: 0;
			}
			#dynCheckDiv ul{
				list-style: none;
			    padding: 10px;
			    border: 1px solid #ddd;
			    margin: 10px;
			    height: 240px;
			}
			#dynCheckDiv li{
				line-height: 30px;
			    position: relative;
			    height: 70px;
			}
			#dynCheckDiv ul li input{
				display: inline-block;
			    width: 150px;
			    position: absolute;
			    top: 30px;
			    left: 70px;
			}
			#dynCheckDiv ul li select{
				display: inline-block;
			    width: 65px;
			    line-height: 20px;
			    position: absolute;
			    top: 30px;
			    left: 0px;
			    height: 20px;
			}
			#dynCheckDiv ul li select.dynCheckTarget{
				display: inline-block;
			    width: 154px;
			    line-height: 20px;
			    position: absolute;
			    top: 30px;
			    left: 70px;
			    height: 20px;
			}
			#dynCheckDiv ul li label{
				display: block;
			}
			#isDynCheckDiv {
			    line-height: 30px;
			    padding-left: 20px;
			}
		</style>
		<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
		<script src="../skin/js/jquery.ztree.js"></script>
		<script src="../skin/js/jquery.ztree.excheck.js"></script>
		<script src="../skin/js/jquery.ztree.exedit.js"></script>
		<script src="../skin/js/cform.showdialog.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/help/fieldattrpreview.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.configure.js"></script>
	</head>
	<body>
		<div id="dynCheckDiv">
			<div id="isDynCheckDiv">
			    <input type="checkbox" id="isDynCheck" name="isDynCheck" style="display: inline-block;">
				<label for="isDynCheck"><s:message code="cf.fieldrelation" text="域关联"/></label>
			</div>
			<ul id="dynCheckUl" style="display: none;">
				<li>
					<label><s:message code="cf.condition" text="条件"/></label>
				    <select id="dynCheckCondition" class="dynCheckCondition" name="dynCheckCondition">
				    	<option value=""><s:message code="cf.bdr.select" text="请选择"/></option>
				    	<option value="contains"><s:message code="cf.contains" text="包含"/></option>
				    	<option value="uncontains"><s:message code="cf.uncontains" text="不包含"/></option>
				    	<option value="matches"><s:message code="cf.matches" text="匹配"/></option>
				    	<option value=">">&gt;</option>
				    	<option value=">=">&gt;=</option>
				    	<option value="==">==</option>
				    	<option value="<=">&lt;=</option>
				    	<option value="<">&lt;</option>
				    	<option value="!=">!=</option>
				    </select>
				    <input placeholder="<s:message code="cf.inputvalue" text="输入值"/>" type="text" id="dynCheckValue" class="dynCheckValue" name="输入值">
				</li>
				<li>
					<label><s:message code="cf.action" text="动作"/></label>
					<select id="dynCheckAction" name="dynCheckAction">
						<option value=""><s:message code="cf.bdr.select" text="请选择"/></option>
						<option value="isReadOnly"><s:message code="cf.bdr.readonly" text="只读"/></option>
						<option value="isHidden"><s:message code="cf.hidden" text="隐藏"/></option>
						<option value="isRequired"><s:message code="cf.bdr.notnull" text="必填"/></option>
					</select>
				    <select name="目标域" id="dynCheckTarget" class="dynCheckTarget" name="dynCheckTarget"></select>
				</li>
			</ul>		
		</div>
		<div id="fieldDiv">
			<ul>
				<li>
					<label><s:message code="cf.bdr.fieldlength" text="域长度"/></label>
					<input type="text" name="域长度" id="fieldLength" class="cfIsNumber" maxlength=4/>
				</li>	
				<li style="color:#828282;font-size:12px;line-height:25px;">
					<p>
						<b><s:message code="cf.note" text="说明"/>：</b><br/>
						<s:message code="cf.bdr.fieldlengthnote" text="域长度即可输入最大字节数（值不能超过4000）。比如设为100，表示最多可输入100个英文字符，50个汉字字符"/>
					</p>
				</li>
				<li id="dataTypeLi" style="display:none;">
					<label><s:message code="cf.bdr.rule" text="验证规则"/></label>
					<select id="dataType" style="width: 205px;">
						<option value="default"><s:message code="cf.bdr.select" text="请选择"/></option>
						<option value="cfIsInteger"><s:message code="" text=""/><s:message code="cf.bdr.integer" text="整数"/></option>
						<option value="cfIsFloat"><s:message code="cf.bdr.decimal" text="小数"/></option>
						<option value="cfIsZipCode"><s:message code="cf.bdr.postcode" text="邮政编码"/></option>
						<option value="cfIsEmail"><s:message code="cf.bdr.email" text="电子邮件"/></option>
						<option value="cfIsPhoneNum"><s:message code="cf.bdr.phone" text="固定电话"/></option>
						<option value="cfIsMobileNum"><s:message code="cf.bdr.modilenum" text="手机号码"/></option>
						<option value="cfIsIdCard"><s:message code="cf.bdr.idnumber" text="身份证号"/></option>
						<option value="cfIsRegExp"><s:message code="cf.bdr.regular" text="正则表达式"/></option>
					</select>
				</li>
				<li id="precisionLi" style="display:none;">
					<label><s:message code="cf.bdr.precision" text="精确度"/></label>
					<input type="text" name="<s:message code="cf.bdr.precision" text="精确度"/>" id="precision" class="cfIsNumber" maxlength=4/>
				</li>
				<li id="regExpLi" style="display:none;">
					<label><s:message code="cf.bdr.expression" text="表达式"/></label>
					<input type="text" name="表达式" id="regExp" class="cfRegExp"/>
				</li>
				<li id="isReadOnlyLi" style="display:none;">
					<input id="isReadOnly" name="isReadOnly" type="checkbox" style="display:inline;"/>
					<label for="isReadOnly" style="display:inline;"><s:message code="cf.bdr.readonly" text="只读"/></label>
				</li>
				<li>
					<input id="isRequired" name="isRequired" type="checkbox" style="display:inline;"/>
					<label for="isRequired" style="display:inline;"><s:message code="cf.bdr.notnull" text="必填"/></label>
				</li>
			</ul>	
		</div>
		<div id="formTreeDiv">
			<ul id="formTree" class="ztree"></ul>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
	<script type="text/javascript">
	</script>
</html>
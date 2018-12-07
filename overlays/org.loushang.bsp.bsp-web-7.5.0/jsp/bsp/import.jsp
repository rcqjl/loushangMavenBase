<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>导入</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<style type="text/css">
		.body {
			height: 150px;
			border-bottom: 1px solid #ddd;
			padding-top:15px;
		}
		.col-xs-4 {
			width: 27%;
			padding: 0px;
			line-height: 30px;
		}
		.col-xs-7{
			padding: 0px;
		}
		.foot {
			height: 50px;
			padding: 9px;
		}
		.btnGroup {
			float: right;
		}
	</style>
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>

</head>
<body>
	<div class="contain-fluid">
		<div class="body">
			<form class="form-horizontal" action="" method="post">
				<div class="form-group">
					<label class="col-xs-4 text-right "><spring:message code="bsp.import.000" text="选择导入的文件："/></label>
					<div class="col-xs-7">
						<div class="input-group">
							<input class="form-control ue-form" type="text" placeholder="" id="filelist" readonly>
							<div class="input-group-addon ue-form-btn" id="inputfiles">
								<span class="fa fa-upload"></span>
							</div>
						</div>
						<ol style="margin-top: 10px; font-size: 12px; ">
							<li><label><spring:message code="bsp.import.001" text="请使用.zip格式的文件进行上传，"/></label></li>
							<li><label><spring:message code="bsp.import.002" text="包内使用.txt文件，内容为SQL语句，编码为UTF-8无BOM格式"/></label></li>
						</ol>
					</div>
				</div>
			</form>
		</div>
		<div class="foot">
			<div class="btnGroup">
				<button type="button" class="btn ue-btn-primary" id="returnBtn"><spring:message code="bsp.import.003" text="关闭"/></button>	
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">

	var context = "<l:assetcontext/>";
	var targetInfo = "${targetInfo}";
	var $dialog = parent.dialog.get(window);
	var $mask = $("body");
	
	$(function() {
		var isError = false;

		var uploader = new plupload.Uploader({
			browse_button: 'inputfiles',
			url: context + '/service/bsp/' + targetInfo + '/importing',
			max_file_size: '50mb',
			multi_selection: false,
			unique_names: true,
			filters: [{
				title: "Zip files",
				extensions: "zip"
			}],
			flash_swf_url: "<l:asset path='Moxie.swf'/>",
			silverlight_xap_url: "<l:asset path='Moxie.xap'/>",
			init: {
				//当文件添加到上传队列后触发(up为当前的plupload实例对象,files为一个数组,里面的元素为本次添加到上传队列里的文件对象)
				FilesAdded: function(up, files) {
					plupload.each(files,
					function(file) {
						$("#filelist").val(file.name);
					});
					//开始上传队列中的文件
					uploader.start();
				},
				BeforeUpload: function(up, file) {
					showTLoading();
				},
				UploadComplete: function(up, file) {
					if(!isError) {
						var msg = L.getLocaleMessage("bsp.import.004","导入成功！");
						sticky(msg);
					}
					$mask.unloading();
				},
				Error: function(up, err) {
					var msg;
					if(err.code == "-601") {
						msg = L.getLocaleMessage("bsp.import.005","请使用zip格式的文件！");
					}else if(err.status == "500") {
						// 服务端导入错误
						msg = err.response;
					}else {
						msg = err.message;
					}
					
					isError = true;

					bspAlert(msg);
				}
			}
		});
		//初始化Plupload实例
		uploader.init();
		
		$("#returnBtn").click(function(){
			$dialog.close();
			$dialog.remove();
		});
	});
	
	function showTLoading() {
		var msg = L.getLocaleMessage("bsp.import.006","处理中...");
		$mask.loading({
			isShowMask: true,
			lines: 8,
			length: 0,
			width: 10,
			radius: 15,
			maskOpacity: '0.4',
			loadingText: msg
		});
	}
	
	function bspAlert(message) {
		$.dialog({
			type: 'alert',
			content: message,
			autofocus: true,
		});
	}
	
	function sticky(msg, style, position) {
		var type = style ? style : "success";
		var place = position ? position : "top";
		$.sticky(msg, {
			autoclose : 2000,
			position : place,
			style : type
		});
	}
</script>
</html>
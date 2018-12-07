<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<link rel="stylesheet" type="text/css" href="<l:assetcontext/>/jsp/cportal/demo/css/lineCharts.css" />
<%-- <script  type="text/javascript" src="<l:asset path='echarts.js'/>"></script> --%>
<script type="text/javascript" src="<l:assetcontext/>/jsp/cportal/demo/js/echarts.js"></script>
<script type="text/javascript" src="<l:assetcontext/>/jsp/cportal/demo/js/lineCharts.js"></script>
</head>
<!-- 降雨量 -->
<body>
	<div class="line-charts">
		<div class="title">
			<label class="msg">平均月降雨量</label><label class="sum">300mm</label>
		</div>
		<div id="line-charts" style="height: 285px; width: 100%;">
		</div>
	</div>
</body>
</html>
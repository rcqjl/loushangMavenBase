<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%-- <script  type="text/javascript" src="<l:asset path='echarts.js'/>"></script> --%>
<script type="text/javascript" src="<l:assetcontext/>/jsp/cportal/demo/js/echarts.js"></script>
<script type="text/javascript" src="<l:assetcontext/>/jsp/cportal/demo/js/barCharts.js"></script>
<style type="text/css">
div[data_widgetid=barCharts] .panel-heading{
	border-bottom: 2px solid #e9583e;
}
</style>
</head>
<!-- 网络销售情况 -->
<body>
	<div id="bar-charts" style="width: 100%; height: 270px"></div>
</body>
</html>
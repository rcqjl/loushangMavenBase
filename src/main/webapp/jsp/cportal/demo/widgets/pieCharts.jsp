<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<link rel="stylesheet" type="text/css" href="<l:assetcontext/>/jsp/cportal/demo/css/pieCharts.css" />
<%-- <script  type="text/javascript" src="<l:asset path='echarts.js'/>"></script> --%>
<script type="text/javascript" src="<l:assetcontext/>/jsp/cportal/demo/js/echarts.js"></script>
<script type="text/javascript" src="<l:assetcontext/>/jsp/cportal/demo/js/pieCharts.js"></script>
</head>
<!-- 任务结构 -->
<body>
	<div style="position: relative; height: 100%;">
		<div class="legend">
			<div>
				<label class="l-t">总任务数量</label><label class="l-s">16</label>
				<table class="pie-table">
					<tr>
						<td>类型</td>
						<td>数量</td>
					</tr>
					<tr>
						<td><div class = "le1"></div>办结</td>
						<td>6</td>
					</tr>
					<tr>
						<td><div class="le2"></div>待办</td>
						<td>5</td>
					</tr>
					<tr>
						<td><div class="le3"></div>已办</td>
						<td>5</td>
					</tr>
				</table>
			</div>
		</div>
		<div id="pie-charts" style="width: 66%; height: 270px"></div>
	</div>
</body>
</html>
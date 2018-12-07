$(function() {
    barCharts();
  });
function barCharts(){
	var myBar = echarts.init(document.getElementById('bar-charts'));
	var option = {
				grid:{
	 				x:50,
	 				y:50,
	 				x2:35,
	 				y2:35
	 			},
			    tooltip : {
			        trigger: 'tooltip'
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : ['1月','2月','3月','4月','5月','6月'],
			            axisLine : {
		                	lineStyle:{
		                		color:'#666',
		                		width:1
		                	}
		                }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : '万元',
			            axisLine : {
		                	lineStyle:{
		                		color:'#666',
		                		width:1
		                	}
		                }
			        }
			    ],
			    series : [
			        {
			            name:'销售额',
			            type:'bar',
			            barWidth:16,
			            data:[2.5, 2.8, 2.9, 3.2, 3.6, 4.5]
			        }
			    ],
			color:['#3bafd9']
		};
	myBar.setOption(option);
}
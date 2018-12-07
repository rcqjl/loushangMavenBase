$(function() {
    lineCharts();
  });
function lineCharts(){
	var myLine = echarts.init(document.getElementById('line-charts'));
 	var option = {
 			grid:{
 				x:50,
 				y:50,
 				x2:35,
 				y2:50
 			},
 	  		tooltip : {
		        trigger: 'axis'
		    },
 		    calculable : true,
 		    xAxis : [
 		        {
 		            type : 'category',
 		            boundaryGap : false,
 		            axisLabel : {
	                    show : true,
	                    textStyle : {
	                    	color : '#fff'
	                                }
	                    },
	                axisLine : {
		               	lineStyle:{
		               		color:'#fff',
		               		width:1
		               			  }
		            },
 		            data : ['5月','6月','7月','8月','9月','10月','11月']
 		        }
 		    ],
 		    yAxis : [
 		        {
 		            type : 'value',
 		            name:"mm",
 		            max:500,
		            axisLabel : {
	                    show : true,
	                    textStyle : {
	                    	color : '#fff'
	                                }
	                    },
	                axisLine : {
	                	lineStyle:{
	                		color:'#fff',
	                		width:1
	                	}
	                }
 		        }
 		    ],
 		    series : [
 		        {
 		            name:' ',
 		            type:'line',
 		            smooth:false,
 		            itemStyle: {normal: {color:'#fff'}},
 		            data:[210, 300, 310, 384, 260, 130,110]
 		        }
 		    ]
 		};
 	myLine.setOption(option);
}
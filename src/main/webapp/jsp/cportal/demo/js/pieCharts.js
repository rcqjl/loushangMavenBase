$(function() {
    pieCharts();
  });
function pieCharts(){
	var myChart = echarts.init(document.getElementById('pie-charts'));
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    calculable : true,
		    series : [
		        {
		            name:'任务结构',
		            type:'pie',
		            radius : ['50%', '70%'],
		            itemStyle : {
		                normal : {
		                    label : {
		                        show : false
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                },
		                emphasis : {
		                    label : {
		                        show : true,
		                        position : 'center',
		                        textStyle : {
		                            fontSize : '30',
		                            fontWeight : 'bold'
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:6, name:'办结'},
		                {value:5, name:'待办'},
		                {value:5, name:'已办'}
		            ]
		        }
		    ],
		    color:['#3bafd9','#8bc253','#e9583e']
		};
	myChart.setOption(option);
 }
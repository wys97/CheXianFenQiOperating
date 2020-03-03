<template>
	<div class="">
		<div :id="pieChartId" style="width: 550px; height: 300px;"></div>
	</div>
</template>
<script>
	import echarts from 'echarts';
	export default {
		name: 'pieChart',
		data() {
			return {
				pieChartId: ''
			}
		},
		props: {
			chartData: {
				type: Array,
				default: []
			},
			title: {
				type: String,
				dafault: ''
			}
		},
		watch: { //监听

		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
		},
		created: function() { //创建完毕状态
			this.pieChartId = Math.random();
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			this.drawLine();

		},
		beforeUpdate: function() { //更新前状态
		},
		updated: function() { //更新完成状态
		},
		destroyed: function() { //销毁完成状态
		},
		methods: {
			drawLine: function() {
				var that = this;
				var myChart = echarts.init(document.getElementById(that.pieChartId));
				// 基于准备好的dom，初始化echarts实例
				/* var myChart = echarts.init(_myChart);*/
				/*let myChart = this.$echarts.init(document.getElementById('myChart'))*/
				let legendData = [];
				for(let i = 0; i < that.chartData.length; i++) {
					legendData.push(that.chartData[i].name+'('+that.chartData[i].value+'%)')
					that.chartData[i].name=that.chartData[i].name+'('+that.chartData[i].value+'%)'
				}
				// 绘制图表
				myChart.setOption({
					title: {
						text: that.title,
//						subtext: '纯属虚构',
						x: 'left'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'right',
						top:'middle',
						data: legendData
					},
					series: [{
						name: '占比',
						type: 'pie',
						radius: '55%',
						center: ['40%', '60%'],
						data: that.chartData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
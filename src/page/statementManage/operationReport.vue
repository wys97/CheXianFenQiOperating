<template>
	<div class="page-container" ref="page-container" id="page-container" style="padding-top: 30px;overflow-y: auto;">
		<!---商户管理-商户入驻--->
		<el-row :gutter="10">
			<el-col :span="24">
				<div class="h_top">
					<p class="h_title">运营概况</p>
					<el-row v-if="summaryData.summary">
						<el-col :span="6">
							<p class="h_name">累计放款金额</p>
							<p class="h_amt">
								{{summaryData.summary.loanAmount?summaryData.summary.loanAmount:'-'}} 元
								<!--<router-link to="/supplierManage/supplierRegister" class="router-link"></router-link>-->
							</p>
						</el-col>
						<el-col :span="6">
							<p class="h_name">累计放款笔数</p>
							<p class="h_amt">
								{{summaryData.summary.loanCount?summaryData.summary.loanCount:'-'}} 笔
							</p>
						</el-col>
						<el-col :span="6">
							<p class="h_name">累计收益</p>
							<p class="h_amt">{{summaryData.summary.profitAmount?summaryData.summary.profitAmount:'-'}} 元</p>
						</el-col>
						<el-col :span="6">
							<p class="h_name">年化收益率</p>
							<p class="h_amt">{{summaryData.summary.profitRate?summaryData.summary.profitRate:'-'}}%</p>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="h_top">
					<p class="h_title">借款企业数据</p>
					<el-row v-if="summaryData.loan">
						<el-col :span="8">
							<p class="h_name">累计借款企业</p>
							<p class="h_amt">{{summaryData.loan.loanCount?summaryData.loan.loanCount:'-'}} 家</p>
						</el-col>
						<el-col :span="8">
							<p class="h_name">借款余额</p>
							<p class="h_amt">{{summaryData.loan.loanBalanceTotal?summaryData.loan.loanBalanceTotal:'-'}} 元</p>
						</el-col>
						<el-col :span="8">
							<p class="h_name">企业平均借款余额</p>
							<p class="h_amt">{{summaryData.loan.loanBalanceAvg?summaryData.loan.loanBalanceAvg:'-'}} 元</p>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="h_top">
					<p class="h_title">申请通过数据</p>
					<el-row v-if="summaryData.apply">
						<el-col :span="8">
							<p class="h_name">申请笔数</p>
							<p class="h_amt">{{summaryData.apply.applyCount?summaryData.apply.applyCount:'-'}} 笔</p>
						</el-col>
						<el-col :span="8">
							<p class="h_name">通过笔数（比例）</p>
							<p class="h_amt">
								{{summaryData.apply.passCount?summaryData.apply.passCount:'-'}} 笔
								({{summaryData.apply.passRate?summaryData.apply.passRate:'-'}}%) 
							</p>
						</el-col>
						<el-col :span="8">
							<p class="h_name">拒绝笔数（比例）</p>
							<p class="h_amt">
								{{summaryData.apply.rejectCount?summaryData.apply.rejectCount:'-'}} 笔
								({{summaryData.apply.rejectRate?summaryData.apply.rejectRate:'-'}}%)
							</p>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="h_top">
					<p class="h_title">逾期数据</p>
					<el-row v-if="summaryData.overdue">
						<el-col :span="8">
							<p class="h_name">逾期金额</p>
							<p class="h_amt">{{summaryData.overdue.overdueAmount?summaryData.overdue.overdueAmount:'-'}} 元</p>
						</el-col>
						<el-col :span="8">
							<p class="h_name">逾期笔数</p>
							<p class="h_amt">{{summaryData.overdue.overdueCount?summaryData.overdue.overdueCount:'-'}} 笔</p>
						</el-col>
						<el-col :span="8">
							<p class="h_name">订单逾期率</p>
							<p class="h_amt">{{summaryData.overdue.overdueRate?summaryData.overdue.overdueRate:'-'}}%</p>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<period-pie-chart v-if="loanPeriodData" :chartData="loanPeriodData" :title="'借款期限占比'"></period-pie-chart>
				<!--<NoteChart v-if="loanPeriodData" :chartData="loanPeriodData" :title="'回款数据'" :legendData="['金额','笔数']"></NoteChart>-->
			</el-col>
			<el-col :span="12">
				<period-pie-chart v-if="loanInterestData" :chartData="loanInterestData" :title="'借款利率占比'"></period-pie-chart>
				<!--<NoteChart v-if="loanInterestData" :chartData="loanInterestData" :title="'放款数据'" :legendData="['金额','笔数']"></NoteChart>-->
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import operationReport from '@/api/statementManage/operationReport'
	import NoteChart from '@/components/charts/noteChart'
	import PeriodPieChart from '@/components/charts/periodPieChart'
	export default {
		name: 'operationReport',
		components: {
			NoteChart,
			PeriodPieChart
		},
		data() {
			return {
				summaryData:{
					apply:'',
					loan:'',
					overdue:'',
					summary:''
				}, //运营概况
				loanPeriodData: '', //借款期限占比数据
				loanInterestData: '', //借款利率数据
			}
		},
		watch: {
			loanPeriodData(val) {
				this.loanPeriodData = val;
			},
			loanInterestData(val) {
				this.loanInterestData = val;
			},

		},
		created() {
			this.init();
		},
		mounted() {},
		methods: {
			init() {
				this.getSummaryData();
				this.getLoanPeriodData();
				this.getLoanInterestData();
			},
			getSummaryData() { //运营报告-查询运营概况
				let that = this;
				operationReport.summary().then(res => {
					if(res.data.code === '200') {
						that.summaryData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},

			getLoanPeriodData() { //获取运营报告-借款期限占比
				let that = this;
				operationReport.loanPeriod().then(res => {
					if(res.data.code === '200') {
						that.loanPeriodData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getLoanInterestData() { //获取借款利率数据
				let that = this;
//				that.loanInterestData = [{name:'3个月',value:456},{name:'6个月',value:456}]
				operationReport.loanInterest().then(res => {
					if(res.data.code === '200') {
						that.loanInterestData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			}
		},

	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.h_top {
		background-color: #F8F8F8;
		border: 1px solid #bbb;
		min-height: 100px;
		margin-bottom: 20px;
	}
	
	.h_title {
		line-height: 40px;
		text-align:left;
		padding-left: 20px;
		color: #303133;
		background-color: #e9ecf3;
	}
	
	.h_name {
		line-height: 40px;
		text-align: center;
		font-size: 13px;
	}
	
	.h_amt {
		text-align: center;
		font-size: 20px;
		line-height: 40px;
	}
	
	.container {
		text-align: center;
		ul {
			margin: auto;
			width: 420px;
			padding: 12px 20px;
			list-style: none;
			background: #fff;
			li {
				display: flex;
				margin-bottom: 10px;
				&:last-of-type {
					margin-bottom: 0;
				}
				>div {
					&:first-of-type {
						text-align: left;
						width: 130px;
						color: #999;
					}
				}
				.title {
					text-align: center;
					width: 100%;
					margin-bottom: 20px;
					margin-top: 10px;
				}
				.inviteCode {
					font-size: 18px;
					font-weight: bold;
				}
				.info {
					text-align: left;
					color: #999;
					font-size: 13px;
					margin-bottom: 10px;
				}
			}
		}
	}
</style>
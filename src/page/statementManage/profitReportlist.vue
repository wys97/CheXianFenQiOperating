<template>
	<div class="page-container" ref="page-container" id="page-container">
		<!---商户管理-商户入驻--->
		<div class="filter-container" ref="filter-container" id="filter-container">

			<!--<hr class="hr" />-->
			<div class="table_title_box">
				<span>收益表</span>
				<a href="/admin/profit_report/export" target="_blank">
					<el-button type="primary" size="mini">导出</el-button>
				</a>
			</div>
			<el-table :data="topList" class="top_table">
				<el-table-column prop="productName" label="">
					<template slot-scope="scope" >
			          <div>合计</div>
			        </template>
				</el-table-column>
				<el-table-column label="已结束的订单" align="center">
					<el-table-column prop="finishedLoanAmount" label="放款金额">
					</el-table-column>

					<el-table-column prop="finishedBackAmount" label="还款金额">
					</el-table-column>

					<el-table-column prop="finishedOverdueAmount" label="未完成金额">
					</el-table-column>

					<el-table-column prop="finishedExpectedProfitAmount" label="预期收益">
					</el-table-column>

					<el-table-column prop="finishedActualProfitAmount" label="实际收益">
					</el-table-column>

					<el-table-column prop="finishedExpectedProfitRate" label="预期年化利率">
					</el-table-column>

					<el-table-column prop="finishedActualProfitRate" label="实际年化利率">
					</el-table-column>

				</el-table-column>
				<el-table-column label="进行中的订单" align="center">
					<el-table-column prop="doingLoanAmount" label="放款金额">
					</el-table-column>

					<el-table-column prop="doingExpectedProfitAmount" label="预期收益">
					</el-table-column>

					<el-table-column prop="doingExpectedProfitRate" label="预期年化利率">
					</el-table-column>
				</el-table-column>

			</el-table>
		</div>
		<!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
		<el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
			<el-table-column prop="productName" label="产品名称">
			</el-table-column>
			<el-table-column label="已结束的订单" align="center">
				<el-table-column prop="finishedLoanAmount" label="放款金额">
				</el-table-column>

				<el-table-column prop="finishedBackAmount" label="还款金额">
				</el-table-column>

				<el-table-column prop="finishedOverdueAmount" label="未完成金额">
				</el-table-column>

				<el-table-column prop="finishedExpectedProfitAmount" label="预期收益">
				</el-table-column>

				<el-table-column prop="finishedActualProfitAmount" label="实际收益">
				</el-table-column>

				<el-table-column prop="finishedExpectedProfitRate" label="预期年化利率">
				</el-table-column>

				<el-table-column prop="finishedActualProfitRate" label="实际年化利率">
				</el-table-column>

			</el-table-column>
			<el-table-column label="进行中的订单" align="center">
				<el-table-column prop="doingLoanAmount" label="放款金额">
				</el-table-column>

				<el-table-column prop="doingExpectedProfitAmount" label="预期收益">
				</el-table-column>

				<el-table-column prop="doingExpectedProfitRate" label="预期年化利率">
				</el-table-column>
			</el-table-column>
			<!--<el-table-column
		        label="操作"
		        align="center">
		        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
		            <router-link :to="'registerDetail/' + scope.row.collateralId" class="router-link">查看</router-link>
		        </template>
		      </el-table-column>-->

		</el-table>
		<div class="pagination-container" ref="pagination-container" id="pagination-container">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
	import apiCommon from '@/api/common'
	import { total, getListData, collateralRegisterStatus } from '@/api/statementManage/profitReportlist'
	import { Format } from '@/utils/index'

	export default {
		name: 'SupplierRegister',
		filters: {
			filterStatus: function(value) {
				if(value === 'PASS') {
					return 'suc'
				} else if(value === 'REJECT') {
					return 'fail'
				}
			}
		},
		data() {
			return {
				collateralTypeList: '', //押品类型下拉
				registerStatusList: '', //申请登记-状态下拉
				topData: '', //头部数据
				list: [], // 表格数据
				total: 0, // 表格数据总条数
				listQuery: { // 查询参数
					page: 1,
					limit: 30,
				},
				shipDate: [], // 时间范围
				yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
				selectedData: '', // 选中某一行的数据
				handleSelectionChange: handleSelectionChange.bind(this),
				handleSizeChange: handleSizeChange.bind(this),
				handleCurrentPage: handleCurrentPage.bind(this),
			}
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			]),
			topList() {
				let _arr = new Array();
				_arr.push(this.topData);
				return _arr
			}
		},
		watch: {
			shipDate(val, oldVal) {
				let that = this;
				if(val[0]) {
					that.listQuery.beginCreateTime = Format(val[0], 'yyyy-MM-dd');
				} else {
					that.listQuery.beginCreateTime = '';
				}
				if(val[1]) {
					that.listQuery.endCreateTime = Format(val[1], 'yyyy-MM-dd');
				} else {
					that.listQuery.endCreateTime = '';
				}
			},

		},
		created() {},
		mounted() {
			this.getList();
			this.getTotal();
			setTimeout(() => {
				this.$store.dispatch('SetTableMaxHeight')
			}, 500)
		},
		methods: {
			getTotal() {
				total().then(res => {
					if(res.data.code === '200') {
						this.topData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getList() {
				getListData(this.listQuery).then(res => {
					if(res.data.code === '200') {
						const listData = res.data.data.list
						this.total = res.data.data.total
						this.list = listData
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			search() {
				let that = this;
				that.getList();
			}, //查询
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.shipDate = [];
			}, //重置表单
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.total-container {
		>span {
			margin-right: 10px;
			padding-right: 10px;
			border-right: 1px solid #ccc;
			&:last-of-type {
				border-right: none;
			}
		}
	}
	
	.router-link {
		display: block;
		color: #409EFF;
	}
	.top_table{
		margin-bottom: 10px;
	}
</style>
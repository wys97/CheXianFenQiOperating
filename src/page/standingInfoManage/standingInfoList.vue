<template>
	<div class="page-container" ref="page-container" id="page-container">
		<!---商户管理-商户入驻--->
		<div class="filter-container" ref="filter-container" id="filter-container">
			<el-form :inline="true" :model="listQuery" ref="listQueryForm">
				<el-form-item label="融资单号：" prop="financeNo">
					<el-input v-model="listQuery.financeNo" style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item label="企业名称：" prop="enterpriseName">
					<el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item label="法定代表人姓名：" prop="repreName">
					<el-input v-model="listQuery.repreName" style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item label="产品名称：" prop="loanProductType">
					<el-select v-model="listQuery.loanProductType" style="width:150px;">
						<el-option label="全部" value=""></el-option>
						<el-option v-if="loanProductTypeList" v-for="(val,key) in loanProductTypeList" :label="val" :value='key' :key='key'>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="还款方式：" prop="repaymentMethod">
					<el-select v-model="listQuery.repaymentMethod" style="width:150px;">
						<el-option label="全部" value=""></el-option>
						<el-option v-if="repaymentMethodList" v-for="(val,key) in repaymentMethodList" :label="val" :value='key' :key='key'>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="融资期数：" prop="financePeriod">
					<el-select v-model="listQuery.financePeriod" style="width:150px;">
						<el-option label="全部" value=""></el-option>
						<!--<el-option label="定期检查" value="REGULAR"></el-option>
						<el-option label="不定期检查" value="IRREGULAR"></el-option>-->
						<el-option v-if="financePeroidList" v-for="(val,key) in financePeroidList" :label="val" :value='key' :key='key'>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="逾期天数：" prop="overdueDays">
					<el-select v-model="listQuery.overdueDays" style="width:150px;">
						<el-option label="全部" value=""></el-option>
						<!--<el-option label="定期检查" value="REGULAR"></el-option>
						<el-option label="不定期检查" value="IRREGULAR"></el-option>-->
						<el-option v-if="inspectModeList" v-for="(val,key) in inspectModeList" :label="val" :value='key' :key='key'>
						</el-option>
					</el-select>
				</el-form-item>

				<!--<el-form-item label="状态：" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="registerStatusList" v-for="(val,key) in registerStatusList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>-->
				<el-form-item>
					<el-button @click="search" size="mini" type="primary" icon="el-icon-search">查询</el-button>
					<el-button @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
				</el-form-item>
			</el-form>

			<hr class="hr" />
			<div class="table_title_box">
				<span>台账信息</span>
			</div>
		</div>
		<!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
		<el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
			<el-table-column prop="financeNo" min-width="130" label="融资单号">
			</el-table-column>

			<el-table-column prop="enterpriseName" min-width="140" label="融资企业">
				<template slot-scope="scope">
					<div>{{scope.row.enterpriseName}}</div>
					<div>{{scope.row.repreName}}</div>
				</template>
			</el-table-column>

			<el-table-column prop="loanProductTypeText" label="产品名称">
			</el-table-column>

			<el-table-column prop="repaymentMethodText" label="还款方式">
			</el-table-column>

			<el-table-column prop="loanRate" label="费率">
				<template slot-scope="scope">
					<div>{{scope.row.loanRate}} %</div>
				</template>
			</el-table-column>
			
			<el-table-column prop="financeAmt" label="融资金额">
				<template slot-scope="scope">
					<div>{{scope.row.financeAmt}} 元</div>
				</template>
			</el-table-column>

			<el-table-column prop="period" label="融资期数">
				<template slot-scope="scope">
					<div>{{scope.row.period}}</div>
				</template>
			</el-table-column>

			<el-table-column prop="totalAmount" label="应还总额">
				<template slot-scope="scope">
					<div>{{scope.row.totalAmount}} 元</div>
				</template>
			</el-table-column>

			<el-table-column prop="curPeriod" label="当前期数">
				<template slot-scope="scope">
					<div>{{scope.row.curPeriod}}</div>
				</template>
			</el-table-column>
			
			<el-table-column prop="planDate" label="本期还款日期">
				<template slot-scope="scope">
					<div>{{scope.row.planDate}}</div>
				</template>
			</el-table-column>

			<el-table-column prop="amount" label="本期应还本金">
				<template slot-scope="scope">
					<div>{{scope.row.amount}} 元</div>
				</template>
			</el-table-column>

			<el-table-column prop="interest" label="本期应还利息">
				<template slot-scope="scope">
					<div>{{scope.row.interest}} 元</div>
				</template>
			</el-table-column>

			<el-table-column prop="actAmount" label="逾期本金">
				<template slot-scope="scope">
					<div>{{scope.row.actAmount}} 元</div>
				</template>
			</el-table-column>

			<el-table-column prop="actInterest" label="逾期利息">
				<template slot-scope="scope">
					<div>{{scope.row.actInterest}} 元</div>
				</template>
			</el-table-column>

			<el-table-column prop="fineAmount" label="逾期罚息">
				<template slot-scope="scope">
					<div>{{scope.row.fineAmount}} 元</div>
				</template>
			</el-table-column>

			<el-table-column prop="remainDays" label="逾期天数">
				<template slot-scope="scope">
					<div>{{scope.row.remainDays}} 天</div>
				</template>
			</el-table-column>

			<!--<el-table-column label="操作" align="center">
				<template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
					<router-link :to="'overdueCollectionDetail/' + scope.row.id" class="router-link">查看</router-link>
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
	import { getListData, collateralRegisterStatus,financePeroid,inspectMode } from '@/api/standingInfoManage/standingInfoList'
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
				loanProductTypeList: '', //借款产品类型
				repaymentMethodList:'',//还款方式下拉
				financePeroidList:'',//融资期数下拉
				inspectModeList:'',//逾期天数下拉
				collateralTypeList: '', //押品类型下拉
				registerStatusList: '', //申请登记-状态下拉
				list: [], // 表格数据
				total: 0, // 表格数据总条数
				listQuery: { // 查询参数
					page: 1,
					limit: 30,
					financeNo: '',
					enterpriseName: '',
					repreName: '',
					loanProductType: '',
					repaymentMethod: '',
					financePeriod: '',
					overdueDays: ''
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
			])
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
			}
		},
		created() {},
		mounted() {
			this.getList()
			this.getLoanProductTypeList(); //借款产品类型
			this.getRepaymentMethodList();//还款方式下拉
			this.getFinancePeroidList(); //融资期数下拉    
			this.getInspectModeList();//逾期天数下拉
			//    this.getCollateralTypeList();//获取押品下拉
			//    this.getRegisterStatusList();//申请登记-状态下拉
			setTimeout(() => {
				this.$store.dispatch('SetTableMaxHeight')
			}, 500)
		},
		methods: {
			getLoanProductTypeList() { //借款产品类型
				apiCommon.loanProductType().then(res => {
					if(res.data.code === '200') {
						this.loanProductTypeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getRepaymentMethodList() { //还款方式下拉
				apiCommon.repaymentMethod().then(res => {
					if(res.data.code === '200') {
						this.repaymentMethodList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getFinancePeroidList() { //融资期数下拉                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
				financePeroid().then(res => {
					if(res.data.code === '200') {
						this.financePeroidList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getInspectModeList() { //逾期天数下拉
				inspectMode().then(res => {
					if(res.data.code === '200') {
						this.inspectModeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getCollateralTypeList() { //获取押品下拉
				apiCommon.collateralType().then(res => {
					if(res.data.code === '200') {
						this.collateralTypeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getRegisterStatusList() { //申请登记-状态下拉
				collateralRegisterStatus().then(res => {
					if(res.data.code === '200') {
						this.registerStatusList = res.data.data
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
</style>
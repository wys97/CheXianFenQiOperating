<template>
	<div class="page-container" ref="page-container" id="page-container">
		<!---商户管理-商户入驻--->
		<div class="filter-container" ref="filter-container" id="filter-container">
			<el-form :inline="true" :model="listQuery" ref="listQueryForm">
				<el-form-item label="企业名称：" prop="enterpriseName">
					<el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item label="法定代表人姓名：" prop="repreName">
					<el-input v-model="listQuery.repreName" style="width:120px;"></el-input>
				</el-form-item>
                <el-form-item label="法定代表人手机：" prop="repreMobile">
					<el-input v-model="listQuery.repreMobile" style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item label="商户状态：" prop="status">
					<el-select v-model="listQuery.status" style="width:150px;">
						<el-option label="全部" value=""></el-option>
						<el-option v-if="merchantStatusList" v-for="(val,key) in merchantStatusList" :label="val" :value='key' :key='key'>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="预警状态：" prop="warningStatus">
					<el-select v-model="listQuery.warningStatus" style="width:150px;">
						<el-option label="全部" value=""></el-option>
						<el-option v-if="warningStatusList" v-for="(val,key) in warningStatusList" :label="val" :value='key' :key='key'>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search" size="mini" type="primary" icon="el-icon-search">查询</el-button>
					<el-button @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
				</el-form-item>
			</el-form>

			<hr class="hr" />
			<div class="table_title_box">
				<span>贷后预警设置</span>
				<!-- <router-link :to="'postLoanAdd'" class="router-link">
					<el-button type="primary" size="mini">新增</el-button>
				</router-link> -->
			</div>
		</div>
		<el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
			<el-table-column
                prop="enterpriseName"
                width="280"
                label="企业信息">
                <template slot-scope="scope" >
                <div>{{scope.row.enterpriseName}}</div>
                <div>{{scope.row.businessLicenseNo}}</div>
                </template>
            </el-table-column>

			<el-table-column
                prop="repreName"
				width="260"
                label="法定代表人">
                <template slot-scope="scope" >
                <div>{{scope.row.repreName}}</div>
                <div>{{scope.row.repreMobile}}</div>
                </template>
            </el-table-column>

			<el-table-column prop="usedSignLimit" min-width="220" label="已用授信额度">				
			</el-table-column>

			<el-table-column prop="statusText" min-width="200" label="商户状态">
			</el-table-column>

			<el-table-column prop="rate" width="200" label="每月下游订单同比">
			</el-table-column>

			<el-table-column prop="warningStatusText" width="200"  label="预警状态">
			</el-table-column>

			<el-table-column prop="triggerCount" width="200" label="触发次数">
			</el-table-column>

			<el-table-column label="操作" align="center">
				<template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
					<router-link :to="'postLoanWarningDetail/' + scope.row.supplierId" class="router-link">设置</router-link>
				</template>
			</el-table-column>

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
    import { supplierEnableStatus,tradeWarningStatus,tradeWarningList,tradeWarningDetail,tradeWarningSave } from '@/api/orderSyncManage/postLoanWarning'
	import { Format } from '@/utils/index'

	export default {
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
                merchantStatusList:'',  //商户状态类型
                warningStatusList:'',//预警状态下拉
				list: [], // 表格数据
				total: 0, // 表格数据总条数
				listQuery: { // 查询参数
					page: 1,
					limit: 30,
					enterpriseName: '',
                    repreName: '',
                    repreMobile: '',
					status: '',
					warningStatus: ''
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
            this.getMerchantStatusList();//商户状态类型
            this.getWarningStatusList();  //预警方式下拉
			setTimeout(() => {
				this.$store.dispatch('SetTableMaxHeight')
			}, 500)
		},
		methods: {
            getMerchantStatusList() { //商户状态类型
				supplierEnableStatus().then(res => {
					if(res.data.code === '200') {
						this.merchantStatusList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
            },
            getWarningStatusList() { //预警方式下拉
				tradeWarningStatus().then(res => {
					if(res.data.code === '200') {
						this.warningStatusList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getList() {    //预警信息列表
				tradeWarningList(this.listQuery).then(res => {
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
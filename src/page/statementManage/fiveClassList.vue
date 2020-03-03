<template>
	<div class="page-container" ref="page-container" id="page-container">
		<!---商户管理-商户入驻--->
		<div class="filter-container" ref="filter-container" id="filter-container">

			<!--<hr class="hr" />-->
			<div class="table_title_box">
				<span>五级分类报表</span>
				<a href="/admin/classification_report/export" target="_blank">
					<el-button type="primary" size="mini">导出</el-button>
				</a>
			</div>
		</div>
		<!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
		<el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
			<el-table-column prop="loanProductTypeText" label="产品名称">
			</el-table-column>
			<el-table-column prop="passAmount" label="正常">
				<template slot-scope="scope">
		        	<div>{{scope.row.passAmount}} 元</div>
		        	<div>{{scope.row.passPercent}} %</div>
				</template>
			</el-table-column>

			<el-table-column prop="specialMentionAmount" label="关注">
				<template slot-scope="scope">
		        	<div>{{scope.row.specialMentionAmount}} 元</div>
		        	<div>{{scope.row.specialMentionPercent}} %</div>
				</template>
			</el-table-column>

			<el-table-column prop="subStandardAmount" label="次级">
				<template slot-scope="scope">
		        	<div>{{scope.row.subStandardAmount}} 元</div>
		        	<div>{{scope.row.subStandardPercent}} %</div>
				</template>
			</el-table-column>

			<el-table-column prop="doubtfulAmount" label="可疑">
				<template slot-scope="scope">
		        	<div>{{scope.row.doubtfulAmount}} 元</div>
		        	<div>{{scope.row.doubtfulPercent}} %</div>
				</template>
			</el-table-column>

			<el-table-column prop="lossAmount" label="损失">
				<template slot-scope="scope">
		        	<div>{{scope.row.lossAmount}} 元</div>
		        	<div>{{scope.row.lossPercent}} %</div>
				</template>
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
	import { getListData, collateralRegisterStatus } from '@/api/statementManage/fiveClassList'
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
			},

		},
		created() {},
		mounted() {
			this.getList();
			setTimeout(() => {
				this.$store.dispatch('SetTableMaxHeight')
			}, 500)
		},
		methods: {
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
	
	.top_table {
		margin-bottom: 10px;
	}
	
</style>
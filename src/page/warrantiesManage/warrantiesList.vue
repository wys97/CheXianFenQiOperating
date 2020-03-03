<template>
	<div class="page-container" ref="page-container" id="page-container">
		<!---商户管理-商户入驻--->
		<div class="filter-container" ref="filter-container" id="filter-container">
			<el-form :inline="true" :model="listQuery" ref="listQueryForm">
				<el-form-item label="担保企业名称：" prop="guarantorName">
					<el-input v-model="listQuery.guarantorName" style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item label="商户名称：" prop="guarantorIdcardNo">
					<el-input v-model="listQuery.guarantorIdcardNo" style="width:120px;"></el-input>
					<!--<el-select v-model="listQuery.type" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="collateralTypeList" v-for="(val,key) in collateralTypeList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>-->
				</el-form-item>
				<el-form-item label="担保状态：" prop="status">
					<el-select v-model="listQuery.status" style="width:150px;">
						<el-option label="全部" value="">
						</el-option>
						<!--<el-option v-if="registerStatusList" v-for="(val,key) in registerStatusList" :label="val" :value='key' :key='key'>
            </el-option>-->
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search" size="mini" type="primary" icon="el-icon-search">查询</el-button>
					<el-button @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
				</el-form-item>
			</el-form>

			<hr class="hr" />
			<div class="table_title_box">
				<span>担保额度管理</span>
				<!--<router-link :to="'guarantorAdd'" class="router-link">
	    		<el-button type="primary" size="mini">新增</el-button>
	    	</router-link>-->
			</div>
		</div>
		<!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
		<el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
			<el-table-column prop="guarantorId" width="260" label="商户编号">
			</el-table-column>

			<el-table-column prop="guarantorName" width="300" label="商户（被担保企业）">
				<template slot-scope="scope">
					<div>{{scope.row.guarantorName}}</div>
					<div>{{scope.row.guarantorIdcardNo}}</div>
				</template>
			</el-table-column>

			<el-table-column prop="enterpriseName" width="300" label="担保企业">
				<template slot-scope="scope">
					<div>{{scope.row.enterpriseName}}</div>
					<div>{{scope.row.businessLicenseNo}}</div>
				</template>
			</el-table-column>

			<el-table-column prop="guarantorMobile" label="当前担保额度">
        <template slot-scope="scope" >
          <div>{{scope.row.guarantorMobile}} 元</div>
        </template>
			</el-table-column>

			<el-table-column prop="guarantorMobilesx" label="生效日">
			</el-table-column>

			<el-table-column prop="guarantorMobiledq" label="到期日">
			</el-table-column>

			<el-table-column prop="guarantorMobiledb" label="担保状态">
			</el-table-column>
			<!--<el-table-column
        prop="status"
        width="80"
        label="状态">
        <template slot-scope="scope" >
          <span :class="scope.row.status==='INIT'?'war':scope.row.status==='EVALUATING'?'suc':scope.row.status==='EVALUATING'?'fail':'draw' ">
          	{{scope.row.statusText}}
          </span>
        </template>
      </el-table-column>-->

			<el-table-column label="操作" align="center">
				<template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
					<router-link :to="'warrantiesDetail/' + scope.row.guarantorId" class="router-link">查看</router-link>
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
	import { getListData, collateralRegisterStatus } from '@/api/warrantiesManage/warrantiesList'
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
					guarantorName: '',
					guarantorIdcardNo: '',
					guarantorMobile: '',
					enterpriseName: '',
					businessLicenseNo: ''
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
			this.getCollateralTypeList(); //获取押品下拉
			this.getRegisterStatusList(); //申请登记-状态下拉
			setTimeout(() => {
				this.$store.dispatch('SetTableMaxHeight')
			}, 500)
		},
		methods: {
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
						res.data.data = {
								"list": [{
									"guarantorId": "15190104103639043293",
									"guarantorName": "赵小龙",
									"guarantorIdcardNo": "440123456678678122",
									"guarantorMobile": "50,000,000.00",
									"guarantorMobilesx": "2018-10-10",
									"guarantorMobiledq": "2020-10-10",
									"guarantorMobiledb": "生效",
									"enterpriseName": "深圳盛付通科技有限公司",
									"businessLicenseNo": "91440300MA5DNG5X96",
									"repreName": "巢庆丰",
									"repreIdcardNo": "360428197906280072"
								}, {
									"guarantorId": "15181221180054018792",
									"guarantorName": "回归测试",
									"guarantorIdcardNo": "回归测试",
									"guarantorMobile": "50,000,000.00",
									"guarantorMobilesx": "2018-10-10",
									"guarantorMobiledq": "2020-10-10",
									"guarantorMobiledb": "生效",
									"enterpriseName": "上海渡领电子科技有限公司",
									"businessLicenseNo": "91310113MA1GL9JG4D",
									"repreName": "赵军林",
									"repreIdcardNo": "130425198508106338"
								}, {
									"guarantorId": "15181221120824018326",
									"guarantorName": "李甜甜",
									"guarantorIdcardNo": "440781199012221234",
									"guarantorMobile": "50,000,000.00",
									"guarantorMobilesx": "2018-10-10",
									"guarantorMobiledq": "2020-10-10",
									"guarantorMobiledb": "生效",
									"enterpriseName": "有间酒店投资（广州）有限公司",
									"businessLicenseNo": "91440101MA5AKU807P",
									"repreName": "朱翘楚",
									"repreIdcardNo": "440781198011111234"
								}, {
									"guarantorId": "15181219190316008378",
									"guarantorName": "赵军林",
									"guarantorIdcardNo": "130425198508106338",
									"guarantorMobile": "50,000,000.00",
									"guarantorMobilesx": "2018-10-10",
									"guarantorMobiledq": "2020-10-10",
									"guarantorMobiledb": "生效",
									"enterpriseName": "北京林荣明成科技有限公司",
									"businessLicenseNo": "91110302MA00DCLY20",
									"repreName": "赵军林",
									"repreIdcardNo": "130425198508106338"
								}, {
									"guarantorId": "15181218101833007013",
									"guarantorName": "花露水",
									"guarantorIdcardNo": "440306199502050248",
									"guarantorMobile": "50,000,000.00",
									"guarantorMobilesx": "2018-10-10",
									"guarantorMobiledq": "2020-10-10",
									"guarantorMobiledb": "生效",
									"enterpriseName": "深圳盛付通科技有限公司",
									"businessLicenseNo": "91440300MA5DNG5X96",
									"repreName": "李四",
									"repreIdcardNo": "440306199502050238"
								}, {
									"guarantorId": "13181217104748006398",
									"guarantorName": "张四",
									"guarantorIdcardNo": "440306199502050239",
									"guarantorMobile": "50,000,000.00",
									"guarantorMobilesx": "2018-10-10",
									"guarantorMobiledq": "2020-10-10",
									"guarantorMobiledb": "生效",
									"enterpriseName": "深圳盛付通科技有限公司",
									"businessLicenseNo": "91440300MA5DNG5X96",
									"repreName": "李四",
									"repreIdcardNo": "440306199502050238"
								}],
								"pageNum": 1,
								"pageSize": 30,
								"total": 6
							}
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
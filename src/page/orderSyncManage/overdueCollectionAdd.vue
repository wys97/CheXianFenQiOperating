<template>
	<div class="container" style="overflow-y: auto;background-color: #fff;padding: 0 20px 30px;">
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
			<div class="info-list">
				<p style="line-height: 40px;">
					<span>催收信息</span>
				</p>
				<el-form-item label="融资信息：">
					<template>
						<el-select v-model="overdueCollectionDetailData.planNo" filterable placeholder="请选择" style="width: 600px;">
							<el-option v-for="(val,key) in financeDataPullDownList" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="催收人员：">
					<template>
						<el-select v-model="overdueCollectionDetailData.operatorId" filterable placeholder="请选择">
							<el-option v-for="(val,key) in inspectorList" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="跟进方式：">
					<template>
						<el-select v-model="overdueCollectionDetailData.collectMethod" filterable placeholder="请选择">
							<el-option v-for="(val,key) in inspectModeList" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="催收日期：">
					
								      <template>
								      	<el-date-picker
									      v-model="overdueCollectionDetailData.collectDate"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
				</el-form-item>
				<el-form-item label="逾期原因：">
					<template>
						<el-input type="textarea" rows="4" v-model="overdueCollectionDetailData.overdueReason">
			                		</el-input>
					</template>
				</el-form-item>
				<div style="text-align: right;">
					<el-button @click="doSavePostLoan" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" type="primary">保存</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Uploads from '@/components/Upload/Uploads'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList, collateralType, collateralSource, maritalStatus, educationBackground } from '@/api/common'
	import overdueCollectionDetail from '@/api/orderSyncManage/overdueCollectionDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'overdueCollectionAdd',
		components: {
			Upload,
			Uploads
		},
		data() {
			return {
				overdueCollectionDetailData: {
					planNo: '',
					operatorId: '',
					collectMethod: '',
					collectDate: '',
					overdueReason:'',
				}, //详情数据
				financeDataPullDownList: '', //融资信息-下拉列表
				inspectorList: '', //检查人员-下拉列表
				inspectModeList: '', //跟进方式-下拉列表
				enterpriseNameList: '', //学历下拉
				uploadImgData: {
					supplierId: '',
					isImage: true
				},
			}
		},
		props: {},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			overdueCollectionDetailData: function(val, oldVal) {
				this.overdueCollectionDetailData = val;
			}
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		created() {},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.getFinanceDataPullDownList(); //融资信息-下拉列表
				this.getInspectorList(); //催收人员-下拉列表
				this.getInspectModeList(); //检查方式-下拉列表
			}, // 初始化

			doSavePostLoan() { //保存
				if(!this.overdueCollectionDetailData.planNo){this.$message.error('融资信息不能为空！'); return;}
				if(!this.overdueCollectionDetailData.operatorId){this.$message.error('催收人员不能为空！'); return;}
				if(!this.overdueCollectionDetailData.collectMethod){this.$message.error('跟进方式不能为空！'); return;}
				if(!this.overdueCollectionDetailData.collectDate){this.$message.error('催收日期不能为空！'); return;}
				if(!this.overdueCollectionDetailData.overdueReason){this.$message.error('逾期原因不能为空！'); return;}
				let data = baseUtil.copy(this.overdueCollectionDetailData)
				if(data.collectDate&&(typeof data.collectDate)==='object'){
					data.collectDate = Format(data.collectDate, 'yyyy-MM-dd');
				}
				overdueCollectionDetail.tradePostInspectAdd(data).then(res => {
					if(res.data.code === '200') {
						this.$router.replace({path:'/orderSyncManage/overdueCollectionDetail/'+res.data.data.id})
						this.$message.success(res.data.message)
						//删除tabsView对应的view
						let views = this.$store.state.app.visitedViews;
						for(let i=0;i<views.length;i++){
							if(views[i].componentName==='overdueCollectionAdd'){
								this.$store.dispatch('DelVisitedViews', views[i]).then(() => {})
							}
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			getFinanceDataPullDownList() { //融资信息-下拉列表
				overdueCollectionDetail.financeDataPullDown().then(res => {
					if(res.data.code === '200') {
						this.financeDataPullDownList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectorList() { // 催收人员-下拉列表
				overdueCollectionDetail.inspectorList().then(res => {
					if(res.data.code === '200') {
						this.inspectorList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectModeList() { //跟进方式-下拉列表
				overdueCollectionDetail.inspectMode().then(res => {
					if(res.data.code === '200') {
						this.inspectModeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "postLoanDetail.scss";
</style>
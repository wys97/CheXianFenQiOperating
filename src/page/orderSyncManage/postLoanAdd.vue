<template>
	<div class="container" style="overflow-y: auto;background-color: #fff;padding: 0 20px 30px;">
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
			<div class="info-list">
				<p style="line-height: 40px;">
					<span>贷后检查信息</span>
				</p>
				<el-form-item label="所属企业：">
					<template>
						<el-select class="must_input" v-model="postLoanDetailData.orderNo" filterable placeholder="请选择" style="width: 600px;">
							<el-option v-for="(val,key) in financeDataPullDownList" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="检查人员：">
					<template>
						<el-select class="must_input" v-model="postLoanDetailData.operatorId" filterable placeholder="请选择">
							<el-option v-for="(val,key) in inspectorList" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="检查方式：">
					<template>
						<el-select class="must_input" v-model="postLoanDetailData.inspectMode" filterable placeholder="请选择">
							<el-option v-for="(val,key) in inspectModeList" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="检查配合程度：">
					<template>
						<el-select class="must_input" v-model="postLoanDetailData.cooperateDegree" filterable placeholder="请选择">
							<el-option v-for="(val,key) in cooperateDegreeList" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
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
	import postLoanDetail from '@/api/orderSyncManage/postLoanDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'postLoanAdd',
		components: {
			Upload,
			Uploads
		},
		data() {
			return {
				postLoanDetailData: {
					orderNo: '',
					operatorId: '',
					inspectMode: '',
					cooperateDegree: '',
				}, //贷后检查详情数据
				financeDataPullDownList: '', //融资信息-下拉列表
				inspectorList: '', //检查人员-下拉列表
				inspectModeList: '', //检查方式-下拉列表
				cooperateDegreeList: '', //检查配合程度-下拉列表
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
			postLoanDetailData: function(val, oldVal) {
				this.postLoanDetailData = val;
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
				this.getInspectorList(); //检查人员-下拉列表
				this.getInspectModeList(); //检查方式-下拉列表
				this.getCooperateDegreeList(); //检查配合程度-下拉列表
			}, // 初始化

			doSavePostLoan() { //保存
				if(!this.postLoanDetailData.orderNo){this.$message.error('所属企业不能为空！'); return;}
				if(!this.postLoanDetailData.operatorId){this.$message.error('检查人员不能为空！'); return;}
				if(!this.postLoanDetailData.inspectMode){this.$message.error('检查方式不能为空！'); return;}
				if(!this.postLoanDetailData.cooperateDegree){this.$message.error('检查配合程度不能为空！'); return;}
				let data = baseUtil.copy(this.postLoanDetailData)
				postLoanDetail.tradePostInspectAdd(data).then(res => {
					if(res.data.code === '200') {
						this.$router.replace({path:'/orderSyncManage/postLoanDetail/'+res.data.data.id})
						this.$message.success(res.data.message)
						//删除tabsView对应的view
						let views = this.$store.state.app.visitedViews;
						for(let i=0;i<views.length;i++){
							if(views[i].componentName==='postLoanAdd'){
								this.$store.dispatch('DelVisitedViews', views[i]).then(() => {})
							}
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			getFinanceDataPullDownList() { //融资信息-下拉列表
				postLoanDetail.financeDataPullDown().then(res => {
					if(res.data.code === '200') {
						this.financeDataPullDownList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectorList() { //检查人员-下拉列表
				postLoanDetail.inspectorList().then(res => {
					if(res.data.code === '200') {
						this.inspectorList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectModeList() { //检查方式-下拉列表
				postLoanDetail.inspectMode().then(res => {
					if(res.data.code === '200') {
						// 新增的时候删除预警触发选项
						delete res.data.data['WARNING']
						this.inspectModeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCooperateDegreeList() { //检查配合程度-下拉列表
				postLoanDetail.cooperateDegree().then(res => {
					if(res.data.code === '200') {
						this.cooperateDegreeList = res.data.data
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
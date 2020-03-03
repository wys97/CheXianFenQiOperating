<template>
	<div class="container">
		<div class="top">
			<ul class="flex-item">
				<li>{{detailHeadData.title}}</li>
				<!--<li>联系人：{{detailData.receiverName}}</li>
	      	<li>手机号：{{detailData.receiverPhone}}</li>-->
				<li>催收人员：{{detailHeadData.operatorName}}</li>
			</ul>
		</div>
		<div class="content">
			<div class="flex-item">
				<div style="width:500px; float:right;" class="bun">
					<el-button @click="gotoreturn" class="hui">返回</el-button>
				</div>
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane class="first_tab_content" label="基本信息" name="first">
						<div class="tab-content">
							<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="lh_title">融资基本信息</div>
								<div class="info-list">
									<el-row>
										<el-col :span="12">
											<el-form-item label="商户名称：">
												<span class="input_read">{{basicInfoData.enterpriseName}}</span>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="社会统一信用代码：">
												<template>
													<span class="input_read">{{basicInfoData.businessLicenseNo}}</span>
												</template>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="场景方名称：">
												<span class="input_read">{{basicInfoData.capitalName}}</span>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="场景统一信用代码：">
												<template>
													<span class="input_read">{{basicInfoData.capitaBusinessLicenseNo}}</span>
												</template>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="融资单号：">
												<span class="input_read">{{basicInfoData.financeNo}}</span>
												<router-link :to="'/financeManage/financeDetail/' + basicInfoData.financeNo">
													<el-button type="primary" size="mini">详情</el-button>
												</router-link>
											</el-form-item>
										</el-col>
									</el-row>
									<el-form-item label="期数：">
										<span class="input_read">{{basicInfoData.period}}</span>
									</el-form-item>
									<el-form-item label="产品名称：">
										<span class="input_read">{{basicInfoData.loanProductType}}</span>
									</el-form-item>
									<el-form-item label="当期应还金额：">
										<span class="input_read">{{basicInfoData.repaymentAmount}} 元</span>
									</el-form-item>
									<el-form-item label="逾期天数：">
										<span class="input_read">{{basicInfoData.overdueDays}} 天</span>
									</el-form-item>
									<el-form-item label="逾期金额：">
										<span class="input_read">{{basicInfoData.remainAmount}}{{readOnly}} 元</span>
									</el-form-item>
								</div>
								<div class="info-list">
									<el-form-item label="催收人员：">
										<template>
											<span v-if="readOnly" class="input_read">{{basicInfoData.operatorName}}</span>
											<el-select v-else v-model="basicInfoData.operatorId" filterable placeholder="请选择">
												<el-option v-for="(val,key) in inspectorList" :key="key" :label="val" :value="key">
												</el-option>
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="跟进方式：">
										<template>
											<span v-if="readOnly" class="input_read">{{basicInfoData.collectMethodText}}</span>
											<el-select v-else v-model="basicInfoData.collectMethod" filterable placeholder="请选择">
												<el-option v-for="(val,key) in inspectModeList" :key="key" :label="val" :value="key">
												</el-option>
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="催收日期：">
										<span v-if="readOnly" class="input_read">{{basicInfoData.collectDate}}</span>
										<template v-else>
											<el-date-picker v-model="basicInfoData.collectDate" type="date" placeholder="选择日期">
											</el-date-picker>
										</template>
									</el-form-item>
									<el-form-item label="逾期原因：">
										<template>
											<el-input type="textarea" rows="4" :disabled="readOnly" v-model="basicInfoData.overdueReason">
											</el-input>
										</template>
									</el-form-item>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveBasicInfo" type="primary" size="mini">保存</el-button>
									</div>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<!--tab-->
			<div class="flex-item">
				<ul>
					<li class="background-gray color-black">
						<div>操作</div>
					</li>
					<li v-if="!readOnly">
						<div class="fk_btn_box">
							<el-button @click="doinspectFinish" type="success">确认催收完成</el-button>
						</div>
					</li>
					<li v-if="!readOnly">
						<div class="fk_btn_box">
							<el-button @click="doDeleteInspect" type="info">删除</el-button>
						</div>
					</li>
					<!--<li style="padding: 10px 0;">
						<el-button :type="detailData.capticalStatus==='COOPERATING'?'success':''" style="width: 80%;margin: auto;">{{detailData.capticalStatusText}}</el-button>
					</li>-->
				</ul>
			</div>
			<!--左侧操作栏-->
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import overdueCollectionDetail from '@/api/orderSyncManage/overdueCollectionDetail'
	import { validContent } from '@/utils/validate'
	import { Format } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'overdueCollectionDetail',
		components: {
			Upload
		},
		data() {
			return {
				id: '', // id
				detailHeadData: '', //头部数据
				basicInfoData: '', //基本信息
				inspectorList: '', //检查人员-下拉列表
				inspectModeList: '', //检查方式-下拉列表
				cooperateDegreeList: '', //检查配合程度-下拉列表
				activeName2: 'first',

				tableData: [],
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata'
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			]),
			readOnly() { //状态 INIT("初始化"),SUCCESS ("检查完成");
				if(this.detailHeadData.status === 'SUCCESS') {
					return true
				} else {
					return false
				}
			}
		},
		created() {
			this.id = this.$route.params.id
			if(this.id) {
				this.init()
			}
		},
		mounted() {},
		methods: {
			gotoreturn(){
			this.$router.go(-1)
			},
			fetchdata() {
				this.id = this.$route.params.id
				if(this.id) {
					/*this.init()*/
				}
			},
			handleClick(tab) {
				if(tab.index === '0') { //基本信息
					this.getBasicInfoData(); //基本信息
				} else if(tab.index === '1') { //检查前准备工作
				} else if(tab.index === '2') { //检查要点
				} else if(tab.index === '3') { //检查结论
				}
			},
			init() {
				this.getDetailHeadData(); //头部信息
				this.getBasicInfoData(); //基本信息
				this.getInspectorList(); //检查人员-下拉列表
				this.getInspectModeList(); //检查方式-下拉列表
				this.getCooperateDegreeList(); //检查配合程度-下拉列表
			}, // 初始化

			getDetailHeadData() { //头部信息
				overdueCollectionDetail.detailHead(this.id).then(res => {
					if(res.data.code === '200') {
						this.detailHeadData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getBasicInfoData() { //基本信息
				overdueCollectionDetail.basicInfo(this.id).then(res => {
					if(res.data.code === '200') {
						this.basicInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveBasicInfo() { //保存基本信息
				if(!this.basicInfoData.operatorId){this.$message.error('催收人员不能为空！'); return;}
				if(!this.basicInfoData.collectMethod){this.$message.error('跟进方式不能为空！'); return;}
				if(!this.basicInfoData.collectDate){this.$message.error('催收日期不能为空！'); return;}
				if(!this.basicInfoData.overdueReason){this.$message.error('逾期原因不能为空！'); return;}
				let data = baseUtil.copy(this.basicInfoData)
				if(data.collectDate&&(typeof data.collectDate)==='object'){
					data.collectDate = Format(data.collectDate, 'yyyy-MM-dd');
				}
				data.id = this.id
				overdueCollectionDetail.saveBasicInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			doinspectFinish() { //确认检查完成
				let that = this;
				this.$confirm('确认催收完成？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					overdueCollectionDetail.inspectFinish(that.id).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.getDetailHeadData(); //头部信息
							this.getBasicInfoData(); //基本信息
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			doDeleteInspect() { //删除
				let that = this;
				this.$confirm('此操作将永久删除催收信心确认删除？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					overdueCollectionDetail.deleteInspect(that.id).then(res => {
						if(res.data.code === '200') {
							this.$router.replace({
								path: '/orderSyncManage/overdueCollectionList'
							})
							this.$message.success(res.data.message)
							//删除tabsView对应的view
							let views = this.$store.state.app.visitedViews;
							for(let i = 0; i < views.length; i++) {
								if(views[i].componentName === 'overdueCollectionDetail') {
									this.$store.dispatch('DelVisitedViews', views[i]).then(() => {})
								}
							}
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			getInspectorList() { //检查人员-下拉列表
				overdueCollectionDetail.inspectorList().then(res => {
					if(res.data.code === '200') {
						this.inspectorList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectModeList() { //检查方式-下拉列表
				overdueCollectionDetail.inspectMode().then(res => {
					if(res.data.code === '200') {
						this.inspectModeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCooperateDegreeList() { //检查配合程度-下拉列表
				overdueCollectionDetail.cooperateDegree().then(res => {
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
<template>
	<div class="container">
        <div class="top">
			<ul class="flex-item">
                <li>预警设置</li>
			</ul>
		</div>
		<div class="content content_warningDetail">
			<div class="flex-item" >
				<!-- <el-tabs v-model="activeName2" type="card" @tab-click="handleClick"> -->
					<!-- <el-tab-pane class="first_tab_content" label="基本信息" name="first"> -->
						<div class="tab-content" style="border-top:1px solid #e7e7e7">
							<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="lh_title">预警设置</div>
								<div class="info-list" style="border-bottom:none">
									<el-row>
										<el-col :span="12">
											<el-form-item label="企业名称：">
												<span class="input_read">{{basicInfoData.enterpriseName}}</span>
											</el-form-item>
										</el-col>										
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="社会统一信用代码：">
												<template>
													<span class="input_read">{{basicInfoData.businessLicenseNo}}</span>
												</template>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
										<el-col :span="12">
											<el-form-item label="法定代表人姓名：">
												<span class="input_read">{{basicInfoData.repreName}}</span>
											</el-form-item>
										</el-col>										
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="法定代表人手机号码：">
												<template>
													<span class="input_read">{{basicInfoData.repreMobile}}</span>
												</template>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
										<el-col :span="12">
											<el-form-item label="每月下游订单同比：">
												<template>
                                                    <el-form-item label="上涨%" prop="operatorName" style="float:left;">
                                                        <el-input v-model="basicInfoData.riseRate" style="width: 100px;">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="下跌%" prop="mobile" style="float:left;">
                                                        <el-input v-model="basicInfoData.fallRate" style="width: 100px;">
                                                        </el-input>
                                                    </el-form-item>
                                                </template>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
										<el-col :span="12">
											<el-form-item label="预警状态：">
												<template>
                                                    <el-radio-group v-model="basicInfoData.warningStatus">
                                                        <el-radio label="MONITORING">监控中</el-radio>
                                                        <el-radio label="NOT_MONITORING">未监控</el-radio>
                                                    </el-radio-group>
                                                </template>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
                                <div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveBasicInfo" type="primary" size="mini">保存</el-button>
									</div>
							</el-form>
						</div>
					<!-- </el-tab-pane> -->
				<!-- </el-tabs> -->
			</div>
			<div class="flex-item">
				<ul>
					<li class="background-gray color-black">
						<div>操作</div>
					</li>
				</ul>
			</div>
			<!--左侧操作栏-->
		</div>
	</div>
</template>

<script>
    import { tradeWarningDetail,tradeWarningSave } from '@/api/orderSyncManage/postLoanWarning'
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
                detailData:'',    //预警状态
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
			fetchdata() {
				this.id = this.$route.params.id
				if(this.id) {
					/*this.init()*/
				}
			},
			init() {
				this.getBasicInfoData(); //基本信息
			}, // 初始化
			getBasicInfoData() { //基本信息
				tradeWarningDetail(this.id).then(res => {
					if(res.data.code === '200') {
						this.basicInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
            doSaveBasicInfo() { //保存基本信息
				if(!this.basicInfoData.riseRate){this.$message.error('每月下游订单同比-上涨不能为空！'); return;}
				if(!this.basicInfoData.fallRate){this.$message.error('每月下游订单同比-下跌不能为空！'); return;}
				if(!this.basicInfoData.warningStatus){this.$message.error('预警状态不能为空！'); return;}
				let data = baseUtil.copy(this.basicInfoData)
				// if(data.collectDate&&(typeof data.collectDate)==='object'){
				// 	data.collectDate = Format(data.collectDate, 'yyyy-MM-dd');
				// }
                data.supplierId = this.id
				tradeWarningSave(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
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
    .content_warningDetail{
        height: calc(100% - 20px);
    }
</style>
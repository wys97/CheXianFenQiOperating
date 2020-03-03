<template>
	<div class="container">
		<div class="top">
			<ul class="flex-item">
				<li><span>{{detailHeadData.agentName}}</span>&nbsp;&nbsp;&nbsp;
				<span>{{detailHeadData.contactName}}</span>&nbsp;&nbsp;&nbsp;
				<span>{{detailHeadData.contactMobile}}</span></li>
				<li>创建时间：{{detailHeadData.createTime?detailHeadData.createTime:'--'}}</li>
			</ul>
			<div class="flex-item" style="text-align: right;padding-top: 0;">
				<el-button :type="
					detailHeadData.agentStatus=='FROZEN'?'warning':
					detailHeadData.agentStatus=='ENABLED'?'success':
					detailHeadData.agentStatus=='DISABLED'?'danger':''" size="mini">
					{{detailHeadData.agentStatusText}}
				</el-button>
			</div>
		</div>
		<div class="content">
			<div class="flex-item">
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane class="first_tab_content" label="基本信息" name="first">
						<div class="tab-content">
							<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="info-list">
									<p class="title">基本信息</p>
                                    <el-form-item label="代理商编号：">
										<span  class="input_read">{{detailData.agentId}}</span>
									</el-form-item>
									<el-form-item label="代理商名称：">
										<span  class="input_read">{{detailData.agentName}}</span>
									</el-form-item>
                                    <el-form-item label="代理商类型：">
										<template>
											<span  class="input_read">{{detailData.agentTypeText}}</span>
										</template>
									</el-form-item>
                                    <el-form-item label="对接产品：">
										<template>
											<span  class="input_read">{{detailData.productName}}</span>
										</template>
									</el-form-item>
                                    <el-form-item label="联系人名称：">
										<span  class="input_read">{{detailData.contactName}}</span>
									</el-form-item>
                                    <el-form-item label="联系人手机号：">
										<span  class="input_read">{{detailData.contactMobile}}</span>
									</el-form-item>
                                    <el-form-item label="注册日期：">
										<span  class="input_read">{{detailData.registerDate}}</span>
									</el-form-item>
                                    <el-form-item label="分润比例：">
										<span class="input_read">{{detailData.profitScale}} %</span>
									</el-form-item>
									<el-form-item label="结算周期：">
										<span class="input_read">{{detailData.settleCycleText}}</span>
									</el-form-item>

									<el-form-item label="状态：">
										<template>
											<span  class="input_read">{{detailData.agentStatusText}}</span>
										</template>
									</el-form-item>
									<el-form-item label="代理商描述：">
										<span  class="input_read" style="width: 300px;">{{detailData.agentDesc}}</span>
										</el-input>
									</el-form-item>
									<div style="text-align: right;">
									</div>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="登录账户" name="second">
						<div class="tab-content">
							<div class="info-list">
								<div>
									<p class="title" style="display: inline-block;">登录账户</p>
								</div>
								<template>
									<el-table :data="loginList" border style="width: 100%">
										<el-table-column prop="loginName" label="登录账号" width="300">
										</el-table-column>
										<el-table-column prop="name" label="姓名" width="300">
										</el-table-column>
										<el-table-column prop="mobile" label="手机号">
										</el-table-column>
									</el-table>
								</template>
							</div>
						</div>
					</el-tab-pane>
                    <el-tab-pane class="tab_content" label="商户列表" name="third">
						<div class="tab-content">
							<div class="info-list">
								<div>
									<p class="title" style="display: inline-block;">商户列表</p>
								</div>
								<template>
									<el-table :data="applyList" border style="width: 100%">
										<el-table-column prop="applyName" label=申请人 width="280">
                                            <template slot-scope="scope" >
                                                <div>{{scope.row.applyName}}</div>
                                                <div>{{scope.row.applyMobile}}</div>
                                            </template>
										</el-table-column>
										<el-table-column prop="enterpriseName" label="企业信息" width="280">
                                            <template slot-scope="scope" >
                                                <div>{{scope.row.enterpriseName}}</div>
                                                <div>{{scope.row.licenseNo}}</div>
                                            </template>
										</el-table-column>
										<el-table-column prop="repreName" label="法定代表人" width="280">
                                            <template slot-scope="scope" >
                                                <div>{{scope.row.repreName}}</div>
                                                <div>{{scope.row.repreMobile}}</div>
                                            </template>
										</el-table-column>
                                        <el-table-column prop="createTime" label="创建时间" width="280">
										</el-table-column>
										<el-table-column prop="statusText" label="状态">
										</el-table-column>
									</el-table>
								</template>
							</div>
						</div>
					</el-tab-pane>
                    <el-tab-pane class="tab_content" label="结算列表" name="forth">
						<div class="tab-content">
							<div class="info-list">
								<div>
									<p class="title" style="display: inline-block;">结算列表</p>
								</div>
								<template>
									<el-table :data="settleBatchList" border style="width: 100%">
										<el-table-column prop="settleBatchId" label=结算批次 width="200">
										</el-table-column>
										<el-table-column prop="accountName" label="账户名称" width="260">
										</el-table-column>
										<el-table-column prop="accountNum" label="账户号码" width="200">
										</el-table-column>
                                        <el-table-column prop="settleAmount" label="结算金额(元)" width="200">
										</el-table-column>
                                        <el-table-column prop="settleDate" label="结算日期" width="200">
										</el-table-column>
										<el-table-column prop="settleStatusText" label="结算状态">
										</el-table-column>
									</el-table>
								</template>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="推广配置" name="fifth">
						<div class="tab-content">
							<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="info-list">
									<p class="title">推广配置</p>
                                    <el-form-item label="推荐码：">
										<el-input v-model="promotionData.recommandCode" style="width: 300px;">
										</el-input>
										<el-button    @click="handleCopy(promotionData.recommandCode,$event)">复制</el-button>
									</el-form-item>
									<el-form-item label="推荐链接：">
										<el-input v-model="promotionData.recommandUrl" style="width: 300px;">
										</el-input>
										<el-button    @click="handleCopy(promotionData.recommandUrl,$event)">复制</el-button>
									</el-form-item>
									<el-form-item label="推荐二维码：">
										<img :src="'/admin/agent_manage/recommand_qrcode?agentId='+agentId" alt="" style="display:block;width:300px !important;height:300px;" />
									</el-form-item>
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
						<div>状态</div>
						<div></div>
					</li>
				</ul>
			</div>
			<!--左侧操作栏-->
		</div>
	</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Upload from '@/components/Upload/Upload'
  import agentDetail from '@/api/agentManage/agentDetail'
  import baseUtil from '@/utils/baseUtil'
  import clip from '@/utils/clipboard'

  export default {
		name: 'AgentDetail',
		components: {
			Upload
		},
		data() {
			return {
                loginList: [],   //登录账号列表
                applyList: [],   //商户列表
				settleBatchList: [],    //结算列表
				agentId:'', //代理商编号
				detailHeadData: '', //头部数据
				detailData: '', //详情数据(基本信息)
				settleCycle: '',   //结算周期下拉
				promotionData:'',  //推广配置详情
				promotionCode:'',      //推广配置二维码
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
			])
		},
		created() {

		},
		mounted() {
			this.agentId = this.$route.params.id
			// console.log(this.agentId)
			if(this.agentId) {
				this.init()
			}
		},
		methods: {
			fetchdata() {
				this.agentId = this.$route.params.id
				if(this.agentId) {
					/*this.init()*/
				}
			},


		   handleCopy(text, event) {
           clip(text, event)

         },


			handleClick(tab) {
				if(tab.index === '0') {
					this.getAgentBasicInfo()    //代理商基本信息
				} else if(tab.index === '1') {
					this.getAgentLoginAccountList()    //代理商登录列表
				} else if(tab.index === '2') {
					this.getAgentSupplierList()      //代理商商户列表
				} else if(tab.index === '3') {
					this.getAgentSettleList()       //代理商结算明细
				} else if(tab.index === '4'){
					this.getAgentRecommandSetting()     //代理商推广配置详情
				}
			},
			init() {
				this.getSettleCycle()      //代理商结算周期下拉
				this.getDetailHeadData(); // 代理商详情---头部信息
				this.getAgentBasicInfo(); //代理商基本信息
				this.getAgentTypeList();   //代理商类型
			}, // 初始化


			//代理商管理头部信息
			getDetailHeadData() {
				agentDetail.agentHead(this.agentId).then(res => {
					if(res.data.code === '200') {
						this.detailHeadData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},


			//代理商基本信息
			getAgentBasicInfo() {
				agentDetail.agentBasicInfo(this.agentId).then(res => {
					if(res.data.code === '200') {
						this.detailData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},

			//代理商结算周期下拉
			getSettleCycle (){
				agentDetail.agentSettleCycle ().then(res => {
					if (res.data.code === '200') {
						this.settleCycle= res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},



			//代理商类型
			getAgentTypeList () {
				agentDetail.agentTypeList().then(res => {
					if (res.data.code === '200') {
						this.settleCycle= res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},


			//代理商推广配置详情
			getAgentRecommandSetting () {
				agentDetail.agentRecommandSetting(this.agentId).then(res => {
					if (res.data.code === '200') {
						this.promotionData= res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},

			//代理商推广配置二维码
			getAgentRecommandQrcode () {
				agentDetail.agentRecommandQrcode(this.agentId).then(res => {
					if (res.data.code === '200') {
						this.promotionCode= res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},

			//代理商登录账号列表
			getAgentLoginAccountList() {
				agentDetail.agentLoginAccountList(this.agentId).then(res => {
					if(res.data.code === '200') {
						let loginData = res.data.data
						this.loginList = loginData
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},

			//代理商商户列表
			getAgentSupplierList() {
				agentDetail.agentSupplierList(this.agentId).then(res => {
					if(res.data.code === '200') {
						let applyData = res.data.data
						this.applyList = applyData
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			//代理商结算列表
			getAgentSettleList() {
				agentDetail.agentSettleList(this.agentId).then(res => {
					if(res.data.code === '200') {
						let settleBatchData = res.data.data
						this.settleBatchList = settleBatchData
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},


            //代理商-结算信息修改
            doReviseSettleBatch(id) {
				CapticalDetail.contactDetail(contactId).then(res => {
					if(res.data.code === '200') {
						this.contactDetail = res.data.data;
						this.dialogFormVisibleContact = true;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},



            //代理商-登录账户密码重置
            doResetLoginpass(loginName){
               this.$confirm('请确认是否重置密码？确认后原密码失效！', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		       	}).then(() => {
		       		CapticalDetail.resetPassWord(id).then(res => {
						if(res.data.code === '200') {
							this.$alert('重置密码成功！新密码：'+res.data.data.passWord+'', '操作提示', {
					          confirmButtonText: '关闭',
					          callback: action => {
					          }
					        });
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
		        }).catch(() => {

		        });
            },
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "agentUpdate.scss";
</style>

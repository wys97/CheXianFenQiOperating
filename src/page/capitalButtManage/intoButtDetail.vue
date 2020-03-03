	<template>
	<div class="container">
		<div v-if="isLookImg" ref="lookImgBox" @click="clearImg" class="look_img_box">
			<div ref="rotateImg" class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}">
			</div>
			<div class="rotateBtnRow">
				<div @click.stop="rotateImg('left')" class="rotateBtn">
					<i class="iconfont icon-rotate-left"></i>
				</div>
				<div @click.stop="rotateImg('right')" class="rotateBtn">
					<i class="iconfont icon-rotate-right"></i>
				</div>
			</div>
		</div>
		<div class="top">
			<ul class="flex-item">
				<li>{{checkHeadData.enterpriseName}}</li>
				<li>{{checkHeadData.comment}}</li>
			</ul>
			<div class="flex-item" style="text-align: right;padding-top: 0;">
				<span v-if="checkHeadData.approveRemark">原因：{{checkHeadData.approveRemark}} </span>
				<el-button :type="checkHeadData.status=='PASS'?'success':
	      		checkHeadData.status=='REJECT'?'danger':
	      		checkHeadData.status=='INIT'?'warning':''" size="mini">
					{{checkHeadData.statusText}}
				</el-button>
			</div>
		</div>
		<div class="content">
			<div class="flex-item" style="position: relative;">
				<div style="position: absolute;right: 30px;z-index: 11;">
					<router-link tag="a" target="_blank" :to="'/enterpriseDataManage/enterpriseData/'+supplierId">
						<el-button size="mini">企业资料</el-button>
					</router-link>
				</div>
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane label="对接详情" name="first">
						<div class="tab-content">
							<template>
								<el-form label-width="170px" size="mini" label-position="right">
									<div class="lh_title">企业基本信息</div>
									<div class="info-list">
										<el-form-item label="企业名称：">
											<span class="input_read">{{abutmentDetailData.enterpriseName}}</span>
										</el-form-item>
										<el-row>
											<el-col :span="12">
												<el-form-item label="社会统一信用代码：">
													<span class="input_read">{{abutmentDetailData.businessLicenseNo}}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="对接产品">
													<template>
														<span class="input_read">{{abutmentDetailData.productName}}</span>
													</template>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="场景方名称">
													<template>
														<span class="input_read">{{abutmentDetailData.partnerName}}</span>
													</template>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="客户类型：">
													<template>
														<span class="input_read">{{abutmentDetailData.customerTypeText}}</span>
													</template>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="法定代表人姓名 ：">
													<span class="input_read">{{abutmentDetailData.repreName}}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="法定代表人身份证：">
													<template>
														<span class="input_read">{{abutmentDetailData.repreMobile}}</span>
													</template>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="12">
												<el-form-item label="实际控制人姓名 ：">
													<span class="input_read">{{abutmentDetailData.controllerName}}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="实际控制人身份证：">
													<template>
														<span class="input_read">{{abutmentDetailData.controllerIdcard}}</span>
													</template>
												</el-form-item>
											</el-col>
										</el-row>
										<el-form-item label="系统评级：">
											<span class="input_read">{{abutmentDetailData.grade}}</span>
										</el-form-item>
										<el-row>
											<el-col :span="12">
												<el-form-item label="建议授信 ：">
													<span class="input_read">{{abutmentDetailData.creditLine}} 万元</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="授信期限：">
													<template>
														<span class="input_read">{{abutmentDetailData.creditLineMonth}} 个月</span>
													</template>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
									<div class="info-list">
										<div class="lh_title">已对接的资方</div>
										<template>
											<el-table :data="abutmentDetailData.capitals" border style="width: 100%">
												<el-table-column prop="date" type="index" label="序号" width="60">
												</el-table-column>
												<el-table-column prop="capitalShortName" label="资方信息">
													<template slot-scope="scope">
														<div>{{ scope.row.capitalShortName}}</div>
														<div>{{ scope.row.businessLicenseNo}}</div>
													</template>
												</el-table-column>
												<el-table-column prop="capitalTypeText" label="类型">
												</el-table-column>
												<el-table-column prop="creditLine" label="授信额度(万元)">
												</el-table-column>
												<el-table-column prop="creditLineMonth" label="授信期限(月)">
												</el-table-column>
												<el-table-column prop="creditLineRevolvable" label="额度是否可循环">
													<template slot-scope="scope">
														<span>{{ scope.row.creditLineRevolvable?'是':'否'}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="approveTime" label="审批通过日期">
												</el-table-column>
											</el-table>
										</template>
										<div v-if="!(abutmentDetailData.status=='PASS'?true:false)" style="margin-top: 20px;">
											<el-button @click="doReject" :disabled="checkHeadData.status=='REJECT'">拒贷</el-button>
											<!--<span>如无资方与该企业签约。</span>-->
										</div>
									</div>

								</el-form>
							</template>
						</div>
					</el-tab-pane>
					<el-tab-pane label="评级打分卡" name="second">
						<div class="tab-content">
							<template v-if="scorecardShow">
								<Scorecard :api-url="'intoButtDetail'" :supplier-id="supplierId" :readOnly="true">
								</Scorecard>
							</template>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="尽调检查" name="three">
						<div class="tab-content">
							<template v-if="verifyShow">
								<Verify :api-url="'intoButtDetail'" :supplier-id="supplierId" :readOnly="true">
								</Verify>
							</template>
						</div>
					</el-tab-pane>
					<!--<el-tab-pane label="初审授信结论" name="three">
						<div class="tab-content">
							<template v-if="checkData">
								<Check :api-url="'firstTrialDetail'" :supplier-id="supplierId" :check-data="checkData">
								</Check>
							</template>
						</div>
					</el-tab-pane>-->
				</el-tabs>
			</div>
			<!--tab-->
			<div class="flex-item">
				<ul>
					<li class="background-gray color-black">
						<div>操作</div>
					</li>
					<li style="height: 60px;">
						<el-button @click="doInspectionRelateShow()" type="text" style="width: 100%;display: block;">
							<div class="flex">
								<div>
									<template>对接操作和记录</template>
								</div>
								<i class="el-icon-arrow-right"></i>
							</div>
						</el-button>
					</li>
					<!--<li v-if="checkHeadData.status==='PENDING'||checkHeadData.status==='RETURNED'">
						<div class="fk_btn_box">
							<el-button @click="doPass" v-if="!roleHasPermissions['finance_manage_register_list_audit']" type="success">初审通过</el-button>
						</div>
					</li>
					<li v-if="checkHeadData.status==='PENDING'||checkHeadData.status==='RETURNED'">
						<div class="fk_btn_box">
							<el-button @click="doReject " v-if="!roleHasPermissions['finance_manage_register_list_audit']" type="danger">初审拒绝</el-button>
						</div>
					</li>
					<li v-if="checkHeadData.status==='PENDING'||checkHeadData.status==='RETURNED'">
						<div class="fk_btn_box">
							<el-button @click="doRepulse" v-if="!roleHasPermissions['finance_manage_register_list_audit']">打回</el-button>
						</div>
					</li>-->
				</ul>
			</div>
			<!--左侧操作栏-->
		</div>
		<!--拒绝Dialog-->
		<el-dialog title="请填写拒贷原因：" :visible.sync="rejectDialogShow" width="400px">
			<div>
				<el-input type="textarea" :rows="3" v-model="remark"></el-input>
			</div>
			<div slot="footer">
				<el-button @click="rejectDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="approveFinal()">提 交</el-button>
			</div>
		</el-dialog>
		<!--打回Dialog-->
		<el-dialog title="请填写打回原因：" :visible.sync="repulseDialogShow" width="400px">
			<div>
				<el-input type="textarea" :rows="3" v-model="pulseRemark"></el-input>
			</div>
			<div slot="footer">
				<el-button @click="repulseDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="repulseApproveFinal()">提 交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="对接记录" :visible.sync="inspectionDialogShow" fullscreen custom-class='supplier-detail-dialog' width="900px">
			<div class="dialog-content">
				<el-form label-width="170px" size="mini" label-position="right">
					<div class="info-list" v-if="!(checkHeadData.status=='REJECT')">
						<div class="lh_title">选择需要匹配的资方</div>
						<div class="table_top" style="text-align: center;line-height: 40px;margin-bottom: 20px;">
							<el-row style="margin-bottom: 0;">
								<el-col :span="9" class="table_th">资方名称</el-col>
								<el-col :span="10" class="table_th">社会统一信用代码</el-col>
								<el-col :span="5" class="table_th">类型</el-col>
							</el-row>
							<el-row style="margin-bottom: 0;">
								<el-col :span="9" class="table_td" style="line-height: 40px;">
									<template>
								      	<el-select @change="changeSelectAbutmentCapital" v-model="capitalId"  placeholder="请选择">
										    <el-option v-for="(item,index) in abutmentCapitalSelectList" :key="item.capitalId" :label="item.capitalName" :value="item.capitalId"></el-option>
										</el-select>
							       	</template>
								</el-col>
								<el-col  :span="10" class="table_td" style="line-height: 40px;">
									<span v-if="seletIndex!==''">{{abutmentCapitalSelectList[seletIndex].businessLicenseNo}}</span>
									<span v-else>-</span>

								</el-col>
								<el-col  :span="5" class="table_td" style="line-height: 40px;">
									<span v-if="seletIndex!==''">{{abutmentCapitalSelectList[seletIndex].capitalTypeText}}</span>
									<span v-else>-</span>

								</el-col>
							</el-row>
							<div style="text-align: right;">
								<el-button @click="doAbutmentSubmit" type="primary" size="mini">提 交</el-button>
			               </div>
						</div>
					</div>
					<div class="info-list record_dj">
						<div class="lh_title">对接记录</div>
						<template>
							<el-table :data="abutmentInfoList" border style="width: 100%;margin-top: 0;">
								<el-table-column prop="id" label="进件对接编号">
								</el-table-column>
								<el-table-column prop="capitalShortName" label="资方名称">
								</el-table-column>
								<el-table-column prop="businessLicenseNo" label="社会统一信用代码">
								</el-table-column>
								<el-table-column prop="capitalTypeText" label="类型">
								</el-table-column>
								<el-table-column prop="approveStatusText" label="状态">
									<template slot-scope="scope">
										<span :class="scope.row.approveStatus==='PASS'?'suc':scope.row.approveStatus==='REJECT'?'fail':'war'">
											{{scope.row.approveStatusText}}
										</span>
									</template>
								</el-table-column>
								<el-table-column prop="submitTime" label="提交时间">
								</el-table-column>
							</el-table>
						</template>
					</div>
				</el-form>
			</div>
		</el-dialog>
		<!---初审核-->

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Check from '@/components/approve/check'
	import Scorecard from '@/components/approve/scorecard'
	import Verify from '@/components/approve/verify'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import intoButtDetail from '@/api/capitalButtManage/intoButtDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'intoButtDetail',
		components: {
			Upload,
			Check,
			Scorecard,
			Verify
		},
		data() {
			return {
				supplierId: '', // supplierId
				capitalId:'',
				activeName2: 'first', //
				checkHeadData: '', //头部数据
				abutmentDetailData: '', //对接详情数据
				//	        scorecardData:'',//评分卡数据
				scorecardShow: false, //评分卡show
				verifyShow: false, //尽调show
				checkData: '', //初审授信结论数据
				rejectDialogShow: false, // 拒绝弹窗控制
				remark: '', // 拒绝原因
				repulseDialogShow: false, // 打回弹窗控制
				pulseRemark: '', // 打回原因
				inspectionDialogShow: false, //对接操作和记录
				abutmentInfoList:[],//对接记录数据
        		abutmentCapitalSelectList:'',//对接记录-资方下拉框
        		seletIndex:'',//资方下拉框索引
				uploadFileData: {
					financeNo: '',
					isImage: false
				},
				uploadImgData: {
					financeNo: '',
					isImage: true
				},
				isLookImg: false,
				lookImgSrc: '',
				deg: 0, //图片旋转的角度
				previewUrl: '', //应收账款转账确认书

				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata'
		},
		computed: {
			statusActive() {
				const status = this.status;
				let num = 0
				if(status === 'TRANSFER_CONTRACT') {
					num = 0
				} else if(status === 'FINANCE_AUDIT_ING') {
					num = 1
				} else if(status === 'CAPTICAL_CONTRACT') {
					num = 2
				} else if(status === 'WAIT_LOAN') {
					num = 3
				} else if(status === 'SUCCESS') {
					num = 4
				}
				return num
			},
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		created() {
			this.supplierId = this.$route.params.id
			this.uploadFileData.supplierId = this.financeNo
			this.uploadImgData.supplierId = this.financeNo
			if(this.financeNo) {}
		},
		mounted() {
			this.init();
		},
		methods: {
			lookImg(imgSrc) { //查看图片
				this.deg = 0;
				var that = this;
				that.lookImgSrc = imgSrc;
				that.isLookImg = true;
			},
			clearImg() { //点击图片隐藏
				this.deg = 0;
				var that = this;
				that.isLookImg = false;
			},
			rotateImg(type) { //旋转图片
				let deg = this.deg;
				if(type === 'left') {
					this.deg -= 90;
				} else {
					this.deg += 90;
				}
				let _height = window.getComputedStyle(this.$refs.lookImgBox).height;
				let _width = window.getComputedStyle(this.$refs.lookImgBox).width;
				if(this.isNineTenMutiple(this.deg)) {
					this.$refs.rotateImg.style.width = _width;
					this.$refs.rotateImg.style.marginLeft = 'auto';
				} else {
					this.$refs.rotateImg.style.width = parseFloat(_height) - 30 + 'px';
					this.$refs.rotateImg.style.marginLeft = (parseFloat(_width) - parseFloat(_height)) / 2 + 'px';
				}
				this.$refs.rotateImg.style.transform = 'rotate(' + this.deg + 'deg)'
			},
			fetchdata() {
				this.financeNo = this.$route.params.id
				if(this.financeNo) {}
			},

			handleClick(tab) {
				if(tab.index === '0') { //尽调检查
					this.getQueryAbutmentDetail(); //对接详情
				} else if(tab.index === '1') { //评级打分卡
					this.scorecardShow = true;
					//  			this.getQueryScorecardQuery();//评级打分卡-查询
				} else if(tab.index === '2') {
					this.verifyShow = true
					//					this.getQuerySignConclusion(); //授信结论-查询
				}
			},
			init() {
				this.getQueryCheckHead(); //头部信息
				this.getQueryAbutmentDetail(); //对接详情
				//	  		this.verieyCheck();//尽调检查
			}, // 初始化

			getQueryCheckHead() { //押品管理-信息登记-头部信息
				intoButtDetail.checkHead(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.checkHeadData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryAbutmentDetail() { //对接详情
				intoButtDetail.abutmentDetail(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.abutmentDetailData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQuerySignConclusion() { //授信结论-查询
				intoButtDetail.signConclusion(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.checkData = res.data.data;
						if(!res.data.data.enterpriseStrength) {
							this.checkData.enterpriseStrength = {
								MarketAndSales: '',
								ProfitCondition: '',
								SameTradeCompare: ''
							}
						}
						this.getSignEnterpriseStrengthList(); //企业实力和业绩单选数据
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			//    getQueryScorecardQuery(){//评级打分卡-查询
			//    	intoButtDetail.scorecardQuery(this.supplierId).then(res => {
			//        if (res.data.code === '200') {
			//        	this.scorecardData  = res.data.data;
			//        } else {
			//          this.$message.error(res.data.message)
			//        }
			//      }).catch(() => {})
			//    },
			getSignEnterpriseStrengthList() { //企业实力和业绩单选数据
				intoButtDetail.signEnterpriseStrength(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.signEnterpriseStrengthList = res.data.data;
						//        	for(let i=0;i<this.signEnterpriseStrengthList.length;i++){
						//        		this.enterpriseStrength[this.signEnterpriseStrengthList[i].title] = this.signEnterpriseStrengthList[i].titleText
						//        	}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doPass() { //通过
				this.$confirm('确认通过初审？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					intoButtDetail.checkPass(this.supplierId).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.getQueryCheckHead(); //头部信息
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			approveFinal() { //拒绝提交
				let data = {
					supplierId: this.supplierId,
					remark: ''
				}
				if(!validContent(this.remark)) {
					this.$message.error('拒贷原因不能为空')
					return
				}
				data.remark = this.remark.trim()
				intoButtDetail.abutmentReject(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.rejectDialogShow = false
						this.getQueryCheckHead(); //头部信息
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 入驻成功、入驻失败 提交
			doReject() { //点击拒贷
				this.remark = ''
				this.rejectDialogShow = true
			},
			repulseApproveFinal() { //打回提交
				let data = {
					supplierId: this.supplierId,
					remark: ''
				}
				if(!validContent(this.pulseRemark)) {
					this.$message.error('拒绝原因不能为空')
					return
				}
				data.remark = this.pulseRemark.trim()
				intoButtDetail.checkReturned(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.repulseDialogShow = false
						this.getQueryCheckHead(); //头部信息
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 入驻成功、入驻失败 提交
			doRepulse() { //点击打回
				this.pulseRemark = ''
				this.repulseDialogShow = true
			},
			doInspectionRelateShow() {//点击对接操作
				this.inspectionDialogShow = true
				this.getAbutmentInfoList();//获取对接记录
				this.getAbutmentCapitalSelect();//获取对接记录-资方下拉框
			},
			getAbutmentInfoList(){//获取对接记录
				intoButtDetail.abutmentInfoList(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.abutmentInfoList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doAbutmentSubmit(){//对接记录-提交
				if(!this.capitalId){
					this.$message.error('资方名称不能为空')
					return
				}
				let data ={
					supplierId:this.supplierId,
					capitalId:this.capitalId
				}
				intoButtDetail.abutmentSubmit(data).then(res => {
					if(res.data.code === '200') {
						this.getAbutmentInfoList();//获取对接记录
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getAbutmentCapitalSelect(){//获取对接记录-资方下拉框
				intoButtDetail.abutmentCapitalSelect(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.abutmentCapitalSelectList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			changeSelectAbutmentCapital(val){//
				for(let i=0;i<this.abutmentCapitalSelectList.length;i++){
					if(this.abutmentCapitalSelectList[i].capitalId==val){
						this.seletIndex = i
					}
				}
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "capitalButtDetail.scss";
</style>

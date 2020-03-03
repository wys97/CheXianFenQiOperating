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
				<li>{{checkHeadData.content}}</li>
			</ul>
			<div class="flex-item" style="text-align: right;padding-top: 0;">
				<span v-if="checkHeadData.remark">原因：{{checkHeadData.remark}}</span>
				<el-button 
					:type="checkHeadData.status=='PENDING'?'warning':
					checkHeadData.status=='REJECT'?'info':''" size="mini">
					{{checkHeadData.statusText}}
				</el-button>
			</div>
		</div>
		<div class="content">
			<div class="flex-item" style="position: relative;">
				<div style="position: absolute;right: 30px;z-index: 11;">
			        <router-link tag="a" target="_blank" 
			        	:to="'/enterpriseDataManage/enterpriseData/'+supplierId">
			        	<el-button  size="mini">企业资料</el-button>   
			        </router-link>
		      	</div>
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane label="评级打分卡" name="first">
						<div class="tab-content">
							<template>
								<Scorecard :api-url="'reviewRecheckDetail'" :supplier-id="supplierId" :readOnly="true">
								</Scorecard>
							</template>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="尽调检查" name="second">
						<div class="tab-content">
							<template v-if="verifyShow">
								<Verify :api-url="'reviewRecheckDetail'" :supplier-id="supplierId" :readOnly="true">
								</Verify>
							</template>
						</div>
					</el-tab-pane>
					<el-tab-pane label="初审结论" name="three">
						<div class="tab-content">
							<template v-if="checkData">
								<Check :api-url="'reviewRecheckDetail'" :supplier-id="supplierId" :readOnly="true" :check-data="checkData">
								</Check>
							</template>
						</div>
					</el-tab-pane>
					<el-tab-pane label="复审结论" name="four">
						<div class="tab-content">
							<template v-if="recheckData">
								<Recheck :api-url="'reviewRecheckDetail'" :supplier-id="supplierId" :readOnly="true" :recheck-data="recheckData">
								</Recheck>
							</template>
						</div>
					</el-tab-pane>
					<el-tab-pane label="复核备注" name="five">
						<div class="tab-content">
							
							<div class="info-list">
								<el-form ref="verifyFirmInfoForm" label-width="170px" size="mini" label-position="right">
									<div class="lh_title">复核备注</div>
									<el-form-item label="备注说明：">
										<el-input type="textarea" :rows="4" v-model="reviewRemark">
										</el-input>
									</el-form-item>
								</el-form>
							</div>
							<div class="info-list">
								<div style="text-align: right;margin-top: 10px;">
									<el-button @click="doReviewSave" type="primary">保存</el-button>
								</div>
							</div>
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
					<!--<li>
						<div class="fk_btn_box">
							<el-button @click="doPass" v-if="!roleHasPermissions['finance_manage_register_list_audit']" type="success">确认拒绝</el-button>
						</div>
					</li>-->
					<li v-if="checkHeadData.status==='PENDING'">
						<div class="fk_btn_box">
							<el-button @click="doReject " v-if="!roleHasPermissions['finance_manage_register_list_audit']" type="danger">确认拒绝</el-button>
						</div>
					</li>
					<li v-if="checkHeadData.status==='PENDING'">
						<div class="fk_btn_box">
							<el-button @click="doRepulse" v-if="!roleHasPermissions['finance_manage_register_list_audit']">取消拒绝</el-button>
						</div>
					</li>
				</ul>
				
				
		         <ul style="margin-top: 20px;">
		         	<li class="background-gray color-black">
			        	<div>下载</div>	
			      	</li>
			      	<li>
		            <div class="load_box_item">
		              <div class="load_box_item_title">
		                  <span>企业尽调详情</span>
		              </div>
		             	<div class="load_box_item_btns">
		             		<a :href="'/admin/check/check_enterprise_data_export?supplierId='+supplierId" target="_blank">
		             			<el-button  size="mini" type="primary">下载</el-button>
		             		</a>
		             	</div>
		            </div>
			      	</li>
			      	<li>
		            <div class="load_box_item">
		              <div class="load_box_item_title">
		                  <span>影像资料</span>
		              </div>
		             	<div class="load_box_item_btns">
		             		<a :href="'/admin/check/download_image_file?supplierId='+supplierId" target="_blank">
		             			<el-button  size="mini" type="primary">下载</el-button>
		             		</a>
		             	</div>
		            </div>
			      	</li>
		        </ul>
			</div>
			<!--左侧操作栏-->
		</div>
		<!--拒绝Dialog-->
		<el-dialog title="请填写拒绝原因：" :visible.sync="rejectDialogShow" width="400px">
			<div>
				<el-input type="textarea" :rows="3" v-model="remark"></el-input>
			</div>
			<div slot="footer">
				<el-button @click="rejectDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="approveFinal()">提 交</el-button>
			</div>
		</el-dialog>
		<!--打回Dialog-->
		<el-dialog title="请填写取消拒绝原因：" :visible.sync="repulseDialogShow" width="400px">
			<div>
				<el-input type="textarea" :rows="3" v-model="pulseRemark"></el-input>
			</div>
			<div slot="footer">
				<el-button @click="repulseDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="repulseApproveFinal()">提 交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Check from '@/components/approve/check'
	import Scorecard from '@/components/approve/scorecard'
	import Verify from '@/components/approve/verify'
	import Recheck from '@/components/approve/recheck'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import reviewRecheckDetail from '@/api/approveManage/reviewRecheckDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'FinanceDetail',
		components: {
			Upload,
			Check,
			Scorecard,
			Verify,
			Recheck
		},
		data() {
			return {
				supplierId: '', // supplierId
				activeName2: 'first', //
				checkHeadData: '', //头部数据
				scorecardShow: false, //评分卡show
				verifyShow: false, //尽调检查show
					        scorecardData:'',//评分卡数据
				checkData: '', //初审授信结论数据
				recheckData: '', //复审授信结论数据
				reviewRemark:'',//  复核备注
				rejectDialogShow: false, // 确认拒绝弹窗控制
				remark: '', // 拒绝原因
				repulseDialogShow: false, // 取消就拒绝弹窗控制
				pulseRemark: '', // 打回原因
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
	    	down(_path){
	    		let _href = window.location.href
	    		let _hash = window.location.hash
					_href = _href.replace(_hash,'');
					_href = _href+_path+'?supplierId='+this.supplierId
					window.open(_href);
	    	},
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
				if(tab.index === '0') { //评级打分卡
					this.scorecardShow = true;
					 			this.getQueryScorecardQuery();//评级打分卡-查询
				} else if(tab.index === '1') { //尽调检查
					//  			this.verieyCheck();//尽调检查	
					this.verifyShow = true;
				} else if(tab.index === '2') {
					this.getQuerySignConclusion(); //授信结论-查询
				} else if(tab.index === '3') {
					this.getQueryRecheckData(); //复审授信结论-查询
				} else if(tab.index === '4'){
					this.getQueryReviewDetail();//复核备注查询
				}
			},
			init() {
				this.getQueryCheckHead(); //头部信息
				//	  		this.verieyCheck();//尽调检查
			}, // 初始化

			getQueryCheckHead() { //押品管理-信息登记-头部信息
				reviewRecheckDetail.checkHead(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.checkHeadData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQuerySignConclusion() { //初审授信结论-查询
				reviewRecheckDetail.signConclusion(this.supplierId).then(res => {
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
			getQueryRecheckData() { //复审授信结论-查询
				reviewRecheckDetail.recheckDetail(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.recheckData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			   getQueryScorecardQuery(){//评级打分卡-查询
			   	reviewRecheckDetail.scorecardTypes(this.supplierId).then(res => {
			       if (res.data.code === '200') {
			       	this.scorecardData  = res.data.data;
			       } else {
			         this.$message.error(res.data.message)
			       }
			     }).catch(() => {})
			   },
			getQueryReviewDetail(){//复核备注查询
				reviewRecheckDetail.reviewDetail(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.reviewRemark = res.data.data.remark;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doReviewSave(){//复核备注保存
				let data={
					remark:this.reviewRemark,
					supplierId:this.supplierId
				}
				reviewRecheckDetail.reviewSave(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getSignEnterpriseStrengthList() { //企业实力和业绩单选数据
				reviewRecheckDetail.signEnterpriseStrength(this.supplierId).then(res => {
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
				this.$confirm('确认通过复审？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					reviewRecheckDetail.checkPass(this.supplierId).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.getQueryCheckHead(); //头部信息
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			approveFinal() { //确认拒绝提交
				let data = {
					supplierId: this.supplierId,
					remark: ''
				}
				if(!validContent(this.remark)) {
					this.$message.error('确认拒绝原因不能为空')
					return
				}
				data.remark = this.remark.trim()
				reviewRecheckDetail.checkPass(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.rejectDialogShow = false
						this.getQueryCheckHead(); //头部信息
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 入驻成功、入驻失败 提交
			doReject() { //点击确认拒绝
				this.remark = ''
				this.rejectDialogShow = true
			},
			repulseApproveFinal() { //取消拒绝提交
				let data = {
					supplierId: this.supplierId,
					remark: ''
				}
				if(!validContent(this.pulseRemark)) {
					this.$message.error('取消拒绝原因不能为空')
					return
				}
				data.remark = this.pulseRemark.trim()
				reviewRecheckDetail.checkReject(data).then(res => {
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
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "approveDetail.scss";
</style>
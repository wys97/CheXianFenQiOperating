<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
			<div class="info-list">
				<div style="line-height: 40px;">
					<span class="lh_title" style="font-size: 24px;">合同信息</span>
					<span  class="r_f" v-if="!addContract">
						<el-button @click="delContract" type="danger" size="mini">删除</el-button>
					</span>
				</div>
				<el-form-item label="所属商户：">
					<span v-if="!addContract" class="input_read">{{contractDetailData.enterpriseName}}</span>
    				<template v-else>
					  <el-select v-model="contractDetailData.supplierId" filterable  placeholder="请选择" class="must_input" style="width: 200px;">
					    <el-option
					      v-for="item in enterpriseList"
					      :key="item.supplierId"
					      :label="item.enterpriseName"
					      :value="item.supplierId">
					    </el-option>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="所属资方：">
					<span v-if="!addContract" class="input_read">{{contractDetailData.capitalName}}</span>
    				<template v-else>
					  <el-select v-model="contractDetailData.capitalId" filterable  placeholder="请选择" class="must_input" style="width: 200px;">
					    <el-option
					      v-for="item in capitalEnterpriseList"
					      :key="item.capitalId"
					      :label="item.capitalName"
					      :value="item.capitalId">
					    </el-option>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="签署节点：">
					<span v-if="readOnly">{{contractDetailData.signStepText}}</span>
    				<template v-else>
					  <el-select v-model="contractDetailData.signStep" filterable  placeholder="请选择" class="must_input" style="width: 200px;">
					    <el-option
					      v-for="(val,key) in signStepList"
					      :key="key"
					      :label="val"
					      :value="key">
					    </el-option>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="合同类型：">
					<span v-if="readOnly">{{contractDetailData.agreementTypeText}}</span>
    				<template v-else>
					  <el-select v-model="contractDetailData.agreementType" filterable  placeholder="请选择" class="must_input" style="width: 200px;">
					    <el-option
					      v-for="(val,key) in agreementTypeList"
					      :key="key"
					      :label="val"
					      :value="key">
					    </el-option>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="合同编号：">
					<template>
						<span v-if="readOnly" class="input_read">{{contractDetailData.agreementNo}}</span>
						<el-input v-else v-model="contractDetailData.agreementNo"  class="must_input" style="width: 300px;">
						</el-input>
					</template>
				</el-form-item>
				<el-form-item label="合同名称：">
					<template>
						<span v-if="readOnly" class="input_read">{{contractDetailData.agreementName}}</span>
						<el-input v-else v-model="contractDetailData.agreementName" class="must_input" style="width: 300px;">
						</el-input>
					</template>
				</el-form-item>
				<el-form-item label="合同照片：">
					<template v-if="contractDetailData.files.length" v-for="(item,fileIndex) in contractDetailData.files" >
	                  	<Uploads 
	                  	v-model="item.key" 
	                  	:fileUrl="item.url" 
	                  	:dataObj="uploadImgData"  
	                  	actionUrl="/admin/agreement/upload_file"></Uploads>
	                </template>
                	<div>
	                  	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&!readOnly" @click="addContractDetailFiles" type="primary" size="mini">
	                  		新增合同照片
	                  	</el-button>
	                </div>
				</el-form-item> 
				<el-form-item label="备注：">
					<span v-if="readOnly" class="input_read">{{contractDetailData.remark}}</span>
					<el-input v-else type="textarea" rows="4" v-model="contractDetailData.remark">
					</el-input>
				</el-form-item>
				<div v-if="!readOnly" style="text-align: right;">
					<el-button @click="doSaveContract" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" type="primary">保存</el-button>
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
	import { comboboxBankList, collateralType, collateralSource,maritalStatus,educationBackground ,queryCapitalEnterprise,queryEnterprise} from '@/api/common'
	import contractDetail from '@/api/protocolManage/contractDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'register',
		components: {
			Upload,
			Uploads
		},
		data() {
			return {
				contractDetailData: {
					supplierId:'',
					capitalId:'',
					signStep:'',
					agreementType:'',
					agreementNo:'',
					agreementName:'',
					files:[],
					remark:'',
					
				}, //担保人详情数据
				capitalEnterpriseList:'',//资方信息-信息列表下拉
				enterpriseList:'',//商户信息-信息下拉
				signStepList:'',//签署节点
				agreementTypeList:'',//合同类型
				maritalStatusList:'',//学历下拉
				educationBackgroundList:'',//婚姻状态下拉
				enterpriseNameList: '', //企业名称列表
				uploadImgData: {
					supplierId: '',
					isImage: true
				},
			}
		},
		props: {
			id: {
				type: String,
				default: ''
			},
			readOnly: {
				type: Boolean,
				default: false
			},
			addContract: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			contractDetailData: function(val, oldVal) {
				this.contractDetailData = val;
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
				if(!this.addContract){
					this.getGuarantorDetail(); //获取担保人详情数据
				}
				this.getQueryCapitalEnterpriseList();//资方信息-信息列表下拉
				this.getQueryEnterpriseList();//商户信息-信息下拉
				this.getQuerySignStepList();//下拉列表 - 签署节点
				this.getQueryAgreementTypeList();//下拉列表 - 合同类型
//				this.getMaritalStatusList();//学历-状态下拉
//				this.getEducationBackgroundList();//婚姻状态-状态下拉
//				this.getQueryEnterpriseNameList();//企业名称模糊查询
			}, // 初始化
			getGuarantorDetail() { //获取担保人详情数据-----查询
				contractDetail.queryContract(this.id).then(res => {
					if(res.data.code === '200') {
						this.contractDetailData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			delContract(){//删除合同
				let that = this;
				this.$confirm('此操作将永久删除该合同, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	contractDetail.deleteContract(that.id).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.$router.replace({path:'/protocolManage/contractList'})
							//删除tabsView对应的view
							let views = this.$store.state.app.visitedViews;
							for(let i=0;i<views.length;i++){
								if(views[i].componentName==='ContractDetail'){
									this.$store.dispatch('DelVisitedViews', views[i]).then(() => {})
								}
							}
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
		       	}).catch(() => {});

				
			},
			doSaveContract(){//合同信息-保存
				if(!this.contractDetailData.signStep){
					this.$message.error('签署节点不能为空！')
					return
				}
				if(!this.contractDetailData.agreementType){
					this.$message.error('合同类型不能为空！')
					return
				}
				if(!this.contractDetailData.agreementNo){
					this.$message.error('合同编号不能为空！')
					return
				}
				if(!this.contractDetailData.agreementName){
					this.$message.error('合同名称不能为空！')
					return
				}
				if(this.addContract){//新增
					if(!this.contractDetailData.supplierId){
						this.$message.error('所属商户不能为空！')
						return
					}
					if(!this.contractDetailData.capitalId){
						this.$message.error('所属资方不能为空！')
						return
					}
					let data = baseUtil.copy(this.contractDetailData)
			      	let _arr = [];
			      	for(let i=0;i<data.files.length;i++){
			      		if(data.files[i].key){
			      			_arr.push(data.files[i].key)
			      		}
			      	}
			      	data.files = _arr.join();
					contractDetail.saveContract(data).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.$router.replace({path:'/protocolManage/contractDetail/'+res.data.data.id})
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}else {//修改
					let data = baseUtil.copy(this.contractDetailData)
			      	let _arr = [];
			      	for(let i=0;i<data.files.length;i++){
			      		if(data.files[i].key){
			      			_arr.push(data.files[i].key)
			      		}
			      	}
			      	data.files = _arr.join();
					contractDetail.updateContract(data).then(res => {
						if(res.data.code === '200') {
							this.$emit("refreshTop",true)
							this.$router.replace({path:'/protocolManage/contractDetail/'+this.id})
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}
				
			},
			getQueryEnterpriseNameList() { //企业名称模糊查询
				contractDetail.enterpriseName().then(res => {
					if(res.data.code === '200') {
						this.enterpriseNameList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		    addContractDetailFiles () {// 新增押品附件
		      	this.contractDetailData.files.push({key:'',url:''})
		    }, 
			changeSupplierId(val) { //下拉SupplierId改变
				contractDetail.enterpriseInfo(val).then(res => {
					if(res.data.code === '200') {
						this.contractDetailData.businessLicenseNo = res.data.data.businessLicenseNo
						this.contractDetailData.repreName = res.data.data.repreName
						this.contractDetailData.repreIdcardNo = res.data.data.repreIdcardNo
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQuerySignStepList(){//下拉列表 - 签署节点
				contractDetail.signStep().then(res => {
					if(res.data.code === '200') {
						this.signStepList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryAgreementTypeList(){//下拉列表 - 合同类型
				contractDetail.agreementType().then(res => {
					if(res.data.code === '200') {
						this.agreementTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEnterpriseList(){//商户信息-信息下拉
				queryEnterprise().then(res => {
					if(res.data.code === '200') {
						this.enterpriseList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryCapitalEnterpriseList(){//资方信息-信息列表下拉
				queryCapitalEnterprise().then(res => {
					if(res.data.code === '200') {
						this.capitalEnterpriseList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getMaritalStatusList(){//学历-状态下拉
				maritalStatus().then(res => {
					if(res.data.code === '200') {
						this.maritalStatusList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getEducationBackgroundList(){//婚姻状态-状态下拉
				educationBackground().then(res => {
					if(res.data.code === '200') {
						this.educationBackgroundList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
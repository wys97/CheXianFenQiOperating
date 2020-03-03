<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
			<div class="info-list">
				<p style="line-height: 40px;">
					<span >担保人信息</span>
					<span  class="r_f" v-if="!addGuarantor">
						<el-button @click="delGuarantor" type="danger" size="mini">删除</el-button>
					</span>
				</p>
				<el-row>
					<el-col :span="12">
						<el-form-item label="所属企业：">
							<!--<span v-if="readOnly" class="input_read">{{guarantorDetailData.enterpriseName}}</span>
							<el-input v-else v-model="guarantorDetailData.enterpriseName" style="width: 300px;">
							</el-input>-->
							<span v-if="readOnly">{{guarantorDetailData.enterpriseName}}</span>
		    				<template v-else>
							  <el-select @change="changeSupplierId" v-model="guarantorDetailData.supplierId" filterable  placeholder="请选择" style="width: 200px;">
							    <el-option
							      v-for="item in enterpriseNameList"
							      :key="item.supplierId"
							      :label="item.enterpriseName"
							      :value="item.supplierId">
							    </el-option>
							  </el-select>
							</template>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="社会统一信用代码：">
							<template>
								<span v-if="readOnly" class="input_read">{{guarantorDetailData.businessLicenseNo}}</span>
								<el-input v-else v-model="guarantorDetailData.businessLicenseNo" :disabled="true" style="width: 300px;">
								</el-input>
							</template>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="法定代表人姓名：">
							<span v-if="readOnly" class="input_read">{{guarantorDetailData.repreName}}</span>
							<el-input v-else :disabled="true" v-model="guarantorDetailData.repreName" style="width: 300px;">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="法定代表人身份证：">
							<template>
								<span v-if="readOnly" class="input_read">{{guarantorDetailData.repreIdcardNo}}</span>
								<el-input v-else :disabled="true" v-model="guarantorDetailData.repreIdcardNo" style="width: 300px;">
								</el-input>
							</template>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="担保人姓名：">
					<span v-if="readOnly" class="input_read">{{guarantorDetailData.name}}</span>
					<el-input v-else v-model="guarantorDetailData.name" style="width: 300px;">
					</el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="担保人身份证号：">
							<span v-if="readOnly" class="input_read">{{guarantorDetailData.idcardNo}}</span>
							<el-input v-else v-model="guarantorDetailData.idcardNo" style="width: 300px;">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别：">
							<template>
								<span v-if="readOnly" class="input_read">{{guarantorDetailData.genderText}}</span>
								<el-radio-group v-else v-model="guarantorDetailData.gender">
									<el-radio label="MALE">男</el-radio>
									<el-radio label="FEMALE">女</el-radio>
								</el-radio-group>
							</template>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="担保人地址：">
					<span v-if="readOnly" class="input_read">{{guarantorDetailData.address}}</span>
					<el-input v-else type="textarea" v-model="guarantorDetailData.address" style="width: 300px;">
					</el-input>
				</el-form-item>
				<el-form-item label="担保人手机号：">
					<span v-if="readOnly" class="input_read">{{guarantorDetailData.mobile}}</span>
					<el-input v-else v-model="guarantorDetailData.mobile" style="width: 300px;">
					</el-input>
				</el-form-item>
				<el-form-item label="担保人邮箱：">
					<span v-if="readOnly" class="input_read">{{guarantorDetailData.email}}</span>
					<el-input v-else v-model="guarantorDetailData.email" style="width: 300px;">
					</el-input>
				</el-form-item>
				<el-form-item label="担保人身份证：">
					<template>
						<Upload v-model="guarantorDetailData.idcardPicFrontKey" :fileUrl="guarantorDetailData.idcardPicFrontUrl" :dataObj="uploadImgData" actionUrl="/admin/guarantor/upload_idcardPic"></Upload>
					</template>
					<template>
						<Upload v-model="guarantorDetailData.idcardPicBackKey" :fileUrl="guarantorDetailData.idcardPicBackUrl" :dataObj="uploadImgData" actionUrl="/admin/guarantor/upload_idcardPic"></Upload>
					</template>
				</el-form-item>
				<el-form-item label="学历：">
					<template slot-scope="scope">
						<span v-if="readOnly" class="input_read">{{guarantorDetailData.educationBackgroundText}}</span>
						<el-select v-else v-model="guarantorDetailData.educationBackground" placeholder="请选择">
							<el-option v-for="item in educationBackgroundList" :key="item.type" :label="item.typeText" :value="item.type"></el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="婚姻状况：">
					<template slot-scope="scope">
						<span v-if="readOnly" class="input_read">{{guarantorDetailData.maritalStatusText}}</span>
						<el-select v-else v-model="guarantorDetailData.maritalStatus" placeholder="请选择">
							<el-option v-for="item in maritalStatusList" :key="item.status" :label="item.statusText" :value="item.status"></el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="本地户口：">
					<template>
						<span v-if="readOnly" class="input_read">{{guarantorDetailData.localResidentText}}</span>
						<el-radio-group v-else v-model="guarantorDetailData.localResident">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
				<div v-if="!readOnly" style="text-align: right;">
					<el-button @click="doSaveGuarantor" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" type="primary">保存</el-button>
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
	import { comboboxBankList, collateralType, collateralSource,maritalStatus,educationBackground } from '@/api/common'
	import guarantorDetail from '@/api/guarantorManage/guarantorDetail'
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
				guarantorDetailData: {
					enterpriseName:'',
					supplierId:'',
					businessLicenseNo:'',
					repreName:'',
					repreIdcardNo:'',
					id:'',
					name:'',
					idcardNo:'',
					gender:'',
					genderText:'',
					address:'',
					mobile:'',
					email:'',
					idcardPicFrontKey:'',
					idcardPicFrontUrl:'',
					idcardPicBackKey:'',
					idcardPicBackUrl:'',
					educationBackground:'',
					educationBackgroundText:'',
					maritalStatus:'',
					maritalStatusText:'',
					localResident:'',
				}, //担保人详情数据
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
			guarantorId: {
				type: String,
				default: ''
			},
			readOnly: {
				type: Boolean,
				default: false
			},
			addGuarantor: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			guarantorDetailData: function(val, oldVal) {
				this.guarantorDetailData = val;
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
				if(!this.addGuarantor){
					this.getGuarantorDetail(); //获取担保人详情数据
				}
				this.getMaritalStatusList();//学历-状态下拉
				this.getEducationBackgroundList();//婚姻状态-状态下拉
				this.getQueryEnterpriseNameList();//企业名称模糊查询
			}, // 初始化
			getGuarantorDetail() { //获取担保人详情数据-----查询
				guarantorDetail.guarantorInfo(this.guarantorId).then(res => {
					if(res.data.code === '200') {
						this.guarantorDetailData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			delGuarantor(){//删除担保人
				guarantorDetail.deleteGuarantor(this.guarantorId).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.$router.replace({path:'/guarantorManage/guarantorList'})
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveGuarantor(){//担保人-保存
				if(this.addGuarantor){//新增
					let data = baseUtil.copy(this.guarantorDetailData)
					guarantorDetail.saveGuarantor(data).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}else {//修改
					let data = baseUtil.copy(this.guarantorDetailData)
					guarantorDetail.updateGuarantor(data).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}
				
			},
			getQueryEnterpriseNameList() { //企业名称模糊查询
				guarantorDetail.enterpriseName().then(res => {
					if(res.data.code === '200') {
						this.enterpriseNameList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			changeSupplierId(val) { //下拉SupplierId改变
				guarantorDetail.enterpriseInfo(val).then(res => {
					if(res.data.code === '200') {
						this.guarantorDetailData.businessLicenseNo = res.data.data.businessLicenseNo
						this.guarantorDetailData.repreName = res.data.data.repreName
						this.guarantorDetailData.repreIdcardNo = res.data.data.repreIdcardNo
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
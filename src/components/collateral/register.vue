<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
          	<div class="info-list" v-if="registerDetailData">
              	<p style="line-height: 40px;">押品信息</p>
              	<el-row>
				  <el-col :span="12">
				  	<el-form-item label="所属企业：">
				  		<span v-if="readOnly">{{registerDetailData.enterpriseName}}</span>
	    				<template v-else>
						  <el-select @change="changeSupplierId" v-model="registerDetailData.supplierId" filterable  placeholder="请选择" style="width: 200px;">
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
	    				<span v-if="readOnly">{{registerDetailData.businessLicenseNo}}</span>
	    				<el-input v-else v-model="registerDetailData.businessLicenseNo" :disabled="true" style="width: 200px;">
	    				</el-input>
	    			</el-form-item>
				  </el-col>
				</el-row>
              	<el-row>
				  <el-col :span="12">
				  	<el-form-item label="法定代表人姓名：">
				  		<span v-if="readOnly">{{registerDetailData.repreName}}</span>
	    				<el-input v-else v-model="registerDetailData.repreName" :disabled="true" style="width: 200px;">
	    				</el-input>
	    			</el-form-item>
				  </el-col>
				  <el-col :span="12">
	    			<el-form-item label="法定代表人身份证：">
	    				<span v-if="readOnly">{{registerDetailData.repreIdCardNo}}</span>
	    				<el-input v-else v-model="registerDetailData.repreIdCardNo" :disabled="true" style="width: 200px;">
	    				</el-input>
	    			</el-form-item>
				  </el-col>
				</el-row>
    			<el-form-item label="押品名称：">
    				<span v-if="readOnly">{{registerDetailData.collateralName}}</span>
    				<el-input  v-else v-model="registerDetailData.collateralName" style="width: 200px;">
    				</el-input>
    			</el-form-item>
    			
    			<el-form-item label="押品类型：">
    				<span v-if="readOnly">{{registerDetailData.collateralTypeText}}</span>
    				<template  v-else>
					  <el-select v-model="registerDetailData.collateralType" filterable  placeholder="请选择" style="width: 200px;">
					    <el-option
					      v-for="(val,key) in collateralTypeList"
					      :key="key"
					      :label="val"
					      :value="key">
					    </el-option>
					  </el-select>
					</template>
    			</el-form-item>
    			<el-form-item label="押品取得途径：">
    				<span v-if="readOnly">{{registerDetailData.collateralSourceText}}</span>
    				<template  v-else>
					  <el-select v-model="registerDetailData.collateralSource" filterable  placeholder="请选择" style="width: 200px;">
					    <el-option
					      v-for="(val,key) in collateralSourceList"
					      :key="key"
					      :label="val"
					      :value="key">
					    </el-option>
					  </el-select>
					</template>
    			</el-form-item>
    			<el-form-item label="押品附件：">
					<template v-if="registerDetailData.collateralFiles.length" v-for="(item,fileIndex) in registerDetailData.collateralFiles" >
	                  	<Uploads 
	                  	v-model="item.key" 
	                  	:fileUrl="item.url" 
	                  	:dataObj="uploadImgData"  
	                  	actionUrl="/admin/collateral/upload_image_file"></Uploads>
	                </template>
                	<div>
	                  	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&!readOnly" @click="addRegisterDetailFiles" type="primary" size="mini">
	                  		新增押品附件
	                  	</el-button>
	                </div>
				</el-form-item> 
    			<el-form-item label="备注：">
    				<span v-if="readOnly">{{registerDetailData.registerRemark}}</span>
    				<el-input v-else type="textarea" :rows="3" v-model="registerDetailData.registerRemark"  style="width: 600px;">
    				</el-input>
    			</el-form-item>
		    	<div v-if="!readOnly" style="text-align: right;">
                  <el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveRegister" type="primary" size="mini">保存</el-button>
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
	import { comboboxBankList ,collateralType,collateralSource} from '@/api/common'
	import registerDetail   from '@/api/collateralManage/registerDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'register',
    components: { Upload ,Uploads},
    data () {
      	return {
      		enterpriseNameList:'',//企业名称列表
      		collateralTypeList:'',//押品管理-押品类型下拉
      		collateralSourceList:'',//押品管理-押品来源下拉
	        uploadImgData: {
	          supplierId: '',
	          isImage: true
	        },
      	}
    },
    props:{
    	collateralId: {
	        type: String,
	        default: '' 
	    },
	    registerDetailData:{
	    	type:Object,
	        default: ''
	    },
	    readOnly:{
	    	type:Boolean,
	    	default: false 
	    },
	    addRegister:{
	    	type:Boolean,
	    	default:false
	    }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata',
	  	registerDetailData:function(val,oldVal){
	  		this.registerDetailData = val;
    	}
	  },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
    },
    mounted () {
    	this.init();
    },
    methods: {
	  	init () {
		    this.getQueryEnterpriseNameList();//企业名称模糊查询
		    this.getQueryCollateralTypeList ();//押品管理-押品类型下拉
		    this.getQueryCollateralSourceList ();//押品管理-押品来源下拉
      	}, // 初始化
      	getQueryEnterpriseNameList (){//企业名称模糊查询
	      	registerDetail.enterpriseName().then(res => {
	          if (res.data.code === '200') {
	          	this.enterpriseNameList  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
      	getQueryCollateralTypeList (){//押品管理-押品类型下拉
	      	collateralType().then(res => {
	          if (res.data.code === '200') {
	          	this.collateralTypeList  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
	    addRegisterDetailFiles () {// 新增押品附件
	      	this.registerDetailData.collateralFiles.push({key:'',url:''})
	    }, 
      	getQueryCollateralSourceList (){//押品管理-押品来源下拉
	      	collateralSource().then(res => {
	          if (res.data.code === '200') {
	          	this.collateralSourceList  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
      	saveRegister (){//保存
	      	let data = baseUtil.copy(this.registerDetailData)
	      	let _arr = [];
	      	for(let i=0;i<data.collateralFiles.length;i++){
	      		if(data.collateralFiles[i].key){
	      			_arr.push(data.collateralFiles[i].key)
	      		}
	      	}
	      	data.collateralFiles = _arr.join();
      		registerDetail.registerSave(data).then(res => {
	          if (res.data.code === '200') {
	          	if(this.addRegister){
	          		this.$router.push({path:'/collateralManage/registerDetail/'+res.data.data.collateralId})
	          	}
	            this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
      	},
      	changeSupplierId(val){//下拉SupplierId改变
      		registerDetail.enterpriseInfo(val).then(res => {
	          if (res.data.code === '200') {
	            this.registerDetailData.enterpriseName = res.data.data.enterpriseName
	            this.registerDetailData.businessLicenseNo = res.data.data.licenseNo
	            this.registerDetailData.repreName = res.data.data.repreName
	            this.registerDetailData.repreIdCardNo = res.data.data.repreIdCard
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
      	}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>
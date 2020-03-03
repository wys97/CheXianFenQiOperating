<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
          	<div class="info-list" v-if="assessDetailData">
              	<p style="line-height: 40px;">评估意见</p>
              	
				<el-form-item label="押品评估价值：">
					<span v-if="readOnly">{{assessDetailData.evaluateAmount}} 元</span>
    				<el-input v-else v-model="assessDetailData.evaluateAmount" type="number"  style="width: 200px;">
    					<template slot="append">元</template>
    				</el-input>
    			</el-form-item>
				<el-form-item label="产品规定的押品折扣率：">
					<span v-if="readOnly">{{assessDetailData.discountRate}}%</span>
    				<el-input v-else v-model="assessDetailData.discountRate"  style="width: 200px;">
    					<template slot="append">%</template>
    				</el-input>
    			</el-form-item>
				<el-form-item label="押品折后价值：">
					<span v-if="readOnly">{{assessDetailData.discountAmount}} 元</span>
					<span v-else>{{parseFloat(assessDetailData.evaluateAmount?assessDetailData.evaluateAmount:0)*parseFloat(assessDetailData.discountRate/100)}} 元</span>
    			</el-form-item>
    			<el-form-item label="评估意见：">
    				<span v-if="readOnly">{{assessDetailData.evaluateOpinion}}</span>
    				<el-input type="textarea" v-else v-model="assessDetailData.evaluateOpinion" style="width: 100%;">
    				</el-input>
    			</el-form-item>
    			
    			<el-form-item label="评估附件：">
					<template v-for="(item,fileIndex) in assessDetailData.evaluateFiles" >
	                  	<Uploads 
	                  	v-model="item.key" 
	                  	:fileUrl="item.url" 
	                  	:dataObj="uploadImgData"  
	                  	actionUrl="/admin/collateral/upload_assess"></Uploads>
	                </template>
                	<div v-if="!readOnly">
	                  	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="addAssessDetailFiles" type="primary" size="mini">
	                  		新增评估附件
	                  	</el-button>
	                </div>
				</el-form-item>
		    	<div v-if="!readOnly" style="text-align: right;">
                  <el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveAssess" type="primary" size="mini">保存</el-button>
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
	import AssessDetail   from '@/api/collateralManage/assessDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'assess',
    components: { Upload ,Uploads},
    data () {
      	return {
      		enterpriseNameList:'',//企业名称列表
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
	    assessDetailData:{
	    	type:Object,
	        default: ''
	    },
	    readOnly:{
	    	type:Boolean,
	    	default: false 
	    }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata' 
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
      	}, // 初始化
	    addAssessDetailFiles () {// 新增押品附件
	      	this.assessDetailData.evaluateFiles.push({key:'',url:''})
	    }, 
      	saveAssess (){
	      	let data = baseUtil.copy(this.assessDetailData)
	      	let _arr = [];
	      	for(let i=0;i<data.evaluateFiles.length;i++){
	      		if(data.evaluateFiles[i].key){
	      			_arr.push(data.evaluateFiles[i].key)
	      		}
	      	}
	      	data.collateralId = this.collateralId
	      	data.evaluateFiles = _arr.join();
      		AssessDetail.assessSave(data).then(res => {
	          if (res.data.code === '200') {
	            this.$message.success(res.data.message)
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
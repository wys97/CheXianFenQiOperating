<template>
	<div>
		<el-form ref="verifyFirmInfoForm" label-width="170px" size="mini" label-position="right">
			<div class="info-list">
				<div class="lh_title">授信额度</div>
				<el-form-item label="复审授信：">
			      	<span v-if="readOnly" class="input_read">{{recheckData.creditLineAuditor2?recheckData.creditLineAuditor2:'-'}} 万元</span>
			      	<div v-else style="width: 300px;">
			      		<el-input  class="must_input" v-model="recheckData.creditLineAuditor2" >
							<template slot="append">万元</template>
						</el-input>
			      	</div>
				</el-form-item>
				<div class="lh_title">授信结论</div>
				<el-form-item label="复审结论：">
					<el-input type="textarea" :rows="4" :disabled="readOnly" v-model="recheckData.conclusionAuditor2" style="width: 100%;">
					</el-input>
				</el-form-item>
			</div>
			<div v-if="!readOnly" class="info-list">
				<div style="text-align: right;margin-top: 10px;">
					<el-button @click="saveSignConclusion" type="primary">保存</el-button>
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
	import firstTrialDetail   from '@/api/approveManage/firstTrialDetail'
	import recheckDetail from '@/api/approveManage/recheckDetail'
	import reviewRecheckDetail from '@/api/approveManage/reviewRecheckDetail'
	import finalfirstDetail from '@/api/approveManage/finalfirstDetail'
	import finalsecondDetail from '@/api/approveManage/finalsecondDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'recheck',
    components: { Upload ,Uploads},
    data () {
      	return {
			Api:'',//根据父组件传来的值更换api
      		enterpriseNameList:'',//企业名称列表
	        uploadImgData: {
	          supplierId: '',
	          isImage: true
	        },
	        signEnterpriseStrengthList:'',//企业实力和业绩单选数据
	        creditLineMonthsList:'',//授信期限下拉列表
      	}
    },
    props:{
	    recheckData:{
	    	type:Object,
	        default: ''
	    },
	    readOnly:{
	    	type:Boolean,
	    	default: false 
	    },
	    supplierId:{
	    	type:String,
	    	default:''
	    },
		apiUrl:{
			type: String,
			default: 'firstTrialDetail'
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
    	if(this.apiUrl === 'firstTrialDetail'){
			this.Api = firstTrialDetail
		}else if(this.apiUrl ==='recheckDetail'){
			this.Api = recheckDetail
		}else if(this.apiUrl ==='reviewRecheckDetail'){
			this.Api = reviewRecheckDetail
		}else if(this.apiUrl ==='finalfirstDetail'){
			this.Api = finalfirstDetail
		}else if(this.apiUrl ==='finalsecondDetail'){
			this.Api = finalsecondDetail
		}
    },
    mounted () {
    	this.init();
    },
    methods: {
	  	init () {
      	}, // 初始化
	    saveSignConclusion (){//授信结论-保存
	    	if(!this.recheckData.creditLineAuditor2){
	    		this.$message.error('授信额度不能为空！');return;
	    	}
	      	let data = baseUtil.copy(this.recheckData)
	      	data.supplierId = this.supplierId
	      	this.Api.recheckSave(data).then(res => {
	          if (res.data.code === '200') {
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
	@import "approveDetail.scss";
</style>
<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
          	<div class="info-list" v-if="checkDetailData">
              	<p style="line-height: 40px;">审核意见</p>
              	
    			<el-form-item label="审核意见：">
    				<span v-if="readOnly">{{checkDetailData.checkOpinion}}</span>
    				<el-input v-else type="textarea" v-model="checkDetailData.checkOpinion" style="width: 100%;">
    				</el-input>
    			</el-form-item>
		    	<div v-if="!readOnly" style="text-align: right;">
                  <el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveCheck" type="primary" size="mini">保存</el-button>
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
	import checkDetail   from '@/api/collateralManage/checkDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'assess',
    components: { Upload ,Uploads},
    data () {
      	return {
      		enterpriseNameList:'',//企业名称列表
      	}
    },
    props:{
    	collateralId: {
	        type: String,
	        default: '' 
	    },
	    checkDetailData:{
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
      	saveCheck (){
	      	let data = baseUtil.copy(this.checkDetailData)
//	      	let _arr = [];
//	      	for(let i=0;i<data.evaluateFiles.length;i++){
//	      		if(data.evaluateFiles[i].key){
//	      			_arr.push(data.evaluateFiles[i].key)
//	      		}
//	      	}
	      	data.collateralId = this.collateralId
//	      	data.evaluateFiles = _arr.join();
      		checkDetail.checkSave(data).then(res => {
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
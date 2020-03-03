<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
          	<div class="info-list" v-if="outDetailData">
              	<p style="line-height: 40px;">出库详情</p>
              	
    			<el-form-item label="拍卖备注：">
    				<span v-if="readOnly">{{outDetailData.outRemark}}</span>
    				<el-input v-else type="textarea" v-model="outDetailData.outRemark" style="width: 100%;">
    				</el-input>
    			</el-form-item>
    			
    			<el-form-item label="拍卖附件：">
					<template v-for="(item,fileIndex) in outDetailData.outFiles" >
	                  	<Uploads 
	                  	v-model="item.key" 
	                  	:fileUrl="item.url" 
	                  	:dataObj="uploadImgData"  
	                  	actionUrl="/admin/collateral/upload_auction"></Uploads>
	                </template>
                	<div v-if="!readOnly">
	                  	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="addAssessDetailFiles" type="primary" size="mini">
	                  		新增评估附件
	                  	</el-button>
	                </div>
				</el-form-item>
		    	<div v-if="!readOnly" style="text-align: right;">
                  <el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveOut" type="primary" size="mini">保存</el-button>
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
	import outDetail   from '@/api/collateralManage/outDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'out',
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
	    outDetailData:{
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
	      	this.outDetailData.outFiles.push({key:'',url:''})
	    }, 
      	saveOut (){
	      	let data = baseUtil.copy(this.outDetailData)
	      	let _arr = [];
	      	for(let i=0;i<data.outFiles.length;i++){
	      		if(data.outFiles[i].key){
	      			_arr.push(data.outFiles[i].key)
	      		}
	      	}
	      	data.collateralId = this.collateralId
	      	data.outFiles = _arr.join();
      		outDetail.outSave(data).then(res => {
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
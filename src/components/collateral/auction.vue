<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
          	<div class="info-list" v-if="auctionDetailData">
              	<p style="line-height: 40px;">拍卖详情</p>
              	
				<el-form-item label="拍卖金额：">
					<span v-if="readOnly">{{auctionDetailData.auctionAmount}}</span>
    				<el-input v-else v-model="auctionDetailData.auctionAmount"  style="width: 200px;">
    					<template slot="append">元</template>
    				</el-input>
    			</el-form-item>
    			<el-form-item label="拍卖备注：">
					<span v-if="readOnly">{{auctionDetailData.auctionAmount}}</span>
    				<el-input v-else type="textarea" v-model="auctionDetailData.auctionReamrk" style="width: 100%;">
    				</el-input>
    			</el-form-item>
    			
    			<el-form-item label="拍卖附件：">
					<template v-for="(item,fileIndex) in auctionDetailData.auctionFiles" >
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
                  <el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveAuction" type="primary" size="mini">保存</el-button>
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
	import AuctionDetail   from '@/api/collateralManage/auctionDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'auction',
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
	    auctionDetailData:{
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
	      	this.auctionDetailData.auctionFiles.push({key:'',url:''})
	    }, 
      	saveAuction (){
	      	let data = baseUtil.copy(this.auctionDetailData)
	      	let _arr = [];
	      	for(let i=0;i<data.auctionFiles.length;i++){
	      		if(data.auctionFiles[i].key){
	      			_arr.push(data.auctionFiles[i].key)
	      		}
	      	}
	      	data.collateralId = this.collateralId
	      	data.auctionFiles = _arr.join();
      		AuctionDetail.auctionSave(data).then(res => {
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
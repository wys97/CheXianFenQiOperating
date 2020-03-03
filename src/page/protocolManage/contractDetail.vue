<template>
  <div class="container">
  	<div v-if="isLookImg" ref="lookImgBox" @click="clearImg"  class="look_img_box">
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
				<li>{{queryContractTopData.title}}</li>
				<!--<li>联系人：{{detailData.receiverName}}</li>
	      	<li>手机号：{{detailData.receiverPhone}}</li>-->
				<li>创建时间：{{queryContractTopData.createTime}}</li>
			</ul>
			<!--<div class="flex-item" style="text-align: right;margin-right: 50px;">
				<el-button :type="detailHeadData.status==='ENABLED'?'success':'info'" plain>{{detailHeadData.statusText}}</el-button>
			</div>-->
		</div>
		<div class="content">
			<div class="flex-item" style="width: 100%;padding: 10px 20px;">
				<el-tabs v-model="activeTab" type="card">
					<el-tab-pane label="合同信息" name="first">
        		<div class="tab-content">
        			<template>
				      	<Contract :add-contract="false" :id="id" @refreshTop="doRefreshTop">
				      	</Contract>
					    </template>
        		</div>
        	</el-tab-pane>
				</el-tabs>
				
			</div>
		</div>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Contract from '@/components/protocol/contract'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import contractDetail   from '@/api/protocolManage/contractDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'ContractDetail',
    components: { Contract },
    data () {
      	return {
	        id: '', // id
	        queryContractTopData:'',//头部信息
	        activeName2:'first',//
	        verifyEnterpriseSaleData:'',//-企业销售情况数据
	        guarantorDetailData:{
        		id:'',
        		supplierId:'',
        		enterpriseName:'',
        		licenseNo:'',
        		repreName:'',
        		repreIdCard:'',
        		collateralName:'',
        		collateralType:'',
        		typeText:'',
        		collateralSource:'',
        		sourceText:'',
        		collateralFiles:[{key:'',url:''}],
        		registerRemark:'',
        		status:'',
        		statusText:''
	        },//押品管理-信息登记-详情数据
	        contractDetailData:{
	        	id:'',
        		enterpriseName:'',
        		capitalName:'',
        		signStep:'',
        		signStepText:'',
        		agreementType:'',
        		agreementTypeText:'',
        		agreementNo:'',
        		agreementName:'',
        		files:[{key:'',url:''}],
        		remark:''
	        },
	        activeTab:'first',
	     	uploadFileData: {
	          financeNo: '',
	          isImage: false
	        },
	        uploadImgData: {
	          financeNo: '',
	          isImage: true
	        },
	     		isLookImg:false,
	        lookImgSrc:'',
	        deg:0,//图片旋转的角度
	        previewUrl:'',//应收账款转账确认书
	        tableData:[{
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄'
	          }
	        ],
      }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata' 
	  },
    computed: {
      statusActive () {
        const status = this.status;
        let num = 0
        if (status === 'TRANSFER_CONTRACT') {
          num = 0
        } else if (status === 'FINANCE_AUDIT_ING') {
          num = 1
        } else if (status === 'CAPTICAL_CONTRACT') {
          num = 2
        } else if (status === 'WAIT_LOAN') {
          num = 3
        } else if (status === 'SUCCESS') {
          num = 4
        } 
        return num
      },
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
      this.id = this.$route.params.id
      if (this.financeNo) {
      }
    },
    mounted () {
    	this.init();
    },
    methods: {
    	lookImg (imgSrc){//查看图片
	    	this.deg = 0;
    		var that = this;
    		that.lookImgSrc = imgSrc;
    		that.isLookImg = true;
    	},
    	clearImg(){//点击图片隐藏
    		this.deg = 0;
    		var that = this;
    		that.isLookImg = false;
    	},
    	rotateImg(type){//旋转图片
    		let deg = this.deg;
    		if(type==='left'){
    			this.deg-=90;
    		}else{
    			this.deg+=90;
    		}
    		let _height = window.getComputedStyle(this.$refs.lookImgBox).height;
    		let _width = window.getComputedStyle(this.$refs.lookImgBox).width;
    		if(this.isNineTenMutiple(this.deg)){
    			this.$refs.rotateImg.style.width = _width;
    			this.$refs.rotateImg.style.marginLeft = 'auto';
    		}else{
    			this.$refs.rotateImg.style.width = parseFloat(_height)-30+'px';
    			this.$refs.rotateImg.style.marginLeft = (parseFloat(_width)-parseFloat(_height))/2+'px';
    		}
    		this.$refs.rotateImg.style.transform = 'rotate('+this.deg+'deg)'
    	},
    	fetchdata(){
    		this.financeNo = this.$route.params.id
    		if (this.financeNo) {
	      }
	    },
	    
    	handleClick(tab){
    		if(tab.index==='0'){//押品信息
    		}else if(tab.index==='1'){//评级打分卡
    			this.getQueryScorecardQuery();//评级打分卡-查询
    		}else if(tab.index==='2'){
    				this.getQuerySignConclusion();//授信结论-查询
    		}
    	},
	  	init () {
//	  		this.getQueryRegisterDetail ();//押品管理-信息登记-详情查询
			this.getQueryContractTop ();//头部信息
      }, // 初始化
      doRefreshTop(val){//保存刷新头部信息
      	this.getQueryContractTop ();//头部信息
      },
      verieyCheck(){//尽调检查
      	
      },
      getQueryContractTop (){//头部信息
      	contractDetail.queryContractTop(this.id).then(res => {
          if (res.data.code === '200') {
          	this.queryContractTopData  = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getQueryRegisterDetail (){//押品管理-信息登记-详情查询
      	registerDetail.registerDetail(this.id).then(res => {
          if (res.data.code === '200') {
          	this.guarantorDetailData  = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
	  	doApproveFinal(){//取消
	  		registerDetail.registerCancel(this.id).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
	  	},
	  	doPass(){//通过
	  		this.$confirm('确认提交评估？', '操作提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        registerDetail.registerSubmit(this.id).then(res => {
	          if (res.data.code === '200') {
	            this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	      }).catch(() => {
	      })
	  	}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "contractDetail.scss";
</style>

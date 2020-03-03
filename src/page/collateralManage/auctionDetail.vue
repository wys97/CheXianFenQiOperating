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
    <div class="top" v-if="auctionHeadData">
      	<ul class="flex-item">
	      	<li>{{auctionHeadData.enterpriseName}}</li>
	      	<li>申请时间：{{auctionHeadData.applyTime}}</li>
      	</ul>
      	<div class="flex-item" style="text-align: right;padding-top: 0;">
	      	<span v-if="auctionHeadData.remark">原因：{{auctionHeadData.remark}}</span> 
	      	<el-button :type="auctionHeadData.status=='IN'?'success':'info'" size="mini">
	      		{{auctionHeadData.statusText}}
	      	</el-button>
	      </div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
      	<el-tabs v-model="activeName2" type="card"  @tab-click="handleClick">
	      	<el-tab-pane class="tab_content" label="押品信息" name="first">
            <div class="tab-content">
            	<div class="info-list">
	            	<template v-if="auctionDetailData.collateralInfo">
		              <Register :read-only="true" :supplier-id="collateralId" :register-detail-data="auctionDetailData.collateralInfo">
		              </Register>
		            </template>
	            </div>
	            <div class="info-list">
		            <template v-if="auctionDetailData.asssessment">
		              <Assess  :read-only="true" :collateral-id="collateralId" :assess-detail-data="auctionDetailData.asssessment">
		              </Assess>
		            </template>
	            </div>
	            <div class="info-list">
		            <template v-if="auctionDetailData.checkInfo">
		              <Check :read-only="true" :collateral-id="collateralId" :check-detail-data="auctionDetailData.checkInfo">
		              </Check>
		            </template>
	            </div>
	            <div class="info-list">
		            <template v-if="auctionDetailData.auction">
		              <Auction  :collateral-id="collateralId" :auction-detail-data="auctionDetailData.auction">
		              </Auction>
		            </template>
	            </div>
	            <div class="info-list">
		            <template v-if="auctionDetailData.out">
		              <Out 
		              	:read-only="(auctionHeadData.status=='AUCTIONED'||auctionHeadData.status=='OUT')?true:false"
		              	:collateral-id="collateralId" 
		              	:out-detail-data="auctionDetailData.out">
		              </Out>
		            </template>
	            </div>
            </div>
	        </el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
         	<li class="background-gray color-black">
            	<div>操作</div>	
          	</li>
           	<li v-if="!(auctionHeadData.status=='AUCTIONED'||auctionHeadData.status=='OUT')">
	            <div>
	              <!--<el-button v-if="!roleHasPermissions['finance_manage_register_list_audit']" @click="doApproveFinal">打回</el-button>-->
	              <el-button v-if="!roleHasPermissions['finance_manage_register_list_audit']"  type="primary" @click="doPass">拍卖确认</el-button>
	            </div>
          	</li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
  	<el-dialog title="请填打回原因：" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="remark"></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  	import { mapGetters } from 'vuex'
	import  Register from '@/components/collateral/register'
	import  Assess from '@/components/collateral/assess'
	import  Check from '@/components/collateral/check'
	import  Auction from '@/components/collateral/auction'
	import  Out from '@/components/collateral/out'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import auctionDetail   from '@/api/collateralManage/auctionDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'auctionDetail',
    components: { Register,Assess,Check,Auction,Out },
    data () {
      	return {
	        collateralId: '', // id
	        activeName2:'first',//
	        auctionHeadData:'',//头部信息
	        verifyEnterpriseSaleData:'',//-企业销售情况数据
	        auctionDetailData:'',//押品管理-拍卖详情数据
        	rejectDialogShow: false, // 打回原因dialog
       		remark: '', // 打回原因
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
      this.collateralId = this.$route.params.id
      this.uploadFileData.supplierId = this.financeNo
      this.uploadImgData.supplierId = this.financeNo
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
    		this.financeNo = this.$route.params.collateralId
    		if (this.financeNo) {
	      }
	    },
	    
    	handleClick(tab){
    		if(tab.index==='0'){//押品信息
    		}else if(tab.index==='1'){//评级打分卡
    		}else if(tab.index==='2'){
    		}
    	},
	  	init () {
	  		this.getQueryAuctionHead ();//尽调检查-头部信息-查询
	  		this.getQueryAuctionDetail ();//押品管理-押品预审详情
      	}, // 初始化
	    verieyCheck(){//尽调检查
	      	
	    },
	    getQueryAuctionHead (){//押品管理-头部信息
	      	auctionDetail.auctionHead(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.auctionHeadData  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
     	getQueryAuctionDetail (){//押品管理-押品拍卖详情
	      	auctionDetail.auctionDetail(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.auctionDetailData  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
      	},
	  	doApproveFinal(){//点击打回
	  		this.remark = ''
	        this.rejectDialogShow = true
	  	},
	  	approveFinal () {//打回提交
	        let data = {
	          collateralId: this.collateralId,
	          remark: ''
	        }
	        if (!validContent(this.remark)) {
				    this.$message.error('打回原因不能为空')
				    return
				  }
	        data.remark = this.remark.trim()
	        auctionDetail.repulseCheck(data).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryAuctionHead ();//尽调检查-头部信息-查询
	            this.$message.success(res.data.message)
	            this.rejectDialogShow = false
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    }, // 入驻成功、入驻失败 提交
	  	doPass(){//通过
	  		this.$confirm('确认拍卖？', '操作提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        auctionDetail.auctionConfirm(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryAuctionHead ();//尽调检查-头部信息-查询
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
  @import "collateralDetail.scss";
</style>

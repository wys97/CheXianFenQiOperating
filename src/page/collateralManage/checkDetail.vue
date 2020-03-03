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
    <div class="top" v-if="checkHeadData">
      	<ul class="flex-item">
	      	<li>{{checkHeadData.enterpriseName}}</li>
	      	<li>申请时间：{{checkHeadData.applyTime}}</li>
      	</ul>
      	<div class="flex-item" style="text-align: right;padding-top: 0;">
	      	<span v-if="checkHeadData.remark">原因：{{checkHeadData.remark}}</span> 
	      	<el-button :type="checkHeadData.status=='INIT'?'warning':checkHeadData.status=='EVALUATING'?'success':checkHeadData.status=='CANCELED'?'info':checkHeadData.status=='REJECT_EVALUATE'?'danger':''" size="mini">
	      		{{checkHeadData.statusText}}
	      	</el-button>
	      </div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
      	<el-tabs v-model="activeName2" type="card"  @tab-click="handleClick">
	      	<el-tab-pane class="tab_content" label="押品信息" name="first">
            <div class="tab-content">
            	<div class="info-list">
	            	<template v-if="checkDetailData.collateralInfo">
		              <Register :read-only="true" :supplier-id="collateralId" :register-detail-data="checkDetailData.collateralInfo">
		              </Register>
		            </template>
	            </div>
	            <div class="info-list">
		            <template v-if="checkDetailData.asssessment">
		              <Assess :read-only="true" :collateral-id="collateralId" :assess-detail-data="checkDetailData.asssessment">
		              </Assess>
		            </template>
	            </div>
	            <div class="info-list">
		            <template v-if="checkDetailData.checkInfo">
		              <Check 
		              	:read-only="(checkHeadData.status=='REJECT_CHECK'||checkHeadData.status=='PASS')?true:false"
		              	:collateral-id="collateralId" 
		              	:check-detail-data="checkDetailData.checkInfo">
		              </Check>
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
           	<li v-if="!(checkHeadData.status=='REJECT_CHECK'||checkHeadData.status=='PASS')">
	            <div>
	              <el-button v-if="!roleHasPermissions['finance_manage_register_list_audit']" @click="doApproveFinal">打回</el-button>
	              <el-button v-if="!roleHasPermissions['finance_manage_register_list_audit']"  type="primary" @click="doPass">审核通过</el-button>
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
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import checkDetail   from '@/api/collateralManage/checkDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'check',
    components: { Register,Assess,Check },
    data () {
      	return {
	        collateralId: '', // id
	        activeName2:'first',//
	        checkHeadData:'',//头部信息
	        verifyEnterpriseSaleData:'',//-企业销售情况数据
	        checkDetailData:'',//押品管理-押品预审详情数据
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
	  		this.getQueryCheckHead ();//尽调检查-头部信息-查询
	  		this.getQueryCheckDetail ();//押品管理-押品预审详情
      	}, // 初始化
	    verieyCheck(){//尽调检查
	      	
	    },
	    getQueryCheckHead (){//押品管理-头部信息
	      	checkDetail.checkHead(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.checkHeadData  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
     	getQueryCheckDetail (){//押品管理-押品预审详情
	      	checkDetail.checkDetail(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.checkDetailData  = res.data.data;
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
	        checkDetail.repulseCheck(data).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryCheckHead ();//尽调检查-头部信息-查询
	            this.$message.success(res.data.message)
	            this.rejectDialogShow = false
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    }, // 入驻成功、入驻失败 提交
	  	doPass(){//通过
	  		this.$confirm('确认提交预审？', '操作提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        checkDetail.submitCheck(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryCheckHead ();//尽调检查-头部信息-查询
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

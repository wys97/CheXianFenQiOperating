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
    <div class="top" v-if="registerHeadData">
      	<ul class="flex-item">
	      	<li>{{registerHeadData.enterpriseName}}</li>
	      	<li>申请时间：{{registerHeadData.applyTime}}</li>
      	</ul>
      	<div class="flex-item" style="text-align: right;padding-top: 0;">
	      	<span v-if="registerHeadData.remark">原因：{{registerHeadData.remark}}</span> 
	      	<el-button :type="registerHeadData.status=='INIT'?'warning':registerHeadData.status=='EVALUATING'?'success':registerHeadData.status=='CANCELED'?'info':registerHeadData.status=='REJECT_EVALUATE'?'danger':''" size="mini">
	      		{{registerHeadData.statusText}}
	      	</el-button>
	      </div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
      	<el-tabs v-model="activeName2" type="card"  @tab-click="handleClick">
	      	<el-tab-pane class="tab_content" label="押品信息" name="first">
            <div class="tab-content">
            	<div class="info-list">
	            	<template v-if="registerDetailData">
		              <Register :supplier-id="collateralId" :register-detail-data="registerDetailData">
		              </Register>
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
           	<li v-if="!(registerHeadData.status=='EVALUATING'||registerHeadData.status=='CANCELED')">
	            <div>
	              <el-button v-if="!roleHasPermissions['finance_manage_register_list_audit']" @click="doApproveFinal">取消</el-button>
	              <el-button v-if="!roleHasPermissions['finance_manage_register_list_audit']"  type="primary" @click="doPass">提交评估</el-button>
	            </div>
          	</li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Register from '@/components/collateral/register'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import registerDetail   from '@/api/collateralManage/registerDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'FinanceDetail',
    components: { Register },
    data () {
      	return {
	        collateralId: '', // collateralId
	        activeName2:'first',//
	        registerHeadData:'',//头部信息
	        verifyEnterpriseSaleData:'',//-企业销售情况数据
	        registerDetailData:{
	        	id:'',
        		supplierId:'',
        		enterpriseName:'',
        		licenseNo:'',
        		repreName:'',
        		repreIdCard:'',
        		name:'',
        		type:'',
        		typeText:'',
        		source:'',
        		sourceText:'',
        		files:[{key:'',url:''}],
        		remark:'',
        		status:'',
        		statusText:''
	        },//押品管理-信息登记-详情数据
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
	  		this.getQueryRegisterHead ();//尽调检查-头部-查询
	  		this.getQueryRegisterDetail ();//押品管理-信息登记-详情查询
      }, // 初始化
      verieyCheck(){//尽调检查
      	
      },
      getQueryRegisterHead (){//押品管理-信息登记-头部信息
      	registerDetail.registerHead(this.collateralId).then(res => {
          if (res.data.code === '200') {
          	this.registerHeadData  = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getQueryRegisterDetail (){//押品管理-信息登记-详情查询
      	registerDetail.registerDetail(this.collateralId).then(res => {
          if (res.data.code === '200') {
          	this.registerDetailData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
	  	doApproveFinal(){//取消
	  		this.$confirm('确认取消评估？', '操作提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        registerDetail.registerCancel(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryRegisterHead ();//尽调检查-头部-查询
	            this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	      }).catch(() => {
	      })
	  		
	  	},
	  	doPass(){//通过
	  		this.$confirm('确认提交评估？', '操作提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        registerDetail.registerSubmit(this.collateralId).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryRegisterHead ();//尽调检查-头部-查询
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

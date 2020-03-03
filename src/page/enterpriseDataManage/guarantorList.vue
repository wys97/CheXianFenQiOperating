<template>
  <div class="container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
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
  	<div class="content2">
  		<div style="height: 100%;width:100%;overflow-y: auto;">
		    <el-table :data="list">
		      <el-table-column
		        type="index"
		        width="100"
		        label="序号">
		      </el-table-column>
		      <el-table-column
		        prop="id"
		        label="担保编号">
		      </el-table-column>
		      
		      <el-table-column
		        prop="name"
		        label="担保人信息">
		        <template slot-scope="scope" >
		          <span>{{scope.row.name}}</span>
		          <span>{{scope.row.idcardNo}}</span>
		        </template>
		      </el-table-column>
		      
		      <el-table-column
		        prop="mobile"
		        label="担保人手机号">
		      </el-table-column>
		
		    </el-table>
		  </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage} from '@/utils/common'
  import apiCommon from '@/api/common'
  import { getListData,collateralRegisterStatus} from '@/api/enterpriseDataManage/guarantorList'
  import { Format } from '@/utils/index'

  export default {
    name: 'SupplierRegister',
    filters: {
      filterStatus: function (value) {
        if (value === 'PASS') {
          return 'suc'
        } else if (value === 'REJECT') {
          return 'fail'
        }
      }
    },
    data () {
      return {
      	supplierId:'',
        isLookImg:false,
        lookImgSrc:'',
        collateralTypeList:'',//押品类型下拉
        registerStatusList:'',//申请登记-状态下拉
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          collateralId:'',
          type:'',
          enterpriseName: '', // 企业名
          licenseNo: '', // 信用代码
          repreName:'',//法定代表人姓名
          repreIdCard:'',//法定代表人手机
          status: '', // 状态
        },
        shipDate:[],// 时间范围
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this),
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    watch :{
    	shipDate(val,oldVal){
    		let that = this;
    		if(val[0]){
    			that.listQuery.beginCreateTime = Format(val[0], 'yyyy-MM-dd');
    		}else{
    			that.listQuery.beginCreateTime = '';
    		}
	  		if(val[1]){
	  			that.listQuery.endCreateTime = Format(val[1], 'yyyy-MM-dd');
	  		}else{
    			that.listQuery.endCreateTime = '';
	  		}
	  	}  
    },
    created () {
    	this.supplierId = this.$route.params.id
      if (this.supplierId) {
        this.getList()
      }
    },
    mounted () {
//    this.getCollateralTypeList();//获取押品下拉
//    this.getRegisterStatusList();//申请登记-状态下拉
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
      getCollateralTypeList (){//获取押品下拉
      	apiCommon.collateralType ().then(res => {
          if (res.data.code === '200') {
          	this.collateralTypeList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getRegisterStatusList (){//申请登记-状态下拉
      	collateralRegisterStatus ().then(res => {
          if (res.data.code === '200') {
          	this.registerStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getList () {
        getListData(this.supplierId).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data
//          this.total = res.data.data.total
            this.list = listData
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
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
      search(){
      	let that = this;
      	that.getList();
      },//查询
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.shipDate = [];
      },//重置表单
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
	@import "enterpriseData.scss";
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
      &:last-of-type{
        border-right: none;
      }
    }
  }
  .router-link{
    display: block;
    color:#409EFF;
  }
  .content2 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    height: calc(100% - 175px);
    font-size: 13px;
	}
	.container{
		background-color: #fff;
	}
</style>


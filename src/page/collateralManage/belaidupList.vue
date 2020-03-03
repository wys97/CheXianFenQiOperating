<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="押品编号：" prop="collateralId">
          <el-input v-model="listQuery.collateralId" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="押品类型：" prop="type">
          <el-select v-model="listQuery.type" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="collateralTypeList" v-for="(val,key) in collateralTypeList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码：" prop="licenseNo">
          <el-input v-model="listQuery.licenseNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人姓名：" prop="repreName">
          <el-input v-model="listQuery.repreName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人身份证：" prop="repreIdCard">
          <el-input v-model="listQuery.repreIdCard" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="registerStatusList" v-for="(val,key) in registerStatusList" :label="val" :value="key" :key="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search"  size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    	
    	<hr class="hr"/>
	    <div class="table_title_box">
	    	<span>押品入库</span>
	    	<span>
	    		<el-button  @click="belaidupDialogFormVisible = true" type="primary" size="mini">选择入库</el-button>
	    	</span>
      </div>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        prop="collateralId"
        min-width="160"
        label="押品编号">
      </el-table-column>
      
      <el-table-column
        prop="collateralName"
        label="押品名称">
      </el-table-column>
      
      <el-table-column
        prop="type"
        label="押品类型">
      </el-table-column>
      
      <el-table-column
        prop="enterpriseName"
        min-width="220"
        label="企业信息">
        <template slot-scope="scope" >
          <div>{{scope.row.enterpriseName}}</div>
          <div>{{scope.row.licenseNo}}</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="repreName"
        min-width="200"
        label="法定代表人">
        <template slot-scope="scope" >
          <div>{{scope.row.repreName}}</div>
          <div>{{scope.row.repreIdCard}}</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="discountAmount"
        label="折后价值（元）">
      </el-table-column>
      
      <el-table-column
        prop="auctionAmount"
        label="拍卖金额（元）">
      </el-table-column>
      <el-table-column
        prop="statusText"
        label="状态">
        <template slot-scope="scope" >
        	<span :class="scope.row.status==='IN'?'suc':'draw' ">
          	{{scope.row.statusText}}
         	</span>
        </template>
      </el-table-column>
      
      <el-table-column
        label="操作"
        prop="collateralId"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
            <router-link :to="'belaidupDetail/' + scope.row.collateralId" class="router-link">查看</router-link>
        </template>
      </el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <el-dialog 
    	title="选择入库" 
    	width="90%" 
    	top="5vh"  
    	:visible.sync="belaidupDialogFormVisible">
		  <belaidupSelect></belaidupSelect>
		  <!--<div slot="footer" class="dialog-footer">
		    <el-button @click="belaidupDialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="belaidupDialogFormVisible = false">确 定</el-button>
		  </div>-->
		</el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage} from '@/utils/common'
  import apiCommon from '@/api/common'
  import { getListData,collateraCheckStatus} from '@/api/collateralManage/belaidupList'
  import { Format } from '@/utils/index'
  import belaidupSelect from '@/page/collateralManage/belaidupSelect'

  export default {
    name: 'belaidupList',
    components:{belaidupSelect},
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
      	belaidupDialogFormVisible:false,//选择入库dialog
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
	  	},
	  	belaidupDialogFormVisible(val,oldVal){
	  		if(!val){
	  			this.getList()
	  		}
	  	}
    },
    created () {
    },
    mounted () {
      this.getList()
      this.getCollateralTypeList();//获取押品下拉
      this.getRegisterStatusList();//申请登记-状态下拉
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
      	collateraCheckStatus ().then(res => {
          if (res.data.code === '200') {
          	this.registerStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getList () {
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = listData
          } else {
            this.$message.error(res.data.message)
          }
        })
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
</style>


<template>
  <div class="page-container" ref="page-container" id="page-container"><!---代理商管理--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="代理商名称：" prop="agentName">
          <el-input v-model="listQuery.agentName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人名称：" prop="contactName">
          <el-input v-model="listQuery.contactName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号：" prop="contactMobile">
          <el-input v-model="listQuery.contactMobile" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="agentStatus">
          <el-select v-model="listQuery.agentStatus" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="agentStatusList" v-for="(val,key) in agentStatusList" :label="val" :value='key' :key='key'>
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
	    	<span>代理商管理</span>
	    	<router-link :to="'agentAdd'" class="router-link">
	    		<el-button type="primary" size="mini">新增</el-button>
	    	</router-link>
      </div>
    </div>
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        prop="agentId"
        width="200"
        label="代理商编号">
      </el-table-column>

      <el-table-column
        prop="agentName"
        width="220"
        label="代理商名称">
      </el-table-column>

      <el-table-column
        prop="agentTypeText"
        label="代理商类型">
      </el-table-column>

      <el-table-column
        prop="contactName"
        label="联系人名称">
      </el-table-column>

      <el-table-column
        prop="contactMobile"
        label="联系人手机号">
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>

      <el-table-column
        prop="agentStatusText"
        width="80"
        label="状态">
        <template slot-scope="scope" >
          <span :class="scope.row.agentStatus==='DISABED'?'war':scope.row.agentStatus==='ENABLED'?'suc':scope.row.agentStatus==='DISABLED'?'fail':'draw' ">
          	{{scope.row.agentStatusText}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="160"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
            <router-link :to="'agentDetail/' + scope.row.agentId" style="float:left" class="router-link">查看&nbsp;&nbsp;</router-link>
            <router-link :to="'agentUpdate/' + scope.row.agentId" style="float:left" class="router-link">修改&nbsp;&nbsp;</router-link>
            <span style="float:left; cursor:pointer" class="router-link" @click="agentListDelete(scope.row.agentId)">删除</span>
        </template>
      </el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage} from '@/utils/common'
  import apiCommon from '@/api/common'
  import agentList from '@/api/agentManage/agentList'
  import agentDetail from '@/api/agentManage/agentDetail'
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
        registerStatusList:'',//申请登记-状态下拉
        agentStatusList:'',  //代理商状态下拉
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          agentName: '', // 代理商名称
          contactName: '', // 联系人名称
          contactMobile:'',//联系人手机号
          agentStatus: '', // 状态
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
    },
    mounted () {
      this.getAgentStatusList()   //代理商状态下拉
      this.getList()
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },

    methods: {


      //代理商状态下拉
      getAgentStatusList (){
        agentList.agentStatusList ().then(res => {
          if (res.data.code === '200') {
          	this.agentStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },

      //代理商删除
      agentListDelete(agentId) {
        this.$confirm('此操作将删除代理商信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          agentDetail.agentDelete(agentId).then(res => {
            if (res.data.code === '200') {
              this.$message.success(res.data.message)
              this.getList()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(() => {
          })
        }).catch(() => {
        });
      },


      //列表数据
      getList () {
        agentList.getListData(this.listQuery).then(res => {
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
    // display: block;
    color:#409EFF;
  }
</style>


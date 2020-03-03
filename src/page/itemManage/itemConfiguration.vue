<template>
  <div class="page-container" ref="page-container" id="page-container" style="overflow:auto">
    <!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <!-- <div style="font-size:22px; padding:20px 18px">项目管理</div> -->
      <el-form :inline="true" ref="listQueryForm" :model="listQuery" class="form_wrap">
        <el-form-item label="项目编号：" prop="projectNo">
          <el-input style="width:200px;" v-model="listQuery.projectNo"></el-input>
        </el-form-item>
        <el-form-item label="项目名称：" prop="projectName">
          <el-input style="width:200px;" v-model="listQuery.projectName"></el-input>
        </el-form-item>
        <el-form-item label="场景方名称：" prop="partnerName">
          <el-input style="width:200px;" v-model="listQuery.partnerName"></el-input>
        </el-form-item>
        <el-form-item label="状态：" class="query-select" prop="projectStatus">
          <el-select style="width:200px;" v-model="listQuery.projectStatus">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="status"
              v-for="(val,key) in status"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn_wrap">
          <el-button size="mini" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-refresh"
            @click="resetForm('listQueryForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="list_wrap" style="border-top:1px solid #999; margin:10px 0">
      <div class="xtit">
        <div class="xliebiao">项目管理列表</div>
        <div style="text-align:right">
          <router-link to="/createProject">
          <el-button type="primary" style="margin: 15px 100px 15px 0; padding: 7px 23px; font-size:12px;">创建</el-button>
          </router-link>
        </div>
      </div>
      <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%;" :data="listData">
        <el-table-column label="项目编号" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <router-link :to="'/projectDetails/'+scope.row.projectNo" style="color:#4EA3CF; font-weight: bold">{{scope.row.projectNo}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="partnerName"
          label="场景方名称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectFund"
          label="项目规模(元)"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="setupDate"
          label="成立日期"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="expectedEndDate"
          label="预计结束日期"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column prop="projectStatusText" label="状态" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">      
              <span
                style="margin: 0 8px"
                :class="scope.row.projectStatus=='ENABLED'?disabled:(scope.row.projectStatus=='DISABLED'&&operate)"
                @click="routerLink(scope.row)"
              >
              修改
              </span>
            <span
              style="margin: 0 8px"
              :class="scope.row.projectStatus=='ENABLED'?disabled:(scope.row.projectStatus=='DISABLED'&&operate)"
              @click="startBtn(scope.row)"
            >启用</span>
            <span
              style="margin: 0 8px"
              :class="scope.row.projectStatus=='ENABLED'?operate:(scope.row.projectStatus=='DISABLED'&&disabled)"
              @click="blockUpBtn(scope.row)"
            >停用</span>
            <span
              style="margin: 0 8px"
              :class="scope.row.projectStatus=='ENABLED'?disabled:(scope.row.projectStatus=='DISABLED'&&operate)"
              @click="removeBtn(scope.row)"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>




<script>
import {
  handleSelectionChange,
  handleSizeChange,
  handleCurrentPage
} from "@/utils/common";
const axios = require("axios");
export default {
  name: "roleManage",
  data() {
    return {
      total: 0, // 表格数据总条数

      listQuery: {
        projectNo:'',  //项目编号		
        partnerName:'', //场景方名称		
        projectName: "", //项目名称	
        projectFund:'', //项目规模		
        setupDate:'', //成立日期		
        expectedEndDate:'', //预计结束日期			
        projectStatus:'', //项目状态			
        page: 1,  //请求页
        limit: 20  //请求
      },
      listData: [], //列表
      type: [], //产品类型
      status: {}, //状态

      style: false, //按钮样式
      operate: "operate", //允许点击
      disabled: "disabled", //禁止点击
      addFileDialogShow: false, //启用按钮确定弹框
      handleSizeChange: handleSizeChange.bind(this),
      handleCurrentPage: handleCurrentPage.bind(this)
    };
  },

  created() {
    this.getList();
    this.getListQueryState();
  },

  methods: {
    //查询
    search() {
      this.getList();
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //列表数据
    getList() {
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });
      axios({
        method: "post",
        url: "" + "/admin/project/list",
        data: this.listQuery
      })
        .then(res => {
           loading.close();
          if (res.data.code == "200") {
            this.listData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },

    //获取 产品类型 .状态
    getListQueryState() {
    
   

      //状态
      axios({
        method: "get",
        url: "" + "/admin/project/project-status"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.status = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },


    //修改按钮
    routerLink(value){
      if(value.projectStatus=='DISABLED'){
       this.$router.push({path:'/createProject', query: {id: value.projectNo}})
      }
    },

    //启用按钮
    startBtn(value) {
      //插槽传值
      if (value.projectStatus != "ENABLED") {
        axios({
          method: "post",
          url: "" + "/admin/project/enabled/" + value.projectNo
        })
          .then(res => {
            if (res.data.code == "200") {
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {});
      }
    },
    //停用按钮
    blockUpBtn(value) {
      if (value.projectStatus != "DISABLED") {
        axios({
          method: "post",
          url: "" + "/admin/project/disabled/" + value.projectNo
        })
          .then(res => {
            if (res.data.code == "200") {
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {});
      }
    },
    //删除按钮
    removeBtn(value) {
      if (value.projectStatus != "ENABLED") {

        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "post",
              url: "" + "/admin/project/delete/" + value.projectNo
            }).then(res => {
                if (res.data.code == "200") {
                  this.getList();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message.error(res.data.message);
                }
              }).catch(err => {});
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  }
};
</script>


<style scoped>
.operate {
  color: #409eff;
}
.operate:hover,
.disabled:hover {
  cursor: pointer;
}
.disabled {
  color: #909399;
}
.xtit {
  display: flex;
  justify-content: space-between;
}
.xliebiao {
  padding: 20px 60px;
  font-size: 13px;
}
</style>
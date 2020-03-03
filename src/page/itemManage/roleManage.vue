<template>
  <div class="page-container" ref="page-container" id="page-container" style="overflow:auto">
    <!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <!-- <div style="font-size:22px; padding:10px 18px">场景方管理</div> -->
      <el-form :inline="true" ref="listQueryForm" :model="listQuery" class="form_wrap">
        <el-form-item label="场景方编号：" prop="partnerNo">
          <el-input style="width:200px;" v-model="listQuery.partnerNo"></el-input>
        </el-form-item>
        <el-form-item label="场景方名称：" prop="partnerName">
          <el-input style="width:200px;" v-model="listQuery.partnerName"></el-input>
        </el-form-item>
        <el-form-item label="公司类型：" class="query-select" prop="partnerBusiness">
          <el-select style="width:200px;" v-model="listQuery.partnerBusiness">
            <el-option label="全部" value></el-option>
            <el-option v-if="type" v-for="(val,key) in type" :label="val" :value="val" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开通产品：" class="query-select" prop="productNo">
          <el-select style="width:200px;" v-model="listQuery.productNo">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="productInfo"
              v-for="(val,key) in productInfo"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" class="query-select" prop="partnerStatus">
          <el-select style="width:200px;" v-model="listQuery.partnerStatus">
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
      <div class="tvb">
        <div class="changjing">场景方列表</div>
        <div style="text-align:right;" >
          <router-link to="/createScene">
          <el-button type="primary" style="margin: 15px 85px 15px 0; padding: 7px 23px; font-size:12px;">创建</el-button>
          </router-link>
        </div>
      </div>
      <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%;" :data="listData">
        <el-table-column label="场景方编号" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <router-link :to="'/roleManageDetails/'+scope.row.partnerNo" style="color:#4EA3CF; font-weight: bold">{{scope.row.partnerNo}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="partnerName"
          label="场景方名称"
          show-overflow-tooltip
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column prop="partnerBusiness" label="公司类型" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column
          prop="enabledProducts"
          label="开通产品"
          show-overflow-tooltip
          align="center"
          width="240"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
          width="220"
        ></el-table-column>
        <el-table-column prop="partnerStatusText" label="状态" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">      
              <span
                style="margin: 0 8px"
                :class="scope.row.partnerStatus=='ENABLED'?disabled:(scope.row.partnerStatus=='DISABLED'&&operate)"
                @click="routerLink(scope.row)"
              >
              修改
              </span>
            <span
              style="margin: 0 8px"
              :class="scope.row.partnerStatus=='ENABLED'?disabled:(scope.row.partnerStatus=='DISABLED'&&operate)"
              @click="startBtn(scope.row)"
            >启用</span>
            <span
              style="margin: 0 8px"
              :class="scope.row.partnerStatus=='ENABLED'?operate:(scope.row.partnerStatus=='DISABLED'&&disabled)"
              @click="blockUpBtn(scope.row)"
            >停用</span>
            <span
              style="margin: 0 8px"
              :class="scope.row.partnerStatus=='ENABLED'?disabled:(scope.row.partnerStatus=='DISABLED'&&operate)"
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
        partnerNo: "", //场景方编号
        partnerName: "", //场景方名称
        partnerBusiness: "", //公司类型
        partnerStatus: "", //状态
        productNo: "", //产品编号
        page: 1,
        limit: 20
      },
      listData: [], //列表数据
      type: [], //公司类型
      productInfo: {}, //公司产品
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
      axios({
        method: "post",
        url: "" + "/admin/partner/list",
        data: this.listQuery
      })
        .then(res => {
          if (res.data.code == "200") {
            this.listData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },

    //获取开通产品. 公司类型 .状态
    getListQueryState() {
      //获取开通产品
      axios({
        method: "get",
        url: "" + "/admin/common/product-info"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.productInfo = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});

      //公司类型
      axios({
        method: "get",
        url: "" + "/admin/partner/type"
      })
        .then(res => {
          if (res.data.code == "200") {
            console.log(res)
            this.type = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});

      //状态
      axios({
        method: "get",
        url: "" + "/admin/partner/status"
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
      if(value.partnerStatus=='DISABLED'){
       
       this.$router.push({path:'/createScene', query: {id: value.partnerNo}})
      }
    },

    //启用按钮
    startBtn(value) {
      //插槽传值
      if (value.partnerStatus != "ENABLED") {
        axios({
          method: "post",
          url: "" + "/admin/partner/enable/" + value.partnerNo
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
      if (value.partnerStatus != "DISABLED") {
        axios({
          method: "post",
          url: "" + "/admin/partner/disable/" + value.partnerNo
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
      if (value.partnerStatus != "ENABLED") {

        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "post",
              url: "" + "/admin/partner/delete/" + value.partnerNo
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
.tvb {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
}
.changjing {
  padding: 18px 65px;
  font-size:13px;
}
</style>
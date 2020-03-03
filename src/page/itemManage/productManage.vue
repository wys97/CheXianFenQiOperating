<template>
  <div class="page-container" ref="page-container" id="page-container" style="overflow:auto">
    <!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <!-- <div style="font-size:22px; padding:20px 18px">产品管理</div> -->
      <el-form :inline="true" ref="listQueryForm" :model="listQuery" class="form_wrap">
        <el-form-item label="产品编号：" prop="productNo">
          <el-input style="width:200px;" v-model="listQuery.productNo"></el-input>
        </el-form-item>
        <el-form-item label="产品名称：" prop="productName">
          <el-input style="width:200px;" v-model="listQuery.productName"></el-input>
        </el-form-item>
        <el-form-item label="场景方编号：" prop="partnerNo">
          <el-input style="width:200px;" v-model="listQuery.partnerNo"></el-input>
        </el-form-item>
        <el-form-item label="场景方名称：" prop="partnerName">
          <el-input style="width:200px;" v-model="listQuery.partnerName"></el-input>
        </el-form-item>
        <el-form-item label="产品类型：" class="query-select" prop="productType">
          <el-select style="width:200px;" v-model="listQuery.productType">
            <el-option label="全部" value></el-option>
            <el-option v-if="type" v-for="(val,key) in type" :label="val" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品状态：" class="query-select" prop="productStatus" style="padding-right:495px">
          <el-select style="width:200px;" v-model="listQuery.productStatus">
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
      <div class="cping">
        <div class="liebiao">产品管理列表</div>
        <div style="text-align:right">
          <router-link to="/createProductInformation">
          <el-button type="primary" style="margin: 15px 100px 15px 0; padding: 7px 23px; font-size:12px;">创建</el-button>
          </router-link>
        </div>
      </div>
      <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%;" :data="listData">
        <el-table-column label="产品编号" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <router-link :to="'/createProductDetails/'+scope.row.productNo" style="color:#4EA3CF; font-weight: bold">{{scope.row.productNo}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="productTypeText"
          label="产品类型"
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
          prop="partnerNo"
          label="场景方编号"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column prop="productStatusText" label="状态" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">      
              <span
                style="margin: 0 8px"
                :class="scope.row.productStatus=='ENABLED'?disabled:(scope.row.productStatus=='DISABLED'&&operate)"
                @click="routerLink(scope.row)"
              >
              修改
              </span>
            <span
              style="margin: 0 8px"
              :class="scope.row.productStatus=='ENABLED'?disabled:(scope.row.productStatus=='DISABLED'&&operate)"
              @click="startBtn(scope.row)"
            >启用</span>
            <span
              style="margin: 0 8px"
              :class="scope.row.productStatus=='ENABLED'?operate:(scope.row.productStatus=='DISABLED'&&disabled)"
              @click="blockUpBtn(scope.row)"
            >停用</span>
            <span
              style="margin: 0 8px"
              :class="scope.row.productStatus=='ENABLED'?disabled:(scope.row.productStatus=='DISABLED'&&operate)"
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
        productNo:'',  //产品编号	
        productName:'', //产品名称	
        partnerNo: "", //场景方编号
        partnerName: "", //场景方名称
        productType:'', //产品类型	
        productStatus:'', //产品状态	
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
        url: "" + "/admin/product/list",
        data: this.listQuery
      })
        .then(res => {
           loading.close();
          console.log(res)
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
    
      //产品类型
      axios({
        method: "get",
        url: "" + "/admin/product/product-type"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.type = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});

      //状态
      axios({
        method: "get",
        url: "" + "/admin/product/product-status"
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
      if(value.productStatus=='DISABLED'){
       this.$router.push({path:'/createProductInformation', query: {id: value.productNo}})
      }
    },

    //启用按钮
    startBtn(value) {
      //插槽传值
      if (value.productStatus != "ENABLED") {
        axios({
          method: "post",
          url: "" + "/admin/product/enabled/" + value.productNo
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
      if (value.productStatus != "DISABLED") {
        axios({
          method: "post",
          url: "" + "/admin/product/disabled/" + value.productNo
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
      if (value.productStatus != "ENABLED") {

        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "post",
              url: "" + "/admin/product/delete/" + value.productNo
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
.cping {
  display: flex;
  justify-content: space-between;
}
.liebiao {
  padding: 20px 75px;
  font-size: 13px;
}
</style>
<template>
  <div class="page-container" ref="page-container" id="page-container">
    <!---还款列表--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="业务单号：" prop="orderNo">
          <el-input v-model="listQuery.orderNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="还款人名称：" prop="repayeeName">
          <el-input v-model="listQuery.repayeeName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="投保企业名称：" prop="partnerName">
          <el-input v-model="listQuery.partnerName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="计划还款时间：" prop="dueDate">
          <el-date-picker v-model="listQuery.dueDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="当前还款状态：" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:110px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="orderStatusList"
              v-for="(val,key) in orderStatusList"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button
            @click="resetForm('listQueryForm')"
            size="mini"
            type="primary"
            icon="el-icon-refresh"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" @current-change="handleSelectionChange"  highlight-current-row max-height='600'>
        <el-table-column prop="orderNo" width="250" label="业务单号/期数" >
        <template slot-scope="scope">
          <p>{{scope.row.orderNo}}</p>
          <p>第{{scope.row.periodNo}}/{{scope.row.installmentNum}}期</p>
        </template>
      </el-table-column>

      <el-table-column prop="repayeeName" label="还款人（被保人）"></el-table-column>

      <el-table-column prop="companyName" label="投保企业名称"></el-table-column>

      <el-table-column prop="payableAmount" label="计划还款金额（元）"></el-table-column>
      <el-table-column prop="repayAmount" label="已还金额（元）"></el-table-column>
      <el-table-column prop="remainderAmount" label="剩余应还金额（元）"></el-table-column>
      <el-table-column prop="dueDate" label="计划还款时间"></el-table-column>
      <el-table-column label="当期还款状态">
        <template slot-scope="scope">
          <span style="color:#009900" v-if="scope.row.status=='已结清'">已结清</span>
          <span style="color:red" v-else-if="scope.row.status=='已逾期'">已逾期</span>
          <span v-else="scope.row.status=='未结清'">未结清</span>
        </template>
      </el-table-column>
      <el-table-column label="是否逾期">
        <template slot-scope="scope">
          <span v-if="scope.row.overduestatus=='未逾期'">未逾期</span>
          <span style="color:red" v-else-if="scope.row.overduestatus=='已逾期'">已逾期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="122" align="center">
        <template slot-scope="scope">
          <router-link
            :to="{path:'repaymentDetail/'+scope.row.orderNo+'/'+scope.row.periodNo}"
            class="router-link"
          >查看</router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" ref="pagination-container" id="pagination-container">
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
import { mapGetters } from "vuex";
import {
  handleSelectionChange,
  handleSizeChange,
  handleCurrentPage
} from "@/utils/common";
import networkRequest from "@/api/repaymentManage/repaymentList";
import { customerType } from "@/api/common";
import { Format } from "@/utils/index";

export default {
  name: "repaymentList",
  filters: {
    filterStatus: function(value) {
      if (value === "PASS") {
        return "suc";
      } else if (value === "REJECT") {
        return "fail";
      }
    }
  },
  data() {
    return {
      orderStatusList: "", //当前还款状态下拉列表

      list: [],
      total: 0, // 表格数据总条数
      listQuery: {
        // 查询参数
        page: 1,
        limit: 30,
        orderNo: "", // 业务订单号
        repayeeName: "", // 还款人名称
        partnerName: "", // 投保企业名称
        dueDate: "", // 计划还款日期
        status: "" //当期还款状态(已结清,未结清,已逾期)
      },
      // shipDate: [], // 时间范围
      // yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
      // selectedData: "", // 选中某一行的数据
      handleSelectionChange: handleSelectionChange.bind(this),
      handleSizeChange: handleSizeChange.bind(this),
      handleCurrentPage: handleCurrentPage.bind(this)
    };
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ])
  },
  watch: {},
  created() {
    this.getOrderStatus();
  },
  mounted() {
    this.getList(1);
  },
  methods: {
    getOrderStatus() {
      networkRequest.orderStatus().then(res => {
        if (res.data.code === "200") {
          this.orderStatusList = res.data.data;
          for (let i in res.data.data) {
            return (this.listQuery.status = res.data.data[i]);
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    getList(value) {
      //默认查未结清
      if (value == 1) {
        let data = {
          // 查询参数
          page: 1,
          limit: 30,
          orderNo: "", // 业务订单号
          repayeeName: "", // 还款人名称
          partnerName: "", // 投保企业名称
          dueDate: "", // 计划还款日期
          status: "UNCLEAR" //当期还款状态(已结清,未结清,已逾期)
        };
        networkRequest.getListData(data).then(res => {
          if (res.data.code === "200") {
            this.total = res.data.data.total;
            this.list = res.data.data.list;
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        if (this.listQuery.status == "未结清") {
          this.listQuery.status = "UNCLEAR";
        }
        if (
          this.listQuery.dueDate !== "" &&
          this.listQuery.dueDate !== "null" &&
          this.listQuery.dueDate !== null
        ) {
          this.listQuery.dueDate = Format(this.listQuery.dueDate, "yyyy-MM-dd");
        }

        networkRequest.getListData(this.listQuery).then(res => {
          if (res.data.code === "200") {
            this.total = res.data.data.total;
            this.list = res.data.data.list;
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    search() {
      let that = this;
      that.getList(2);
    }, //查询
    resetForm(formName) {
      this.$refs[formName].resetFields();
    } //重置表单
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.total-container {
  > span {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    &:last-of-type {
      border-right: none;
    }
  }
}
.router-link {
  display: block;
  color: #409eff;
}
</style>


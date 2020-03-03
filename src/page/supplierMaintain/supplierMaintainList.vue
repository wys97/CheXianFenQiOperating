<template>
  <div class="page-container" ref="page-container" id="page-container" style="overflow:auto">
    <!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="业务单号：" prop="orderNo">
          <el-input v-model="listQuery.orderNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="车牌号：" prop="licenseNo">
          <el-input v-model="listQuery.licenseNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="VIN码：" prop="licenseNo">
          <el-input v-model="listQuery.frameNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="被保人：" prop="insuredName">
          <el-input v-model="listQuery.insuredName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="被保人手机号：" prop="insuredPhone">
          <el-input v-model="listQuery.insuredPhone" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
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

        <el-form-item label="保单状态：" class="query-select" prop="policyStatus">
          <el-select v-model="listQuery.policyStatus" style="width:150px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="policyStatusList"
              v-for="(val,key) in policyStatusList"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票状态：" class="query-select" prop="invoiceStatus">
          <el-select v-model="listQuery.invoiceStatus" style="width:150px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="invoiceStatusList"
              v-for="(val,key) in invoiceStatusList"
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
    <div class="title_wrap">
      <div>分期订单列表</div>
    </div>

    <el-table :data="listData" @current-change="handleSelectionChange"  highlight-current-row max-height='600'>
      <el-table-column prop="orderNo" label="业务单号" align="center"></el-table-column>
      <el-table-column label="资方业务单号" prop="capitalId" align="center"></el-table-column>
      <el-table-column label="资方名称" prop="capitalName" align="center"></el-table-column>
      <el-table-column label="车牌号" prop="licenseNo" align="center"></el-table-column>
      <el-table-column label="VIN码" prop="frameNo" align="center"></el-table-column>

      <el-table-column prop="insuredName" label="被保人" align="center"></el-table-column>

      <el-table-column prop="insuredPhone" label="被保人手机号" align="center"></el-table-column>

      <el-table-column prop="installmentAmount" label="分期总额" align="center"></el-table-column>

      <el-table-column prop="partnerName" label="投保企业名称" align="center"></el-table-column>

      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

      <el-table-column prop="status" label="订单状态"></el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <router-link
            :to="'supplierMaintainDetail/' + scope.row.id+'/'+ scope.row.orderNo"
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
import networkRequest from "@/api/supplierManage/supplierRegister";
import { Format } from "@/utils/index";

export default {
  name: "SupplierRegister",
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
      orderStatusList: "", //订单状态下拉
      policyStatusList: "", //保单状态下拉
      invoiceStatusList: "", //发票状态下拉
      listData: [],
      total: 0, // 表格数据总条数
      // 查询参数
      listQuery: {
        page: 1, //当前页数
        limit: 30, //条数
        agentId: "", //业务员编号
        frameNo: "", //vin码
        orderNo: "", //业务订单号
        licenseNo: "", //车牌号
        insuredName: "", //被保人名称
        insuredPhone: "", //被保人手机号
        status: "", //订单状态   00-待补充,01-待审核,02-审核失败,03-待首付,04-首付成功,05-正常,06-取消订单,07-待退保,08-退保中,09-退保异常,10-退保完结,11-已过期,12-预收款成功,13-数据异常待退款,14-待资方审核
        policyStatus: "", //保单状态:0, 待上传,1, 待审核,2, 审核通过,3, 审核不通过,4, 超时
        invoiceStatus: "" //发票状态:0, 待上传,1, 待审核,2, 审核通过,3, 审核不通过,4, 超时
      },

      shipDate: [], // 时间范围
      yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
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
  beforeCreate() {},
  created() {
    this.getStateList();
    this.getList();
  },
  mounted() {},
  methods: {
    // 获取所有的下拉状态
    getStateList() {
      //订单状态下拉
      networkRequest.orderStatus().then(res => {
        if (res.data.code == "200") {
          this.orderStatusList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
      //保单状态下拉
      networkRequest.policyStatus().then(res => {
        if (res.data.code == "200") {
          this.policyStatusList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
      //发票状态下拉
      networkRequest.invoiceStatus().then(res => {
        if (res.data.code == "200") {
          this.invoiceStatusList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取数据列表
    getList() {
      networkRequest.getListData(this.listQuery).then(res => {
        if (res.data.code === "200") {
          let mapData = JSON.parse(JSON.stringify(res.data.data.list)); //深拷贝

          for (let i in mapData) {
            if (mapData[i].status == "WAIT_SUPPLEMENT") {
              mapData[i].status = "待补充";
            } else if (mapData[i].status == "WAIT_AUDIT") {
              mapData[i].status = "待审核";
            } else if (mapData[i].status == "AUDIT_FAIL") {
              mapData[i].status = "审核失败";
            } else if (mapData[i].status == "WAIT_PAYMENT") {
              mapData[i].status = "待首付";
            } else if (mapData[i].status == "PAYMENT_SUCCESS") {
              mapData[i].status = "首付成功";
            } else if (mapData[i].status == "NORMAL") {
              mapData[i].status = "正常";
            } else if (mapData[i].status == "CANCEL_ORDER") {
              mapData[i].status = "取消订单";
            } else if (mapData[i].status == "WAIT_SURRENDER") {
              mapData[i].status = "待退保";
            } else if (mapData[i].status == "SURRENDER") {
              mapData[i].status = "退保中";
            } else if (mapData[i].status == "SURRENDER_ERROR") {
              mapData[i].status = "退保异常";
            } else if (mapData[i].status == "SURRENDER_END") {
              mapData[i].status = "退保完结";
            } else if (mapData[i].status == "EXPIRED") {
              mapData[i].status = "已过期";
            } else if (mapData[i].status == "ADVANCE_PAYMENTS") {
              mapData[i].status = "预收款成功";
            } else if (mapData[i].status == "WAIT_REFUND") {
              mapData[i].status = "数据异常待退款";
            } else if (mapData[i].status == "WAIT_CAPITAL_AUDIT") {
              mapData[i].status = "待资方审核";
            } else if (mapData[i].status == "HAS_REPULSE") {
              mapData[i].status = "已打回";
            }
          }
          this.listData = mapData;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    search() {
      let that = this;
      that.getList();
    }, //查询
    resetForm(formName) {
      this.$refs[formName].resetFields();
    } //重置表单
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
.router-link {
  display: block;
  margin: 1px 12px 0 0;
  color: #409eff;
}
.router-link2 {
  display: block;
  color: #ff0000;
}
.title_wrap {
  padding: 40px 20px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.avatar {
  width: 100%;
  height: 100%;
}
</style>


<template>
  <div class="container">
  
    <div class="top">
      <ul class="flex-item" style="padding-top:20px; ">
        <li style="font-size:18px;">{{this.listData.repayeeName}}</li>
        <!-- <li>最近一次还款时间：{{this.listData.payEndTime}}</li> -->
      </ul>
      <div class="flex-item" style="text-align: right;padding-top: 0;">
      </div>
    </div>
    <div class="content"  style="width:100%">
      <div class="flex-item"  style="width:100%">
        <el-tabs type="card" @tab-click="handleClick"  style="width:100%">
          <el-tab-pane label="还款详情">
            <div style="padding-left:40px; padding-top:30px">还款概览</div>
            <el-row :gutter="24" type="flex" align="middle">
              <el-col :span="4" :offset="3">
                <div class="grid-content bg-purple title">还款人（被保人）</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.repayeeName}}</div>
              </el-col>
              <el-col :span="4" :offset="2">
                <div class="grid-content bg-purple title">投保企业名称</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.companyName}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4" :offset="3">
                <div class="grid-content bg-purple title">业务单号</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.orderNo}}</div>
              </el-col>
              <!-- <el-col :span="4">
                <el-button type="primary" size="mini" style="margin-top:3px">查看</el-button>
              </el-col> -->
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4" :offset="3">
                <div class="grid-content bg-purple title">放款时间</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents" v-if="listData.payEndTime">{{this.listData.payEndTime}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="24" type="flex" align="middle">
              <el-col :span="4" :offset="3">
                <div class="grid-content bg-purple title">当期期数</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.periodNo}}</div>
              </el-col>
              <el-col :span="4" :offset="2">
                <div class="grid-content bg-purple title">总期数</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.installmentNum}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="24" type="flex" align="middle">
              <el-col :span="4" :offset="3">
                <div class="grid-content bg-purple title">计划还款金额</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.payableAmount}}</div>
              </el-col>
              <el-col :span="4" :offset="2">
                <div class="grid-content bg-purple title">计划还款日期</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.dueDate}}</div>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="24">
              <el-col :span="4" :offset="3">
                <div class="grid-content bg-purple title">服务费</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.serviceAmount}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4" :offset="3">
                <div class="grid-content bg-purple title">保证金</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple contents">{{this.listData.depositAmount}}</div>
              </el-col>
            </el-row> -->
          </el-tab-pane>

          <el-tab-pane label="还款计划">
            <div style="padding:30px 0;padding-left:40px; ">还款计划</div>
            <el-table :data="orderPlanList" border style="width: 70%; margin:0 auto">
              <el-table-column prop="periodNo" label="期数"></el-table-column>
              <el-table-column prop="dueDate" label="还款日期" ></el-table-column>
              <el-table-column prop="payableAmount" label="应还金额"></el-table-column>
              <el-table-column prop="lateFee" label="滞纳金"></el-table-column>
              <el-table-column prop="repayAmount" label="实还金额"></el-table-column>
              <el-table-column prop="realStatus" label="还款状态"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--左侧操作栏-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Upload from "@/components/Upload/Upload";
import Uploads from "@/components/Upload/Uploads";
import NoteChart from "@/components/charts/noteChart";
import PieChart from "@/components/charts/pieChart";
import networkRequest from '@/api/repaymentManage/repaymentDetail' 
import baseUtil from "@/utils/baseUtil";
import { validContent } from "@/utils/validate";
import { Format } from "@/utils/index";

export default {
  name: "newApplication",
  data() {
    return {
      orderNo: "", // 业务订单号
      periodNo: "", // 期数
      listData:'', 
       orderPlanList: []
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
    this.orderNo = this.$route.params.orderNo;
    this.periodNo = this.$route.params.periodNo;
    this.gitDetail();
  },
  mounted() {},
  methods: {

    gitDetail(){
      let data = {
        orderNo:this.orderNo,
        periodNo:this.periodNo
      }
      networkRequest.RegisterDetail(data).then(res=>{
        if(res.data.code=='200'){
              this.listData = res.data.data;
        }else{
          this.$message.error(res.data.message)
        }
      })
    },


     handleClick(tab, event) {

      //还款计划
      if(tab.index =='1'){
        this.getOrderPlanList();
        }
      },
      getOrderPlanList(){
        let data = {
          orderNo:this.orderNo
        }
        networkRequest.orderPlanList(data).then(res=>{
 
           if(res.data.code=='200'){
             let listData = JSON.parse(JSON.stringify(res.data.data));
               listData[listData.length-1].repayAmount = '保证金冲抵';
              this.orderPlanList =listData;
        }else{
          this.$message.error(res.data.message)
        }
        })
      }


  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  background: #fff;
  height: 100%;
  font-size: 14px;
}
.top {
  padding: 0 30px;
}
.title {
  text-align: center;
  padding: 4px 8px;
  background: #b9d7fb;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  margin: 5px 0;
}
.contents {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  margin: 5px 0;
}
</style>

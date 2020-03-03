<template>
  <div class="details">
    <h3 style="padding: 0px 0 30px 30px">产品详情</h3>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="产品信息" name="first">
        <el-form ref="ruleForm" :model="ruleForm" label-width="140px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="场景方编号：">
                <span>{{ruleForm.partnerNo}}</span>
              </el-form-item>
            </el-col>
              <el-col :span="8" :push="4">
               <el-form-item label="场景方名称：">
                <span>{{ruleForm.partnerName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="渠道产品编号：">
                <span>{{ruleForm.channelProductNo}}</span>
              </el-form-item>
            </el-col>
             <el-col :span="8" :push="4">
              <el-form-item label="渠道产品名称：">
                <span>{{ruleForm.channelProductName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="产品编号：">
                <span>{{ruleForm.productNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="产品状态：">
                <span>{{ruleForm.productStatusText}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="产品名称：">
                <span>{{ruleForm.productName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="产品类型：">
                <span>{{ruleForm.productTypeText}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="产品说明：">
                <span>{{ruleForm.productDescription}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="创建人员：">
                <span>{{this.creatorName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <span>{{this.createTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="修改人员：">
                <span>{{this.modifierName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="修改时间：">
                <span>{{this.modifyTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
<!-- 
      <el-tab-pane label="融资配置" name="fifth">
        <div class="tab-content">
          <el-form label-width="190px" size="mini" label-position="right">
            <div class="info-list">
              <p class="title">成本费率配置</p>
              <div class="feilv">
                <el-form-item label="成本费率：">
                  <el-input v-model="detailData.interestRate" style="width: 300px;">
                    <template slot="append">年化%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="分润比例：">
                  <el-input v-model="detailData.profitRate" style="width: 300px;">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="info-list">
              <p class="title">还款费率配置</p>
              <template v-if="detailData" v-for="(item,index) in detailData.repayFee">
                <el-table
                  :data="item.repayFeeBasicInfo"
                  border
                  :show-header="index===0?true:false"
                  style="width: 100%;"
                >
                  <el-table-column prop="loanFeeId" label="还款方式">
                    <template slot-scope="scope">
                      <span>{{ item.repayMethodText }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="period" label="还款周期">
                    <template slot-scope="scope">
                      <span>月</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="period" label="期数"></el-table-column>
                  <el-table-column prop="status" label="是否开启">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        active-value="ENABLED"
                        inactive-value="DISABLED"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column prop="interestRate" label="A级费率（年化%）">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.interestRateA"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="interestRate" label="B级费率（年化%）">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.interestRateB"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="interestRate" label="C级费率（年化%）">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.interestRateC"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="interestRate" label="D级费率（年化%）">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.interestRateD"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </template>

              <p class="title">逾期费率设置</p>
              <div
                class="table_top"
                style="text-align: center;margin:20px 0;line-height: 40px;margin-bottom: 20px;"
              >
                <el-row style="margin-bottom: 0;">
                  <el-col :span="6" class="table_th">还款方式</el-col>
                  <el-col :span="9" class="table_th">周期</el-col>
                  <el-col :span="9" class="table_th">费率（%）</el-col>
                </el-row>
                <el-row style="margin-bottom: 0;">
                  <el-col :span="6" class="table_td" style="line-height: 40px;">按日计息</el-col>
                  <el-col :span="9" class="table_td" style="line-height: 40px;">日</el-col>
                  <el-col :span="9" class="table_td" style="line-height: 40px;">
                    <el-input v-model="detailData.overdueRate"></el-input>
                  </el-col>
                </el-row>
              </div>

              <p class="title">其他费率设置</p>
              <el-form-item label="保证金：">
                <el-input v-model="detailData.marginRate" style="width: 300px;">
                  <template slot="append">% / 每笔</template>
                </el-input>
              </el-form-item>
              <el-form-item label="手续费：">
                <el-input v-model="detailData.chargeRate" style="width: 300px;">
                  <template slot="append">% / 每笔</template>
                </el-input>
              </el-form-item>
              <div style="text-align: right; padding:0px 40px 40px 0;">
                <el-button @click="doSaveLoanFee" type="primary">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
const axios = require("axios");
import fetch from "@/utils/fetch";
export default {
  data() {
    return {
      activeName: "first", //标题栏
      ruleForm: {
        checkStrategyNo: "", //筛查策略编号
        riskStrategyNo: "", //风控策略编号
        productStatus: "", //产品状态
        partnerNo: "", //场景方编号
        partnerName: "", //场景方名称
        productName: "", //产品名称
        productNo: "", //产品编号
        productStatusText: "", //产品状态
        productType: "", //产品类型
        productTypeText: "", //产品类型
        productDescription: "" //产品说明
      },
      status: {}, //产品状态列表
      business: [], //场景方名称
      productType: [], //产品类型
      options: [], //展业地区
      creatorName: "", //创建人员
      createTime: "", //创建时间
      modifierName: "", //修改人员
      modifyTime: "", //修改时间

      detailData: {} //详情数据
    };
  },

  beforeCreate() {
    if (this.$route.params.id) {
      axios({
        method: "GET",
        url: "" + "/admin/product/detail/" + this.$route.params.id
      })
        .then(res => {
          if (res.data.code == "200") {
            this.ruleForm = { ...res.data.data };
            this.shipDate = res.data.data.setupDate;
            this.creatorName = res.data.data.creatorName;
            this.createTime = res.data.data.createTime;
            this.modifierName = res.data.data.modifierName;
            this.modifyTime = res.data.data.modifyTime;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    }
  },

  methods: {
    //切换标题栏
    handleClick(tab, event) {
      if (tab.index == "1") {
        this.getListData();
      }
    },
    //获取数据
    getListData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      axios({
        method: "get",
        url: "" + "/admin/product/repay-profile/" + this.$route.params.id
      })
        .then(res => {
          loading.close();
          if (res.data.code == "200") {
            this.detailData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },

    //产品-融资配置保存
    doSaveLoanFee() {
      let data = JSON.parse(JSON.stringify(this.detailData)); //深拷贝
      let _arr = [];
      for (let i = 0; i < data.repayFee.length; i++) {
        for (let j = 0; j < data.repayFee[i].repayFeeBasicInfo.length; j++) {
          _arr.push({
            status: data.repayFee[i].repayFeeBasicInfo[j].status,
            interestRateA: data.repayFee[i].repayFeeBasicInfo[j].interestRateA,
            interestRateB: data.repayFee[i].repayFeeBasicInfo[j].interestRateB,
            interestRateC: data.repayFee[i].repayFeeBasicInfo[j].interestRateC,
            interestRateD: data.repayFee[i].repayFeeBasicInfo[j].interestRateD,
            repayFeeId: data.repayFee[i].repayFeeBasicInfo[j].repayFeeId
          });
        }
      }
      //传参数据
      let formData = {
        productNo: this.$route.params.id,
        interestRate: data.interestRate,
        overdueRate: data.overdueRate,
        marginRate: data.marginRate,
        chargeRate: data.chargeRate,
        profitRate: data.profitRate,
        repayFeeList: _arr
      };
      //保存数据请求
      axios({
        method: "post",
        url: "" + "/admin/product/repay-profile/save",
        data: formData
      })
        .then(res => {
          if (res.data.code == "200") {
            this.$message.success(res.data.message);
            this.getListData();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.details {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding-top: 50px;
  overflow: auto;
}
.demo-ruleForm {
  margin-top: 30px;
  margin-bottom: 30px;
}

.el-form-item {
  margin-bottom: 18px;
}
.position {
  position: absolute;
  top: 0;
  right: 130px;
  color: #606266;
}

.table_top {
  .el-row {
    margin-bottom: 1px;
  }
  .el-col {
  }
  .bg_left {
    padding-left: 10px;
    text-align: center;
    background-color: #b9d7fb;
  }
  .bg_right {
    padding-left: 10px;
    text-align: left;
    background-color: #fff;
  }
}
.title {
  margin: 40px 0 30px;
}
.table_th {
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
}
.table_td {
  line-height: 100px;
  border: 1px solid #ebeef5;
  padding: 0 10px;
}
</style>
<template>
  <div class="container">
    <!-- <div ref="lookImgBox" class="look_img_box">
      <div ref="rotateImg" class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}"></div>
      <div class="rotateBtnRow">
        <div class="rotateBtn">
          <i class="iconfont icon-rotate-left"></i>
        </div>
        <div class="rotateBtn">
          <i class="iconfont icon-rotate-right"></i>
        </div>
      </div>
    </div>-->
    <div class="top">
      <!-- <ul class="flex-item">
        <li></li>
        <li>申请时间：</li>
      </ul>
      <div class="flex-item" style="text-align: right;padding-top: 0;">
        <span>原因：</span>
        <el-button size="mini"></el-button>
      </div> -->
    </div>
    <div class="content" style="width:100%">
      <div  style="width:100%">
        <el-tabs type="card" @tab-click="handleClick"  style="width:100%">
          <el-tab-pane label="基本信息" class>
            <el-form
              ref="form"
              label-width="180px"
              size="small"
              style="width:500px; margin:60px 200px 0"
            >
              <el-form-item label="用户基本信息"></el-form-item>
              <el-form-item label="被保人类型：">
                <span>{{this.detailData.insured_type}}</span>
              </el-form-item>
              <el-form
                v-if="detailData.insured_type=='个人'"
                label-width="180px"
                size="small"
                style="width:100%"
              >
                <el-form-item label="被保人手机号：">
                  <span>{{this.detailData.agent_phone}}</span>
                </el-form-item>
                <el-form-item label="身份证：">
                  <img :src="this.detailData.repayee_font_url" class="img" />
                  <img :src="this.detailData.repayee_back_url" class="img" />
                </el-form-item>
                <el-form-item label="被保人姓名：">
                  <span>{{this.detailData.agent_name}}</span>
                </el-form-item>
                <el-form-item label="被保人身份证号：">
                  <span>{{this.detailData.agent_id_no}}</span>
                </el-form-item>
                <el-form-item label="地址：">
                  <span>{{this.detailData.insured_addres}}</span>
                </el-form-item>
                <el-form-item label="户籍省份：">
                  <span>{{this.detailData.province_code}}</span>
                </el-form-item>
                <el-form-item label="户籍城市：">
                  <span>{{this.detailData.city_code}}</span>
                </el-form-item>
                 <el-form-item label="户籍区县：">
                  <span>{{this.detailData.county_code}}</span>
                </el-form-item>
              </el-form>
              <el-form
                v-else
                label-width="180px"
                size="small"
                style="width:100%; margin-bottom:50px"
              >
                <el-form-item label="经办人手机号：">
                  <span>{{this.detailData.agent_phone}}</span>
                </el-form-item>
                <el-form-item label="经办人身份证：">
                  <img :src="this.detailData.repayee_font_url" class="img" />
                  <img :src="this.detailData.repayee_back_url" class="img" />
                  <!-- <img src="../../assets/logo.png" class="img"/> -->
                </el-form-item>
                <el-form-item label="经办人姓名：">
                  <span>{{this.detailData.agent_name}}</span>
                </el-form-item>
                <el-form-item label="经办人身份证号：">
                  <span>{{this.detailData.repre_idcard_no}}</span>
                </el-form-item>
                <el-form-item label="地址：">
                  <span>{{this.detailData.insured_addres}}</span>
                </el-form-item>
                <el-form-item label="户籍省份：">
                  <span>{{this.detailData.province_code}}</span>
                </el-form-item>
                <el-form-item label="户籍城市：">
                  <span>{{this.detailData.city_code}}</span>
                </el-form-item>
                <el-form-item label="户籍区县：">
                  <span>{{this.detailData.county_code}}</span>
                </el-form-item>
                <el-form-item label="经办人授权协议：">
                  <img :src="this.detailData.agent_agreement_url" class="img" />
                </el-form-item>
                <hr width="160%" />

                <el-form-item label="企业营业执照：" style="margin-top:30px">
                  <img :src="this.detailData.insured_font_url" class="img" />
                </el-form-item>
                <el-form-item label="被保企业名称：">
                  <span>{{this.detailData.insured_name}}</span>
                </el-form-item>
                <el-form-item label="企业信用代码：">
                  <span>{{this.detailData.id_no}}</span>
                </el-form-item>
                <el-form-item label="营业执照有效期：">
                  <span>{{this.detailData.expire_date}}</span>
                </el-form-item>
                <el-form-item label="法人姓名：">
                  <span>{{this.detailData.repre_name}}</span>
                </el-form-item>
                <el-form-item label="法人身份证号：">
                  <span>{{this.detailData.repre_idcard_no}}</span>
                </el-form-item>
                <el-form-item label="企业账号：">
                  <span>{{this.detailData.ent_account}}</span>
                </el-form-item>
                <el-form-item label="开户支行：">
                  <span>{{this.detailData.ent_open_bank}}</span>
                </el-form-item>
              </el-form>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="车辆信息">
            <div class="flex" style="padding:30px 0px 20px; width:90%; margin:0 auto ">
              <div>
                <span>车辆信息</span>
              </div>
            </div>
            <el-form
              v-if="this.carData.licenseType=='VEHICLE_LICENSE'"
              label-width="180px"
              size="small"
              style="width:100%; margin-bottom:50px"
            >
              <el-form-item label="证件类型：">
                <span>行驶证</span>
              </el-form-item>
              <el-form-item label="车牌号：">
                <span>{{this.carData.licenseNo}}</span>
              </el-form-item>
              <el-form-item label="车主姓名：">
                <span>{{this.carData.ownerName}}</span>
              </el-form-item>
              <el-form-item label="车辆识别号：">
                <span>{{this.carData.frameNo}}</span>
              </el-form-item>
              <el-form-item label="发动机号：">
                <span>{{this.carData.engineNo}}</span>
              </el-form-item>
              <el-form-item label="行驶证：">
                <img :src="this.carData.licenseFontUrl" class="img" />
                <img :src="this.carData.licenseBackUrl" class="img" />
              </el-form-item>
            </el-form>
            <el-form v-else label-width="180px" size="small" style="width:100%; margin-bottom:50px">
              <el-form-item label="证件类型：">
                <span>合格证（新车未上牌）</span>
              </el-form-item>

              <el-form-item label="车主姓名：">
                <span>{{this.carData.ownerName}}</span>
              </el-form-item>
              <el-form-item label="车辆识别号：">
                <span>{{this.carData.frameNo}}</span>
              </el-form-item>
              <el-form-item label="发动机号：">
                <span>{{this.carData.engineNo}}</span>
              </el-form-item>
              <el-form-item label="合格证：">
                <img :src="this.carData.licenseFontUrl" class="img" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="分期申请信息" v-if="states.isHasOrderInfo">
            <div class="flex" style="padding:30px 0px 20px; width:90%; margin:0 auto ">
              <div>分期订单申请</div>
            </div>
            <el-form
              ref="form"
              label-width="180px"
              size="small"
              style="width:500px; margin:60px 200px 0"
            >
              <el-form-item label="业务员：">
                <span>{{this.installmentData.name}}</span>
              </el-form-item>
              <el-form-item label="上传投保单：">
                <img :src="this.installmentData.insuranceUrl" class="img" />
              </el-form-item>
              <el-form-item label="投保企业名称：">
                <span>{{this.installmentData.policyCompanyName}}</span>
              </el-form-item>
              <el-form-item label="投保企业信用代码：">
                <span>{{this.installmentData.companyCreditCode}}</span>
              </el-form-item>
              <el-form-item label="保险公司：">
                <span>{{this.installmentData.companyName}}</span>
              </el-form-item>
              <el-form-item label="收款机构：">
                <span>{{this.installmentData.receiveNameShort}}</span>
              </el-form-item>
              <el-form-item label="产品名称：" style="margin-top:30px">
                <span>{{this.installmentData.productName}}</span>
              </el-form-item>
              <el-form-item label="分期期数：">
                <span>{{this.installmentData.installmentNum}}期</span>
              </el-form-item>
              <el-form-item label="金融信息服务费：">
                <span>{{this.installmentData.onlineRate}}% （线上服务费） {{this.installmentData.offlineRate}}%（线下服务费）</span>
              </el-form-item>
              <el-form-item label="商业险金额：">
                <span>{{this.installmentData.installmentAmount}}元</span>
              </el-form-item>
              <el-form-item label="交强险金额：">
                <span>{{this.installmentData.strongAmount}}元</span>
              </el-form-item>
              <el-form-item label="车船税金额：">
                <span>{{this.installmentData.taxAmont}}元</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="保单信息" v-if="states.isHasPolicyInfo">
            <el-form
              ref="form"
              label-width="180px"
              size="small"
              style="width:500px; margin:60px 200px 0"
            >
              <el-form-item label="保单信息"></el-form-item>
              <el-form-item label="保险公司：">
                 <span>{{this.selectPolicyInfoData.insuranceCompany}}</span>
              </el-form-item>
              <el-form-item label="保费总额：">
                 <span>{{this.selectPolicyInfoData.policyAmount}}元</span>
              </el-form-item>
              <el-form-item label="商业险总额：">
               <span>{{this.selectPolicyInfoData.installmentAmount}}元</span>
              </el-form-item>
              <el-form-item label="交强险：">
                <span>{{this.selectPolicyInfoData.strongAmount}}元</span>
              </el-form-item>
              <el-form-item label="车船税：">
                <span>{{this.selectPolicyInfoData.taxAmont}}元</span>
              </el-form-item>
              <div style="font-size:14px; margin-left:100px">电子单据：</div>
              <el-form-item>
                <div style="display:flex; align-items:center;"> 

                <img :src="selectPolicyInfoData.policyUrl" v-if="selectPolicyInfoData.policyUrl" style="width:120px; height:120px; "/>
                <img :src="selectPolicyInfoData.invoiceUrl" v-if="selectPolicyInfoData.invoiceUrl" style="width:120px; height:120px; margin:0 10px "/>
                <img :src="selectPolicyInfoData.payVoucherUrl" v-if="selectPolicyInfoData.payVoucherUrl" style="width:120px; height:120px"/>
               
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="还款计划" v-if="states.isHasRepaymentPlan">
            <el-form
              ref="form"
              label-width="180px"
              size="small"
              style="width:700px; margin:60px 200px 0"
            >
              <el-form-item label="还款计划详情"></el-form-item>
              <el-form-item label="业务单号：">
               <span>{{this.planInfo.orderNo}}</span>
              </el-form-item>
              <el-form-item label="分期总额：">
               <span>{{this.planInfo.installmentAmount}}元</span>
              </el-form-item>
              <el-form-item label="分期期数：">
               <span>{{this.planInfo.installmentNum}}期</span>
                
              </el-form-item>
              <el-form-item label="申请时间：">
                <span>{{this.planInfo.applyTime}}</span>
              </el-form-item>
              <el-form-item label="放款时间：">
                <span>{{this.planInfo.payEndTime}}</span>
              </el-form-item>
              <hr style="width:160%" />
              <el-form-item label="首付金额：">
                 <span>{{this.planInfo.firstAmount}}元</span>
              </el-form-item>
              <el-form-item>
                <div>交强险 {{this.planInfo.strongAmount}}元+车船税 {{this.planInfo.taxAmont}}元+保证金 {{this.planInfo.depositAmount}}元+线上服务费 {{this.planInfo.onlineServiceCharge}}元
                  <p> 首付保证金率=100%/总期数</p></div>
              </el-form-item>
              <hr style="width:160%" />
             
                <div style="margin: 20px 0 20px 100px; font-size:14px; ">还款计划</div>
            
            </el-form>
            <el-table :data="orderPlanList" border style="width: 50%; margin:0 0 0 280px">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Upload from "@/components/Upload/Upload";
import Uploads from "@/components/Upload/Uploads";
import NoteChart from "@/components/charts/noteChart";
import PieChart from "@/components/charts/pieChart";
import axios from "@/api/supplierMaintain/supplierMaintainDetail";
import baseUtil from "@/utils/baseUtil";
import { validContent } from "@/utils/validate";
import { Format } from "@/utils/index";

export default {
  name: "newApplication",
  data() {
    return {
      financeOrderId: "", //融资单号
      orderNo:'',// 订单号
      states: "",
      detailData: "", //基本信息
      carData: "", //车辆信息
      installmentData: "",
      selectPolicyInfoData:'', //保单信息
      planInfo:'', //还款计划
      orderPlanList:[], //还款表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight",
      "loginName"
    ])
  },

  watch: {},

  created() {
    this.financeOrderId = this.$route.params.id;
    this.orderNo = this.$route.params.orderNo;
    this.getDetailData();
    this.getSelectInfoStatus();
  },
  mounted() {},
  methods: {
    //切换子页签
    handleClick(tab, event) {
      if (tab.label == "车辆信息") {
        //获取车辆信息
        this.getCarData();
      } else if (tab.label == "分期申请信息") {
        //分期申请信息
        this.getInstallment();
      }else if (tab.label=='保单信息') {
        //保单信息
        this.getSelectPolicyInfo();
      }else if (tab.label=='还款计划') {
        //还款计划信息
        this.getOrderPlanInfo();
        this.getOrderPlanList();
      }
    },
    //子页签状态
    getSelectInfoStatus() {
      let data = {
        financeOrderId: this.financeOrderId
      };
      axios.selectInfoStatus(data).then(res => {
        if (res.data.code == "200") {
          this.states = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //获取基本信息列表
    getDetailData() {
      let data = {
        financeOrderId: this.financeOrderId
      };
      axios.detailData(data).then(res => {
        if (res.data.code == "200") {
          this.detailData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取车辆信息列表
    getCarData() {
      let data = {
        financeOrderId: this.financeOrderId
      };
      axios.carData(data).then(res => {
      
        if (res.data.code == "200") {
          this.carData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取分期申请信息
    getInstallment() {
      let data = {
        financeOrderId: this.financeOrderId
      };
      axios.installment(data).then(res => {
   
        if (res.data.code == "200") {
          this.installmentData = res.data.data;

          this.installmentData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
       //获取保单信息
    getSelectPolicyInfo(){
      let data = {
        financeOrderId:this.financeOrderId
      }

      axios.selectPolicyInfo(data).then(res=>{
            if (res.data.code == "200") {
          this.selectPolicyInfoData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      })

    },

    //获取还款计划信息
    getOrderPlanInfo(){
      let data ={
        financeOrderId:this.financeOrderId
      }
      axios.orderPlanInfo(data).then(res=>{
          this.planInfo = res.data.data;
      })
    },
    //获取还款计划表格信息
      getOrderPlanList(){
        let data = {
          orderNo:this.orderNo
        }
        axios.orderPlanList(data).then(res=>{
 
           if(res.data.code=='200'){
             let listData = JSON.parse(JSON.stringify(res.data.data));
             if(listData.length>0){
               listData[listData.length-1].repayAmount = '保证金冲抵';
              this.orderPlanList =listData;
             }
        }else{
          this.$message.error(res.data.message)
        }
        })
      }

  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.top {
  padding: 15px 30px;
}
.container {
  background: #fff;
  height: 100%;
  overflow-y: auto;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img {
  width: 100px;
  height: 80px;
  margin: 0 4px;
}
</style>

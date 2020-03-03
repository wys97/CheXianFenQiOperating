<template>
  <div id="createScene">
    <h3>{{title}}</h3>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="场景方编号：" :hide-required-asterisk="true">
            <span style="color: #DCDFE6;">(自动生成)</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="场景方状态：" prop="partnerStatus" :hide-required-asterisk="true">
            <el-select placeholder="请选择" v-model="ruleForm.partnerStatus">
              <el-option
                v-if="status"
                v-for="(val, key) in status"
                :label="val"
                :value="key"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="场景方企业名称：" prop="partnerName" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.partnerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="公司类型：" prop="partnerBusiness" :hide-required-asterisk="true">
            <el-select placeholder="请选择" v-model="ruleForm.partnerBusiness">
              <el-option
                v-if="business"
                v-for="(val, key) in business"
                :label="val"
                :value="val"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="统一社会信用代码：" prop="socialCreditNo" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.socialCreditNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="成立日期：">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="shipDate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="法定代表人：" prop="legalRepresentative" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.legalRepresentative"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="联系电话：" prop="contactPhone" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.contactPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="联系邮箱：" prop="contactEmail" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.contactEmail"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="保证金缴存比例：" prop="marginDepositRatio" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.marginDepositRatio"></el-input>
            <span class="baifen">%</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="保证金缴存金额：" prop="marginDepositAmount" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.marginDepositAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="公司地址：">
            <el-input v-model="ruleForm.businessAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="经营范围：">
            <el-input v-model="ruleForm.businessScope" type="textarea" :autosize="{ minRows: 2, maxRows: 8}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="注册资本：">
            <el-input v-model="ruleForm.registeredCapital"></el-input>
            <span class="position">元</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="是否贷款运用方：">
            <el-select placeholder="请选择" v-model="ruleForm.isLoanUser">
              <el-option
                v-if="isLoanUser"
                v-for="(val, key) in isLoanUser"
                :label="val"
                :value="val"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="企业总资产：">
            <el-input v-model="ruleForm.totalAsset"></el-input>
            <span class="position">元</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="企业总负债：">
            <el-input v-model="ruleForm.totalLiability"></el-input>
            <span class="position">元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
        <el-form-item label="备注：">
          <el-input v-model="ruleForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 8}"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="创建人员：">
            <span v-if="this.$route.query.id">{{this.creatorName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间：">
            <span v-if="this.$route.query.id">{{this.createTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="修改人员：">
            <span v-if="this.$route.query.id">{{this.modifierName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="修改时间：">
            <span v-if="this.$route.query.id">{{this.modifyTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row margin="20px 0">
        <el-col :span="8" :offset="7">
          <el-button type="primary" @click="preserveBtn">保存</el-button>
        </el-col>
        <el-col :span="8">
          <el-button plain  @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script>
const axios = require("axios");
import { Format } from "@/utils/index";
export default {
  data() {
    return {
      //表单校验
      rules: {
        partnerName: [
          { required: true, message: "请输入场景方企业名称", trigger: "blur" }
        ],
        partnerStatus: [
          { required: true, message: "请输入场景方状态", trigger: "blur" }
        ],
        partnerBusiness: [
          { required: true, message: "请输入公司类型", trigger: "blur" }
        ],
        socialCreditNo: [
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        legalRepresentative: [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        contactEmail: [
          { required: true, message: "请输入联系邮箱", trigger: "blur" }
        ],
        marginDepositRatio: [
          { required: true, message: "请输入保证金缴存比例", trigger: "blur" }
        ],
        marginDepositAmount: [
          { required: true, message: "请输入保证金缴存金额", trigger: "blur" }
        ]
      },
      partnerNumber: "", //场景方编号
      ruleForm: {
        partnerName: "", //场景方企业名称
        partnerStatus: "", //场景方状态
        partnerBusiness: "", //公司类型
        socialCreditNo: "", //统一社会信用代码
        setupDate: "", //成立日期
        legalRepresentative: "", //法定代表人
        contactPhone: "", //联系电话
        contactEmail: "", //联系邮箱
        marginDepositRatio: "", //保证金缴存比例
        marginDepositAmount: "", //保证金缴存金额
        businessAddress: "", //公司地址
        businessScope: "", //经营范围
        registeredCapital: "", //注册资本
        isLoanUser: "", //是否贷款运用方
        totalAsset: "", //企业总资产
        totalLiability: "", //	企业总负债
        remark: "" //备注
      },
      status: {}, //场景方状态列表
      business: [], //公司类型列表
      isLoanUser: [], //是否贷款运用方列表
      shipDate: "", // 时间范围
      creatorName: "", //创建人员
      createTime: "", //创建时间
      modifierName: "", //修改人员
      modifyTime: "", //修改时间
      title:'创建场景方信息'
    };
  },

  beforeCreate() {
    //获取修改详情信息
    if (this.$route.query.id) {
      axios({
        method: "GET",
        url: "" + "/admin/partner/detail/" + this.$route.query.id
      })
        .then(res => {
          if (res.data.code == "200") {
            this.ruleForm = { ...res.data.data };
            this.shipDate = res.data.data.setupDate;
            this.creatorName = res.data.data.creatorName;
            this.createTime = res.data.data.createTime;
            this.modifierName = res.data.data.modifierName;
            this.modifyTime = res.data.data.modifyTime;
            this.title = '修改场景方信息'
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    }
  },

  created() {
    //场景方状态
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

    //场景方公司类型
    axios({
      method: "get",
      url: "" + "/admin/partner/type"
    })
      .then(res => {
        if (res.data.code == "200") {
          this.business = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch(err => {});

    //是否贷款运用方
    axios({
      method: "get",
      url: "" + "/admin/partner/loan-user"
    })
      .then(res => {
        if (res.data.code == "200") {
          this.isLoanUser = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch(err => {});
  },

  watch: {
    shipDate(val, oldVal) {
      if (val) {
        this.ruleForm.setupDate = Format(val, "yyyy-MM-dd");
      }
    }
  },

  methods: {
    //保存按钮
    preserveBtn() {
      let {
        setupDate,
        partnerName,
        partnerStatus,
        partnerBusiness,
        socialCreditNo,
        legalRepresentative,
        contactPhone,
        contactEmail,
        marginDepositRatio,
        marginDepositAmount
      } = this.ruleForm;

      if (
        partnerName == "" ||
        partnerStatus == "" ||
        partnerBusiness == "" ||
        socialCreditNo == "" ||
        legalRepresentative == "" ||
        contactPhone == "" ||
        contactEmail == "" ||
        marginDepositRatio == "" ||
        marginDepositAmount == ""
      ) {
        this.$message.error("必填项不能为空");
        return;
      } else {
        if (this.$route.query.id) {
          axios({
            url: "" + "/admin/partner/update",
            method: "post",
            data: { ...this.ruleForm }
          })
            .then(res => {
              if (res.data.code == "200") {
                this.$message.success("修改成功");
                this.$router.back(-1);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {});
        } else {
          axios({
            url: "" + "/admin/partner/add",
            method: "post",
            data: { ...this.ruleForm }
          })
            .then(res => {
              if (res.data.code == "200") {
                this.$message.success("保存成功");
                this.$router.back(-1);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {});
        }
      }
    },

    //返回按钮
    goBack(){
      this.$router.back(-1);
    }




  }
};
</script>


















<style scoped>
#createScene {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 35px 26px 0;
  padding-bottom: 40px;
  overflow: auto;
}
.demo-ruleForm {
  margin-top: 30px;
}

.el-form-item {
  margin-bottom: 18px;
}
.position {
  position: absolute;
  top: 0;
  right: -22px;
  color: #999;
}
.baifen{
  position: absolute;
  top: 0;
  right: -22px;
  color: #999;
}
</style>
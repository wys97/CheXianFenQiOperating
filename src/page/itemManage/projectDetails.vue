<template>
  <div class="details">
    <h3 style="padding: 0px 0 30px 30px">项目详情</h3>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="ruleForm" :model="ruleForm" label-width="140px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="项目名称：" >
                <span>{{ruleForm.projectName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="项目状态：" prop="projectStatus">
               <span>{{ruleForm.projectStatus}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="场景方名称：" prop="partnerNo">
                    <span>{{ruleForm.partnerNo}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="项目规模：" prop="projectFund">
                    <span>{{ruleForm.projectFund}}</span>
                <span class="position">元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="项目期限：" prop="projectTerm">
                <span>{{ruleForm.projectTerm}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="期限单位：" prop="projectTermUnit">
               <span>{{ruleForm.projectTermUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="主合同编号：" prop="projectContactNo">
              <span>{{ruleForm.projectContactNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="专户账号：" prop="specialAccountNo">
              <span>{{ruleForm.specialAccountNo}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="项目成立日期：" prop="setupDate">
                  <span>{{ruleForm.setupDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="预计项目结束日期：" prop="expectedEndDate">
                  <span>{{ruleForm.expectedEndDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20" :offset="1">
              <el-form-item label="期限说明：">
                <span>{{ruleForm.projectTermDescription}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="1">
              <el-form-item label="项目说明：">
                 <span>{{ruleForm.projectDescription}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="创建人员：">
                <span >{{this.creatorName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <span>{{this.createTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="修改人员：">
                <span >{{this.modifierName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="修改时间：">
                <span >{{this.modifyTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
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
        projectStatus: "", //项目状态
        partnerNo: "", //场景方名称
        projectName: "", //项目名称
        projectFund: "", //项目规模
        projectTerm: "", //项目期限
        projectTermUnit: "", //项目期限单位
        projectContactNo: "", //主合同编号
        specialAccountNo: "", //专户账户
        setupDate: "", //项目成立日期
        expectedEndDate: "", //预计项目结束日期
        projectTermDescription: "", //期限说明
        projectDescription: "" //项目贷款说明
      },
      creatorName:'',
      createTime:'',
      modifierName:'',
      modifyTime:'',
    };
  },

  beforeCreate() {
    if (this.$route.params.id) {
      axios({
        method: "GET",
        url: "" + "/admin/project/detail/" + this.$route.params.id
      })
        .then(res => {
          if (res.data.code == "200") {
              console.log(res)
            this.ruleForm = { ...res.data.data };
            this.shipDate = res.data.data.setupDate;
            this.creatorName = res.data.data.creatorName;
            this.createTime = res.data.data.creatorTime;
            this.modifierName = res.data.data.modifyName;
            this.modifyTime = res.data.data.modifyTime;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    }
  },

  methods: {}
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
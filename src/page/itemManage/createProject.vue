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
          <el-col :span="8" :offset="1">
          <el-form-item label="项目名称：" prop="projectName" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.projectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="项目状态：" prop="projectStatus" :hide-required-asterisk="true">
            <el-select placeholder="请选择" v-model="ruleForm.projectStatus">
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
        <el-col :span="8" :offset="1">
          <el-form-item label="场景方名称：" prop="partnerNo" :hide-required-asterisk="true">
          <el-select placeholder="请选择" v-model="ruleForm.partnerNo">
              <el-option
                v-if="business"
                v-for="(val, key) in business"
                :label="val"
                :value="key"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
         <el-row>
       <el-col :span="8" :offset="1">
          <el-form-item label="项目规模：" prop='projectFund'  :hide-required-asterisk="true">
            <el-input v-model="ruleForm.projectFund"></el-input>
            <span class="position">元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="项目期限：" prop='projectTerm'  :hide-required-asterisk="true">
             <el-input v-model="ruleForm.projectTerm"></el-input>
          </el-form-item>
        </el-col>
        <el-col  :span="8" :push="4">
          <el-form-item label="期限单位：" prop='projectTermUnit'  :hide-required-asterisk="true">
              <el-select placeholder="请选择" v-model="ruleForm.projectTermUnit	">
              <el-option
                v-if="projectTermUnit"
                v-for="(val, key) in projectTermUnit"
                :label="val"
                :value="key"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="主合同编号：" prop="projectContactNo">
            <el-input v-model="ruleForm.projectContactNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="专户账号：" prop="specialAccountNo">
            <el-input v-model="ruleForm.specialAccountNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="项目成立日期：" prop="setupDate" :hide-required-asterisk="true">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="setupDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="预计项目结束日期：" prop="expectedEndDate" :hide-required-asterisk="true">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="expectedEndDate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
     
      <el-row>
        <el-col :span="20" :offset="1">
        <el-form-item label="期限说明：">
          <el-input v-model="ruleForm.projectTermDescription" type="textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="1">
        <el-form-item label="项目说明：">
          <el-input v-model="ruleForm.projectDescription" type="textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="1">
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
        <el-col :span="8" :offset="1">
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
        projectStatus: [
          { required: true, message: "请输入项目状态", trigger: "blur" }
        ],
        partnerNo: [
          { required: true, message: "请输入场景方名称", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        projectFund: [
          { required: true, message: "请输入项目规模", trigger: "blur" }
        ],
        projectTerm: [
          { required: true, message: "请输入项目期限", trigger: "blur" }
        ],
        projectTermUnit: [
          { required: true, message: "请输入期限单位", trigger: "blur" }
        ],
        setupDate: [
          { required: true, message: "请输入项目成立日期", trigger: "blur" }
        ],
        expectedEndDate: [
          { required: true, message: "请输入预计项目结束日期", trigger: "blur" }
        ],
      },
      ruleForm: {
        projectStatus: "", //项目状态	
        partnerNo: "", //场景方名称	
        projectName: "", //项目名称	
        projectFund	: "", //项目规模	
        projectTerm: "", //项目期限	
        projectTermUnit	: "", //项目期限单位	
        projectContactNo: "", //主合同编号	
        specialAccountNo: "", //专户账户	
        setupDate: "", //项目成立日期	
        expectedEndDate	: "", //预计项目结束日期	
        projectTermDescription: "", //期限说明	
        projectDescription: "", //项目贷款说明	
      },
      status:'', //项目状态
      business:'',  //场景方名称
      creatorName: "", //创建人员
      createTime: "", //创建时间
      modifierName: "", //修改人员
      modifyTime: "", //修改时间
      projectTermUnit:'', //期限单位
      title:'创建项目信息',
      setupDate:'', //项目成立日期
      expectedEndDate:'', //预计项目结束日期
    };
  },

  beforeCreate() {
    //获取修改详情信息
    if (this.$route.query.id) {
      axios({
        method: "GET",
        url: "" + "/admin/project/detail/" + this.$route.query.id
      })
        .then(res => {
          if (res.data.code == "200") {
              console.log(res)
            this.ruleForm = { ...res.data.data };
            this.expectedEndDate = res.data.data.expectedEndDate;
            this.setupDate = res.data.data.setupDate;
            this.creatorName = res.data.data.creatorName;
            this.createTime = res.data.data.creatorTime;
            this.modifierName = res.data.data.modifyName;
            this.modifyTime = res.data.data.modifyTime;
            this.title = '修改项目信息'
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    }
  },

  created() {
    // 项目状态
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
    }).catch(err => {});

    //场景方名称
    axios({
      method: "get",
      url: "" + "/admin/common/partner-info"
        })
      .then(res => {
        if (res.data.code == "200") {
          this.business = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
    }) .catch(err => {});

    //期限单位
    axios({
      method: "get",
      url: "" + "/admin/project/project-term-unit"
        })
      .then(res => {
        if (res.data.code == "200") {
          this.projectTermUnit = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
    }).catch(err => {});


  },


    watch: {
    //项目成立日期:
    setupDate(val, oldVal) {
      if (val) {
        this.ruleForm.setupDate = Format(val, "yyyy-MM-dd");
      }
    },
    //预计项目结束日期:
    expectedEndDate(val, oldVal){
        if (val) {
        this.ruleForm.expectedEndDate = Format(val, "yyyy-MM-dd");
      }
    }
  },


  methods: {
    //保存按钮
    preserveBtn() {
      let {
        projectStatus, //项目状态	
        partnerNo, //场景方名称	
        projectName, //项目名称	
        projectFund, //项目规模	
        projectTerm, //项目期限	
        projectTermUnit	, //项目期限单位	
        projectContactNo, //主合同编号	
        specialAccountNo, //专户账户	
        setupDate, //项目成立日期	
        expectedEndDate	, //预计项目结束日期	
        projectTermDescription, //期限说明	
        projectDescription, //项目贷款说明	
      } = this.ruleForm;

      if (
        projectStatus == "" ||
        partnerNo == "" ||
        projectName == "" ||
        projectFund == "" ||
        projectTerm == "" ||
        projectTermUnit == "" ||
        expectedEndDate == "" ||
        setupDate == "" 
         ) {
        this.$message.error("必填项不能为空");
        return;
      } else {
        if (this.$route.query.id) {
            let data = JSON.parse(JSON.stringify(this.ruleForm));
            data.setupDate = this.setupDate;
            data.expectedEndDate = this.expectedEndDate;
          axios({
            url: "" + "/admin/project/update",
            method: "post",
            data: data
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
            url: "" + "/admin/project/add",
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
</style>
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
        <el-col :span="8" :offset="2">
          <el-form-item label="渠道产品名称：" prop="channelProductNo" :hide-required-asterisk="true">
            <el-select placeholder="请选择" v-model="ruleForm.channelProductNo">
              <el-option
                v-if="productList"
                v-for="(val, key) in productList"
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
          <el-form-item label="产品编号：" prop="productNo" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.productNo" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="产品状态：" prop="productStatus" :hide-required-asterisk="true">
            <el-select placeholder="请选择" v-model="ruleForm.productStatus">
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
          <el-form-item label="产品名称：" prop="productName" :hide-required-asterisk="true">
            <el-input v-model="ruleForm.productName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="4">
          <el-form-item label="产品类型：" prop="productType" :hide-required-asterisk="true">
            <el-select placeholder="请选择" v-model="ruleForm.productType">
              <el-option
                v-if="productType"
                v-for="(val, key) in productType"
                :label="val"
                :value="key"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="产品说明：" prop="productDescription">
            <el-input
              v-model="ruleForm.productDescription"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 8}"
            ></el-input>
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
          <el-button plain @click="goBack">返回</el-button>
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
        title:'创建产品信息',
      //表单校验
      rules: {
   
        partnerNo: [
          { required: true, message: "请输入场景方名称", trigger: "blur" }
        ],
        channelProductNo: [
          { required: true, message: "请输入渠道产品名称", trigger: "blur" }
        ],
      
        productStatus: [
          { required: true, message: "请输入产品状态", trigger: "blur" }
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        productType: [
          { required: true, message: "请输入产品类型", trigger: "blur" }
        ],
    
      },

      ruleForm: {
       
       
        productStatus: "", //产品状态
        partnerNo: "", //场景方编号
        productName: "", //产品名称
        productNo:'自动生成', //产品编号
        productType: "", //产品类型
        productDescription: "", //产品说明
        product:'', //渠道产品名称
       
      },
      status: {}, //产品状态列表
      business: [], //场景方名称
      productType: [], //产品类型
      creatorName: "", //创建人员
      createTime: "", //创建时间
      modifierName: "", //修改人员
      modifyTime: "", //修改时间
      productList:'', 

      props: { multiple: true,  }, //多选
      


    };
  },

  beforeCreate() {
    if (this.$route.query.id) {
      axios({
        method: "GET",
        url: "" + "/admin/product/detail/" + this.$route.query.id
      })
        .then(res => {
          if (res.data.code == "200") {
           
            this.ruleForm = { ...res.data.data };
            this.creatorName = res.data.data.creatorName;
            this.createTime = res.data.data.createTime;
            this.modifierName = res.data.data.modifierName;
            this.modifyTime = res.data.data.modifyTime;
            this.title='修改产品信息';
         
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    }
  },

  created() {
    //产品状态
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
      })
      .catch(err => {});

    //产品类型
    axios({
      method: "get",
      url: "" + "/admin/product/product-type"
    })
      .then(res => {
        if (res.data.code == "200") {
          this.productType = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch(err => {});

    //渠道产品
    axios({
      method: "get",
      url: "" + "/admin/common/channel-product-info?status="+'ENABLED'
        })
      .then(res => {
        if (res.data.code == "200") {
            this.productList = res.data.data
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch(err => {});
    
    
  },

  methods: {
    //保存按钮
    preserveBtn() {
      let {
    
        channelProductNo,
        productStatus, //产品状态
        partnerNo, //场景方编号
        productName, //产品名称
        productType, //产品类型
        productDescription, //产品说明
  
     
      } = this.ruleForm;

      if (
        
      
        productStatus=="" ||
        partnerNo=="" ||
        productName=="" ||
        productType=="" ||  
        channelProductNo==''
      ) {
        this.$message.error("必填项不能为空");
        return;
      } else {
        if (this.$route.query.id) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));

          axios({
            url: "" + "/admin/product/update",
            method: "post",
            data
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
            url: "" + "/admin/product/add",
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
    goBack() {
      this.$router.back(-1);
    },
     




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
  color: #606266;
}
</style>
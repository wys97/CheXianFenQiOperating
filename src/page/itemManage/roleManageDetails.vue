<template>
  <div class="details">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first" class="first">
        <el-form ref="ruleForm" label-width="140px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="场景方编号：">
                <span>{{this.$route.params.id}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="场景方状态：">
                <span>{{ruleForm.partnerStatus}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="场景方企业名称：">
                <span>{{ruleForm.partnerStatus}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="公司类型：">
                <span>{{ruleForm.partnerBusiness}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="统一社会信用代码：">
                <span>{{ruleForm.socialCreditNo}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="成立日期：">
                <span>{{this.shipDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="法定代表人：">
                <span>{{ruleForm.legalRepresentative}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="联系电话：">
                <span>{{ruleForm.contactPhone}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="联系邮箱：">
                <span>{{ruleForm.contactEmail}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="保证金缴存比例：">
                <span>{{ruleForm.marginDepositRatio}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="保证金缴存金额：" prop="marginDepositAmount">
                <span>{{ruleForm.marginDepositAmount}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="公司地址：">
                <span>{{ruleForm.businessAddress}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="经营范围：">
                <span>{{ruleForm.businessScope}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="注册资本：">
                <span>{{ruleForm.registeredCapital}}</span>
                <span class="position">元</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="是否贷款运用方：">
                <span>{{ruleForm.isLoanUser}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="企业总资产：">
                <span>{{ruleForm.totalAsset}}</span>
                <span class="position">元</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="4">
              <el-form-item label="企业总负债：">
                <span>{{ruleForm.totalLiability}}</span>
                <span class="position">元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="备注：">
              <span>{{ruleForm.remark}}</span>
            </el-form-item>
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
      <!-- <el-tab-pane label="财务信息" name="second">财务信息</el-tab-pane>
      <el-tab-pane label="联系人信息" name="third">联系人信息</el-tab-pane>-->
      <el-tab-pane label="接口配置" name="fourth" class="fourth">
        <el-form>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="平台公钥：">
                <el-input
                  type="textarea"
                  v-model="keyList.systemPublicKey"
                  disabled
                  :autosize="{ minRows: 2, maxRows: 8}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="场景方公钥：">
                <el-input
                  type="textarea"
                  v-model="keyList.partnerPublicKey"
                  :autosize="{ minRows: 2, maxRows: 8}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="回调通知地址：">
                <el-input
                  type="textarea"
                  v-model="keyList.partnerNotifyUrl"
                  :autosize="{ minRows: 2, maxRows: 8}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="进件结果回调地址：">
                <el-input
                  type="textarea"
                  v-model="keyList.partnerApplyResultUrl"
                  :autosize="{ minRows: 2, maxRows: 8}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="融资结果回调地址：">
                <el-input
                  type="textarea"
                  v-model="keyList.partnerFinancingResultUrl"
                  :autosize="{ minRows: 2, maxRows: 8}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="场景方IP白名单：">
                <el-input
                  type="textarea"
                  v-model="keyList.partnerIpWhitelist"
                  :autosize="{ minRows: 2, maxRows: 8}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="1">
              <el-button type="primary" @click="preserve">保存</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="登录账户设置" name="fifth">
        <div
          style="width:100%; display:flex; align-items:center; justify-content: space-between; padding: 40px 40px 0 30px"
        >
          <span>场景方登录账号</span>
          <el-button type="primary" size="medium" @click="createFormVisible = true" style="margin: 15px 100px 15px 0">创建</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="AdministratorAccountList"
          border
          tooltip-effect="dark"
          style="width: 100%;"
        >
          <el-table-column label="类型" prop="type" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column label="账号" show-overflow-tooltip prop="loginName" align="center"></el-table-column>
          <el-table-column prop="operatorName" label="操作员名字" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="mobile" label="操作员手机号" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column label="操作" align="center" prop="modify">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row.modify"
                @click="amendBtn(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.modify"
                @click="resetPassword(scope.row)"
              >重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 修改弹窗 -->
      <el-dialog
        title="账户信息"
        :visible.sync="dialogFormVisible"
        width="30%"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        >
        <el-form label-width="100px" :model="amendData">
          <el-form-item label="类型：">
            <span>{{amendData.type}}</span>
          </el-form-item>
          <el-form-item label="账号：">
            <span>{{amendData.loginName}}</span>
          </el-form-item>
          <el-form-item label="初始化密码：">
            <span>{{amendData.initialPassword}}</span>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="operatorName"></el-input>
          </el-form-item>
          <el-form-item label="关联手机号：">
            <el-input v-model="relevancePhone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureToModify">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 创建场景方账号 -->
      <el-dialog
        title="创建场景方登录账户"
        :visible.sync="createFormVisible"
        width="30%"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        >
        <el-form label-width="100px" :model="createListData" style="padding:20px 60px">
          <el-form-item label="账号ID：">
            <span>[ 自动生成 ]</span>
          </el-form-item>
          <el-form-item label="账号类型：">
            <el-input v-model="createListData.accountType" disabled></el-input>
          </el-form-item>
          <el-form-item label="登录账号：">
            <el-input v-model="createListData.loginName"></el-input>
          </el-form-item>
          <el-form-item label="初始化密码：">
            <el-input v-model="createListData.loginPassword"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="createListData.operatorName"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="createListData.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createFormVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="sureToCreate" size="medium">确 定</el-button>
        </div>
      </el-dialog>

      <!-- <div class="goback">
        <el-button>返回</el-button>
      </div>-->
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
      keyList: {
        systemPublicKey: "", //平台公钥
        partnerPublicKey: "", //场景方公钥
        partnerNotifyUrl: "", //回调通知地址
        partnerApplyResultUrl: "", //进件结果回调地址
        partnerFinancingResultUrl: "", //融资结果回调地址
        partnerIpWhitelist: "" //场景方IP白名单
      },
      AdministratorAccountList: [], //管理员数据列表
      dialogFormVisible: false, // 显示修改账号信息弹框
      amendData: {}, //要修改的数据
      operatorName: "", //姓名
      relevancePhone: "", //关联的手机号
      createFormVisible: false, //创建按钮弹框
      createListData:{
        accountType:'管理员', //账号类型：
        loginName:'', //登录账号
        loginPassword:'', //初始化密码
        loginName:'',  //用户名
        mobile:'',  //手机号	
      },

    };
  },

  beforeCreate() {
    if (this.$route.params.id) {
      axios({
        method: "GET",
        url: "" + "/admin/partner/detail/" + this.$route.params.id
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
        //接口配置页
        this.getSystemPublicKey();
      } else if (tab.index == "2") {
        //获取登录账户设置列表
        this.managerList();
      }
    },

    //获取公钥
    getSystemPublicKey() {
      axios({
        method: "get",
        url: "" + "/admin/partner/secret-key"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.keyList.systemPublicKey = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
      //获取配置详情   修改后的数据返回
      axios({
        method: "get",
        url: "" + "/admin/partner/detail-config/" + this.$route.params.id
      })
        .then(res => {
          if (res.data.code == "200") {
            if (res.data.data.systemPublicKey != null) {
              this.keyList = { ...res.data.data };
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },

    //保存数据按钮
    preserve() {
      let {
        systemPublicKey,
        partnerPublicKey,
        partnerNotifyUrl,
        partnerApplyResultUrl,
        partnerFinancingResultUrl,
        partnerIpWhitelist
      } = this.keyList;
      axios({
        method: "post",
        url: "" + "/admin/partner/save-config",
        data: {
          partnerNo: this.$route.params.id,
          systemPublicKey,
          partnerPublicKey,
          partnerNotifyUrl,
          partnerApplyResultUrl,
          partnerFinancingResultUrl,
          partnerIpWhitelist
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },

    //获取登录账户设置列表
    managerList() {
      axios({
        method: "get",
        url:''+'/admin/partner/operator/list/'+this.$route.params.id,
      })
        .then(res => {
          if (res.data.code == "200") {
            this.AdministratorAccountList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },

    //修改按钮
    amendBtn(value) {
     axios({
       method:'get',
       url:''+'/admin/partner/operator/get/'+value.id,
     }).then(res=>{
            if(res.data.code=='200'){
              this.amendData = { ...res.data.data };
              this.dialogFormVisible = true;
            }else{
              this.$message.error(res.data.message)
            }
          }).catch(err=>{})
    
    },

    //确定修改
    sureToModify() {
      fetch({
        method: "post",
        url: "" + "/admin/partner/operator/update",
        data: {
          id: this.amendData.id,
          mobile: this.relevancePhone,
          operatorName: this.operatorName
        }
      }).then(res => {
          if (res.data.code == "200") {
            this.dialogFormVisible = false;
            this.managerList();
            this.relevancePhone = "";
            this.operatorName = "";
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },

    //重置密码
    resetPassword(value) {
      this.$confirm("请确定是否重置密码？确定后原密码失效！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "post",
            url: "" + "/admin/partner/operator/reset-password/" + value.id
          })
            .then(res => {
              if (res.data.code == "200") {
                this.$alert(
                  "新的密码为：" + res.data.data.passWord,
                  "重置成功",
                  {
                    confirmButtonText: "确定",
                    callback: action => {}
                  }
                );
                this.managerList();
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },

    //确定新增
    sureToCreate(){
      let {loginName, loginPassword, mobile, operatorName } = this.createListData;
        if(loginName==''){
          this.$message.error('登录账号不能为空')
          return
        }else if(loginPassword==''){
           this.$message.error('登陆密码不能为空')
          return
        }else{
          axios({
            method:'post',
            url:''+'/admin/partner/operator/add',
            data:{
              partnerNo:this.$route.params.id,
              loginName,
              loginPassword,
              mobile,
              operatorName,
            }
          }).then(res=>{
            if(res.data.code=='200'){
              this.createFormVisible = false;
              this.managerList();
              this.$message.success(res.data.message);
            }else{
              this.$message.error(res.data.message)
            }
            console.log(res)
          }).catch(err=>{})
        }
    }

  }
};
</script>

<style lang="scss" scoped>
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
.goback {
  width: 100%;
  text-align: right;
  position: absolute;
  top: 0;
  right: 20px;
}

.first {
  padding: 40px 30px;
}

.position {
  position: absolute;
  top: 0;
  right: 30px;
  color: #999;
}
.fourth {
  padding: 20px 60px 80px;
}
.dialog-footer{
  padding: 0 60px 30px
}

</style>
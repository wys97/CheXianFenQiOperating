<template>
  <div class="container">
    <div class="top">
      <ul class="flex-item">
        <li>
          <span>{{detailHeadData.agentName}}</span>&nbsp;&nbsp;&nbsp;
          <span>{{detailHeadData.contactName}}</span>&nbsp;&nbsp;&nbsp;
          <span>{{detailHeadData.contactMobile}}</span>
        </li>
        <li>创建时间：{{detailHeadData.createTime?detailHeadData.createTime:'--'}}</li>
      </ul>
      <div class="flex-item" style="text-align: right;padding-top: 0;">
        <el-button
          :type="
					detailHeadData.agentStatus=='FROZEN'?'warning':
					detailHeadData.agentStatus=='ENABLED'?'success':
					detailHeadData.agentStatus=='DISABLED'?'danger':''"
          size="mini"
        >{{detailHeadData.agentStatusText}}</el-button>
        <!-- <el-button :type="detailHeadData.agentStatus==='ENABLED'?'success':'info'" plain>{{detailHeadData.agentStatusText}}</!-->
      </div>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane class="first_tab_content" label="基本信息" name="first">
            <div class="tab-content">
              <el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
                <div class="info-list">
                  <p class="title">基本信息</p>
                  <el-form-item label="代理商编号：">
                    <!--<span v-if="readOnly" class="input_read">{{detailData.capitalId}}</span>-->
                    <el-input v-model="detailData.agentId" :disabled="true" style="width: 300px;"></el-input>
                  </el-form-item>
                  <el-form-item label="代理商名称：">
                    <el-input v-model="detailData.agentName" style="width: 300px;" maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="代理商类型：">
                    <template>
                      <!--<span v-if="readOnly" class="input_read">{{guarantorDetailData.genderText}}</span>-->
                      <el-radio-group v-model="detailData.agentType">
                        <el-radio
                          v-if="agentTypeList"
                          v-for="(val, key) in agentTypeList"
                          :label="key"
                          :key="key"
                        >
                          <template>{{val}}</template>
                        </el-radio>
                      </el-radio-group>
                    </template>
                  </el-form-item>
                  <el-form-item label="对接产品：">
                    <!--<span v-if="readOnly" class="input_read">{{detailData.capitalId}}</span>-->
                    <el-input
                      v-model="detailData.productName"
                      :disabled="true"
                      style="width: 300px;"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="联系人名称：">
                    <el-input v-model="detailData.contactName" style="width: 300px;" maxlength="10"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人手机号：">
                    <el-input
                      v-model="detailData.contactMobile"
                      style="width: 300px;"
                      maxlength="11"
                      minlength="11"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="注册日期：">
                    <el-date-picker
                      v-model="detailData.registerDate"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="分润比例：">
                    <el-input v-model="detailData.profitScale" style="width: 300px;">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="结算周期：">
                    <template slot-scope="scope">
                      <el-select
                        v-model="detailData.settleCycle"
                        placeholder="请选择"
                        style="width: 200px;"
                      >
                        <el-option
                          v-if="settleCycle"
                          v-for="(val,key) in settleCycle"
                          :label="val"
                          :value="key"
                          :key="key"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-form-item>

                  <el-form-item label="状态：">
                    <template>
                      <!--<span v-if="readOnly" class="input_read">{{guarantorDetailData.genderText}}</span>-->
                      <el-radio-group v-model="detailData.agentStatus">
                        <el-radio label="ENABLED">启用</el-radio>
                        <el-radio label="DISABLED">停用</el-radio>
                      </el-radio-group>
                    </template>
                  </el-form-item>
                  <el-form-item label="代理商描述：">
                    <el-input
                      type="textarea"
                      :rows="4"
                      v-model="detailData.agentDesc"
                      style="width: 300px;"
                    ></el-input>
                  </el-form-item>
                  <div style="text-align: right;">
                    <el-button @click="doSaveCaptical" type="primary">保存</el-button>
                  </div>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab_content" label="登录账户" name="second">
            <div class="tab-content">
              <div class="info-list">
                <div
                  style="display:flex; justify-content:space-between; padding:0 30px; align-items:center; margin:20px 0"
                >
                  <p class="title" style="display: inline-block;">登录账户</p>
                  <el-button type="primary" style="width:120px;" @click="createAccount">新增</el-button>
                </div>
                <template>
                  <el-table :data="loginList" border style="width: 120%">
                    <el-table-column label="类型">
                      <template slot-scope="scope">
                        <span v-if="scope.row.isSuper">超级管理员</span>
                        <span v-else>管理员</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="loginName" label="登录账号"></el-table-column>
                    <el-table-column prop="name" label="操作员名称"></el-table-column>

                    <el-table-column prop="mobile" label="操作员手机号"></el-table-column>
                    <el-table-column prop="id" label="操作" width="300" align="center">
                      <template slot-scope="scope">
                        <el-button
                          v-if="!scope.row.isSuper"
                          @click="modificationBtn(scope.row.id)"
                          type="primary"
                          size="mini"
                        >修改</el-button>
                        <el-button
                          @click="doResetLoginpass(scope.row.id)"
                          type="danger"
                          size="mini"
                        >重置密码</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab_content" label="商户列表" name="third">
            <div class="tab-content">
              <div class="info-list">
                <div>
                  <p class="title" style="display: inline-block;">商户列表</p>
                </div>
                <template>
                  <el-table :data="applyList" border style="width: 100%">
                    <el-table-column prop="applyName" label="申请人" width="280">
                      <template slot-scope="scope">
                        <div>{{scope.row.applyName}}</div>
                        <div>{{scope.row.applyMobile}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="enterpriseName" label="企业信息" width="280">
                      <template slot-scope="scope">
                        <div>{{scope.row.enterpriseName}}</div>
                        <div>{{scope.row.licenseNo}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="repreName" label="法定代表人" width="280">
                      <template slot-scope="scope">
                        <div>{{scope.row.repreName}}</div>
                        <div>{{scope.row.repreMobile}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="280"></el-table-column>
                    <el-table-column prop="statusText" label="状态"></el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab_content" label="结算列表" name="forth">
            <div class="tab-content">
              <div class="info-list">
                <div>
                  <p class="title" style="display: inline-block;">结算列表</p>
                  <!-- <router-link :to="'settleBatchAdd'" class="router-link">	    	 -->
                  <el-button @click="settleBatchAdd" class="r_f" type="primary" size="mini">新增</el-button>
                  <!-- </router-link> -->
                </div>
                <template>
                  <el-table :data="settleBatchList" border style="width: 100%">
                    <el-table-column prop="settleBatchId" label="结算批次" width="200"></el-table-column>
                    <el-table-column prop="accountName" label="账户名称" width="200"></el-table-column>
                    <el-table-column prop="accountNum" label="账户号码" width="200"></el-table-column>
                    <el-table-column prop="settleAmount" label="结算金额(元)" width="200"></el-table-column>
                    <el-table-column prop="settleDate" label="结算日期" width="200"></el-table-column>
                    <el-table-column prop="settleStatusText" label="结算状态"></el-table-column>
                    <el-table-column prop="id" label="操作" width="200" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click="doReviseSettleBatch(scope.row.id)"
                          type="primary"
                          size="mini"
                        >修改</el-button>
                        <el-button
                          @click="doDeleteContact(scope.row.id)"
                          type="danger"
                          size="mini"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>状态</div>
            <div></div>
          </li>
        </ul>
      </div>
      <!--左侧操作栏-->
    </div>
    <!-- 创建/修改 代理商账号 -->
    <el-dialog
      :title="title"
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
        <!-- <el-form-item label="登录账号：">
          <el-input v-model="createListData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="初始化密码：">
          <el-input v-model="createListData.loginPassword"></el-input>
        </el-form-item>-->
        <el-form-item label="姓名：">
          <el-input v-model="createListData.operatorName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="createListData.mobile" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createFormVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="sureToCreate" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Upload from "@/components/Upload/Upload";
import agentDetail from "@/api/agentManage/agentDetail";
import baseUtil from "@/utils/baseUtil";
const axios = require("axios");
export default {
  name: "AgentUpdate",
  components: {
    Upload
  },
  data() {
    return {
      loginList: [], //登录账号列表

      applyList: [], //商户列表
      settleBatchList: [], //结算列表
      agentId: "", //代理商编号
      detailHeadData: "", //头部数据
      detailData: "", //详情数据(基本信息)
      settleCycle: "", //结算周期下拉
      agentTypeList: "", // 代理商类型
      centerDialogVisible: false,
      activeName2: "first",
      title: "",
      amendId: "", //修改的代理商Id
      tableData: [],
      createFormVisible: false, //创建按钮弹框
      createListData: {
        accountType: "管理员", //账号类型：
        loginName: "", //登录账号
        loginPassword: "", //初始化密码
        loginName: "", //用户名
        mobile: "" //手机号
      }
    };
  },
  watch: {
    //监听路由切换回调
    $route: "fetchdata"
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ])
  },
  created() {},
  mounted() {
    this.agentId = this.$route.params.id;
    if (this.agentId) {
      this.init();
    }
  },
  methods: {
    fetchdata() {
      this.agentId = this.$route.params.id;
      if (this.agentId) {
      }
    },
    handleClick(tab) {
      if (tab.index === "0") {
        this.getAgentBasicInfo(); //代理商基本信息
      } else if (tab.index === "1") {
        this.getAgentLoginAccountList(); //代理商登录列表
      } else if (tab.index === "2") {
        this.getAgentSupplierList(); //代理商商户列表
      } else if (tab.index === "3") {
        this.getAgentSettleList(); //代理商结算明细
      } else if (tab.index === "4") {
      }
    },
    init() {
      this.getSettleCycle(); //代理商结算周期下拉
      this.getDetailHeadData(); // 代理商详情---头部信息
      this.getAgentBasicInfo(); //代理商基本信息
      this.getAgentTypeList(); //代理商类型
    }, // 初始化

    //代理商管理头部信息
    getDetailHeadData() {
      agentDetail.agentHead(this.agentId).then(res => {
        if (res.data.code === "200") {
          this.detailHeadData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //代理商基本信息
    getAgentBasicInfo() {
      agentDetail.agentBasicInfo(this.agentId).then(res => {
        if (res.data.code === "200") {
          this.detailData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //代理商结算周期下拉
    getSettleCycle() {
      agentDetail.agentSettleCycle().then(res => {
        if (res.data.code === "200") {
          this.settleCycle = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //代理商类型
    getAgentTypeList() {
      agentDetail.agentTypeList().then(res => {
        if (res.data.code === "200") {
          this.agentTypeList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //代理商基本信息保存
    doSaveCaptical() {
      let data = baseUtil.copy(this.detailData);
      agentDetail
        .agentBasicInfoUpdate(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getDetailHeadData(); //代理商详情---头部信息
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    //代理商登录账号列表
    getAgentLoginAccountList() {
      agentDetail
        .agentLoginAccountList(this.agentId)
        .then(res => {
          if (res.data.code === "200") {
            let loginData = res.data.data;
            this.loginList = loginData;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    //新增账号按钮
    createAccount() {
      this.title = "创建代理商账号信息";
      this.createFormVisible = true;
    },

    //代理商登录账号修改信息
    modificationBtn(id) {
      this.amendId = id;
      //代理商登录账号修改信息
      this.title = "修改代理商账号信息";
      this.createFormVisible = true;
    },

    //确定新增代理商登陆账号
    sureToCreate() {
      let { mobile, operatorName } = this.createListData;
      if (!mobile) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (!operatorName) {
        this.$message.error("姓名不能为空");
        return;
      }
      if (this.title == "创建代理商账号信息") {
        let data = {
          agentId: this.$route.params.id,
          name: operatorName,
          mobile: mobile
        };

        agentDetail
          .sureToCreate(data)
          .then(res => {
            if (res.data.code == "200") {
              this.createFormVisible = false;
              this.createListData.operatorName='',
              this.createListData.mobile='',
              this.$message.success(res.data.message);
              this.getAgentLoginAccountList();
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {});
      } else {
        let data = {
          id:this.amendId,
          name:operatorName,
          mobile:mobile
        }
        agentDetail.sureToModify(data).then(res=>{
           if (res.data.code == "200") {
              this.createFormVisible = false;
              this.createListData.operatorName='',
              this.createListData.mobile='',
              this.$message.success(res.data.message);
              this.getAgentLoginAccountList();
            } else {
              this.$message.error(res.data.message);
            }
        })
      }
    },

    //代理商商户列表
    getAgentSupplierList() {
      agentDetail
        .agentSupplierList(this.agentId)
        .then(res => {
          if (res.data.code === "200") {
            let applyData = res.data.data;
            this.applyList = applyData;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    //代理商结算列表
    getAgentSettleList() {
      agentDetail
        .agentSettleList(this.agentId)
        .then(res => {
          if (res.data.code === "200") {
            let settleBatchData = res.data.data;
            this.settleBatchList = settleBatchData;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    // 代理商新增
    settleBatchAdd() {
      this.$router.push({ path: "../settleBatchAdd/" + this.agentId });
    },

    //代理商-结算信息修改
    doReviseSettleBatch(id) {
      this.$router.push({ path: "../settleBatchUpdate/" + id });
    },

    //代理商-点击删除结算信息
    doDeleteContact(id) {
      this.$confirm("此操作将删除结算, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          agentDetail
            .agentSettleDelete(id)
            .then(res => {
              if (res.data.code === "200") {
                this.$message.success(res.data.message);
                this.getAgentSettleList(); //结算信息列表---------查询
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },

    //代理商登录账号重置密码
    doResetLoginpass(id) {
      //点击重置密码
      this.$confirm(
        "请确认是否重置密码？确认后原密码失效！初始密码为‘操作员手机号’后6位",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          agentDetail
            .agentLResetPassword(id)
            .then(res => {
              if (res.data.code === "200") {
                this.$alert("重置密码成功", "操作提示", {
                  confirmButtonText: "关闭",
                  callback: action => {}
                });
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "agentUpdate.scss";
</style>

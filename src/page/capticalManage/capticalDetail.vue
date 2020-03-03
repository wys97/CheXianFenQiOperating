<template>
  <div class="container">
    <div class="top">
      <ul class="flex-item">
        <li>{{detailHeadData.capitalShortName}}</li>
        <!--<li>联系人：{{detailData.receiverName}}</li>
        <li>手机号：{{detailData.receiverPhone}}</li>-->
        <li>添加时间：{{detailHeadData.addTime?detailHeadData.addTime:'--'}}</li>
      </ul>
      <div class="flex-item" style="text-align: right;margin-right: 50px;">
        <el-button
          :type="detailHeadData.status==='ENABLED'?'success':'info'"
          plain
        >{{detailHeadData.statusText}}</el-button>
      </div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative">
        <div style="width:100px; float:right;" class="btn">
          <el-button @click="goreturn" class="fanhui">返回</el-button>
        </div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane class="first_tab_content" label="资方信息" name="first">
            <div class="tab-content">
              <el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
                <div class="info-list">
                  <p class="title">资方基础信息</p>
                  <el-form-item label="资方编号：">
                    <!--<span v-if="readOnly" class="input_read">{{detailData.capitalId}}</span>-->
                    <el-input v-model="detailData.capitalId" :disabled="true" style="width: 300px;"></el-input>
                  </el-form-item>
                  <el-form-item label="资方简称：">
                    <el-input v-model="detailData.capitalShortName" style="width: 300px;"></el-input>
                  </el-form-item>
                  <el-form-item label="资方类型：">
                    <template slot-scope="scope">
                      <!--<span v-if="readOnly" class="input_read">{{detailData.capitalTypeText}}</span>-->
                      <el-select v-model="detailData.capitalType" placeholder="请选择">
                        <el-option
                          v-for="(val,key) in capitalTypeList"
                          :key="key"
                          :label="val"
                          :value="key"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-form-item>
                  <el-form-item label="资方企业名称：">
                    <el-input v-model="detailData.capitalName" style="width: 300px;"></el-input>
                  </el-form-item>
                  <el-form-item label="社会统一信用代码：">
                    <el-input v-model="detailData.businessLicenseNo" style="width: 300px;"></el-input>
                  </el-form-item>
                  <el-form-item label="合作日期：">
                    <el-date-picker
                      v-model="detailData.cooperateDate"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="资方授信额度：">
                    <el-input v-model="detailData.creditLine" style="width: 300px;">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="经办人姓名：">
                    <el-input v-model="detailData.repreName" style="width: 300px;"></el-input>
                  </el-form-item>

                  <el-form-item label="经办人身份证：">
                    <el-input v-model="detailData.repreIdcardNo" style="width: 300px;"></el-input>
                  </el-form-item>

                  <el-form-item label="经办人手机号：">
                    <el-input v-model="detailData.repreMobile" style="width: 300px;"></el-input>
                  </el-form-item>
                  <el-form-item label="状态：">
                    <template>
                      <!--<span v-if="readOnly" class="input_read">{{guarantorDetailData.genderText}}</span>-->
                      <el-radio-group v-model="detailData.status">
                        <el-radio label="ENABLED">启用</el-radio>
                        <el-radio label="DISABLED">停用</el-radio>
                      </el-radio-group>
                    </template>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input
                      type="textarea"
                      :rows="4"
                      v-model="detailData.remark"
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
          <el-tab-pane class="tab_content" label="联系人信息" name="second">
            <div class="tab-content">
              <div class="info-list">
                <div>
                  <p class="title" style="display: inline-block;">联系人信息</p>
                  <el-button
                    class="r_f"
                    @click="doAddContact('contactDetailForm')"
                    type="primary"
                    size="mini"
                  >新增</el-button>
                </div>
                <template>
                  <el-table :data="contactList" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="120"></el-table-column>
                    <el-table-column prop="contactId" label="联系人编号" width="180"></el-table-column>
                    <el-table-column prop="contactName" label="联系人姓名" width="180"></el-table-column>
                    <el-table-column prop="position" label="职务"></el-table-column>
                    <el-table-column prop="mobile" label="联系电话"></el-table-column>
                    <el-table-column prop="remark" label="备注" width="260"></el-table-column>

                    <el-table-column prop="capitalId" label="操作" width="180" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click="doReviseContact(scope.row.contactId)"
                          type="primary"
                          size="mini"
                        >修改</el-button>
                        <el-button
                          @click="doDeleteContact(scope.row.contactId)"
                          type="danger"
                          size="mini"
                        >删除</el-button>
                        <!--<router-link :to="'capticalDetail/' + scope.row.capitalId"  class="router-link">查看</router-link>-->
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab_content" label="融资费率配置" name="three">
            <div style="margin: 25px 100px">渠道产品还款费率配置</div>
            <el-table :data="loanFeeData" style="width: 90%; margin:0 auto">
              <el-table-column label="是否开启产品" width="180">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.status">
                    <el-radio label="ENABLED">启用</el-radio>
                    <el-radio label="DISABLED">停用</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column prop="channelProductNo" label="渠道产品编号"></el-table-column>
              <el-table-column prop="channelProductName" label="渠道产品名称"></el-table-column>
              <el-table-column prop="installmentMethodText" label="分期方式"></el-table-column>
              <el-table-column prop="repaymentMethodText" label="还款方式"></el-table-column>
              <el-table-column prop="periodNumber" label="期数"></el-table-column>
              <el-table-column prop="onlineRate" label="线上服务费（%）"></el-table-column>
              <el-table-column prop="offlineRate" label="线下服务费（%）"></el-table-column>
              <el-table-column prop="backDateTypeText" label="还款日期类型"></el-table-column>
              <el-table-column prop="marginRatio" label="保证金比例（%）"></el-table-column>
              <el-table-column prop="deductionMethodText" label="保证金冲抵抵扣方式"></el-table-column>
            </el-table>
            <div style="text-align:center; margin-top:100px">
              <el-button type="primary" @click="statusSwitch" size="medium">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab_content" label="登录账户设置" name="fore">
            <div class="tab-content">
              <el-form label-width="190px" size="mini" label-position="right">
                <div class="info-list">
                  <div class="two-title">
                    <p class="title" style="display: inline-block;">资方端登录账户</p>
                    <el-button
                      type="primary"
                      class="chuangjian"
                      @click="createFormVisible = true"
                    >创建</el-button>
                  </div>
                  <template>
                    <el-table :data="capitalOperatorList" border style="width: 100%">
                      <el-table-column prop="type" label="类型"></el-table-column>
                      <el-table-column prop="loginName" label="账号"></el-table-column>
                      <el-table-column prop="operatorName" label="操作员姓名"></el-table-column>
                      <el-table-column prop="mobile" label="操作员手机号"></el-table-column>

                      <el-table-column prop="id" label="操作" width="180" align="center">
                        <template slot-scope="scope" v-if="scope.row.modify">
                          <el-button
                            @click="doUpdateCapitalOperator(scope.row.id)"
                            type="primary"
                            size="mini"
                          >修改</el-button>
                          <el-button
                            @click="doResetCapitalOperator(scope.row.id)"
                            type="danger"
                            size="mini"
                          >重置密码</el-button>
                          <!--<router-link :to="'capticalDetail/' + scope.row.capitalId"  class="router-link">查看</router-link>-->
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab_content" label="其他设置" name="fifth">
            <div class="tab-content">
              <el-form label-width="190px" size="mini" label-position="right">
                <div class="info-list">
                  <div>
                    <p class="title" style="display: inline-block;">签约设置</p>
                  </div>
                  <el-form-item label="签约方式：">
                    <template>
                      <el-radio-group v-model="signSetupData.method">
                        <el-radio
                          v-for="(val,key) in signSetupData.radio"
                          :label="key"
                          :key="key"
                        >{{val}}</el-radio>
                      </el-radio-group>
                    </template>
                  </el-form-item>

                  <el-form-item label="状态：" v-if="signSetupData.method==='THIRD_PART'">
                    <span
                      v-if="signSetupData.status"
                      style="color: #606266;margin-right: 10px;"
                    >{{signSetupData.status.statusText}}</span>
                    <el-button
                      v-if="signSetupData.status.applyButton"
                      @click="doApplySignSetup"
                      type="primary"
                    >申请</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div class="tab-content">
              <el-form label-width="190px" size="mini" label-position="right">
                <div class="info-list">
                  <div>
                    <p class="title" style="display: inline-block;">授信模式</p>
                  </div>
                  <el-form-item>
                    <template>
                      <el-radio-group v-model="signSetupData.creditMethod">
                        <el-radio
                          v-for="(val,key) in signSetupData.credit"
                          :label="key"
                          :key="key"
                        >{{val}}</el-radio>
                      </el-radio-group>
                    </template>
                  </el-form-item>
                  <!-- <span style="color: #606266;margin-left: 180px;">（注: 最少选择一种）</span> -->
                </div>
              </el-form>
            </div>
            <div class="tab-content">
              <el-form label-width="190px" size="mini" label-position="right">
                <div class="info-list">
                  <div>
                    <p class="title" style="display: inline-block;">对接模式</p>
                  </div>
                  <el-form-item>
                    <template>
                      <el-radio-group v-model="signSetupData.dockingMethod">
                        <el-radio
                          v-for="(val,key) in signSetupData.docking"
                          :label="key"
                          :key="key"
                        >{{val}}</el-radio>
                      </el-radio-group>
                    </template>
                  </el-form-item>
                  <!-- <span style="color: #606266;margin-left: 180px;">（注: 最少选择一种）</span> -->
                </div>
              </el-form>
            </div>
            <div style="text-align:right;margin-top:20px;margin-right:40px;">
              <el-button @click="doSaveOtherSettings" type="primary">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab_content" label="投保人信息" name="sixth">
            <div class="tab-content">
              <div class="info-list">
                <p class="title">资方基础信息</p>
              </div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="capitaId" label="渠道资方配置ID" width="180"></el-table-column>
                <el-table-column prop="partnerName" label="渠道资方名称" width="180"></el-table-column>
                <el-table-column prop="companyName" label="投保人企业名称"></el-table-column>
                <el-table-column prop="policyholdersNo" label="投保人证件号"></el-table-column>
                <el-table-column prop="identityType" label="证件类型"></el-table-column>
              </el-table>
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
          <!--<li style="padding: 10px 0;">
						<el-button :type="detailData.capticalStatus==='COOPERATING'?'success':''" style="width: 80%;margin: auto;">{{detailData.capticalStatusText}}</el-button>
          </li>-->
        </ul>
      </div>
      <!--左侧操作栏-->
    </div>
    <el-dialog title="联系人信息" :visible.sync="dialogFormVisibleContact">
      <el-form ref="contactDetailForm" label-width="190px" size="mini" label-position="right">
        <div class="info-list">
          <el-form-item label="联系人编号：" prop="contactId">
            <span v-if="contactDetail.add">(自动生成)</span>
            <el-input
              v-else
              v-model="contactDetail.contactId"
              :disabled="true"
              style="width: 300px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名：" prop="contactName">
            <el-input v-model="contactDetail.contactName" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="position">
            <el-input v-model="contactDetail.position" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="mobile">
            <el-input v-model="contactDetail.mobile" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :rows="4" v-model="contactDetail.remark"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleContact = false">取 消</el-button>
        <el-button type="primary" @click="saveContactDetail">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="账户信息" :visible.sync="dialogFormVisibleCapitalOperator" width="500px">
      <el-form
        ref="capitalOperatorDetailForm"
        label-width="120px"
        size="mini"
        label-position="right"
      >
        <div class="info-list">
          <el-form-item label="类型：" prop="type">
            <span>{{capitalOperatorDetail.type}}</span>
          </el-form-item>
          <el-form-item label="账号：" prop="contactName">
            <span>{{capitalOperatorDetail.loginName}}</span>
          </el-form-item>
          <el-form-item label="初始密码：" prop="initialPassword">
            <span>{{capitalOperatorDetail.initialPassword}}</span>
          </el-form-item>
          <el-form-item label="姓名：" prop="operatorName">
            <el-input v-model="capitalOperatorDetail.operatorName" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="关联手机号：" prop="mobile">
            <el-input v-model="capitalOperatorDetail.mobile" style="width: 300px;" maxlength="11"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCapitalOperator = false">取 消</el-button>
        <el-button type="primary" @click="saveCapitalOperatorDetail">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 创建资方账号 -->
    <el-dialog
      title="创建资方登录账户"
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
import defaultImg from "@/assets/imgs/default.jpg";
import { comboboxBankList } from "@/api/common";
import CapticalDetail from "@/api/capticalManage/capticalDetail";
import { validContent } from "@/utils/validate";
import { Format } from "@/utils/index";
import baseUtil from "@/utils/baseUtil";
const axios = require("axios");
export default {
  name: "CapticalDetail",
  components: {
    Upload
  },
  data() {
    return {
      capitalId: "", // 资金方id
      detailData: "", //详情数据
      detailHeadData: "", //头部数据
      capitalTypeList: "", //资方类型下拉
      contactList: [], //联系人列表数据
      contactDetail: {
        //联系人详情
        contactId: "",
        contactName: "",
        position: "",
        mobile: "",
        remark: ""
      },
      capitalOperatorList: [], //资方端登录账号-列表
      capitalOperatorDetail: {
        //资方端登录账号详情
        id: "",
        type: "",
        loginName: "",
        operatorName: "",
        mobile: "",
        initialPassword: ""
      },
      signSetupData: "", //签约设置
      checkedFinanceMethod: [], //选中的融资方式
      dialogFormVisibleContact: false, //联系人新增dialog
      dialogFormVisibleCapitalOperator: false, //修改登录账户dialog
      loanFeeData: [], //融资费率配置数据
      activeName2: "first",
      loanFeeDataState: "",
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
  created() {
    this.capitalId = this.$route.params.id;
    if (this.capitalId) {
      this.init();
    }
  },
  mounted() {},
  methods: {
    goreturn() {
      this.$router.go(-1);
    },
    fetchdata() {
      this.capitalId = this.$route.params.id;
      if (this.capitalId) {
        /*this.init()*/
      }
    },
    handleClick(tab) {
      if (tab.index === "0") {
        //资方信息
        this.getCapticalDetail(); //资金方详情信息
        this.getCapitalTypeList(); //资方类型下拉
      } else if (tab.index === "1") {
        //联系人信息
        this.getContactList(); //联系人列表
      } else if (tab.index === "2") {
        //融资费率配置
        this.getLoanFee(); //融资费率查询
      } else if (tab.index === "3") {
        //登录账户设置
        this.getCapitalOperatorList(); //资方端登录账号-列表---------查询
      } else if (tab.index === "4") {
        this.getSignSetup(); //其它设置-签约设置-------------查询
      }else if (tab.index === "5") {
        this.getPolicyHolderInfo(); //投保人信息-------------查询
      }
    },
    init() {
      this.getCapticalDetail(); //资金方详情信息
      this.getCapitalTypeList(); //资方类型下拉
      this.getDetailHeadData(); //资金方详情---头部信息
    }, // 初始化
    getDetailHeadData() {
      //头部信息
      CapticalDetail.detailHead(this.capitalId).then(res => {
        if (res.data.code === "200") {
          this.detailHeadData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getCapticalDetail() {
      // 	资金方详情信息
      CapticalDetail.detail(this.capitalId).then(res => {
        if (res.data.code === "200") {
          this.detailData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getCapitalTypeList() {
      //资方类型下拉
      CapticalDetail.capitalType().then(res => {
        if (res.data.code === "200") {
          this.capitalTypeList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    doSaveCaptical() {
      //资方详情-保存
      let data = baseUtil.copy(this.detailData);
      if (typeof data.cooperateDate === "object" && data.cooperateDate) {
        data.cooperateDate = Format(data.cooperateDate, "yyyy-MM-dd");
      }

      CapticalDetail.capitalSave(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getDetailHeadData(); //资金方详情---头部信息
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getContactList() {
      //联系人列表---------查询
      let data = {
        page: 1,
        limit: 50,
        capitalId: this.capitalId
      };
      CapticalDetail.contactList(data)
        .then(res => {
          if (res.data.code === "200") {
            this.contactList = res.data.data.list;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doAddContact(formName) {
      //点击新增联系人
      this.contactDetail = {
        add: true,
        contactId: "",
        contactName: "",
        position: "",
        mobile: "",
        remark: ""
      };
      this.dialogFormVisibleContact = true;
    },
    doReviseContact(contactId) {
      //点击修改联系人
      CapticalDetail.contactDetail(contactId)
        .then(res => {
          if (res.data.code === "200") {
            this.contactDetail = res.data.data;
            this.dialogFormVisibleContact = true;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doDeleteContact(contactId) {
      //点击删除联系人
      this.$confirm("此操作将删除联系人, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          CapticalDetail.removeContact(contactId)
            .then(res => {
              if (res.data.code === "200") {
                this.$message.success(res.data.message);
                this.getContactList(); //联系人列表---------查询
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    saveContactDetail() {
      //保存联系人信息
      let data = baseUtil.copy(this.contactDetail);
      data.capitalId = this.capitalId;
      CapticalDetail.saveContact(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getContactList(); //联系人列表---------查询
            this.dialogFormVisibleContact = false;
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    //登录账号
    getCapitalOperatorList() {
      //资方端登录账号-列表---------查询
      CapticalDetail.capitalOperatorList(this.capitalId)
        .then(res => {
          if (res.data.code === "200") {
            this.capitalOperatorList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doUpdateCapitalOperator(id) {
      //点击修改登录账户
      CapticalDetail.queryCapitalOperator(id)
        .then(res => {
          if (res.data.code === "200") {
            this.capitalOperatorDetail = res.data.data;
            this.capitalOperatorDetail.id = id;
            this.dialogFormVisibleCapitalOperator = true;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doResetCapitalOperator(id) {
      //点击重置密码
      this.$confirm("请确认是否重置密码？确认后原密码失效！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          CapticalDetail.resetPassWord(id)
            .then(res => {
              if (res.data.code === "200") {
                this.$alert(
                  "重置密码成功！新密码为手机号的后六位",
                  "操作提示",
                  {
                    confirmButtonText: "关闭",
                    callback: action => {}
                  }
                );
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    saveCapitalOperatorDetail() {
      //保存修改登录账户
      let data = baseUtil.copy(this.capitalOperatorDetail);
      CapticalDetail.updateOperator(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getCapitalOperatorList(); //资方端登录账号-列表---------查询
            this.dialogFormVisibleCapitalOperator = false;
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getLoanFee() {
      //融资费率-------------查询
      CapticalDetail.loanFee(this.capitalId)
        .then(res => {
          if (res.data.code === "200") {
            this.loanFeeData = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              this.loanFeeDataState = res.data.data[i].status;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    //融资费率-------------保存
    statusSwitch() {
      let { loanFeeData } = this;
      let arr = [];
      for (let i = 0; i < loanFeeData.length; i++) {
        let data = { id: loanFeeData[i].id, status: loanFeeData[i].status };
        arr.push(data);
      }
      let data = arr;
      axios({
        url: "" + "/admin/capital_manage/save_loanfee",
        method: "post",
        data
      }).then(res => {
        if (res.data.code == "200") {
          this.$message.success(res.data.message);
          this.getLoanFee();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    getSignSetup() {
      //其它设置-签约设置-------------查询
      CapticalDetail.signSetup(this.capitalId)
        .then(res => {
          if (res.data.code === "200") {
            this.signSetupData = res.data.data;
            let v = this.signSetupData.financeMethod;
            if (v != null) {
              this.checkedFinanceMethod = v.split(",");
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doApplySignSetup() {
      //其它设置-签约设置申请
      CapticalDetail.applySignSetup(this.capitalId)
        .then(res => {
          if (res.data.code === "200") {
            this.getSignSetup(); //其它设置-签约设置-------------查询
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doSaveOtherSettings() {
      // 其它设置-----------------保存
      let data = baseUtil.copy(this.signSetupData);
      data.capitalId = this.capitalId;
      data.financeMethod = this.checkedFinanceMethod.join();
      CapticalDetail.saveSignSetup(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getSignSetup();
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //				console.log(row+'www'+column+'www'+rowIndex+'www'+columnIndex )
      if (columnIndex === 0) {
        //					return [3, 1];
        //					console.log(row)
        //					console.log(column)
      }
    },
    applyCertificateClick() {
      CapticalDetail.applyCertificate(this.capitalId).then(res => {
        if (res.data.code === "200") {
          this.getCapticalDetail();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //确定新增
    sureToCreate() {
      let {
        loginName,
        loginPassword,
        mobile,
        operatorName
      } = this.createListData;

      axios({
        method: "post",
        url: "" + "/admin/capital_manage/capital_operator_add",
        data: {
          capitalId: this.$route.params.id,
          loginName,
          loginPassword,
          mobile,
          operatorName
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.createFormVisible = false;
            this.$message.success(res.data.message);
            this.getCapitalOperatorList();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },


    //投保人信息
    getPolicyHolderInfo(){
      axios({
        url:''+'/admin/capital_manage/policy_holder_info?capitalId='+this.capitalId,
        method:'post',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        },
      
      }).then(res=>{
        if(res.data.code=='200'){
          this.tableData = res.data.data
        }
      })
    }


  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "capticalDetail.scss";
</style>

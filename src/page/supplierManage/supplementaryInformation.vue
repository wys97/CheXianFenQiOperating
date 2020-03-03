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
      </div>-->
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
        <el-tabs type="card" @tab-click="handleClick"  v-model="activeName">
          <el-tab-pane label="基本信息" name="1">
            <el-form
              ref="form"
              label-width="180px"
              size="small"
              style="width:500px; margin:60px 200px 0"
            >
              <el-form-item label="用户基本信息"></el-form-item>
              <el-form-item label="被保人类型：" prop="radio">
                <span>{{this.basicInformation.insured_type}}</span>
              </el-form-item>
              <el-form
                v-if="basicInformation.insured_type=='个人'"
                label-width="180px"
                style="width:100%"
              >
                <el-form-item label="被保人手机号：" prop="insuredPhone">
                  <span>{{this.basicInformation.agent_phone}}</span>
                </el-form-item>
                <el-form-item label="身份证：" prop="identityCardFile">
                  <div style="display:flex; align-items:center">
                    <img
                      :src="basicInformation.repayee_font_url"
                      style="width:90px; height:110px; margin:10px"
                    />
                    <img
                      :src="basicInformation.repayee_back_url"
                      style="width:90px; height:110px; margin:10px"
                    />
                  </div>
                </el-form-item>
                <el-form-item label="被保人姓名：" prop="insuredName">
                  <span>{{this.basicInformation.agent_name}}</span>
                </el-form-item>
                <el-form-item label="被保人身份证号：" prop="identityCard">
                  <span>{{this.basicInformation.agent_id_no}}</span>
                </el-form-item>
                <el-form-item label="地址：">
                  <span>{{this.basicInformation.insured_addres}}</span>
                </el-form-item>
                <el-form-item label="户籍省份：">
                  <el-select
                    v-model="basicInformation.province_code"
                    placeholder="请选择"
                    @change="selectProvince"
                  >
                    <el-option
                      v-for="item in province"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="户籍城市：">
                  <el-select v-model="basicInformation.city_code" placeholder="请选择" @change="selectCity" >
                    <el-option
                      v-for="item in city"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="户籍区县：">
                  <el-select v-model="basicInformation.county_code" placeholder="请选择">
                    <el-option
                      v-for="item in county"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="preserveAmend">保存</el-button>
                </el-form-item>
              </el-form>
              <el-form v-else label-width="180px" style="width:100%">
                <el-form-item label="经办人手机号：" prop="handlerPhone">
                  <span>{{this.basicInformation.agent_phone}}</span>
                </el-form-item>
                <el-form-item label="经办人身份证：" prop="identityCardFile">
                  <div style="display:flex; align-items:center">
                    <img
                      :src="basicInformation.repayee_font_url"
                      style="width:90px; height:110px; margin:10px"
                    />
                    <img
                      :src="basicInformation.repayee_back_url"
                      style="width:90px; height:110px; margin:10px"
                    />
                  </div>
                </el-form-item>
                <el-form-item label="经办人姓名：" prop="handlerName">
                  <span>{{this.basicInformation.agent_name}}</span>
                </el-form-item>
                <el-form-item label="经办人身份证号：" prop="handlerIdentityCard">
                  <span>{{this.basicInformation.repre_idcard_no}}</span>
                </el-form-item>
                <el-form-item label="地址：">
                  <span>{{this.basicInformation.insured_addres}}</span>
                </el-form-item>
                <el-form-item label="户籍省份：">
                  <el-select
                    v-model="basicInformation.province_code"
                    placeholder="请选择"
                    @change="selectProvince"
                  >
                    <el-option
                      v-for="item in province"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="户籍城市：">
                  <el-select v-model="basicInformation.city_code" placeholder="请选择"  @change="selectCity">
                    <el-option
                      v-for="item in city"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="户籍区县：">
                  <el-select v-model="basicInformation.county_code" placeholder="请选择">
                    <el-option
                      v-for="item in county"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="经办人授权协议：">
                  <div style="display:flex; align-items:center">
                    <img
                      :src="basicInformation.agent_agreement_url"
                      style="width:90px; height:110px; margin:10px"
                    />
                  </div>
                </el-form-item>
                <hr width="160%" />

                <el-form-item label="企业营业执照：" style="margin-top:30px" prop="businessLicense">
                  <div style="display:flex; align-items:center">
                    <img
                      :src="basicInformation.insured_font_url"
                      style="width:90px; height:110px; margin:10px"
                    />
                  </div>
                </el-form-item>
                <el-form-item label="被保企业名称：" prop="nameFirm">
                  <span>{{this.basicInformation.insured_name}}</span>
                </el-form-item>
                <el-form-item label="企业信用代码：" prop="creditCode">
                  <span>{{this.basicInformation.id_no}}</span>
                </el-form-item>
                <el-form-item label="营业执照有效期：" prop="tradingCertificate">
                  <span>{{this.basicInformation.expire_date}}</span>
                </el-form-item>
                <el-form-item label="法人姓名：" prop="legalPersonName">
                  <span>{{this.basicInformation.repre_name}}</span>
                </el-form-item>
                <el-form-item label="法人身份证号：" prop="legalPersonIdCardNo">
                  <span>{{this.basicInformation.repre_idcard_no}}</span>
                </el-form-item>
                <el-form-item label="企业账号：" prop="corporateAccount">
                  <span>{{this.basicInformation.ent_account}}</span>
                </el-form-item>
                <el-form-item label="开户支行：" prop="depositBank">
                  <span>{{this.basicInformation.ent_open_bank}}</span>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="preserveAmend">保存</el-button>
                </el-form-item>
              </el-form>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="车辆信息" name="2">
            <div class="flex" style="padding:30px 0px 20px; width:90%; margin:0 auto ">
              <div>
                <span>车辆信息</span>
              </div>
            </div>
            <el-form label-width="180px" style="width:100%">
              <el-form-item label="证件类型：" prop="insuredPhone">
                <span v-if="this.carData.licenseType=='VEHICLE_LICENSE'">行驶证</span>
                <span v-else>合格证</span>
              </el-form-item>
              <el-form-item label="车牌号：" v-if="this.carData.licenseType=='VEHICLE_LICENSE'" prop="identityCardFile">
                <span>{{this.carData.licenseNo}}</span>
              </el-form-item>
              <el-form-item label="车主姓名：" prop="insuredName">
                <span>{{this.carData.ownerName}}</span>
              </el-form-item>
              <el-form-item label="车辆识别码：" prop="identityCard">
                <span>{{this.carData.frameNo}}</span>
              </el-form-item>
              <el-form-item label="发动机号：">
                <span>{{this.carData.engineNo}}</span>
              </el-form-item>
              <el-form-item label="行驶证：" v-if="this.carData.licenseType=='VEHICLE_LICENSE'">
                <div style="display:flex; align-items:center">
                  <img :src="carData.licenseFontUrl" style="width:90px; height:110px; margin:10px" />
                  <img :src="carData.licenseBackUrl" style="width:90px; height:110px; margin:10px" />
                </div>
              </el-form-item>
              <el-form-item label="合格证：" v-else>
                <div style="display:flex; align-items:center">
                  <img :src="carData.licenseFontUrl" style="width:90px; height:110px; margin:10px" />
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="分期申请信息" name="3">
            <el-form
              ref="form"
              label-width="180px"
              :model="listData"
              size="medium"
              :rules="rules"
              style="width:500px; margin:60px 100px 60px"
            >
              <el-form-item label="分期订单申请"></el-form-item>
              <el-form-item label="业务员：">
                <span>{{userName}}</span>
              </el-form-item>
              <el-form-item label="上传投保单：" prop="policyholderUrl">
                <!-- <el-upload
                  style="width:148px; height:148px; display:flex"
                  :limit="1"
                  action="/admin/apply_supplement/upload_insurance_policy"
                  list-type="picture-card"
                  :http-request="uploadPolicy"
                >
                  <i class="el-icon-plus" ></i>
                </el-upload> -->
                <el-upload
                  class="avatar-uploader"
                 action="/admin/apply_supplement/upload_insurance_policy"
                  :show-file-list="false"
                   :http-request="uploadPolicy">
                  <img v-if="listData.policyholderUrl" :src="listData.policyholderUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>


              </el-form-item>
              <el-form-item label="投保企业名称：" prop="holderCompanyData">
                <el-select
                  v-model="listData.corporationName"
                  @change="holderCompanyCode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,key) in listData.holderCompanyData"
                    :key="key"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投保企业信用代码：" prop="creditCode">
                <el-input v-model="listData.creditCode"></el-input>
              </el-form-item>

              <el-form-item label="保险公司：" prop="insuranceCompany">
                <el-select
                  v-model="listData.insuranceId"
                  @change="getSelectInsurance"
                  placeholder="请选择"
                  prop="insuranceCompany"
                >
                  <el-option
                    v-for="(item,key) in listData.insuranceCompanyData"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收款机构：" prop="collectionAgencies">
                <el-select
                  v-model="listData.gathering"
                  placeholder="请选择"
                  @visible-change="getInsurance"
                >
                  <el-option
                    v-for="(item,key) in listData.insuranceInstitution"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品名称：" prop="productModel">
                <el-select
                  v-model="listData.productCompayId"
                  @change="getProduct"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, key) in listData.productCompayData"
                    :key="key"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分期期数：" prop="installmentPeriods">
                <span>{{this.listData.productInstitution.periods}}期</span>
              </el-form-item>
              <el-form-item label="金融信息服务费：" prop="productInstitution">
                <div v-if="this.listData.productInstitution">
                  <span>{{this.listData.productInstitution.onlineRate}} % 线上服务费</span>
                  <span>{{this.listData.productInstitution.offlineRate}}%线下服务费</span>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="20" >
                  <el-form-item label="商业险金额：" prop="commercialInsurance" >
                      <div style="display:flex">
                          <el-input v-model="listData.commercialInsurance"></el-input> <span> 元</span>
                      </div>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1">
                  <el-button type="primary" size="mini" margin="30px 0 0" @click="countBtn">分期试算</el-button>
                </el-col>
              </el-row>
              <el-form-item label="交强险金额：" prop="compulsoryInsurance">
                 <div style="display:flex">
                <el-input v-model="listData.compulsoryInsurance"></el-input> <span> 元</span>
                </div>
              </el-form-item>
              <el-form-item label="车船税金额：" prop="motorAndShipInsurance">
                  <div style="display:flex">
                <el-input v-model="listData.motorAndShipInsurance"></el-input> <span> 元</span>
                 </div>
              </el-form-item>
            </el-form>
            <hr width="90%" />
            <div  v-if="trialDialogVisible" style="margin:40px 0 0 170px" >
              <p style="line-height:30px">分期方案</p>
              <p style="line-height:30px">分期总额：{{this.trial.installmentAmount}}元</p>
              <p style="line-height:30px">分期期数：{{this.trial.installmentNum}}期</p>
              <p style="line-height:30px">平台首付：{{this.trial.firstAmount}}元（交强{{this.trial.strongAmount}}元+车船{{this.trial.taxAmont}}元+保证金{{this.trial.depositAmount}}元+线上服务费{{this.trial.customerOnlineAmount}}元）</p>
              <p style="line-height:30px; padding-left:80px">首付保证金率=100%/总期数</p>

              <el-table :data="trial.installmentPlanList" style="width: 60%; margin-top:30px" border>
                <el-table-column prop="installmentNo" label="期数" width="180" align="center"></el-table-column>
                <el-table-column prop="installmentCurrentAmount" label="应还金额" width="180" align="center"></el-table-column>
                <el-table-column prop="dueDate" label="还款日期" align="center"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>操作</div>
          </li>
          <li>
            <div>
              <el-button @click="cancelBtn">取消</el-button>
              <el-button type="primary" @click="submitApplications">提交分期申请</el-button>
            </div>
          </li>
        </ul>
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
import axios from "@/api/supplierMaintain/supplierMaintainDetail";
import baseUtil from "@/utils/baseUtil";
import { validContent } from "@/utils/validate";
import { Format } from "@/utils/index";
const axiosRequest = require("axios");
export default {
  name: "supplementaryInformation",
  data() {
    return {
      id: "",
      tabIndex: "0",
      basicInformation: "", //基本信息数据
      carData: "", //车辆信息
      province: [], //省
      city: [], //市
      county:[], //区县
      activeName:'1',  //子页签跳转
      listData: {
        policyholderUrl: "", //上传的表单
        holderCompanyData: "", //分期申请-投保企业下拉
        corporationName: "", //投保企业名称
        creditCode: "",
        insuranceCompanyData: "", //分期申请-保险公司下拉
        insuranceInstitution: [], //分期申请-收款机构
        productCompayData: "", //分期申请-产品下拉
        productInstitution: "", //分期审-产品下拉-分期期数和金融服务费
        gathering: "", //收款机构
        commercialInsurance: "", //商业险金额
        compulsoryInsurance: "", //交强险金额
        motorAndShipInsurance: "", //车船税金额
        insuranceId: "", //分期申请-保险公司id
        productCompayId: "" //分期申请-产品id
      },
          trial:'', //分期试算数据 
          trialDialogVisible:false, //分期试算弹窗
      rules: {
        policyholderUrl: [
          { required: true, message: "请上传保单", trigger: "blur" }
        ],
        holderCompanyData: [
          { required: true, message: "请选择投保企业", trigger: "blur" }
        ],
        creditCode: [
          {
            required: true,
            message: "请输入投保企业信用代码",
            trigger: "change"
          }
        ],
        insuranceCompany: [
          { required: true, message: "请选择保险公司", trigger: "blur" }
        ],

        collectionAgencies: [
          { required: true, message: "请选择收款机构", trigger: "blur" }
        ],

        productModel: [
          { required: true, message: "请选择产品", trigger: "blur" }
        ],
        installmentPeriods: [
          { required: true, message: "请选择分期期数", trigger: "blur" }
        ],
        productInstitution: [
          { required: true, message: "请输入金融服务费", trigger: "change" }
        ],
        commercialInsurance: [
          { required: true, message: "请输入商业险金额", trigger: "change" }
        ],
        compulsoryInsurance: [
          { required: true, message: "请输入交强险金额", trigger: "change" }
        ],
        motorAndShipInsurance: [
          { required: true, message: "请输入车船税金额", trigger: "change" }
        ]
      },
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
      "userName"
    ])
  },

  watch: {},
  created() {
    this.id = this.$route.params.id;
    this.getData();
    this.getProvinceAndCity();
     this.getAllState();
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      if (tab.index == "0") {
        this.tabIndex = "0";
      } else if (tab.index == "1") {
        this.getCarData();
        this.tabIndex = "1";
      } else if (tab.index == "2" && this.id) {
        this.getAllState();
        this.tabIndex = "2";
      }
    },

    //基本信息
    getData() {
      let data = {
        financeOrderId: this.id
      };
      axios.detailData(data).then(res => {
        if (res.data.code == "200") {
          this.basicInformation = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //车辆信息
    getCarData() {
      let data = {
        financeOrderId: this.id
      };
      axios.carData(data).then(res => {
        if (res.data.code == "200") {
          this.carData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    getProvinceAndCity() {
      axiosRequest({
        url: "" + "/admin/order_supplement/area-info",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.code == "200") {
          this.province = res.data.data[0].children;
        }
      });
    },
    //选择省 获取市
    selectProvince(value) {
      let provinces = this.province.filter(item => {
        if (item.value == value) {
          return item;
        }
      });
      this.city = provinces[0].children;
    },
    //选择市 获取区县
    selectCity(value){
      let county = this.city.filter(item=>{
        if(item.value==value){
          return item
        }
      })

      this.county =county[0].children


    },



    //保存基本
    preserveAmend() {
      if (
        !this.basicInformation.province_code ||
        !this.basicInformation.city_code ||
        !this.basicInformation.county_code
      ) {
        this.$message.error("户籍省市区县不能为空");
        return;
      }
      let data = {
        financeOrderId: this.id,
        provinceCode: this.basicInformation.province_code,
        cityCode: this.basicInformation.city_code,
        countyCode: this.basicInformation.county_code,
      };
      axios.preserveAmend(data).then(res => {
        if (res.data.code == "200") {
          this.activeName='3';
          this.tabIndex='2'
          this.$message.success("保存成功");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //分期申请信息 所有状态
    getAllState() {
      let data = {
        financeOrderId: this.id
      };
      //分期申请-投保企业下拉
      axios.holderCompany().then(res => {
        if (res.data.code == "200") {
          this.listData.holderCompanyData = res.data.data;
        }
      });
      // 分期申请-保险公司下拉
      axios.insuranceCompany().then(res => {
        if (res.data.code == "200") {
          this.listData.insuranceCompanyData = res.data.data;
        }
      });
      // 分期申请-产品下拉
      axios.productCompay().then(res => {
        if (res.data.code == "200") {
          this.listData.productCompayData = res.data.data;
        }
      });
    },

    //上传保单
    uploadPolicy(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let reader = new FileReader();
        let imgFile;
        this.loading = this.$loading({
          lock: true,
          text: "上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        reader.readAsDataURL(file);
        reader.onload = e => {
          imgFile = e.target.result;
          let arr = imgFile.split(",");
          let format = file.name.split(".");

          let data = {
            fileInfo: arr[1],
            suffix: format[1],
            desc: "经办人授信协议"
          };
          axiosRequest({
            url: "" + "/admin/apply_supplement/upload_insurance_policy",
            method: "post",
            data: { ...data },
            headers: { "Content-Type": "application/json" }
          }).then(res => {
            this.loading.close();
            if (res.data.code == "200") {
              this.$message.success("上传成功");
              this.listData.policyholderUrl = res.data.data.imageUrl;
            } else {
              this.$message.error("上传失败,请重新上传");
            }
          });
        };
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //选择保险公司后 设置、收款机构
    getSelectInsurance(value) {
      let select = this.listData.insuranceCompanyData.filter(item => {
        if (item.value == value) {
          return item;
        }
      });

      this.listData.insuranceInstitution = select[0].children;
    },

    //分期申请-收款机构下拉
    getInsurance(value) {
      if (value && !this.listData.insuranceId) {
        this.$message.error("请先选择保险公司");
        return;
      }
      let data = {
        id: this.listData.insuranceId
      };
    },
    //分期申请-产品下拉-分期期数和金融服务费
    getProduct(value) {
      let data = {
        productId: value
      };
      axios.productInstitution(data).then(res => {
        if (res.data.code == "200") {
          this.listData.productInstitution = res.data.data;
        }
      });
    },
    //分期申请-投保企业对应信用代码
    holderCompanyCode(value) {
      if (value) {
        let data = {
          id: value
        };
        axios.holderCompanyCode(data).then(res => {
          if (res.data.code == "200") {
            this.listData.creditCode = res.data.data;
          }
        });
      }
    },

    //分期试算
    countBtn() {
      let {
        productCompayId,
        gathering,
        commercialInsurance,
        compulsoryInsurance,
        motorAndShipInsurance,
        corporationName
      } = this.listData;
  
      if (!commercialInsurance) {
        this.$message.error("请输入商业险金额");
        return;
      }

      if (!corporationName) {
        this.$message.error("请选择投保企业名称");
        return;
      }
      if (!gathering) {
        this.$message.error("请选择收款机构");
        return;
      }
      if (!compulsoryInsurance) {
        this.$message.error("请输入交强险金额");
        return;
      }

      if (!motorAndShipInsurance) {
        this.$message.error("请输入车船税金额");
        return;
      }

      if (!productCompayId) {
        this.$message.error("请选择产品名称");
        return;
      }
        this.loading = this.$loading({
          lock: true,
          text: "试算中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
      
      let data = {
        funSideId: corporationName,
        productNo: productCompayId,
        offLineId: gathering,
        installmentAmount: commercialInsurance,
        taxAmont: motorAndShipInsurance,
        strongAmount: compulsoryInsurance
      };

      axiosRequest({
        url: '' + "/admin/order_supplement/trial",
        method: "post",
        data
      }).then(res => {
        this.loading.close();
        if(res.data.code=='200'){
          this.trialDialogVisible = true;
           let listData = JSON.parse(JSON.stringify(res.data.data));
               listData.installmentPlanList[listData.installmentPlanList.length-1].dueDate = '保证金冲抵';
          this.trial = listData
        }else{
          this.$message.error(res.data.message)
        }
      });
    },

    //提交分期申请
    submitApplications() {
      if (this.tabIndex == "0" || this.tabIndex == "1") {
        return;
      }
      if (!this.basicInformation.province_code) {
        this.$message.error("基本信息的户籍省份不能为空");
        return;
      }
      if (!this.basicInformation.city_code) {
        this.$message.error("基本信息的户籍城市不能为空");
        return;
      }
      if (!this.basicInformation.county_code) {
        this.$message.error("基本信息的户籍区县不能为空");
        return;
      }

      let {
        corporationName,
        gathering,
        policyholderUrl,
        commercialInsurance,
        compulsoryInsurance,
        motorAndShipInsurance,
        insuranceId,
        productCompayId
      } = this.listData;
      if (!policyholderUrl) {
        this.$message.error("请上传保单照片");
        return;
      }

      if (!corporationName) {
        this.$message.error("请选择投保企业名称");
        return;
      }
      if (!insuranceId) {
        this.$message.error("请选择保险公司");
        return;
      }
      if (!gathering) {
        this.$message.error("请选择收款机构");
        return;
      }
      if (!commercialInsurance) {
        this.$message.error("请输入商业险金额");
        return;
      }
      if (!compulsoryInsurance) {
        this.$message.error("请输入交强险金额");
        return;
      }

      if (!motorAndShipInsurance) {
        this.$message.error("请输入车船税金额");
        return;
      }

      if (!productCompayId) {
        this.$message.error("请选择产品名称");
        return;
      }
      let data = {
        financeOrderId: this.id,
        insuranceUrl: policyholderUrl,
        policyCompanyId: corporationName,
        insuranceCompanyId: gathering,
        productId: productCompayId,
        installmentAmount: commercialInsurance,
        taxAmont: compulsoryInsurance,
        strongAmount: motorAndShipInsurance
      };
      axios.orderInfoSave(data).then(res => {
        if (res.data.code == "200") {
          this.$router.push({ path: "/supplierManage/supplierRegister" });
          this.$message.success("提交分期申请成功");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //取消生成订单
    cancelBtn() {
      this.$confirm("此操作将取消分期申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            financeOrderId: this.id
          };
          axios.baseInformationClear(data).then(res => {
            if (res.data.code == "200") {
              this.$message.success("取消分期申请成功");
              this.$router.go(-1)
              this.province = false;
              this.basicInformation.province_code = "";
              this.basicInformation.city_code = "";
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "supplierDetail.scss";
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>

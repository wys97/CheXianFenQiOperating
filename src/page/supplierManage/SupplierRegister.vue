<template>
  <div class="page-container" ref="page-container" id="page-container" style="overflow:auto">
    <!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="业务单号：" prop="orderNo">
          <el-input v-model="listQuery.orderNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="车牌号：" prop="licenseNo">
          <el-input v-model="listQuery.licenseNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="VIN码：" prop="licenseNo">
          <el-input v-model="listQuery.frameNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="被保人：" prop="insuredName">
          <el-input v-model="listQuery.insuredName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="被保人手机号：" prop="insuredPhone">
          <el-input v-model="listQuery.insuredPhone" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="orderStatusList"
              v-for="(val,key) in orderStatusList"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="保单状态：" class="query-select" prop="policyStatus">
          <el-select v-model="listQuery.policyStatus" style="width:150px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="policyStatusList"
              v-for="(val,key) in policyStatusList"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票状态：" class="query-select" prop="invoiceStatus">
          <el-select v-model="listQuery.invoiceStatus" style="width:150px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="invoiceStatusList"
              v-for="(val,key) in invoiceStatusList"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button
            @click="resetForm('listQueryForm')"
            size="mini"
            type="primary"
            icon="el-icon-refresh"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title_wrap">
      <div>分期申请补充</div>
      <div>
      <el-button  size="medium" @click="repulseBtn">打回</el-button>
      <el-button type="primary" size="medium" @click="pushBtn">推送给资金方</el-button>
      </div>
    </div>

    <el-table
      :data="listData"
      @current-change="handleSelectionChange"
      @selection-change="selectionData"
      highlight-current-row max-height='600'
    >
      <el-table-column type="selection" width="55" :selectable="handleDisable"></el-table-column>
      <el-table-column prop="orderNo" label="业务单号" align="center"></el-table-column>
      <el-table-column prop="capitalId" label="资方业务单号" align="center"></el-table-column>
      <el-table-column prop="capitalName" label="资方名称" align="center"></el-table-column>

      <el-table-column label="车牌号" width="100" prop="licenseNo" align="center"></el-table-column>
      <el-table-column label="VIN码" prop="frameNo"  align="center"></el-table-column>

      <el-table-column prop="insuredName"  label="被保人" align="center"></el-table-column>

      <el-table-column prop="insuredPhone" label="被保人手机号" align="center"></el-table-column>

      <el-table-column prop="installmentAmount"  label="分期总额" align="center"></el-table-column>

      <el-table-column prop="partnerName"  label="投保企业名称" align="center"></el-table-column>

      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

      <el-table-column prop="status" label="订单状态"></el-table-column>
      <el-table-column label="操作" width="300">
        <div
          slot-scope="scope"
          style=" display: flex;
          align-items: center;
          justify-content: left;"
        >
          <router-link
            :to="'supplierDetail/' + scope.row.id+'/'+scope.row.orderNo"
            class="router-link"
          >查看</router-link>

          <el-button
            type="text"
            style='color:#ff0000'
            v-if="scope.row.status=='待首付'"
            @click="downPaymentDialog=true"
            class="router-link2"
          >首付链接</el-button>

          <router-link
            v-if="scope.row.status=='待补充' || scope.row.status=='已打回'"
            :to="'supplementaryInformation/' + scope.row.id"
            class="router-link2"
             style='color:#ff0000'
          >补充数据</router-link>

          <el-button
            type="text"
           style='color:#ff0000'
            v-if="scope.row.status=='正常' &&  scope.row.policyStatus=='0'"
            @click="()=>{policyDialog=true;id = scope.row.id}"
            class="router-link2"
          >电子保单</el-button>

          <el-button
            type="text"
            style='color:#ff0000'
            v-if="scope.row.status=='正常' && scope.row.invoiceStatus=='0' "
            @click="()=>{insuranceDialog=true; id = scope.row.id}"
            class="router-link2"
          >电子发票</el-button>

          <el-button
            type="text"
            style='color:#ff0000'
            v-if=" scope.row.status=='正常' &&  scope.row.policyStatus=='3'"
            class="router-link2"
            @click="()=>{policyDialog=true;id = scope.row.id}"
          >电子保单（打回）</el-button>

          <el-button
            type="text"
            style='color:#ff0000'
            v-if="scope.row.status=='正常' && scope.row.invoiceStatus=='3'"
            @click="()=>{insuranceDialog=true; id = scope.row.id}"
            class="router-link2"
          >电子发票（打回）</el-button>
        </div>
      </el-table-column>
    </el-table>
    <div class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>

    <!-- 首付'二维码 弹窗 -->
    <el-dialog
      title="'首付'二维码"
      :visible.sync="downPaymentDialog"
      width="30%"
      :before-close="()=>{this.downPaymentDialog=false}"
    >
      <div style="padding:40px; height:300px; width:300px; margin:0 auto">
        <img src="../../assets/logo.png" width="100%" height="100%" />
      </div>
    </el-dialog>

    <!-- 电子保单 弹窗 -->
    <el-dialog
      title="提交保单资料"
      :visible.sync="policyDialog"
      width="650px"
      :before-close="closeTheOrder"
    >
      <el-form ref="form" :model="policy" label-width="180px" size="medium" :rules="rules">
        <el-form-item label="保单类型：" prop="policyRadio">
          <el-radio-group v-model="policy.radio">
            <el-radio :label="1">电子版</el-radio>
            <el-radio :label="2">纸质版</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商业险电子保单：" prop="aa">
          <el-upload
            class="avatar-uploader"
            :http-request="handleAvatarSuccess"
            action="/admin/apply_supplement/upload_insurance_policy"
            :show-file-list="false"
          >
            <img v-if="policy.imageUrl" :src="policy.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商业险保单号：" prop="ornder">
          <el-col :span="15">
            <el-input v-model="policy.ornder"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="保单生效日：">
          <el-col :span="15">
            <el-input v-model="policy.validPeriod"></el-input>
          </el-col>
          <el-col :span="10">日期格式：0000-00-00</el-col>
        </el-form-item>
        <el-form-item label="保单到期日：">
          <el-col :span="15">
            <el-input v-model="policy.expire"></el-input>
          </el-col>
          <el-col :span="10">日期格式：0000-00-00</el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="policyDialogSave" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 电子发票 弹窗 -->
    <el-dialog
      title="提交发票资料"
      :visible.sync="insuranceDialog"
      width="650px"
      :before-close="closeTheInvoice"
    >
      <el-form ref="form" :model="insurance" label-width="180px" size="medium" :rules="rules2">
        <el-form-item label="发票类型：" prop="insuranceRadio">
          <el-radio-group v-model="insurance.radio">
            <el-radio :label="1">电子版</el-radio>
            <el-radio :label="2">纸质版</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电子发票：" prop="aa">
          <el-upload
            class="avatar-uploader"
            action="/admin/apply_supplement/upload_invoice"
            :http-request="insuranceSuccess"
            :show-file-list="false"
          >
            <img v-if="insurance.insuranceImg" :src="insurance.insuranceImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="发票号码：" prop="ornder">
          <el-col :span="15">
            <el-input v-model="insurance.ornder"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="发票代码：">
          <el-col :span="15">
            <el-input v-model="insurance.validPeriod"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开票日期：">
          <el-col :span="8">
            <el-input v-model="insurance.expire"></el-input>
          </el-col>
          <el-col :span="18">日期格式: xxxx-xx-xx或xxxx年xx月xx日</el-col>
        </el-form-item>
        <el-form-item label="开票金额（不含税）：">
          <el-col :span="15">
            <el-input v-model="insurance.invoiceValue"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="insuranceDialogSave" size="small">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  handleSelectionChange,
  handleSizeChange,
  handleCurrentPage
} from "@/utils/common";
import networkRequest from "@/api/supplierManage/supplierRegister";
import { Format } from "@/utils/index";
const axiosRequest = require("axios");
export default {
  name: "SupplierRegister",
  filters: {
    filterStatus: function(value) {
      if (value === "PASS") {
        return "suc";
      } else if (value === "REJECT") {
        return "fail";
      }
    }
  },
  data() {
    return {
      orderStatusList: "", //订单状态下拉
      policyStatusList: "", //保单状态下拉
      invoiceStatusList: "", //发票状态下拉
      listData: [],
      total: 0, // 表格数据总条数
      // 查询参数
      listQuery: {
        page: 1, //当前页数
        limit: 30, //条数
        agentId: "", //业务员编号
        orderNo: "", //业务订单号
        licenseNo: "", //车牌号
        frameNo: "", //vin码
        insuredName: "", //被保人名称
        insuredPhone: "", //被保人手机号
        status: "", //订单状态   00-待补充,01-待审核,02-审核失败,03-待首付,04-首付成功,05-正常,06-取消订单,07-待退保,08-退保中,09-退保异常,10-退保完结,11-已过期,12-预收款成功,13-数据异常待退款,14-待资方审核
        policyStatus: "", //保单状态:0, 待上传,1, 待审核,2, 审核通过,3, 审核不通过,4, 超时
        invoiceStatus: "" //发票状态:0, 待上传,1, 待审核,2, 审核通过,3, 审核不通过,4, 超时
      },
      downPaymentDialog: false, //首付二维码弹窗
      policyDialog: false, //电子保单弹窗
      insuranceDialog: false, //电子发票弹窗
      id: "", //融资id
      //保单校验
      rules: {
        policyRadio: [
          { required: true, message: "请选择保单类型", trigger: "blur" }
        ],
        aa: [{ required: true, message: "请上传电子保单", trigger: "blur" }],
        ornder: [{ required: true, message: "请输入保单号", trigger: "blur" }]
      },
      //发票校验
      rules2: {
        insuranceRadio: [
          { required: true, message: "请选择发票类型", trigger: "blur" }
        ],
        aa: [{ required: true, message: "请上传电子发票", trigger: "blur" }],
        ornder: [{ required: true, message: "请输入发票号码", trigger: "blur" }]
      },

      policy: {
        //保单
        radio: "",
        ornder: "",
        validPeriod: "",
        expire: "",
        imageUrl: "" //保单图片
      },
      insurance: {
        //发票
        radio: "",
        ornder: "",
        validPeriod: "",
        expire: "",
        insuranceImg: "", //发票图片
        invoiceValue: ""
      },

      pushData: [], //推送资方端的数据

      shipDate: [], // 时间范围
      yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
      handleSelectionChange: handleSelectionChange.bind(this),
      handleSizeChange: handleSizeChange.bind(this),
      handleCurrentPage: handleCurrentPage.bind(this)
    };
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ])
  },
  watch: {
    $route(to, from) {
      if (to.path == "/supplierManage/supplierRegister") {
        this.getList();
      }
    }
  },
  beforeCreate() {},
  created() {
    this.getStateList();
    this.getList();
  },
  mounted() {},
  methods: {
    // 获取所有的下拉状态
    getStateList() {
      //订单状态下拉
      networkRequest.orderStatus().then(res => {
        if (res.data.code == "200") {
          this.orderStatusList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
      //保单状态下拉
      networkRequest.policyStatus().then(res => {
        if (res.data.code == "200") {
          this.policyStatusList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
      //发票状态下拉
      networkRequest.invoiceStatus().then(res => {
        if (res.data.code == "200") {
          this.invoiceStatusList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取数据列表
    getList() {
      networkRequest.getListData(this.listQuery).then(res => {
        if (res.data.code === "200") {
          let mapData = JSON.parse(JSON.stringify(res.data.data.list)); //深拷贝
          // let mapData = JSON.parse(JSON.stringify(this.listData2)); //深拷贝

          for (let i in mapData) {
            if (mapData[i].status == "WAIT_SUPPLEMENT") {
              mapData[i].status = "待补充";
            } else if (mapData[i].status == "WAIT_AUDIT") {
              mapData[i].status = "待审核";
            } else if (mapData[i].status == "AUDIT_FAIL") {
              mapData[i].status = "审核失败";
            } else if (mapData[i].status == "WAIT_PAYMENT") {
              mapData[i].status = "待首付";
            } else if (mapData[i].status == "PAYMENT_SUCCESS") {
              mapData[i].status = "首付成功";
            } else if (mapData[i].status == "NORMAL") {
              mapData[i].status = "正常";
            } else if (mapData[i].status == "CANCEL_ORDER") {
              mapData[i].status = "取消订单";
            } else if (mapData[i].status == "WAIT_SURRENDER") {
              mapData[i].status = "待退保";
            } else if (mapData[i].status == "SURRENDER") {
              mapData[i].status = "退保中";
            } else if (mapData[i].status == "SURRENDER_ERROR") {
              mapData[i].status = "退保异常";
            } else if (mapData[i].status == "SURRENDER_END") {
              mapData[i].status = "退保完结";
            } else if (mapData[i].status == "EXPIRED") {
              mapData[i].status = "已过期";
            } else if (mapData[i].status == "ADVANCE_PAYMENTS") {
              mapData[i].status = "预收款成功";
            } else if (mapData[i].status == "WAIT_REFUND") {
              mapData[i].status = "数据异常待退款";
            } else if (mapData[i].status == "WAIT_CAPITAL_AUDIT") {
              mapData[i].status = "待资方审核";
            } else if (mapData[i].status == "HAS_REPULSE") {
              mapData[i].status = "已打回";
            }
          }
          this.listData = mapData;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    search() {
      let that = this;
      that.getList();
    }, //查询
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.shipDate = [];
    }, //重置表单

    //保单上传成功
    handleAvatarSuccess(value) {
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
              this.policy.imageUrl = res.data.data.imageUrl;
            } else {
              this.$message.error("上传失败,请重新上传");
            }
          });
        };
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //保单保存
    policyDialogSave() {
      let { policy } = this;

      if (!policy.radio) {
        this.$message.error("请选择保单类型");
        return;
      }
      if (!policy.ornder) {
        this.$message.error("请输入商业险保单号");
        return;
      }
      if (!policy.imageUrl) {
        this.$message.error("请上传保单图片");
        return;
      }
      let data = {
        financeOrderId: this.id,
        policyType: policy.radio,
        policyNo: policy.ornder,
        policyUrl: policy.imageUrl,
        effectiveDate: policy.validPeriod,
        expireDate: policy.expire
      };
      networkRequest.insertPolicyInfo(data).then(res => {
        this.policyDialog = false;
        if (res.data.code == "200") {
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //关闭保单
    closeTheOrder() {
    
      this.policyDialog = false;
      this.id = "";
      this.policy = {
        //保单
        radio: "",
        ornder: "",
        validPeriod: "",
        expire: "",
        imageUrl: "" //保单图片
      };
    },

    //发票上传成功
    insuranceSuccess(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        networkRequest
          .compressImage(url, {
            width: 480, // 压缩后图片的宽
            height: 360, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.5)"
            });
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "发票"
            };
            //上传发票ocr识别
            axiosRequest({
              url: "" + "/admin/apply_supplement/upload_invoice",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                this.insurance.insuranceImg = res.data.data.imageUrl;
                this.insurance.ornder = res.data.data.invoiceNum;
                this.insurance.validPeriod = res.data.data.invoiceCode;
                this.insurance.expire =  res.data.data.invoiceDate;
                this.insurance.invoiceValue = res.data.data.totalAmount;
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //发票保存
    insuranceDialogSave() {
      let { insurance } = this;
      if (!insurance.radio) {
        this.$message.error("请选择发票类型");
        return;
      }
      if (!insurance.insuranceImg) {
        this.$message.error("请上传发票图片");
        return;
      }
      if (!insurance.ornder) {
        this.$message.error("请输入发票号码");
        return;
      }
      let time ='';
      if(insurance.expire){
        let a = insurance.expire.charAt(4);
        let b = insurance.expire.charAt(7);
        let c = insurance.expire.charAt(10);
       if(a=='年' && b=='月'&&c=='日'){
          time = insurance.expire.slice(0,4)+'-'+insurance.expire.slice(5,7)+'-'+insurance.expire.slice(8,10);
       
        }else{
          time = insurance.expire
        }
      }
      let data = {
        financeOrderId: this.id,
        invoiceType: insurance.radio,
        invoiceUrl: insurance.insuranceImg,
        invoiceNo: insurance.ornder,
        invoiceCode: insurance.validPeriod,
        openDate: time,
        openAmount: insurance.invoiceValue
      };
      networkRequest.insertInvoiceInfo(data).then(res => {
        this.insuranceDialog = false;
        if (res.data.code == "200") {
          this.$message.success('保存成功');
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
        //关闭发票
    closeTheInvoice() {
      this.insuranceDialog = false;
      this.id = "";
      this.insurance = {
        //发票
        radio: "",
        ornder: "",
        validPeriod: "",
        expire: "",
        insuranceImg: "", //发票图片
        invoiceValue: ""
      };
    },

    //是否可以选择推送资方端
    handleDisable(row, index) {
      if (row.status == "待审核") {
        return true;
      } else {
        return false;
      }
    },
    //选择推送的数据
    selectionData(value) {
      this.pushData = value;
    },

    ////推送资金方按钮
    pushBtn() {
      if (this.pushData.length > 0) {
        this.$confirm(
          "此操作会将选中订单数据推送给资金方审核，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.loading = this.$loading({
              lock: true,
              text: "推送中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let arr = [];
            for (let i = 0; i < this.pushData.length; i++) {
              arr.push(this.pushData[i].id);
            }
            let data = {
              financeOrderIds: JSON.stringify(arr)
            };
            axiosRequest({
              url: "" + "/admin/business_acceptance/submit_audit",
              method: "post",
              data
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("推送成功");
                this.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消推送"
            });
          });
      } else {
        this.$message.error("请选择推送数据");
      }
    },

    //打回数据按钮
    repulseBtn(){
     if (this.pushData.length > 0) {
        this.$confirm(
          "此操作会将选中订单数据打回到代理商端，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.loading = this.$loading({
              lock: true,
              text: "打回中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let arr = [];
            for (let i = 0; i < this.pushData.length; i++) {
              arr.push(this.pushData[i].id);
            }
            let data = {
              financeOrderIds: JSON.stringify(arr)
            };
            axiosRequest({
              url: "" + "/admin/business_acceptance/repulse_order",
              method: "post",
              data
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("打回成功");
                this.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.$message.error("请选择打回数据");
      }
    }
  
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
.router-link {
  display: block;
  margin: 1px 12px 0 0;
  color: #409eff;
}
.router-link2 {
  display: block;
  color: #ff0000;
}
.title_wrap {
  padding: 40px 20px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.avatar {
  width: 100%;
  height: 100%;
}
</style>


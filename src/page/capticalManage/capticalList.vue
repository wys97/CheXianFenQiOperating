<template>
  <div class="page-container" ref="page-container" id="page-container">
    <!---还款列表--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="资方编号：" prop="capitalId">
          <el-input v-model="listQuery.capitalId" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="资方简称：" prop="capitalShortName">
          <el-input v-model="listQuery.capitalShortName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="资方类型：" prop="capitalType" class="query-select">
          <el-select v-model="listQuery.capitalType" style="width:150px;">
            <el-option label="全部" value></el-option>
            <el-option v-for="(val,key) in ompanyTypeData" :label="val" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="status" class="query-select">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(val,key) in capitalStatusListData"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="mini" type="primary">
            <i class="iconfont icon-search"></i>查询
          </el-button>
          <el-button @click="resetForm('listQueryForm')" size="mini" type="primary">
            <i class="iconfont icon-reset"></i>重置
          </el-button>
        </el-form-item>
      </el-form>

      <hr class="hr" />
      <div class="table_title_box">
        <span>资金方列表</span>
        <el-button @click="doAddCapital('capitalDetailForm')" type="primary" size="mini">新增</el-button>
      </div>
    </div>
    <el-table
      :data="list"
      @current-change="handleSelectionChange"
      highlight-current-row
      :max-height="tableMaxHeight"
    >
      <el-table-column prop="capitalId" label="资方编号" width="220">
        <template slot-scope="scope">
          <div>{{scope.row.capitalId}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="capitalShortName" label="资方简称" width="220">
        <template slot-scope="scope">
          <div>{{scope.row.capitalShortName}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="capitalTypeText" label="资方类型" width="220">
        <template slot-scope="scope">
          <div>{{scope.row.capitalTypeText}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="capitalName" label="资方信息" min-width="100">
        <template slot-scope="scope">
          <div>{{scope.row.capitalName}}</div>
          <div>{{scope.row.businessLicenseNo}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="creditLine" label="资方授信额度" min-width="100">
        <template slot-scope="scope">
          <div>{{scope.row.creditLine}}</div>
        </template>
      </el-table-column>

	   <el-table-column prop="loanAmount" label="放款金额" min-width="100">
        <template slot-scope="scope">
          <div>{{scope.row.loanAmount}}</div>
        </template>
      </el-table-column>	

      <el-table-column prop="cooperateDate" label="合作日期" min-width="80"></el-table-column>

      <el-table-column prop="status" label="状态" min-width="80">
        <template slot-scope="scope">
          <div :class="scope.row.status=='ENABLED'?'suc':'fail'">{{scope.row.statusText}}</div>
        </template>
      </el-table-column>

      <!--<el-table-column prop="financeDate" label="状态" min-width="80">
		</el-table-column>
		
		<el-table-column prop="backTime" label="最后一次还款时间" min-width="80">
		</el-table-column>
		
		<el-table-column prop="statusText" label="状态" min-width="80">
		</el-table-column>
		
		<el-table-column prop="isOverdue" label="是否逾期" min-width="80">
			<template slot-scope="scope">
				<div :class="scope.row.isOverdue=='Y'?'fail':scope.row.isOverdue=='N'?'suc':'suc'">{{scope.row.isOverdue=='Y'?'逾期':scope.row.isOverdue=='N'?'未逾期':''}}</div>
			</template>
      </el-table-column>-->

      <el-table-column prop="capitalId" label="操作" width="122" align="center">
        <template
          slot-scope="scope"
          v-if="!roleHasPermissions['capital_manager_capital_list_list']"
        >
          <router-link :to="'capticalDetail/' + scope.row.capitalId" class="router-link">查看</router-link>
        </template>
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
    <el-dialog title="资方基础信息" :visible.sync="dialogFormVisibleCapital">
      <el-form ref="capitalDetailForm" label-width="190px" size="mini" label-position="right">
        <div class="info-list">
          <el-form-item label="资方编号：">
            <span>(自动生成)</span>
          </el-form-item>
          <el-form-item label="资方简称：">
            <el-input v-model="capitalAddForm.capitalShortName" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="资方类型：">
            <template slot-scope="scope">
              <!--<span v-if="readOnly" class="input_read">{{capitalAddForm.capitalTypeText}}</span>-->
              <el-select v-model="capitalAddForm.capitalType" placeholder="请选择">
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
            <el-input v-model="capitalAddForm.capitalName" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码：">
            <el-input v-model="capitalAddForm.businessLicenseNo" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="合作日期：">
            <el-date-picker v-model="capitalAddForm.cooperateDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="资方授信额度：">
            <el-input v-model="capitalAddForm.creditLine" style="width: 300px;">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="经办人姓名：">
            <el-input v-model="capitalAddForm.repreName" style="width: 300px;"></el-input>
          </el-form-item>

          <el-form-item label="经办人身份证：">
            <el-input v-model="capitalAddForm.repreIdcardNo" style="width: 300px;"></el-input>
          </el-form-item>

          <el-form-item label="经办人手机号：">
            <el-input v-model="capitalAddForm.repreMobile" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <template>
              <!--<span v-if="readOnly" class="input_read">{{guarantorDetailData.genderText}}</span>-->
              <el-radio-group v-model="capitalAddForm.status">
                <el-radio label="ENABLED">启用</el-radio>
                <el-radio label="DISABLED">停用</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" :rows="4" v-model="capitalAddForm.remark"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCapital = false">取 消</el-button>
        <el-button type="primary" @click="saveCapitalDetail">保 存</el-button>
      </div>
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
import { Format } from "@/utils/index";
import {
  getListData,
  capitalStatusList,
  capitalType,
  capitalSave,
  ompanyType
} from "@/api/capticalManage/capticalList";
import baseUtil from "@/utils/baseUtil";

export default {
  name: "CapicalList",
  data() {
    return {
      list: [], // 表格数据
      total: 0, // 表格数据总条数
      searchTime: "", //查询选择的时间
      capitalStatusListData: "", //资方状态下拉列表
      ompanyTypeData: "", //公司类型下拉
      listQuery: {
        // 查询参数
        page: 1,
        limit: 30,
        capitalId: "", // 资金方名称
        capitalShortName: "", // 联系人
        capitalName: "", // 联系人手机号码
        status: "", // 资金方状态英文COOPERATING:合作中STOPPED:已停止
        capitalTypeText: ""
      },
      capitalTypeList: "", //资方类型下拉
      capitalAddForm: {
        //资方表单数据
        capitalId: "",
        capitalShortName: "",
        capitalType: "",
        capitalName: "",
        capitalTypeText: "",
        creditLine: "",
        businessLicenseNo: "",
        cooperateDate: "",
        status: "",
        remark: ""
      },
      dialogFormVisibleCapital: false, //资金方新增dialog
      yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
      selectedData: "", // 选中某一行的数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      handleSelectionChange: handleSelectionChange.bind(this),
      handleSizeChange: handleSizeChange.bind(this),
      handleCurrentPage: handleCurrentPage.bind(this),
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  watch: {
    //监听路由切换回调
    $route: "fetchdata"
    //	  	searchTime (val,oldVal){
    //	  		this.listQuery.financeDateStart  = Format(val[0], 'yyyy-MM-dd');
    //	  		this.listQuery.financeDateEnd = Format(val[1], 'yyyy-MM-dd');
    //	  	}
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ])
  },
  created() {
    this.getList();
    this.getCapitalStatusList(); //获取资方状态下拉
    this.getOmpanyType(); //获取公司类型下拉
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("SetTableMaxHeight");
    }, 500);
  },
  methods: {
    fetchdata() {
      //切换路由do
    },
    getCapitalTypeList() {
      //资方类型下拉
      capitalType().then(res => {
        if (res.data.code === "200") {
          this.capitalTypeList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    doAddCapital(formName) {
      //点击新增资金方
      this.getCapitalTypeList(); //资方类型下拉
      this.capitalAddForm = {
        capitalId: "",
        capitalShortName: "",
        capitalType: "",
        capitalName: "",
        creditLine: "",
        businessLicenseNo: "",
        cooperateDate: "",
        status: "",
        remark: ""
      };
      this.dialogFormVisibleCapital = true;
    },
    saveCapitalDetail() {
      //保存资金方信息
      let data = baseUtil.copy(this.capitalAddForm);
      if (typeof data.cooperateDate === "object" && data.cooperateDate) {
        data.cooperateDate = Format(data.cooperateDate, "yyyy-MM-dd");
      }
      capitalSave(data)
        .then(res => {
          if (res.data.code === "200") {
            //						this.getList();//资金方信息---------查询
            this.$router.push({
              path: "/capticalManage/capticalDetail/" + res.data.data.capitalId
            });
            this.dialogFormVisibleCapital = false;
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getList() {
      getListData(this.listQuery).then(res => {
        if (res.data.code === "200") {
          const listData = res.data.data.list;
          this.total = res.data.data.total;
          this.list = listData;
        } else {
          this.$message.error(res.data.message);
        }
     
      });
    },
    getCapitalStatusList() {
      //获取资方状态下拉
      capitalStatusList().then(res => {
        if (res.data.code === "200") {
          this.capitalStatusListData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      
      });
    },
    getOmpanyType() {
      //获取公司类型下拉
      ompanyType().then(res => {
        if (res.data.code === "200") {
          this.ompanyTypeData = res.data.data;
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
    } //重置表单
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.total-container {
  > span {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #ccc;
  }
}
/* 调整弹窗的最大高度 */
.page-container {
  .el-dialog {
    max-height: 630px;
  }
}
</style>

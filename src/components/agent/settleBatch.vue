<template>
  <div>
    <el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
      <div class="info-list">
        <p style="line-height: 40px;">
          <span v-if="!addGuarantor">修改结算信息</span>
          <span v-if="addGuarantor">新增结算信息</span>
        </p>
        <el-form-item label="代理商：">
          <span v-if="addGuarantor" class="input_read">{{this.agentGetagentId}}  {{this.agentGetagentName}}</span>
          <span v-if="!addGuarantor" class="input_read">{{this.settleBatchData.agentId}}  {{this.settleBatchData.agentName}}</span>
        </el-form-item>
        <el-form-item label="结算批次：">
          <span v-if="readOnly" class="input_read">{{settleBatchData.settleBatchId}}</span>
          <el-input v-else v-model="settleBatchData.settleBatchId" class="must_input" style="width: 300px;">
          </el-input>
        </el-form-item>
        <el-form-item label="账户名称：">
          <template>
            <span v-if="readOnly" class="input_read">{{settleBatchData.accountName}}</span>
            <el-input class="must_input" v-else v-model="settleBatchData.accountName" style="width: 300px;">
            </el-input>
          </template>
        </el-form-item>
        <el-form-item label="账户号码：">
          <span v-if="readOnly" class="input_read">{{settleBatchData.accountNum}}</span>
          <el-input class="must_input" v-else v-model="settleBatchData.accountNum" style="width: 300px;">
          </el-input>
        </el-form-item>
        <el-form-item label="结算金额：">
          <span v-if="readOnly" class="input_read">{{settleBatchData.settleAmount}}</span>
          <el-input v-else v-model="settleBatchData.settleAmount" style="width: 300px;">
          </el-input>
          元
        </el-form-item>
        <el-form-item label="结算日期：">
          <span v-if="readOnly" class="input_read">{{settleBatchData.settleDate}}</span>
          <el-date-picker v-else v-model="settleBatchData.settleDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态：">
          <template>
            <span v-if="readOnly" class="input_read">{{settleBatchData.settleStatus}}</span>
            <el-radio-group v-else v-model="settleBatchData.settleStatus">
              <el-radio label="WAIT">待结算</el-radio>
              <el-radio label="DONE">已结算</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="操作id：" style="display:none;">
          <!-- <span  class="input_read">{{this.agentId}}  {{this.agentGetagentName}}</span> -->
          <el-input v-model="operateId" style="width: 300px; display:none;">
          </el-input>
        </el-form-item>

        <div v-if="!readOnly" style="text-align: right;">
          <el-button @click="doSaveSettle" type="primary">保存</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
  import agentDetail from '@/api/agentManage/agentDetail'
  import baseUtil from '@/utils/baseUtil'

  export default {
    name: 'settleBatch',
    data() {
      return {
        agentGetagentId: '',     //代理商编号
        agentGetagentName: '',     //代理商名称
        settleBatchData: {
          operateId: '',
          agentId: '',
          agentName: '',
          settleBatchId: '',
          accountName: '',
          accountNum: '',
          settleAmount: '',
          settleDate: '',
          settleStatus: '',
          settleStatusText: ''
        },
      }
    },
    props: {
      operateId: {
        type: String,
        default: ''
      },
      agentId: {
        type: String,
        default: ''
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      addGuarantor: {
        type: Boolean,
        default: false
      },

    },
    watch: {
      //监听路由切换回调
      '$route': 'fetchdata',
      settleBatchData: function (val, oldVal) {
        this.settleBatchData = val;
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      this.settleBatchData.agentId = this.agentId
      this.settleBatchData.operateId = this.operateId
      this.init();
    },
    methods: {
      init() {
        if (!this.addGuarantor) {
          //获取结算信息详情数据 - 修改
          this.getAgentSettleDetail()
        } else {
          //获取代理商编号和名称 - 新增
          this.getAgentGetAgentInfo()
        }
      },

      getAgentSettleDetail() {
        agentDetail.agentSettleDetail(this.operateId).then(res => {
          if (res.data.code === '200') {
            this.settleBatchData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
        })
      },

      //代理商结算信息保存
      doSaveSettle() {
        if (this.addGuarantor) {//新增
          this.changeDate()
          let data = baseUtil.copy(this.settleBatchData)
          agentDetail.agentSettleAdd(data).then(res => {
            if (res.data.code === '200') {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(() => {
          })
        } else {//修改
          let data = baseUtil.copy(this.settleBatchData)
          data.id = this.operateId
          agentDetail.agentSettleUpdate(data).then(res => {
            if (res.data.code === '200') {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(() => {
          })
        }

      },

      //获取代理商编号和名称
      getAgentGetAgentInfo() {
        agentDetail.agentGetAgentInfo(this.agentId).then(res => {
          if (res.data.code === '200') {
            this.agentGetagentId = res.data.data.agentId
            this.agentGetagentName = res.data.data.agentName
          } else {
            this.$message.error(res.data.message)
          }
        })
      },

      //日期格式处理
      changeDate() {
        let nowDate = this.settleBatchData.settleDate
        // console.log(nowDate)
        let newYear = nowDate.getMonth() + 1
        let newDate = nowDate.getDate()
        if (newYear < 10) {
          newYear = '0' + newYear
        }
        if (newDate < 10) {
          newDate = '0' + newDate
        }
        let myDate = nowDate.getFullYear() + '-' + newYear + '-' + newDate

        this.settleBatchData.settleDate = myDate
      },

    }
  }
</script>

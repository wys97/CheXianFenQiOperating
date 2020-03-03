<template>
  <div class="container">
    <div v-if="isLookImg" ref="lookImgBox" @click="clearImg" class="look_img_box">
      <div ref="rotateImg" class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}">
      </div>
      <div class="rotateBtnRow">
        <div @click.stop="rotateImg('left')" class="rotateBtn">
          <i class="iconfont icon-rotate-left"></i>
        </div>
        <div @click.stop="rotateImg('right')" class="rotateBtn">
          <i class="iconfont icon-rotate-right"></i>
        </div>
      </div>
    </div>
    <div class="top">
      <ul class="flex-item">
        <li>{{checkHeadData.enterpriseName}}</li>
        <li>{{checkHeadData.comment}}</li>
      </ul>
      <div class="flex-item" style="text-align: right;padding-top: 0;">
        <span v-if="checkHeadData.approveRemark">原因：{{checkHeadData.remark}}</span>
        <el-button
          :type="checkHeadData.status=='PASS'?'success':
	      		checkHeadData.status=='REJECT'?'danger':
	      		checkHeadData.status=='INIT'?'warning':'info'" size="mini">
          {{checkHeadData.statusText}}
        </el-button>
      </div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane class="tab_content" label="授信报告" name="first">
            <div class="tab-content">
              <el-form label-width="170px" size="mini" label-position="right">
                <div class="lh_title">企业基本信息</div>
                <div class="info-list">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="企业名称：">
                        <span class="input_read">{{compBasicInfo.enterpriseName}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="社会统一信用代码：">
                        <span class="input_read">{{compBasicInfo.businessLicenseNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="客户类型：">
                        <span class="input_read">{{compBasicInfo.customerTypeText}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="法定代表人姓名 ：">
                        <span class="input_read">{{compBasicInfo.repreName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="法定代表人身份证：">
                        <span class="input_read">{{compBasicInfo.repreIdcardNo}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="实际控制人姓名  ：">
                        <span class="input_read">{{compBasicInfo.controllerName}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="实际控制人身份证：">
                        <span class="input_read">{{compBasicInfo.controllerIdcardNo}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="系统评级：">
                        <span class="input_read">{{compBasicInfo.grade}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="建议授信  ：">
                        <span class="input_read">{{compBasicInfo.creditLine}}万</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="授信期限：">
                        <span class="input_read">{{compBasicInfo.creditLineMonth}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
              <template>
                <Verify :api-url="'creditDetail'" :supplier-capital-id="supplierCapitalId">
                </Verify>
              </template>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>操作</div>
          </li>
          <li>
            <div class="fk_btn_box">
              <a :href="'/admin/creditline_report_zl/export?supplierCapitalId='+supplierCapitalId" target="_blank">
                <el-button type="primary" size="mini">导出</el-button>
              </a>
            </div>
          </li>
          <li v-if="checkHeadData.status==='PENDING'||checkHeadData.status==='RETURNED'">
            <div class="fk_btn_box">
              <el-button @click="doPass" v-if="!roleHasPermissions['finance_manage_register_list_audit']"
                         type="success">初审通过
              </el-button>
            </div>
          </li>
          <li v-if="checkHeadData.status==='PENDING'||checkHeadData.status==='RETURNED'">
            <div class="fk_btn_box">
              <el-button @click="doReject " v-if="!roleHasPermissions['finance_manage_register_list_audit']"
                         type="danger">初审拒绝
              </el-button>
            </div>
          </li>
          <li v-if="checkHeadData.status==='PENDING'||checkHeadData.status==='RETURNED'">
            <div class="fk_btn_box">
              <el-button @click="doRepulse" v-if="!roleHasPermissions['finance_manage_register_list_audit']">打回
              </el-button>
            </div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    <!--拒绝Dialog-->
    <el-dialog title="请填写拒绝原因：" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="remark"></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal()">提 交</el-button>
      </div>
    </el-dialog>
    <!--打回Dialog-->
    <el-dialog title="请填写打回原因：" :visible.sync="repulseDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="pulseRemark"></el-input>
      </div>
      <div slot="footer">
        <el-button @click="repulseDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="repulseApproveFinal()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Upload from '@/components/Upload/Upload'
  import Check from '@/components/approve/check'
  import Scorecard from '@/components/approve/scorecard'
  import Verify from '@/components/creditReport/verify'
  import defaultImg from '@/assets/imgs/default.jpg'
  import {comboboxBankList} from '@/api/common'
  import creditDetail from '@/api/creditReportManage/chinaTravelBankDetail'
  import {validContent} from '@/utils/validate'
  import {Format, delcommafy} from '@/utils/index'
  import baseUtil from '@/utils/baseUtil'

  export default {
    name: 'creditDetail',
    components: {Upload, Check, Scorecard, Verify},
    data() {
      return {
        supplierCapitalId: '', // supplierCapitalId
        activeName2: 'first',//
        creditDetail: creditDetail,
        compBasicInfo: {
          enterpriseName: '',
          businessLicenseNo: '',
          enterpriseName: '',
          businessLicenseNo: '',
          customerType: '',
          customerTypeText: '',
          repreName: '',
          repreIdcardNo: '',
          controllerName: '',
          controllerIdcardNo: '',
          grade: '',
          creditLine: '',
          creditLineMonth: ''
        },
        checkHeadData: {
          enterpriseName: '',
          comment: '',
          status: '',
          statusText: '',
          approveRemark: ''
        },//头部数据
//	        scorecardData:'',//评分卡数据
        scorecardShow: false,//评分卡show
        checkData: '',//初审授信结论数据
        rejectDialogShow: false, // 拒绝弹窗控制
        remark: '', // 拒绝原因
        repulseDialogShow: false, // 打回弹窗控制
        pulseRemark: '', // 打回原因
        uploadFileData: {
          financeNo: '',
          isImage: false
        },
        uploadImgData: {
          financeNo: '',
          isImage: true
        },
        isLookImg: false,
        lookImgSrc: '',
        deg: 0,//图片旋转的角度
        previewUrl: '',//应收账款转账确认书

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        ],
      }
    },
    watch: {
      //监听路由切换回调
      '$route': 'fetchdata'
    },
    computed: {
      statusActive() {
        const status = this.status;
        let num = 0
        if (status === 'TRANSFER_CONTRACT') {
          num = 0
        } else if (status === 'FINANCE_AUDIT_ING') {
          num = 1
        } else if (status === 'CAPTICAL_CONTRACT') {
          num = 2
        } else if (status === 'WAIT_LOAN') {
          num = 3
        } else if (status === 'SUCCESS') {
          num = 4
        }
        return num
      },
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created() {
      this.supplierCapitalId = this.$route.params.id
      this.uploadFileData.supplierCapitalId = this.financeNo
      this.uploadImgData.supplierCapitalId = this.financeNo
      this.init();
    },
    mounted() {

    },
    methods: {
      lookImg(imgSrc) {//查看图片
        this.deg = 0;
        var that = this;
        that.lookImgSrc = imgSrc;
        that.isLookImg = true;
      },
      clearImg() {//点击图片隐藏
        this.deg = 0;
        var that = this;
        that.isLookImg = false;
      },
      rotateImg(type) {//旋转图片
        let deg = this.deg;
        if (type === 'left') {
          this.deg -= 90;
        } else {
          this.deg += 90;
        }
        let _height = window.getComputedStyle(this.$refs.lookImgBox).height;
        let _width = window.getComputedStyle(this.$refs.lookImgBox).width;
        if (this.isNineTenMutiple(this.deg)) {
          this.$refs.rotateImg.style.width = _width;
          this.$refs.rotateImg.style.marginLeft = 'auto';
        } else {
          this.$refs.rotateImg.style.width = parseFloat(_height) - 30 + 'px';
          this.$refs.rotateImg.style.marginLeft = (parseFloat(_width) - parseFloat(_height)) / 2 + 'px';
        }
        this.$refs.rotateImg.style.transform = 'rotate(' + this.deg + 'deg)'
      },
      fetchdata() {
        this.financeNo = this.$route.params.id
        if (this.financeNo) {
        }
      },
      handleClick(tab) {
        if (tab.index === '0') {//尽调检查
          this.scorecardShow = false;
//  			this.verieyCheck();//尽调检查
        } else if (tab.index === '1') {//评级打分卡
          this.scorecardShow = true;
//  			this.getQueryScorecardQuery();//评级打分卡-查询
        } else if (tab.index === '2') {
          this.scorecardShow = false;
          this.getQuerySignConclusion();//授信结论-查询
        }
      },
      init() {
        this.getQueryCheckHead(); // 头部信息
        this.getBasicInfo(); // 获取企业基础信息
//	  		this.verieyCheck();//尽调检查
      }, // 初始化
      getQueryCheckHead() { // 头部信息
        creditDetail.checkHead(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.checkHeadData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
        })
      },
      getBasicInfo() {
        creditDetail.getCompBasicInfo(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.compBasicInfo = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
        })
      },
      getQuerySignConclusion() {//授信结论-查询
        creditDetail.signConclusion(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.checkData = res.data.data;
            if (!res.data.data.enterpriseStrength) {
              this.checkData.enterpriseStrength = {
                MarketAndSales: '', ProfitCondition: '', SameTradeCompare: ''
              }
            }
            this.getSignEnterpriseStrengthList();//企业实力和业绩单选数据
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
        })
      },
//    getQueryScorecardQuery(){//评级打分卡-查询
//    	creditDetail.scorecardQuery(this.supplierCapitalId).then(res => {
//        if (res.data.code === '200') {
//        	this.scorecardData  = res.data.data;
//        } else {
//          this.$message.error(res.data.message)
//        }
//      }).catch(() => {})
//    },
      getSignEnterpriseStrengthList() {//企业实力和业绩单选数据
        creditDetail.signEnterpriseStrength(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.signEnterpriseStrengthList = res.data.data;
//        	for(let i=0;i<this.signEnterpriseStrengthList.length;i++){
//        		this.enterpriseStrength[this.signEnterpriseStrengthList[i].title] = this.signEnterpriseStrengthList[i].titleText
//        	}
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
        })
      },
      doPass() {//通过
        this.$confirm('确认通过初审？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          creditDetail.checkPass(this.supplierCapitalId).then(res => {
            if (res.data.code === '200') {
              this.$message.success(res.data.message)
              this.getQueryCheckHead();//头部信息
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(() => {
          })
        }).catch(() => {
        })
      },
      approveFinal() {//拒绝提交
        let data = {
          supplierCapitalId: this.supplierCapitalId,
          remark: ''
        }
        if (!validContent(this.remark)) {
          this.$message.error('拒绝原因不能为空')
          return
        }
        data.remark = this.remark.trim()
        creditDetail.checkReject(data).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            this.rejectDialogShow = false
            this.getQueryCheckHead();//头部信息
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
        })
      }, // 入驻成功、入驻失败 提交
      doReject() {//点击拒绝
        this.remark = ''
        this.rejectDialogShow = true
      },
      repulseApproveFinal() {//打回提交
        let data = {
          supplierCapitalId: this.supplierCapitalId,
          remark: ''
        }
        if (!validContent(this.pulseRemark)) {
          this.$message.error('拒绝原因不能为空')
          return
        }
        data.remark = this.pulseRemark.trim()
        creditDetail.checkReturned(data).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            this.repulseDialogShow = false
            this.getQueryCheckHead();//头部信息
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
        })
      }, // 入驻成功、入驻失败 提交
      doRepulse() {//点击打回
        this.pulseRemark = ''
        this.repulseDialogShow = true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "chinaTravelBankDetail.scss";
</style>

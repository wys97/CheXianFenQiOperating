<template>
  <div class="container">
    <div class="top">
      <ul class="flex-item">
      	<li>{{supplierName}}，可融{{financeAmt}}元 </li>
      	<li>账款编号：{{receivableNo}}</li>
      	<li>最后更新时间：{{updateTime}}</li>
      </ul>
      <div class="flex-item">
      	<el-steps :active="1" v-if="(status === 'FINANCE_AUDIT_ING')"   :align-center=true>
	        <el-step :title="status === 'FINANCE_AUDIT_ING'?'融资中':'异常'">
	            <div slot="description" class="status">
	              <div class="tip" >
	              	<span style="background-color: transparent;border: 1px solid #409EFF; color: #409EFF;" >{{statusText}}</span>
	              </div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	        </el-step>
        </el-steps>
      	<el-steps :active="1" v-else-if="(status === 'FINANCE_AUDIT_PASS')" finish-status = "success"   :align-center=true>
	        <el-step :title="status === 'FINANCE_AUDIT_PASS'?'融资成功':'异常'">
	            <div slot="description" class="status">
	              <div class="tip" >
	              	<span style="background-color: transparent;border: 1px solid #67c23a; color: #67c23a;" >{{statusText}}</span>
	              </div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	        </el-step>
        </el-steps>
      	<el-steps :active="1" v-else-if="(status === 'OVERDUE')" finish-status = "error"   :align-center=true>
	        <el-step :title="status === 'OVERDUE'?'已过期':'异常'">
	            <div slot="description" class="status">
	              <div class="tip" >
	              	<span style="background-color: transparent;border: 1px solid #f56c6c; color: #f56c6c;" >{{statusText}}</span>
	              </div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	        </el-step>
        </el-steps>
        <el-steps v-else :active="statusActive" :process-status="status === 'AUDIT_PASS' ? 'finish':'process'"  :align-center=true>
          <el-step title="未形成">
            <div slot="description" class="status" v-if="status === 'INVALID'">
              <div class="tip" ><span>{{statusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step  :title="status === 'AUDIT_PASS'? '已达标': '异常'">
            <div slot="description" class="status" v-if="status === 'AUDIT_PASS'">
              <div class="tip" :class="status === 'AUDIT_PASS'?'tipSuc':''"><span>{{statusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <span slot="icon">●</span>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" >
          <el-tab-pane class="first_tab_content" label="详细信息" name="first">
            <div class="tab-content">
            	<p class="title">可融金额</p>	
            	<div class="info-list">
            		<div class="table_top" style="text-align: center;">
	                <el-row style="margin-bottom: 0;">
	              			<el-col :span="4" class="table_th">订单日期</el-col>
	              			<el-col :span="5" class="table_th">订单笔数（笔）</el-col>
	              			<el-col :span="5" class="table_th">订单总额（元）</el-col>
	              			<el-col :span="5" class="table_th">融资比例</el-col>
	              			<el-col :span="5" class="table_th">可融金额（元）</el-col>
	              	</el-row >
	              	<el-row style="margin-bottom: 0;">
	              			<el-col :span="4" class="table_td">{{billDetailData.registeTime?billDetailData.registeTime:'/'}}</el-col>
	              			<el-col :span="5" class="table_td">{{billDetailData.goodsNum?billDetailData.goodsNum:'/'}}</el-col>
	              			<el-col :span="5" class="table_td">{{billDetailData.shipAmt?billDetailData.shipAmt:'/'}}</el-col>
	              			<el-col :span="5" class="table_td">{{billDetailData.discountRate?billDetailData.discountRate:'/'}}</el-col>
	              			<el-col :span="5" class="table_td">{{billDetailData.financeAmt?billDetailData.financeAmt:'/'}}</el-col>
	              	</el-row >
              	</div>
              </div>
              <p class="title">剩余可融有效期与可融期限</p>	
            	<div class="info-list">
            		<div class="table_top" style="text-align: center;">
	                <el-row style="margin-bottom: 0;">
	              			<el-col :span="8" class="table_th">周转天数（天）</el-col>
	              			<el-col :span="8" class="table_th">回款日期</el-col>
	              			<el-col :span="8" class="table_th">剩余可融有效期（天）</el-col>
	              	</el-row >
	              	<el-row style="margin-bottom: 0;">
	              			<el-col :span="8" class="table_td">{{billDetailData.tunoverDays?billDetailData.tunoverDays:'/'}}</el-col>
	              			<el-col :span="8" class="table_td">{{billDetailData.returnDate?billDetailData.returnDate:'/'}}</el-col>
	              			<el-col :span="8" class="table_td">{{billDetailData.validDays?billDetailData.validDays:'/'}}</el-col>
	              	</el-row >
              	</div>
              </div>
            	<p class="title">订单信息</p>
            	<div class="info-list">
            		<div class="table_top" style="text-align: center;">
	                <el-row style="margin-bottom: 0;">
	              			<el-col :span="3" class="table_th">序号</el-col>
											<el-col :span="7" class="table_th">渠道</el-col>
	              			<el-col :span="7" class="table_th">订单编号</el-col>
	              			<el-col :span="7" class="table_th">订单金额（元）</el-col>
	              	</el-row >
	              	<div  v-for="(item,index) in billDetailData.details" >
	              	<el-row style="margin-bottom: 0;">
	              			<el-col :span="3" class="table_td" style="line-height: 40px;">{{index+1}}</el-col>
											<el-col :span="7" class="table_td" style="line-height: 40px;">{{item.channelName?item.channelName:'/'}}</el-col>
	              			<el-col :span="7" class="table_td" style="line-height: 40px;">{{item.no?item.no:'/'}}</el-col>
	              			<el-col :span="7" class="table_td" style="line-height: 40px;">{{item.amount?item.amount:'/'}}</el-col>
	              	</el-row >
	              	</div>
              	</div>
              </div>
          
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>操作</div>	
          </li>
          <!--<li v-if=" status == 'AUDIT_WAIT'" >
            <div>
            </div>
            <div>
              <el-button @click="doApproveFinal">不达标</el-button>
              <el-button  type="primary" @click="doPass">确认达标</el-button>
            </div>
          </li>-->
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    <!---入驻失败原因-->
    <el-dialog title="不达标原因" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="rejectRemark"></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal(false)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  import defaultImg from '@/assets/imgs/default.jpg'
  import { comboboxBankList } from '@/api/common'
  import accountDetail from '@/api/accountManage/accountDetail'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'
  export default {
    name: 'AccountDetail',
    components: { Upload },
    data () {
      return {
        receivableNo: '', // 商户id
        centreName:'', // 核心企业名称
        supplierName:'', //商户名称
        financeAmt:'', // 可融金额
        validDays:'', // 剩余可融有效期
        status:'', // 状态：INVALID-未形成 AUDIT_WAIT-待审核 AUDIT_REFUSE-不达标 AUDIT_PASS-已达标 OVERDUE-过期
        statusText:'',// 状态中文
        updateTime:'', // 最近更新时间
        billRelation:{}, // 单据关系
        
        arrivalOrder:{}, // 到货单
        invoiceOrders:[], // 发货单列表
        purchaseOrders:[], // 采购单列表
        purchaseOrdersNnm:[],// 所有发货单对应的 采购数
        billDetailData:{
        	
        },
      
     		activeName2: 'first',
     		
     		rejectDialogShow: false, // 不达标原因显示与隐藏dialog
        rejectRemark: '', // 不达标原因text
     		
     		bankSerialMatchDialogShow: false, // 银行流水显示与隐藏dialog
     		tradeMatchDialogShow:false,//贸易信息匹配显示与隐藏dialog
     		bankRlt:'',//银行流水匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
     		tradeRlt:'',//贸易信息匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
     		tradeUnMatch:'',//贸易信息异常条数
     		
     		
     		bankSerialMatchDetails:[{
     			strikeAmt:'平台数据',//支取金额
     			transferAmt:'银行流水',//收款金额
     			status:'匹配',//银行流水匹配结果：NORMAL-正常 ABNORMAL-异常
     			strikeAmtText:'平台数据',//支取金额
     			transferAmtText:'银行流水',//支取金额
     		},{
     			strikeAmt:'--',//支取金额
     			transferAmt:'--',//收款金额
     			status:'ABNORMAL',//银行流水匹配结果：NORMAL-正常 ABNORMAL-异常
     			strikeAmtText:'支取金额',//支取金额
     			transferAmtText:'收款金额',//支取金额
     		}],//银行流水匹配信息
     		tradeMatchDetails:{
     			receiveableNo:'',//应收账款编号
     			status:'',//贸易信息匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
     			riskNumber:'',//异常条数
     			arrivalOrgInspection:{
     				orgCode:'',//机构编码
     				matchCount:'',//历史出现次数
     				title:'',//到货机构名称
     				totalCount:'',//总次数
     				orgDesc:'',//机构名称
     				ratio:'',//占比
     			},//到货机构审查项
     			purchaseMakeOutInspections:[{
     				matchCount:'',//历史出现次数
     				title:'',//采购单制单人
     				buyerName:'',//	制单人
     				totalCount:'',//总次数
     				ratio:'',//占比
     			}],//采购单制单人审查项
     			purchaseAuditInspections:[{
     				matchCount:'',//历史出现次数
     				title:'',//采购单审核人
     				buyerName:'',//	审核人
     				totalCount:'',//总次数
     				ratio:'',//占比
     			}],//采购单审核人审查项
     			purchaseReceiveInspections:[{
     				matchCount:'',//历史出现次数
     				title:'',//采购单接单人
     				buyerName:'',//	接单人
     				totalCount:'',//总次数
     				ratio:'',//占比
     			}],//采购单审核人审查项
     			purchaseReceiveInspections:[{
     				matchCount:'',//历史出现次数
     				title:'',//采购方
     				buyerName:'',//	采购方
     				totalCount:'',//总次数
     				ratio:'',//占比
     			}],//采购方审查项
     			goodsInspections:[{
     				matchCount:'',//历史出现次数
     				goodsCode:'',//商品编码
     				title:'',//商品名称
     				buyerName:'',//	商品名
     				totalCount:'',//总次数
     				ratio:'',//占比
     			}],//商品名审查项
     			goodsInspections:[{
     				licensePlate:'',//车牌
     				matchCount:'',//历史出现次数
     				title:'',//商品名称
     				totalCount:'',//总次数
     				ratio:'',//占比
     			}],//车牌审查项
     			logisticsContactInspections:[{
     				driverPhone:'',//司机联系电话
     				matchCount:'',//历史出现次数
     				title:'',//司机
     				totalCount:'',//总次数
     				ratio:'',//占比
     			}],//司机审查项
     		},//贸易匹配信息
     		uploadFileData: {
          receivableNo: '',
          isImage: false
        },
        uploadImgData: {
          receivableNo: '',
          isImage: true
        },
     		
      }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata' 
	  },
    computed: {
      statusActive () {
        const status = this.status;
        let num = 0
        if (status === 'INVALID') {
          num = 0
        } else  if (status === 'AUDIT_PASS') {
          num = 1
        } 
        return num
      },
      billRelationTableData (){//单据关系表格数据
      	let billRelation = this.billRelation;
        let _arr = [];
        let _arrNum = [];
        if(billRelation.invoiceNos){
	        let _lenghti = billRelation.invoiceNos.length;
	        for(var i=0;i<_lenghti;i++){
	        	_arrNum.push(billRelation.invoiceNos[i].purchaseNos.length);
	        	let _lenghtj = billRelation.invoiceNos[i].purchaseNos.length;
	        	if(!billRelation.paymentInfo){
	        		billRelation.invoiceNos[i].paymentInfo = '--'
	        	}
	        	for(var j=0;j<_lenghtj;j++){
	        		if(!billRelation.invoiceNos[i].invoiceNo){
	        			billRelation.invoiceNos[i].invoiceNo ='/'
	        		}
	        		if(!billRelation.paymentInfo){
	        			billRelation.paymentInfo ='/'
	        		}
	        		_arr.push({
	        			'shipNo':billRelation.shipNo,
	        			'invoiceNo':billRelation.invoiceNos[i].invoiceNo,
	        			'purchaseNo':billRelation.invoiceNos[i].purchaseNos[j],
	        			'paymentInfo':billRelation.paymentInfo
	        		});
	        	}
	        }
	        this.purchaseOrdersNnm = _arrNum;
	        return _arr;
        }
        
      },
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
      this.receivableNo = this.$route.params.id
      this.uploadFileData.supplierId = this.receivableNo
      this.uploadImgData.supplierId = this.receivableNo
      if (this.receivableNo) {
        this.init()
      }
    },
    mounted () {
    },
    methods: {
    	fetchdata(){
    		this.receivableNo = this.$route.params.id
    		if (this.receivableNo) {
	        /*this.init()*/
	      }
     	},
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      	let that = this;
      	if(columnIndex === 0){
      		if(rowIndex === 0){
      			let _OrdersNnmTotal = 0;
      			let _length = that.purchaseOrdersNnm.length;
      			for(var i=0;i<_length;i++){
      				_OrdersNnmTotal += that.purchaseOrdersNnm[i]
      			}
      			return [_OrdersNnmTotal, 1];
      		}else{
      			return [0, 0];
      		}
      	}
      	if(columnIndex === 1){
      		let _total = 0;
      		for(var i=0;i<this.purchaseOrdersNnm.length;i++){
      			if(rowIndex === _total){
	      			return [this.purchaseOrdersNnm[i], 1];
	      			_total += this.purchaseOrdersNnm[i]
	      		}else{
	      			return [0, 0];
	      		}
      		}
      	}
      	if(columnIndex === 3){
      		let _total = 0;
      		for(var i=0;i<this.purchaseOrdersNnm.length;i++){
      			_total += this.purchaseOrdersNnm[i]
      		}
      		if(rowIndex === 0){
      			return [_total,1]
      		}else{
      			return [0, 0];
      		}
      	}
      },//单据信息 表格合并
      bankSerialMatchSpanMethod({ row, column, rowIndex, columnIndex }){
      	let that = this;
      	if(rowIndex == 0){
      		if(columnIndex == 0||columnIndex == 3){
      			return [1, 2];
      		}else if(columnIndex == 2){
      			return [1, 1];
      		}else{
      			return [0,0];
      		}
      	}else{
      		
      	}
      },
      init () {
        this.getBillDetail();//应收账款详情
      }, // 初始化
      getComboboxBankList () {
        comboboxBankList().then(res => {
          if (res.data.code === '200') {
            this.comboboxBankList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 获取银行
      getBillDetail () {
        accountDetail.billDetail(this.receivableNo).then(res => {
          if (res.data.code === '200') {
            const data = res.data.data
            this.centreName = data.centreName;
            this.supplierName = data.supplierName;
            this.financeAmt = data.financeAmt;
            this.validDays = data.validDays;
            this.status = data.status;
            this.statusText = data.statusText;
            this.updateTime = data.updateTime;
            this.billRelation = data.billRelation;
            this.arrivalOrder = data.arrivalOrder;
            this.invoiceOrders = data.invoiceOrders;
            this.purchaseOrders = data.purchaseOrders;
            this.billDetailData = data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 	应收账款单据信息
      approveFinal (type) {
        let receivableNo =this.receivableNo;
        let data = {
          receivableNo: receivableNo,
          reason: ''
        }
        var that = this;
        // 不达标提交
        if (!type) {
          if (!validContent(that.rejectRemark)) {
            that.$message.error('不达标原因不能为空')
            return
          }
          data.rejectRemark = that.rejectRemark.trim()
          accountDetail.unReach(data).then(res => {
	          if (res.data.code === '200') {
	            that.$message.success(res.data.message)
	            that.getBillDetail()
	            that.inspectionDialogShow = false
	            that.rejectDialogShow = false
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
          data.pass = false
          data.rejectRemark = that.rejectRemark.trim()
        }else{
        	// 达标提交
        	accountDetail.reach(receivableNo).then(function(res){
	          if (res.data.code === '200') {
	            that.$message.success(res.data.message)
	            that.getBillDetail()
	            that.inspectionDialogShow = false
	            that.rejectDialogShow = false
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
        }
        
      }, // 确认达标  未达标  提交
      doApproveFinal (type) {
       /* if (type) {
          this.$confirm(`确认达标？`, '确认是否通过达标，确认后，无法进行修改！', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.approveFinal(type)
          }).catch(() => {
          })
        } else {*/
          this.rejectRemark = ''
          this.rejectDialogShow = true
        //}
      }, // 不达标 按钮
      doPass () {
        this.$confirm(`确认是否通过达标，确认后，无法进行修改!`, '确认达标', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	      	let type = true;
	        this.approveFinal(type)
	      }).catch(() => {
	      })
      }, // 确定达标 按钮
      
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "accountDetail.scss";
</style>

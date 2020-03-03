<template>
	<div>
		<el-form ref="verifyFirmInfoForm" label-width="170px" size="mini" label-position="right">
			<div class="info-list" v-if="checkData">
				<div class="lh_title">额度测算</div>
				<el-form-item label="系统测算建议授信：">
					<!--<el-input v-model="checkData.limitInfo.estimate" class="must_input" style="width: 300px;">
        						</el-input>-->
					<span>{{checkData.limitInfo.estimate}}{{checkData.limitInfo.estimateComment}}</span>
				</el-form-item>
				<div class="table_top" style="text-align: center;line-height: 40px;margin-bottom: 20px;">
					<el-row style="margin-bottom: 0;">
						<el-col :span="5" class="table_th">单一客户集中度限额</el-col>
						<el-col :span="5" class="table_th">资金需求限额</el-col>
						<el-col :span="5" class="table_th">申请金额限额</el-col>
						<el-col :span="5" class="table_th">偿付能力的贷款限额</el-col>
						<el-col :span="4" class="table_th">押品限额</el-col>
					</el-row>
					<el-row style="margin-bottom: 0;">
						<el-col :span="5" class="table_td" style="line-height: 40px;">
							{{checkData.limitInfo.singleLimit}}
						</el-col>
						<el-col :span="5" class="table_td" style="line-height: 40px;">
							{{checkData.limitInfo.capitalLimit}}
						</el-col>
						<el-col :span="5" class="table_td" style="line-height: 40px;">
							{{checkData.limitInfo.applyLimit}}
						</el-col>
						<el-col :span="5" class="table_td" style="line-height: 40px;">
							{{checkData.limitInfo.repayLimit}}
						</el-col>
						<el-col :span="4" class="table_td" style="line-height: 40px;">
							{{checkData.limitInfo.collateralLimit}}
						</el-col>
					</el-row>
				</div>
				<div class="table_top" style="text-align: center;line-height: 40px;margin-bottom: 20px;">
					<el-row style="margin-bottom: 0;">
						<el-col :span="12" class="table_th">总负债占销售额比例</el-col>
						<el-col :span="12" class="table_th">负债评级限额</el-col>
					</el-row>
					<el-row style="margin-bottom: 0;">
						<el-col :span="12" class="table_td" style="line-height: 40px;">
							{{checkData.limitInfo.debtRateStr}}
						</el-col>
						<el-col :span="12" class="table_td" style="line-height: 40px;">
							{{checkData.limitInfo.debtLimit}}
						</el-col>
					</el-row>
				</div>
				<span>注：{{checkData.limitInfo.comment}}</span>
			</div>
			<div class="info-list">
				<div class="lh_title">授信额度</div>
				<el-form-item label="初审授信：">
					<el-input v-model="checkData.creditLine" class="must_input" style="width: 300px;">
					</el-input>
					<span>注：授信额度不能大于系统测算建议授信！</span>
				</el-form-item>
				<el-form-item label="授信期限：">
					<el-input v-model="checkData.creditLineMonth" class="must_input" style="width: 300px;">
					</el-input>
				</el-form-item>
			</div>
			<div class="info-list">
				<div class="lh_title">授信结论</div>
				<p class="lh_title">1、简述尽职调查后认定的企业实力和业绩：</p>
				<el-form-item v-if="signEnterpriseStrengthList" :label="item.titleText+':'" v-for="(item,index) in signEnterpriseStrengthList" :key="item.title">
					<template>
						<el-radio-group v-model="checkData.enterpriseStrength[item.title]">
							<el-radio :label="key" v-for="(val,key) in item.info" :key="key">{{val}}</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
				<p class="lh_title">2、调查总结（对企业的综合判断）：</p>
				<el-input type="textarea" :rows="4" v-model="checkData.checkSummary" class="must_input">
				</el-input>
				<p class="lh_title">3、贷后管理要求：</p>
				<el-input type="textarea" :rows="4" v-model="checkData.postLoanManagement" class="must_input">
				</el-input>
				<p class="lh_title">4、初审结论：</p>
				<el-input type="textarea" :rows="4" v-model="checkData.conclusionRemark" class="must_input">
				</el-input>
			</div>
			<div style="text-align: left;margin-top: 10px;">
				<el-button @click="saveSignConclusion" type="primary">保存</el-button>
			</div>
		</el-form>

	</div>
</template>
<script>
  	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  	import Uploads from '@/components/Upload/Uploads'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList ,collateralType,collateralSource} from '@/api/common'
	import firstTrialDetail   from '@/api/approveManage/firstTrialDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'check',
    components: { Upload ,Uploads},
    data () {
      	return {
      		enterpriseNameList:'',//企业名称列表
	        uploadImgData: {
	          supplierId: '',
	          isImage: true
	        },
	        signEnterpriseStrengthList:'',//企业实力和业绩单选数据
      	}
    },
    props:{
	    checkData:{
	    	type:Object,
	        default: ''
	    },
	    readOnly:{
	    	type:Boolean,
	    	default: false 
	    }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata' 
	  },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
    },
    mounted () {
    	this.init();
    },
    methods: {
	  	init () {
	  		this.getSignEnterpriseStrengthList();//企业实力和业绩单选数据
      	}, // 初始化
	    getSignEnterpriseStrengthList(){//企业实力和业绩单选数据
	      	firstTrialDetail.signEnterpriseStrength(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.signEnterpriseStrengthList  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
	    saveSignConclusion (){//授信结论-保存
	      	let data = baseUtil.copy(this.checkData)
	      	data.enterpriseStrength =JSON.stringify(data.enterpriseStrength)
	      	data.supplierId = this.supplierId
	      	firstTrialDetail.saveSignConclusion(data).then(res => {
	          if (res.data.code === '200') {
	            this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "approveDetail.scss";
</style>
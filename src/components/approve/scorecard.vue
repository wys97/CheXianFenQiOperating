<template>
	<div>
		<el-form  label-width="170px" size="mini" label-position="right">
		<div class="scorecard_title" >
			<el-form-item label="评分卡：">
				<span v-if="readOnly" class="input_read">{{scorecardData.cardName}}</span>
    			<template v-else v-if="scorecardTypesList">
					<!-- <el-radio-group v-model="scorecardData.cardId">
						<el-radio v-for="(val,key) in scorecardTypesList" :label="key" :key="key">{{val}}</el-radio>
					</el-radio-group> -->
					<div v-for="item in scorecardTypesList">{{item}}</div>
				</template>
    		</el-form-item>
		</div>
		<div v-if="!readOnly" style="padding-bottom: 5px;margin-bottom:20px;border-bottom: 1px solid #cdcdcd;">
			<el-form-item label="">
				<div  style="margin: 10px 0;"v-for="(item,index) in scorecardTypesList">
				   <el-button @click="changeScoreType(index)" type="primary" style="width: 200px;">系统评分</el-button>
				</div>
			</el-form-item>
		</div>
			<el-form-item label="评分时间：">
    			<span class="input_read">{{scorecardData.evaluateTime}}</span>
    		</el-form-item>
    		<el-form-item label="最终评级：">
    			<template slot-scope="scope">
        			<span v-if="readOnly" class="input_read">{{scorecardData.finalGrade}}</span>
		        	<el-select v-else  v-model="scorecardData.finalGrade"  placeholder="请选择">
					    <el-option label="A" value="A"></el-option>
					    <el-option label="B" value="B"></el-option>
					    <el-option label="C" value="C"></el-option>
					    <el-option label="D" value="D"></el-option>
					</el-select>
					<el-button @click="saveFinalGrade(scorecardData.finalGrade)" v-if="!readOnly" type="primary" size="mini">保存</el-button>
		       </template>
		     
    		</el-form-item>
		</el-form>
		<div class="scorecard_top_box flex_r_start flex_l_center jdt_box" style="margin-top: 15px;">
			<el-row style="width: 100%;">
			  <el-col :span="5">
			  	<span style="padding-left: 30px;">系统评级：{{scorecardData.systemGrade}}</span>
			  </el-col>
			  <el-col :span="5">
			  	加分项： {{scorecardData.additionScore}}
			  </el-col>
			  <el-col :span="5" >
			  	<span style="font-size: 20px;">最终评级：</span>
			  	<el-button :type="finalGrade=='A'?'success':finalGrade=='D'?'danger':'warning'">
			  		{{finalGrade}}
			  	</el-button>
			  
			  </el-col>
			  <el-col :span="4">
			  </el-col>
			  
			  <!--<el-col :span="5">
			  	<span style="padding-left: 30px;font-size: 20px;">最终评级：</span>
			  </el-col>
			  <el-col :span="5" v-if="scorecardData.scoreType==='HOTEL'">
			  	加分：{{scorecardData.additionalScore}}
			  </el-col>
			  <el-col :span="5" v-if="scorecardData.scoreType==='ARRANGED_AGENCY'">
			  	次要标准：{{scorecardData.secondaryGrade}}
			  </el-col>
			  <el-col :span="5" v-if="scorecardData.scoreType==='ARRANGED_AGENCY'">
			  	打分卡总分：{{scorecardData.defaultScore}}
			  </el-col>-->
			  <!--<el-col :span="5">
			  	（违约概率：{{scorecardData.probabilityScore}}，违约成本：{{scorecardData.costScore}}）
			  </el-col>-->
			</el-row>
		</div>
		<!--评级打分卡{{scorecardData.models}}-->
		<template v-if="scorecardData.models" v-for="(item,index) in scorecardData.models">
			
			<div class="scorecard_title">{{item.name}}</div>
			
		  <el-table
		    :data="item.rulesets"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="code"
		      label="规则集编号">
		      <template slot-scope="scope">{{ scope.row.code}}</template>
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="规则集名称">
		      <template slot-scope="scope">{{ scope.row.name?scope.row.name:'--'}}</template>
		    </el-table-column>
		    <el-table-column
		      prop="typeText"
		      label="类型">
		      <template slot-scope="scope">{{ scope.row.typeText?scope.row.typeText:'--'}}</template>
		    </el-table-column>
		    <el-table-column
		      prop="dataValue"
		      label="评级值">
		      <template slot-scope="scope">{{ scope.row.dataValue?scope.row.dataValue:'--'}}</template>
		    </el-table-column>
		    <el-table-column
		      prop="scoreText"
		      label="系统评级/评分">
		      <template slot-scope="scope">{{ scope.row.scoreText?scope.row.scoreText:'--'}}</template>
		    </el-table-column>
		    <!--<el-table-column
		      prop="useVariable"
		      :label="item.useGrade?'评级标准':'打分标准'">
		      <template slot-scope="scope">
		      		<span v-if="readOnly">{{scope.row.selectedRuleName}}</span>
					<el-radio-group  v-else v-model="scope.row.selectedRuleCode">
					  	<div v-for="(rule_item,rule_index) in scope.row.rules" style="padding:4px 0;">
					  		<el-radio @change="ruleRadioChange(index,scope.$index,rule_index,rule_item.score)" :label="rule_item.code" :disabled="scope.row.useVariable"  :key="rule_item.code">{{rule_item.name}}</el-radio>
					  	</div>
					</el-radio-group>
		      </template>
		    </el-table-column>-->
		    <!--<el-table-column
		      prop="score"
		      width="100"
		      :label="item.useGrade?'级别':'分值'">
		      <template slot-scope="scope">{{ scope.row.score}}</template>
		    </el-table-column>-->
		  </el-table>
		</template>
	 	<!--<div v-if="!readOnly" style="text-align: right;margin-top: 20px;">
		   <el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveScorecard" type="primary">保存</el-button>
		</div>-->
	</div>
</template>
<script>
  	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  	import Uploads from '@/components/Upload/Uploads'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList ,collateralType,collateralSource} from '@/api/common'
	import firstTrialDetail   from '@/api/approveManage/firstTrialDetail'
	import recheckDetail from '@/api/approveManage/recheckDetail'
	import reviewRecheckDetail from '@/api/approveManage/reviewRecheckDetail'
	import finalfirstDetail from '@/api/approveManage/finalfirstDetail'
	import finalsecondDetail from '@/api/approveManage/finalsecondDetail'
	import intoButtDetail from '@/api/capitalButtManage/intoButtDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'scorecard',
    components: { Upload ,Uploads},
    data () {
      	return {
			Api:'',//根据父组件传来的值更换api
	        scorecardData:'',//评分卡数据
	        finalGrade:'',//最终评级
	        scorecardTypesList:'',// 单选框列表 - 评分卡类型
      		enterpriseNameList:'',//企业名称列表
	        uploadImgData: {
	          supplierId: '',
	          isImage: true
	        },
      	}
    },
    props:{
	    readOnly:{
	    	type:Boolean,
	    	default: false 
	    },
	    supplierId:{
	    	type:String,
	        default: ''
	    },
		apiUrl:{
			type: String,
			default: 'firstTrialDetail'
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
    	if(this.apiUrl === 'firstTrialDetail'){
			this.Api = firstTrialDetail
		}else if(this.apiUrl ==='recheckDetail'){
			this.Api = recheckDetail
		}else if(this.apiUrl ==='reviewRecheckDetail'){
			this.Api = reviewRecheckDetail
		}else if(this.apiUrl ==='finalfirstDetail'){
			this.Api = finalfirstDetail
		}else if(this.apiUrl ==='finalsecondDetail'){
			this.Api = finalsecondDetail
		}else if(this.apiUrl ==='intoButtDetail'){
			this.Api = intoButtDetail
		}
    },
    mounted () {
    	this.init();
    },
    methods: {
	  	init () {
    		this.getQueryScorecardQuery();//评级打分卡-查询
    		// if(this.apiUrl === 'firstTrialDetail'){
    			this.getQueryScorecardTypes();//评级打分卡 - 单选框列表 - 评分卡类型
    		// }
      	}, // 初始化
	    getQueryScorecardQuery(){//评级打分卡-查询
	      	this.Api.scorecardTypes(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.scorecardData  = res.data.data;
	          	this.finalGrade  = res.data.data.finalGrade;//最终评级
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
	    getQueryScorecardTypes(){//评级打分卡 - 单选框列表 - 评分卡类型
	      	this.Api.scorecardTypes(this.supplierId).then(res => {
				
	          if (res.data.code === '200') {
	          	this.scorecardTypesList  = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
		changeScoreType(cardId){//点击系统评分
	    	let data = {
	    		supplierId:this.supplierId,
	    		cardId:cardId
	    	}
	    	this.Api.changeType(data).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryScorecardQuery();//评级打分卡-查询
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
	    saveFinalGrade(finalGrade){//最终评级保存
	    	let data = {
	    		supplierId:this.supplierId,
	    		finalGrade:finalGrade
	    	}
	    	this.Api.updateFinalGrade(data).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryScorecardQuery();//评级打分卡-查询
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
	    saveScorecard(){//评级打分卡保存
	      	let data = baseUtil.copy(this.scorecardData)
	      	let selectedMap = {};
	      	for(let i=0;i<data.models.length;i++){
	      		for(let j=0;j<data.models[i].rulesets.length;j++){
	      			if(!data.models[i].rulesets[j].selectedRuleCode){
	      				
	      			}else{
	      				selectedMap[data.models[i].rulesets[j].code]=data.models[i].rulesets[j].selectedRuleCode
	      			}
	      		}
	      	}
	      	data.selectedMap = JSON.stringify(selectedMap)
	      	data.supplierId = this.supplierId
	      	this.Api.scorecardSave(data).then(res => {
	          if (res.data.code === '200') {
	          	this.getQueryScorecardQuery();//评级打分卡-查询
	            this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    },
	    ruleRadioChange(index,$index,rule_index,score){
	    	this.scorecardData.models[index].rulesets[$index].score = this.scorecardData.models[index].rulesets[$index].rules[rule_index].score
	    }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
.scorecard_top_box{
    width: 100%;
    height: 100px;
    background-color: #ebeef5;
}
.scorecard_title{
  line-height: 50px;
  font-size: 13px;

}
.flex_r_start{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
}
.flex_r_between{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}
.flex_l_center{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}
.jdt_box{
    line-height: 45px;
}
</style>
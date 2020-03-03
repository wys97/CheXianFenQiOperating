<template>
	<div>
		<div class="scorecard_top_box flex_r_start flex_l_center jdt_box">
			<el-row style="width: 100%;">
			  <el-col :span="5">
			  	<span style="padding-left: 30px;font-size: 20px;">最终评级：</span>
			  </el-col>
			  <el-col :span="4">
			  	<el-button  :type="scorecardData.finalGrade=='A'?'success':scorecardData.finalGrade=='D'?'danger':'warning'">{{scorecardData.finalGrade}}</el-button>
			  </el-col>
			  <el-col :span="5">
			  	主要标准：{{scorecardData.primaryGrade}}
			  </el-col>
			  <el-col :span="5">
			  	次要标准：{{scorecardData.secondaryGrade}}
			  </el-col>
			  <el-col :span="5">
			  	打分卡总分：{{scorecardData.defaultScore}}
			  </el-col>
			  <!--<el-col :span="5">
			  	（违约概率：{{scorecardData.probabilityScore}}，违约成本：{{scorecardData.costScore}}）
			  </el-col>-->
			</el-row>
		</div>
		<!--评级打分卡{{scorecardData.models}}-->
		<template v-if="scorecardData.models" v-for="(item,index) in scorecardData.models">
			
			<div class="scorecard_title">{{item.name}}：<span>{{item.score}}</span></div>
			
		  <el-table
		    :data="item.rulesets"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="name"
		      label="指标"
		      width="180">
		      <template slot-scope="scope">{{ scope.row.name}}</template>
		    </el-table-column>
		    <el-table-column
		      prop="variableValue"
		      label="数值"
		      width="180">
		      <template slot-scope="scope">{{ scope.row.variableValue?scope.row.variableValue:'--'}}</template>
		    </el-table-column>
		    <el-table-column
		      prop="useVariable"
		      :label="item.useGrade?'评级标准':'打分标准'">
		      <template slot-scope="scope">
					  <el-radio-group v-model="scope.row.selectedRuleCode">
					  	<div v-for="(rule_item,rule_index) in scope.row.rules" style="height: 40px;line-height: 40px;">
					  		<el-radio :label="rule_item.code" :disabled="scope.row.useVariable"  :key="rule_item.code">{{rule_item.name}}</el-radio>
					  	</div>
					   
					  </el-radio-group>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="score"
		      width="100"
		      :label="item.useGrade?'级别':'分值'">
		      <template slot-scope="scope">{{ scope.row.score}}</template>
		    </el-table-column>
		  </el-table>
		</template>

		<!--<div style="text-align: right;margin-top: 20px;">
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
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'scorecard',
    components: { Upload ,Uploads},
    data () {
      	return {
      		enterpriseNameList:'',//企业名称列表
	        uploadImgData: {
	          supplierId: '',
	          isImage: true
	        },
      	}
    },
    props:{
	    scorecardData:{
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
      	}, // 初始化
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
.scorecard_top_box{
    width: 100%;
    height: 150px;
    background-color: #ebeef5;
}
.scorecard_title{
  line-height: 70px;
  font-size: 16px;

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
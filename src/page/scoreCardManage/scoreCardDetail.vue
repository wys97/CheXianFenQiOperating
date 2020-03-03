<template>
	<div class="container">
		<div class="top">
			<ul class="flex-item">
				<li>{{detailHeadData.content}}</li>
				<!--<li>联系人：{{detailData.receiverName}}</li>
	      	<li>手机号：{{detailData.receiverPhone}}</li>-->
				<li>应用场景：{{detailHeadData.sceneTypeText?detailHeadData.sceneTypeText:'--'}}</li>
			</ul>
			<div class="flex-item" style="text-align: right;margin-right: 50px;">
				<el-button :type="detailHeadData.status==='ENABLED'?'success':'info'" plain>{{detailHeadData.statusText}}</el-button>
			</div>
		</div>
		<div class="content">
			<div class="flex-item">
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane class="first_tab_content" label="基本信息" name="first">
						<div class="tab-content">
							<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="info-list">
									<p class="title">基本信息</p>
									<el-form-item label="评分卡编号：">
										<!--<span v-if="readOnly" class="input_read">{{detailData.cardNo}}</span>-->
										<el-input v-model="detailData.cardNo" class="must_input" style="width: 300px;">
										</el-input>
									</el-form-item>
									<el-form-item label="评分卡名称：">
										<!--<span v-if="readOnly" class="input_read">{{detailData.capitalId}}</span>-->
										<el-input v-model="detailData.cardName" class="must_input" style="width: 300px;">
										</el-input>
									</el-form-item>
									<el-form-item label="应用场景：">
										<span class="input_read">{{detailData.sceneTypeText}}</span>
										<!--<el-input v-model="detailData.sceneType" class="must_input" :disabled="true" style="width: 300px;">
										</el-input>-->
									</el-form-item>
									<el-form-item label="类型：">
										<span class="input_read">{{detailData.cardTypeText}}</span>
										<!--<el-input v-model="detailData.cardType" class="must_input" :disabled="true" style="width: 300px;">
										</el-input>-->
									</el-form-item>
									<el-form-item label="风控策略编号：">
										
										<el-input v-model="detailData.strategyNo" class="must_input"  style="width: 300px;">
										</el-input>
									</el-form-item>
									
									<el-form-item label="阈值设置：" v-if="detailData.cardType=='SCORE'">
										<template>
											<div>
												<span>A： &nbsp;&nbsp;</span>
												<el-input class="must_input" v-model="detailData.thresholdALow" style="width: 80px;"></el-input>
												<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
												<el-input v-model="detailData.thresholdAHigh" style="width: 80px;"></el-input>
											</div>
											<div>
												<span>B： &nbsp;&nbsp;</span>
												<el-input class="must_input" v-model="detailData.thresholdBLow" style="width: 80px;"></el-input>
												<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
												<el-input v-model="detailData.thresholdBHigh" style="width: 80px;"></el-input>
											</div>
											<div>
												<span>C： &nbsp;&nbsp;</span>
												<el-input class="must_input" v-model="detailData.thresholdCLow" style="width: 80px;"></el-input>
												<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
												<el-input v-model="detailData.thresholdCHigh" style="width: 80px;"></el-input>
											</div>
											<div>
												<span>D： &nbsp;&nbsp;</span>
												<el-input class="must_input" v-model="detailData.thresholdDLow" style="width: 80px;"></el-input>
												<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
												<el-input v-model="detailData.thresholdDHigh" style="width: 80px;"></el-input>
											</div>
											
										</template>
									</el-form-item>
									<el-form-item label="状态：">
										<!--<span v-if="readOnly" class="input_read">{{detailData.status}}</span>-->
										<el-radio-group v-model="detailData.status">
											<el-radio label="ENABLED">启用</el-radio>
											<el-radio label="DISABLED">禁用</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="评分卡描述：">
										<!--<span v-if="readOnly" class="input_read">{{detailData.capitalId}}</span>-->
										<el-input v-model="detailData.remark" type="textarea" rows="4" class="must_input">
										</el-input>
									</el-form-item>
									<div style="text-align: right;">
										<el-button @click="doSaveScoreCard" type="primary">保存</el-button>
									</div>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="模型设置" name="second">
						<div class="tab-content" v-if="scoreCardRuleSetListData">
							<div class="info-list" v-for="(item,index) in scoreCardRuleSetListData">
								<div>
									<p class="title" style="display: inline-block;">{{item.modelTypeText}}</p>
									<el-button class="r_f" @click="doAddRuleset(item.modelType)" type="primary" size="mini">新增规则集</el-button>
								</div>
								<template>
									<el-table :data="scoreCardRuleSetListData[index].ruleSets" border style="width: 100%">
										<!--<el-table-column type="index" label="序号" width="120">
										</el-table-column>-->
										<el-table-column prop="rulesetCode" label="规则集编号" width="180">
										</el-table-column>
										<el-table-column prop="rulesetName" label="规则集名称">
										</el-table-column>
										<el-table-column prop="rulesetTypeText" label="类型" width="150">
										</el-table-column>
										<el-table-column prop="ruleCount" label="规则条数" width="150">
										</el-table-column>

										<el-table-column prop="ruleSetId" label="操作" width="150" align="center">
											<template slot-scope="scope">
												<el-button @click="lookRuleset(scope.row.ruleSetId)" type="primary" size="mini">查看</el-button>
												<!--<router-link :to="'capticalDetail/' + scope.row.capitalId"  class="router-link">查看</router-link>-->
											</template>
										</el-table-column>
									</el-table>
								</template>
							</div>
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
					<li style="padding: 10px 0;">
						<el-button @click="deleteScoreCard" style="width: 80%;margin: auto;">删除</el-button>
					</li>
				</ul>
			</div>
			<!--左侧操作栏-->
		</div>
		<el-dialog title="规则集信息" :visible.sync="dialogFormVisibleRuleset">
			<el-form ref="rulesetDetailForm" label-width="190px" size="mini" label-position="right">
				<div class="info-list">
					<el-form-item label="规则集编号：" prop="rulesetCode">
						<el-input class="must_input" v-model="rulesetDetail.rulesetCode" style="width: 300px;">
						</el-input>
					</el-form-item>
					<el-form-item label="规则集名称：" prop="rulesetName">
						<el-input class="must_input" v-model="rulesetDetail.rulesetName" style="width: 300px;">
						</el-input>
					</el-form-item>
					<el-form-item label="类型：" prop="rulesetType">
						<template slot-scope="scope">
							<!--<span v-if="readOnly" class="input_read">{{detailData.capitalTypeText}}</span>-->
							<el-select class="must_input" v-model="rulesetDetail.rulesetType" placeholder="请选择">
								<el-option v-for="(val,key) in rulesetTypeList" :key="key" :label="val" :value="key"></el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="描述：" prop="remark">
						<el-input type="textarea" :rows="4" v-model="rulesetDetail.remark">
						</el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleRuleset = false">取 消</el-button>
				<el-button type="primary" @click="saveRulesetDetail">提 交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="联系人信息" :visible.sync="dialogFormVisibleContact">
			<el-form ref="contactDetailForm" label-width="190px" size="mini" label-position="right">
				<div class="info-list">
					<el-form-item label="联系人编号：" prop="contactId">
						<span v-if="contactDetail.add">(自动生成)</span>
						<el-input v-else v-model="contactDetail.contactId" :disabled="true" style="width: 300px;">
						</el-input>
					</el-form-item>
					<el-form-item label="联系人姓名：" prop="contactName">
						<el-input v-model="contactDetail.contactName" style="width: 300px;">
						</el-input>
					</el-form-item>
					<el-form-item label="职务：" prop="position">
						<el-input v-model="contactDetail.position" style="width: 300px;">
						</el-input>
					</el-form-item>
					<el-form-item label="联系电话：" prop="mobile">
						<el-input v-model="contactDetail.mobile" style="width: 300px;">
						</el-input>
					</el-form-item>
					<el-form-item label="备注：" prop="remark">
						<el-input type="textarea" :rows="4" v-model="contactDetail.remark">
						</el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleContact = false">取 消</el-button>
				<el-button type="primary" @click="saveContactDetail">保 存</el-button>
			</div>
		</el-dialog>
		<el-dialog title="账户信息" :visible.sync="dialogFormVisibleCapitalOperator" width="500px">
			<el-form ref="capitalOperatorDetailForm" label-width="120px" size="mini" label-position="right">
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
						<el-input v-model="capitalOperatorDetail.operatorName" style="width: 300px;">
						</el-input>
					</el-form-item>
					<el-form-item label="关联手机号：" prop="mobile">
						<el-input v-model="capitalOperatorDetail.mobile" style="width: 300px;">
						</el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleCapitalOperator = false">取 消</el-button>
				<el-button type="primary" @click="saveCapitalOperatorDetail">提 交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="规则集详情" :visible.sync="inspectionDialogShow" fullscreen custom-class='supplier-detail-dialog' width="900px">
			<div class="dialog-content">
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick2">
					<el-tab-pane class="first_tab_content" label="基本信息" name="first">
						<div class="tab-content">
							<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="info-list">
									<p class="title">基本信息</p>
									<el-form-item label="规则集编号：">
										<!--<span v-if="readOnly" class="input_read">{{basicInfo.rulesetCode}}</span>-->
										<el-input v-model="basicInfo.rulesetCode" class="must_input" style="width: 300px;">
										</el-input>
									</el-form-item>
									<el-form-item label="规则集名称：">
										<!--<span v-if="readOnly" class="input_read">{{basicInfo.rulesetName}}</span>-->
										<el-input v-model="basicInfo.rulesetName" class="must_input" style="width: 300px;">
										</el-input>
									</el-form-item>
									<el-form-item label="类型：">
										<template slot-scope="scope">
											<el-select v-model="basicInfo.rulesetType" style="width:300px;">
												<el-option v-for="(val,key) in rulesetTypeList" :label="val" :value='key' :key="key">
												</el-option>
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="描述：">
										<!--<span v-if="readOnly" class="input_read">{{basicInfo.capitalId}}</span>-->
										<el-input v-model="basicInfo.remark" type="textarea" rows="4" class="must_input">
										</el-input>
									</el-form-item>
									<div style="text-align: right;">
										<el-button @click="doSaveBasicInfo" type="primary">保存</el-button>
									</div>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="规则设置" name="second">
						<div class="tab-content">
							<div class="info-list">
								<div>
									<p class="title" style="display: inline-block;">规则设置</p>
									<el-button class="r_f" @click="addVersion()" type="primary" size="mini" style="margin-bottom: 12px;">新增</el-button>
								</div>
								<template v-if="scoreCardRuleList">
									<el-table :data="scoreCardRuleList" border style="width: 100%">
										<el-table-column prop="ruleLogicText" label="规则逻辑">
										</el-table-column>
										<el-table-column prop="rule" label="规则评级 / 评分" align="center" width="110">
										</el-table-column>
										<el-table-column prop="ruleId" label="操作" width="122" align="center">
											<template slot-scope="scope">
												<span @click="editRule(scope.row.ruleId)" class="cursor_a router_link">
													修改
												</span>
												<span @click="deleteRule(scope.row.ruleId)" class="cursor_a router_link">
													删除
												</span>
											</template>
										</el-table-column>
									</el-table>
								</template>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="deleteScoreCardRuleSet">删除</el-button>
			</div>
		</el-dialog>

		<!--新建规则弹窗-->
		<el-dialog v-if="dialogFormAddRulesetVersion" title="操作提示" :visible.sync="dialogFormAddRulesetVersion" width="900px">
			<el-form :model="formRulesetVersion" ref="formRulesetVersion" label-width="100px">
				<el-form-item v-if="ruleStatusType==='SCORE'" label="规则评分：" prop="grade" placeholder="">
					<div style="width: 150px;">
						<el-input v-model="formRulesetVersion.grade" >
							<template slot="append">分</template>
						</el-input>	
					</div>
					
				</el-form-item>
				<el-form-item v-else label="规则评级：" prop="grade">
					<template slot-scope="scope">
						<el-select v-model="formRulesetVersion.grade"  style="width: 200px;" placeholder="请选择">
							<el-option label="A" value="A"></el-option>
							<el-option label="B" value="B"></el-option>
							<el-option label="C" value="C"></el-option>
							<el-option label="D" value="D"></el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="规则逻辑：" v-if="sourceLinkerListData" prop="ruleLogic">
					<i v-if="formRulesetVersion.ruleLogic.length===0" @click="addRuleLogic" class="cursor_a el-icon-circle-plus" style="color: #409EFF;font-size: 24px;"></i>
					<div else-if v-for="(item,index) in formRulesetVersion.ruleLogic">
						<div v-if="index>0" class="and_or_btns">
							<div @click="AND(index)" class="and_or_no_selet_btn" :class="item.logicalOperator==='AND'?'and_or_selet_btn':''">且</div>
							<div @click="OR(index)" class="and_or_no_selet_btn" :class="item.logicalOperator==='OR'?'and_or_selet_btn':''">或</div>
						</div>
						<span style="position: relative;">
				    	<span v-if="item.braceOpen" style="position: absolute;z-index: 100; left: -1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaozuo"></i>
				    	</span>
						<span v-if="!item.braceOpen" style="position: absolute;z-index: 100; right: -1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaozuo"></i>
				    	</span>
						<el-switch v-model="item.braceOpen" active-color="#13ce66">
						</el-switch>
						</span>
						<el-select v-model="item.dataCode" @change="rulesetSelect(item.dataCode,index)" style="width: 200px;" placeholder="数据产品">
							<el-option v-for="item in sourceLinkerListData.ruleLogic" :key="item.dataCode" :label="item.dataName" :value="item.dataCode">
							</el-option>
						</el-select>
						<el-select v-model="item.variable.code" @change="productSelect(item.variable.code,index)" style="width: 200px;" placeholder="变量">
							<el-option v-for="item in variablesList[index].list" :key="item.variablesCode" :label="item.variablesName" :value="item.variablesCode">
							</el-option>
						</el-select>
						<el-select v-model="item.comparisonOperator" style="width: 100px;" placeholder="运算符">
							<el-option v-for="(val,key) in sourceLinkerListData.engComparisonOperator" :key="key" :label="val" :value="key">
							</el-option>
						</el-select>
						<el-input v-model="item.comparisonValue" style="width: 60px;" placeholder="值"></el-input>
						<span style="position: relative;">
				    	<span v-if="item.braceClose" style="position: absolute;z-index: 100; left: 1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaoyou"></i>
				    	</span>
						<span v-if="!item.braceClose" style="position: absolute;z-index: 100; right: -1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaoyou"></i>
				    	</span>
						<el-switch v-model="item.braceClose" active-color="#13ce66">
						</el-switch>
						</span>
						<span>
							<i v-if="formRulesetVersion.ruleLogic.length-1===index" @click="addRuleLogic" class="cursor_a el-icon-circle-plus" style="color: #409EFF;font-size: 24px;"></i>
							<i @click="removeRuleLogic(index)" class="cursor_a el-icon-remove" style="color: #F56C6C;font-size: 24px;"></i>
						</span>
						<div v-if="item.variable.description">
							<span style="background-color: #dcdfe6;min-width: 200px;border-radius: 5px;padding: 5px;display: inherit;line-height: 16px;">
				    		{{item.variable.description}}
				    		</span>
						</div>
					</div>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetFormUpdateRole('formRulesetVersion')">取 消</el-button>
				<el-button @click="submitFormGrantPermission(saveRulesetType)" type="primary">保 存</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import scoreCardDetail from '@/api/scoreCardManage/scoreCardDetail'
	import { validContent } from '@/utils/validate'
	import { Format } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'scoreCardDetail',
		components: {
			Upload
		},
		data() {
			return {
				cardId: '', // 资金方id
				ruleSetId: '', //规则集id
				ruleId:'',//规则id
				ruleStatusType:'',//区分评级还是评分  SCORE评分
				detailData: '', //详情数据
				basicInfo: '', //规则集基本信息
				detailHeadData: '', //头部数据
				scoreCardRuleSetListData: '', //模型管理-列表数据
				scoreCardRuleList: '', //规则管理-列表
				rulesetDetail: { //规则集详情
					cardId: '',
					modelType: '',
					rulesetCode: '',
					rulesetName: '',
					rulesetType: '',
					remark: ''
				},
				rulesetTypeList: '', //规则集类型下拉
				modelType: '', //规则集类型
				capitalTypeList: '', //资方类型下拉
				contactList: [], //联系人列表数据
				contactDetail: { //联系人详情
					contactId: '',
					contactName: '',
					position: '',
					mobile: '',
					remark: '',
				},
				capitalOperatorList: [], //资方端登录账号-列表
				capitalOperatorDetail: { //资方端登录账号详情
					id: '',
					type: '',
					loginName: '',
					operatorName: '',
					mobile: '',
					initialPassword: '',
				},
				signSetupData: '', //签约设置
				dialogFormAddRulesetVersion: false, //新建（编辑）规则集版本
				inspectionDialogShow: false, //对接操作和记录
				dialogFormVisibleRuleset: false, //规则集新增dialog
				dialogFormVisibleContact: false, //联系人新增dialog
				dialogFormVisibleCapitalOperator: false, //修改登录账户dialog
				loanFeeData: '', //融资费率配置数据
				activeName2: 'first',
				activeName: 'first',
				tableData: [],
				sourceLinkerListData: '', //二级联动数据
      			variablesList:[],//产品下拉数据
				dialogFormAddRulesetVersionTitle: '新建规则', //新建（编辑）规则集版本title
				saveRulesetType: 'new', //保存规则集的类型，编辑或新建，默认新建new 编辑edit
				formRulesetVersion: { //新建（编辑）规则表单数据
					grade: '',
					ruleLogic: [{
						logicalOperator: '',
						braceOpen: false,
						dataCode:'',
						variable: {
							code: "",
							name: "",
							description: ""
						},
						comparisonOperator: "",
						comparisonValue: "",
						braceClose: false
					}]
				},
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			formRulesetVersion(val) {
				let _variablesList = [];
				for(let i = 0; i < this.formRulesetVersion.ruleLogic.length; i++) {
					_variablesList.push({
						list: ''
					});
				}
				this.variablesList = _variablesList
			},
			variablesList(val) {
				this.variablesList = val
			}
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		created() {
			this.cardId = this.$route.params.id
			if(this.cardId) {
				this.init()
			}
		},
		mounted() {},
		methods: {
			init() {
				this.getCapticalDetail(); //评分卡管理 - 查看评分卡详情信息
				//				this.getCapitalTypeList(); //资方类型下拉
				this.getDetailHeadData(); //资金方详情---头部信息
				this.getDataSourceLinkerList(); //二级联动数据
			}, // 初始化
			resetFormRest() { //初始化新建或编辑表单
				this.formRulesetVersion = {
					grade: '',
					ruleLogic: [{
						logicalOperator: '',
						braceOpen: false,
						dataCode: "",
						variable: {
							code: "",
							name: "",
							description: ""
						},
						comparisonOperator: "",
						comparisonValue: "",
						braceClose: false
					}]
				}
			},
			addVersion() { //新建规则
				let that = this;
				that.saveRulesetType = 'new'
				that.dialogFormAddRulesetVersionTitle = '新建规则'
				that.resetFormRest(); //初始化表单
				//		    		that.formRulesetVersion.rulesetName = rulesetName
				//		    		that.formRulesetVersion.rulesetCode = rulesetCode
				//		    		that.formRulesetVersion.rulesetVersion = rulesetVersion
				setTimeout(function() {
					that.dialogFormAddRulesetVersion = true;
				}, 0)
			},
			getDataSourceLinkerList() { //获取新建规则——查询二级联动数据
				//		    	let data ={
				//		    		rulesetCode:'',
				//		    		rulesetVersion:''
				//		    	}
				//		    	data.rulesetCode = this.id.rulesetCode
				//		    	data.rulesetVersion = this.id.rulesetVersion
				scoreCardDetail.dataSourceLinkerList().then(res => {
					if(res.data.code === '200') {
						this.sourceLinkerListData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			rulesetSelect(dataCode, index) { //规则集下拉触发
				for(let i = 0; i < this.sourceLinkerListData.ruleLogic.length; i++) {
					if(dataCode === this.sourceLinkerListData.ruleLogic[i].dataCode) {
						this.variablesList[index].list = this.sourceLinkerListData.ruleLogic[i].variablesList
					}
				}
			},
			productSelect(code, index) { //产品下拉触发
				let _ruleLogic = this.sourceLinkerListData.ruleLogic
				for(let i = 0; i < _ruleLogic.length; i++) {
					for(let j = 0; j < _ruleLogic[i].variablesList.length; j++) {
						if(_ruleLogic[i].variablesList[j].variablesCode === code) {
							this.formRulesetVersion.ruleLogic[index].variable.description = _ruleLogic[i].variablesList[j].variablesDescription
						}
					}
				}
			},
			addRuleLogic() { //添加规则逻辑
				this.variablesList.push({
					list: ''
				});
				this.formRulesetVersion.ruleLogic.push({
					logicalOperator: 'AND',
					braceOpen: false,
					dataCode: "",
					variable: {
						code: "",
						name: "",
						description: ""
					},
					comparisonOperator: "",
					comparisonValue: "",
					braceClose: false
				});
			},
			removeRuleLogic(index) { //删除规则逻辑
				// 如果删除的这个规则逻辑是第一个， 那么把后面的一个的逻辑操作符也删除
				if (index === 0 && this.formRulesetVersion.ruleLogic.length > 1) {
					this.formRulesetVersion.ruleLogic[index + 1].logicalOperator = ''
				}
				this.formRulesetVersion.ruleLogic.splice(index, 1);
			},
			submitFormGrantPermission(type) { //新建或编辑保存;
				let that = this;
				if(!this.formRulesetVersion.grade) {
					this.$message.error('规则评分不能为空！')
					return;
				}
				let data = baseUtil.copy(this.formRulesetVersion)
				data.ruleLogic = JSON.stringify(data.ruleLogic)
				data.ruleSetId = this.ruleSetId
				data.ruleId = this.ruleId
				if(type === 'new') { //新建规则集保存
					scoreCardDetail.scoreCardRuleAdd(data).then(res => {
						if(res.data.code === '200') {
							that.getScoreCardRuleListData();//规则集-列表---------查询
							that.dialogFormAddRulesetVersion = false;
							that.resetFormRest(); //初始化表单
							that.$message.success(res.data.message)
						} else {
							that.$message.error(res.data.message)
						}
					})
				} else if(type === 'edit') { //编辑规则集保存
					scoreCardDetail.scoreCardRuleSave(data).then(res => {
						if(res.data.code === '200') {
							that.getScoreCardRuleListData();//规则集-列表---------查询
							that.dialogFormAddRulesetVersion = false;
							that.resetFormRest(); //初始化表单
							that.$message.success(res.data.message)
						} else {
							that.$message.error(res.data.message)
						}
					})
				}
			},
			resetFormUpdateRole(formName) { //新建或编辑取消
				this.dialogFormAddRulesetVersion = false;
				this.$refs[formName].resetFields();
			},
			editRule(ruleId) { //修改规则
				let that = this;
				this.ruleId = ruleId;
				that.saveRulesetType = 'edit'
				that.dialogFormAddRulesetVersionTitle = '编辑规则集'
				scoreCardDetail.scoreCardRuleDetail(ruleId).then(res => {
					if(res.data.code === '200') {
//						that.formRulesetVersion.rulesetName = that.rulesetDetailData.rulesetName
//						that.formRulesetVersion.rulesetCode = that.rulesetDetailData.rulesetCode
//						that.formRulesetVersion.ruleName = res.data.data.ruleName
//						that.formRulesetVersion.ruleCode = res.data.data.ruleCode
//						that.formRulesetVersion.ruleWeight = res.data.data.ruleWeight
//						that.formRulesetVersion.ruleDescribe = res.data.data.ruleDescribe
//						that.formRulesetVersion.ruleStatus = res.data.data.ruleStatus
						that.formRulesetVersion.grade = res.data.data.grade
						that.formRulesetVersion.ruleLogic = res.data.data.ruleLogic
						let _ruleLogicList = res.data.data.ruleLogic
						for(let i = 0; i < _ruleLogicList.length; i++) {
							that.variablesList.push({
								list: ''
							});
							this.rulesetSelect(_ruleLogicList[i].dataCode, i)
						}
						this.getDataSourceLinkerList();
						setTimeout(function() {
							that.dialogFormAddRulesetVersion = true;
						}, 0)
					} else {
						that.$message.error(res.data.message)
					}
				})
			},
			deleteRule(ruleId) { //删除规则
				let that = this;
				this.$confirm('删除后将不能恢复，确认删除?','提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					scoreCardDetail.scoreCardRuleDelete(ruleId).then(res => {
						if(res.data.code === '200') {
							that.getScoreCardRuleListData();//规则集-列表---------查询
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					})
				}).catch(() => {})
				
			},
			AND(index) {
				let _list = this.formRulesetVersion.ruleLogic
				_list[index].logicalOperator = 'AND'
			},
			OR(index) {
				let _list = this.formRulesetVersion.ruleLogic
				_list[index].logicalOperator = 'OR'
			},

			fetchdata() {
				this.cardId = this.$route.params.id
				if(this.cardId) {
					/*this.init()*/
				}
			},
			handleClick(tab) {
				if(tab.index === '0') { //资方信息
					this.getCapticalDetail(); //资金方详情信息
					//					this.getCapitalTypeList(); //资方类型下拉
				} else if(tab.index === '1') { //联系人信息
					this.getScoreCardRuleSetListData(); //模型管理-列表---------查询
				} else if(tab.index === '2') { //融资费率配置
				} else if(tab.index === '3') { //登录账户设置
					this.getCapitalOperatorList(); //资方端登录账号-列表---------查询
				} else if(tab.index === '4') {
					this.getSignSetup(); //其它设置-签约设置-------------查询
				}
			},
			handleClick2(tab) {
				if(tab.index === '0') { //规则集基本信息
					this.getBasicInfo(); //获取规则集基本信息
					this.getRulesetTypeList(); //规则集类型下拉
				} else if(tab.index === '1') { //规则设置
					this.getScoreCardRuleListData(); //规则集-列表---------查询
				}
			},
			getDetailHeadData() { //头部信息
				scoreCardDetail.detailHead(this.cardId).then(res => {
					if(res.data.code === '200') {
						this.detailHeadData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			deleteScoreCard() { //点击评分卡规则
				this.$confirm('此操作将删除评分卡规则设置, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					scoreCardDetail.scoreCardDelete(this.cardId).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.$router.replace({
								path: '/scoreCardManage/scoreCardList'
							})
							//删除tabsView对应的view
							let views = this.$store.state.app.visitedViews;
							for(let i = 0; i < views.length; i++) {
								if(views[i].componentName === 'scoreCardDetail') {
									this.$store.dispatch('DelVisitedViews', views[i]).then(() => {})
								}
							}
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {});

			},
			getCapticalDetail() { // 	评分卡详情信息
				scoreCardDetail.detail(this.cardId).then(res => {
					if(res.data.code === '200') {
						this.detailData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getCapitalTypeList() { //资方类型下拉
				scoreCardDetail.capitalType().then(res => {
					if(res.data.code === '200') {
						this.capitalTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveScoreCard() { //评分卡详情-保存
				let data = baseUtil.copy(this.detailData)
				console.log(data)
				data.cardId = this.cardId
				scoreCardDetail.scoreCardSave(data).then(res => {
					if(res.data.code === '200') {
						this.getDetailHeadData(); //评分卡详情信息---头部信息
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			getBasicInfo() { // 	规则集基本信息
				scoreCardDetail.basicInfo(this.ruleSetId).then(res => {
					if(res.data.code === '200') {
						this.basicInfo = res.data.data;
						this.ruleStatusType = res.data.data.type;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			deleteScoreCardRuleSet(){//删除规则集
				let that = this;
				this.$confirm('删除后将不能恢复，确认删除?','提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					scoreCardDetail.scoreCardRuleSetDelete(this.ruleSetId).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.inspectionDialogShow = false
							this.getScoreCardRuleSetListData(); //模型管理-列表---------查询
						} else {
							this.$message.error(res.data.message)
						}
					})
				}).catch(() => {})
				
			},
			doSaveBasicInfo() { //规则集基本信息-保存
				let data = baseUtil.copy(this.basicInfo)
				data.ruleSetId = this.ruleSetId
				scoreCardDetail.saveBasicInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			getScoreCardRuleSetListData() { //模型管理-列表---------查询
				scoreCardDetail.scoreCardRuleSetList(this.cardId).then(res => {
					if(res.data.code === '200') {
						this.scoreCardRuleSetListData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			lookRuleset(ruleSetId) { //点击规则集查看
				this.inspectionDialogShow = true
				this.ruleSetId = ruleSetId;
				this.getBasicInfo(); //获取规则集基本信息
				this.getRulesetTypeList(); //规则集类型下拉
				this.getScoreCardRuleListData(); //规则集-列表---------查询
			},
			doAddRuleset(modelType) { //点击新增规则集
				this.modelType = modelType
				this.getRulesetTypeList(); //规则集类型下拉
				this.rulesetDetail = {
					cardId: '',
					modelType: '',
					rulesetCode: '',
					rulesetName: '',
					rulesetType: '',
					remark: ''
				}
				this.dialogFormVisibleRuleset = true;
			},

			getRulesetTypeList() { //规则集类型下拉
				scoreCardDetail.rulesetType().then(res => {
					if(res.data.code === '200') {
						this.rulesetTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			saveRulesetDetail() { //保存规则集信息
				if(!this.rulesetDetail.rulesetCode){this.$message.error('规则集编号不能为空！');return;}
				if(!this.rulesetDetail.rulesetName){this.$message.error('规则集名称不能为空！');return;}
				if(!this.rulesetDetail.rulesetType){this.$message.error('规则集类型不能为空！');return;}
				let data = baseUtil.copy(this.rulesetDetail)
				data.cardId = this.cardId
				data.modelType = this.modelType
				scoreCardDetail.scoreCardRuleSetAdd(data).then(res => {
					if(res.data.code === '200') {
						this.getScoreCardRuleSetListData(); //模型管理-列表---------查询
						this.dialogFormVisibleRuleset = false;
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			getScoreCardRuleListData() { //规则集-列表---------查询
				scoreCardDetail.scoreCardRuleList(this.ruleSetId).then(res => {
					if(res.data.code === '200') {
						this.scoreCardRuleList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getContactList() { //联系人列表---------查询
				let data = {
					page: 1,
					limit: 50,
					cardId: this.cardId
				}
				scoreCardDetail.contactList(data).then(res => {
					if(res.data.code === '200') {
						this.contactList = res.data.data.list;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doAddContact() { //点击新增联系人
				this.contactDetail = {
					add: true,
					contactId: '',
					contactName: '',
					position: '',
					mobile: '',
					remark: ''
				}
				this.dialogFormVisibleContact = true;
			},
			doReviseContact(contactId) { //点击修改联系人
				scoreCardDetail.contactDetail(contactId).then(res => {
					if(res.data.code === '200') {
						this.contactDetail = res.data.data;
						this.dialogFormVisibleContact = true;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doDeleteContact(contactId) { //点击删除联系人
				this.$confirm('此操作将删除联系人, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					scoreCardDetail.removeContact(contactId).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.getContactList(); //联系人列表---------查询
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {});

			},
			saveContactDetail() { //保存联系人信息
				let data = baseUtil.copy(this.contactDetail)
				data.cardId = this.cardId
				scoreCardDetail.saveContact(data).then(res => {
					if(res.data.code === '200') {
						this.getContactList(); //联系人列表---------查询
						this.dialogFormVisibleContact = false;
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			//登录账号
			getCapitalOperatorList() { //资方端登录账号-列表---------查询
				scoreCardDetail.capitalOperatorList(this.cardId).then(res => {
					if(res.data.code === '200') {
						this.capitalOperatorList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doUpdateCapitalOperator(id) { //点击修改登录账户
				scoreCardDetail.queryCapitalOperator(id).then(res => {
					if(res.data.code === '200') {
						this.capitalOperatorDetail = res.data.data;
						this.capitalOperatorDetail.id = id;
						this.dialogFormVisibleCapitalOperator = true;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doResetCapitalOperator(id) { //点击重置密码
				this.$confirm('请确认是否重置密码？确认后原密码失效！', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					scoreCardDetail.resetPassWord(id).then(res => {
						if(res.data.code === '200') {
							this.$alert('重置密码成功！新密码：' + res.data.data.passWord + '', '操作提示', {
								confirmButtonText: '关闭',
								callback: action => {}
							});
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {

				});

			},
			saveCapitalOperatorDetail() { //保存修改登录账户
				let data = baseUtil.copy(this.capitalOperatorDetail)
				scoreCardDetail.updateOperator(data).then(res => {
					if(res.data.code === '200') {
						this.getCapitalOperatorList(); //资方端登录账号-列表---------查询
						this.dialogFormVisibleCapitalOperator = false;
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			getSignSetup() { //其它设置-签约设置-------------查询
				scoreCardDetail.signSetup(this.cardId).then(res => {
					if(res.data.code === '200') {
						this.signSetupData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveSignSetup() { //签约设置-------------保存
				let data = baseUtil.copy(this.signSetupData)
				data.cardId = this.cardId
				scoreCardDetail.saveSignSetup(data).then(res => {
					if(res.data.code === '200') {
						this.getSignSetup(); //其它设置-签约设置-------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doApplySignSetup() { //其它设置-签约设置申请
				scoreCardDetail.applySignSetup(this.cardId).then(res => {
					if(res.data.code === '200') {
						this.getSignSetup(); //其它设置-签约设置-------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				//				console.log(row+'www'+column+'www'+rowIndex+'www'+columnIndex )
				if(columnIndex === 0) {
					//					return [3, 1];
					//					console.log(row)
					//					console.log(column)
				}
			},
			applyCertificateClick() {
				scoreCardDetail.applyCertificate(this.cardId).then(res => {
					if(res.data.code === '200') {
						this.getCapticalDetail();
					} else {
						this.$message.error(res.data.message)
					}
				})
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "scoreCardDetail.scss";
</style>
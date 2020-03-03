<template>
	<div class="container" style="overflow-y: auto;background-color: #fff;padding: 0 20px 30px;height: 100%;">
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
			<div class="info-list">
				<p style="line-height: 40px;">
					<span>新增评分卡</span>
				</p>
				<el-form-item label="评分卡编号：">
					<template>
						<el-input class="must_input" v-model="scoreCardAddData.cardNo" style="width: 300px;">
						</el-input>
					</template>
				</el-form-item>
				<el-form-item label="评分卡名称：">
					<template>
						<el-input class="must_input" v-model="scoreCardAddData.cardName" style="width: 300px;">
						</el-input>
					</template>
				</el-form-item>
				<el-form-item label="应用场景：">
					<template>
					  <el-select class="must_input" v-model="scoreCardAddData.sceneType" filterable  placeholder="请选择" style="width: 300px;">
					    <el-option
					      v-for="(val,key) in cardSceneTypeList"
					      :key="key"
					      :label="val"
					      :value="key">
					    </el-option>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="类型：">
					<template>
						<el-radio-group class="must_input" v-model="scoreCardAddData.cardType">
							<el-radio v-for="(val,key) in cardTypeList" :label="key" :key="key">{{val}}</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
				<el-form-item label="风控策略编号：">
					<template>
						<el-input class="must_input" v-model="scoreCardAddData.strategyNo" style="width: 300px;">
						</el-input>
					</template>
				</el-form-item>
				<el-form-item label="阈值设置：" v-if="scoreCardAddData.cardType=='SCORE'">
					<template>
						<div>
							<span>A： &nbsp;&nbsp;</span>
							<el-input class="must_input" v-model="scoreCardAddData.thresholdALow" style="width: 80px;"></el-input>
							<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
							<el-input v-model="scoreCardAddData.thresholdAHigh" style="width: 80px;"></el-input>
						</div>
						<div>
							<span>B： &nbsp;&nbsp;</span>
							<el-input class="must_input" v-model="scoreCardAddData.thresholdBLow" style="width: 80px;"></el-input>
							<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
							<el-input v-model="scoreCardAddData.thresholdBHigh" style="width: 80px;"></el-input>
						</div>
						<div>
							<span>C： &nbsp;&nbsp;</span>
							<el-input class="must_input" v-model="scoreCardAddData.thresholdCLow" style="width: 80px;"></el-input>
							<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
							<el-input v-model="scoreCardAddData.thresholdCHigh" style="width: 80px;"></el-input>
						</div>
						<div>
							<span>D： &nbsp;&nbsp;</span>
							<el-input class="must_input" v-model="scoreCardAddData.thresholdDLow" style="width: 80px;"></el-input>
							<span>&nbsp;&nbsp;至 &nbsp;&nbsp;</span>
							<el-input v-model="scoreCardAddData.thresholdDHigh" style="width: 80px;"></el-input>
						</div>
						
					</template>
				</el-form-item>

				<el-form-item label="状态：">
					<template>
						<el-radio-group class="must_input" v-model="scoreCardAddData.status">
							<el-radio v-for="(val,key) in enabledDisabledList" :label="key" :key="key">{{val}}</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
				<el-form-item label="评分卡描述：">
					<template>
						<el-input v-model="scoreCardAddData.remark" type="textarea" rows="4">
						</el-input>
					</template>
				</el-form-item>
				<div v-if="!readOnly" style="text-align: right;">
					<el-button @click="doSaveScoreCard" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" type="primary">保存</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Uploads from '@/components/Upload/Uploads'
	import defaultImg from '@/assets/imgs/default.jpg'
	import {cardType,enabledDisabled,cardSceneType} from '@/api/common'
	import scoreCardDetail from '@/api/scoreCardManage/scoreCardDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'scoreCardAdd',
		components: {
			Upload,
			Uploads
		},
		data() {
			return {
				scoreCardAddData: {
					cardNo:'',
					cardName:'',
					sceneType:'',
					cardType:'',
					strategyNo:'',
					thresholdALow:'',
					thresholdAHigh:'',
					thresholdBLow:'',
					thresholdBHigh:'',
					thresholdCLow:'',
					thresholdCHigh:'',
					thresholdDLow:'',
					thresholdDHigh:'',
					status:'',
					remark:'',
				}, //担保人详情数据
				cardTypeList:'',//评分卡类型下拉
				enabledDisabledList:'',//启用禁用下拉
				cardSceneTypeList:'',//评分卡应用场景
				uploadImgData: {
					supplierId: '',
					isImage: true
				},
			}
		},
		props: {
			guarantorId: {
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
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			scoreCardAddData: function(val, oldVal) {
				this.scoreCardAddData = val;
			}
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		created() {},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				if(!this.addGuarantor){
//					this.getGuarantorDetail(); //获取担保人详情数据
				}
//				this.getMaritalStatusList();//学历-状态下拉
				this.getCardTypeList();//评分卡类型下拉
				this.getEnabledDisabledList();//启用禁用下拉
				this.getCardSceneTypeList();//应用场景下拉
			}, // 初始化
			doSaveScoreCard(){//评分卡-保存
				if(!this.scoreCardAddData.cardNo){this.$message.error('评分卡编号不能为空！');return;}
				if(!this.scoreCardAddData.cardName){this.$message.error('评分卡名称不能为空！');return;}
				if(!this.scoreCardAddData.sceneType){this.$message.error('应用场景不能为空！');return;}
				if(!this.scoreCardAddData.cardType){this.$message.error('类型不能为空！');return;}
				if(!this.scoreCardAddData.strategyNo){this.$message.error('风控策略编号不能为空！');return;}
				if(this.scoreCardAddData.cardType=='SCORE'){
					if(!this.scoreCardAddData.thresholdALow){this.$message.error('阈值, A, 低值不能为空！');return;}
					if(!this.scoreCardAddData.thresholdAHigh){this.$message.error('阈值, A, 高值不能为空！');return;}
					if(!this.scoreCardAddData.thresholdBLow){this.$message.error('阈值, B, 低值不能为空！');return;}
					if(!this.scoreCardAddData.thresholdBHigh){this.$message.error('阈值, B, 高值不能为空！');return;}
					if(!this.scoreCardAddData.thresholdCLow){this.$message.error('阈值, C, 低值不能为空！');return;}
					if(!this.scoreCardAddData.thresholdCHigh){this.$message.error('阈值, C, 高值不能为空！');return;}
					if(!this.scoreCardAddData.thresholdDLow){this.$message.error('阈值, D, 低值不能为空！');return;}
					if(!this.scoreCardAddData.thresholdDHigh){this.$message.error('阈值, D, 高值不能为空！');return;}
				}
				if(!this.scoreCardAddData.status){this.$message.error('状态不能为空！');return;}
				let data = baseUtil.copy(this.scoreCardAddData)
				scoreCardDetail.scoreCardAdd(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						
						this.$router.replace({path:'/scoreCardManage/scoreCardDetail/'+res.data.data.cardId})
						//删除tabsView对应的view
						let views = this.$store.state.app.visitedViews;
						for(let i=0;i<views.length;i++){
							if(views[i].componentName==='scoreCardAdd'){
								this.$store.dispatch('DelVisitedViews', views[i]).then(() => {})
							}
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
				
			},
			getCardTypeList(){//评分卡类型下拉
				cardType().then(res => {
					if(res.data.code === '200') {
						this.cardTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getEnabledDisabledList(){//启用禁用下拉
				enabledDisabled().then(res => {
					if(res.data.code === '200') {
						this.enabledDisabledList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCardSceneTypeList(){//应用场景下拉
				cardSceneType().then(res => {
					if(res.data.code === '200') {
						this.cardSceneTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
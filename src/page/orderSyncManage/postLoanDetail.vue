<template>
	<div class="container">
		<div class="top">
			<ul class="flex-item">
				<li>{{detailHeadData.title}}</li>
				<!--<li>联系人：{{detailData.receiverName}}</li>
	      	<li>手机号：{{detailData.receiverPhone}}</li>-->
				<li>检查人员：{{detailHeadData.operatorName}}</li>
			</ul>
		</div>
		<div class="content">
			<div class="flex-item">
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane class="first_tab_content" label="基本信息" name="first">
						<div class="tab-content">
							<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="lh_title">融资基本信息</div>
								<div class="info-list">
									<el-row>
										<el-col :span="12">
											<el-form-item label="商户名称：">
												<span class="input_read">{{basicInfoData.supplierName}}</span>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="社会统一信用代码：">
												<template>
													<span class="input_read">{{basicInfoData.businessLicenseNo}}</span>
												</template>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="融资单号：">
												<span class="input_read">{{basicInfoData.financeNo}}</span>
												<router-link :to="'/financeManage/financeDetail/' + basicInfoData.financeNo" v-if="basicInfoData.financeNo != ''">
													<el-button type="primary" size="mini">详情</el-button>
												</router-link>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="产品名称：">
												<span class="input_read">{{basicInfoData.loanProductName}}</span>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="所属场景方">
												<span class="input_read">{{basicInfoData.partnerName}}</span>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="融资金额：">
												<span class="input_read">{{basicInfoData.financeAmt}} 元</span>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="融资期限：">
												<template>
													<span class="input_read">{{basicInfoData.loanMonths}} 个月</span>
												</template>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
								<div class="info-list">
									<el-form-item label="检查次序：">
										<template>
											<span class="input_read">{{basicInfoData.inspectTime}}</span>
										</template>
									</el-form-item>
									<el-form-item label="检查人员：">
										<template>
											<span v-if="readOnly" class="input_read">{{basicInfoData.operatorName}}</span>
											<el-select v-else v-model="basicInfoData.operatorId" filterable placeholder="请选择">
												<el-option v-for="(val,key) in inspectorList" :key="key" :label="val" :value="key">
												</el-option>
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="检查方式：">
										<template>
											<span v-if="readOnly" class="input_read">{{basicInfoData.inspectModeText}}</span>
											<el-select v-else v-model="basicInfoData.inspectMode" filterable placeholder="请选择">
												<el-option v-for="(val,key) in inspectModeList" :key="key" :label="val" :value="key">
												</el-option>
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="检查配合程度：">
										<template>
											<span v-if="readOnly" class="input_read">{{basicInfoData.cooperateDegreeText}}</span>
											<el-select v-else v-model="basicInfoData.cooperateDegree" filterable placeholder="请选择">
												<el-option v-for="(val,key) in cooperateDegreeList" :key="key" :label="val" :value="key">
												</el-option>
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="检查生成时间：">
										<template>
											<span class="input_read">{{basicInfoData.createTime}}</span>
										</template>
									</el-form-item>
									<el-form-item label="检查完成时间：">
										<template>
											<span class="input_read">{{basicInfoData.finishTime}}</span>
										</template>
									</el-form-item>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveBasicInfo" type="primary" size="mini">保存</el-button>
									</div>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="检查前准备工作" name="second">
						<div class="tab-content">
							<!--基于近期检查-->
							<el-collapse @change="changeVerifyRecebtRisk" v-model="activeVerifyRecebtRiskNames" class="marginBotten">
								<el-collapse-item name="recebtRiskOne">
									<template slot="title">
										基于近期检查
									</template>
									<el-form label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<el-form-item label="近期检查反映的风险点：">
												<el-input type="textarea" rows="4" class="must_input" :disabled="readOnly" v-model="recebtRiskData.recentRiskStr" style="width:100%;">
												</el-input>
											</el-form-item>
										</div>
									</el-form>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveRecebtRisk" type="primary" size="mini">保存</el-button>
									</div>
								</el-collapse-item>
							</el-collapse>
							<!--基于财务报表-->
							<el-collapse @change="changeVerifyFinancialReport" v-model="activeVerifyFinancialReportNames" class="marginBotten">
								<el-collapse-item name="financialReportOne">
									<template slot="title">
										基于财务报表
									</template>
									<el-form label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<el-form-item label="报表内容：">
												<span v-if="readOnly" class="input_read">{{financialReportData.financialReportTypeText}}</span>
												<template v-else-if="financialReportTypeList">
													<el-checkbox-group  class="must_input" v-model="financialReportData.financialReportType">
														<el-checkbox v-for="(val,key) in financialReportTypeList" :key="key" :label="key" :value="key">{{val}}</el-checkbox>
													</el-checkbox-group>
												</template>
											</el-form-item>
										</div>
										<div class="info-list">
											<div class="lh_title">存货情况</div>

											<el-form-item label="当前余额：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.stockBalance}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.stockBalance">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="上期检查（或调查）时点余额：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.stockBalanceLast}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.stockBalanceLast">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="是否较最近月份大幅增加（增幅超过30%）：">
												<span v-if="readOnly" class="input_read">{{financialReportData.stockGrowGrately?'是':'否'}}</span>
												<template v-else>
													<el-radio-group  class="must_input" v-model="financialReportData.stockGrowGrately">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
										</div>
										<div class="info-list">
											<div class="lh_title">应收账款情况</div>
											<el-form-item label="当前余额：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.receivableBalance}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.receivableBalance">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="上期检查（或调查）时点余额：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.receivableBalanceLast}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.receivableBalanceLast">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="是否较最近月份大幅增加（增幅超过30%）：">
												<span v-if="readOnly" class="input_read">{{financialReportData.receivableGrowGrately?'是':'否'}}</span>
												<template v-else>
													<el-radio-group  class="must_input" v-model="financialReportData.receivableGrowGrately">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
										</div>
										<div class="info-list">
											<div class="lh_title">银行借款情况</div>
											<el-form-item label="当前余额：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.bankLoanBalance}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.bankLoanBalance">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="上期检查（或调查）时点余额：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.bankLoanBalanceLast}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.bankLoanBalanceLast">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="是否有新增银行借款：">
												<span v-if="readOnly" class="input_read">{{financialReportData.bankLoanGrow?'是':'否'}}</span>
												<template v-else>
													<el-radio-group  class="must_input" v-model="financialReportData.bankLoanGrow">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
										</div>
										<div class="info-list">
											<div class="lh_title">销售情况</div>
											<el-form-item label="上期检查（或调查）至本次检查期间的销售额：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.saleAmount}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.saleAmount">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="剔除季节性因素后的销售额是否有大幅下降（降幅超30%）：">
												<span v-if="readOnly" class="input_read">{{financialReportData.saleDownGrately?'是':'否'}}</span>
												<template v-else>
													<el-radio-group  class="must_input" v-model="financialReportData.saleDownGrately">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
										</div>
										<div class="info-list">
											<div class="lh_title">现金流情况</div>
											<el-form-item label="上次检查（或调查）至本次检查期间的现金流：">
												<div style="width: 300px;">
													<span v-if="readOnly" class="input_read">{{financialReportData.cashAmount}} 元</span>
													<el-input v-else  class="must_input" v-model="financialReportData.cashAmount">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="剔除季节性因素后的现金流是否有大幅下降（降幅超30%）：">
												<span v-if="readOnly" class="input_read">{{financialReportData.cashDownGrately?'是':'否'}}</span>
												<template v-else>
													<el-radio-group  class="must_input" v-model="financialReportData.cashDownGrately">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
											<el-form-item label="是否与销售收入、经营收入相匹配：">
												<span v-if="readOnly" class="input_read">{{financialReportData.cashIncomeMatch?'是':'否'}}</span>
												<template v-else>
													<el-radio-group  class="must_input" v-model="financialReportData.cashIncomeMatch">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
										</div>
										<div class="info-list">
											<div class="lh_title">其他</div>
											<el-form-item label="上次检查（或调查）至本次检查期间的现金流：">
												<el-input type="textarea" rows="4"  class="must_input" :disabled="readOnly" v-model="financialReportData.financialOther" style="width: 100%">
												</el-input>
											</el-form-item>
										</div>
									</el-form>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveFinancialReport" type="primary" size="mini">保存</el-button>
									</div>
								</el-collapse-item>
							</el-collapse>
							<!--基于征信报告-->
							<el-collapse @change="changeVerifyCreditInfo" v-model="activeVerifyCreditInfoNames" class="marginBotten">
								<el-collapse-item name="creditInfoOne">
									<template slot="title">
										基于征信报告
									</template>
									<el-form label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<el-form-item label="征信报告查询日期：">
												<span v-if="readOnly" class="input_read">{{creditInfoData.creditQueryDate}}</span>
												<template v-else>
													<el-date-picker  class="must_input" v-model="creditInfoData.creditQueryDate" type="date" placeholder="选择日期">
													</el-date-picker>
												</template>
											</el-form-item>
											<el-form-item label="当前企业及个人征信情况（注明征信查询分类结果）：">
												<span v-if="readOnly" class="input_read">{{creditInfoData.creditInfo}}</span>
												<el-input v-else  class="must_input" type="textarea" rows="4" v-model="creditInfoData.creditInfo" style="width:100%;">
												</el-input>
											</el-form-item>
											<el-form-item label="征信记录是否有异常变化：">
												<span v-if="readOnly" class="input_read">{{creditInfoData.creditAbnormal?'是':'否'}}</span>
												<template v-else>
													<el-radio-group v-model="creditInfoData.creditAbnormal">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
												<el-input type="textarea" rows="4"  class="must_input" :disabled="readOnly" v-model="creditInfoData.creditAbnormalInfo" style="width:100%;">
												</el-input>
											</el-form-item>
										</div>
									</el-form>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveCreditInfo" type="primary" size="mini">保存</el-button>
									</div>
								</el-collapse-item>
							</el-collapse>
							<!--基于网络查询-->
							<el-collapse @change="changeVerifyNegativeInfo" v-model="activeVerifyNegativeInfoNames" class="marginBotten">
								<el-collapse-item name="negativeInfoOne">
									<template slot="title">
										基于网络查询
									</template>
									<el-form label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<el-form-item label="企业是否有公开的负面信息（如商业纠纷、法律诉讼、安全事件等）：">
												<span v-if="readOnly" class="input_read">{{negativeInfoData.negative?'是':'否'}}</span>
												<template v-else>
													<el-radio-group   v-model="negativeInfoData.negative">
														<el-radio :label="true">是</el-radio>
														<el-radio :label="false">否</el-radio>
													</el-radio-group>
												</template>
												<el-input type="textarea" rows="4"  class="must_input" :disabled="readOnly" v-model="negativeInfoData.negativeInfo" style="width:100%;">
												</el-input>
											</el-form-item>
										</div>
									</el-form>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveNegativeInfo" type="primary" size="mini">保存</el-button>
									</div>
								</el-collapse-item>
							</el-collapse>
							<!--平台交易数据-->
							<el-collapse @change="changeVerifyPlatformTradeInfo" v-model="activeVerifyPlatformTradeInfoNames" class="marginBotten">
								<el-collapse-item name="platformTradeInfoOne">
									<template slot="title">
										平台交易数据
									</template>
									<el-form label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<el-form-item label="平台交易数据说明：">
												<el-input type="textarea" rows="4"  class="must_input" :disabled="readOnly" v-model="platformTradeInfoData.platformTradeInfo" style="width:100%;">
												</el-input>
											</el-form-item>
										</div>
									</el-form>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSavePlatformTradeInfo" type="primary" size="mini">保存</el-button>
									</div>
								</el-collapse-item>
							</el-collapse>

						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="检查要点" name="three">
						<div class="tab-content">
							<!--检查要点-企业基本情况-->
							<el-collapse @change="changeVerifyInspectEnterpriseInfo" v-model="activeVerifyInspectEnterpriseInfoNames" class="marginBotten">
								<el-collapse-item name="inspectEnterpriseInfoOne">
									<template slot="title">
										企业基本情况
									</template>
									<el-form label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<template v-if="inspectEnterpriseInfoData">
												<el-table :data="inspectEnterpriseInfoData" border style="width: 100%;margin-bottom: 20px;">
													<el-table-column prop="text" label="检查要点">
														<template slot-scope="scope">
															<div>{{scope.row.text}}</div>
															<el-input v-if="scope.row.status==1" type="textarea" v-model="scope.row.content"></el-input>
														</template>
													</el-table-column>
													<el-table-column prop="status" label="有" align="center" width="120">
														<template slot-scope="scope">
															<input type="radio" :name="scope.row.key" :id="scope.row.key + 1" value="1" v-model="scope.row.status">
															<label :class="scope.row.status=='1'?'radio_label_checked':'radio_label'" :for="scope.row.key + 1">
							      		有
							      	</label>
														</template>
													</el-table-column>
													<el-table-column prop="status" label="无" align="center" width="120">
														<template slot-scope="scope">
															<input class="cursor_a" type="radio" :name="scope.row.key" :id="scope.row.key + 0" value="0" v-model="scope.row.status">
															<label :class="scope.row.status=='0'?'radio_label_checked':'radio_label'" :for="scope.row.key + 0">
							      		无
							      	</label>
														</template>
													</el-table-column>
												</el-table>
											</template>
										</div>
									</el-form>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveInspectEnterpriseInfo" type="primary" size="mini">保存</el-button>
									</div>
								</el-collapse-item>
							</el-collapse>
							<!--检查要点-企业经营情况-->
							<el-collapse @change="changeVerifyInspectEnterpriseBusiness" v-model="activeVerifyInspectEnterpriseBusinessNames" class="marginBotten">
								<el-collapse-item name="inspectEnterpriseBusinessOne">
									<template slot="title">
										企业经营情况
									</template>
									<el-form label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<template v-if="inspectEnterpriseBusinessData">
												<el-table :data="inspectEnterpriseBusinessData" border style="width: 100%;margin-bottom: 20px;">
													<el-table-column prop="text" label="检查要点">
														<template slot-scope="scope">
															<div>{{scope.row.text}}</div>
															<el-input v-if="scope.row.status==1" type="textarea" v-model="scope.row.content"></el-input>
														</template>
													</el-table-column>
													<el-table-column prop="status" label="有" align="center" width="120">
														<template slot-scope="scope">
															<input type="radio" :name="scope.row.key" :id="scope.row.key + 1" value="1" v-model="scope.row.status">
															<label :class="scope.row.status=='1'?'radio_label_checked':'radio_label'" :for="scope.row.key + 1">
							      		有
							      	</label>
														</template>
													</el-table-column>
													<el-table-column prop="status" label="无" align="center" width="120">
														<template slot-scope="scope">
															<input class="cursor_a" type="radio" :name="scope.row.key" :id="scope.row.key + 0" value="0" v-model="scope.row.status">
															<label :class="scope.row.status=='0'?'radio_label_checked':'radio_label'" :for="scope.row.key + 0">
							      		无
							      	</label>
														</template>
													</el-table-column>
												</el-table>
											</template>
										</div>
									</el-form>
									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveInspectEnterpriseBusiness" type="primary" size="mini">保存</el-button>
									</div>
								</el-collapse-item>
							</el-collapse>
						</div>
					</el-tab-pane>
					<el-tab-pane class="tab_content" label="检查结论" name="fore">
						<div class="tab-content">
							<el-form label-width="190px" size="mini" label-position="right">
								<div class="info-list">
									<div class="lh_title">检查结论</div>
									<el-form-item label="是否存在风险：">
										<span v-if="readOnly" class="input_read">
											<span v-if="conclusionRiskData.conclusionRisk!==null">
												{{conclusionRiskData.conclusionRisk?'是':'否'}}
											</span>
										</span>
										<template v-else>
											<el-radio-group  class="must_input" v-model="conclusionRiskData.conclusionRisk">
												<el-radio :label="true">是</el-radio>
												<el-radio :label="false">否</el-radio>
											</el-radio-group>
										</template>
									</el-form-item>
									<el-form-item label="风险说明：">
										<el-input type="textarea" rows="4"  class="must_input" :disabled="readOnly" v-model="conclusionRiskData.conclusionRiskInfo" style="width:100%;">
										</el-input>
									</el-form-item>
									<el-form-item label="检查结论及措施建议：">
										<el-input type="textarea" rows="4"  class="must_input" :disabled="readOnly" v-model="conclusionRiskData.conclusionSuggestion" style="width:100%;">
										</el-input>
									</el-form-item>

									<div v-if="!readOnly" style="text-align: right;">
										<el-button @click="doSaveConclusionRisk" type="primary" size="mini">保存</el-button>
									</div>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<!--tab-->
			<div class="flex-item">
				<ul>
					<li class="background-gray color-black">
						<div>操作</div>
					</li>
					<li v-if="!readOnly">
						<div class="fk_btn_box">
							<el-button @click="doinspectFinish" type="success">确认检查完成</el-button>
						</div>
					</li>
					<li v-if="!readOnly">
						<div class="fk_btn_box">
							<el-button @click="doDeleteInspect" type="info">删除</el-button>
						</div>
					</li>
					<!--<li style="padding: 10px 0;">
						<el-button :type="detailData.capticalStatus==='COOPERATING'?'success':''" style="width: 80%;margin: auto;">{{detailData.capticalStatusText}}</el-button>
					</li>-->
				</ul>
			</div>
			<!--左侧操作栏-->
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import postLoanDetail from '@/api/orderSyncManage/postLoanDetail'
	import { validContent } from '@/utils/validate'
	import { Format } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'postLoanDetail',
		components: {
			Upload
		},
		data() {
			return {
				id: '', // id
				activeVerifyRecebtRiskNames: 'recebtRiskOne', //基于近期检查默认项
				activeVerifyFinancialReportNames: 'financialReportOne', //基于财务报表默认项
				activeVerifyCreditInfoNames: 'creditInfoOne', //基于征信报告默认项
				activeVerifyNegativeInfoNames: 'negativeInfoOne', //基于网络查询默认项
				activeVerifyPlatformTradeInfoNames: 'platformTradeInfoOne', //平台交易数据默认项
				activeVerifyInspectEnterpriseInfoNames: 'inspectEnterpriseInfoOne', //检查要点-企业基本情况默认项
				activeVerifyInspectEnterpriseBusinessNames: 'inspectEnterpriseBusinessOne', //检查要点-企业经营情况默认项
				recebtRiskData: '', //基于近期检查
				financialReportData: '', //基于财务报表
				financialReportTypeList: '', //报表内容多选框
				creditInfoData: '', //基于征信报告
				negativeInfoData: '', //基于网络查询
				platformTradeInfoData: '', //平台交易数据
				inspectEnterpriseInfoData: '', //检查要点-企业基本情况数据
				inspectEnterpriseBusinessData: '', //检查要点-企业经营情况数据
				conclusionRiskData: '', //检查结论数据
				detailHeadData: '', //头部数据
				basicInfoData: '', //基本信息
				inspectorList: '', //检查人员-下拉列表
				inspectModeList: '', //检查方式-下拉列表
				cooperateDegreeList: '', //检查配合程度-下拉列表
				activeName2: 'first',

				tableData: [],
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata'
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			]),
			readOnly() { //状态 INIT("初始化"),SUCCESS ("检查完成");
				if(this.detailHeadData.status === 'SUCCESS') {
					return true
				} else {
					return false
				}
			}
		},
		created() {
			this.id = this.$route.params.id
			if(this.id) {
				this.init()
			}
		},
		mounted() {},
		methods: {
			fetchdata() {
				this.id = this.$route.params.id
				if(this.id) {
					/*this.init()*/
				}
			},
			handleClick(tab) {
				if(tab.index === '0') { //基本信息
					this.getBasicInfoData(); //基本信息
				} else if(tab.index === '1') { //检查前准备工作
					this.getRecebtRiskData(); //基于近期检查-查询
					this.getFinancialReportData(); //基于财务报表-查询
					this.getFinancialReportTypeList(); //基于财务报表-报表内容多选框
					this.getCreditInfoData(); //基于征信报告-查询
					this.getNegativeInfoData(); //基于网络查询-查询
					this.getPlatformTradeInfoData(); //平台交易数据-查询
				} else if(tab.index === '2') { //检查要点
					this.getInspectEnterpriseInfoData(); //检查要点-企业基本情况-查询
					this.getInspectEnterpriseBusinessData(); //检查要点-企业经营情况-查询
				} else if(tab.index === '3') { //检查结论
					this.getConclusionRiskData(); //检查结论-查询
				}
			},
			init() {
				this.getDetailHeadData(); //头部信息
				this.getBasicInfoData(); //基本信息
				this.getInspectorList(); //检查人员-下拉列表
				this.getInspectModeList(); //检查方式-下拉列表
				this.getCooperateDegreeList(); //检查配合程度-下拉列表
			}, // 初始化

			changeVerifyRecebtRisk(val) { //展开基于近期检查
				if(val.length === 0) {
					return
				}
				this.getRecebtRiskData(); //基于近期检查-查询
			},
			changeVerifyFinancialReport(val) { //展开基于财务报表
				if(val.length === 0) {
					return
				}
				this.getFinancialReportData(); //基于财务报表-查询
				this.getFinancialReportTypeList(); //基于财务报表-报表内容多选框
			},
			changeVerifyCreditInfo(val) { //展开基于征信报告
				if(val.length === 0) {
					return
				}
				this.getCreditInfoData(); //基于征信报告-查询
			},
			changeVerifyNegativeInfo(val) { //展开基于网络查询
				if(val.length === 0) {
					return
				}
				this.getNegativeInfoData(); //基于网络查询-查询
			},
			changeVerifyPlatformTradeInfo(val) { //展开平台交易数据
				if(val.length === 0) {
					return
				}
				this.getPlatformTradeInfoData(); //平台交易数据-查询
			},
			changeVerifyInspectEnterpriseInfo(val) { //展开检查要点-企业基本情况
				if(val.length === 0) {
					return
				}
				this.getInspectEnterpriseInfoData(); //检查要点-企业基本情况-查询
			},
			changeVerifyInspectEnterpriseBusiness(val) { //展开检查要点-企业经营情况
				if(val.length === 0) {
					return
				}
				this.getInspectEnterpriseBusinessData(); //检查要点-企业经营情况-查询
			},
			getDetailHeadData() { //头部信息
				postLoanDetail.detailHead(this.id).then(res => {
					if(res.data.code === '200') {
						this.detailHeadData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getBasicInfoData() { //基本信息
				postLoanDetail.basicInfo(this.id).then(res => {
					if(res.data.code === '200') {
						this.basicInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveBasicInfo() { //保存基本信息
				let data = baseUtil.copy(this.basicInfoData)
				data.id = this.id
				postLoanDetail.saveBasicInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getRecebtRiskData() { //基于近期检查-查询
				postLoanDetail.recebtRisk(this.id).then(res => {
					if(res.data.code === '200') {
						this.recebtRiskData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveRecebtRisk() { //基于近期检查-保存
				if(!this.recebtRiskData.recentRiskStr){this.$message.error('近期检查反映的风险点不能为空！'); return;}
				let data = baseUtil.copy(this.recebtRiskData)
				data.id = this.id
				postLoanDetail.saveRecebtRisk(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getFinancialReportData() { //基于财务报表-查询
				postLoanDetail.financialReport(this.id).then(res => {
					if(res.data.code === '200') {
						this.financialReportData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getFinancialReportTypeList() { //基于财务报表-报表内容多选框
				postLoanDetail.financialReportType().then(res => {
					if(res.data.code === '200') {
						this.financialReportTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveFinancialReport() { //基于财务报表-保存
				if(!(this.financialReportData.financialReportType.length>0)){this.$message.error('报表内容不能为空！'); return;}
				if(!this.financialReportData.stockBalance){this.$message.error('存货情况-当前余额不能为空！'); return;}
				if(!this.financialReportData.stockBalanceLast){this.$message.error('存货情况-上期检查余额不能为空！'); return;}
				if((typeof this.financialReportData.stockGrowGrately)!=='boolean'){this.$message.error('存货情况-是否较最近大幅增加不能为空！'); return;}
				if(!this.financialReportData.receivableBalance){this.$message.error('应收账款-当前余额不能为空！'); return;}
				if(!this.financialReportData.receivableBalanceLast){this.$message.error('应收账款-上期余额不能为空！'); return;}
				if((typeof this.financialReportData.receivableGrowGrately)!=='boolean'){this.$message.error('应收账款-是否较最近月份大幅增加不能为空！'); return;}
				if(!this.financialReportData.bankLoanBalance){this.$message.error('银行借款-当前余额不能为空！'); return;}
				if(!this.financialReportData.bankLoanBalanceLast){this.$message.error('银行借款-上期余额不能为空！'); return;}
				if((typeof this.financialReportData.bankLoanGrow)!=='boolean'){this.$message.error('银行借款-是否有新增不能为空！'); return;}
				if(!this.financialReportData.saleAmount){this.$message.error('上期至本次检查期间的销售额不能为空！'); return;}
				if((typeof this.financialReportData.saleDownGrately)!=='boolean'){this.$message.error('剔除季节性因素后的销售额是否有大幅下降不能为空！'); return;}
				if(!this.financialReportData.cashAmount){this.$message.error('上次检查至本次检查期间的现金流不能为空！'); return;}
				if((typeof this.financialReportData.cashDownGrately)!=='boolean'){this.$message.error('剔除季节性因素后的现金流是否有大幅下降不能为空！'); return;}
				if((typeof this.financialReportData.cashIncomeMatch)!=='boolean'){this.$message.error('是否与销售收入经营收入相匹配不能为空！'); return;}
				if(!this.financialReportData.financialOther){this.$message.error('其它不能为空！'); return;}
				let data = baseUtil.copy(this.financialReportData)
				data.financialReportType = data.financialReportType.join();
				data.id = this.id
				postLoanDetail.saveFinancialReport(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCreditInfoData() { //基于征信报告-查询
				postLoanDetail.creditInfo(this.id).then(res => {
					if(res.data.code === '200') {
						this.creditInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveCreditInfo() { //基于征信报告-保存
				if(!this.creditInfoData.creditQueryDate){this.$message.error('征信报告查询日期不能为空！'); return;}
				if(!this.creditInfoData.creditInfo){this.$message.error('当前企业及个人征信情况不能为空！'); return;}
				if((typeof this.creditInfoData.creditAbnormal)!=='boolean'){this.$message.error('征信记录是否有异常变化不能为空！'); return;}
				if(!this.creditInfoData.creditAbnormalInfo){this.$message.error('征信记录异常变化情况不能为空！'); return;}
				let data = baseUtil.copy(this.creditInfoData)
				if(data.creditQueryDate && (typeof data.creditQueryDate) === 'object') {
					data.creditQueryDate = Format(data.creditQueryDate, 'yyyy-MM-dd');
				}
				data.id = this.id
				postLoanDetail.saveCreditInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getNegativeInfoData() { //基于网络查询-查询
				postLoanDetail.negativeInfo(this.id).then(res => {
					if(res.data.code === '200') {
						this.negativeInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveNegativeInfo() { //基于网络查询-保存
				if((typeof this.negativeInfoData.negative)!=='boolean'){this.$message.error('企业是否公开的负面信息不能为空！'); return;}
				if(!this.negativeInfoData.negativeInfo){this.$message.error('企业负面信息说明不能为空！'); return;}
				let data = baseUtil.copy(this.negativeInfoData)
				data.id = this.id
				postLoanDetail.saveNegativeInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getPlatformTradeInfoData() { //平台交易数据-查询
				postLoanDetail.platformTradeInfo(this.id).then(res => {
					if(res.data.code === '200') {
						this.platformTradeInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSavePlatformTradeInfo() { //平台交易数据-保存
				if(!this.platformTradeInfoData.platformTradeInfo){this.$message.error('平台交易数据说明不能为空！'); return;}
				let data = baseUtil.copy(this.platformTradeInfoData)
				data.id = this.id
				postLoanDetail.savePlatformTradeInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectEnterpriseInfoData() { //检查要点-企业基本情况-查询
				postLoanDetail.inspectEnterpriseInfo(this.id).then(res => {
					if(res.data.code === '200') {
						this.inspectEnterpriseInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveInspectEnterpriseInfo() { //检查要点-企业基本情况-保存
				let data = baseUtil.copy(this.inspectEnterpriseInfoData)
				data.inspectInfo = JSON.stringify(data)
				data.id = this.id
				postLoanDetail.saveInspectEnterpriseInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectEnterpriseBusinessData() { //检查要点-企业经营情况-查询
				postLoanDetail.inspectEnterpriseBusiness(this.id).then(res => {
					if(res.data.code === '200') {
						this.inspectEnterpriseBusinessData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveInspectEnterpriseBusiness() { //检查要点-企业经营情况-保存
				let data = baseUtil.copy(this.inspectEnterpriseBusinessData)
				data.businessInfo = JSON.stringify(data)
				data.id = this.id
				postLoanDetail.saveInspectEnterpriseBusiness(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getConclusionRiskData() { //检查结论-查询
				postLoanDetail.conclusionRisk(this.id).then(res => {
					if(res.data.code === '200') {
						this.conclusionRiskData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveConclusionRisk() { //检查结论-保存
				if((typeof this.conclusionRiskData.conclusionRisk)!=='boolean'){this.$message.error('是否存在风险不能为空！'); return;}
				if(!this.conclusionRiskData.conclusionRiskInfo){this.$message.error('风险说明不能为空！'); return;}
				if(!this.conclusionRiskData.conclusionSuggestion){this.$message.error('检查结论及措施建议不能为空！'); return;}
				let data = baseUtil.copy(this.conclusionRiskData)
				data.id = this.id
				postLoanDetail.saveConclusionRisk(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doinspectFinish() { //确认检查完成
				let that = this;
				this.$confirm('确认检查完成？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					postLoanDetail.inspectFinish(that.id).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.getDetailHeadData(); //头部信息
							this.getBasicInfoData(); //基本信息
							this.getRecebtRiskData(); //基于近期检查-查询
							this.getFinancialReportData(); //基于财务报表-查询
							this.getFinancialReportTypeList(); //基于财务报表-报表内容多选框
							this.getCreditInfoData(); //基于征信报告-查询
							this.getNegativeInfoData(); //基于网络查询-查询
							this.getPlatformTradeInfoData(); //平台交易数据-查询
							this.getInspectEnterpriseInfoData(); //检查要点-企业基本情况-查询
							this.getInspectEnterpriseBusinessData(); //检查要点-企业经营情况-查询
							this.getConclusionRiskData(); //检查结论-查询
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			doDeleteInspect() { //删除
				let that = this;
				this.$confirm('此操作将永久删除贷后检查登记确认删除？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					postLoanDetail.deleteInspect(that.id).then(res => {
						if(res.data.code === '200') {
							this.$router.replace({
								path: '/orderSyncManage/postLoanRegistList'
							})
							this.$message.success(res.data.message)
							//删除tabsView对应的view
							let views = this.$store.state.app.visitedViews;
							for(let i = 0; i < views.length; i++) {
								if(views[i].componentName === 'postLoanDetail') {
									this.$store.dispatch('DelVisitedViews', views[i]).then(() => {})
								}
							}
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			getInspectorList() { //检查人员-下拉列表
				postLoanDetail.inspectorList().then(res => {
					if(res.data.code === '200') {
						this.inspectorList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInspectModeList() { //检查方式-下拉列表
				postLoanDetail.inspectMode().then(res => {
					if(res.data.code === '200') {
						this.inspectModeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCooperateDegreeList() { //检查配合程度-下拉列表
				postLoanDetail.cooperateDegree().then(res => {
					if(res.data.code === '200') {
						this.cooperateDegreeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "postLoanDetail.scss";
</style>
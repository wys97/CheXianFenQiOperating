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
			<ul class="flex-item" v-if="basicData">
				<li>{{basicData.supplierName}} , {{basicData.financeNo}} , {{basicData.loanClassificationText}}</li>
				<li></li>
			</ul>
		</div>
		<div class="content">
			<div class="flex-item" style="position: relative;width: 100%;">
				<el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
					<el-tab-pane label="融资基本信息" name="first">
						<div class="tab-content" v-if="basicData">
							<el-form label-width="170px" size="mini" label-position="right">
								<div class="info-list">
									<div class="lh_title">融资基本信息</div>
									<el-row>
										<el-col :span="12">
											<el-form-item label="商户名称：">
												<span class="input_read">{{basicData.supplierName}}</span>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="社会统一信用代码：">
												<span class="input_read">{{basicData.businessLicenseNo}}</span>
											</el-form-item>
										</el-col>
									</el-row>
									<el-form-item label="融资单号：">
										<span class="input_read">{{basicData.financeNo}}</span>
									</el-form-item>
									<el-row>
										<el-col :span="12">
											<el-form-item label="融资金额：">
												<span class="input_read">{{basicData.financeAmount}} 元</span>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="融资期限：">
												<span class="input_read">{{basicData.loanMonths}} 个月</span>
											</el-form-item>
										</el-col>
									</el-row>
									<el-form-item label="应还金额：">
										<span class="input_read">{{basicData.refundAmount}} 元</span>
									</el-form-item>
									<el-form-item label="已还金额：">
										<span class="input_read">{{basicData.repaymentAmount}} 元</span>
									</el-form-item>
									<el-form-item label="贷款五级分类：">
										<span class="input_read">{{basicData.loanClassificationText}}</span>
									</el-form-item>
									<el-form-item label="结欠金额：">
										<span class="input_read">{{basicData.clearAmount}} 元</span>
									</el-form-item>
									<el-form-item label="剩余欠款金额：">
										<span class="input_read">{{basicData.surplusClearAmount}} 元</span>
									</el-form-item>
									<el-row>
										<el-col :span="12">
											<el-form-item label="是否核销：">
												<span>{{basicData.writtenOff?'是':'否'}}</span>
												<el-button @click="doConfirmWrittenOff" size="mini" :disabled="basicData.writtenOff?true:false">确认核销</el-button>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="损失贷款金额：">
												<span class="input_read">{{basicData.lossAmount}} 元</span>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
								<div class="info-list" v-if="!basicData.writtenOff">
									<div class="lh_title">调整登记</div>
									<div class="table_top" style="text-align: center;line-height: 40px;margin-bottom: 20px;">
										<el-row style="margin-bottom: 0;">
											<el-col :span="4" class="table_th">调整前</el-col>
											<el-col :span="4" class="table_th">调整后</el-col>
											<el-col :span="4" class="table_th">调整日期</el-col>
											<el-col :span="4" class="table_th">调出金额</el-col>
											<el-col :span="6" class="table_th">调整理由</el-col>
										</el-row>
										<el-row style="margin-bottom: 0;">
											<el-col :span="4" class="table_td" style="line-height: 60px;">
												{{basicData.loanClassificationText}}
											</el-col>
											<el-col :span="4" class="table_td" style="line-height: 60px;">
												<el-select v-model="loanClassificationDetailRecordForm.loanClassificationAfter" placeholder="请选择">
													<el-option v-for="(val,key) in loanClassificationTypeList" :key="key" :label="val" :value="key"></el-option>
												</el-select>
											</el-col>
											<el-col :span="4" class="table_td" style="line-height: 60px;">
												<template>
													<el-date-picker v-model="loanClassificationDetailRecordForm.adjustDate" type="date" placeholder="选择日期">
													</el-date-picker>
												</template>
											</el-col>
											<el-col :span="4" class="table_td" style="line-height: 60px;">
												<template>
													<el-input v-model="loanClassificationDetailRecordForm.clearAmount" type="number">
														<template slot="append">元</template>
													</el-input>
												</template>
											</el-col>
											<el-col :span="6" class="table_td" style="line-height: 60px;">
												<template>
													<el-input type="textarea" v-model="loanClassificationDetailRecordForm.remark">
													</el-input>
												</template>
											</el-col>
										</el-row>
									</div>
						    		<div style="text-align: right;">
										<el-button  @click="doSaveCreditLineDetailRecordForm" type="primary" size="mini">保存</el-button>
					                </div>
								</div>
								<div class="info-list">
									<div class="lh_title">调整记录</div>
									<template v-if="loanClassificationDetailRecordList">
										<el-table :data="loanClassificationDetailRecordList" border style="width: 100%">
											<template>
												<el-table-column prop="loanClassificationBeforeText" label="调整前">
													<template slot-scope="scope">
														<span class="table_input_read">{{scope.row.loanClassificationBeforeText?scope.row.loanClassificationBeforeText:'-'}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="loanClassificationAfterText" label="调整后">
													<template slot-scope="scope">
														<span class="table_input_read">{{scope.row.loanClassificationAfterText?scope.row.loanClassificationAfterText:'-'}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="adjustDate" label="调整日期">
													<template slot-scope="scope">
														<span class="table_input_read">{{scope.row.adjustDate?scope.row.adjustDate:'-'}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="clearAmount" label="调出金额">
													<template slot-scope="scope">
														<span class="table_input_read">{{scope.row.clearAmount?scope.row.clearAmount:'-'}} 元</span>
													</template>
												</el-table-column>
												<el-table-column prop="remark" label="调整理由	">
													<template slot-scope="scope">
														<span class="table_input_read">{{scope.row.remark?scope.row.remark:'-'}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="registerTime" label="登记时间">
													<template slot-scope="scope">
														<span class="table_input_read">{{scope.row.registerTime?scope.row.registerTime:'-'}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="delete" width="70" label="操作">
													<template slot-scope="scope" v-if="scope.row.delete">
														<el-button @click="deleteCreditLineDetailRecord(scope.row.id)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
													</template>
												</el-table-column>
											</template>
										</el-table>
									</template>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
				</el-tabs>
				<!--<div style="position: absolute;right: 20px;top: 10px;">
        	<el-button @click="validationInfoShow" size="mini">信息校验与认证</el-button>
        	<el-button @click="communicationRecordShow" size="mini">沟通记录</el-button>
        </div>-->
			</div>
			<!--tab-->
		</div>
		<el-dialog title="基础信息核查" :visible.sync="inspectionDialogShow" fullscreen custom-class='supplier-detail-dialog'>
			<div class="dialog-content">
				<div>
					<span style="float: left;"></span>命中审核项：0条
					<span style="float: right;">无异常</span>
				</div>
				<div style="margin: 20px 0;line-height: 30px;">
					<el-row style="background-color: #e9ecf3;padding: 0 15px;">
						<el-col :span="8">审核项</el-col>
						<el-col :span="4" :offset="11">是否命中</el-col>
					</el-row>
					<el-row style="padding: 0 15px;">
						<el-col :span="8">企业存在系统黑名单中？</el-col>
						<el-col :span="4" :offset="12">否</el-col>
					</el-row>
					<el-row style="padding: 0 15px;">
						<el-col :span="8">法人存在系统黑名单中？</el-col>
						<el-col :span="4" :offset="12">否</el-col>
					</el-row>
					<el-row style="padding: 0 15px;">
						<el-col :span="8">申请人存在系统黑名单中？</el-col>
						<el-col :span="4" :offset="12">否</el-col>
					</el-row>
					<el-row style="padding: 0 15px;">
						<el-col :span="8">企业已存在合作名单中？</el-col>
						<el-col :span="4" :offset="12">否</el-col>
					</el-row>
					<el-row style="padding: 0 15px;">
						<el-col :span="8">法人已存在合作名单中？</el-col>
						<el-col :span="4" :offset="12">否</el-col>
					</el-row>
				</div>
			</div>
		</el-dialog>
		<!---初审核-->
		<el-dialog title="选择核心企业" :visible.sync="centreListDialogShow" fullscreen custom-class='supplier-detail-dialog'>
			<div class="dialog-content">
				<template>
					<el-checkbox-group v-model="centreCheckList">
						<div v-for="item in centreList">
							<el-checkbox :label="item.id" border style="width: 100%;margin-top: 10px;">
								{{item.name}}
							</el-checkbox>
						</div>
					</el-checkbox-group>
				</template>
			</div>
			<template>
				<div slot="footer" class="dialog-footer">
					<div></div>
					<div>
						<el-button type="primary" @click="saveCentreList()">保存</el-button>
					</div>
				</div>
			</template>
		</el-dialog>
		<!---初审核-->

		<el-dialog title="打回原因" :visible.sync="approveRejectDialogShow" width="400px">
			<p>修改项：</p>
			<div class="checkbox-group">
				<el-checkbox-group v-model="approveRejectData.amendItems" v-if="registerStage === 'BASIC'">
					<el-checkbox label="LICENSE">企业营业执照</el-checkbox>
					<el-checkbox label="REPRE">法人身份证</el-checkbox>
					<el-checkbox label="ACCOUNT">企业对公账户</el-checkbox>
				</el-checkbox-group>
				<el-checkbox-group v-model="approveRejectData.amendItems" v-else-if="registerStage === 'VERIFY'">
					<el-checkbox label="coreEnterpriseContract">核心企业合作合同有效</el-checkbox>
					<el-checkbox label="coreEnterpriseTradeNum">核心企业交易账号有效</el-checkbox>
					<!--<el-checkbox :label="item.centreId" :key="item.centreId" v-for="(item, index) in queryTradeData">{{item.centreName}}</el-checkbox>-->
				</el-checkbox-group>
				<el-checkbox-group v-model="approveRejectData.amendItems" v-else-if="registerStage === 'SIGN'">
					<el-checkbox label="signLimit">总授信额度</el-checkbox>
					<el-checkbox label="signInterest">授信利息</el-checkbox>
					<!--<el-checkbox :label="item.centreId" :key="item.centreId" v-for="(item, index) in queryTradeData">{{item.centreName}}</el-checkbox>-->
				</el-checkbox-group>
			</div>
			<div>
				<el-input type="textarea" :rows="3" v-model="approveRejectData.amendRemark"></el-input>
			</div>
			<div slot="footer">
				<el-button @click="approveRejectDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="doApproveReject">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="请填写拒绝原因：" :visible.sync="rejectDialogShow" width="400px">
			<div>
				<el-input type="textarea" :rows="3" v-model="remark"></el-input>
			</div>
			<div slot="footer">
				<el-button @click="rejectDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="approveFinal()">提 交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="贸易统计" :visible.sync="tradeRmSummaryShow" fullscreen custom-class='supplier-detail-dialog'>
			<div style="position: absolute;top: 20px;left: 120px;">
				<el-button @click="doRefreshTrade" size="mini">刷新</el-button>
			</div>
			<div class="trade-dialog-content">
				<template v-if="tradeRmSummaryData.length > 0">
					<p class="title"></p>
					<!-- <p class="title">平台贸易时长{{tradeRmSummaryData[tradeRmSummaryTab]['platformTradingHours']}}月，交易金额{{tradeRmSummaryData[tradeRmSummaryTab]['nearlyOneYearSettlementAmount']}}/年</p>-->
					<el-tabs v-model="tradeRmSummaryTab" type="card">
						<el-tab-pane v-for="(item, index) in tradeRmSummaryData" :label="item.platformName" :name=" '' + index" :key="index">
							<p style="font-size: 20px;margin-top: 15px;">{{item.vendorName}} , {{item.vendorCode}}</p>
							<p class="des">统计：</p>
							<ul class="statistics-ul">
								<li><span>平台累计时长：</span><span>{{item.platformTradingHours}}（月）</span></li>
								<li><span>平台累计结算金额：</span><span>{{item.nearlyOneYearSettlementAmount}}</span></li>
							</ul>
							<ul class="statistics-ul" style="margin-top: 10px;">
								<li><span>近3个月月均回款比例：</span><span>{{item.threeMonthlyReceivableRatio}}</span></li>
								<li><span>近3个月月均结算金额：</span><span>{{item.threeMonthlyAvgAmt}}</span></li>
							</ul>
							<p class="des">近12个月：</p>
							<ul class="latest-month-ul">
								<li>
									<div>结算金额(元/月)</div>
									<div class="c_black">{{item.settlementAmount}}<br /></div>
								</li>
								<li>
									<div>应付金额(元/月)</div>
									<div class="c_black">{{item.amountPayable}}</div>
								</li>
								<li>
									<div>结算最大月份(元)</div>
									<div class="c_black">{{item.settlementMonth}}</div>
								</li>
								<li>
									<div>结算最小月份(元)</div>
									<div class="c_black">{{item.settlementMinimumMonth}}</div>
								</li>
								<li>
									<div>采购单(单/月)</div>
									<div class="c_black">{{item.purchaseOrder}}</div>
								</li>
								<li>
									<div>发货单(单/月)</div>
									<div class="c_black">{{item.invoice}}</div>
								</li>
								<li>
									<div>收货单(单/月)</div>
									<div class="c_black">{{item.receipts}}</div>
								</li>
								<li>
									<div>支付预付(单/月)</div>
									<div class="c_black">{{item.payingInAdvance}}</div>
								</li>
							</ul>
							<NoteChart :chartData="item"></NoteChart>
						</el-tab-pane>
					</el-tabs>
				</template>
			</div>
		</el-dialog>
		<el-dialog title="评分卡" :visible.sync="scoreCardShow" fullscreen width="700" custom-class='supplier-detail-dialog'>
			<div class="trade-dialog-content">
				<div class="pf_box">
					<div class="pf_box_content">
						<el-row>
							<el-col :span="4">
								<div style="text-align: center;">
									<span style="border-left: 3px solid #85ce61;padding-left: 20px;">最终评级</span>
								</div>
							</el-col>
							<el-col :span="3">
								<el-button :type="queryGradeDetailData.finalGrade==='A'?'success':queryGradeDetailData.finalGrade==='D'?'danger':'warning'" v-if="queryGradeDetailData.finalGrade">
									{{queryGradeDetailData.finalGrade}}
								</el-button>
							</el-col>
							<el-col :span="5">
								主要标准：<span :class="queryGradeDetailData.primaryGrade==='A'?'suc':queryGradeDetailData.primaryGrade==='D'?'fail':'war'" v-if="queryGradeDetailData.primaryGrade">{{queryGradeDetailData.primaryGrade}}</span>
							</el-col>
							<el-col :span="5">
								次要标准：<span :class="queryGradeDetailData.secondaryGrade==='A'?'suc':queryGradeDetailData.secondaryGrade==='D'?'fail':'war'" v-if="queryGradeDetailData.secondaryGrade">{{queryGradeDetailData.secondaryGrade}}</span>
							</el-col>
							<el-col :span="6">
								次要标准评分：<span v-if="queryGradeDetailData.secondaryScore">{{queryGradeDetailData.secondaryScore}}</span>
							</el-col>
						</el-row>
					</div>
				</div>
				<div v-for="item in queryGradeDetailData.modelList" style="margin-bottom: 10px;">
					<p class="title" style="line-height: 60px;">{{item.modelName}} &nbsp;&nbsp;&nbsp;
						<span :class="item.modelGrade==='A'?'suc':item.modelGrade==='D'?'fail':'war'">{{item.modelGrade}}</span>
					</p>
					<template>
						<el-table :data="item.ruleList" stripe style="width: 100%;">
							<el-table-column prop="ruleName" label="命中规则集">
							</el-table-column>
							<el-table-column prop="ruleValue" label="数据值" align="center" width="90">
							</el-table-column>
							<el-table-column prop="ruleGrade" label="评级/分值" align="center" width="90">
								<template slot-scope="scope">
									<span :class="scope.row.ruleGrade==='A'?'suc':scope.row.ruleGrade==='D'?'fail':'war'">{{scope.row.ruleGrade}}</span>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<!--<template>
	        	<p class="title">主要标准</p>
	        	<el-row>
						  <el-col :span="16"></el-col>
						  <el-col :span="4"></el-col>
						  <el-col :span="4"></el-col>
						</el-row>
	        	<el-row>
						  <el-col :span="16">营业年数（股权变动至今）较长（年）</el-col>
						  <el-col :span="4">6</el-col>
						  <el-col :span="4">B</el-col>
						</el-row>
	        </template>-->

				</div>
			</div>
		</el-dialog>

		<el-dialog title="pdf" :visible.sync="pdfShow" fullscreen custom-class='supplier-detail-dialog' width="600px">
			<div id="pdf" class="trade-dialog-content">
			</div>
		</el-dialog>
		<el-dialog title="贸易数据匹配" :visible.sync="verifyRmSummaryShow" fullscreen custom-class='supplier-detail-dialog' width="880px">
			<div class="verify-dialog-content">
				<template v-if="verifyRmSummaryData.length > 0">
					<el-tabs v-model="verifyRmSummaryTab" type="card">
						<el-tab-pane v-for="(item, index) in verifyRmSummaryData" :label="item.supplierName" :name="''+ index" :key="index">
							<p class="title">
								结算差额合计: {{item.totalBankPercentage?item.totalBankPercentage:'(--)'}}&nbsp;&nbsp;&nbsp;&nbsp; 开票差额合计: {{item.totalTaxPercentage?item.totalTaxPercentage:'(--)'}}
							</p>
							<table class="dialog-table" style="text-align: center;">
								<thead>
									<tr>
										<th>月份</th>
										<th v-for="(val,key,index) in item.taxPercentage">
											{{key}}
										</th>
										<th>合计</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>实际结算金额</td>
										<td v-for="(val,key,index) in item.bankStatements">
											{{val}}
										</td>
										<td>{{item.settlementTotal}}</td>
									</tr>
									<tr>
										<td>平台结算金额</td>
										<td v-for="(val,key,index) in item.tradeDatas">
											{{val}}
										</td>
										<td>{{item.platformSettlementTotal}}</td>
									</tr>
									<tr>
										<td>结算差额</td>
										<td v-for="(val,key,index) in item.tradePercentage" :class="val=='￥0.00'?'suc':'fail'">
											{{val}}
										</td>
										<td :class="item.totalBankPercentage=='￥0.00'?'suc':'fail'">
											{{item.totalBankPercentage}}
										</td>
									</tr>
									<div style="height: 15px;"></div>
									<tr>
										<td>实际开票金额</td>
										<td v-for="(val,key,index) in item.taxStatements">
											{{val}}
										</td>
										<td>{{item.billingTotal}}</td>
									</tr>
									<tr>
										<td>平台开票金额</td>
										<td v-for="(val,key,index) in item.taxDatas">
											{{val}}
										</td>
										<td>
											{{item.platformBillingTotal}}
										</td>
									</tr>
									<tr>
										<td>开票差额</td>
										<td v-for="(val,key,index) in item.taxPercentage" :class="val=='￥0.00'?'suc':'fail'">
											{{val}}
										</td>
										<td :class="item.totalTaxPercentage=='￥0.00'?'suc':'fail'">
											{{item.totalTaxPercentage}}
										</td>
									</tr>
								</tbody>
							</table>
						</el-tab-pane>
					</el-tabs>
					<p class="des">注：如果平台交易额在该月没有数据，则不做对比，不算入合计。</p>
				</template>
			</div>
		</el-dialog>
		<el-dialog :title="verifyRmDetailData.title" :visible.sync="verifyRmDetailShow" fullscreen custom-class='supplier-detail-dialog' width="600px">
			<div class="verify-dialog-detail-content">
				<p class="title">异常{{verifyRmDetailData.abnormalCount}}条</p>
				<div class="abnormal-des">
					{{verifyRmDetailData.abnormalDesc}}
				</div>
				<p v-if="verifyRmDetailData.fileUrl">
					<el-button type="text" @click=downloadFile(verifyRmDetailData.fileUrl)>
						<i class="el-icon-download"></i> {{verifyRmDetailData.fileName}}</el-button>
				</p>
			</div>
		</el-dialog>
		<el-dialog title="沟通记录" :visible.sync="communicationDialogShow" fullscreen custom-class='supplier-detail-dialog'>
			<div style="line-height: 40px;">沟通内容</div>
			<el-form ref="communicationForm" :model="communicationForm">
				<el-form-item prop="content">
					<el-input type="textarea" placeholder="请输入内容" v-model="communicationForm.content">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitCommunicationForm('communicationForm')">保存</el-button>
					<el-button @click="resetCommunicationForm('communicationForm')">重置</el-button>
				</el-form-item>
			</el-form>
			<hr style="" />
			<ul>
				<li v-for="item in communicationRecordsList">
					<el-row>
						<el-col :span="24">
							<div class="cmc_ibox">
								<p class="cmc_time">
									{{item.createTime}} {{item.operateName}}
									<span style="float: right;"><i @click="deletCommunication(item.id)" class="el-icon-delete a_pointer"></i></span>
								</p>
								<p class="cmc_content">{{item.content}}</p>
							</div>
						</el-col>
					</el-row>
				</li>
			</ul>
		</el-dialog>
		<el-dialog title="信息校验与验证" :visible.sync="validationInfoDialogShow" fullscreen custom-class='supplier-detail-dialog'>
			<div class="dialog-content">
				<template v-for="(item, index) in validationInfoList">
					<p class='group-item' v-if="item.groupText">{{item.groupText}}</p>
					<table :key="index">
						<tbody>
							<tr v-for="(subItem, subIndex) in item.items" :key="subIndex">
								<td>
									<el-button @click="verifyValidationInfo(subItem.item,subItem.id)" style="margin: 5px;" type="primary">
										{{subItem.itemText}}
									</el-button>
									<span>{{subItem.itemContent}}</span>
								</td>
								<!--<td>
                <el-button @click="enterpriseElements(subItem.item)" :disabled="true"  style="margin: 5px;" type="primary">{{subItem.itemText}}</el-button>
              </td>-->
								<td style="width: 120px;">
									<span v-if="subItem.result == 1" class="suc">{{subItem.resultText}}</span>
									<span v-if="subItem.result == 0" class="fail">{{subItem.resultText}}</span>
									<span v-if="subItem.result == -1">{{subItem.resultText}}</span>
								</td>
								<!--<td>
                <i class="el-icon-success suc" v-if="subItem.result === 1"></i>
                <i class="el-icon-error fail" v-if="subItem.result === 0"></i>
              </td>-->
							</tr>
						</tbody>
					</table>
				</template>
			</div>
		</el-dialog>

		<el-dialog title="选择担保人" width="450px" :visible.sync="dialogSelectGuarantorForm">
			<template>
				<div style="margin-top: 20px">
					<el-radio-group v-model="selectedGuarantor" size="mini" style="margin-bottom: 10px;">
						<el-radio v-for="item in selectGuarantorListData" :label="item.guarantorId" style="width: 400px;margin:0 0 8px;" :key="item.guarantorId" border>
							{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.identityNo}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.mobile}}
						</el-radio>
					</el-radio-group>
				</div>
			</template>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click="saveSelectGuarantor">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Uploads from '@/components/Upload/Uploads'
	import NoteChart from '@/components/charts/noteChart'
	import PieChart from '@/components/charts/pieChart'
	import { comboboxBankList, queryCapitalEnterprise } from '@/api/common'
	import loanClassificationDetail from '@/api/loanClassificationManage/loanClassificationDetail'
	import verifyDetail from '@/api/supplierManage/verifyDetail'
	import baseUtil from '@/utils/baseUtil'
	import { validContent } from '@/utils/validate'
	import { Format } from '@/utils/index'

	export default {
		name: 'loanClassificationDetail',
		components: {
			Upload,
			Uploads,
			NoteChart,
			PieChart
		},
		data() {
			return {
				financeNo: '', // 商户id
				topData: '', //顶部数据
				basicData: '', //基础信息数据
				loanClassificationTypeList:'',//五级分类-下拉
				loanClassificationDetailRecordList: [], //授信额度调整记录
				loanClassificationDetailRecordForm: {
					financeNo: '',
					loanClassificationAfter: '',
					adjustDate: '',
					clearAmount: '',
					remark: '',
				}, //授信额度调整记录提交表单
				registerStage: '', // 入驻阶段 BASIC: 基础资料, VERIFY: 尽调, SIGN: 签署合同,CAPITAL ： 待资方审核， PASS: 入驻成功, REJECT: 入驻失败
				registerStageText: '', // 入驻阶段中文
				registerStatus: '', // 入驻状态 INIT: 填写中, APPROVING: 待审核, REAPPROVING: 待复审, AMENDING: 待补充,APPROVING： 待审核，SIGNING：待签署， PASS: 入驻成功, REJECT: 入驻失败
				registerStatusText: '', // 入驻状态中文
				registerStatusRemark: '', // 入驻状态备注
				querySummaryData: '', // 商户详情页面的顶栏
				inspectionStage: '', //
				inspectionDialogShow: false, // 基础信息、贸易资料审核相关dialog
				inspectionBtnShow: true, //风控审核按钮显示与隐藏 默认显示
				inspectionRelateData: {
					title: '',
					inspectionArray: []
				},
				centreListDialogShow: false, //合作核心企业
				centreList: [], //查询的合作核心企业
				centreCheckList: [], //勾选的合作核心企业
				approveRejectDialogShow: false, // 基础资料、贸易资料打回原因dialog
				approveRejectData: { // 基础资料、贸易资料打回时 原因数据
					amendItems: [],
					amendRemark: ''
				},
				bankAmt: '', //打款金额
				remitData: {}, //打款数据
				rejectDialogShow: false, // 入驻失败原因
				remark: '', // 入驻失败原因
				queryBasicData: '', // 查询基础资料
				queryTradeData: [], // 查询贸易资料
				queryKnowData: { // 预沟通资料
					credit: '',
					trade: ''
				},
				queryReviewData: '', //风控数据
				comboboxBankList: '', //银行列表
				queryCapitalEnterpriseList: '', //资金方列表
				queryVerifyData: {
					creditEnterprise: {
						abnormalCount: '',
						abnormalDesc: '',
						fileName: '',
						fileUrl: ''
					},
					creditRepre: {
						abnormalCount: '',
						abnormalDesc: '',
						fileName: '',
						fileUrl: ''
					},
					creditGuarantor: {
						abnormalCount: '',
						abnormalDesc: '',
						fileName: '',
						fileUrl: ''
					},
					centres: []
				}, // 查询尽调资料
				//尽调折叠面板展开项
				//      activeVerifyFirmInfoNames:'FirmInfoOne',//企业信息默认项
				//      activeVerifyFirmMemberNames:'FirmMemberOne',//企业成员默认项
				//      activeVerifyFirmCreditNames:'FirmCreditOne',//企业征信默认项
				//      activeVerifyFirmAccessoryNames:'FirmAccessoryOne',//企业附件默认项
				//      activeVerifyFirmFinancialTrideNames:'FirmFinancialTrideOne',//财务及贸易统计默认项
				//      activeVerifyFirmOtherNames:'FirmFinancialOtherOne',//其他信息默认项
				//				activeVerifyFirmBondsmanNames:'FirmFinancialBondsmanOne',//担保人默认项
				//      activeVerifyFirmPlatformNames:'FirmFinancialPlatformOne',//平台信息默认项
				activeVerifyFirmInfoNames: 'FirmInfoOne', //企业信息默认项
				activeVerifyFirmMemberNames: '', //企业成员默认项
				activeVerifyFirmCreditNames: '', //企业征信默认项
				activeVerifyFirmAccessoryNames: '', //企业附件默认项
				activeVerifyFirmFinancialTrideNames: '', //财务及贸易统计默认项
				activeVerifyFirmOtherNames: '', //其他信息默认项
				activeVerifyFirmBondsmanNames: '', //担保人默认项
				activeVerifyFirmPlatformNames: '', //平台信息默认项
				enterpriseInfoData: '', //企业信息数据
				queryEquityData: [], //股权变动数据
				queryOfficeData: [], //经营场所数据
				queryLitigationData: [], //法律诉讼数据
				queryManagerData: [], //成员名单数据
				queryCreditData: [], //征信记录数据
				queryPaperData: [], //征信附件数据
				queryEnterpriseTradeData: '', //财务及贸易统计数据
				streamVolumesStatusList: [], //财务及贸易统计交易数据可验证程度列表数据---------下拉列表
				queryEnterpriseFinanceData: '', //其他信息数据
				queryEnterpriseOpinionData: [], //其他信息-互联网信息审核-数据
				queryEnterpriseGuarantorData: [], //其他信息-担保人-数据
				selectGuarantorListData: [], //其他信息-选择担保人列表数据
				selectedGuarantor: '', //选中的担保人
				selectGuarantorIndex: '', //点击选择担保人的索引
				dialogSelectGuarantorForm: false, //选择担保人 弹窗控制
				queryDistributorData: [], //其他信息-下游平台信息-数据
				agentInfoSeletList: '', //下拉列表-分销商下拉信息查询
				memberTypeSeletList: '', //下拉列表-企业成员类型
				levelInfoSeletList: '', //下拉列表-严重程度
				bankListSeletList: '', //下拉列表-银行信息
				certificateTypeSeletList: '', //下拉列表-证件类型
				identityTypeSeletList: '', //下拉列表-身份证件类型
				//新尽调数据---end
				contractSignNameList: ['fdgfd', 'gfdgf'], //合同签署企业名称列表
				querySignData: {}, // 查询签署
				rate: {
					monthRate: '', //月利率
					yearRate: '' //年利率
				},
				queryGradeData: {
					finalGrade: '',
					primaryGrade: '',
					secondaryGrade: '',
					secondaryScore: '',
				}, //授信签署-评级-查询评级数据

				uploadFileData: {
					financeNo: '',
					isImage: false
				},
				uploadImgData: {
					financeNo: '',
					isImage: true
				},
				pdfShow: false, //pdfdialog
				scoreCardShow: false, //评分卡dialog
				queryGradeDetailData: {
					finalGrade: '',
					primaryGrade: '',
					secondaryGrade: '',
					secondaryScore: '',
				}, //授信签署-评级-查询评级详情数据
				adminSupplierRegisterQueryTardeRmSummaryResponse: [], //评分卡数组数据
				tradeRmSummaryShow: false, // 贸易统计详情 贸易资料待审核通过后才能看见 贸易风控
				tradeRmSummaryData: [], // 贸易风控数据
				tradeVendorCodeData: [], // 贸易数据 平台商户编码
				tradeRmSummaryTab: '0', //贸易统计tab
				scoreCardTab: '0', //评分卡tab
				verifyRmSummaryShow: false, // 贸易数据匹配 尽调通过后才能看见  尽调风控
				verifyRmSummaryData: [], // 尽调风控数据 贸易数据匹配
				verifyRmSummaryTab: '0', //
				verifyRmDetailShow: false, // 尽调资料风控 信用报告详情
				verifyRmDetailData: {}, // 尽调资料风控 信用报告详情数据
				transactionStatisticsData: '', // 交易统计 操作
				tradeDataMatchingData: '', // 贸易数据匹配 操作
				corporateCreditReportData: '', // 企业信用报告(人行) 操作
				legalRepresentativeCreditReportData: '', // 法定代表人信用报告(人行) 操作
				guaranteeCreditReportData: '', // 担保人信用报告(人行) 操作
				cooperationAgreementData: '', // 协议签署合同协议 操作
				communicationDialogShow: false, //沟通记录弹窗显示隐藏
				validationInfoDialogShow: false, //信息校验与验证弹窗显示隐藏
				communicationForm: { //沟通记录表单数据
					content: ''
				},
				communicationRecordsList: '', //沟通记录列表
				validationInfoList: '', //信息校验与验证列表
				count: 0,
				activeTab: 'first',
				isLookImg: false,
				lookImgSrc: '',
				deg: 0, //图片旋转的角度
				passwords: {
					password0: false,
					password1: false,
					password2: false,
					password3: false,
					password4: false,
					password5: false,
					password6: false,
				}, //密码显示与不显示
				dayOptions: [{
						value: '1',
						label: '1'
					}, {
						value: '2',
						label: '2'
					}, {
						value: '3',
						label: '3'
					}, {
						value: '4',
						label: '4'
					}, {
						value: '5',
						label: '5'
					}, {
						value: '6',
						label: '6'
					},
					{
						value: '7',
						label: '7'
					}, {
						value: '8',
						label: '8'
					}, {
						value: '9',
						label: '9'
					}, {
						value: '10',
						label: '10'
					}, {
						value: '11',
						label: '11'
					}, {
						value: '12',
						label: '12'
					},
					{
						value: '13',
						label: '13'
					}, {
						value: '14',
						label: '14'
					}, {
						value: '15',
						label: '15'
					}, {
						value: '16',
						label: '16'
					}, {
						value: '17',
						label: '17'
					}, {
						value: '18',
						label: '18'
					},
					{
						value: '19',
						label: '19'
					}, {
						value: '20',
						label: '20'
					}, {
						value: '21',
						label: '21'
					}, {
						value: '22',
						label: '22'
					}, {
						value: '23',
						label: '23'
					}, {
						value: '24',
						label: '24'
					},
					{
						value: '25',
						label: '25'
					}, {
						value: '26',
						label: '26'
					}, {
						value: '27',
						label: '27'
					}, {
						value: '28',
						label: '28'
					}, {
						value: '29',
						label: '29'
					}, {
						value: '30',
						label: '30'
					},
					{
						value: '31',
						label: '31'
					}
				],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
			}
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			]),
			statusActive() {
				const registerStage = this.registerStage
				let num = 0
				this.getQueryBasicData(); //基础资料
				this.activeTab = 'first';
				//      if (registerStage === 'BASIC') {
				//        num = 0
				//        this.getQueryBasicData();//基础资料
				//        this.activeTab = 'first';
				//      } else 
				//      if (registerStage === 'VERIFY') {
				//        num = 1
				//        this.getQueryVerifyData();//尽调资料
				//        this.activeTab = 'second';
				//      } else if (registerStage === 'SIGN') {
				//        num = 2
				//        this.getQuerySignData();//授信签署
				//        this.getQueryGrade();//授信签署-评级-查询评级
				//        this.activeTab = 'third';
				//      } else if (registerStage === 'CAPITAL') {
				//        num = 3
				//        this.getQuerySignData();//待资方审核
				//        this.getQueryGrade();//授信签署-评级-查询评级
				//        this.activeTab = 'third';
				//      } else if (registerStage === 'REJECT') {
				//        num = 0
				//        this.getQuerySignData();//入驻失败
				//        this.getQueryGrade();//授信签署-评级-查询评级
				//        this.activeTab = 'third';
				//      } else if (registerStage === 'PASS') {
				//        num = 5
				//        this.getQuerySignData();//授信签署
				//        this.getQueryGrade();//授信签署-评级-查询评级
				//        this.activeTab = 'third';
				//      }
				return num
			},
			passDisabled() {
				if(this.registerStatus === 'REAPPROVING' || this.registerStatus === 'APPROVING' || this.registerStatus === 'AMENDING') {
					return false
				}
				return true
			},
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		watch: {
			registerStage(value) {
				if(value === 'TRADE' && this.registerStatus === 'REAPPROVING') { // 贸易资料 待复核
					//        this.getQueryReview()
				} else if(value === 'VERIFY' && this.registerStatus === 'AMENDING') { // //  尽调中 待补充
					//        this.getQueryReview()
				} else if(value === 'SIGN' || value === 'CAPITAL' || value === 'REJECT' || value === 'PASS') {
					//        this.getQueryReview()
				}
			},
			registerStatus(value) {},
			centreList(val, oldVal) {
				for(let i = 0; i < val.length; i++) {
					if(val.remark === true) {
						this.centreCheckList.push(val.id);
					}
				}
			},
		},
		created() {
			this.financeNo = this.$route.params.id
			this.uploadFileData.financeNo = this.financeNo
			this.uploadImgData.financeNo = this.financeNo
			if(this.financeNo) {
				this.init()
			}
		},
		mounted() {},
		methods: {
			resetFaceCheckTimes() { //重置人脸识别次数
				loanClassificationDetail.resetFaceCheckTimes(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			handleClick(tab) { //基，贸，预，尽，授
				if(tab.index === '0') {
					this.getQueryBasicData(); //基础资料
				} else
					//  		if(tab.index==='1'){
					//  			this.getQueryTradeData();//贸易资料
					//  		}else if(tab.index==='2'){
					//  			this.getQueryKnowData();//预沟通资料
					//  		}else 
					if(tab.index === '1') {
						//  			this.getQueryVerifyData();//尽调资料
					} else if(tab.index === '2') {
					//  			this.getQuerySignData();//授信签署
					//  			this.getQueryGrade();//授信签署-评级-查询评级
				}
			},
			showScmPassword(index) {
				if(index == 0) {
					this.passwords.password0 = !this.passwords.password0;
				}
				if(index == 1) {
					this.passwords.password1 = !this.passwords.password1;
				}
				if(index == 2) {
					this.passwords.password2 = !this.passwords.password2;
				}
				if(index == 3) {
					this.passwords.password3 = !this.passwords.password3;
				}
				if(index == 4) {
					this.passwords.password4 = !this.passwords.password4;
				}
				if(index == 5) {
					this.passwords.password5 = !this.passwords.password5;
				}
				if(index == 6) {
					this.passwords.password6 = !this.passwords.password6;
				}
			}, //贸易资料点击密码显示与隐藏
			getRemitView() {
				loanClassificationDetail.remitView(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.remitData = res.data.data;
						this.bankAmt = res.data.data.bankAmt;
					} else if(res.data.code === '500') {
						this.$message.error(res.data.message)
					}
				})
			}, //查询打款验证信息
			remitConfirm() {
				loanClassificationDetail.remitConfirm(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.bankAmt = res.data.data.bankAmt;
						this.getRemitView();
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, //生成打款验证
			enterpriseElements(type) { //效验企业三要素和四要素
				var that = this;
				let data = {
					financeNo: that.financeNo,
					type: '',
				}
				if(type == 'verifyEnterpriseFourElements') { //企业四要素
					data.type = 'ENTERPRISE';
				}
				if(type == 'verifyCorporateThreeElements') { //法人三要素
					data.type = 'REPRE';
				}
				if(type == 'verifyBondsmanThreeElements') { //担保人三要素
					data.type = 'GUARANTOR';
				}
				loanClassificationDetail.informationCheck(data).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.status === 'success') {
							let bool = true;
							this.changeEnterpriseElementSresult(type, bool);
						} else if(res.data.data.status === 'fail') {
							let bool = false;
							this.changeEnterpriseElementSresult(type, bool);
						}
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			changeEnterpriseElementSresult(type, bool) { //效验后改变result的值
				const length = this.inspectionRelateData.inspectionArray.length;
				for(let i = 0; i < length; i++) {
					if(this.inspectionRelateData.inspectionArray[i].group == 'cert') {
						const subLength = this.inspectionRelateData.inspectionArray[i].items.length
						for(let j = 0; j < subLength; j++) {
							if(this.inspectionRelateData.inspectionArray[i].items[j].item === type) {
								if(bool) {
									this.inspectionRelateData.inspectionArray[i].items[j].result = 1;
								} else {
									this.inspectionRelateData.inspectionArray[i].items[j].result = 0;
								}
							}
						}
					}
				}
			},
			lookImg(imgSrc) { //查看图片
				this.deg = 0;
				var that = this;
				that.lookImgSrc = imgSrc;
				that.isLookImg = true;
			},
			clearImg() { //点击图片隐藏
				this.deg = 0;
				var that = this;
				that.isLookImg = false;
			},
			rotateImg(type) { //旋转图片
				let deg = this.deg;
				if(type === 'left') {
					this.deg -= 90;
				} else {
					this.deg += 90;
				}
				let _height = window.getComputedStyle(this.$refs.lookImgBox).height;
				let _width = window.getComputedStyle(this.$refs.lookImgBox).width;
				if(this.isNineTenMutiple(this.deg)) {
					this.$refs.rotateImg.style.width = _width;
					this.$refs.rotateImg.style.marginLeft = 'auto';
				} else {
					this.$refs.rotateImg.style.width = parseFloat(_height) - 30 + 'px';
					this.$refs.rotateImg.style.marginLeft = (parseFloat(_width) - parseFloat(_height)) / 2 + 'px';
				}
				this.$refs.rotateImg.style.transform = 'rotate(' + this.deg + 'deg)'
			},
			isNineTenMutiple(number) {
				var isTen = number / 90;
				if(isTen % 2 == 0) { //偶数
					return true;
				} else { //奇数
					return false;
				}
			},
			uploadBankChange(fileData) {
				this.queryVerifyData.centres[fileData.index].bankFileName = fileData.file ? fileData.file.name : '文件'
			},
			uploadTaxChange(fileData) {
				this.queryVerifyData.centres[fileData.index].taxFileName = fileData.file ? fileData.file.name : '文件'
			},
			uploadCreditEnterpriseChange(fileData) {
				this.queryVerifyData.creditEnterprise.fileName = fileData.file ? fileData.file.name : '文件'
			},
			uploadCreditRepreChange(fileData) {
				this.queryVerifyData.creditRepre.fileName = fileData.file ? fileData.file.name : '文件'
			},
			uploadCreditGuarantorChange(fileData) {
				this.queryVerifyData.creditGuarantor.fileName = fileData.file ? fileData.file.name : '文件'
			},
			method1(type) {
				const allStatus = ['BASIC_INIT', 'BASIC_APPROVING', 'BASIC_REAPPROVING', 'BASIC_AMENDING', 'TRADE_INIT', 'TRADE_APPROVING', 'TRADE_REAPPROVING', 'TRADE_AMENDING', 'KNOW_AMENDING', 'VERIFY_AMENDING', 'SIGN_AMENDING', 'PASS', 'REJECT']
				if(type) {
					this.count++
				} else {
					this.count--
				}
				if(this.count >= allStatus.length) {
					this.count = 0
				} else if(this.count < 0) {
					this.count = allStatus.length - 1
				}
				const registerStage = allStatus[this.count].split('_')[0]
				const registerStatus = allStatus[this.count].split('_')[1] ? allStatus[this.count].split('_')[1] : allStatus[this.count].split('_')[0]
				this.registerStage = registerStage
				this.registerStatus = registerStatus
				this.registerStatusText = registerStatus === 'INIT' ? '填写中' : registerStatus === 'APPROVING' ? '待审核' : registerStatus === 'REAPPROVING' ? '待复核' : registerStatus === 'AMENDING' ? '待补充' : registerStatus === 'PASS' ? '入驻成功' : '入驻失败'
			},
			init() {
				//      this.getQuerySummary()
				//      this.getTopData();//顶部数据
				this.getBasicData(); //基础信息数据
				this.getCreditLineDetailRecordList(); //授信额度调整记录
				this.getLoanClassificationTypeList();//获取五级分类-下拉
				//      this.getQueryBasicData();//基础资料
				//      this.getQueryTradeData();//贸易资料
				//      this.getQueryKnowData();//预沟通资料
				//      this.getQueryVerifyData();//尽调资料
				//      this.getQuerySignData();//授信签署
				//      this.getComboboxBankList();//获取银行列表
				//      this.getQueryCapitalEnterpriseList();//获取资金方列表
				//      this.getRemitView();//打款验证
				//      this.getQueryReview();//获取操作项
			}, // 初始化
			getTopData() { //顶部数据
				loanClassificationDetail.detailTop(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.topData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getBasicData() { //基础信息数据
				loanClassificationDetail.loanClassificationDetail(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.basicData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doSaveCreditLineDetailRecordForm(){//保存授信额度调整记录
				this.loanClassificationDetailRecordForm.financeNo = this.financeNo
				this.loanClassificationDetailRecordForm.adjustDate = Format(this.loanClassificationDetailRecordForm.adjustDate,'yyyy-MM-dd')
				loanClassificationDetail.loanClassificationDetailSaveRecord(this.loanClassificationDetailRecordForm).then(res => {
					if(res.data.code === '200') {
						this.getBasicData();//基础信息数据
						this.getCreditLineDetailRecordList(); //授信额度调整记录
						this.loanClassificationDetailRecordForm = {
							financeNo: '',
							loanClassificationAfter: '',
							adjustDate: '',
							clearAmount: '',
							remark: '',
						}
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getLoanClassificationTypeList(){//获取五级分类-下拉
				loanClassificationDetail.loanClassificationType().then(res => {
					if(res.data.code === '200') {
						this.loanClassificationTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doConfirmWrittenOff(){//确认核销
				loanClassificationDetail.confirmWrittenOff(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getCreditLineDetailRecordList(); //授信额度调整记录
						this.loanClassificationDetailRecordList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getCreditLineDetailRecordList() { //调整记录列表
				loanClassificationDetail.loanClassificationDetailRecordList(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.loanClassificationDetailRecordList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			deleteCreditLineDetailRecord(id) { //删除授信额度调整记录
				this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					loanClassificationDetail.loanClassificationDetailDeleteRecord(id).then(res => {
						if(res.data.code === '200') {
							this.getCreditLineDetailRecordList(); //授信额度调整记录
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					})
				}).catch(() => {

				});

			},
			getQueryReview() {
				loanClassificationDetail.getQueryReview(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.queryReviewData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getComboboxBankList() {
				comboboxBankList().then(res => {
					if(res.data.code === '200') {
						this.comboboxBankList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 获取银行列表
			getQueryCapitalEnterpriseList() {
				queryCapitalEnterprise().then(res => {
					if(res.data.code === '200') {
						this.queryCapitalEnterpriseList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 获取资金方列表
			getQuerySummary() {
				loanClassificationDetail.querySummary(this.financeNo).then(res => {
					if(res.data.code === '200') {
						const data = res.data.data
						//          this.registerStage = data.registerStage
						//          this.registerStageText = data.registerStageText
						//          this.registerStatus = data.registerStatus
						//          this.registerStatusText = data.registerStatusText
						//          this.registerStatusRemark = data.registerStatusRemark
						this.querySummaryData = data
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 顶部数据
			doApproveReject() { // 审核 打回
				if(this.approveRejectData.amendItems.length < 1) {
					this.$message.error('修改项至少选中一个')
					return
				}
				if(!validContent(this.approveRejectData.amendRemark)) {
					this.$message.error('备注不能为空')
					return
				}
				this.handleInspectionRelate(false)
			}, // 审核 打回时

			handlePass(type) {
				let data;
				if(type === 'approvefinal') {
					data = {
						financeNo: this.financeNo,
						remark: '',
						pass: true
					}
				} else {
					data = this.financeNo
				}
				loanClassificationDetail[type](data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						//          this.getQueryReview();//刷新风控
						if(type == 'approveVerify') { //通过尽调资料成功更新企业账号。合同编码
							this.getQuerySignData();
							this.getQueryGrade(); //授信签署-评级-查询评级
						}
						if(type == 'reApproveTrade') { //通过贸易资料更新平台商户编码
							this.getQueryVerifyData();
						}
						this.getQuerySummary();
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 复审 通过时提交
			doInspectionRelateShow() { //
				this.inspectionDialogShow = true
				return
				let api = ''
				if(type === 'basicDataAudit') {
					api = 'queryBasicInspection'
					this.inspectionRelateData.title = '基础资料审核'
					this.getRemitView();
				} else if(type === 'verifyDataAudit') {
					api = 'queryVerifyInspection'
					this.inspectionRelateData.title = '尽调资料审核'
				} else if(type === 'signDataAudit') {
					api = 'querySignInspection'
					this.inspectionRelateData.title = '授信签署审核'
				} else if(type === 'TRADE') {
					api = 'queryTradeInspection'
					this.inspectionRelateData.title = '贸易资料审核'
				} else if(type === 'cooperationAgreement') {
					api = 'contractStatus'
					this.inspectionRelateData.title = '在线签署协议'
				} else {
					return false
				}
				this.inspectionBtnShow = bool
				this.inspectionStage = type
				this.approveRejectData.amendItems = []
				this.approveRejectData.amendRemark = ''
				loanClassificationDetail[api](this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.inspectionRelateData.inspectionArray = res.data.data
						this.inspectionDialogShow = true
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 审核 获取审核项等
			doCentreListShow() {
				loanClassificationDetail.centreList(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.centreList = res.data.data
						this.centreListDialogShow = true
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, //查看核心企业列表   风控
			saveCentreList() {
				let data = {
					financeNo: '',
					centreIds: ''
				}
				if(this.centreCheckList.length === 0) {
					this.$message.error("请勾选至少一个核心企业");
					return;
				}
				data.financeNo = this.financeNo;
				data.centreIds = this.centreCheckList.join();
				loanClassificationDetail.addCentre(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.centreListDialogShow = false;
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, //保存核心企业列表   风控
			messagePush(type, guarantorId) { //发送消息推送
				let _id = '';
				if(guarantorId) {
					_id = guarantorId;
				} else {
					_id = this.financeNo;
				}
				loanClassificationDetail[type](_id).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			createFactorContract() { //生成保理合同
				loanClassificationDetail.createFactorContract(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.doInspectionRelateShow('cooperationAgreement');
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			createGuaranteeContract(guarantorId) { //生成保证合同
				loanClassificationDetail.createGuaranteeContract(guarantorId).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.doInspectionRelateShow('cooperationAgreement');
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			doInspectionRelate(type) {
				let isValid = true
				const length = this.inspectionRelateData.inspectionArray.length
				if(this.registerStage === 'BASIC') {
					for(let i = 0; i < length; i++) {
						const subLength = this.inspectionRelateData.inspectionArray[i].items.length
						for(let j = 0; j < subLength; j++) {
							if(this.inspectionRelateData.inspectionArray[i].items[j].result === -1 && this.inspectionRelateData.inspectionArray[i].group !== 'cert') {
								isValid = false
								break
							}
						}
						if(!isValid) {
							break
						}
					}
				} else if(this.registerStage === 'VERIFY' || this.registerStage === 'SIGN') {
					for(let i = 0; i < length; i++) {
						if(this.inspectionRelateData.inspectionArray[i].result === -1) {
							isValid = false
							break
						}
					}
				}

				if(isValid) {
					if(type) {
						//          let tip = ''
						//          if (this.registerStage === 'BASIC') {
						//            tip = '通过审核后将获取该企业相关征信数据。'
						//          } else if (this.registerStage === 'TRADE') {
						//            tip = '通过审核后将获取该企业相关贸易数据。'
						//          }
						this.$confirm(`<p style="font-size: 13px;padding: 10px;text-align: center">确认通过审核?</p>`, '确认通过审核', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							dangerouslyUseHTMLString: true
						}).then(() => {
							this.handleInspectionRelate(type)
						}).catch(() => {})
					} else {
						this.approveRejectDialogShow = true
					}
				} else {
					this.$message.error('审核项不能为空')
				}
			}, // 初审 基础信息和贸易资料
			handleInspectionRelate(type) { // 提交 审核相关
				let data = {
					pass: type,
					financeNo: this.financeNo,
					inspections: {}
				}
				let api = ''
				if(type) {
					data.amendItems = ''
					data.amendRemark = ''
				} else {
					data.amendItems = this.approveRejectData.amendItems.join(',')
					data.amendRemark = this.approveRejectData.amendRemark.trim()
					data.remark = this.approveRejectData.amendRemark.trim()
				}
				this.inspectionRelateData.inspectionArray.forEach((item, index) => {
					if(this.registerStage === 'BASIC') {
						data.inspections[item.group] = {}
						item.items.forEach((subItem, subIndex) => {
							if(subItem === 'verifyCorporateThreeElements') {
								data.inspections[item.group][subItem.item] = subItem.result
							}
							data.inspections[item.group][subItem.item] = subItem.result
						})
					} else if(this.registerStage === 'VERIFY' || this.registerStage === 'SIGN') {
						data.inspections[item.item] = item.result
					}
				})
				data.inspections = JSON.stringify(data.inspections)
				if(this.registerStage === 'BASIC') {
					api = 'approveBasic'
				} else if(this.registerStage === 'VERIFY' && type) { //尽调通过
					api = 'approveVerify'
				} else if(this.registerStage === 'VERIFY' && !type) { //尽调打回
					api = 'amendingVerify'
				} else if(this.registerStage === 'SIGN' && type) { //授信通过
					api = 'approveSign'
				} else if(this.registerStage === 'SIGN' && !type) { //授信打回
					api = 'amendingSign'
				}
				loanClassificationDetail[api](data).then(res => {
					if(res.data.code === '200') {
						if(type == 'VERIFY') {
							this.getQueryVerifyData();
						}
						this.$message.success(res.data.message)
						this.inspectionDialogShow = false
						this.approveRejectDialogShow = false
						this.getQuerySummary()
						//          this.getQueryReview()
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 提交初审核 打回和通过
			approveFinal() { //拒绝提交
				let data = {
					financeNo: this.financeNo,
					remark: ''
				}
				if(!validContent(this.remark)) {
					this.$message.error('入驻失败原因不能为空')
					return
				}
				data.remark = this.remark.trim()
				loanClassificationDetail.detailRepulse(data).then(res => {
					if(res.data.code === '200') {
						this.getTopData(); //顶部数据
						this.$message.success(res.data.message)
						this.rejectDialogShow = false
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 入驻成功、入驻失败 提交
			doApproveFinal(type) { //点击拒绝
				this.remark = ''
				this.rejectDialogShow = true
			},
			doPass() { //提交
				this.$confirm('确认该商户符合基本条件？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					loanClassificationDetail.detailRegister(this.financeNo).then(res => {
						if(res.data.code === '200') {
							this.getTopData(); //顶部数据
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			getQueryBasicData() {
				loanClassificationDetail.queryBasic(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.queryBasicData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 基本信息
			//    getQueryTradeData () {
			//      loanClassificationDetail.queryTrade(this.financeNo).then(res => {
			//        if (res.data.code === '200') {
			//          this.queryTradeData = res.data.data
			//        } else {
			//          this.$message.error(res.data.message)
			//        }
			//      })
			//    }, // 贸易资料
			//    getQueryKnowData() {
			//    		loanClassificationDetail.queryKnow(this.financeNo).then(res => {
			//    					if(res.data.code ==='200') {
			//          this.queryKnowData = res.data.data
			//        } else {
			//          this.$message.error(res.data.message)
			//        }
			//      })
			//    }, // 查询预沟通
			handleUpdateKnow() {
				this.queryKnowData.credit = this.queryKnowData.credit ? this.queryKnowData.credit.trim() : ''
				this.queryKnowData.trade = this.queryKnowData.trade ? this.queryKnowData.trade.trim() : ''
				if(!validContent(this.queryKnowData.credit) || !validContent(this.queryKnowData.trade)) {
					this.$message.error('贸易答疑和征信答疑都不能为空')
					return false
				}
				let data = {
					financeNo: this.financeNo,
					credit: this.queryKnowData.credit,
					trade: this.queryKnowData.trade
				}
				loanClassificationDetail.updateKnow(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQueryKnowData()
						this.getQuerySummary()
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 修改预沟通 提交
			addScmAccountDay(i) {
				if(this.queryVerifyData.centres[i].scmAccountDay.length < 2) {
					this.queryVerifyData.centres[i].scmAccountDay.push({
						scmAccountDay: '', //账期日
						scmReturnDay: '', //回款日
					});
				} else {
					this.$message.error('2条够啦！')
				}
			}, //添加尽调的账期
			deleteScmAccountDay(i, scmi) {
				this.queryVerifyData.centres[i].scmAccountDay.splice(scmi, 1);
			}, //删除尽调的账期
			//新尽调
			changeVerifyFirmInfo(val) { //展开企业信息
				if(val.length === 0) {
					return
				}
				this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
				this.getQueryEquity(); //尽调信息-股权变动列表查询
				this.getQueryOffice(); //尽调信息-经营场所列表查询
				this.getQueryLitigation(); //尽调信息-法律诉讼列表查询
				this.getLevelInfoSeletList(); //获取下拉列表-严重程度
			},
			changeVerifyFirmMember(val) { //展开企业成员名单
				if(val.length === 1) {
					return
				}
				this.getQueryManager(); //尽调信息-成员名单列表查询
				this.getMemberTypeSeletList(); //获取下拉列表-企业成员类型
				this.getCertificateTypeSeletList(); //获取下拉列表-证件类型
				this.getIdentityTypeSeletList(); //获取下拉列表-证件类型
			},
			changeVerifyFirmCredit(val) { //展开企业征信记录
				if(val.length === 1) {
					return
				}
				this.getQueryCredit(); //尽调信息-征信记录列表查询
			},
			changeVerifyFirmAccessory(val) { //展开企业附件
				if(val.length === 1) {
					return
				}
				this.getQueryPaper(); //尽调信息-企业附件列表查询
				this.getCertificateTypeSeletList(); //获取下拉列表-证件类型
			},
			changeVerifyFirmFinancialTride(val) { //展开财务及贸易统计
				if(val.length === 1) {
					return
				}
				this.getQueryEnterpriseTrade(); //尽调信息-财务及贸易统计-查询
				this.getStreamVolumesStatusList(); //尽调信息-财务及贸易统计交易数据可验证程度列表数据 -------获取下拉列表数据
			},
			changeVerifyFirmOther(val) { //展开其他信息
				if(val.length === 1) {
					return
				}
				this.getQueryEnterpriseFinance(); //其他信息-查询
				this.getQueryEnterpriseOpinion(); //其他信息-互联网信息审核查询
				this.getQueryEnterpriseGuarantor(); //其他信息-担保人查询
			},
			changeVerifyFirmBondsman(val) { //展开担保人
				if(val.length === 1) {
					return
				}
				this.getQueryEnterpriseGuarantor(); //其他信息-担保人查询
			},
			changeVerifyFirmPlatform(val) { //展开下游平台信息
				if(val.length === 1) {
					return
				}
				this.getQueryDistributor(); //尽调信息-下游平台信息列表-查询
				this.getAgentInfoSeletList(); //获取下拉列表-分销商下拉信息查询
			},

			getQueryVerifyData() { // 查询尽调
				this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
				this.getQueryEquity(); //尽调信息-股权变动列表查询
				this.getQueryOffice(); //尽调信息-经营场所列表查询
				this.getQueryLitigation(); //尽调信息-法律诉讼列表查询
				this.getLevelInfoSeletList(); //获取下拉列表-严重程度
			},
			getAgentInfoSeletList() { //获取下拉列表-分销商下拉信息查询
				verifyDetail.agentInfo(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.agentInfoSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getMemberTypeSeletList() { //获取下拉列表-分销商下拉信息查询
				verifyDetail.memberType(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.memberTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getLevelInfoSeletList() { //获取下拉列表-分销商下拉信息查询
				verifyDetail.levelInfo(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.levelInfoSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getBankListSeletList() { //获取下拉列表-分销商下拉信息查询
				verifyDetail.bankList(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.bankListSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCertificateTypeSeletList() { //获取下拉列表-证件类型下拉信息查询
				verifyDetail.certificateType(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.certificateTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getIdentityTypeSeletList() { //获取下拉列表-身份证件类型
				verifyDetail.identityType(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.identityTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEnterpriseInfo() { //尽调信息-企业信息详情------------查询
				verifyDetail.queryEnterpriseInfo(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.enterpriseInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveEnterpriseInfo() { //尽调信息-企业信息修改
				let data = baseUtil.copy(this.enterpriseInfoData)
				if((typeof data.establishDate) === 'object' && data.establishDate) {
					data.establishDate = Format(data.establishDate, 'yyyy-MM-dd')
				}
				data.financeNo = this.financeNo
				verifyDetail.modEnterpriseInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEquity() { //尽调信息-股权变动列表------------查询
				verifyDetail.queryEquity(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryEquityData.length === 0) {
							this.queryEquityData.push({
								enterDate: '',
								address: '',
								imageData: [],
							})
						} else if(res.data.data.length !== 0) {
							this.queryEquityData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteEquity(index) { //尽调信息-股权变动------------删除
				this.queryEquityData.splice(index, 1)
			},
			plusEquity() { //尽调信息-股权变动------------添加
				this.queryEquityData.push({
					changeDate: '',
					changeDescription: ''
				})
			},
			saveEquity() { //尽调信息-股权变动------------保存
				let info = baseUtil.copy(this.queryEquityData)
				for(let i = 0; i < info.length; i++) {
					if(!info[i].changeDate) {
						this.$message.error('变动日期不能为空')
						return
					}
					if(!info[i].changeDescription) {
						this.$message.error('描述不能为空')
						return
					}
					if((typeof info[i].changeDate) === 'object' && info[i].changeDate) {
						info[i].changeDate = Format(info[i].changeDate, 'yyyy-MM-dd')
					}
				}
				let data = {
					financeNo: this.financeNo,
					info: JSON.stringify(info)
				}
				verifyDetail.saveEquity(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryOffice() { //尽调信息-经营场所列表查询------------查询
				verifyDetail.queryOffice(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryOfficeData.length === 0) {
							this.queryOfficeData.push({
								enterDate: '',
								address: '',
								imageData: [],
							})
						} else if(res.data.data.length !== 0) {
							this.queryOfficeData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteOffice(index) { //尽调信息-经营场所列表查询------------删除
				this.queryOfficeData.splice(index, 1)
			},
			plusOffice() { //尽调信息-经营场所列表查询------------添加
				this.queryOfficeData.push({
					enterDate: '',
					address: '',
					imageData: [],
				})
			},
			doMoreCertificate(index) { // 尽调经营场所新增凭证
				this.queryOfficeData[index].imageData.push({
					key: '',
					url: ''
				})
			},
			saveOffice() { //尽调信息-经营场所列表查询------------保存
				let info = baseUtil.copy(this.queryOfficeData)
				for(let i = 0; i < info.length; i++) {
					if(!info[i].enterDate) {
						this.$message.error('变动日期不能为空')
						return
					}
					if(!info[i].address) {
						this.$message.error('经营地址不能为空')
						return
					}
					if((typeof info[i].enterDate) === 'object' && info[i].enterDate) {
						info[i].enterDate = Format(info[i].enterDate, 'yyyy-MM-dd')
					}
				}
				let data = {
					financeNo: this.financeNo,
					info: JSON.stringify(info)
				}
				verifyDetail.saveOffice(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			getQueryLitigation() { //尽调信息-法律诉讼列表查询------------查询
				verifyDetail.queryLitigation(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryLitigationData.length === 0) {
							this.queryLitigationData.push({
								date: '',
								document: '',
								cause: '',
								identity: '',
								num: '',
								type: '',
							})
						} else if(res.data.data.length !== 0) {
							this.queryLitigationData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteLitigation(index) { //尽调信息-法律诉讼列表查询------------删除
				this.queryLitigationData.splice(index, 1)
			},
			plusLitigation() { //尽调信息-法律诉讼列表查询------------添加
				this.queryLitigationData.push({
					date: '',
					document: '',
					cause: '',
					identity: '',
					num: '',
					type: '',
				})
			},
			saveLitigation() { //尽调信息-法律诉讼列表查询------------保存
				let info = baseUtil.copy(this.queryLitigationData)
				for(let i = 0; i < info.length; i++) {
					if(!info[i].date) {
						this.$message.error('变动日期不能为空')
						return
					}
					if(!info[i].document) {
						this.$message.error('判决文书不能为空')
						return
					}
					if(!info[i].cause) {
						this.$message.error('案由不能为空')
						return
					}
					if(!info[i].identity) {
						this.$message.error('案件身份不能为空')
						return
					}
					if(!info[i].num) {
						this.$message.error('案号不能为空')
						return
					}
					if(!info[i].type) {
						this.$message.error('案件程度不能为空')
						return
					}
					if((typeof info[i].date) === 'object' && info[i].date) {
						info[i].date = Format(info[i].date, 'yyyy-MM-dd')
					}
				}
				let data = {
					financeNo: this.financeNo,
					info: JSON.stringify(info)
				}
				verifyDetail.saveLitigation(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryManager() { //尽调信息-成员名单列表查询------------查询
				verifyDetail.queryManager(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryManagerData.length === 0) {
							this.queryManagerData.push({
								name: '',
								type: [],
								shareHolding: '',
								identityType: '',
								identityNum: '',
								address: '',
								mobile: '',
								email: '',
								workingYears: '',
								files: [{
									key: '',
									url: ''
								}, {
									key: '',
									url: ''
								}],
							})
						} else if(res.data.data.length !== 0) {
							this.queryManagerData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			managerTypeChange(index, val) { //成员名单 下拉类型改变
				let data = {
					financeNo: this.financeNo,
					type: val.join()
				}
				verifyDetail.queryRepreManager(data).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.type.length !== 0) {
							this.queryManagerData.splice(index, 1, res.data.data)
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteManager(index) { //尽调信息-成员名单列表查询------------删除
				this.queryManagerData.splice(index, 1)
			},
			plusManager() { //尽调信息-成员名单列表查询------------添加
				this.queryManagerData.push({
					name: '',
					type: [],
					shareHolding: '',
					identityType: '',
					identityNum: '',
					address: '',
					mobile: '',
					email: '',
					workingYears: '',
					files: [{
						key: '',
						url: ''
					}, {
						key: '',
						url: ''
					}],
				})
			},
			saveManager() { //尽调信息-成员名单列表查询------------保存
				let info = baseUtil.copy(this.queryManagerData)
				for(let i = 0; i < info.length; i++) {
					if(!info[i].name) {
						this.$message.error('姓名不能为空')
						return
					}
					if(!info[i].type) {
						this.$message.error('类型不能为空')
						return
					} else {
						info[i].type = info[i].type.join();
					}
					if(!info[i].shareHolding) {
						this.$message.error('占股比例不能为空')
						return
					}
					if(!info[i].identityType) {
						this.$message.error('证件类型不能为空')
						return
					}
					if(!info[i].identityNum) {
						this.$message.error('证件号码不能为空')
						return
					}
					if(!info[i].mobile) {
						this.$message.error('手机号不能为空')
						return
					}
					if(!info[i].workingYears) {
						this.$message.error('从业年数不能为空')
						return
					}
				}
				let data = {
					financeNo: this.financeNo,
					info: JSON.stringify(info)
				}
				verifyDetail.saveManager(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryCredit() { //尽调信息-征信记录列表查询------------查询
				verifyDetail.queryCredit(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryCreditData.length === 0) {
							this.queryCreditData.push({
								type: '',
								typeText: '',
								versionType: '',
								versionTypeList: '',
								versionTypeText: '',
								belongName: '',
								queryDate: '',
								abnormalCount: '',
								queryTimes: '',
								desc: '',
							})
						} else if(res.data.data.length !== 0) {
							this.queryCreditData = res.data.data;
							for(let i = 0; i < this.queryCreditData.length; i++) {
								this.queryCreditData[i].versionTypeList
							}
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			creditTypeChange(index, val) { //征信记录 下拉类型改变
				let data = {
					financeNo: this.financeNo,
					type: val
				}
				verifyDetail.creditBelong(data).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length !== 0) {
							this.queryCreditData[index].versionTypeList = res.data.data
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteCredit(index) { //尽调信息-征信记录列表查询------------删除
				this.queryCreditData.splice(index, 1)
			},
			plusCredit() { //尽调信息-征信记录列表查询------------添加
				this.queryCreditData.push({
					type: '',
					typeText: '',
					versionType: '',
					versionTypeList: '',
					versionTypeText: '',
					belongName: '',
					queryDate: '',
					abnormalCount: '',
					queryTimes: '',
					desc: '',
				})
			},
			saveCredit() { //尽调信息-征信记录列表查询------------保存
				let info = baseUtil.copy(this.queryCreditData)
				for(let i = 0; i < info.length; i++) {

				}
				let data = {
					financeNo: this.financeNo,
					info: JSON.stringify(info)
				}
				verifyDetail.saveCredit(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryPaper() { //尽调信息-企业附件列表查询------------查询
				verifyDetail.queryPaper(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryPaperData.length === 0) {
							this.queryPaperData.push({
								type: '',
								typeText: '',
								num: '',
								startDate: '',
								endDate: '',
								status: '',
								approvalStatus: '',
								approvalStatusText: '',
								uploadDate: '',
								files: [],
							})
						} else if(res.data.data.length !== 0) {

							this.queryPaperData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			certificateTypeChange(index, val) { //企业附件 下拉证件类型改变
				let data = {
					financeNo: this.financeNo,
					type: val
				}
				verifyDetail.queryPaperByType(data).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length !== 0) {
							if(res.data.data.files.length !== 0) {
								this.queryPaperData[index].files = res.data.data.files
							}
							if(res.data.data.num !== 0) {
								this.queryPaperData[index].num = res.data.data.num
							}
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deletePaper(index) { //尽调信息-企业附件列表查询------------删除
				this.queryPaperData.splice(index, 1)
			},
			plusPaper() { //尽调信息-企业附件列表查询------------添加
				this.queryPaperData.push({
					type: '',
					typeText: '',
					num: '',
					startDate: '',
					endDate: '',
					status: '',
					approvalStatus: '',
					approvalStatusText: '',
					uploadDate: '',
					files: [],
				})
			},
			doMoreIdPhoto(index) { // 尽调企业附件新增证件照片
				this.queryPaperData[index].files.push({
					key: '',
					url: ''
				})
			},
			savePaper() { //尽调信息-企业附件列表查询------------保存
				let info = baseUtil.copy(this.queryPaperData)
				for(let i = 0; i < info.length; i++) {
					if((typeof info[i].startDate) === 'object' && info[i].startDate) {
						info[i].startDate = Format(info[i].startDate, 'yyyy-MM-dd')
					}
					if((typeof info[i].endDate) === 'object' && info[i].endDate) {
						info[i].endDate = Format(info[i].endDate, 'yyyy-MM-dd')
					}
					if(!info[i].num) {
						this.$message.error('证件号码不能为空')
						return
					}
					if(!info[i].startDate) {
						this.$message.error('起始日期不能为空')
						return
					}
					if(!info[i].endDate) {
						this.$message.error('	失效日期不能为空')
						return
					}
				}
				let data = {
					financeNo: this.financeNo,
					info: JSON.stringify(info)
				}
				verifyDetail.savePaper(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryPaper(); //尽调信息-企业附件列表查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEnterpriseTrade() { //尽调信息-财务及贸易统计-查询------------查询
				verifyDetail.queryEnterpriseTrade(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.queryEnterpriseTradeData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getStreamVolumesStatusList() { //尽调信息-财务及贸易统计交易数据可验证程度列表数据 ------下拉列表数据
				verifyDetail.streamVolumesStatus(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.streamVolumesStatusList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveEnterpriseTrade() { //尽调信息-企业附件列表查询------------保存
				let data = baseUtil.copy(this.queryEnterpriseTradeData)
				data.upstreamVolumes = JSON.stringify(data.upstreamVolumes)
				data.downstreamVolumes = JSON.stringify(data.downstreamVolumes)
				data.financeNo = this.financeNo
				verifyDetail.updateEnterpriseTrade(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryEnterpriseTrade(); //尽调信息-财务及贸易统计-查询------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEnterpriseFinance() { //尽调信息-其他信息-查询-查询------------查询
				verifyDetail.queryEnterpriseFinance(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.queryEnterpriseFinanceData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveEnterpriseFinance() { //尽调信息-其他信息------------保存
				let data = baseUtil.copy(this.queryEnterpriseFinanceData)
				data.financeNo = this.financeNo
				verifyDetail.saveEnterpriseFinance(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryEnterpriseFinance(); //尽调信息-财务及贸易统计-查询------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			getQueryEnterpriseOpinion() { //尽调信息-其他信息-互联网信息审核查询------------查询
				verifyDetail.queryEnterpriseOpinion(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryEnterpriseOpinionData.length === 0) {
							this.queryEnterpriseOpinionData.push({
								opinionDate: '',
								opinionDescription: '',
								severityType: '',
							})
						} else if(res.data.data.length !== 0) {
							this.queryEnterpriseOpinionData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteEnterpriseOpinion(index) { //尽调信息-其他信息-互联网信息审核------------删除
				this.queryEnterpriseOpinionData.splice(index, 1)
			},
			plusEnterpriseOpinion() { //尽调信息-其他信息-互联网信息审核------------添加
				this.queryEnterpriseOpinionData.push({
					opinionDate: '',
					opinionDescription: '',
					severityType: '',
				})
			},
			saveEnterpriseOpinion() { //尽调信息-其他信息-互联网信息审核------------保存
				let opinionData = baseUtil.copy(this.queryEnterpriseOpinionData)
				for(let i = 0; i < opinionData.length; i++) {
					if(!opinionData[i].opinionDate) {
						this.$message.error('日期不能为空')
						return
					}
					if(!opinionData[i].opinionDescription) {
						this.$message.error('描述不能为空')
						return
					}
					if(!opinionData[i].severityType) {
						this.$message.error('	程度不能为空')
						return
					}
					if((typeof opinionData[i].opinionDate) === 'object' && opinionData[i].opinionDate) {
						opinionData[i].opinionDate = Format(opinionData[i].opinionDate, 'yyyy-MM-dd')
					}
				}
				let data = {
					financeNo: this.financeNo,
					opinionData: JSON.stringify(opinionData)
				}
				verifyDetail.saveEnterpriseOpinion(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEnterpriseGuarantor() { //尽调信息-担保人-查询------------查询
				verifyDetail.queryEnterpriseGuarantor(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryEnterpriseGuarantorData.length === 0) {
							this.queryEnterpriseGuarantorData.push({
								guarantorId: '',
								name: '',
								address: '',
								identityNo: '',
								mobile: '',
								email: '',
								identityFrontKey: '',
								identityFrontUrl: '',
								identityBackKey: '',
								identityBackUrl: '',
								guaranteeValue: '',
								guaranteeValueFile: []
							})
						} else if(res.data.data.length !== 0) {
							this.queryEnterpriseGuarantorData = res.data.data;
							for(let i = 0; this.queryEnterpriseGuarantorData.length; i++) {
								this.queryEnterpriseGuarantorData[i].disabled = true;
							}
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			SelectGuarantor(index) { //点击选择触发
				this.selectGuarantorIndex = index;
				verifyDetail.selectGuarantorList(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0) {
							this.$alert('抱歉！暂时没有可选择的担保人！', '提示', {
								confirmButtonText: '确定',
								callback: action => {}
							});
							return;
						}
						this.dialogSelectGuarantorForm = true
						this.selectGuarantorListData = res.data.data;
						this.selectedGuarantor = res.data.data[0].guarantorId
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveSelectGuarantor() { //保存选择的担保人
				let guarantorId = this.selectedGuarantor
				verifyDetail.createTestKey(guarantorId).then(res => {
					if(res.data.code === '200') {
						this.queryEnterpriseGuarantorData.splice(this.selectGuarantorIndex, 1, res.data.data)
						this.queryEnterpriseGuarantorData[this.selectGuarantorIndex].disabled = true;
						this.dialogSelectGuarantorForm = false
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			doMoreGuaranteeFile(index) { // 尽调企业 担保人新增附件
				this.queryEnterpriseGuarantorData[index].guaranteeValueFile.push({
					key: '',
					url: ''
				})
			},
			deleteEnterpriseGuarantor(guarantorId, index) { //尽调信息-担保人-删除------------删除
				this.$confirm('此操作将删除该担保人, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					verifyDetail.deleteEnterpriseGuarantor(guarantorId).then(res => {
						if(res.data.code === '200') {
							this.queryEnterpriseGuarantorData.splice(index, 1)
							this.getQueryEnterpriseGuarantor();
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {});

			},
			plusEnterpriseGuarantor() { //尽调信息-担保人------------新增
				this.queryEnterpriseGuarantorData.push({
					guarantorId: '',
					name: '',
					address: '',
					identityNo: '',
					mobile: '',
					email: '',
					identityFrontKey: '',
					identityFrontUrl: '',
					identityBackKey: '',
					identityBackUrl: '',
					guaranteeValue: '',
					guaranteeValueFile: []
				})
			},
			saveEnterpriseGuarantor(item) { //尽调信息-担保人信息-保存------------保存
				let data = baseUtil.copy(item)
				if(!data.name) {
					this.$message.error('担保人姓名不能为空')
					return
				}
				if(!data.identityNo) {
					this.$message.error('担保人身份证号不能为空')
					return
				}
				if(!data.mobile) {
					this.$message.error('担保人手机号不能为空')
					return
				}
				if(!data.guaranteeValue) {
					this.$message.error('担保人价值评估不能为空')
					return
				}
				if(data.guaranteeValueFile) {
					let _arr = []
					for(let i = 0; i < data.guaranteeValueFile.length; i++) {
						_arr.push(data.guaranteeValueFile[i].key)
					}
					data.guaranteeValueFile = _arr.join()
				}
				data.financeNo = this.financeNo
				verifyDetail.saveEnterpriseGuarantor(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryDistributor() { //尽调信息-平台信息-查询------------查询
				verifyDetail.queryDistributor(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryDistributorData.length === 0) {
							this.queryDistributorData.push({
								selectable: 'able',
								centreId: '',
								name: '',
								username: '',
								password: '',
								companyName: '',
								businessLicense: '',
								contractName: '',
								contractNum: '',
								validDate: '',
								bankCode: '',
								bankBranch: '',
								bankAccountNum: '',
								files: [],
								financeNo: '',
							})
						} else if(res.data.data.length !== 0) {
							this.queryDistributorData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doMoreDistributorPhoto(index) { //新增合作合同
				this.queryDistributorData[index].files.push({
					key: '',
					url: ''
				})
			},
			deleteDistributor(id) { //尽调信息-平台信息-删除------------删除
				let data = {
					financeNo: this.financeNo,
					centreId: id
				}
				verifyDetail.deleteDistributor(data).then(res => {
					if(res.data.code === '200') {
						//        	this.queryDistributorData.splice(index,1)
						this.getQueryDistributor(); //尽调信息-平台信息-查询------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			plusDistributor() { //尽调信息-平台信息------------新增
				this.queryDistributorData.push({
					selectable: 'able',
					centreId: '',
					name: '',
					username: '',
					password: '',
					companyName: '',
					businessLicense: '',
					contractName: '',
					contractNum: '',
					validDate: '',
					bankCode: '',
					bankBranch: '',
					bankAccountNum: '',
					files: [],
					financeNo: '',
				})
			},
			saveDistributor(item) { //尽调信息-平台信息-保存------------保存
				let data = baseUtil.copy(item)
				data.files = JSON.stringify(data.files)
				if(!data.centreId) {
					this.$message.error('分销商关联编码不能为空')
					return
				}
				if(!data.name) {
					this.$message.error('分销商名称不能为空')
					return
				}
				if(!data.companyName) {
					this.$message.error('合同签署企业名称不能为空')
					return
				}
				if(!data.businessLicense) {
					this.$message.error('签署企业社会统一信用代码不能为空')
					return
				}
				if(!data.bankCode) {
					this.$message.error('回款银行不能为空')
					return
				}
				if(!data.bankBranch) {
					this.$message.error('回款银行网点不能为空')
					return
				}
				if(!data.bankAccountNum) {
					this.$message.error('回款银行账号')
					return
				}
				if((typeof data.validDate) === 'object' && data.validDate) {
					data.validDate = Format(data.validDate, 'yyyy-MM-dd')
				}
				data.financeNo = this.financeNo
				verifyDetail.operateDistributor(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryDistributor(); //尽调信息-平台信息-查询------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			submitCheck() { //尽调总提交
				verifyDetail.submitCheck(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQuerySignData()
						this.getQueryGrade(); //授信签署-评级-查询评级
						this.getQuerySummary()
						//          this.getQueryReview()
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			//新尽调end-----end
			getContractSignNameList(centreId) {
				loanClassificationDetail.contractSignNameList(centreId).then(res => {
					if(res.data.code === '200') {
						this.contractSignNameList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, //查询合同签署的企业名称列表
			handleUpdateVerify() {
				if(!this.queryVerifyData.creditEnterprise.abnormalCount && this.queryVerifyData.creditEnterprise.abnormalCount != "0") {
					this.$message.error('企业人行征信异常项不能为空！');
					return;
				}
				if(!this.queryVerifyData.creditRepre.abnormalCount && this.queryVerifyData.creditRepre.abnormalCount != "0") {
					this.$message.error('法定代表人人行征信异常项不能为空！');
					return;
				}
				if(!this.queryVerifyData.creditGuarantor.abnormalCount && this.queryVerifyData.creditGuarantor.abnormalCount != "0") {
					this.$message.error('担保人行征信异常项不能为空！');
					return;
				}
				for(let i = 0; i < this.queryVerifyData.centres.length; i++) {
					if(!this.queryVerifyData.centres[i].contractSignName) {
						this.$message.error('合同签署企业名称不能为空！');
						return;
					}
					if(!this.queryVerifyData.centres[i].transactionContractName) {
						this.$message.error('基础交易合同名称不能为空！');
						return;
					}
					//	      	if(!this.queryVerifyData.centres[i].transactionContractsNumbers){
					//	      		this.$message.error('基础交易合同编号不能为空！');
					//	      		return;
					//	      	}
					//    		if(!this.queryVerifyData.centres[i].contractEndDate){
					//	      		this.$message.error('合同有效期不能为空！');
					//	      		return;
					//	      	}
					for(let j = 0; j < this.queryVerifyData.centres[i].scmAccountDay.length; j++) {
						if(!this.queryVerifyData.centres[i].scmAccountDay[j].scmAccountDay) {
							this.$message.error('账期日不能为空！');
							return;
						}
						if(!this.queryVerifyData.centres[i].scmAccountDay[j].scmReturnDay) {
							this.$message.error('回款日不能为空！');
							return;
						}
					}
					if(!this.queryVerifyData.centres[i].bankCode) {
						this.$message.error('回款银行不能为空！');
						return;
					}
					if(!this.queryVerifyData.centres[i].bankBranch) {
						this.$message.error('回款银行网点不能为空！');
						return;
					}
					if(!this.queryVerifyData.centres[i].bankAccountNo) {
						this.$message.error('回款银行账号不能为空！');
						return;
					}
				}
				let data = baseUtil.copy(this.queryVerifyData)
				let sendData = {}
				sendData.financeNo = this.financeNo
				// 征信数据
				sendData.creditEnterprise = {
					abnormalCount: data.creditEnterprise.abnormalCount,
					abnormalDesc: data.creditEnterprise.abnormalDesc,
					fileName: data.creditEnterprise.fileName,
					fileKey: data.creditEnterprise.fileKey
				}
				sendData.creditEnterprise = JSON.stringify(sendData.creditEnterprise)
				sendData.creditRepre = {
					abnormalCount: data.creditRepre.abnormalCount,
					abnormalDesc: data.creditRepre.abnormalDesc,
					fileName: data.creditRepre.fileName,
					fileKey: data.creditRepre.fileKey
				}
				sendData.creditRepre = JSON.stringify(sendData.creditRepre)
				sendData.creditGuarantor = {
					abnormalCount: data.creditGuarantor.abnormalCount,
					abnormalDesc: data.creditGuarantor.abnormalDesc,
					fileName: data.creditGuarantor.fileName,
					fileKey: data.creditGuarantor.fileKey
				}
				sendData.creditGuarantor = JSON.stringify(sendData.creditGuarantor)
				for(let i = 0; i < data.centres.length; i++) {
					if((typeof data.centres[i].contractEndDate) === 'object' && data.centres[i].contractEndDate) {
						data.centres[i].contractEndDate = Format(data.centres[i].contractEndDate, 'yyyy-MM-dd')
					}
				}
				sendData.centres = JSON.stringify(data.centres)
				loanClassificationDetail.updateVerify(sendData).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQueryVerifyData()
						this.getQuerySummary()
						//          this.getQueryReview()
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 修改尽调 提交
			getQuerySignData() {
				loanClassificationDetail.querySign(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.querySignData = res.data.data
						this.rate.monthRate = res.data.data.monthRate
						this.rate.yearRate = res.data.data.yearRate
						if(!this.querySignData.bankAccountNo) {
							this.querySignData.bankAccountNo = this.queryVerifyData.centres[0].bankAccountNo
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 查询签署
			changeRate(loanRate) { //获取年利率，月利率
				loanClassificationDetail.calculatedInterest(loanRate).then(res => {
					if(res.data.code === '200') {
						this.rate.monthRate = res.data.data.monthRate
						this.rate.yearRate = res.data.data.yearRate
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryGrade() {
				loanClassificationDetail.queryGrade(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data) {
							this.queryGradeData = res.data.data
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 授信签署-评级-查询评级
			getQueryEvaluateGrade() {
				loanClassificationDetail.evaluateGrade(this.financeNo).then(res => {
					if(res.data.code === '200') {
						if(res.data.data) {
							this.queryGradeData = res.data.data
							this.$message.success(res.data.message)
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 授信签署-评级-重新评级
			getQueryGradeDetail() {
				loanClassificationDetail.queryGradeDetail(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.queryGradeDetailData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, //授信签署-评级-查询评级详情
			handleUpdateSign() {
				if(!this.querySignData.totalCreditLine && this.querySignData.totalCreditLine !== 0) {
					this.$message.error('总授信额度不能为空！');
					return;
				}
				if(!this.querySignData.creditLineExpireTime) {
					this.$message.error('融资额度的届满日不能为空！');
					return;
				}
				let data = baseUtil.copy(this.querySignData);
				data.financeNo = this.financeNo
				if((typeof data.creditLineExpireTime) == 'object') {
					data.creditLineExpireTime = Format(data.creditLineExpireTime, 'yyyy-MM-dd')
				}
				data.creditAndIterestRate = JSON.stringify(data.creditAndIterestRates)
				loanClassificationDetail.updateSign(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQuerySignData()
						this.getQueryGrade(); //授信签署-评级-查询评级
						this.getQuerySummary()
						//          this.getQueryReview()
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 修改签署 提交
			doTradeRmSummary() {
				loanClassificationDetail.queryTradeRmSummary(this.financeNo).then(res => {
					this.tradeRmSummaryData = []
					this.tradeVendorCodeData = []
					if(res.data.code === '200') {
						const data = res.data.data
						if(baseUtil.isArray(data)) {
							this.tradeRmSummaryData = data
							data.forEach((item, index) => {
								this.tradeVendorCodeData.push('')
							})
						}
						this.tradeRmSummaryShow = true
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 贸易资料风控 贸易统计详情
			doRefreshTrade() {
				loanClassificationDetail.refreshTrade(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.doTradeRmSummary();
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 刷新贸易资料风控 贸易统计详情
			doScorecard() {
				loanClassificationDetail.queryGradeDetail(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.queryGradeDetailData = res.data.data;
						this.adminSupplierRegisterQueryTardeRmSummaryResponse = res.data.data.adminSupplierRegisterQueryTardeRmSummaryResponse;
					} else {
						this.$message.error(res.data.message)
					}
				})
				this.scoreCardShow = true;
			}, //查询评分卡数据
			showPdf(type) {
				if(type == 'entrepreneur_third_party') { //企业第三方
					this.$showPDF('./static/pdf/entrepreneur_third_party.pdf');
				}
				if(type == 'entrepreneur_people_bank') { //企业人行
					loanClassificationDetail.creditEnterprise(this.financeNo).then(res => {
						if(res.data.code === '200') {
							this.$showPDF(res.data.data.fileUrl);
						} else {
							this.$message.error(res.data.message)
						}
					})
				}
				if(type == 'corporate_third_party') { //法人第三方
					this.$showPDF('./static/pdf/corporate_third_party.pdf');
				}
				if(type == 'corporate_people_bank') { //法人人行
					loanClassificationDetail.creditRepre(this.financeNo).then(res => {
						if(res.data.code === '200') {
							this.$showPDF(res.data.data.fileUrl);
						} else {
							this.$message.error(res.data.message)
						}
					})
				}
				if(type == 'underwriter_third_party') { //担保人第三方
					this.$showPDF('./static/pdf/underwriter_third_party.pdf');
				}
				if(type == 'underwriter_people_bank') { //担保人人行
					loanClassificationDetail.creditGuarantor(this.financeNo).then(res => {
						if(res.data.code === '200') {
							this.$showPDF(res.data.data.fileUrl);
						} else {
							this.$message.error(res.data.message)
						}
					})
				}
			},
			doSaveApproveTrade(index) {
				let code = this.tradeVendorCodeData[index] + ''
				code = code.trim()
				if(code) {
					loanClassificationDetail.saveApproveTrade(this.financeNo, code).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.tradeRmSummaryData = []
							this.tradeVendorCodeData = []
							const data = res.data.data
							if(baseUtil.isArray(data)) {
								this.tradeRmSummaryData = data
								data.forEach((item, index) => {
									this.tradeVendorCodeData.push('')
								})
								this.tradeVendorCodeData[index] = code
							}
						} else {
							this.$message.error(res.data.message)
						}
					})
				} else {
					this.$message.error('平台商户编码不能为空')
				}
			}, // 保存贸易统计资料
			doVerifyRmSummary() {
				loanClassificationDetail.queryVerifyRmSummary(this.financeNo).then(res => {
					this.verifyRmSummaryData = []
					if(res.data.code === '200') {
						//          const data = res.data.data
						//          for(let item in data) {
						//            let obj = data[item]
						//            obj.name = item
						//            for (let subItem in obj.bankStatements) {
						//              if (obj.platformTransactionAmount[subItem] === undefined) {
						//                obj.platformTransactionAmount[subItem] = 0
						//              }
						//            }
						//            this.verifyRmSummaryData.push(obj)
						//          }
						this.verifyRmSummaryData = res.data.data;
						this.verifyRmSummaryShow = true
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 贸易资料风控 贸易数据匹配
			doVerifyRmDetail(type) {
				loanClassificationDetail.queryVerifyRmDetail(this.financeNo, type).then(res => {
					this.verifyRmDetailData = {}
					if(res.data.code === '200') {
						const data = res.data.data
						if(data) {
							this.verifyRmDetailData = data
						}
						this.verifyRmDetailData.title = type === 1 ? '企业信用报告' : '法定代表人信用报告'
						this.verifyRmDetailShow = true
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 尽调资料风控 信用报告详情
			downloadFile(url) {
				window.location.href = url
			}, // 尽调资料风控 信用报告详情 下载 pdf
			refreshCentreAccount(centreId) { //刷新贸易资料交易平台编码
				let data = {
					centreId: centreId,
					financeNo: this.financeNo
				}
				loanClassificationDetail.refreshCentreAccount(data).then(res => {
					if(res.data.code === '200') {
						//    			this.getQueryTradeData();//刷新贸易资料
						this.$message.success(res.data.message);
					} else {
						this.$message.error(res.data.message);
					}
				})
			},

			validationInfoShow() { //信息校验与验证点击
				this.getValidationInfo();
			},
			getValidationInfo() { //获取信息校验与验证列表
				loanClassificationDetail.validationInfo(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.validationInfoList = res.data.data
						this.validationInfoDialogShow = true;
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			verifyValidationInfo(item, id) { //调用信息校验和认证-修改
				var that = this;
				let data = {
					item: item,
					id: id,
				}
				loanClassificationDetail.verifyValidationInfo(data).then(res => {
					if(res.data.code === '200') {
						this.getValidationInfo();
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			communicationRecordShow() { //沟通记录点击
				this.getQueryKnow();
			},
			getQueryKnow() { //获取沟通记录列表
				loanClassificationDetail.getQueryKnow(this.financeNo).then(res => {
					if(res.data.code === '200') {
						this.communicationRecordsList = res.data.data
						this.communicationDialogShow = true;
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			submitCommunicationForm(formName) { //提交沟通记录
				let data = {
					content: this.communicationForm.content,
					financeNo: this.financeNo
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						loanClassificationDetail.addKnow(data).then(res => {
							if(res.data.code === '200') {
								this.$refs[formName].resetFields();
								this.getQueryKnow();
								this.$message.success(res.data.message);
							} else {
								this.$message.error(res.data.message);
							}
						})
						this.communicationForm.content
					} else {
						return false;
					}
				});
			},
			resetCommunicationForm(formName) { //重置沟通记录表单
				this.$refs[formName].resetFields();
			},
			deletCommunication(id) {
				this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					loanClassificationDetail.deleteKnow(id).then(res => {
						if(res.data.code === '200') {
							this.getQueryKnow();
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						} else {
							this.$message.error(res.data.message);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "loanClassificationDetail.scss";
</style>
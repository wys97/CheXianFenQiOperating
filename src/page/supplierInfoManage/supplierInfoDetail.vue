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
			<ul class="flex-item" v-if="querySummaryData">
				<li>{{querySummaryData.content}}</li>
				<li>进件通过时间：{{querySummaryData.passTime}}</li>
			</ul>
			<div class="flex-item" style="text-align: right;padding-top: 0;">
				<el-button :type="
      		querySummaryData.status=='FROZEN'?'warning':
      		querySummaryData.status=='ENABLED'?'success':
      		querySummaryData.status=='DISABLED'?'danger':''" size="mini">
					{{querySummaryData.statusText}}
				</el-button>
			</div>
		</div>
		<div class="content">
			<div class="flex-item" style="position: relative;">
				<!--融资概况，基本信息，担保信息，渠道信息，授信管理,合同管理-->
				<el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
					<el-tab-pane label="商户概况" name="first">
						<div class="tab-content">
							<div class="info-list">
								<div style="line-height: 40px;">平台授信限额</div>
								<template v-if="supplierSurveyData.platform">
									<el-table :data="supplierSurveyData.platform" border style="width: 100%">
										
										<el-table-column prop="creditPart" label="">
											<template slot-scope="scope">
												{{scope.row.creditPart}}
											</template>
										</el-table-column>
										<el-table-column prop="signLimit" label="额度">
											<template slot-scope="scope">
												{{scope.row.signLimit}} 元
											</template>
										</el-table-column>
										<el-table-column prop="usedSignLimit" label="已用额度">
											<template slot-scope="scope">
												{{scope.row.usedSignLimit}} 元
											</template>
										</el-table-column>
										<el-table-column prop="onSignLimit" label="在途额度">
											<template slot-scope="scope">
												{{scope.row.onSignLimit}} 元
											</template>
										</el-table-column>
										<el-table-column prop="surplusLimit" label="剩余可用额度">
											<template slot-scope="scope">
												{{scope.row.surplusLimit}} 元
											</template>
										</el-table-column>
									</el-table>
								</template>
								<div style="line-height: 40px;">资方授信明细</div>
								<template v-if="supplierSurveyData.capital">
									<el-table :data="supplierSurveyData.capital" border style="width: 100%">
										
										<el-table-column prop="creditPart" label="">
											<template slot-scope="scope">
												{{scope.row.creditPart}}
											</template>
										</el-table-column>
										<el-table-column prop="signLimit" label="额度">
											<template slot-scope="scope">
												{{scope.row.signLimit}} 元
											</template>
										</el-table-column>
										<el-table-column prop="usedSignLimit" label="已用额度">
											<template slot-scope="scope">
												{{scope.row.usedSignLimit}} 元
											</template>
										</el-table-column>
										<el-table-column prop="onSignLimit" label="在途额度">
											<template slot-scope="scope">
												{{scope.row.onSignLimit}} 元
											</template>
										</el-table-column>
										<el-table-column prop="surplusLimit" label="剩余可用额度">
											<template slot-scope="scope">
												{{scope.row.surplusLimit}} 元
											</template>
										</el-table-column>
									</el-table>
								</template>
								
							</div>
							<div class="info-list">
								<el-form label-width="170px" size="mini" label-position="right">
									<div style="line-height: 40px;">设置</div>
									<el-form-item label="平台限额：">
										<template>
											<div  style="width: 300px;">
												<el-input v-model="supplierSetupData.platformCredit" class="must_input">
													<template slot="append">元</template>
												</el-input>
											</div>
										</template>
									</el-form-item>
									<el-form-item label="状态：">
										<template>
											<el-radio-group v-model="supplierSetupData.status">
												<el-radio v-for="(val,key) in supplierEnableStatusList" :label="key" :key="key">{{val}}</el-radio>
											</el-radio-group>
										</template>
									</el-form-item>
	
									<div style="text-align: right;margin-top: 15px;">
										<el-button @click="saveSupplierSetup" type="primary" size="mini">保存</el-button>
									</div>
								</el-form>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="基本信息" name="second">
						<div class="tab-content">
							<!--企业信息-->
							<el-collapse @change="changeVerifyFirmInfo" v-model="activeVerifyFirmInfoNames" class="marginBotten">
								<el-collapse-item name="FirmInfoOne">
									<template slot="title">
										企业基本信息
									</template>
									<el-form ref="verifyFirmInfoForm" label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<div>客户类型</div>
											<el-form-item label="客户类型：">
												<template slot-scope="scope">
													<el-select v-if="queryCustomerTypeList" v-model="customTypeData.customerType" class="must_input" filterable placeholder="请选择">
														<el-option v-for="(val,key) in queryCustomerTypeList " :key="key" :label="val" :value="key">
														</el-option>
													</el-select>
												</template>
											</el-form-item>
											<el-form-item label="业务类型：">
												<template>
													<el-radio-group v-model="customTypeData.financeType">
														<el-radio v-for="(val,key) in queryFinanceTypeList" :label="key" :key="key">{{val}}</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
											<div style="text-align: right;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveCustomType" type="primary" size="mini">保存</el-button>
											</div>
										</div>
										<div class="info-list">
											<div>基本情况</div>
											<el-form-item label="企业名称：">
												<el-input v-model="enterpriseInfoData.enterpriseName" :disabled="true" class="must_input" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="统一社会信用代码：">
												<el-input v-model="enterpriseInfoData.businessLicenseNo" :disabled="true" class="must_input" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="法定代表人姓名：">
												<el-input v-model="enterpriseInfoData.repreName" :disabled="true" class="must_input" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="法定代表人身份证号：">
												<el-input v-model="enterpriseInfoData.repreIdCard" :disabled="true" class="must_input" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="法定代表人手机号：">
												<el-input v-model="enterpriseInfoData.repreMobile" :disabled="true" class="must_input" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="注册地址：">
												<el-input v-model="enterpriseInfoData.registerAddress" class="must_input" type="textarea" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="成立日期：">
												<el-date-picker v-model="enterpriseInfoData.establishDate" class="must_input" align="right" type="date" placeholder="选择日期">
												</el-date-picker>
											</el-form-item>
											<el-form-item label="联系电话：">
												<el-input v-model="enterpriseInfoData.mobile" class="must_input" style="width: 150px;">
												</el-input>
											</el-form-item>
											<el-form-item label="传真：">
												<el-input v-model="enterpriseInfoData.fax" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="营业执照：">
												<template>
													<p class="img_bgc">
														<img v-if="enterpriseInfoData.licensePicUrl" @click="lookImg(enterpriseInfoData.licensePicUrl)" alt="营业执照" :src='enterpriseInfoData.licensePicUrl'>
													</p>
												</template>
											</el-form-item>

											<el-form-item label="经营地：">
												<template slot-scope="scope">
													<el-select v-model="enterpriseInfoData.locationType" class="must_input" filterable placeholder="请选择">
														<el-option v-for="(val,key) in locationTypeList" :key="key" :label="val" :value="key">
														</el-option>
													</el-select>
												</template>
											</el-form-item>
											<el-form-item label="经营地面积：">
												<div style="width: 300px;">
													<el-input v-model="enterpriseInfoData.locationArea">
														<template slot="append">平米</template>
													</el-input>
												</div>
											</el-form-item>
											
											<el-form-item label="经营地情况：">
												<template v-if="officeStableList">
													<el-radio-group v-model="enterpriseInfoData.officeStable"  class="must_input">
														<div v-for="(val,key) in officeStableList">
															<el-radio  :label="key" :key="key">{{val}}</el-radio>
														</div>
													</el-radio-group>
												</template>
											</el-form-item>
											<el-form-item label="经营场所地址：">
												<el-input type="textarea" :rows="4" v-model="enterpriseInfoData.locationAddress">
												</el-input>
											</el-form-item>
											<el-form-item label="员工人数：">
												<div style="width: 300px;">
													<el-input v-model="enterpriseInfoData.staffNo">
														<template slot="append">人</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="水电月缴费用：">
												<div style="width: 300px;">
													<el-input v-model="enterpriseInfoData.utilitiesMonth">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="年净利润金额：">
												<div style="width: 300px;">
													<el-input v-model="enterpriseInfoData.profit">
														<template slot="append">元</template>
													</el-input>
												</div>
											</el-form-item>
											<el-form-item label="是否有子公司：">
												<template>
													<el-radio-group v-model="enterpriseInfoData.hasSub">
														<el-radio :label="1">是</el-radio>
														<el-radio :label="0">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>
											<el-form-item label="备注：">
												<el-input type="textarea" :rows="4" v-model="enterpriseInfoData.remark">
												</el-input>
											</el-form-item>
											<div style="text-align: right;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveEnterpriseInfo" type="primary" size="mini">保存</el-button>
											</div>
										</div>
										
										<div class="info-list">
											<div>法定代表人信息</div>
											<el-form-item label="法定代表人姓名：">
												<el-input v-model="queryEnterpriseGuarantorData.name" :disabled="true" style="width: 300px;">
												</el-input>
												<!--<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"  @click="SelectGuarantor(index)" type="primary" size="mini">选择</el-button>-->
											</el-form-item>
											<el-form-item label="法定代表人身份证号：">
												<el-input v-model="queryEnterpriseGuarantorData.idcardNo" :disabled="true" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="性别：">
												<el-input v-model="queryEnterpriseGuarantorData.gender" :disabled="true" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="法定代表人地址：">
												<el-input v-model="queryEnterpriseGuarantorData.address" type="textarea" :rows="2">
												</el-input>
											</el-form-item>
											<el-form-item label="法定代表人手机号：">
												<el-input v-model="queryEnterpriseGuarantorData.mobile" :disabled="true" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="法定代表人邮箱：">
												<el-input v-model="queryEnterpriseGuarantorData.email" style="width: 300px;">
												</el-input>
											</el-form-item>
											</el-form-item>
											<el-form-item label="法定代表人身份证：">
												<template>
													<p class="img_bgc">
														<img v-if="queryEnterpriseGuarantorData.idcardPicFront" @click="lookImg(queryEnterpriseGuarantorData.idcardPicFront)" alt="正面" :src='queryEnterpriseGuarantorData.idcardPicFront'>
														<img v-if="queryEnterpriseGuarantorData.idcardPicBack" @click="lookImg(queryEnterpriseGuarantorData.idcardPicBack)" alt="反面" :src='queryEnterpriseGuarantorData.idcardPicBack'>
													</p>
												</template>
											</el-form-item>
											<el-form-item label="学历：">
												<template slot-scope="scope">
													<el-select v-model="queryEnterpriseGuarantorData.educationBackground" filterable placeholder="请选择">
														<el-option key="PRIMARY" label="小学" value="PRIMARY"></el-option>
														<el-option key="JUNIOR" label="初中" value="JUNIOR"></el-option>
														<el-option key="SENIOR" label="中专/高中" value="SENIOR"></el-option>
														<el-option key="COLLEGE" label="专科" value="COLLEGE"></el-option>
														<el-option key="BACHELOR" label="本科" value="BACHELOR"></el-option>
														<el-option key="MASTER" label="硕士" value="MASTER"></el-option>
														<el-option key="DOCTOR" label="博士" value="DOCTOR"></el-option>
													</el-select>
												</template>
											</el-form-item>
											<el-form-item label="婚姻状况：">
												<el-input v-model="queryEnterpriseGuarantorData.maritalStatusText" style="width: 180px;">
												</el-input>
												<template slot-scope="scope">
													<el-select v-model="queryEnterpriseGuarantorData.maritalStatus" filterable placeholder="请选择">
														<el-option key="UNMARRIED" label="未婚" value="UNMARRIED"></el-option>
														<el-option key="MARRIED" label="已婚" value="MARRIED"></el-option>
														<el-option key="DIVORCED" label="离异" value="DIVORCED"></el-option>
														<el-option key="REMARRIED" label="再婚" value="REMARRIED"></el-option>
													</el-select>
												</template>
											</el-form-item>
											<el-form-item label="本地户口：">
												<template>
													<el-radio-group v-model="queryEnterpriseGuarantorData.localResident">
														<el-radio :label="1">是</el-radio>
														<el-radio :label="0">否</el-radio>
													</el-radio-group>
												</template>
											</el-form-item>

											<div style="text-align: right;margin-top: 15px;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveEnterpriseGuarantor()" type="primary" size="mini">保存</el-button>
											</div>
										</div>
									
									
										<div class="info-list">
											<div>开户许可证</div>
											<el-form-item label="开户名称：">
												<el-input v-model="accountLicenseData.accountName" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="开户银行：">
												<el-input v-model="accountLicenseData.bankName" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="开户网点：">
												<el-input v-model="accountLicenseData.branchBankName" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="银行账号：">
												<el-input v-model="accountLicenseData.accountNo" style="width: 300px;">
												</el-input>
											</el-form-item>
											<el-form-item label="开户许可证：">
												<template>
													<Uploads v-model="accountLicenseData.picKey" :fileUrl="accountLicenseData.picUrl" :dataObj="uploadImgData" actionUrl="/admin/supply_data/upload_image_file"></Uploads>
												</template>
											</el-form-item>
											<div style="text-align: right;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveAccountLicense" type="primary" size="mini">保存</el-button>
											</div>
										</div>

										<div class="info-list">
											<el-form-item label="股东名单：">
												<template>
													<el-table :data="queryEquityData" border style="width: 100%">
														<el-table-column prop="name" label="姓名">
															<template slot-scope="scope">
																<el-input type="input" v-model="scope.row.name"></el-input>
															</template>
														</el-table-column>
														<el-table-column prop="type" label="类型">
															<template slot-scope="scope">
																<el-select v-model="scope.row.type" placeholder="请选择">
																	<el-option v-for="(val,key) in capitalTypeSeletList" :key="key" :label="val" :value="key">
																	</el-option>
																</el-select>
															</template>
														</el-table-column>
														<el-table-column prop="amount" label="出资金额">
															<template slot-scope="scope">
																<el-input type="input" v-model="scope.row.amount">
																	<template slot="append">万元</template>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column prop="shareHolding" label="持股比例">
															<template slot-scope="scope">
																<el-input type="input" v-model="scope.row.shareHolding">
																	<template slot="append">%</template>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column prop="changeDescription" type="index" label="操作" width="90px">
															<template slot-scope="scope">
																<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryEquityData.length>1" @click="deleteEquity(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
																<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryEquityData.length===scope.$index+1" @click="plusEquity" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
															</template>
														</el-table-column>
													</el-table>
												</template>
											</el-form-item>
											<div style="text-align: right;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveEquity" type="primary" size="mini">保存</el-button>
											</div>
										</div>
										<div class="info-list">
											<el-form-item label="股东变更信息：">
												<template>
													<el-table :data="queryOfficeData" border style="width: 100%">
														<el-table-column prop="type" label="变更事项">
															<template slot-scope="scope">
																<el-select v-model="scope.row.type" placeholder="请选择">
																	<el-option v-for="(val,key) in changeTypeSeletList" :key="key" :label="val" :value="key">
																	</el-option>
																</el-select>
															</template>
														</el-table-column>
														<el-table-column prop="before" label="变更前内容">
															<template slot-scope="scope">
																<el-input type="textarea" v-model="scope.row.before">
																</el-input>
															</template>
														</el-table-column>
														<el-table-column prop="after" label="变更后内容">
															<template slot-scope="scope">
																<el-input type="textarea" v-model="scope.row.after">
																</el-input>
															</template>
														</el-table-column>
														<el-table-column prop="changeDate" label="变更日期" width="150">
															<template slot-scope="scope">
																<el-date-picker v-model="scope.row.changeDate" align="right" type="date" placeholder="选择日期">
																</el-date-picker>
															</template>
														</el-table-column>

														<el-table-column prop="address" type="index" label="操作" width="90px">
															<template slot-scope="scope">
																<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryOfficeData.length>1" @click="deleteOffice(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
																<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryOfficeData.length===scope.$index+1" @click="plusOffice" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
															</template>
														</el-table-column>
													</el-table>
												</template>
											</el-form-item>
											<div style="text-align: right;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveOffice" type="primary" size="mini">保存</el-button>
											</div>
										</div>
										<div class="info-list">
											<div style="line-height: 40px;">企业发展历史</div>
											<el-form-item label="企业发展历史：">
												<el-input type="textarea" :rows="4" v-model="extendInfoData.history">
												</el-input>
											</el-form-item>
											<div style="line-height: 40px;">企业创始人、实际控制人、法人代表、最大自然人股东情况和背景</div>
											<el-form-item label="背景：">
												<el-input type="textarea" :rows="4" v-model="extendInfoData.background">
												</el-input>
											</el-form-item>
											<div style="line-height: 40px;">与我方往来情况及拓展渠道来源</div>
											<el-form-item label="往来情况：">
												<el-input type="textarea" :rows="4" v-model="extendInfoData.comeAndGo">
												</el-input>
											</el-form-item>
											<div style="text-align: right;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveExtendInfo" type="primary" size="mini">保存</el-button>
											</div>
										</div>
									</el-form>
								</el-collapse-item>
							</el-collapse>
						</div>
					</el-tab-pane>
					
					<el-tab-pane label="财产信息" name="third">
						<div class="tab-content">
							<el-collapse @change="changeVerifyAssetInfo" v-model="activeVerifyAssetInfoNames" class="marginBotten">
								<el-collapse-item name="AssetInfoOne">
									<template slot="title">
										财产信息
									</template>
									<el-form ref="verifyAssetInfoForm" label-width="170px" size="mini" label-position="right">
										<!--房产数据-->
										<div class="info-list">
											<template>
												<el-table :data="queryHouseInfoData" border style="width: 100%">
													<el-table-column prop="assetSubType" type="index" width="150px" label="房产类型">
														<template slot-scope="scope">
															<el-select v-model="scope.row.assetSubType" placeholder="请选择">
																<el-option v-for="item in assetSubHouseTypeList" :key="item.type" :label="item.typeText" :value="item.type">
																</el-option>
															</el-select>
														</template>
													</el-table-column>
													<el-table-column prop="estimatedValue" label="估值">
														<template slot-scope="scope">
															<el-input type="input" v-model="scope.row.estimatedValue">
																<template slot="append">万元</template>
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="mortgaged" type="index" width="150px" label="是否按揭">
														<template slot-scope="scope">
															<el-select v-model="scope.row.mortgaged" placeholder="请选择">
																<el-option :key="true" label="是" :value="true">
																</el-option>
																<el-option :key="false" label="否" :value="false">
																</el-option>
															</el-select>
														</template>
													</el-table-column>
													<el-table-column prop="paymentMonthly" label="房贷月还">
														<template slot-scope="scope">
															<el-input type="input" v-model="scope.row.paymentMonthly">
																<template slot="append">元</template>
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="assetName" label="房产地址">
														<template slot-scope="scope">
															<el-input type="textarea" v-model="scope.row.assetName">
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="assetName" type="index" label="操作" width="90px">
														<template slot-scope="scope">
															<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryHouseInfoData.length>1" @click="deleteHouseInfo(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
															<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryHouseInfoData.length===scope.$index+1" @click="plusHouseInfo" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
														</template>
													</el-table-column>
												</el-table>
											</template>
										</div>
										<!--车辆数据-->
										<div class="info-list">
											<template>
												<el-table :data="queryCarInfoData" border style="width: 100%">
													<el-table-column prop="assetSubType" type="index" width="150px" label="车类型">
														<template slot-scope="scope">
															<el-select v-model="scope.row.assetSubType" placeholder="请选择">
																<el-option v-for="item in assetSubCarTypeList" :key="item.type" :label="item.typeText" :value="item.type">
																</el-option>
															</el-select>
														</template>
													</el-table-column>
													<el-table-column prop="estimatedValue" label="估值">
														<template slot-scope="scope">
															<el-input type="input" v-model="scope.row.estimatedValue">
																<template slot="append">万元</template>
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="mortgaged" type="index" width="150px" label="是否按揭">
														<template slot-scope="scope">
															<el-select v-model="scope.row.mortgaged" placeholder="请选择">
																<el-option :key="true" label="是" :value="true">
																</el-option>
																<el-option :key="false" label="否" :value="false">
																</el-option>
															</el-select>
														</template>
													</el-table-column>
													<el-table-column prop="paymentMonthly" label="车贷月还">
														<template slot-scope="scope">
															<el-input type="input" v-model="scope.row.paymentMonthly">
																<template slot="append">元</template>
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="assetName" label="车辆信息">
														<template slot-scope="scope">
															<el-input type="textarea" v-model="scope.row.assetName">
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="assetName" type="index" label="操作" width="90px">
														<template slot-scope="scope">
															<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryCarInfoData.length>1" @click="deleteCarInfo(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
															<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryCarInfoData.length===scope.$index+1" @click="plusCarInfo" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
														</template>
													</el-table-column>
												</el-table>
											</template>
											<div style="text-align: right;margin-top: 15px;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveManager" type="primary" size="mini">保存</el-button>
											</div>
										</div>
									</el-form>
								</el-collapse-item>
							</el-collapse>
						</div>
					</el-tab-pane>
					<el-tab-pane label="公司管理情况" name="fourth">
						<div class="tab-content">
							<!--公司管理情况-->
							<el-collapse @change="changeVerifyFirmPlatform" v-model="activeVerifyFirmPlatformNames" class="marginBotten">
								<el-collapse-item name="FirmFinancialPlatformOne">
									<template slot="title">
										企业经营模式
									</template>
									<el-form ref="verifyAssetInfoForm" label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<div style="line-height: 40px;">企业经营模式：</div>
											<el-form-item label="企业经营模式：">
												<el-input type="textarea" :rows="4" v-model="companyManageData.businessModel">
												</el-input>
											</el-form-item>
											<div style="line-height: 40px;">基本组织架构（业务）</div>
											<el-form-item label="基本组织架构：">
												<el-input type="textarea" :rows="4" v-model="companyManageData.organizationStructure">
												</el-input>
											</el-form-item>
											<div style="line-height: 40px;">管理技术情况</div>
											<el-form-item label="系统使用情况：">
												<el-input type="textarea" :rows="4" v-model="companyManageData.managementTechnique">
												</el-input>
											</el-form-item>
											<div style="text-align: right;">
												<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveCompanyManage" type="primary" size="mini">保存</el-button>
											</div>
										</div>
									</el-form>
								</el-collapse-item>
							</el-collapse>
						</div>
					</el-tab-pane>
					<el-tab-pane label="关联公司情况" name="fifth">
						<div class="tab-content">
							<el-collapse @change="changeVerifyAffiliatedCompany" v-model="activeVerifyAffiliatedCompanyNames" class="marginBotten">
								<el-collapse-item name="AffiliatedCompanyOne">
									<template slot="title">
										关联公司情况
									</template>
									<el-form ref="verifyAffiliatedCompanyForm" label-width="170px" size="mini" label-position="right">
										<div class="info-list">
											<template>
												<el-table :data="affiliatedCompanyData" border style="width: 100%">
													<el-table-column prop="affiliateType" label="与借款企业关系">
														<template slot-scope="scope">
															<el-select v-model="scope.row.affiliateType" placeholder="请选择">
																<el-option v-for="item in affiliateTypeList" :key="item.type" :label="item.typeText" :value="item.type">
																</el-option>
															</el-select>
														</template>
													</el-table-column>
													<el-table-column prop="enterpriseName" label="企业名称">
														<template slot-scope="scope">
															<el-input type="input" v-model="scope.row.enterpriseName">
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="enterpriseController" label="实际控制人">
														<template slot-scope="scope">
															<el-input type="input" v-model="scope.row.enterpriseController">
															</el-input>
														</template>
													</el-table-column>
													<el-table-column prop="mainBusiness" label="主营业务简介">
														<template slot-scope="scope">
															<el-input type="textarea" v-model="scope.row.mainBusiness">
															</el-input>
														</template>
													</el-table-column>

													<el-table-column prop="mainBusiness" type="index" label="操作" width="90px">
														<template slot-scope="scope">
															<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&affiliatedCompanyData.length>1" @click="deleteAffiliatedCompany(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
															<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&affiliatedCompanyData.length===scope.$index+1" @click="plusAffiliatedCompany" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
														</template>
													</el-table-column>
												</el-table>
											</template>
										</div>
										<div style="text-align: right;margin-top: 20px;">
											<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveAffiliatedCompany" type="primary" size="mini">保存</el-button>
										</div>
									</el-form>
								</el-collapse-item>
							</el-collapse>
						</div>
					</el-tab-pane>
					<el-tab-pane label="主营业务及市场" name="sixth">
						<div class="tab-content">
							<!--主营业务及市场-->
							<el-form ref="verifyAssetInfoForm" label-width="170px" size="mini" label-position="right">
								<div class="info-list">
									<div style="line-height: 40px;">客户所处市场及市场地位</div>
									<el-form-item label="市场及市场地位：">
										<el-input type="textarea" :rows="4" v-model="marketInfoData.position">
										</el-input>
									</el-form-item>
									<div style="line-height: 40px;">市场增长趋势及增长速度</div>
									<el-form-item label="市场趋势：">
										<el-input type="textarea" :rows="4" v-model="marketInfoData.trend">
										</el-input>
									</el-form-item>
									<div style="line-height: 40px;">业务循环分析</div>
									<el-form-item label="业务循环分析：">
										<el-input type="textarea" :rows="4" v-model="marketInfoData.cycle">
										</el-input>
									</el-form-item>
									<div style="text-align: right;">
										<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveMarketInfo" type="primary" size="mini">保存</el-button>
									</div>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane label="上下游情况" name="seventh">
						<div class="tab-content">
							<el-form ref="verifyAssetInfoForm" label-width="170px" size="mini" label-position="right">
								<div class="info-list">
									<div style="line-height: 40px;">关联泰坦云数据</div>
									<el-form-item label="商家编码：">
										<el-input @blur="queryStreamData" type="input" style="width: 300px;" v-model="merchantCode">
										</el-input>
									</el-form-item>
									<div style="text-align: left;">
										<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveQueryTitanUpdownstream" type="primary">保存</el-button>
									</div>
								</div>
								<div class="info-list">
									<div style="line-height: 40px;">平台基本信息</div>
									<el-form-item label="公司全称：">
										<span>{{titanUpdownstreamData.merchantName}}</span>
									</el-form-item>
								</div>
								<div class="info-list">
									<div style="line-height: 40px;">供应商（上游）贸易数据</div>
									<template>
										<el-table :data="titanUpdownstreamData.upStream" border style="width: 100%">
											<el-table-column prop="date" type="index" label="序号" width="60">
											</el-table-column>
											<el-table-column prop="streamName" label="公司名称">
											</el-table-column>
											<el-table-column prop="product" label="产品/服务">
											</el-table-column>
											<el-table-column prop="tradeCount" label="年销售量（近12月）">
											</el-table-column>
											<el-table-column prop="tradeAmount" label="年销售额（近12月）">
											</el-table-column>
											<el-table-column prop="settleMethod" label="结算方式">
											</el-table-column>
											<el-table-column prop="tradePercent" label="上游销售额占比">
											</el-table-column>
										</el-table>
									</template>
								</div>
								<div class="info-list">
									<div style="line-height: 40px;">渠道商（下游）贸易数据</div>
									<template>
										<el-table :data="titanUpdownstreamData.downStream" border style="width: 100%">
											<el-table-column prop="date" type="index" label="序号" width="60">
											</el-table-column>
											<el-table-column prop="streamName" label="公司名称">
											</el-table-column>
											<el-table-column prop="product" label="产品/服务">
											</el-table-column>
											<el-table-column prop="tradeCount" label="年销售量（近12月）">
											</el-table-column>
											<el-table-column prop="tradeAmount" label="年销售额（近12月）">
											</el-table-column>
											<el-table-column prop="settleMethod" label="结算方式">
											</el-table-column>
											<el-table-column prop="tradePercent" label="下游销售额占比">
											</el-table-column>
										</el-table>
									</template>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane label="借款信息" name="nine">
						<div class="tab-content">
							<el-form ref="verifyFirmInfoForm" label-width="170px" size="mini" label-position="right">
								<div class="info-list">
									<el-form-item label="申请额度：">
										<el-input v-model="borrowInfoData.creditLine" :disabled="true" style="width: 300px;">
											<template slot="append">万元</template>
										</el-input>
									</el-form-item>
									<el-form-item label="借款期限：">
										<el-input v-model="borrowInfoData.creditLineTimeLimit" :disabled="true" style="width: 300px;">
										</el-input>
									</el-form-item>
									<el-form-item label="借款用途：">
										<el-input v-model="borrowInfoData.creditLineUse" :disabled="true" style="width: 300px;">
										</el-input>
									</el-form-item>
									<el-form-item label="所属场景方：">
										<el-input v-model="borrowInfoData.customerSource" :disabled="true" style="width: 300px;">
										</el-input>
									</el-form-item>
									<el-form-item label="产品：">
										<template slot-scope="scope">
											<el-select v-model="borrowInfoData.loanProduct" filterable placeholder="请选择">
												<el-option v-for="(val,key) in loanProductTypeList" :key="key" :label="val" :value="key">
												</el-option>
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="贷款类型：">
										<template slot-scope="scope">
											<el-select v-model="borrowInfoData.val" filterable placeholder="请选择">
												<el-option key="1" label="担保贷款" value="1">
												</el-option>
												<!--<el-option
										      v-for="(val,key) in locationTypeList"
										      :key="key"
										      :label="val"
										      :value="key">
										    </el-option>-->
											</el-select>
										</template>
									</el-form-item>
									<el-form-item label="还款来源：">
										<template slot-scope="scope">
											<el-select v-model="borrowInfoData.val" filterable placeholder="请选择">
												<el-option key="1" label="日常收入" value="1">
												</el-option>
												<!--<el-option
										      v-for="(val,key) in locationTypeList"
										      :key="key"
										      :label="val"
										      :value="key">
										    </el-option>-->
											</el-select>
										</template>
									</el-form-item>
									<div style="text-align: right;">
										<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveBorrowInfo" type="primary">保存</el-button>
									</div>
								</div>
							</el-form>

						</div>
					</el-tab-pane>
					<el-tab-pane label="影像资料" name="ten">
						<div class="tab-content">
							<el-form ref="verifySupplyDataForm" label-width="170px" size="mini" label-position="right">
								<div class="info-list">
									<template>
										<el-table :data="supplyDataData.items" border style="width: 100%">
											<el-table-column prop="enterpriseName" type="index" width="80" label="序号">
											</el-table-column>
											<el-table-column prop="itemText" min-width="200" label="影像资料类型">
												<template slot-scope="scope">
													{{scope.row.itemText}}
												</template>
											</el-table-column>
											<el-table-column prop="content" min-width="200" label="已上传的内容">
												<template slot-scope="scope">
													<div v-if="scope.row.content.length>0" v-for="(item,contentIndex) in scope.row.content">
														<a :href="item.url" target="view_window">
															<span class="file_name">{{item.fileName}}</span>
														</a>
														<span v-if="scope.row.upload" @click="delFile(item.id,scope.$index,contentIndex)" class="file_del">删除</span>
													</div>
												</template>
											</el-table-column>

											<el-table-column prop="item" type="index" label="选择上传" width="190px">
												<template v-if="scope.row.upload" slot-scope="scope">
													<label :for="scope.row.item">
								        		<div class="selet_file_btn">
								        			选择文件
								        		</div>
								        	</label>
													<input :id="scope.row.item" type="file" name="" value="1" @change="tirggerFile($event,scope.row.item,scope.$index,scope.row.builtin)" class="yc_file" style="display: none;" />
												</template>
											</el-table-column>

											<el-table-column prop="item" type="index" label="操作" width="190px">
												<template slot-scope="scope">
													<span @click="doDeleteFileRecord(scope.row.item,scope.row.itemText)" v-if="!scope.row.builtin" class="file_del">删除</span>
												</template>
											</el-table-column>
										</el-table>
									</template>
									<div style="text-align: left;margin-top: 10px;">
										<el-button @click="addFileType" type="primary" size="mini">新增</el-button>
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
						<div></div>
					</li>
					<li v-if="!(querySummaryData.status==='SUBMIT')">
						<!--<div>
							<el-button @click="doReject">拒绝</el-button>
							<el-button v-if="!roleHasPermissions['supplier_manage_register_list_review']" type="primary" @click="subFirstTrial">提交初审</el-button>
						</div>-->
					</li>
				</ul>
			</div>
			<!--左侧操作栏-->
		</div>
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
				<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" type="primary" @click="saveSelectGuarantor">保存</el-button>
			</div>
		</el-dialog>
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
		<!--新增影像Dialog-->
		<el-dialog title="请填写影像资料类型名称：" :visible.sync="addFileDialogShow" width="400px">
			<div>
				<el-input type="textarea" :rows="3" v-model="addFileName"></el-input>
			</div>
			<div slot="footer">
				<el-button @click="addFileDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="approveAddFile()">提 交</el-button>
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
	import { comboboxBankList, queryCapitalEnterprise, customerType, financeType, loanProductType,officeStable } from '@/api/common'
	import supplierInfoDetail from '@/api/supplierInfoManage/supplierInfoDetail'
	import verifyDetail from '@/api/supplierManage/verifyDetail'
	import baseUtil from '@/utils/baseUtil'
	import { validContent } from '@/utils/validate'
	import { Format } from '@/utils/index'

	export default {
		name: 'SupplierMaintainDetail',
		components: {
			Upload,
			Uploads,
			NoteChart,
			PieChart
		},
		data() {
			return {
				supplierId: '', // 商户id
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
				rejectDialogShow: false, // 拒绝弹窗控制
				remark: '', // 拒绝原因
				addFileDialogShow: false, // 新增影像资料弹窗控制
				addFileName: '', // 影像资料名字
				queryBasicData: '', // 查询基础资料
				queryTradeData: [], // 查询贸易资料
				queryKnowData: { // 预沟通资料
					credit: '',
					trade: ''
				},
				titanUpdownstreamData: '', //上下游数据
				queryReviewData: '', //风控数据
				comboboxBankList: '', //银行列表
				queryCapitalEnterpriseList: '', //资金方列表
				queryCustomerTypeList: '', //客户类型 (客户业务类型)-下拉
				queryFinanceTypeList: '', //业务类型 (融资服务类型)-下拉
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
				//商户维护
				financeGeneralSituationData: '', //授信详情数据
				//商户维护end
				//尽调折叠面板展开项
				//      activeVerifyFirmInfoNames:'FirmInfoOne',//企业信息默认项
				//      activeVerifyFirmMemberNames:'FirmMemberOne',//企业成员默认项
				//      activeVerifyFirmCreditNames:'FirmCreditOne',//企业征信默认项
				//      activeVerifyFirmAccessoryNames:'FirmAccessoryOne',//企业附件默认项
				//      activeVerifyFirmFinancialTrideNames:'FirmFinancialTrideOne',//财务及贸易统计默认项
				//      activeVerifyFirmOtherNames:'FirmFinancialOtherOne',//其他信息默认项
				//				activeVerifyFirmBondsmanNames:'FirmFinancialBondsmanOne',//担保人默认项
				//      activeVerifyFirmPlatformNames:'FirmFinancialPlatformOne',//公司管理情况
				activeVerifyFirmInfoNames: 'FirmInfoOne', //企业信息默认项
				activeVerifyFirmMemberNames: '', //企业成员默认项
				activeVerifyAssetInfoNames: 'AssetInfoOne', //财产信息默认项
				activeVerifyAffiliatedCompanyNames: 'AffiliatedCompanyOne', //关联公司状态默认项
				activeVerifyFirmCreditNames: '', //企业征信默认项
				activeVerifyFirmAccessoryNames: '', //企业附件默认项
				activeVerifyFirmFinancialTrideNames: '', //财务及贸易统计默认项
				activeVerifyFirmOtherNames: '', //其他信息默认项
				activeVerifyFirmBondsmanNames: 'FirmFinancialBondsmanOne', //担保人默认项
				activeVerifyFirmPlatformNames: 'FirmFinancialPlatformOne', //公司管理情况
				supplierSurveyData:'',//商户概况-授信信息
				supplierSetupData:{
					platformCredit:'',
					status:''
				},//商户概况-设置
				supplierEnableStatusList:[],//状态下拉
				customTypeData: '', //客户类型数据
				enterpriseInfoData: '', //基本情况数据
				accountLicenseData: '', //开户许可数据
				extendInfoData: '', //扩展信息数据
				companyManageData: '', //公司管理情况数据
				marketInfoData: '', //主营业务及市场数据
				borrowInfoData: '', //借款信息数据
				supplyDataData: {
					items: [{
						item: '',
						itemText: '',
						content: [],
						upload: '',
						builtin: ''
					}]
				}, //影响资料数据
				merchantCode: '', //商户code
				queryEquityData: [], //股权变动数据
				queryOfficeData: [], //股东变更信息数据
				affiliatedCompanyData: [], //关联公司状态数据
				queryManagerData: [], //成员名单数据
				queryHouseInfoData: [], //财产信息---房产数据
				queryCarInfoData: [], //财产信息---车辆数据
				queryCreditData: [], //征信记录数据
				queryPaperData: [], //征信附件数据
				queryEnterpriseTradeData: '', //财务及贸易统计数据
				streamVolumesStatusList: [], //财务及贸易统计交易数据可验证程度列表数据---------下拉列表
				queryEnterpriseFinanceData: '', //其他信息数据
				queryEnterpriseOpinionData: [], //其他信息-互联网信息审核-数据
				queryEnterpriseGuarantorData: [], //其他信息--法人信息-数据
				selectGuarantorListData: [], //其他信息-选择担保人列表数据
				selectedGuarantor: '', //选中的担保人
				selectGuarantorIndex: '', //点击选择担保人的索引
				dialogSelectGuarantorForm: false, //选择担保人 弹窗控制
				queryDistributorData: [], //其他信息-下游平台信息-数据
				agentInfoSeletList: '', //下拉列表-分销商下拉信息查询
				locationTypeList: '', //下拉列表-经营地下拉信息查询
				officeStableList: '', //下拉列表-经营地情况下拉信息查询
				memberTypeSeletList: '', //下拉列表-企业成员类型
				assetSubTypeList: '', //下拉列表-资产子类型
				affiliateTypeList: '', //下拉列表-与借款企业关系
				loanProductTypeList: '', //下拉列表-资料明细-借款产品类型
				levelInfoSeletList: '', //下拉列表-严重程度
				bankListSeletList: '', //下拉列表-银行信息
				certificateTypeSeletList: '', //下拉列表-证件类型
				identityTypeSeletList: '', //下拉列表-身份证件类型
				capitalTypeSeletList: '', //资料明细_企业基本信息_股东名单_类型下拉
				changeTypeSeletList: '', //资料明细_企业基本信息_股东变更_变更事项下拉
				assetSubHouseTypeList: '', //资产子类型-房
				assetSubCarTypeList: '', //资产子类型-车
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
				contractInfoData: [], //合同信息数据
				uploadFileData: {
					supplierId: '',
					isImage: false
				},
				uploadImgData: {
					supplierId: '',
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
				communicationRecordsList: '', //沟通记录列表
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
				this.activeTab = 'first';
				return num
				if(registerStage === 'BASIC') {
					num = 0
					this.getQueryBasicData(); //基础资料
					this.activeTab = 'first';
				} else
					//      if (registerStage === 'TRADE') {
					//        num = 1
					//        this.getQueryTradeData();//贸易资料
					//        this.activeTab = 'second';
					//      } else if (registerStage === 'KNOW') {
					//        num = 2
					//        this.getQueryKnowData();//预沟通资料
					//        this.activeTab = 'third';
					//      } else 
					if(registerStage === 'VERIFY') {
						num = 1
						this.getQueryVerifyData(); //尽调资料
						this.activeTab = 'second';
					} else if(registerStage === 'SIGN') {
					num = 2
					this.getQuerySignData(); //授信签署
					this.getQueryGrade(); //授信签署-评级-查询评级
					this.activeTab = 'third';
				} else if(registerStage === 'CAPITAL') {
					num = 3
					this.getQuerySignData(); //待资方审核
					this.getQueryGrade(); //授信签署-评级-查询评级
					this.activeTab = 'third';
				} else if(registerStage === 'REJECT') {
					num = 0
					this.getQuerySignData(); //入驻失败
					this.getQueryGrade(); //授信签署-评级-查询评级
					this.activeTab = 'third';
				} else if(registerStage === 'PASS') {
					num = 5
					this.getQuerySignData(); //授信签署
					this.getQueryGrade(); //授信签署-评级-查询评级
					this.activeTab = 'third';
				}
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
					this.getQueryReview()
				} else if(value === 'VERIFY' && this.registerStatus === 'AMENDING') { // //  尽调中 待补充
					this.getQueryReview()
				} else if(value === 'SIGN' || value === 'CAPITAL' || value === 'REJECT' || value === 'PASS') {
					this.getQueryReview()
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
			this.supplierId = this.$route.params.id
			this.uploadFileData.supplierId = this.supplierId
			this.uploadImgData.supplierId = this.supplierId
			if(this.supplierId) {
				this.init()
			}
		},
		mounted() {},
		methods: {
			addFileType() { //点击新增
				this.addFileName = ''
				this.addFileDialogShow = true
			},
			approveAddFile() { //新增提交
				this.supplyDataData.items.push({
					item: this.addFileName,
					itemText: this.addFileName,
					content: [],
					upload: true,
					builtin: false
				})
				this.addFileName = ''
				this.addFileDialogShow = false
			},
			doDeleteFileRecord(fileType,fileTypeText) { //点击删除影像资料数据
				let data = {
					supplierId: this.supplierId,
					fileType: fileType
				}
				this.$confirm('确认是否删除'+fileType+'？（注：删除后并连同附件一同删除！）', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					supplierInfoDetail.deleteFileRecord(data).then(res => {
						if(res.data.code === '200') {
							this.getQueryFileList(); //资料明细-影像列表-查询------------查询
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					})
				}).catch(() => {

				});

			},
			tirggerFile(event, type, index, builtin) { //上传影像
				var file = event.target.files;
				let formData = new FormData();
				formData.append('file', file[0])
				formData.append('type', type)
				formData.append('builtin', builtin)
				formData.append('supplierId', this.supplierId)
				supplierInfoDetail.uploadFile(formData).then(res => {
					if(res.data.code === '200') {
						this.supplyDataData.items[index].content.push(res.data.data)
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			delFile(id, index, contentIndex) { //删除影像
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					supplierInfoDetail.deleteFile(id).then(res => {
						if(res.data.code === '200') {
							this.supplyDataData.items[index].content.splice(contentIndex, 1)
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					})
				}).catch(() => {

				});

			},
			resetFaceCheckTimes() { //重置人脸识别次数
				supplierInfoDetail.resetFaceCheckTimes(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			handleClick(tab) { 
				if(tab.index === '0') {
					this.getQuerySupplierSurvey();//商户概况-授信信息------------查询
					this.getQuerySupplierSetup();//商户概况-设置 ------------查询
					this.getQuerySupplierEnableStatus();//状态下拉
				} else
				if(tab.index === '1') {
					this.getBasicInfo(); //基本信息
				} else
				if(tab.index === '2') { //财产需求
					this.getQueryManager(); //尽调信息-财产信息
					this.getAssetSubCarTypeList(); //获取下拉列表-资产子类型-车  
					this.getAssetSubHouseTypeList(); //获取下拉列表-资产子类型-房
				} else
				if(tab.index === '3') {
					this.getQueryCompanyManage(); //资料明细-公司管理情况-公司管理情况查询------------查询
				} else
				if(tab.index === '4') { //关联公司状态
					this.getQueryAffiliatedCompany(); // 资料明细-关联公司状态-关联公司状态------查询
					this.getAffiliateTypeList(); //获取下拉列表-与借款企业关系
				} else
				if(tab.index === '5') {
					this.getQueryMarketInfo(); //资料明细-主营业务及市场查询------------查询
				} else
				if(tab.index === '6') {
					this.queryIntoUpdownstream(); //上下游数据
				} else
				if(tab.index === '7') {
					this.getQueryBorrowInfo(); //资料明细-借款信息-借款信息查询------------查询
					this.getLoanProductTypeList(); //资料明细-借款产品类型下拉
				} else if(tab.index === '8') {
					this.getQueryFileList(); //影像列表-查询
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
				supplierInfoDetail.remitView(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.remitData = res.data.data;
						this.bankAmt = res.data.data.bankAmt;
					} else if(res.data.code === '500') {
						this.$message.error(res.data.message)
					}
				})
			}, //查询打款验证信息
			remitConfirm() {
				supplierInfoDetail.remitConfirm(this.supplierId).then(res => {
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
					supplierId: that.supplierId,
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
				supplierInfoDetail.informationCheck(data).then(res => {
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
				this.getQuerySummary()
				this.getQuerySupplierSurvey();//商户概况-授信信息------------查询
				this.getQuerySupplierSetup();//商户概况-设置 ------------查询
				this.getQuerySupplierEnableStatus();//状态下拉
//				this.getBasicInfo(); //基本信息
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
			getFinanceGeneralSituation() { //获取融资概况
				supplierInfoDetail.financeGeneralSituation(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.financeGeneralSituationData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			getBasicInfo() { //基本信息
				
				this.getQueryEnterpriseGuarantor(); //法人信息
				this.getQueryCustomType(); //尽调信息-客户类型查询------------查询
				this.getQueryCustomerTypeList(); //客户类型 (客户业务类型)-下拉
				this.getQueryFinanceTypeList(); //业务类型 (融资服务类型)-下拉
				this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
				this.getLocationTypeList(); //经营地下拉
				this.getQueryAccountLicense(); //开户许可
				this.getQueryExtendInfo(); //扩展信息
				this.getQueryEquity(); //尽调信息-股权变动列表查询
				this.getQueryOffice(); //尽调信息-经营场所列表查询
				this.getLevelInfoSeletList(); //获取下拉列表-严重程度
				this.getCapitalTypeSeletList(); //获取资料明细_企业基本信息_股东名单_类型下拉
				this.getChangeTypeTypeSeletList(); //获取资料明细_企业基本信息_股东变更_变更事项下拉
			},
			getQuerySupplierSurvey() { //商户概况-授信信息------------查询
				supplierInfoDetail.supplierSurvey(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.supplierSurveyData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQuerySupplierSetup() { //商户概况-设置 ------------查询
				supplierInfoDetail.supplierSetup(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.supplierSetupData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveSupplierSetup() { //尽调信息-客户类型保存
				if(!this.supplierSetupData.platformCredit){this.$message.error('平台限额不能为空');return;}
				if(!this.supplierSetupData.status){this.$message.error('状态不能为空');return;}
				let data = baseUtil.copy(this.supplierSetupData)
				data.supplierId = this.supplierId
				supplierInfoDetail.saveSupplierSetup(data).then(res => {
					if(res.data.code === '200') {
						this.getQuerySupplierSurvey();//商户概况-授信信息------------查询
						this.getQuerySupplierSetup();//商户概况-设置 ------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQuerySupplierEnableStatus() { //状态下拉
				supplierInfoDetail.supplierEnableStatus(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.supplierEnableStatusList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryCustomType() { //尽调信息-客户类型查询------------查询
				supplierInfoDetail.customType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.customTypeData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveCustomType() { //尽调信息-客户类型保存
				let data = baseUtil.copy(this.customTypeData)
				data.supplierId = this.supplierId
				supplierInfoDetail.saveCustomType(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEnterpriseInfo() { //尽调信息-基本情况详情------------查询
				supplierInfoDetail.basicData(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.enterpriseInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveEnterpriseInfo() { //尽调信息-基本情况修改
				let data = baseUtil.copy(this.enterpriseInfoData)
				if((typeof data.establishDate) === 'object' && data.establishDate) {
					data.establishDate = Format(data.establishDate, 'yyyy-MM-dd')
				}
				data.supplierId = this.supplierId
				supplierInfoDetail.saveBasicData(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			getQueryAccountLicense() { //尽调信息-开户许可证详情------------查询
				supplierInfoDetail.accountLicense(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.accountLicenseData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveAccountLicense() { //尽调信息-开户许可证修改
				let data = baseUtil.copy(this.accountLicenseData)
				data.supplierId = this.supplierId
				supplierInfoDetail.saveAccountLicense(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryExtendInfo() { //尽调信息-资料明细-企业基本信息_扩展信息(发展, 背景, 往来)查询------------查询
				supplierInfoDetail.extendInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.extendInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveExtendInfo() { //尽调信息-资料明细-企业基本信息_扩展信息保存
				let data = baseUtil.copy(this.extendInfoData)
				data.supplierId = this.supplierId
				supplierInfoDetail.saveExtendInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryCompanyManage() { //资料明细-公司管理情况-公司管理情况查询------------查询
				supplierInfoDetail.companyManage(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.companyManageData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveCompanyManage() { //资料明细-公司管理情况-公司管理情况查询------保存
				let data = baseUtil.copy(this.companyManageData)
				data.supplierId = this.supplierId
				supplierInfoDetail.updateCompanyManage(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryMarketInfo() { //资料明细-主营业务及市场查询------------查询
				supplierInfoDetail.marketInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.marketInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveMarketInfo() { //资料明细-主营业务及市场保存------保存
				let data = baseUtil.copy(this.marketInfoData)
				data.supplierId = this.supplierId
				supplierInfoDetail.saveMarketInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryBorrowInfo() { //资料明细-借款信息-借款信息查询------------查询
				supplierInfoDetail.borrowInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.borrowInfoData = res.data.data;
						this.borrowInfoData.val = '1'
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveBorrowInfo() { //资料明细-借款信息-借款信息------保存
				let data = baseUtil.copy(this.borrowInfoData)
				data.supplierId = this.supplierId
				supplierInfoDetail.saveBorrowInfo(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			queryIntoUpdownstream() { //-上下游数据-进入上下游页面---查询

				supplierInfoDetail.intoUpdownstream(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.merchantCode = res.data.data.merchantCode
						this.titanUpdownstreamData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
					console.log(res.data)
				}).catch(() => {})
			},
			queryStreamData() { //失去焦点查询
				if(!this.merchantCode) {
					return
				}
				supplierInfoDetail.queryTitanUpdownstream(this.merchantCode).then(res => {
					if(res.data.code === '200') {
						this.titanUpdownstreamData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveQueryTitanUpdownstream() { //资料明细-上下游数据查询按钮------保存
				if(!this.merchantCode) {
					return
				}
				let data = {
					supplierId: this.supplierId,
					merchantCode: this.merchantCode
				}
				supplierInfoDetail.saveUpdownstreamData(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryFileList() { //资料明细-影像列表-查询------------查询
				supplierInfoDetail.fileList(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.supplyDataData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryReview() {
				supplierInfoDetail.getQueryReview(this.supplierId).then(res => {
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
			getQueryCustomerTypeList() {
				customerType().then(res => {
					if(res.data.code === '200') {
						this.queryCustomerTypeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 获取客户类型 (客户业务类型)-下拉
			getQueryFinanceTypeList() {
				financeType().then(res => {
					if(res.data.code === '200') {
						this.queryFinanceTypeList = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 获取业务类型 (融资服务类型)-下拉
			getQuerySummary() {
				supplierInfoDetail.headData(this.supplierId).then(res => {
					if(res.data.code === '200') {
						const data = res.data.data
						this.querySummaryData = data
						console.log(this.querySummaryData)
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
			doPass() {
				let tip = ''
				let type = ''
				if(this.registerStage === 'BASIC') {
					if(this.registerStatus === 'REAPPROVING') { // 基础资料 待审核通过时
						tip = '通过审核后将进入尽调阶段。'
						type = 'reApproveBasic'
					}
				} else
					//      if (this.registerStage === 'TRADE') {
					//        if (this.registerStatus === 'REAPPROVING') { // 贸易资料 待审核通过时
					//          tip = '通过审核后将进入人工预沟通阶段。'
					//          type = 'reApproveTrade'
					//        }
					//      } else if (this.registerStage === 'KNOW') { // 预沟通
					//        tip = '通过审核后将进入尽调阶段。'
					//        type = 'approveKnow'
					//      } else 
					if(this.registerStage === 'VERIFY' && this.registerStatus === "APPROVING") { // 尽调 待初审
						tip = '通过审核后将进入尽调复审阶段。'
						type = 'approveVerify'
					}
				if(this.registerStage === 'VERIFY' && this.registerStatus === "REAPPROVING") { // 尽调 待复审
					tip = '通过审核后将进入授信签署阶段。'
					type = 'reapproveVerify'
				}
				if(this.registerStage === 'SIGN' && this.registerStatus === "APPROVING") { // 授信 待初审
					tip = '通过审核后将进入授信复审阶段。'
					type = 'approveSign'
				}
				if(this.registerStage === 'SIGN' && this.registerStatus === "REAPPROVING") { // 授信 复审
					tip = '通过审核后将进入待资方审核阶段。'
					type = 'approvefinal'
				}
				this.$confirm(`<p style="font-size: 13px;padding: 10px;text-align: center">确认通过审核?</p><p style="text-align: center">${tip}</p>`, '确认通过审核', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true
				}).then(() => {
					this.handlePass(type)
				}).catch(() => {})
			}, // 复审 通过时  （ 基础资料和贸易资料的复审 预沟通和尽调初审时 ）
			handlePass(type) {
				let data;
				if(type === 'approvefinal') {
					data = {
						supplierId: this.supplierId,
						rejectRemark: '',
						pass: true
					}
				} else {
					data = this.supplierId
				}
				supplierInfoDetail[type](data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQueryReview(); //刷新风控
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
			doInspectionRelateShow(type, bool) { //
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
				supplierInfoDetail[api](this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.inspectionRelateData.inspectionArray = res.data.data
						this.inspectionDialogShow = true
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 审核 获取审核项等
			doCentreListShow() {
				supplierInfoDetail.centreList(this.supplierId).then(res => {
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
					supplierId: '',
					centreIds: ''
				}
				if(this.centreCheckList.length === 0) {
					this.$message.error("请勾选至少一个核心企业");
					return;
				}
				data.supplierId = this.supplierId;
				data.centreIds = this.centreCheckList.join();
				supplierInfoDetail.addCentre(data).then(res => {
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
					_id = this.supplierId;
				}
				supplierInfoDetail[type](_id).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			createFactorContract() { //生成保理合同
				supplierInfoDetail.createFactorContract(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.doInspectionRelateShow('cooperationAgreement');
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			createGuaranteeContract(guarantorId) { //生成保证合同
				supplierInfoDetail.createGuaranteeContract(guarantorId).then(res => {
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
					supplierId: this.supplierId,
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
				supplierInfoDetail[api](data).then(res => {
					if(res.data.code === '200') {
						if(type == 'VERIFY') {
							this.getQueryVerifyData();
						}
						this.$message.success(res.data.message)
						this.inspectionDialogShow = false
						this.approveRejectDialogShow = false
						this.getQuerySummary()
						this.getQueryReview()
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 提交初审核 打回和通过
			subFirstTrial() { //提交初审
				this.$confirm(`确认提交初审吗？`, '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//          supplierInfoDetail.supplySubmitCheck(this.).then(res => {
					//		          if (res.data.code === '200') {
					//		            this.$message.success(res.data.message)
					//		            this.rejectDialogShow = false
					//		            this.getQuerySummary ();//头部信息
					//		          } else {
					//		            this.$message.error(res.data.message)
					//		          }
					//		        }).catch(() => {})
					supplierInfoDetail.supplySubmitCheck(this.supplierId).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
							this.rejectDialogShow = false
							this.getQuerySummary(); //头部信息
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			doReject() { //点击拒绝
				this.remark = ''
				this.rejectDialogShow = true
			},
			approveFinal() { //拒绝提交
				let data = {
					supplierId: this.supplierId,
					remark: ''
				}
				if(!validContent(this.remark)) {
					this.$message.error('拒绝原因不能为空')
					return
				}
				data.remark = this.remark.trim()
				supplierInfoDetail.reject(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.rejectDialogShow = false
						this.getQuerySummary(); //头部信息
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			}, // 入驻成功、入驻失败 提交
			doApproveFinal(type) {
				if(type) {
					this.$confirm(`确认通过吗？`, '确认通过并提交资方', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.approveFinal(type)
					}).catch(() => {})
				} else {
					this.rejectRemark = ''
					this.rejectDialogShow = true
				}
			}, // 入驻成功、入驻失败
			getQueryBasicData() {
				supplierInfoDetail.queryBasic(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.queryBasicData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 基本信息
			//    getQueryTradeData () {
			//      supplierInfoDetail.queryTrade(this.supplierId).then(res => {
			//        if (res.data.code === '200') {
			//          this.queryTradeData = res.data.data
			//        } else {
			//          this.$message.error(res.data.message)
			//        }
			//      })
			//    }, // 贸易资料
			//    getQueryKnowData() {
			//    		supplierInfoDetail.queryKnow(this.supplierId).then(res => {
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
					supplierId: this.supplierId,
					credit: this.queryKnowData.credit,
					trade: this.queryKnowData.trade
				}
				supplierInfoDetail.updateKnow(data).then(res => {
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
				this.getQueryCustomType(); //尽调信息-客户类型查询------------查询
				this.getQueryCustomerTypeList(); //客户类型 (客户业务类型)-下拉
				this.getQueryFinanceTypeList(); //业务类型 (融资服务类型)-下拉
				this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
				this.getLocationTypeList(); //经营地下拉
				this.getQueryEquity(); //尽调信息-股权变动列表查询
				this.getQueryOffice(); //尽调信息-经营场所列表查询
				this.getLevelInfoSeletList(); //获取下拉列表-严重程度
				this.getCapitalTypeSeletList(); //获取资料明细_企业基本信息_股东名单_类型下拉
				this.getChangeTypeTypeSeletList(); //获取资料明细_企业基本信息_股东变更_变更事项下拉
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
			changeVerifyAssetInfo(val) { //展开财产信息
				if(val.length === 1) {
					return
				}
				this.getQueryManager(); //尽调信息-财产信息
				this.getAssetSubCarTypeList(); //获取下拉列表-资产子类型-车  
				this.getAssetSubHouseTypeList(); //获取下拉列表-资产子类型-房
			},
			changeVerifyFirmCredit(val) { //展开企业征信记录
				if(val.length === 1) {
					return
				}
				this.getQueryCredit(); //尽调信息-征信记录列表查询
			},

			changeVerifyAffiliatedCompany(val) { //展开关联公司状态
				if(val.length === 1) {
					return
				}
				this.getQueryAffiliatedCompany(); // 资料明细-关联公司状态-关联公司状态------查询
				this.getAffiliateTypeList(); //获取下拉列表-与借款企业关系
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
			changeVerifyFirmPlatform(val) { //展开公司管理情况查询
				if(val.length === 1) {
					return
				}
				this.getQueryCompanyManage(); //资料明细-公司管理情况-公司管理情况查询------------查询
			},
			getQueryVerifyData() { // 查询尽调
				this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
				this.getQueryEquity(); //尽调信息-股权变动列表查询
				this.getQueryOffice(); //尽调信息-经营场所列表查询
				this.getLevelInfoSeletList(); //获取下拉列表-严重程度
			},
			getAgentInfoSeletList() { //获取下拉列表-分销商下拉信息查询
				supplierInfoDetail.agentInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.agentInfoSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getLocationTypeList() { //获取下拉列表-企业基本信息_经营地下拉
				supplierInfoDetail.locationType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.locationTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getOfficeStableList() { //获取下拉列表-企业基本信息_经营地情况下拉
				officeStable(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.officeStableList  = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getMemberTypeSeletList() { //获取下拉列表-分销商下拉信息查询
				supplierInfoDetail.memberType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.memberTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getAssetSubHouseTypeList() { //获取下拉列表-资产子类型-房
				supplierInfoDetail.assetSubHouseType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.assetSubHouseTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getAssetSubCarTypeList() { //获取下拉列表-资产子类型-车
				supplierInfoDetail.assetSubCarType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.assetSubCarTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getAffiliateTypeList() { //获取下拉列表-与借款企业关系
				supplierInfoDetail.affiliateType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.affiliateTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getLoanProductTypeList() { //获取下拉列表-资料明细-借款产品类型
				loanProductType().then(res => {
					if(res.data.code === '200') {
						this.loanProductTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getLevelInfoSeletList() { //获取下拉列表-分销商下拉信息查询
				supplierInfoDetail.levelInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.levelInfoSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getBankListSeletList() { //获取下拉列表-分销商下拉信息查询
				supplierInfoDetail.bankList(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.bankListSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCertificateTypeSeletList() { //获取下拉列表-证件类型下拉信息查询
				supplierInfoDetail.certificateType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.certificateTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getIdentityTypeSeletList() { //获取下拉列表-身份证件类型
				verifyDetail.identityType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.identityTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCapitalTypeSeletList() { //获取资料明细_企业基本信息_股东名单_类型下拉
				supplierInfoDetail.capitalType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.capitalTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getChangeTypeTypeSeletList() { //获取资料明细_企业基本信息_股东变更_变更事项下拉
				supplierInfoDetail.changeType(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.changeTypeSeletList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEquity() { //尽调信息-股东名单列表------------查询
				supplierInfoDetail.shareHolding(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0) {
							this.queryEquityData = []
							this.queryEquityData.push({
								name: '',
								type: '',
								amount: '',
								shareHolding: ''
							})
						} else {
							this.queryEquityData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteEquity(index) { //尽调信息-股东名单------------删除
				this.queryEquityData.splice(index, 1)
			},
			plusEquity() { //尽调信息-股东名单------------添加
				this.queryEquityData.push({
					name: '',
					type: '',
					amount: '',
					shareHolding: ''
				})
			},
			saveEquity() { //尽调信息-股东名单------------保存
				let info = baseUtil.copy(this.queryEquityData)
				let data = {
					supplierId: this.supplierId,
					info: JSON.stringify(info)
				}
				supplierInfoDetail.saveShareHolding(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryOffice() { //尽调信息-股东变更信息列表查询------------查询
				supplierInfoDetail.enterpriseChange(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryOfficeData.length === 0) {
							this.queryOfficeData.push({
								type: '',
								before: '',
								after: '',
								changeDate: ''
							})
						} else {
							this.queryOfficeData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteOffice(index) { //尽调信息-股东变更信息列表查询------------删除
				this.queryOfficeData.splice(index, 1)
			},
			plusOffice() { //尽调信息-股东变更信息列表查询------------添加
				this.queryOfficeData.push({
					type: '',
					before: '',
					after: '',
					changeDate: ''
				})
			},
			doMoreCertificate(index) { // 尽调股东变更信息新增凭证
				this.queryOfficeData[index].imageData.push({
					key: '',
					url: ''
				})
			},
			saveOffice() { //尽调信息-股东变更信息列表查询------------保存
				let info = baseUtil.copy(this.queryOfficeData)
				for(let i = 0; i < info.length; i++) {
					if((typeof info[i].changeDate) === 'object' && info[i].changeDate) {
						info[i].changeDate = Format(info[i].changeDate, 'yyyy-MM-dd')
					}
				}
				let data = {
					supplierId: this.supplierId,
					info: JSON.stringify(info)
				}
				supplierInfoDetail.saveEnterpriseChange(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			getQueryAffiliatedCompany() { // 资料明细-关联公司状态-关联公司状态------查询
				supplierInfoDetail.affiliatedCompany(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0) {
							this.affiliatedCompanyData = [];
							this.affiliatedCompanyData.push({
								affiliateType: '',
								affiliateTypeText: '',
								enterpriseName: '',
								enterpriseController: '',
								mainBusiness: ''
							})
						} else {
							this.affiliatedCompanyData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			deleteAffiliatedCompany(index) { //资料明细-关联公司状态-关联公司状态------------删除
				this.affiliatedCompanyData.splice(index, 1)
			},
			plusAffiliatedCompany() { //资料明细-关联公司状态-关联公司状态------------添加
				this.affiliatedCompanyData.push({
					affiliateType: '',
					affiliateTypeText: '',
					enterpriseName: '',
					enterpriseController: '',
					mainBusiness: ''
				})
			},
			saveAffiliatedCompany() { //资料明细-公司管理情况-公司管理情况查询--------保存
				let info = baseUtil.copy(this.affiliatedCompanyData)
				for(let i = 0; i < info.length; i++) {
					if((typeof info[i].changeDate) === 'object' && info[i].changeDate) {
						info[i].changeDate = Format(info[i].changeDate, 'yyyy-MM-dd')
					}
				}
				let data = {
					supplierId: this.supplierId,
					companyData: JSON.stringify(info)
				}
				supplierInfoDetail.updateAffiliatedCompany(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryManager() { //尽调信息-资料明细-财产信息-财产信息查询------------查询
				supplierInfoDetail.assetInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.queryHouseInfoData = res.data.data.houseInfo;
						if(res.data.data.houseInfo.length === 0) {
							this.queryHouseInfoData = [];
							this.queryHouseInfoData.push({
								id: '',
								assetSubType: '',
								assetSubTypeText: '',
								estimatedValue: '',
								paymentMonthly: '',
								assetName: ''
							})
						} else if(res.data.data.houseInfo.length !== 0) {
							this.queryHouseInfoData = res.data.data.houseInfo;
						}
						if(res.data.data.carInfo.length === 0) {
							this.queryCarInfoData = [];
							this.queryCarInfoData.push({
								id: '',
								assetSubType: '',
								assetSubTypeText: '',
								estimatedValue: '',
								paymentMonthly: '',
								assetName: ''
							})
						} else if(res.data.data.houseInfo.length !== 0) {
							this.queryCarInfoData = res.data.data.carInfo;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			deleteHouseInfo(index) { //尽调信息-房产数据-----------删除
				this.queryHouseInfoData.splice(index, 1)
			},
			deleteCarInfo(index) { //尽调信息-车辆数据-----------删除
				this.queryCarInfoData.splice(index, 1)
			},
			plusHouseInfo() { //尽调信息-房产数据------------添加
				this.queryHouseInfoData.push({
					id: '',
					assetSubType: '',
					assetSubTypeText: '',
					estimatedValue: '',
					paymentMonthly: '',
					assetName: ''
				})
			},
			plusCarInfo() { //尽调信息-车辆数据------------添加
				this.queryCarInfoData.push({
					id: '',
					assetSubType: '',
					assetSubTypeText: '',
					estimatedValue: '',
					paymentMonthly: '',
					assetName: ''
				})
			},
			saveManager() { //尽调信息-资料明细-财产信息-------------保存
				let houseInfo = baseUtil.copy(this.queryHouseInfoData)
				let carInfo = baseUtil.copy(this.queryCarInfoData)
				let assetData = {
					houseInfo: houseInfo,
					carInfo: carInfo
				}
				let data = {
					supplierId: this.supplierId,
					assetData: JSON.stringify(assetData)
				}
				supplierInfoDetail.updateAsset(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryCredit() { //尽调信息-征信记录列表查询------------查询
				supplierInfoDetail.queryCredit(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0) {
							this.queryCreditData = [];
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
					supplierId: this.supplierId,
					type: val
				}
				supplierInfoDetail.creditBelong(data).then(res => {
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
					supplierId: this.supplierId,
					info: JSON.stringify(info)
				}
				supplierInfoDetail.saveCredit(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryPaper() { //尽调信息-企业附件列表查询------------查询
				supplierInfoDetail.queryPaper(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0) {
							this.queryPaperData = [];
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
						} else {
							this.queryPaperData = res.data.data;
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			certificateTypeChange(index, val) { //企业附件 下拉证件类型改变
				let data = {
					supplierId: this.supplierId,
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
					supplierId: this.supplierId,
					info: JSON.stringify(info)
				}
				supplierInfoDetail.savePaper(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryPaper(); //尽调信息-企业附件列表查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryEnterpriseTrade() { //尽调信息-财务及贸易统计-查询------------查询
				verifyDetail.queryEnterpriseTrade(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.queryEnterpriseTradeData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getStreamVolumesStatusList() { //尽调信息-财务及贸易统计交易数据可验证程度列表数据 ------下拉列表数据
				verifyDetail.streamVolumesStatus(this.supplierId).then(res => {
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
				data.supplierId = this.supplierId
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
				verifyDetail.queryEnterpriseFinance(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.queryEnterpriseFinanceData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveEnterpriseFinance() { //尽调信息-其他信息------------保存
				let data = baseUtil.copy(this.queryEnterpriseFinanceData)
				data.supplierId = this.supplierId
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
				verifyDetail.queryEnterpriseOpinion(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(res.data.data.length === 0 && this.queryEnterpriseOpinionData.length === 0) {
							this.queryEnterpriseOpinionData.push({
								opinionDate: '',
								opinionDescription: '',
								severityType: '',
							})
						} else {
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
					supplierId: this.supplierId,
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
			getQueryEnterpriseGuarantor() { //尽调信息--法人信息-查询------------查询
				supplierInfoDetail.queryEnterpriseGuarantor(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.queryEnterpriseGuarantorData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			saveEnterpriseGuarantor() { //尽调信息--法人信息-保存------------保存
				let data = baseUtil.copy(this.queryEnterpriseGuarantorData)

				//				if(data.guaranteeValueFile){
				//					let _arr = []
				//					for (let i =0;i<data.guaranteeValueFile.length;i++) {
				//						_arr.push(data.guaranteeValueFile[i].key)
				//					}
				//					data.guaranteeValueFile = _arr.join()
				//				}
				data.supplierId = this.supplierId
				supplierInfoDetail.saveEnterpriseGuarantor(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			SelectGuarantor(index) { //点击选择触发
				this.selectGuarantorIndex = index;
				supplierInfoDetail.selectGuarantorList(this.supplierId).then(res => {
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
				supplierInfoDetail.createTestKey(guarantorId).then(res => {
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
			deleteEnterpriseGuarantor(guarantorId) { //尽调信息-担保人-删除------------删除
				//    	this.queryEnterpriseGuarantorData.splice(index,1)
				this.$confirm('此操作将删除该担保人, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					supplierInfoDetail.deleteEnterpriseGuarantor(guarantorId).then(res => {
						if(res.data.code === '200') {
							this.getQueryEnterpriseGuarantor();
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}).catch(() => {

				});

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
			getQueryDistributor() { //尽调信息-平台信息-查询------------查询
				supplierInfoDetail.queryDistributor(this.supplierId).then(res => {
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
								supplierId: '',
							})
						} else {
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
					supplierId: this.supplierId,
					centreId: id
				}
				supplierInfoDetail.deleteDistributor(data).then(res => {
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
					supplierId: '',
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
				data.supplierId = this.supplierId
				supplierInfoDetail.operateDistributor(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryDistributor(); //尽调信息-平台信息-查询------------查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			submitCheck() { //尽调总提交
				verifyDetail.submitCheck(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQuerySignData()
						this.getQueryGrade(); //授信签署-评级-查询评级
						this.getQuerySummary()
						this.getQueryReview()
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})

			},
			//新尽调end-----end
			getContractSignNameList(centreId) {
				supplierInfoDetail.contractSignNameList(centreId).then(res => {
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
				sendData.supplierId = this.supplierId
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
				supplierInfoDetail.updateVerify(sendData).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQueryVerifyData()
						this.getQuerySummary()
						this.getQueryReview()
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 修改尽调 提交
			getQuerySignData() {
				supplierInfoDetail.querySign(this.supplierId).then(res => {
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
				supplierInfoDetail.calculatedInterest(loanRate).then(res => {
					if(res.data.code === '200') {
						this.rate.monthRate = res.data.data.monthRate
						this.rate.yearRate = res.data.data.yearRate
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getContractInfoData() { // 查询合同信息
				supplierInfoDetail.contractList(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.contractInfoData = res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryGrade() {
				supplierInfoDetail.queryGrade(this.supplierId).then(res => {
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
				supplierInfoDetail.evaluateGrade(this.supplierId).then(res => {
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
				supplierInfoDetail.queryGradeDetail(this.supplierId).then(res => {
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
				data.supplierId = this.supplierId
				if((typeof data.creditLineExpireTime) == 'object') {
					data.creditLineExpireTime = Format(data.creditLineExpireTime, 'yyyy-MM-dd')
				}
				data.creditAndIterestRate = JSON.stringify(data.creditAndIterestRates)
				supplierInfoDetail.updateSign(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
						this.getQuerySignData()
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 修改签署 提交
			doTradeRmSummary() {
				supplierInfoDetail.queryTradeRmSummary(this.supplierId).then(res => {
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
				supplierInfoDetail.refreshTrade(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.doTradeRmSummary();
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				})
			}, // 刷新贸易资料风控 贸易统计详情
			doScorecard() {
				supplierInfoDetail.queryGradeDetail(this.supplierId).then(res => {
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
					supplierInfoDetail.creditEnterprise(this.supplierId).then(res => {
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
					supplierInfoDetail.creditRepre(this.supplierId).then(res => {
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
					supplierInfoDetail.creditGuarantor(this.supplierId).then(res => {
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
					supplierInfoDetail.saveApproveTrade(this.supplierId, code).then(res => {
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
				supplierInfoDetail.queryVerifyRmSummary(this.supplierId).then(res => {
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
				supplierInfoDetail.queryVerifyRmDetail(this.supplierId, type).then(res => {
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
					supplierId: this.supplierId
				}
				supplierInfoDetail.refreshCentreAccount(data).then(res => {
					if(res.data.code === '200') {
						//    			this.getQueryTradeData();//刷新贸易资料
						this.$message.success(res.data.message);
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			deletCommunication(id) {
				this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					supplierInfoDetail.deleteKnow(id).then(res => {
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
	@import "supplierInfoDetail.scss";
</style>
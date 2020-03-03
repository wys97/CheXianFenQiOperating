<template>
  <div class="container">
    <div v-if="isLookImg" ref="lookImgBox" @click="clearImg" class="look_img_box">
      <div ref="rotateImg" class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}"></div>
      <div class="rotateBtnRow">
        <div @click.stop="rotateImg('left')" class="rotateBtn">
          <i class="iconfont icon-rotate-left"></i>
        </div>
        <div @click.stop="rotateImg('right')" class="rotateBtn">
          <i class="iconfont icon-rotate-right"></i>
        </div>
      </div>
    </div>
    <div class="top" v-if="false">
      <ul class="flex-item" v-if="querySummaryData">
        <li>{{querySummaryData.enterpriseName}}</li>
        <li>申请时间：{{querySummaryData.createTime}}</li>
      </ul>
      <div class="flex-item" style="text-align: right;padding-top: 0;">
        <span v-if="querySummaryData.remark">原因：{{querySummaryData.remark}}</span>
        <el-button
          :type="querySummaryData.status=='INIT'?'warning':querySummaryData.status=='EVALUATING'?'success':querySummaryData.status=='CANCELED'?'info':querySummaryData.status=='REJECT_EVALUATE'?'danger':''"
          size="mini"
        >{{querySummaryData.statusText}}</el-button>
      </div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative; width: 100%;">
        <!--融资概况，基本信息，担保信息，渠道信息，授信管理,合同管理-->
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div class="tab-content">
              <!--企业信息-->
              <el-collapse
                @change="changeVerifyFirmInfo"
                v-model="activeVerifyFirmInfoNames"
                class="marginBotten"
              >
                <el-collapse-item name="FirmInfoOne">
                  <template slot="title">企业基本信息</template>
                  <el-form
                    ref="verifyFirmInfoForm"
                    label-width="170px"
                    size="mini"
                    label-position="right"
                  >
                    <div class="info-list">
                      <div>客户类型</div>
                      <el-form-item label="客户类型：">
                        <span class="input_read">{{customTypeData.customerTypeText}}</span>
                      </el-form-item>
                      <el-form-item label="业务类型：">
                        <span class="input_read">{{customTypeData.financeTypeText}}</span>
                      </el-form-item>
                    </div>
                    <div class="info-list">
                      <div>基本情况</div>
                      <el-form-item label="企业名称：">
                        <span class="input_read">{{enterpriseInfoData.enterpriseName}}</span>
                        <!--<el-input v-model="enterpriseInfoData.enterpriseName" :disabled="true" class="must_input" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="统一社会信用代码：">
                        <span class="input_read">{{enterpriseInfoData.businessLicenseNo}}</span>
                        <!--<el-input v-model="enterpriseInfoData.businessLicenseNo" :disabled="true" class="must_input" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人姓名：">
                        <span class="input_read">{{enterpriseInfoData.repreName}}</span>
                        <!--<el-input v-model="enterpriseInfoData.repreName" :disabled="true" class="must_input" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人身份证号：">
                        <span class="input_read">{{enterpriseInfoData.repreIdCard}}</span>
                        <!--<el-input v-model="enterpriseInfoData.repreIdCard" :disabled="true" class="must_input" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人手机号：">
                        <span class="input_read">{{enterpriseInfoData.repreMobile}}</span>
                        <!--<el-input v-model="enterpriseInfoData.repreMobile" :disabled="true" class="must_input" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="注册地址：">
                        <span class="input_read">{{enterpriseInfoData.registerAddress}}</span>
                        <!--<el-input v-model="enterpriseInfoData.registerAddress" class="must_input" type="textarea" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="成立日期：">
                        <span class="input_read">{{enterpriseInfoData.establishDate}}</span>
                        <!--<el-date-picker
			                    	v-model="enterpriseInfoData.establishDate"
			                    	class="must_input"
			                      align="right"
			                      type="date"
			                      placeholder="选择日期">
                        </el-date-picker>-->
                      </el-form-item>
                      <el-form-item label="营业年数：">
                        <span class="input_read">{{enterpriseInfoData.operatingYears}} 年</span>

                        <!--<div style="width: 300px;">
														<el-input v-model="enterpriseInfoData.operatingYears" class="must_input">
															<template slot="append">年</template>
														</el-input>
                        </div>-->
                      </el-form-item>
                      <el-form-item label="联系电话：">
                        <span class="input_read">{{enterpriseInfoData.mobile}}</span>
                        <!--<el-input v-model="enterpriseInfoData.mobile" class="must_input" style="width: 150px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="传真：">
                        <span class="input_read">{{enterpriseInfoData.fax}}</span>
                        <!--<el-input v-model="enterpriseInfoData.fax"  style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="营业执照：">
                        <template>
                          <p class="img_bgc">
                            <img
                              v-if="enterpriseInfoData.licensePicUrl"
                              @click="lookImg(enterpriseInfoData.licensePicUrl)"
                              alt="营业执照"
                              :src="enterpriseInfoData.licensePicUrl"
                            />
                          </p>
                        </template>
                      </el-form-item>

                      <el-form-item label="经营地：">
                        <template slot-scope="scope">
                          <span class="input_read">{{enterpriseInfoData.locationTypeText}}</span>
                          <!--<el-select v-model="enterpriseInfoData.locationType"  class="must_input" filterable placeholder="请选择">
													    <el-option
													      v-for="(val,key) in locationTypeList"
													      :key="key"
													      :label="val"
													      :value="key">
													    </el-option>
                          </el-select>-->
                        </template>
                      </el-form-item>
                      <el-form-item label="经营地面积：">
                        <span class="input_read">{{enterpriseInfoData.locationArea}} 平米</span>
                        <!--<el-input v-model="enterpriseInfoData.locationArea"  style="width: 300px;">
								    				<template slot="append">平米</template>
                        </el-input>-->
                      </el-form-item>

                      <el-form-item label="经营地情况：">
                        <span class="input_read">{{enterpriseInfoData.officeStableText}}</span>

                        <!--<template v-if="officeStableList">
													<el-radio-group v-model="enterpriseInfoData.officeStable"  class="must_input">
														<div v-for="(val,key) in officeStableList">
															<el-radio  :label="key" :key="key">{{val}}</el-radio>
														</div>
													</el-radio-group>
                        </template>-->
                      </el-form-item>
                      <el-form-item label="经营场所地址：">
                        <span class="input_textarea">{{enterpriseInfoData.locationAddress}}</span>
                        <!--<el-input type="textarea" :rows="4" :disabled="true" v-model="enterpriseInfoData.locationAddress"  style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="员工人数：">
                        <span class="input_read">{{enterpriseInfoData.staffNo}}</span>
                        <!--<el-input v-model="enterpriseInfoData.staffNo"  style="width: 300px;">
								    				<template slot="append">人</template>
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="水电月缴费用：">
                        <span class="input_read">{{enterpriseInfoData.utilitiesMonth}} 元</span>
                        <!--<el-input v-model="enterpriseInfoData.utilitiesMonth"  style="width: 300px;">
								    				<template slot="append">元</template>
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="年净利润金额：">
                        <span class="input_read">{{enterpriseInfoData.profit}}</span>
                        <!--<el-input v-model="enterpriseInfoData.profit"  style="width: 300px;">
								    				<template slot="append">元</template>
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="是否有子公司：">
                        <template>
                          <span class="input_read">{{enterpriseInfoData.hasSub}}</span>
                          <!--<el-radio-group v-model="enterpriseInfoData.hasSub">
													    <el-radio :label="1">是</el-radio>
													  	<el-radio :label="0">否</el-radio>
                          </el-radio-group>-->
                        </template>
                      </el-form-item>
                      <el-form-item label="备注：">
                        <span class="input_read">{{enterpriseInfoData.remark}}</span>
                        <!--<el-input v-model="enterpriseInfoData.remark"  style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <div style="text-align: right;" v-if="false">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveEnterpriseInfo"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </div>
                    </div>
                    <div class="info-list">
                      <div>法定代表人信息</div>
                      <el-form-item label="法定代表人姓名：">
                        <span class="input_read">{{queryEnterpriseGuarantorData.name}}</span>
                        <!--<el-input v-model="queryEnterpriseGuarantorData.name"  :disabled="true" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人身份证号：">
                        <span class="input_read">{{queryEnterpriseGuarantorData.idcardNo}}</span>
                        <!--<el-input v-model="queryEnterpriseGuarantorData.idcardNo"  :disabled="true" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="性别：">
                        <span class="input_read">{{queryEnterpriseGuarantorData.gender}}</span>
                        <!--<el-input v-model="queryEnterpriseGuarantorData.gender" :disabled="true" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人地址：">
                        <span class="input_read">{{queryEnterpriseGuarantorData.address}}</span>
                        <!--<el-input v-model="queryEnterpriseGuarantorData.address" type="textarea" :rows="2">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人手机号：">
                        <span class="input_read">{{queryEnterpriseGuarantorData.mobile}}</span>
                        <!--<el-input v-model="queryEnterpriseGuarantorData.mobile" :disabled="true" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人邮箱：">
                        <span class="input_read">{{queryEnterpriseGuarantorData.email}}</span>
                        <!--<el-input v-model="queryEnterpriseGuarantorData.email"  style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="法定代表人身份证：">
                        <template>
                          <p class="img_bgc">
                            <img
                              v-if="queryEnterpriseGuarantorData.idcardPicFront"
                              @click="lookImg(queryEnterpriseGuarantorData.idcardPicFront)"
                              alt="正面"
                              :src="queryEnterpriseGuarantorData.idcardPicFront"
                            />
                            <img
                              v-if="queryEnterpriseGuarantorData.idcardPicBack"
                              @click="lookImg(queryEnterpriseGuarantorData.idcardPicBack)"
                              alt="反面"
                              :src="queryEnterpriseGuarantorData.idcardPicBack"
                            />
                          </p>
                        </template>
                      </el-form-item>
                      <el-form-item label="学历：">
                        <span
                          class="input_read"
                        >{{queryEnterpriseGuarantorData.educationBackgroundText}}</span>
                        <!--<template slot-scope="scope">
									        	<el-select v-model="queryEnterpriseGuarantorData.educationBackground" filterable placeholder="请选择">
													    <el-option key="PRIMARY" label="小学" value="PRIMARY"></el-option>
													    <el-option key="JUNIOR" label="初中" value="JUNIOR"></el-option>
													  	<el-option key="SENIOR" label="中专/高中" value="SENIOR"></el-option>
													  	<el-option key="COLLEGE" label="专科" value="COLLEGE"></el-option>
													  	<el-option key="BACHELOR" label="本科" value="BACHELOR"></el-option>
													  	<el-option key="MASTER" label="硕士" value="MASTER"></el-option>
													  	<el-option key="DOCTOR" label="博士" value="DOCTOR"></el-option>
													  </el-select>
                        </template>-->
                      </el-form-item>
                      <el-form-item label="婚姻状况：">
                        <span class="input_read">{{queryEnterpriseGuarantorData.maritalStatusText}}</span>
                        <!--<el-input v-model="queryEnterpriseGuarantorData.maritalStatusText" style="width: 180px;">
	                    		</el-input>
	                    		<template slot-scope="scope">
									        	<el-select v-model="queryEnterpriseGuarantorData.maritalStatus" filterable placeholder="请选择">
													    <el-option key="UNMARRIED" label="未婚" value="UNMARRIED"></el-option>
													    <el-option key="MARRIED" label="已婚" value="MARRIED"></el-option>
													  	<el-option key="DIVORCED" label="离异" value="DIVORCED"></el-option>
													  	<el-option key="REMARRIED" label="再婚" value="REMARRIED"></el-option>
													  </el-select>
                        </template>-->
                      </el-form-item>
                      <el-form-item label="本地户口：">
                        <template>
                          <span
                            class="input_read"
                          >{{queryEnterpriseGuarantorData.localResidentText}}</span>
                          <!--<el-radio-group v-model="queryEnterpriseGuarantorData.localResident">
													    <el-radio :label="1">是</el-radio>
													    <el-radio :label="0">否</el-radio>
                          </el-radio-group>-->
                        </template>
                      </el-form-item>
                      <el-form-item label="操作：" v-if="false">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveEnterpriseGuarantor()"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </el-form-item>
                    </div>

                    <div class="info-list">
                      <div>开户许可证</div>
                      <el-form-item label="开户名称：">
                        <span class="input_read">{{accountLicenseData.accountName}}</span>
                        <!--<el-input v-model="accountLicenseData.accountName" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="开户银行：">
                        <span class="input_read">{{accountLicenseData.bankName}}</span>
                        <!--<el-input v-model="accountLicenseData.bankName" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="开户网点：">
                        <span class="input_read">{{accountLicenseData.branchBankName}}</span>
                        <!--<el-input v-model="accountLicenseData.branchBankName" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>
                      <el-form-item label="银行账号：">
                        <span class="input_read">{{accountLicenseData.accountNo}}</span>
                        <!--<el-input v-model="accountLicenseData.accountNo" style="width: 300px;">
                        </el-input>-->
                      </el-form-item>

                      <el-form-item label="法定代表人身份证：">
                        <template>
                          <p class="img_bgc">
                            <img
                              v-if="queryEnterpriseGuarantorData.idcardPicFront"
                              @click="lookImg(queryEnterpriseGuarantorData.idcardPicFront)"
                              alt="正面"
                              :src="queryEnterpriseGuarantorData.idcardPicFront"
                            />
                            <img
                              v-if="queryEnterpriseGuarantorData.idcardPicBack"
                              @click="lookImg(queryEnterpriseGuarantorData.idcardPicBack)"
                              alt="反面"
                              :src="queryEnterpriseGuarantorData.idcardPicBack"
                            />
                          </p>
                        </template>
                      </el-form-item>
                      <el-form-item label="开户许可证：">
                        <!--<template>
	                          <Uploads
	                          	v-model="accountLicenseData.picKey"
	                          	:fileUrl="accountLicenseData.picUrl"
	                          	:dataObj="uploadImgData"
	                          	actionUrl="/admin/supply_data/upload_image_file"></Uploads>
                        </template>-->
                        <template>
                          <p class="img_bgc">
                            <img
                              v-if="accountLicenseData.picUrl"
                              @click="lookImg(accountLicenseData.picUrl)"
                              alt
                              :src="accountLicenseData.picUrl"
                            />
                          </p>
                        </template>
                      </el-form-item>
                      <div style="text-align: right;" v-if="false">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveAccountLicense"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </div>
                    </div>

                    <div class="info-list">
                      <el-form-item label="投资背景上溯年数：">
                        <span class="input_read">{{shareholderYears}} 年</span>
                        <!--<div style="width: 300px;">
													<el-input v-model="shareholderYears">
														<template slot="append">年</template>
													</el-input>
                        </div>-->
                      </el-form-item>
                      <el-form-item label="股东名单：">
                        <template>
                          <el-table :data="queryEquityData" border style="width: 100%">
                            <el-table-column prop="name" label="姓名">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.name}}</span>
                                <!--<el-input type="input" v-model="scope.row.name"></el-input>-->
                              </template>
                            </el-table-column>
                            <el-table-column prop="type" label="类型">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.type}}</span>
                                <!--<el-select v-model="scope.row.type" placeholder="请选择">
																    <el-option
																      v-for="(val,key) in capitalTypeSeletList"
																      :key="key"
																      :label="val"
																      :value="key">
																    </el-option>
                                </el-select>-->
                              </template>
                            </el-table-column>
                            <el-table-column prop="amount" label="出资金额">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.amount}} 万元</span>
                                <!--<el-input type="input" v-model="scope.row.amount">
												        		<template slot="append">万元</template>
                                </el-input>-->
                              </template>
                            </el-table-column>
                            <el-table-column prop="shareHolding" label="持股比例">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.shareHolding}} %</span>
                                <!--<el-input type="input" v-model="scope.row.shareHolding">
												        		<template slot="append">%</template>
                                </el-input>-->
                              </template>
                            </el-table-column>
                            <el-table-column prop="workingYears" label="从业年数">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.workingYears}} 年</span>
                                <!--<el-input type="input" v-model="scope.row.workingYears">
																	<template slot="append">年</template>
                                </el-input>-->
                              </template>
                            </el-table-column>
                            <!--<el-table-column
												        prop="changeDescription"
												        type="index"
												        label="操作"
												        width="90px">
												        <template slot-scope="scope">
												        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryEquityData.length>1"  @click="deleteEquity(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
												        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryEquityData.length===scope.$index+1"  @click="plusEquity" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
												        </template>
                            </el-table-column>-->
                          </el-table>
                        </template>
                      </el-form-item>
                      <div style="text-align: right;" v-if="false">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveEquity"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </div>
                    </div>
                    <div class="info-list">
                      <el-form-item label="股东变更信息：">
                        <template>
                          <el-table :data="queryOfficeData" border style="width: 100%">
                            <el-table-column prop="type" label="变更事项">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.typeText}}</span>
                                <!--<el-select v-model="scope.row.type" placeholder="请选择">
																    <el-option
																      v-for="(val,key) in changeTypeSeletList"
																      :key="key"
																      :label="val"
																      :value="key">
																    </el-option>
                                </el-select>-->
                              </template>
                            </el-table-column>
                            <el-table-column prop="before" label="变更前内容">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.before}}</span>
                                <!--<el-input
																	  type="textarea"
																	  v-model="scope.row.before">
                                </el-input>-->
                              </template>
                            </el-table-column>
                            <el-table-column prop="after" label="变更后内容">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.after}}</span>
                                <!--<el-input
																	  type="textarea"
																	  v-model="scope.row.after">
                                </el-input>-->
                              </template>
                            </el-table-column>
                            <el-table-column prop="changeDate" label="变更日期" width="150">
                              <template slot-scope="scope">
                                <span class="table_input_read">{{scope.row.changeDate}}</span>
                                <!--<el-date-picker
							                    	v-model="scope.row.changeDate"
							                      align="right"
							                      type="date"
							                      placeholder="选择日期">
                                </el-date-picker>-->
                              </template>
                            </el-table-column>

                            <!--<el-table-column
												        prop="address"
												        type="index"
												        label="操作"
												        width="90px">
												        <template slot-scope="scope">
												        	<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryOfficeData.length>1" @click="deleteOffice(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
												        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryOfficeData.length===scope.$index+1" @click="plusOffice" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
												        </template>
                            </el-table-column>-->
                          </el-table>
                        </template>
                      </el-form-item>
                      <div style="text-align: right;" v-if="false">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveOffice"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </div>
                    </div>
                    <div class="info-list">
                      <div style="line-height: 40px;">企业发展历史</div>
                      <el-form-item label="企业发展历史：">
                        <span class="input_textarea">{{extendInfoData.history}}</span>
                        <!--<el-input  type="textarea" :rows="4" :disabled="true" v-model="extendInfoData.history">
                        </el-input>-->
                      </el-form-item>
                      <div style="line-height: 40px;">企业创始人、实际控制人、法人代表、最大自然人股东情况和背景</div>
                      <el-form-item label="背景：">
                        <span class="input_textarea">{{extendInfoData.background}}</span>
                        <!--<el-input type="textarea" :rows="4" :disabled="true" v-model="extendInfoData.background">
                        </el-input>-->
                      </el-form-item>
                      <div style="line-height: 40px;">与我方往来情况及拓展渠道来源</div>
                      <el-form-item label="往来情况：">
                        <span class="input_textarea">{{extendInfoData.comeAndGo}}</span>
                        <!--<el-input  type="textarea" :rows="4" :disabled="true" v-model="extendInfoData.comeAndGo">
                        </el-input>-->
                      </el-form-item>
                      <div style="text-align: right;" v-if="false	">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveExtendInfo"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </div>
                    </div>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>

          <el-tab-pane label="财产信息" name="second">
            <div class="tab-content">
              <el-collapse
                @change="changeVerifyAssetInfo"
                v-model="activeVerifyAssetInfoNames"
                class="marginBotten"
              >
                <el-collapse-item name="AssetInfoOne">
                  <template slot="title">财产信息</template>
                  <el-form
                    ref="verifyAssetInfoForm"
                    label-width="170px"
                    size="mini"
                    label-position="right"
                  >
                    <!--房产数据-->
                    <div class="info-list">
                      <template>
                        <el-table :data="queryHouseInfoData" border style="width: 100%">
                          <el-table-column
                            prop="assetSubType"
                            type="index"
                            width="150px"
                            label="房产类型"
                          >
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.assetSubTypeText}}</span>
                              <!--<el-select  v-model="scope.row.assetSubType"   placeholder="请选择">
														    <el-option
														      v-for="item in assetSubHouseTypeList"
														      :key="item.type"
														      :label="item.typeText"
														      :value="item.type">
														    </el-option>
                              </el-select>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="estimatedValue" label="估值">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.estimatedValue}} 万元</span>
                              <!--<el-input
															  type="input"
															  v-model="scope.row.estimatedValue">
															   <template slot="append">元</template>
                              </el-input>-->
                            </template>
                          </el-table-column>

                          <el-table-column prop="mortgaged" type="index" width="150px" label="是否按揭">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.mortgagedText}}</span>
                              <!--<el-select v-model="scope.row.mortgaged" placeholder="请选择">
																<el-option :key="true" label="是" :value="true">
																</el-option>
																<el-option :key="false" label="否" :value="false">
																</el-option>
                              </el-select>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="paymentMonthly" label="房贷月还">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.paymentMonthly}} 元</span>
                              <!--<el-input
															  type="input"
															  v-model="scope.row.paymentMonthly">
															  <template slot="append">元</template>
                              </el-input>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="assetName" label="房产地址">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.assetName}}</span>
                              <!--<el-input
															  type="textarea"
															  v-model="scope.row.assetName">
                              </el-input>-->
                            </template>
                          </el-table-column>
                          <!--<el-table-column
										        prop="assetName"
										        type="index"
										        label="操作"
										        width="90px">
										        <template slot-scope="scope">
										        	<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryHouseInfoData.length>1" @click="deleteHouseInfo(scope.$index)"  type="danger" icon="el-icon-delete" size="mini" circle></el-button>
										        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryHouseInfoData.length===scope.$index+1" @click="plusHouseInfo"  type="primary" icon="el-icon-plus" size="mini" circle></el-button>
										        </template>
                          </el-table-column>-->
                        </el-table>
                      </template>
                    </div>
                    <!--车辆数据-->
                    <div class="info-list">
                      <template>
                        <el-table :data="queryCarInfoData" border style="width: 100%">
                          <el-table-column
                            prop="assetSubType"
                            type="index"
                            width="150px"
                            label="车类型"
                          >
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.assetSubTypeText}}</span>
                              <!--<el-select  v-model="scope.row.assetSubType"  placeholder="请选择">
														    <el-option
														      v-for="item in assetSubCarTypeList"
														      :key="item.type"
														      :label="item.typeText"
														      :value="item.type">
														    </el-option>
                              </el-select>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="estimatedValue" label="估值">
                            <template slot-scope="scope">
                              <span
                                class="table_input_read"
                              >{{scope.row.estimatedValue?scope.row.estimatedValue:'-'}} 万元</span>
                              <!--<el-input
															  type="input"
															  v-model="scope.row.estimatedValue">
															  <template slot="append">元</template>
                              </el-input>-->
                            </template>
                          </el-table-column>

                          <el-table-column prop="mortgaged" type="index" width="150px" label="是否按揭">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.mortgagedText}}</span>
                              <!--<el-select v-model="scope.row.mortgaged" placeholder="请选择">
																<el-option :key="true" label="是" :value="true">
																</el-option>
																<el-option :key="false" label="否" :value="false">
																</el-option>
                              </el-select>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="paymentMonthly" label="车贷月还">
                            <template slot-scope="scope">
                              <span
                                class="table_input_read"
                              >{{scope.row.paymentMonthly?scope.row.paymentMonthly:'-'}} 元</span>
                              <!--<el-input
															  type="input"
															  v-model="scope.row.paymentMonthly">
															  <template slot="append">元</template>
                              </el-input>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="assetName" label="车辆信息">
                            <template slot-scope="scope">
                              <span
                                class="table_input_read"
                              >{{scope.row.assetName?scope.row.assetName:'-'}}</span>
                              <!--<el-input
															  type="textarea"
															  v-model="scope.row.assetName">
                              </el-input>-->
                            </template>
                          </el-table-column>
                          <!--<el-table-column
										        prop="assetName"
										        type="index"
										        label="操作"
										        width="90px">
										        <template slot-scope="scope">
										        	<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&queryCarInfoData.length>1" @click="deleteCarInfo(scope.$index)"  type="danger" icon="el-icon-delete" size="mini" circle></el-button>
										        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&queryCarInfoData.length===scope.$index+1" @click="plusCarInfo"  type="primary" icon="el-icon-plus" size="mini" circle></el-button>
										        </template>
                          </el-table-column>-->
                        </el-table>
                      </template>
                      <div style="text-align: right;margin-top: 15px;" v-if="false">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveManager"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </div>
                    </div>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司管理情况" name="third">
            <div class="tab-content">
              <!--公司管理情况-->
              <el-collapse
                @change="changeVerifyFirmPlatform"
                v-model="activeVerifyFirmPlatformNames"
                class="marginBotten"
              >
                <el-collapse-item name="FirmFinancialPlatformOne">
                  <template slot="title">企业经营模式</template>
                  <el-form
                    ref="verifyAssetInfoForm"
                    label-width="170px"
                    size="mini"
                    label-position="right"
                  >
                    <div class="info-list">
                      <div style="line-height: 40px;">企业经营模式：</div>
                      <el-form-item label="企业经营模式：">
                        <span class="input_textarea">{{companyManageData.businessModel}}</span>
                        <!--<el-input  type="textarea" :rows="4" :disabled="true" v-model="companyManageData.businessModel">
                        </el-input>-->
                      </el-form-item>
                      <div style="line-height: 40px;">基本组织架构（业务）</div>
                      <el-form-item label="基本组织架构：">
                        <span class="input_textarea">{{companyManageData.organizationStructure}}</span>
                        <!--<el-input v-else type="textarea" :rows="4" :disabled="true" v-model="companyManageData.organizationStructure">
                        </el-input>-->
                      </el-form-item>
                      <div style="line-height: 40px;">管理技术情况</div>
                      <el-form-item label="系统使用情况：">
                        <span class="input_textarea">{{companyManageData.managementTechnique}}</span>
                        <!--<el-input  type="textarea" :rows="4" :disabled="true" v-model="companyManageData.managementTechnique">
                        </el-input>-->
                      </el-form-item>
                      <div style="text-align: right;" v-if="false">
                        <el-button
                          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                          @click="saveCompanyManage"
                          type="primary"
                          size="mini"
                        >保存</el-button>
                      </div>
                    </div>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关联公司情况" name="fourth">
            <div class="tab-content">
              <el-collapse
                @change="changeVerifyAffiliatedCompany"
                v-model="activeVerifyAffiliatedCompanyNames"
                class="marginBotten"
              >
                <el-collapse-item name="AffiliatedCompanyOne">
                  <template slot="title">关联公司情况</template>
                  <el-form
                    ref="verifyAffiliatedCompanyForm"
                    label-width="170px"
                    size="mini"
                    label-position="right"
                  >
                    <div class="info-list">
                      <template>
                        <el-table :data="affiliatedCompanyData" border style="width: 100%">
                          <el-table-column prop="affiliateType" label="与借款企业关系">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.affiliateTypeText}}</span>
                              <!--<el-select  v-model="scope.row.affiliateType"   placeholder="请选择">
															    <el-option
															      v-for="item in affiliateTypeList"
															      :key="item.type"
															      :label="item.typeText"
															      :value="item.type">
															    </el-option>
                              </el-select>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="enterpriseName" label="企业名称">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.enterpriseName}}</span>
                              <!--<el-input
																  type="input"
																  v-model="scope.row.enterpriseName">
                              </el-input>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="enterpriseController" label="实际控制人">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.enterpriseController}}</span>
                              <!--<el-input
																  type="input"
																  v-model="scope.row.enterpriseController">
                              </el-input>-->
                            </template>
                          </el-table-column>
                          <el-table-column prop="mainBusiness" label="主营业务简介">
                            <template slot-scope="scope">
                              <span class="table_input_read">{{scope.row.mainBusiness}}</span>
                              <!--<el-input
																  type="textarea"
																  v-model="scope.row.mainBusiness">
                              </el-input>-->
                            </template>
                          </el-table-column>

                          <!--<el-table-column
											        prop="mainBusiness"
											        type="index"
											        label="操作"
											        width="90px">
											        <template slot-scope="scope">
											        	<el-button v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&affiliatedCompanyData.length>1" @click="deleteAffiliatedCompany(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
											        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&affiliatedCompanyData.length===scope.$index+1" @click="plusAffiliatedCompany" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
											        </template>
                          </el-table-column>-->
                        </el-table>
                      </template>
                    </div>
                    <div style="text-align: right;margin-top: 20px;" v-if="false">
                      <el-button
                        v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                        @click="saveAffiliatedCompany"
                        type="primary"
                        size="mini"
                      >保存</el-button>
                    </div>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主营业务及市场" name="fifth">
            <div class="tab-content">
              <!--主营业务及市场-->
              <el-form
                ref="verifyAssetInfoForm"
                label-width="170px"
                size="mini"
                label-position="right"
              >
                <div class="info-list">
                  <div style="line-height: 40px;">客户所处市场及市场地位</div>
                  <el-form-item label="市场及市场地位：">
                    <span class="input_textarea">{{marketInfoData.position}}</span>
                    <!--<el-input  type="textarea" :rows="4" :disabled="true" v-model="marketInfoData.position">
                    </el-input>-->
                  </el-form-item>
                  <div style="line-height: 40px;">市场增长趋势及增长速度</div>
                  <el-form-item label="市场趋势：">
                    <span class="input_textarea">{{marketInfoData.trend}}</span>
                    <!--<el-input type="textarea" :rows="4" :disabled="true" v-model="marketInfoData.trend">
                    </el-input>-->
                  </el-form-item>
                  <div style="line-height: 40px;">业务循环分析</div>
                  <el-form-item label="业务循环分析：">
                    <span class="input_textarea">{{marketInfoData.cycle}}</span>
                    <!--<el-input  type="textarea" :rows="4" :disabled="true" v-model="marketInfoData.cycle">
                    </el-input>-->
                  </el-form-item>
                  <div style="text-align: right;" v-if="false">
                    <el-button
                      v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                      @click="saveMarketInfo"
                      type="primary"
                      size="mini"
                    >保存</el-button>
                  </div>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="经营数据分析" name="sixth">
            <div class="tab-content">
              <el-form
                ref="verifyAssetInfoForm"
                label-width="170px"
                size="mini"
                label-position="right"
              >
                <!-- <div class="info-list">
                  <div style="line-height: 40px;">平台基本信息</div>
                  <el-form-item label="公司全称：">
                    <span class="input_read">{{titanUpdownstreamData.merchantName}}</span>
                  </el-form-item>
                 </div>
                 <div class="info-list">
                  <div style="line-height: 40px;">供应商（上游）贸易数据</div>
                  <template>
                    <el-table :data="titanUpdownstreamData.upStream" border style="width: 100%">
                      <el-table-column prop="date" type="index" label="序号" width="60"></el-table-column>
                      <el-table-column prop="streamName" label="公司名称"></el-table-column>
                      <el-table-column prop="product" label="产品/服务"></el-table-column>
                      <el-table-column prop="tradeCount" label="年销售量（近12月）"></el-table-column>
                      <el-table-column prop="tradeAmount" label="年销售额（近12月）"></el-table-column>
                      <el-table-column prop="settleMethod" label="结算方式"></el-table-column>
                      <el-table-column prop="tradePercent" label="上游销售额占比"></el-table-column>
                    </el-table>
                  </template>
                 </div>
                 <div class="info-list">
                  <div style="line-height: 40px;">渠道商（下游）贸易数据</div>
                  <template>
                    <el-table :data="titanUpdownstreamData.downStream" border style="width: 100%">
                      <el-table-column prop="date" type="index" label="序号" width="60"></el-table-column>
                      <el-table-column prop="streamName" label="公司名称"></el-table-column>
                      <el-table-column prop="product" label="产品/服务"></el-table-column>
                      <el-table-column prop="tradeCount" label="年销售量（近12月）"></el-table-column>
                      <el-table-column prop="tradeAmount" label="年销售额（近12月）"></el-table-column>
                      <el-table-column prop="settleMethod" label="结算方式"></el-table-column>
                      <el-table-column prop="tradePercent" label="下游销售额占比"></el-table-column>
                    </el-table>
                  </template>
                </div>-->

                <div style="line-height: 40px; margin-top:25px">企业贸易关联平台经营数据</div>
                <el-form label-width="170px" size="mini" label-position="right">
                  <div class="info-list">
                    <div class="lh_title">第三方数据平台销售数据（金额单位：万元）</div>
                    <div v-for="(item,index) in saleStatOthersList" class="sale_box">
                      <div class="lh_title">
                        平台名称：
                        <template>{{item.nameText}}</template>
                      </div>
                      <template>
                        <el-table :data="tableData" border style="width: 100%">
                          <template
                            v-if="item.data"
                            v-for="(tabItem,tabIndex) in saleStatOthersList[index].data"
                          >
                            <el-table-column prop="date" :label="tabItem.key" width="180">
                              <template slot-scope="scope">
                                <div
                                  style="width: 90%;"
                                >{{saleStatOthersList[index].data[tabIndex].value}}</div>
                              </template>
                            </el-table-column>
                          </template>
                        </el-table>
                      </template>
                      <div class="sale_hj">合计：{{item.totalAmt}}</div>
                    </div>
                  </div>
                </el-form>
                <div class="info-list" style="border-top: 1px solid #cdcdcd">
                  <div class="info-list">
                    <div style="line-height: 40px;">主要经营指标</div>
                    <template>
                      <el-table border style="width: 100%" :data="salesMetricsList">
                        <el-table-column label="指标名称" prop="metricsTypeText"></el-table-column>
                        <el-table-column label="总量（近12个月）" prop="total"></el-table-column>
                        <el-table-column label="变化率（近12个月）" prop="changeRate"></el-table-column>
                      </el-table>
                    </template>
                  </div>
                  <div class="info-list">
                    <div style="line-height: 40px;">销项发票数据统计</div>
                    <template>
                      <el-table border style="width: 100%" :data="outputVatDataList">
                        <el-table-column label="日期" prop="outputDate"></el-table-column>
                        <el-table-column label="正常发票金额（元）/份数" prop="normalData"></el-table-column>
                        <el-table-column label="作废发票金额（元）/份数" prop="cancellationData"></el-table-column>
                        <el-table-column label="冲红发票金额（元）/份数" prop="creditnoteData"></el-table-column>
                        <el-table-column label="专用发票金额（元）/份数" prop="specialData"></el-table-column>
                        <el-table-column label="普通发票金额（元）/份数" prop="plainData"></el-table-column>
                      </el-table>
                    </template>
                  </div>
                  <div class="info-list">
                    <div style="line-height: 40px;">进项发票数据统计</div>
                    <template>
                      <el-table border :data="inputVatDataList" style="width: 100%">
                        <el-table-column label="日期" prop="outputDate"></el-table-column>
                        <el-table-column label="正常发票金额（元）/份数" prop="normalData"></el-table-column>
                        <el-table-column label="作废发票金额（元）/份数" prop="cancellationData"></el-table-column>
                        <el-table-column label="冲红发票金额（元）/份数" prop="creditnoteData"></el-table-column>
                        <el-table-column label="专用发票金额（元）/份数" prop="specialData"></el-table-column>
                      </el-table>
                    </template>
                  </div>
                  <div class="info-list">
                    <div style="line-height: 40px;">近一年前五大供应商</div>
                    <template>
                      <el-table border :data="relatedSuppliersList" style="width: 100%">
                        <el-table-column label="企业名称" prop="entName"></el-table-column>
                        <el-table-column label="交易总金额（元）" prop="totalTransaction"></el-table-column>
                        <el-table-column label="开票份数" prop="transactionVolumes"></el-table-column>
                        <el-table-column label="交易金额占比" prop="amountPercentage"></el-table-column>
                        <el-table-column label="主要商品" prop="mainGoods"></el-table-column>
                        <el-table-column label="关联关系" prop="correlation"></el-table-column>
                        <el-table-column label="最后交易日期" prop="lastTransactionDate"></el-table-column>
                      </el-table>
                    </template>
                  </div>
                  <div class="info-list">
                    <div style="line-height: 40px;">近一年前五大客户</div>
                    <template>
                      <el-table :data="relatedClientsList" border style="width: 100%">
                        <el-table-column label="企业名称" prop="entName"></el-table-column>
                        <el-table-column label="交易总金额（元）" prop="totalTransaction"></el-table-column>
                        <el-table-column label="开票份数" prop="transactionVolumes"></el-table-column>
                        <el-table-column label="交易金额占比" prop="amountPercentage"></el-table-column>
                        <el-table-column label="主要商品" prop="mainGoods"></el-table-column>
                        <el-table-column label="关联关系" prop="correlation"></el-table-column>
                        <el-table-column label="最后交易日期" prop="lastTransactionDate"></el-table-column>
                      </el-table>
                    </template>
                  </div>
                </div>
                <div class="lh_title">主要供应商情况</div>
                <template v-if="upDownSupplierList">
                  <el-table border style="width: 100%" :data="upDownSupplierList.up">
                    <template>
                      <el-table-column label="供应商名称" prop="name"></el-table-column>
                      <el-table-column label="产品 / 服务" prop="productText"></el-table-column>
                      <el-table-column label="占比（%）" prop="ratio"></el-table-column>
                      <el-table-column label="账期（天）" prop="accountPeriod"></el-table-column>
                    </template>
                  </el-table>
                </template>
                <div class="lh_title">主要下游客户情况</div>
                <template v-if="upDownSupplierList">
                  <el-table
                    border
                    style="width: 100%; margin-bottom: 20px;"
                    :data="upDownSupplierList.down"
                  >
                    <template>
                      <el-table-column prop="name" label="客户名称"></el-table-column>
                      <el-table-column prop="product" label="产品 / 服务"></el-table-column>
                      <el-table-column prop="ratio" label="占比（%）"></el-table-column>
                      <el-table-column prop="accountPeriod" label="账期（天）"></el-table-column>
                    </template>
                  </el-table>
                  <div style="margin-top: 20px 0; text-align:right"></div>
                </template>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="银行流水核查" name="record">
            <div class="tab-content" style="padding-top:40px">
			<template >
			<el-date-picker v-model="startTimeMonth" type="month" placeholder="选择月"></el-date-picker> -
			<el-date-picker v-model="endTimeMonth" type="month" placeholder="选择月"></el-date-picker>
			<el-button
				v-if="bankStatementData"
				type="primary"
				size="mini"
				@click="queryDetails"
			>查询</el-button>
			</template>
              <el-table :data="bankStatementData" border style="width: 100%; margin-top:50px">
                <el-table-column prop="transactionDate" width="120" label="交易日期"></el-table-column>
                <el-table-column prop="transactionTime" width="100" label="交易时间"></el-table-column>
                <el-table-column prop="debitAmount" width="120" label="借方发生额"></el-table-column>
                <el-table-column prop="ceditAmount" width="120" label="贷方发生额"></el-table-column>
                <el-table-column prop="accountBalance" label="账户余额"></el-table-column>
                <el-table-column prop="oppositeNumber" label="对方账号"></el-table-column>
                <el-table-column prop="oppositeName" label="对方名称"></el-table-column>
                <el-table-column prop="digest" label="摘要"></el-table-column>
              </el-table>
            </div>
			 <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentPage"
              :current-page.sync="listQuery.page"
              :page-sizes="[10,20,30,50]"
              :page-size="listQuery.limit"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="借款信息" name="seventh">
            <div class="tab-content">
              <el-form
                ref="verifyFirmInfoForm"
                label-width="170px"
                size="mini"
                label-position="right"
              >
                <div class="info-list">
                  <el-form-item label="申请额度：">
                    <span class="input_read">{{borrowInfoData.creditLine}} 万元</span>
                    <!--<el-input v-model="borrowInfoData.creditLine" :disabled="true" style="width: 300px;">
                    </el-input>-->
                  </el-form-item>
                  <el-form-item label="借款期限：">
                    <span class="input_read">{{borrowInfoData.creditLineTimeLimit}}</span>
                    <!--<el-input v-model="borrowInfoData.creditLineTimeLimit" :disabled="true" style="width: 300px;">
                    </el-input>-->
                  </el-form-item>
                  <el-form-item label="借款用途：">
                    <span class="input_read">{{borrowInfoData.creditLineUse}}</span>
                    <!--<el-input v-model="borrowInfoData.creditLineUse" :disabled="true" style="width: 300px;">
                    </el-input>-->
                  </el-form-item>
                  <el-form-item label="客户来源：">
                    <span class="input_read">{{borrowInfoData.customerSource}}</span>
                    <!--<el-input v-model="borrowInfoData.customerSource" :disabled="true" style="width: 300px;">
                    </el-input>-->
                  </el-form-item>
                  <el-form-item label="产品：">
                    <template slot-scope="scope">
                      <span class="input_read">{{borrowInfoData.loanProductText}}</span>
                    </template>
                  </el-form-item>
                  <el-form-item label="贷款类型：">
                    <template slot-scope="scope">
                      <span class="input_read">担保贷款</span>
                    </template>
                  </el-form-item>
                  <el-form-item label="还款来源：">
                    <template slot-scope="scope">
                      <span class="input_read">日常收入</span>
                      <!--<el-select v-model="borrowInfoData.val"  filterable placeholder="请选择">
						        		<el-option
										      key="1"
										      label="日常收入"
										      value="1">
										    </el-option>
										    <el-option
										      v-for="(val,key) in locationTypeList"
										      :key="key"
										      :label="val"
										      :value="key">
										    </el-option>
                      </el-select>-->
                    </template>
                  </el-form-item>
                  <div style="text-align: right;" v-if="false">
                    <el-button
                      v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
                      @click="saveBorrowInfo"
                      type="primary"
                    >保存</el-button>
                  </div>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="影像资料" name="nine">
            <div class="tab-content">
              <el-form
                ref="verifySupplyDataForm"
                label-width="170px"
                size="mini"
                label-position="right"
              >
                <div class="info-list">
                  <template>
                    <el-table :data="supplyDataData.items" border style="width: 100%">
                      <el-table-column prop="enterpriseName" type="index" width="80" label="序号"></el-table-column>
                      <el-table-column prop="itemText" min-width="200" label="影像资料类型">
                        <template slot-scope="scope">{{scope.row.itemText}}</template>
                      </el-table-column>
                      <el-table-column prop="content" min-width="200" label="已上传的内容">
                        <template slot-scope="scope">
                          <div
                            v-if="scope.row.content"
                            v-for="(item,contentIndex) in scope.row.content"
                          >
                            <a :href="item.url" target="view_window">
                              <span class="file_name">{{item.fileName}}</span>
                            </a>
                            <!--<span v-if="scope.row.upload" @click="delFile(item.id,scope.$index,contentIndex)" class="file_del">删除</span>-->
                          </div>
                        </template>
                      </el-table-column>

                      <!--<el-table-column
								        prop="item"
								        type="index"
								        label="操作"
								        width="190px">
								        <template  v-if="scope.row.upload"  slot-scope="scope">
								        	<label :for="scope.row.item" >
								        		<div class="selet_file_btn">
								        			选择文件
								        		</div>
								        	</label>
								        	<input :id="scope.row.item"  type="file" name=""  value="1"  @change="tirggerFile($event,scope.row.item,scope.$index)" class="yc_file" style="display: none;"/>
								        </template>
                      </el-table-column>-->
                    </el-table>
                  </template>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--tab-->
      <div class="flex-item" style="width: 0;">
        <ul>
          <li class="background-gray color-black">
            <div>操作</div>
            <div></div>
          </li>
          <li v-if="!(querySummaryData.status==='SUBMIT')">
            <div>
              <el-button @click="doReject">拒绝</el-button>
              <el-button
                v-if="!roleHasPermissions['supplier_manage_register_list_review']"
                type="primary"
                @click="subFirstTrial"
              >提交初审</el-button>
            </div>
          </li>
        </ul>
      </div>
      <!--左侧操作栏-->
    </div>
    <el-dialog title="选择担保人" width="450px" :visible.sync="dialogSelectGuarantorForm">
      <template>
        <div style="margin-top: 20px">
          <el-radio-group v-model="selectedGuarantor" size="mini" style="margin-bottom: 10px;">
            <el-radio
              v-for="item in selectGuarantorListData"
              :label="item.guarantorId"
              style="width: 400px;margin:0 0 8px;"
              :key="item.guarantorId"
              border
            >{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.identityNo}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.mobile}}</el-radio>
          </el-radio-group>
        </div>
      </template>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button
          v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"
          type="primary"
          @click="saveSelectGuarantor"
        >保存</el-button>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Upload from "@/components/Upload/Upload";
import Uploads from "@/components/Upload/Uploads";
import NoteChart from "@/components/charts/noteChart";
import PieChart from "@/components/charts/pieChart";
import { comboboxBankList, queryCapitalEnterprise } from "@/api/common";
import enterpriseData from "@/api/enterpriseDataManage/enterpriseData";
import verifyDetail from "@/api/supplierManage/verifyDetail";
import baseUtil from "@/utils/baseUtil";
import { validContent } from "@/utils/validate";
import { Format } from "@/utils/index";
import {
  handleSelectionChange,
  handleSizeChange,
  handleCurrentPage
} from "@/utils/common";
export default {
  name: "enterpriseData",
  components: { Upload, Uploads, NoteChart, PieChart },
  data() {
    return {
      supplierId: "", // 商户id
      registerStage: "", // 入驻阶段 BASIC: 基础资料, VERIFY: 尽调, SIGN: 签署合同,CAPITAL ： 待资方审核， PASS: 入驻成功, REJECT: 入驻失败
      registerStageText: "", // 入驻阶段中文
      registerStatus: "", // 入驻状态 INIT: 填写中, APPROVING: 待审核, REAPPROVING: 待复审, AMENDING: 待补充,APPROVING： 待审核，SIGNING：待签署， PASS: 入驻成功, REJECT: 入驻失败
      registerStatusText: "", // 入驻状态中文
      registerStatusRemark: "", // 入驻状态备注
      querySummaryData: "", // 商户详情页面的顶栏
      inspectionStage: "", //
      inspectionDialogShow: false, // 基础信息、贸易资料审核相关dialog
      inspectionBtnShow: true, //风控审核按钮显示与隐藏 默认显示
      inspectionRelateData: {
        title: "",
        inspectionArray: []
      },
      centreListDialogShow: false, //合作核心企业
      centreList: [], //查询的合作核心企业
      centreCheckList: [], //勾选的合作核心企业
      approveRejectDialogShow: false, // 基础资料、贸易资料打回原因dialog
      approveRejectData: {
        // 基础资料、贸易资料打回时 原因数据
        amendItems: [],
        amendRemark: ""
      },
      bankAmt: "", //打款金额
      remitData: {}, //打款数据
      rejectDialogShow: false, // 拒绝弹窗控制
      remark: "", // 拒绝原因
      queryBasicData: "", // 查询基础资料
      queryTradeData: [], // 查询贸易资料
      queryKnowData: {
        // 预沟通资料
        credit: "",
        trade: ""
      },
      titanUpdownstreamData: "", //上下游数据
      queryReviewData: "", //风控数据
      comboboxBankList: "", //银行列表
      queryCapitalEnterpriseList: "", //资金方列表
      queryVerifyData: {
        creditEnterprise: {
          abnormalCount: "",
          abnormalDesc: "",
          fileName: "",
          fileUrl: ""
        },
        creditRepre: {
          abnormalCount: "",
          abnormalDesc: "",
          fileName: "",
          fileUrl: ""
        },
        creditGuarantor: {
          abnormalCount: "",
          abnormalDesc: "",
          fileName: "",
          fileUrl: ""
        },
        centres: []
      }, // 查询尽调资料
      //商户维护
      financeGeneralSituationData: "", //授信详情数据
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
      activeVerifyFirmInfoNames: "FirmInfoOne", //企业信息默认项
      activeVerifyFirmMemberNames: "", //企业成员默认项
      activeVerifyAssetInfoNames: "AssetInfoOne", //财产信息默认项
      activeVerifyAffiliatedCompanyNames: "AffiliatedCompanyOne", //关联公司状态默认项
      activeVerifyFirmCreditNames: "", //企业征信默认项
      activeVerifyFirmAccessoryNames: "", //企业附件默认项
      activeVerifyFirmFinancialTrideNames: "", //财务及贸易统计默认项
      activeVerifyFirmOtherNames: "", //其他信息默认项
      activeVerifyFirmBondsmanNames: "FirmFinancialBondsmanOne", //担保人默认项
      activeVerifyFirmPlatformNames: "FirmFinancialPlatformOne", //公司管理情况
      customTypeData: "", //客户类型数据
      enterpriseInfoData: "", //基本情况数据
      accountLicenseData: "", //开户许可数据
      extendInfoData: "", //扩展信息数据
      companyManageData: "", //公司管理情况数据
      marketInfoData: "", //主营业务及市场数据
      borrowInfoData: "", //借款信息数据
      supplyDataData: {
        items: [
          {
            item: "",
            itemText: "",
            content: [{ url: "", fileName: "123412", id: "" }],
            upload: ""
          }
        ]
      }, //影响资料数据
      merchantCode: "", //商户code
      shareholderYears: "", //投资背景上溯年数
      queryEquityData: [], //股权变动数据
      queryOfficeData: [], //股东变更信息数据
      affiliatedCompanyData: [], //关联公司状态数据
      queryManagerData: [], //成员名单数据
      queryHouseInfoData: [], //财产信息---房产数据
      queryCarInfoData: [], //财产信息---车辆数据
      queryCreditData: [], //征信记录数据
      queryPaperData: [], //征信附件数据
      queryEnterpriseTradeData: "", //财务及贸易统计数据
      streamVolumesStatusList: [], //财务及贸易统计交易数据可验证程度列表数据---------下拉列表
      queryEnterpriseFinanceData: "", //其他信息数据
      queryEnterpriseOpinionData: [], //其他信息-互联网信息审核-数据
      queryEnterpriseGuarantorData: [], //其他信息--法人信息-数据
      selectGuarantorListData: [], //其他信息-选择担保人列表数据
      selectedGuarantor: "", //选中的担保人
      selectGuarantorIndex: "", //点击选择担保人的索引
      dialogSelectGuarantorForm: false, //选择担保人 弹窗控制
      queryDistributorData: [], //其他信息-下游平台信息-数据
      agentInfoSeletList: "", //下拉列表-分销商下拉信息查询
      locationTypeList: "", //下拉列表-经营地下拉信息查询
      memberTypeSeletList: "", //下拉列表-企业成员类型
      assetSubTypeList: "", //下拉列表-资产子类型
      affiliateTypeList: "", //下拉列表-与借款企业关系

      levelInfoSeletList: "", //下拉列表-严重程度
      bankListSeletList: "", //下拉列表-银行信息
      certificateTypeSeletList: "", //下拉列表-证件类型
      identityTypeSeletList: "", //下拉列表-身份证件类型
      capitalTypeSeletList: "", //资料明细_企业基本信息_股东名单_类型下拉
      changeTypeSeletList: "", //资料明细_企业基本信息_股东变更_变更事项下拉
      assetSubHouseTypeList: "", //资产子类型-房
      assetSubCarTypeList: "", //资产子类型-车
      //新尽调数据---end
      contractSignNameList: ["fdgfd", "gfdgf"], //合同签署企业名称列表
      querySignData: {}, // 查询签署
      rate: {
        monthRate: "", //月利率
        yearRate: "" //年利率
      },
      queryGradeData: {
        finalGrade: "",
        primaryGrade: "",
        secondaryGrade: "",
        secondaryScore: ""
      }, //授信签署-评级-查询评级数据
      contractInfoData: [], //合同信息数据
      uploadFileData: {
        supplierId: "",
        isImage: false
      },
      uploadImgData: {
        supplierId: "",
        isImage: true
      },
      pdfShow: false, //pdfdialog
      scoreCardShow: false, //评分卡dialog
      queryGradeDetailData: {
        finalGrade: "",
        primaryGrade: "",
        secondaryGrade: "",
        secondaryScore: ""
      }, //授信签署-评级-查询评级详情数据
      adminSupplierRegisterQueryTardeRmSummaryResponse: [], //评分卡数组数据
      tradeRmSummaryShow: false, // 贸易统计详情 贸易资料待审核通过后才能看见 贸易风控
      tradeRmSummaryData: [], // 贸易风控数据
      tradeVendorCodeData: [], // 贸易数据 平台商户编码
      tradeRmSummaryTab: "0", //贸易统计tab
      scoreCardTab: "0", //评分卡tab
      verifyRmSummaryShow: false, // 贸易数据匹配 尽调通过后才能看见  尽调风控
      verifyRmSummaryData: [], // 尽调风控数据 贸易数据匹配
      verifyRmSummaryTab: "0", //
      verifyRmDetailShow: false, // 尽调资料风控 信用报告详情
      verifyRmDetailData: {}, // 尽调资料风控 信用报告详情数据
      transactionStatisticsData: "", // 交易统计 操作
      tradeDataMatchingData: "", // 贸易数据匹配 操作
      corporateCreditReportData: "", // 企业信用报告(人行) 操作
      legalRepresentativeCreditReportData: "", // 法定代表人信用报告(人行) 操作
      guaranteeCreditReportData: "", // 担保人信用报告(人行) 操作
      cooperationAgreementData: "", // 协议签署合同协议 操作
      communicationRecordsList: "", //沟通记录列表
      count: 0,
      activeTab: "first",
      isLookImg: false,
      lookImgSrc: "",
      deg: 0, //图片旋转的角度
      passwords: {
        password0: false,
        password1: false,
        password2: false,
        password3: false,
        password4: false,
        password5: false,
        password6: false
      }, //密码显示与不显示
      dayOptions: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
        { value: "31", label: "31" }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],

      //经营数据分析
      saleStatOthersList: [], //企业销售数据
      relatedClientsList: [], //经营数据分析-近一年前五大客户
      relatedSuppliersList: [], //经营数据分析--近一年前五大供应商
      inputVatDataList: [], //进项发票数据统计
      outputVatDataList: [], //销项发票数据统计
      salesMetricsList: [], //营销指标
      upDownSupplierList: {
        //主要供应商情况列表
        up: [],
        down: []
	  },

	  startTimeMonth: "", //查询的开始时间
      endTimeMonth: "", //查询的结束时间
	  bankStatementData: [], //银行流水数据
	  listQuery:{       //分页
		  page:1,
		  limit:30
	  },
	  total: 0, //分页
	  handleSizeChange: handleSizeChange.bind(this),
      handleCurrentPage: handleCurrentPage.bind(this),
    };
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ]),
    statusActive() {
      const registerStage = this.registerStage;
      let num = 0;
      this.activeTab = "first";
      return num;
      if (registerStage === "BASIC") {
        num = 0;
        this.getQueryBasicData(); //基础资料
        this.activeTab = "first";
      }
      //      if (registerStage === 'TRADE') {
      //        num = 1
      //        this.getQueryTradeData();//贸易资料
      //        this.activeTab = 'second';
      //      } else if (registerStage === 'KNOW') {
      //        num = 2
      //        this.getQueryKnowData();//预沟通资料
      //        this.activeTab = 'third';
      //      } else
      else if (registerStage === "VERIFY") {
        num = 1;
        this.getQueryVerifyData(); //尽调资料
        this.activeTab = "second";
      } else if (registerStage === "SIGN") {
        num = 2;
        this.getQuerySignData(); //授信签署
        this.getQueryGrade(); //授信签署-评级-查询评级
        this.activeTab = "third";
      } else if (registerStage === "CAPITAL") {
        num = 3;
        this.getQuerySignData(); //待资方审核
        this.getQueryGrade(); //授信签署-评级-查询评级
        this.activeTab = "third";
      } else if (registerStage === "REJECT") {
        num = 0;
        this.getQuerySignData(); //入驻失败
        this.getQueryGrade(); //授信签署-评级-查询评级
        this.activeTab = "third";
      } else if (registerStage === "PASS") {
        num = 5;
        this.getQuerySignData(); //授信签署
        this.getQueryGrade(); //授信签署-评级-查询评级
        this.activeTab = "third";
      }
      return num;
    },
    passDisabled() {
      if (
        this.registerStatus === "REAPPROVING" ||
        this.registerStatus === "APPROVING" ||
        this.registerStatus === "AMENDING"
      ) {
        return false;
      }
      return true;
    },
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ])
  },
  watch: {
    registerStage(value) {
      if (value === "TRADE" && this.registerStatus === "REAPPROVING") {
        // 贸易资料 待复核
        this.getQueryReview();
      } else if (value === "VERIFY" && this.registerStatus === "AMENDING") {
        // //  尽调中 待补充
        this.getQueryReview();
      } else if (
        value === "SIGN" ||
        value === "CAPITAL" ||
        value === "REJECT" ||
        value === "PASS"
      ) {
        this.getQueryReview();
      }
    },
    registerStatus(value) {},
    centreList(val, oldVal) {
      for (let i = 0; i < val.length; i++) {
        if (val.remark === true) {
          this.centreCheckList.push(val.id);
        }
      }
    }
  },
  created() {
    this.supplierId = this.$route.params.id;
    this.uploadFileData.supplierId = this.supplierId;
    this.uploadImgData.supplierId = this.supplierId;
    if (this.supplierId) {
      this.init();
    }
  },
  mounted() {},
  methods: {
    tirggerFile(event, type, index) {
      //上传影像
      var file = event.target.files;
      let formData = new FormData();
      formData.append("file", file[0]);
      formData.append("type", type);
      formData.append("supplierId", this.supplierId);
      enterpriseData.uploadFile(formData).then(res => {
        if (res.data.code === "200") {
          this.supplyDataData.items[index].content.push(res.data.data);
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    delFile(id, index, contentIndex) {
      //删除影像
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseData.deleteFile(id).then(res => {
            if (res.data.code === "200") {
              this.supplyDataData.items[index].content.splice(contentIndex, 1);
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {});
    },
    resetFaceCheckTimes() {
      //重置人脸识别次数
      enterpriseData.resetFaceCheckTimes(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleClick(tab) {
      //融资概况，基本信息，担保信息，渠道信息，授信管理,合同管理
      if (tab.index === "0") {
        this.getBasicInfo(); //基本信息
      } else if (tab.index === "1") {
        //财产需求
        this.getQueryManager(); //尽调信息-财产信息
        this.getAssetSubCarTypeList(); //获取下拉列表-资产子类型-车
        this.getAssetSubHouseTypeList(); //获取下拉列表-资产子类型-房
      } else if (tab.index === "2") {
        this.getQueryCompanyManage(); //资料明细-公司管理情况-公司管理情况查询------------查询
      } else if (tab.index === "3") {
        //关联公司状态
        this.getQueryAffiliatedCompany(); // 资料明细-关联公司状态-关联公司状态------查询
        this.getAffiliateTypeList(); //获取下拉列表-与借款企业关系
      } else if (tab.index === "4") {
        this.getQueryMarketInfo(); //资料明细-主营业务及市场查询------------查询
      } else if (tab.index === "5") {
        this.queryIntoUpdownstream(); //经营数据分析
        this.getQueryVerifyEnterpriseSale();
        this.checkInvoiceSignStatus();
        this.getupDownSupplierList();
      } else if (tab.index === "6") {
		this.getBankStatement()      // 银行流水核查
      } else if (tab.index === "7") {
        this.getQueryBorrowInfo(); //资料明细-借款信息-借款信息查询------------查询
      }else if (tab.index === "8") {
        this.getQueryFileList(); //影像列表-查询
        //  			this.getQuerySignData();//授信签署
        //  			this.getQueryGrade();//授信签署-评级-查询评级
      }
    },
    showScmPassword(index) {
      if (index == 0) {
        this.passwords.password0 = !this.passwords.password0;
      }
      if (index == 1) {
        this.passwords.password1 = !this.passwords.password1;
      }
      if (index == 2) {
        this.passwords.password2 = !this.passwords.password2;
      }
      if (index == 3) {
        this.passwords.password3 = !this.passwords.password3;
      }
      if (index == 4) {
        this.passwords.password4 = !this.passwords.password4;
      }
      if (index == 5) {
        this.passwords.password5 = !this.passwords.password5;
      }
      if (index == 6) {
        this.passwords.password6 = !this.passwords.password6;
      }
    }, //贸易资料点击密码显示与隐藏
    getRemitView() {
      enterpriseData.remitView(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.remitData = res.data.data;
          this.bankAmt = res.data.data.bankAmt;
        } else if (res.data.code === "500") {
          this.$message.error(res.data.message);
        }
      });
    }, //查询打款验证信息
    remitConfirm() {
      enterpriseData.remitConfirm(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.bankAmt = res.data.data.bankAmt;
          this.getRemitView();
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, //生成打款验证
    enterpriseElements(type) {
      //效验企业三要素和四要素
      var that = this;
      let data = {
        supplierId: that.supplierId,
        type: ""
      };
      if (type == "verifyEnterpriseFourElements") {
        //企业四要素
        data.type = "ENTERPRISE";
      }
      if (type == "verifyCorporateThreeElements") {
        //法人三要素
        data.type = "REPRE";
      }
      if (type == "verifyBondsmanThreeElements") {
        //担保人三要素
        data.type = "GUARANTOR";
      }
      enterpriseData.informationCheck(data).then(res => {
        if (res.data.code === "200") {
          if (res.data.data.status === "success") {
            let bool = true;
            this.changeEnterpriseElementSresult(type, bool);
          } else if (res.data.data.status === "fail") {
            let bool = false;
            this.changeEnterpriseElementSresult(type, bool);
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    changeEnterpriseElementSresult(type, bool) {
      //效验后改变result的值
      const length = this.inspectionRelateData.inspectionArray.length;
      for (let i = 0; i < length; i++) {
        if (this.inspectionRelateData.inspectionArray[i].group == "cert") {
          const subLength = this.inspectionRelateData.inspectionArray[i].items
            .length;
          for (let j = 0; j < subLength; j++) {
            if (
              this.inspectionRelateData.inspectionArray[i].items[j].item ===
              type
            ) {
              if (bool) {
                this.inspectionRelateData.inspectionArray[i].items[
                  j
                ].result = 1;
              } else {
                this.inspectionRelateData.inspectionArray[i].items[
                  j
                ].result = 0;
              }
            }
          }
        }
      }
    },
    lookImg(imgSrc) {
      //查看图片
      this.deg = 0;
      var that = this;
      that.lookImgSrc = imgSrc;
      that.isLookImg = true;
    },
    clearImg() {
      //点击图片隐藏
      this.deg = 0;
      var that = this;
      that.isLookImg = false;
    },
    rotateImg(type) {
      //旋转图片
      let deg = this.deg;
      if (type === "left") {
        this.deg -= 90;
      } else {
        this.deg += 90;
      }
      let _height = window.getComputedStyle(this.$refs.lookImgBox).height;
      let _width = window.getComputedStyle(this.$refs.lookImgBox).width;
      if (this.isNineTenMutiple(this.deg)) {
        this.$refs.rotateImg.style.width = _width;
        this.$refs.rotateImg.style.marginLeft = "auto";
      } else {
        this.$refs.rotateImg.style.width = parseFloat(_height) - 30 + "px";
        this.$refs.rotateImg.style.marginLeft =
          (parseFloat(_width) - parseFloat(_height)) / 2 + "px";
      }
      this.$refs.rotateImg.style.transform = "rotate(" + this.deg + "deg)";
    },
    isNineTenMutiple(number) {
      var isTen = number / 90;
      if (isTen % 2 == 0) {
        //偶数
        return true;
      } else {
        //奇数
        return false;
      }
    },
    uploadBankChange(fileData) {
      this.queryVerifyData.centres[fileData.index].bankFileName = fileData.file
        ? fileData.file.name
        : "文件";
    },
    uploadTaxChange(fileData) {
      this.queryVerifyData.centres[fileData.index].taxFileName = fileData.file
        ? fileData.file.name
        : "文件";
    },
    uploadCreditEnterpriseChange(fileData) {
      this.queryVerifyData.creditEnterprise.fileName = fileData.file
        ? fileData.file.name
        : "文件";
    },
    uploadCreditRepreChange(fileData) {
      this.queryVerifyData.creditRepre.fileName = fileData.file
        ? fileData.file.name
        : "文件";
    },
    uploadCreditGuarantorChange(fileData) {
      this.queryVerifyData.creditGuarantor.fileName = fileData.file
        ? fileData.file.name
        : "文件";
    },
    method1(type) {
      const allStatus = [
        "BASIC_INIT",
        "BASIC_APPROVING",
        "BASIC_REAPPROVING",
        "BASIC_AMENDING",
        "TRADE_INIT",
        "TRADE_APPROVING",
        "TRADE_REAPPROVING",
        "TRADE_AMENDING",
        "KNOW_AMENDING",
        "VERIFY_AMENDING",
        "SIGN_AMENDING",
        "PASS",
        "REJECT"
      ];
      if (type) {
        this.count++;
      } else {
        this.count--;
      }
      if (this.count >= allStatus.length) {
        this.count = 0;
      } else if (this.count < 0) {
        this.count = allStatus.length - 1;
      }
      const registerStage = allStatus[this.count].split("_")[0];
      const registerStatus = allStatus[this.count].split("_")[1]
        ? allStatus[this.count].split("_")[1]
        : allStatus[this.count].split("_")[0];
      this.registerStage = registerStage;
      this.registerStatus = registerStatus;
      this.registerStatusText =
        registerStatus === "INIT"
          ? "填写中"
          : registerStatus === "APPROVING"
          ? "待审核"
          : registerStatus === "REAPPROVING"
          ? "待复核"
          : registerStatus === "AMENDING"
          ? "待补充"
          : registerStatus === "PASS"
          ? "入驻成功"
          : "入驻失败";
    },
    init() {
      //      this.getQuerySummary()
      this.getBasicInfo(); //基本信息
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
    getFinanceGeneralSituation() {
      //获取融资概况
      enterpriseData.financeGeneralSituation(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.financeGeneralSituationData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getBasicInfo() {
      //基本信息
      this.getQueryEnterpriseGuarantor(); //担保信息
      this.getQueryCustomType(); //尽调信息-客户类型查询------------查询
      this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
      this.getLocationTypeList(); //经营地下拉
      this.getQueryAccountLicense(); //开户许可
      this.getQueryExtendInfo(); //扩展信息
      this.getQueryEquity(); //尽调信息-股权变动列表查询
      this.getQueryOffice(); //尽调信息-经营场所列表查询
      this.getLevelInfoSeletList(); //获取下拉列表-严重程度
      //			  this.getCapitalTypeSeletList();//获取资料明细_企业基本信息_股东名单_类型下拉
      //			  this.getChangeTypeTypeSeletList();//获取资料明细_企业基本信息_股东变更_变更事项下拉
    },
    getQueryCustomType() {
      //尽调信息-客户类型查询------------查询
      enterpriseData
        .customType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.customTypeData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryEnterpriseInfo() {
      //尽调信息-基本情况详情------------查询
      enterpriseData
        .basicData(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.enterpriseInfoData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveEnterpriseInfo() {
      //尽调信息-基本情况修改
      let data = baseUtil.copy(this.enterpriseInfoData);
      if (typeof data.establishDate === "object" && data.establishDate) {
        data.establishDate = Format(data.establishDate, "yyyy-MM-dd");
      }
      data.supplierId = this.supplierId;
      enterpriseData
        .saveBasicData(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    saveBorrowInfo() {
      //尽调信息-基本情况修改
      this.$message.success("操作成功！");
    },
    getQueryAccountLicense() {
      //尽调信息-开户许可证详情------------查询
      enterpriseData
        .accountLicense(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.accountLicenseData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveAccountLicense() {
      //尽调信息-开户许可证修改
      let data = baseUtil.copy(this.accountLicenseData);
      data.supplierId = this.supplierId;
      enterpriseData
        .saveAccountLicense(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryExtendInfo() {
      //尽调信息-资料明细-企业基本信息_扩展信息(发展, 背景, 往来)查询------------查询
      enterpriseData
        .extendInfo(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.extendInfoData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveExtendInfo() {
      //尽调信息-资料明细-企业基本信息_扩展信息保存
      let data = baseUtil.copy(this.extendInfoData);
      data.supplierId = this.supplierId;
      enterpriseData
        .saveExtendInfo(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryCompanyManage() {
      //资料明细-公司管理情况-公司管理情况查询------------查询
      enterpriseData
        .companyManage(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.companyManageData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveCompanyManage() {
      //资料明细-公司管理情况-公司管理情况查询------保存
      let data = baseUtil.copy(this.companyManageData);
      data.supplierId = this.supplierId;
      enterpriseData
        .updateCompanyManage(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryMarketInfo() {
      //资料明细-主营业务及市场查询------------查询
      enterpriseData
        .marketInfo(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.marketInfoData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveMarketInfo() {
      //资料明细-主营业务及市场保存------保存
      let data = baseUtil.copy(this.marketInfoData);
      data.supplierId = this.supplierId;
      enterpriseData
        .saveMarketInfo(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryBorrowInfo() {
      //资料明细-借款信息-借款信息查询------------查询
      enterpriseData
        .borrowInfo(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.borrowInfoData = res.data.data;
            this.borrowInfoData.val = "1";
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    queryIntoUpdownstream() {
      //-上下游数据-进入上下游页面---查询
      enterpriseData
        .intoUpdownstream(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.merchantCode = res.data.data.merchantCode;
            this.titanUpdownstreamData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    queryStreamData() {
      //失去焦点查询
      if (!this.merchantCode) {
        return;
      }
      enterpriseData
        .queryTitanUpdownstream(this.merchantCode)
        .then(res => {
          if (res.data.code === "200") {
            this.titanUpdownstreamData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveQueryTitanUpdownstream() {
      //资料明细-上下游数据查询按钮------保存
      if (!this.merchantCode) {
        return;
      }
      let data = {
        supplierId: this.supplierId,
        merchantCode: this.merchantCode
      };
      enterpriseData
        .saveUpdownstreamData(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryFileList() {
      //资料明细-影像列表-查询------------查询
      enterpriseData
        .fileList(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.supplyDataData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryReview() {
      enterpriseData.getQueryReview(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.queryReviewData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    getComboboxBankList() {
      comboboxBankList().then(res => {
        if (res.data.code === "200") {
          this.comboboxBankList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 获取银行列表
    getQueryCapitalEnterpriseList() {
      queryCapitalEnterprise().then(res => {
        if (res.data.code === "200") {
          this.queryCapitalEnterpriseList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 获取资金方列表
    getQuerySummary() {
      //      enterpriseData.headData(this.supplierId).then(res => {
      //        if (res.data.code === '200') {
      //          const data = res.data.data
      //          this.querySummaryData = data
      //          console.log(this.querySummaryData)
      //        } else {
      //          this.$message.error(res.data.message)
      //        }
      //      })
    }, // 顶部数据
    doApproveReject() {
      // 审核 打回
      if (this.approveRejectData.amendItems.length < 1) {
        this.$message.error("修改项至少选中一个");
        return;
      }
      if (!validContent(this.approveRejectData.amendRemark)) {
        this.$message.error("备注不能为空");
        return;
      }
      this.handleInspectionRelate(false);
    }, // 审核 打回时
    doPass() {
      let tip = "";
      let type = "";
      if (this.registerStage === "BASIC") {
        if (this.registerStatus === "REAPPROVING") {
          // 基础资料 待审核通过时
          tip = "通过审核后将进入尽调阶段。";
          type = "reApproveBasic";
        }
      }
      //      if (this.registerStage === 'TRADE') {
      //        if (this.registerStatus === 'REAPPROVING') { // 贸易资料 待审核通过时
      //          tip = '通过审核后将进入人工预沟通阶段。'
      //          type = 'reApproveTrade'
      //        }
      //      } else if (this.registerStage === 'KNOW') { // 预沟通
      //        tip = '通过审核后将进入尽调阶段。'
      //        type = 'approveKnow'
      //      } else
      else if (
        this.registerStage === "VERIFY" &&
        this.registerStatus === "APPROVING"
      ) {
        // 尽调 待初审
        tip = "通过审核后将进入尽调复审阶段。";
        type = "approveVerify";
      }
      if (
        this.registerStage === "VERIFY" &&
        this.registerStatus === "REAPPROVING"
      ) {
        // 尽调 待复审
        tip = "通过审核后将进入授信签署阶段。";
        type = "reapproveVerify";
      }
      if (
        this.registerStage === "SIGN" &&
        this.registerStatus === "APPROVING"
      ) {
        // 授信 待初审
        tip = "通过审核后将进入授信复审阶段。";
        type = "approveSign";
      }
      if (
        this.registerStage === "SIGN" &&
        this.registerStatus === "REAPPROVING"
      ) {
        // 授信 复审
        tip = "通过审核后将进入待资方审核阶段。";
        type = "approvefinal";
      }
      this.$confirm(
        `<p style="font-size: 13px;padding: 10px;text-align: center">确认通过审核?</p><p style="text-align: center">${tip}</p>`,
        "确认通过审核",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          this.handlePass(type);
        })
        .catch(() => {});
    }, // 复审 通过时  （ 基础资料和贸易资料的复审 预沟通和尽调初审时 ）
    handlePass(type) {
      let data;
      if (type === "approvefinal") {
        data = {
          supplierId: this.supplierId,
          rejectRemark: "",
          pass: true
        };
      } else {
        data = this.supplierId;
      }
      enterpriseData[type](data).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
          this.getQueryReview(); //刷新风控
          if (type == "approveVerify") {
            //通过尽调资料成功更新企业账号。合同编码
            this.getQuerySignData();
            this.getQueryGrade(); //授信签署-评级-查询评级
          }
          if (type == "reApproveTrade") {
            //通过贸易资料更新平台商户编码
            this.getQueryVerifyData();
          }
          this.getQuerySummary();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 复审 通过时提交
    doInspectionRelateShow(type, bool) {
      //
      let api = "";
      if (type === "basicDataAudit") {
        api = "queryBasicInspection";
        this.inspectionRelateData.title = "基础资料审核";
        this.getRemitView();
      } else if (type === "verifyDataAudit") {
        api = "queryVerifyInspection";
        this.inspectionRelateData.title = "尽调资料审核";
      } else if (type === "signDataAudit") {
        api = "querySignInspection";
        this.inspectionRelateData.title = "授信签署审核";
      } else if (type === "TRADE") {
        api = "queryTradeInspection";
        this.inspectionRelateData.title = "贸易资料审核";
      } else if (type === "cooperationAgreement") {
        api = "contractStatus";
        this.inspectionRelateData.title = "在线签署协议";
      } else {
        return false;
      }
      this.inspectionBtnShow = bool;
      this.inspectionStage = type;
      this.approveRejectData.amendItems = [];
      this.approveRejectData.amendRemark = "";
      enterpriseData[api](this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.inspectionRelateData.inspectionArray = res.data.data;
          this.inspectionDialogShow = true;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 审核 获取审核项等
    doCentreListShow() {
      enterpriseData.centreList(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.centreList = res.data.data;
          this.centreListDialogShow = true;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, //查看核心企业列表   风控
    saveCentreList() {
      let data = {
        supplierId: "",
        centreIds: ""
      };
      if (this.centreCheckList.length === 0) {
        this.$message.error("请勾选至少一个核心企业");
        return;
      }
      data.supplierId = this.supplierId;
      data.centreIds = this.centreCheckList.join();
      enterpriseData.addCentre(data).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
          this.centreListDialogShow = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, //保存核心企业列表   风控
    messagePush(type, guarantorId) {
      //发送消息推送
      let _id = "";
      if (guarantorId) {
        _id = guarantorId;
      } else {
        _id = this.supplierId;
      }
      enterpriseData[type](_id).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    createFactorContract() {
      //生成保理合同
      enterpriseData.createFactorContract(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
          this.doInspectionRelateShow("cooperationAgreement");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    createGuaranteeContract(guarantorId) {
      //生成保证合同
      enterpriseData.createGuaranteeContract(guarantorId).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
          this.doInspectionRelateShow("cooperationAgreement");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    doInspectionRelate(type) {
      let isValid = true;
      const length = this.inspectionRelateData.inspectionArray.length;
      if (this.registerStage === "BASIC") {
        for (let i = 0; i < length; i++) {
          const subLength = this.inspectionRelateData.inspectionArray[i].items
            .length;
          for (let j = 0; j < subLength; j++) {
            if (
              this.inspectionRelateData.inspectionArray[i].items[j].result ===
                -1 &&
              this.inspectionRelateData.inspectionArray[i].group !== "cert"
            ) {
              isValid = false;
              break;
            }
          }
          if (!isValid) {
            break;
          }
        }
      } else if (
        this.registerStage === "VERIFY" ||
        this.registerStage === "SIGN"
      ) {
        for (let i = 0; i < length; i++) {
          if (this.inspectionRelateData.inspectionArray[i].result === -1) {
            isValid = false;
            break;
          }
        }
      }

      if (isValid) {
        if (type) {
          //          let tip = ''
          //          if (this.registerStage === 'BASIC') {
          //            tip = '通过审核后将获取该企业相关征信数据。'
          //          } else if (this.registerStage === 'TRADE') {
          //            tip = '通过审核后将获取该企业相关贸易数据。'
          //          }
          this.$confirm(
            `<p style="font-size: 13px;padding: 10px;text-align: center">确认通过审核?</p>`,
            "确认通过审核",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              dangerouslyUseHTMLString: true
            }
          )
            .then(() => {
              this.handleInspectionRelate(type);
            })
            .catch(() => {});
        } else {
          this.approveRejectDialogShow = true;
        }
      } else {
        this.$message.error("审核项不能为空");
      }
    }, // 初审 基础信息和贸易资料
    handleInspectionRelate(type) {
      // 提交 审核相关
      let data = {
        pass: type,
        supplierId: this.supplierId,
        inspections: {}
      };
      let api = "";
      if (type) {
        data.amendItems = "";
        data.amendRemark = "";
      } else {
        data.amendItems = this.approveRejectData.amendItems.join(",");
        data.amendRemark = this.approveRejectData.amendRemark.trim();
        data.remark = this.approveRejectData.amendRemark.trim();
      }
      this.inspectionRelateData.inspectionArray.forEach((item, index) => {
        if (this.registerStage === "BASIC") {
          data.inspections[item.group] = {};
          item.items.forEach((subItem, subIndex) => {
            if (subItem === "verifyCorporateThreeElements") {
              data.inspections[item.group][subItem.item] = subItem.result;
            }
            data.inspections[item.group][subItem.item] = subItem.result;
          });
        } else if (
          this.registerStage === "VERIFY" ||
          this.registerStage === "SIGN"
        ) {
          data.inspections[item.item] = item.result;
        }
      });
      data.inspections = JSON.stringify(data.inspections);
      if (this.registerStage === "BASIC") {
        api = "approveBasic";
      } else if (this.registerStage === "VERIFY" && type) {
        //尽调通过
        api = "approveVerify";
      } else if (this.registerStage === "VERIFY" && !type) {
        //尽调打回
        api = "amendingVerify";
      } else if (this.registerStage === "SIGN" && type) {
        //授信通过
        api = "approveSign";
      } else if (this.registerStage === "SIGN" && !type) {
        //授信打回
        api = "amendingSign";
      }
      enterpriseData[api](data).then(res => {
        if (res.data.code === "200") {
          if (type == "VERIFY") {
            this.getQueryVerifyData();
          }
          this.$message.success(res.data.message);
          this.inspectionDialogShow = false;
          this.approveRejectDialogShow = false;
          this.getQuerySummary();
          this.getQueryReview();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 提交初审核 打回和通过
    subFirstTrial() {
      //提交初审
      this.$confirm(`确认提交初审吗？`, "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //          enterpriseData.supplySubmitCheck(this.).then(res => {
          //		          if (res.data.code === '200') {
          //		            this.$message.success(res.data.message)
          //		            this.rejectDialogShow = false
          //		            this.getQuerySummary ();//头部信息
          //		          } else {
          //		            this.$message.error(res.data.message)
          //		          }
          //		        }).catch(() => {})
          enterpriseData
            .supplySubmitCheck(this.supplierId)
            .then(res => {
              if (res.data.code === "200") {
                this.$message.success(res.data.message);
                this.rejectDialogShow = false;
                this.getQuerySummary(); //头部信息
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    doReject() {
      //点击拒绝
      this.remark = "";
      this.rejectDialogShow = true;
    },
    approveFinal() {
      //拒绝提交
      let data = {
        supplierId: this.supplierId,
        remark: ""
      };
      if (!validContent(this.remark)) {
        this.$message.error("拒绝原因不能为空");
        return;
      }
      data.remark = this.remark.trim();
      enterpriseData
        .reject(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
            this.rejectDialogShow = false;
            this.getQuerySummary(); //头部信息
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    }, // 入驻成功、入驻失败 提交
    doApproveFinal(type) {
      if (type) {
        this.$confirm(`确认通过吗？`, "确认通过并提交资方", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.approveFinal(type);
          })
          .catch(() => {});
      } else {
        this.rejectRemark = "";
        this.rejectDialogShow = true;
      }
    }, // 入驻成功、入驻失败
    getQueryBasicData() {
      enterpriseData.queryBasic(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.queryBasicData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 基本信息
    //    getQueryTradeData () {
    //      enterpriseData.queryTrade(this.supplierId).then(res => {
    //        if (res.data.code === '200') {
    //          this.queryTradeData = res.data.data
    //        } else {
    //          this.$message.error(res.data.message)
    //        }
    //      })
    //    }, // 贸易资料
    //    getQueryKnowData() {
    //    		enterpriseData.queryKnow(this.supplierId).then(res => {
    //    					if(res.data.code ==='200') {
    //          this.queryKnowData = res.data.data
    //        } else {
    //          this.$message.error(res.data.message)
    //        }
    //      })
    //    }, // 查询预沟通
    handleUpdateKnow() {
      this.queryKnowData.credit = this.queryKnowData.credit
        ? this.queryKnowData.credit.trim()
        : "";
      this.queryKnowData.trade = this.queryKnowData.trade
        ? this.queryKnowData.trade.trim()
        : "";
      if (
        !validContent(this.queryKnowData.credit) ||
        !validContent(this.queryKnowData.trade)
      ) {
        this.$message.error("贸易答疑和征信答疑都不能为空");
        return false;
      }
      let data = {
        supplierId: this.supplierId,
        credit: this.queryKnowData.credit,
        trade: this.queryKnowData.trade
      };
      enterpriseData.updateKnow(data).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
          this.getQueryKnowData();
          this.getQuerySummary();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 修改预沟通 提交
    addScmAccountDay(i) {
      if (this.queryVerifyData.centres[i].scmAccountDay.length < 2) {
        this.queryVerifyData.centres[i].scmAccountDay.push({
          scmAccountDay: "", //账期日
          scmReturnDay: "" //回款日
        });
      } else {
        this.$message.error("2条够啦！");
      }
    }, //添加尽调的账期
    deleteScmAccountDay(i, scmi) {
      this.queryVerifyData.centres[i].scmAccountDay.splice(scmi, 1);
    }, //删除尽调的账期
    //新尽调
    changeVerifyFirmInfo(val) {
      //展开企业信息
      if (val.length === 0) {
        return;
      }
      this.getQueryCustomType(); //尽调信息-客户类型查询------------查询
      this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
      this.getLocationTypeList(); //经营地下拉
      this.getQueryEquity(); //尽调信息-股权变动列表查询
      this.getQueryOffice(); //尽调信息-经营场所列表查询
      this.getLevelInfoSeletList(); //获取下拉列表-严重程度
      //			  this.getCapitalTypeSeletList();//获取资料明细_企业基本信息_股东名单_类型下拉
      //			  this.getChangeTypeTypeSeletList();//获取资料明细_企业基本信息_股东变更_变更事项下拉
    },
    changeVerifyFirmMember(val) {
      //展开企业成员名单
      if (val.length === 1) {
        return;
      }
      this.getQueryManager(); //尽调信息-成员名单列表查询
      this.getMemberTypeSeletList(); //获取下拉列表-企业成员类型
      this.getCertificateTypeSeletList(); //获取下拉列表-证件类型
      this.getIdentityTypeSeletList(); //获取下拉列表-证件类型
    },
    changeVerifyAssetInfo(val) {
      //展开财产信息
      if (val.length === 1) {
        return;
      }
      this.getQueryManager(); //尽调信息-财产信息
      this.getAssetSubCarTypeList(); //获取下拉列表-资产子类型-车
      this.getAssetSubHouseTypeList(); //获取下拉列表-资产子类型-房
    },
    changeVerifyFirmCredit(val) {
      //展开企业征信记录
      if (val.length === 1) {
        return;
      }
      this.getQueryCredit(); //尽调信息-征信记录列表查询
    },

    changeVerifyAffiliatedCompany(val) {
      //展开关联公司状态
      if (val.length === 1) {
        return;
      }
      this.getQueryAffiliatedCompany(); // 资料明细-关联公司状态-关联公司状态------查询
      this.getAffiliateTypeList(); //获取下拉列表-与借款企业关系
    },
    changeVerifyFirmAccessory(val) {
      //展开企业附件
      if (val.length === 1) {
        return;
      }
      this.getQueryPaper(); //尽调信息-企业附件列表查询
      this.getCertificateTypeSeletList(); //获取下拉列表-证件类型
    },
    changeVerifyFirmFinancialTride(val) {
      //展开财务及贸易统计
      if (val.length === 1) {
        return;
      }
      this.getQueryEnterpriseTrade(); //尽调信息-财务及贸易统计-查询
      this.getStreamVolumesStatusList(); //尽调信息-财务及贸易统计交易数据可验证程度列表数据 -------获取下拉列表数据
    },
    changeVerifyFirmOther(val) {
      //展开其他信息
      if (val.length === 1) {
        return;
      }
      this.getQueryEnterpriseFinance(); //其他信息-查询
      this.getQueryEnterpriseOpinion(); //其他信息-互联网信息审核查询
      this.getQueryEnterpriseGuarantor(); //其他信息-担保人查询
    },
    changeVerifyFirmBondsman(val) {
      //展开担保人
      if (val.length === 1) {
        return;
      }
      this.getQueryEnterpriseGuarantor(); //其他信息-担保人查询
    },
    changeVerifyFirmPlatform(val) {
      //展开公司管理情况查询
      if (val.length === 1) {
        return;
      }
      this.getQueryCompanyManage(); //资料明细-公司管理情况-公司管理情况查询------------查询
    },
    getQueryVerifyData() {
      // 查询尽调
      this.getQueryEnterpriseInfo(); //尽调信息-企业信息详情查询
      this.getQueryEquity(); //尽调信息-股权变动列表查询
      this.getQueryOffice(); //尽调信息-经营场所列表查询
      this.getLevelInfoSeletList(); //获取下拉列表-严重程度
    },
    getAgentInfoSeletList() {
      //获取下拉列表-分销商下拉信息查询
      enterpriseData
        .agentInfo(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.agentInfoSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getLocationTypeList() {
      //获取下拉列表-企业基本信息_经营地下拉
      enterpriseData
        .locationType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.locationTypeList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getMemberTypeSeletList() {
      //获取下拉列表-分销商下拉信息查询
      enterpriseData
        .memberType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.memberTypeSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getAssetSubHouseTypeList() {
      //获取下拉列表-资产子类型-房
      enterpriseData
        .assetSubHouseType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.assetSubHouseTypeList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getAssetSubCarTypeList() {
      //获取下拉列表-资产子类型-车
      enterpriseData
        .assetSubCarType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.assetSubCarTypeList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getAffiliateTypeList() {
      //获取下拉列表-与借款企业关系
      enterpriseData
        .affiliateType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.affiliateTypeList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getLevelInfoSeletList() {
      //获取下拉列表-分销商下拉信息查询
      enterpriseData
        .levelInfo(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.levelInfoSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getBankListSeletList() {
      //获取下拉列表-分销商下拉信息查询
      enterpriseData
        .bankList(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.bankListSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getCertificateTypeSeletList() {
      //获取下拉列表-证件类型下拉信息查询
      enterpriseData
        .certificateType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.certificateTypeSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getIdentityTypeSeletList() {
      //获取下拉列表-身份证件类型
      verifyDetail
        .identityType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.identityTypeSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getCapitalTypeSeletList() {
      //获取资料明细_企业基本信息_股东名单_类型下拉
      enterpriseData
        .capitalType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.capitalTypeSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getChangeTypeTypeSeletList() {
      //获取资料明细_企业基本信息_股东变更_变更事项下拉
      enterpriseData
        .changeType(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.changeTypeSeletList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryEquity() {
      //尽调信息-股东名单列表------------查询
      enterpriseData
        .shareHolding(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.shareholderYears = res.data.data.shareholderYears;
            if (res.data.data.list.length === 0) {
              this.queryEquityData = [];
              this.queryEquityData.push({
                name: "",
                type: "",
                amount: "",
                shareHolding: ""
              });
            } else {
              this.queryEquityData = res.data.data.list;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    deleteEquity(index) {
      //尽调信息-股东名单------------删除
      this.queryEquityData.splice(index, 1);
    },
    plusEquity() {
      //尽调信息-股东名单------------添加
      this.queryEquityData.push({
        name: "",
        type: "",
        amount: "",
        shareHolding: ""
      });
    },
    saveEquity() {
      //尽调信息-股东名单------------保存
      let info = baseUtil.copy(this.queryEquityData);
      let data = {
        supplierId: this.supplierId,
        info: JSON.stringify(info)
      };
      enterpriseData
        .saveShareHolding(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryOffice() {
      //尽调信息-股东变更信息列表查询------------查询
      enterpriseData
        .enterpriseChange(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (
              res.data.data.length === 0 &&
              this.queryOfficeData.length === 0
            ) {
              this.queryOfficeData.push({
                type: "",
                before: "",
                after: "",
                changeDate: ""
              });
            } else {
              this.queryOfficeData = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    deleteOffice(index) {
      //尽调信息-股东变更信息列表查询------------删除
      this.queryOfficeData.splice(index, 1);
    },
    plusOffice() {
      //尽调信息-股东变更信息列表查询------------添加
      this.queryOfficeData.push({
        type: "",
        before: "",
        after: "",
        changeDate: ""
      });
    },
    doMoreCertificate(index) {
      // 尽调股东变更信息新增凭证
      this.queryOfficeData[index].imageData.push({ key: "", url: "" });
    },
    saveOffice() {
      //尽调信息-股东变更信息列表查询------------保存
      let info = baseUtil.copy(this.queryOfficeData);
      for (let i = 0; i < info.length; i++) {
        if (typeof info[i].changeDate === "object" && info[i].changeDate) {
          info[i].changeDate = Format(info[i].changeDate, "yyyy-MM-dd");
        }
      }
      let data = {
        supplierId: this.supplierId,
        info: JSON.stringify(info)
      };
      enterpriseData
        .saveEnterpriseChange(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    getQueryAffiliatedCompany() {
      // 资料明细-关联公司状态-关联公司状态------查询
      enterpriseData
        .affiliatedCompany(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data.length === 0) {
              this.affiliatedCompanyData = [];
              this.affiliatedCompanyData.push({
                affiliateType: "",
                affiliateTypeText: "",
                enterpriseName: "",
                enterpriseController: "",
                mainBusiness: ""
              });
            } else {
              this.affiliatedCompanyData = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    deleteAffiliatedCompany(index) {
      //资料明细-关联公司状态-关联公司状态------------删除
      this.affiliatedCompanyData.splice(index, 1);
    },
    plusAffiliatedCompany() {
      //资料明细-关联公司状态-关联公司状态------------添加
      this.affiliatedCompanyData.push({
        affiliateType: "",
        affiliateTypeText: "",
        enterpriseName: "",
        enterpriseController: "",
        mainBusiness: ""
      });
    },
    saveAffiliatedCompany() {
      //资料明细-公司管理情况-公司管理情况查询--------保存
      let info = baseUtil.copy(this.affiliatedCompanyData);
      for (let i = 0; i < info.length; i++) {
        if (typeof info[i].changeDate === "object" && info[i].changeDate) {
          info[i].changeDate = Format(info[i].changeDate, "yyyy-MM-dd");
        }
      }
      let data = {
        supplierId: this.supplierId,
        companyData: JSON.stringify(info)
      };
      enterpriseData
        .updateAffiliatedCompany(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryManager() {
      //尽调信息-资料明细-财产信息-财产信息查询------------查询
      enterpriseData
        .assetInfo(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.queryHouseInfoData = res.data.data.houseInfo;
            if (res.data.data.houseInfo.length === 0) {
              this.queryHouseInfoData = [];
              this.queryHouseInfoData.push({
                id: "",
                assetSubType: "",
                assetSubTypeText: "",
                estimatedValue: "",
                paymentMonthly: "",
                assetName: ""
              });
            } else if (res.data.data.houseInfo.length !== 0) {
              this.queryHouseInfoData = res.data.data.houseInfo;
            }
            if (res.data.data.carInfo.length === 0) {
              this.queryCarInfoData = [];
              this.queryCarInfoData.push({
                id: "",
                assetSubType: "",
                assetSubTypeText: "",
                estimatedValue: "",
                paymentMonthly: "",
                assetName: ""
              });
            } else if (res.data.data.houseInfo.length !== 0) {
              this.queryCarInfoData = res.data.data.carInfo;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    deleteHouseInfo(index) {
      //尽调信息-房产数据-----------删除
      this.queryHouseInfoData.splice(index, 1);
    },
    deleteCarInfo(index) {
      //尽调信息-车辆数据-----------删除
      this.queryCarInfoData.splice(index, 1);
    },
    plusHouseInfo() {
      //尽调信息-房产数据------------添加
      this.queryHouseInfoData.push({
        id: "",
        assetSubType: "",
        assetSubTypeText: "",
        estimatedValue: "",
        paymentMonthly: "",
        assetName: ""
      });
    },
    plusCarInfo() {
      //尽调信息-车辆数据------------添加
      this.queryCarInfoData.push({
        id: "",
        assetSubType: "",
        assetSubTypeText: "",
        estimatedValue: "",
        paymentMonthly: "",
        assetName: ""
      });
    },
    saveManager() {
      //尽调信息-资料明细-财产信息-------------保存
      let houseInfo = baseUtil.copy(this.queryHouseInfoData);
      let carInfo = baseUtil.copy(this.queryCarInfoData);
      let assetData = {
        houseInfo: houseInfo,
        carInfo: carInfo
      };
      let data = {
        supplierId: this.supplierId,
        assetData: JSON.stringify(assetData)
      };
      enterpriseData
        .updateAsset(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryCredit() {
      //尽调信息-征信记录列表查询------------查询
      enterpriseData
        .queryCredit(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data.length === 0) {
              this.queryCreditData = [];
              this.queryCreditData.push({
                type: "",
                typeText: "",
                versionType: "",
                versionTypeList: "",
                versionTypeText: "",
                belongName: "",
                queryDate: "",
                abnormalCount: "",
                queryTimes: "",
                desc: ""
              });
            } else if (res.data.data.length !== 0) {
              this.queryCreditData = res.data.data;
              for (let i = 0; i < this.queryCreditData.length; i++) {
                this.queryCreditData[i].versionTypeList;
              }
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    creditTypeChange(index, val) {
      //征信记录 下拉类型改变
      let data = {
        supplierId: this.supplierId,
        type: val
      };
      enterpriseData
        .creditBelong(data)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data.length !== 0) {
              this.queryCreditData[index].versionTypeList = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    deleteCredit(index) {
      //尽调信息-征信记录列表查询------------删除
      this.queryCreditData.splice(index, 1);
    },
    plusCredit() {
      //尽调信息-征信记录列表查询------------添加
      this.queryCreditData.push({
        type: "",
        typeText: "",
        versionType: "",
        versionTypeList: "",
        versionTypeText: "",
        belongName: "",
        queryDate: "",
        abnormalCount: "",
        queryTimes: "",
        desc: ""
      });
    },
    saveCredit() {
      //尽调信息-征信记录列表查询------------保存
      let info = baseUtil.copy(this.queryCreditData);
      for (let i = 0; i < info.length; i++) {}
      let data = {
        supplierId: this.supplierId,
        info: JSON.stringify(info)
      };
      enterpriseData
        .saveCredit(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryPaper() {
      //尽调信息-企业附件列表查询------------查询
      enterpriseData
        .queryPaper(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data.length === 0) {
              this.queryPaperData = [];
              this.queryPaperData.push({
                type: "",
                typeText: "",
                num: "",
                startDate: "",
                endDate: "",
                status: "",
                approvalStatus: "",
                approvalStatusText: "",
                uploadDate: "",
                files: []
              });
            } else {
              this.queryPaperData = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    certificateTypeChange(index, val) {
      //企业附件 下拉证件类型改变
      let data = {
        supplierId: this.supplierId,
        type: val
      };
      verifyDetail
        .queryPaperByType(data)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data.length !== 0) {
              if (res.data.data.files.length !== 0) {
                this.queryPaperData[index].files = res.data.data.files;
              }
              if (res.data.data.num !== 0) {
                this.queryPaperData[index].num = res.data.data.num;
              }
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    deletePaper(index) {
      //尽调信息-企业附件列表查询------------删除
      this.queryPaperData.splice(index, 1);
    },
    plusPaper() {
      //尽调信息-企业附件列表查询------------添加
      this.queryPaperData.push({
        type: "",
        typeText: "",
        num: "",
        startDate: "",
        endDate: "",
        status: "",
        approvalStatus: "",
        approvalStatusText: "",
        uploadDate: "",
        files: []
      });
    },
    doMoreIdPhoto(index) {
      // 尽调企业附件新增证件照片
      this.queryPaperData[index].files.push({ key: "", url: "" });
    },
    savePaper() {
      //尽调信息-企业附件列表查询------------保存
      let info = baseUtil.copy(this.queryPaperData);
      for (let i = 0; i < info.length; i++) {
        if (typeof info[i].startDate === "object" && info[i].startDate) {
          info[i].startDate = Format(info[i].startDate, "yyyy-MM-dd");
        }
        if (typeof info[i].endDate === "object" && info[i].endDate) {
          info[i].endDate = Format(info[i].endDate, "yyyy-MM-dd");
        }
        if (!info[i].num) {
          this.$message.error("证件号码不能为空");
          return;
        }
        if (!info[i].startDate) {
          this.$message.error("起始日期不能为空");
          return;
        }
        if (!info[i].endDate) {
          this.$message.error("	失效日期不能为空");
          return;
        }
      }
      let data = {
        supplierId: this.supplierId,
        info: JSON.stringify(info)
      };
      enterpriseData
        .savePaper(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getQueryPaper(); //尽调信息-企业附件列表查询
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryEnterpriseTrade() {
      //尽调信息-财务及贸易统计-查询------------查询
      verifyDetail
        .queryEnterpriseTrade(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.queryEnterpriseTradeData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getStreamVolumesStatusList() {
      //尽调信息-财务及贸易统计交易数据可验证程度列表数据 ------下拉列表数据
      verifyDetail
        .streamVolumesStatus(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.streamVolumesStatusList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveEnterpriseTrade() {
      //尽调信息-企业附件列表查询------------保存
      let data = baseUtil.copy(this.queryEnterpriseTradeData);
      data.upstreamVolumes = JSON.stringify(data.upstreamVolumes);
      data.downstreamVolumes = JSON.stringify(data.downstreamVolumes);
      data.supplierId = this.supplierId;
      verifyDetail
        .updateEnterpriseTrade(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getQueryEnterpriseTrade(); //尽调信息-财务及贸易统计-查询------------查询
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryEnterpriseFinance() {
      //尽调信息-其他信息-查询-查询------------查询
      verifyDetail
        .queryEnterpriseFinance(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.queryEnterpriseFinanceData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveEnterpriseFinance() {
      //尽调信息-其他信息------------保存
      let data = baseUtil.copy(this.queryEnterpriseFinanceData);
      data.supplierId = this.supplierId;
      verifyDetail
        .saveEnterpriseFinance(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getQueryEnterpriseFinance(); //尽调信息-财务及贸易统计-查询------------查询
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    getQueryEnterpriseOpinion() {
      //尽调信息-其他信息-互联网信息审核查询------------查询
      verifyDetail
        .queryEnterpriseOpinion(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (
              res.data.data.length === 0 &&
              this.queryEnterpriseOpinionData.length === 0
            ) {
              this.queryEnterpriseOpinionData.push({
                opinionDate: "",
                opinionDescription: "",
                severityType: ""
              });
            } else {
              this.queryEnterpriseOpinionData = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    deleteEnterpriseOpinion(index) {
      //尽调信息-其他信息-互联网信息审核------------删除
      this.queryEnterpriseOpinionData.splice(index, 1);
    },
    plusEnterpriseOpinion() {
      //尽调信息-其他信息-互联网信息审核------------添加
      this.queryEnterpriseOpinionData.push({
        opinionDate: "",
        opinionDescription: "",
        severityType: ""
      });
    },
    saveEnterpriseOpinion() {
      //尽调信息-其他信息-互联网信息审核------------保存
      let opinionData = baseUtil.copy(this.queryEnterpriseOpinionData);
      for (let i = 0; i < opinionData.length; i++) {
        if (!opinionData[i].opinionDate) {
          this.$message.error("日期不能为空");
          return;
        }
        if (!opinionData[i].opinionDescription) {
          this.$message.error("描述不能为空");
          return;
        }
        if (!opinionData[i].severityType) {
          this.$message.error("	程度不能为空");
          return;
        }
        if (
          typeof opinionData[i].opinionDate === "object" &&
          opinionData[i].opinionDate
        ) {
          opinionData[i].opinionDate = Format(
            opinionData[i].opinionDate,
            "yyyy-MM-dd"
          );
        }
      }
      let data = {
        supplierId: this.supplierId,
        opinionData: JSON.stringify(opinionData)
      };
      verifyDetail
        .saveEnterpriseOpinion(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryEnterpriseGuarantor() {
      //尽调信息--法人信息-查询------------查询
      enterpriseData
        .queryEnterpriseGuarantor(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.queryEnterpriseGuarantorData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveEnterpriseGuarantor() {
      //尽调信息--法人信息-保存------------保存
      let data = baseUtil.copy(this.queryEnterpriseGuarantorData);

      //				if(data.guaranteeValueFile){
      //					let _arr = []
      //					for (let i =0;i<data.guaranteeValueFile.length;i++) {
      //						_arr.push(data.guaranteeValueFile[i].key)
      //					}
      //					data.guaranteeValueFile = _arr.join()
      //				}
      data.supplierId = this.supplierId;
      enterpriseData
        .saveEnterpriseGuarantor(data)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    SelectGuarantor(index) {
      //点击选择触发
      this.selectGuarantorIndex = index;
      enterpriseData
        .selectGuarantorList(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data.length === 0) {
              this.$alert("抱歉！暂时没有可选择的担保人！", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              return;
            }
            this.dialogSelectGuarantorForm = true;
            this.selectGuarantorListData = res.data.data;
            this.selectedGuarantor = res.data.data[0].guarantorId;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    saveSelectGuarantor() {
      //保存选择的担保人
      let guarantorId = this.selectedGuarantor;
      enterpriseData
        .createTestKey(guarantorId)
        .then(res => {
          if (res.data.code === "200") {
            this.queryEnterpriseGuarantorData.splice(
              this.selectGuarantorIndex,
              1,
              res.data.data
            );
            this.queryEnterpriseGuarantorData[
              this.selectGuarantorIndex
            ].disabled = true;
            this.dialogSelectGuarantorForm = false;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doMoreGuaranteeFile(index) {
      // 尽调企业 担保人新增附件
      this.queryEnterpriseGuarantorData[index].guaranteeValueFile.push({
        key: "",
        url: ""
      });
    },
    deleteEnterpriseGuarantor(guarantorId) {
      //尽调信息-担保人-删除------------删除
      //    	this.queryEnterpriseGuarantorData.splice(index,1)
      this.$confirm("此操作将删除该担保人, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseData
            .deleteEnterpriseGuarantor(guarantorId)
            .then(res => {
              if (res.data.code === "200") {
                this.getQueryEnterpriseGuarantor();
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    plusEnterpriseGuarantor() {
      //尽调信息-担保人------------新增
      this.queryEnterpriseGuarantorData.push({
        guarantorId: "",
        name: "",
        address: "",
        identityNo: "",
        mobile: "",
        email: "",
        identityFrontKey: "",
        identityFrontUrl: "",
        identityBackKey: "",
        identityBackUrl: "",
        guaranteeValue: "",
        guaranteeValueFile: []
      });
    },
    getQueryDistributor() {
      //尽调信息-平台信息-查询------------查询
      enterpriseData
        .queryDistributor(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (
              res.data.data.length === 0 &&
              this.queryDistributorData.length === 0
            ) {
              this.queryDistributorData.push({
                selectable: "able",
                centreId: "",
                name: "",
                username: "",
                password: "",
                companyName: "",
                businessLicense: "",
                contractName: "",
                contractNum: "",
                validDate: "",
                bankCode: "",
                bankBranch: "",
                bankAccountNum: "",
                files: [],
                supplierId: ""
              });
            } else {
              this.queryDistributorData = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    doMoreDistributorPhoto(index) {
      //新增合作合同
      this.queryDistributorData[index].files.push({ key: "", url: "" });
    },
    deleteDistributor(id) {
      //尽调信息-平台信息-删除------------删除
      let data = {
        supplierId: this.supplierId,
        centreId: id
      };
      enterpriseData
        .deleteDistributor(data)
        .then(res => {
          if (res.data.code === "200") {
            //        	this.queryDistributorData.splice(index,1)
            this.getQueryDistributor(); //尽调信息-平台信息-查询------------查询
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    plusDistributor() {
      //尽调信息-平台信息------------新增
      this.queryDistributorData.push({
        selectable: "able",
        centreId: "",
        name: "",
        username: "",
        password: "",
        companyName: "",
        businessLicense: "",
        contractName: "",
        contractNum: "",
        validDate: "",
        bankCode: "",
        bankBranch: "",
        bankAccountNum: "",
        files: [],
        supplierId: ""
      });
    },
    saveDistributor(item) {
      //尽调信息-平台信息-保存------------保存
      let data = baseUtil.copy(item);
      data.files = JSON.stringify(data.files);
      if (!data.centreId) {
        this.$message.error("分销商关联编码不能为空");
        return;
      }
      if (!data.name) {
        this.$message.error("分销商名称不能为空");
        return;
      }
      if (!data.companyName) {
        this.$message.error("合同签署企业名称不能为空");
        return;
      }
      if (!data.businessLicense) {
        this.$message.error("签署企业社会统一信用代码不能为空");
        return;
      }
      if (!data.bankCode) {
        this.$message.error("回款银行不能为空");
        return;
      }
      if (!data.bankBranch) {
        this.$message.error("回款银行网点不能为空");
        return;
      }
      if (!data.bankAccountNum) {
        this.$message.error("回款银行账号");
        return;
      }
      if (typeof data.validDate === "object" && data.validDate) {
        data.validDate = Format(data.validDate, "yyyy-MM-dd");
      }
      data.supplierId = this.supplierId;
      enterpriseData
        .operateDistributor(data)
        .then(res => {
          if (res.data.code === "200") {
            this.getQueryDistributor(); //尽调信息-平台信息-查询------------查询
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    submitCheck() {
      //尽调总提交
      verifyDetail
        .submitCheck(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
            this.getQuerySignData();
            this.getQueryGrade(); //授信签署-评级-查询评级
            this.getQuerySummary();
            this.getQueryReview();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    //新尽调end-----end
    getContractSignNameList(centreId) {
      enterpriseData
        .contractSignNameList(centreId)
        .then(res => {
          if (res.data.code === "200") {
            this.contractSignNameList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    }, //查询合同签署的企业名称列表
    handleUpdateVerify() {
      if (
        !this.queryVerifyData.creditEnterprise.abnormalCount &&
        this.queryVerifyData.creditEnterprise.abnormalCount != "0"
      ) {
        this.$message.error("企业人行征信异常项不能为空！");
        return;
      }
      if (
        !this.queryVerifyData.creditRepre.abnormalCount &&
        this.queryVerifyData.creditRepre.abnormalCount != "0"
      ) {
        this.$message.error("法定代表人人行征信异常项不能为空！");
        return;
      }
      if (
        !this.queryVerifyData.creditGuarantor.abnormalCount &&
        this.queryVerifyData.creditGuarantor.abnormalCount != "0"
      ) {
        this.$message.error("担保人行征信异常项不能为空！");
        return;
      }
      for (let i = 0; i < this.queryVerifyData.centres.length; i++) {
        if (!this.queryVerifyData.centres[i].contractSignName) {
          this.$message.error("合同签署企业名称不能为空！");
          return;
        }
        if (!this.queryVerifyData.centres[i].transactionContractName) {
          this.$message.error("基础交易合同名称不能为空！");
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
        for (
          let j = 0;
          j < this.queryVerifyData.centres[i].scmAccountDay.length;
          j++
        ) {
          if (!this.queryVerifyData.centres[i].scmAccountDay[j].scmAccountDay) {
            this.$message.error("账期日不能为空！");
            return;
          }
          if (!this.queryVerifyData.centres[i].scmAccountDay[j].scmReturnDay) {
            this.$message.error("回款日不能为空！");
            return;
          }
        }
        if (!this.queryVerifyData.centres[i].bankCode) {
          this.$message.error("回款银行不能为空！");
          return;
        }
        if (!this.queryVerifyData.centres[i].bankBranch) {
          this.$message.error("回款银行网点不能为空！");
          return;
        }
        if (!this.queryVerifyData.centres[i].bankAccountNo) {
          this.$message.error("回款银行账号不能为空！");
          return;
        }
      }
      let data = baseUtil.copy(this.queryVerifyData);
      let sendData = {};
      sendData.supplierId = this.supplierId;
      // 征信数据
      sendData.creditEnterprise = {
        abnormalCount: data.creditEnterprise.abnormalCount,
        abnormalDesc: data.creditEnterprise.abnormalDesc,
        fileName: data.creditEnterprise.fileName,
        fileKey: data.creditEnterprise.fileKey
      };
      sendData.creditEnterprise = JSON.stringify(sendData.creditEnterprise);
      sendData.creditRepre = {
        abnormalCount: data.creditRepre.abnormalCount,
        abnormalDesc: data.creditRepre.abnormalDesc,
        fileName: data.creditRepre.fileName,
        fileKey: data.creditRepre.fileKey
      };
      sendData.creditRepre = JSON.stringify(sendData.creditRepre);
      sendData.creditGuarantor = {
        abnormalCount: data.creditGuarantor.abnormalCount,
        abnormalDesc: data.creditGuarantor.abnormalDesc,
        fileName: data.creditGuarantor.fileName,
        fileKey: data.creditGuarantor.fileKey
      };
      sendData.creditGuarantor = JSON.stringify(sendData.creditGuarantor);
      for (let i = 0; i < data.centres.length; i++) {
        if (
          typeof data.centres[i].contractEndDate === "object" &&
          data.centres[i].contractEndDate
        ) {
          data.centres[i].contractEndDate = Format(
            data.centres[i].contractEndDate,
            "yyyy-MM-dd"
          );
        }
      }
      sendData.centres = JSON.stringify(data.centres);
      enterpriseData.updateVerify(sendData).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
          this.getQueryVerifyData();
          this.getQuerySummary();
          this.getQueryReview();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 修改尽调 提交
    getQuerySignData() {
      enterpriseData
        .querySign(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.querySignData = res.data.data;
            this.rate.monthRate = res.data.data.monthRate;
            this.rate.yearRate = res.data.data.yearRate;
            if (!this.querySignData.bankAccountNo) {
              this.querySignData.bankAccountNo = this.queryVerifyData.centres[0].bankAccountNo;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    }, // 查询签署
    changeRate(loanRate) {
      //获取年利率，月利率
      enterpriseData
        .calculatedInterest(loanRate)
        .then(res => {
          if (res.data.code === "200") {
            this.rate.monthRate = res.data.data.monthRate;
            this.rate.yearRate = res.data.data.yearRate;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getContractInfoData() {
      // 查询合同信息
      enterpriseData
        .contractList(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.contractInfoData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },
    getQueryGrade() {
      enterpriseData
        .queryGrade(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data) {
              this.queryGradeData = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    }, // 授信签署-评级-查询评级
    getQueryEvaluateGrade() {
      enterpriseData
        .evaluateGrade(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data) {
              this.queryGradeData = res.data.data;
              this.$message.success(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    }, // 授信签署-评级-重新评级
    getQueryGradeDetail() {
      enterpriseData
        .queryGradeDetail(this.supplierId)
        .then(res => {
          if (res.data.code === "200") {
            this.queryGradeDetailData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    }, //授信签署-评级-查询评级详情
    handleUpdateSign() {
      if (
        !this.querySignData.totalCreditLine &&
        this.querySignData.totalCreditLine !== 0
      ) {
        this.$message.error("总授信额度不能为空！");
        return;
      }
      if (!this.querySignData.creditLineExpireTime) {
        this.$message.error("融资额度的届满日不能为空！");
        return;
      }
      let data = baseUtil.copy(this.querySignData);
      data.supplierId = this.supplierId;
      if (typeof data.creditLineExpireTime == "object") {
        data.creditLineExpireTime = Format(
          data.creditLineExpireTime,
          "yyyy-MM-dd"
        );
      }
      data.creditAndIterestRate = JSON.stringify(data.creditAndIterestRates);
      enterpriseData.updateSign(data).then(res => {
        if (res.data.code === "200") {
          this.$message.success(res.data.message);
          this.getQuerySignData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 修改签署 提交
    doTradeRmSummary() {
      enterpriseData.queryTradeRmSummary(this.supplierId).then(res => {
        this.tradeRmSummaryData = [];
        this.tradeVendorCodeData = [];
        if (res.data.code === "200") {
          const data = res.data.data;
          if (baseUtil.isArray(data)) {
            this.tradeRmSummaryData = data;
            data.forEach((item, index) => {
              this.tradeVendorCodeData.push("");
            });
          }
          this.tradeRmSummaryShow = true;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 贸易资料风控 贸易统计详情
    doRefreshTrade() {
      enterpriseData.refreshTrade(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.doTradeRmSummary();
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 刷新贸易资料风控 贸易统计详情
    doScorecard() {
      enterpriseData.queryGradeDetail(this.supplierId).then(res => {
        if (res.data.code === "200") {
          this.queryGradeDetailData = res.data.data;
          this.adminSupplierRegisterQueryTardeRmSummaryResponse =
            res.data.data.adminSupplierRegisterQueryTardeRmSummaryResponse;
        } else {
          this.$message.error(res.data.message);
        }
      });
      this.scoreCardShow = true;
    }, //查询评分卡数据
    showPdf(type) {
      if (type == "entrepreneur_third_party") {
        //企业第三方
        this.$showPDF("./static/pdf/entrepreneur_third_party.pdf");
      }
      if (type == "entrepreneur_people_bank") {
        //企业人行
        enterpriseData.creditEnterprise(this.supplierId).then(res => {
          if (res.data.code === "200") {
            this.$showPDF(res.data.data.fileUrl);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
      if (type == "corporate_third_party") {
        //法人第三方
        this.$showPDF("./static/pdf/corporate_third_party.pdf");
      }
      if (type == "corporate_people_bank") {
        //法人人行
        enterpriseData.creditRepre(this.supplierId).then(res => {
          if (res.data.code === "200") {
            this.$showPDF(res.data.data.fileUrl);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
      if (type == "underwriter_third_party") {
        //担保人第三方
        this.$showPDF("./static/pdf/underwriter_third_party.pdf");
      }
      if (type == "underwriter_people_bank") {
        //担保人人行
        enterpriseData.creditGuarantor(this.supplierId).then(res => {
          if (res.data.code === "200") {
            this.$showPDF(res.data.data.fileUrl);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    doSaveApproveTrade(index) {
      let code = this.tradeVendorCodeData[index] + "";
      code = code.trim();
      if (code) {
        enterpriseData.saveApproveTrade(this.supplierId, code).then(res => {
          if (res.data.code === "200") {
            this.$message.success(res.data.message);
            this.tradeRmSummaryData = [];
            this.tradeVendorCodeData = [];
            const data = res.data.data;
            if (baseUtil.isArray(data)) {
              this.tradeRmSummaryData = data;
              data.forEach((item, index) => {
                this.tradeVendorCodeData.push("");
              });
              this.tradeVendorCodeData[index] = code;
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("平台商户编码不能为空");
      }
    }, // 保存贸易统计资料
    doVerifyRmSummary() {
      enterpriseData.queryVerifyRmSummary(this.supplierId).then(res => {
        this.verifyRmSummaryData = [];
        if (res.data.code === "200") {
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
          this.verifyRmSummaryShow = true;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 贸易资料风控 贸易数据匹配
    doVerifyRmDetail(type) {
      enterpriseData.queryVerifyRmDetail(this.supplierId, type).then(res => {
        this.verifyRmDetailData = {};
        if (res.data.code === "200") {
          const data = res.data.data;
          if (data) {
            this.verifyRmDetailData = data;
          }
          this.verifyRmDetailData.title =
            type === 1 ? "企业信用报告" : "法定代表人信用报告";
          this.verifyRmDetailShow = true;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }, // 尽调资料风控 信用报告详情
    downloadFile(url) {
      window.location.href = url;
    }, // 尽调资料风控 信用报告详情 下载 pdf
    refreshCentreAccount(centreId) {
      //刷新贸易资料交易平台编码
      let data = {
        centreId: centreId,
        supplierId: this.supplierId
      };
      enterpriseData.refreshCentreAccount(data).then(res => {
        if (res.data.code === "200") {
          //    			this.getQueryTradeData();//刷新贸易资料
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    deletCommunication(id) {
      this.$confirm("此操作将删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseData.deleteKnow(id).then(res => {
            if (res.data.code === "200") {
              this.getQueryKnow();
              this.$message({ type: "success", message: "删除成功!" });
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },

    //经营数据分析

    //企业贸易关联平台经营数据-查询
    getQueryVerifyEnterpriseSale() {
      enterpriseData.verifyEnterpriseSale(this.supplierId).then(res => {
        if (res.data.code == "200") {
          this.saleStatOthersList = res.data.data;
        }
      });
    },

    //经营数据分析--检查发票服务签约状态
    checkInvoiceSignStatus() {
      enterpriseData
        .checkInvoiceSignStatus(this.supplierId)
        .then(res => {
          if (res.data.code == "200") {
            if (res.data.data.data) {
              let requestData = {
                supplierId: this.supplierId,
                queryDate: res.data.data.data
              };
              this.relatedSuppliers(requestData);
              this.relatedClients(requestData);
              this.inputVatData(requestData);
              this.outputVatData(requestData);
              this.salesMetrics(requestData);
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
    },

    //    //经营数据分析--近一年前五大供应商
    relatedSuppliers(requestData) {
      enterpriseData.relatedSuppliers(requestData).then(res => {
        if (res.data.code == "200") {
          this.relatedSuppliersList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //经营数据分析-近一年前五大客户
    relatedClients(requestData) {
      enterpriseData.relatedClients(requestData).then(res => {
        if (res.data.code == "200") {
          this.relatedClientsList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //经营数据分析-进项发票数据统计
    inputVatData(requestData) {
      enterpriseData.inputVatData(requestData).then(res => {
        if (res.data.code == "200") {
          this.inputVatDataList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //经营数据分析-销项发票数据统计
    outputVatData(requestData) {
      enterpriseData.outputVatData(requestData).then(res => {
        if (res.data.code == "200") {
          this.outputVatDataList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //经营数据分析-营销指标
    salesMetrics(requestData) {
      enterpriseData.salesMetrics(requestData).then(res => {
        if (res.data.code == "200") {
          this.salesMetricsList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //经营数据分析-主要供应商情况列表
    getupDownSupplierList() {
      enterpriseData.upDownSupplierList(this.supplierId).then(res => {
      
        if (res.data.code == "200") {
          this.upDownSupplierList.up = res.data.data.up;
          this.upDownSupplierList.down = res.data.data.down;
        } else {
          this.$message.error(res.data.message);
        }
      });
	},



	
	
	  //银行流水分页
    getList() {
      if (this.startTimeMonth && this.endTimeMonth) {
        this.queryDetails();
      } else {
        this.getBankStatement();
      }
    },

	 //获取银行流水-首次加载
    getBankStatement() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let eDate = year.toString() + "-" + month.toString();

      let date1 = new Date();
      date1.setMonth(date1.getMonth() - 2);
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      month1 = month1 < 10 ? "0" + month1 : month1;
      let sDate = year1.toString() + "-" + month1.toString();
      let data = {
        supplierId: this.supplierId,
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        startTime: sDate,
        endTime: eDate
      };
      enterpriseData
        .bankStatement(data)
        .then(res => {
          if (res.data.code == "200") {
            this.bankStatementData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {});
	},
	
	  //银行流水核查 查询
    queryDetails() {
      if (this.startTimeMonth) {
        this.startTimeMonth = Format(this.startTimeMonth, "yyyy-MM");
      }
      if (this.endTimeMonth) {
        this.endTimeMonth = Format(this.endTimeMonth, "yyyy-MM");
      }
 
      if (
        this.startTimeMonth &&
        this.endTimeMonth
       ) {
        let data = {
          supplierId:this.supplierId,
          page: this.listQuery.page,
          limit: this.listQuery.limit,
          startTime: this.startTimeMonth,
          endTime: this.endTimeMonth
        };

        enterpriseData
          .bankStatement(data)
          .then(res => {
            if (res.data.code == "200") {
              this.bankStatementData = res.data.data.list;
              this.total = res.data.data.total;
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(() => {});
      }
    },

  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "enterpriseData.scss";
</style>

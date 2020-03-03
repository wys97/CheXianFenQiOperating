<template>
	<div>
		<!--一，授信性质及调查过程-->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	一、授信性质及调查过程
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="lh_title">本次授信调查过程</div>
			    	<div class="info-list">
			    		<el-form-item label="调查时间：">
			    			<span v-if="readOnly" class="input_read">{{controllerData.creditPropertyTime}}</span>
                <el-date-picker v-else class="must_input" v-model="controllerData.creditPropertyTime" align="right" type="date"placeholder="选择日期" style="width: 300px;">
                </el-date-picker>
              </el-form-item>
			    		<el-form-item label="调查地点：">
			    			<span v-if="readOnly" class="input_read">{{controllerData.creditPropertyPlace}}</span>
                <el-input v-else class="must_input" style="width: 300px;" v-model="controllerData.creditPropertyPlace"></el-input>
              </el-form-item>
			    		<el-form-item label="调查对象（多选）：">
			    			<el-checkbox-group v-model="checkList" :readonly=readOnly>
                  <el-checkbox :key="i" v-for="(key, i) in checkboxData" :label="i">{{key}}</el-checkbox>
							  </el-checkbox-group>
			    		</el-form-item>
              <el-form-item v-if="!readOnly" style="text-align: right;">
                <el-button type="primary" size="mini" @click="saveControllerData">保存</el-button>
              </el-form-item>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--二，申请人基本信息-->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	  二、申请人基本信息
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
			    		<el-form-item label="企业名称：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerEnterpriseName}}</span>
                <el-input v-else class="must_input"  style="width: 300px;" v-model="applierInfo.proposerEnterpriseName"></el-input>
              </el-form-item>
			    		<el-form-item label="所属行业：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerTrade}}</span>
                <el-input v-else class="must_input" style="width: 300px;" v-model="applierInfo.proposerTrade"></el-input>
              </el-form-item>
			    		<el-form-item label="级别：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerGrade}}</span>
                <el-select v-else v-model="applierInfo.proposerGrade" style="width:300px;">
                  <el-option label="" value=""></el-option>
                  <el-option label="A" value="A"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="C" value="C"></el-option>
                  <el-option label="D" value="D"></el-option>
                </el-select>
              </el-form-item>
			    		<el-form-item label="注册地址：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerRegisterAddress}}</span>
                <el-input v-else class="must_input" style="width: 100%;" v-model="applierInfo.proposerRegisterAddress"></el-input>
              </el-form-item>
			    		<el-form-item label="实际办公地址：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerWorkAddress}}</span>
                <el-input v-else class="must_input" style="width: 100%;" v-model="applierInfo.proposerWorkAddress"></el-input>
              </el-form-item>
			    		<el-form-item label="法人代表：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerRepreName}}</span>
                <el-input v-else class="must_input" style="width: 300px;" v-model="applierInfo.proposerRepreName"></el-input>
              </el-form-item>
			    		<el-form-item label="实际控制人：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerControllerName}}</span>
                <el-input v-else class="must_input" style="width: 300px;" v-model="applierInfo.proposerControllerName"></el-input>
              </el-form-item>
			    		<el-form-item label="基本结算银行：">
			    			<span v-if="readOnly" class="input_read">{{applierInfo.proposerBank}}</span>
                <el-input v-else class="must_input" style="width: 300px;" v-model="applierInfo.proposerBank"></el-input>
              </el-form-item>
						  <el-form-item label="经营范围：">
                <el-input type="textarea" :rows="4" v-model="applierInfo.proposerBusinessScope" :readonly=readOnly></el-input>
						  </el-form-item>
              <div  style="text-align: right;margin-top: 15px;">
                <el-button type="primary" size="mini" @click="saveApplierInfo">保存</el-button>
              </div>
						  <div class="lh_title">实收资本及股权结构</div>
			    		<el-form-item label="注册资本：">
			    			<span v-if="readOnly" class="input_read">{{applierCount.proposerRegisterCapital}}万元</span>
                <el-input v-else class="must_input" style="width: 300px;" v-model="applierCount.proposerRegisterCapital">
                  <template slot="append">万元</template>
                </el-input>
						  </el-form-item>
			    		<el-form-item label="实收资本：">
			    			<span v-if="readOnly" class="input_read">{{applierCount.proposerActualCapital}}万元</span>
                <el-input v-else class="must_input" style="width: 300px;" v-model="applierCount.proposerActualCapital">
                  <template slot="append">万元</template>
                </el-input>
						  </el-form-item>
						  <el-table :data="applierCount.shareHolding" border style="width: 100%">
						    <template>
							    <el-table-column prop="name" label="股东名称">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="applierCount.shareHolding[scope.$index].name"></el-input>
							      </template>
							    </el-table-column>
							    <el-table-column prop="amount" label="出资金额（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="applierCount.shareHolding[scope.$index].amount"></el-input>
							      </template>
							    </el-table-column>
							    <el-table-column prop="share" label="股权比例（%）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="applierCount.shareHolding[scope.$index].share"></el-input>
							      </template>
							    </el-table-column>
							    <el-table-column prop="name" width="120" label="操作">
                    <template slot-scope="scope">
                      <el-button  type="danger" icon="el-icon-delete" size="mini" circle @click="removeShareholder(''+scope.$index)"></el-button>
                      <el-button  v-if="applierCount.shareHolding.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addShareholder"></el-button>
                    </template>
							    </el-table-column>
						    </template>
						  </el-table>
              <div  style="text-align: right;margin-top: 15px;">
                <el-button type="primary" size="mini" @click="saveApplierCount">保存</el-button>
              </div>
              <div class="info-list">
							  <div class="lh_title">关联投资企业（包括实际控制人的个人主要投资）	</div>
							  <el-table :data="relateEnterprise" border style="width: 100%">
							    <template>
								    <el-table-column prop="name" label="关联企业名称">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" v-model="relateEnterprise[scope.$index].name"></el-input>
								      </template>
								    </el-table-column>
								    <el-table-column prop="business" label="主营业务">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" v-model="relateEnterprise[scope.$index].business"></el-input>
								      </template>
								    </el-table-column>
								    <el-table-column prop="income" label="年销售收入">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" v-model="relateEnterprise[scope.$index].income"></el-input>
								      </template>
								    </el-table-column>
                    <el-table-column prop="income" label="借款人占股（%）">
                      <template slot-scope="scope">
                        <el-input style="width: 90%;" v-model="relateEnterprise[scope.$index].share"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="income" label="备注">
                      <template slot-scope="scope">
                        <el-input style="width: 90%;" v-model="relateEnterprise[scope.$index].remark"></el-input>
                      </template>
                    </el-table-column>
								    <el-table-column prop="name" width="120" label="操作">
                      <template slot-scope="scope">
                        <el-button  type="danger" icon="el-icon-delete" size="mini" circle @click="removeCompany(''+scope.$index)"></el-button>
                        <el-button  v-if="relateEnterprise.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addCompany"></el-button>
                      </template>
								    </el-table-column>
							    </template>
							  </el-table>
						  </div>
              <div  style="text-align: right;margin-top: 15px;">
                <el-button type="primary" size="mini" @click="saveCompany">保存</el-button>
              </div>
              <div class="info-list">
                <div class="lh_title">借款人资信状况分析</div>
                <el-form-item label="实际经营者素质：">
                  <el-input type="textarea" :rows="4" v-model="muchInfo.proposerOperatorQuality" :readonly=readOnly></el-input>
                </el-form-item>
                <el-form-item label="借款企业及实际控制人信用记录情况：">
                  <template>
                    <el-radio-group v-model="muchInfo.proposerCreditHistory" :readonly=readOnly>
                      <el-radio :key="i" v-for="(key,i) in radioList" :label="i">{{key}}</el-radio>
                    </el-radio-group>
                  </template>
                </el-form-item>
                <el-form-item label="实际控制人不良记录原因：">
                  <el-input type="textarea" :rows="4" v-model="muchInfo.proposerEnterpriseBadReason" :readonly=readOnly></el-input>
                </el-form-item>
                <el-form-item label="实际控制人不良记录原因：">
                  <el-input type="textarea" :rows="4" v-model="muchInfo.proposerControllerBadReason" :readonly=readOnly></el-input>
                </el-form-item>
              </div>
              <div class="info-list">
                <div class="lh_title">企业发展历程</div>
                <el-form-item label="企业发展历程：">
                  <el-input type="textarea" :rows="4" v-model="muchInfo.proposerDevelopHistory" :readonly=readOnly></el-input>
                </el-form-item>
              </div>
              <div class="info-list">
                <div class="lh_title">公司管理结构及组织框架</div>
                <el-form-item label="公司管理结构及组织框架：">
                  <el-input type="textarea" :rows="4" v-model="muchInfo.proposerManageStructure" :readonly=readOnly></el-input>
                </el-form-item>
              </div>
              <div  style="text-align: right;margin-top: 15px;">
                <el-button type="primary" size="mini" @click="saveMuchInfo">保存</el-button>
              </div>
              <div class="info-list">
                <div class="lh_title">借款企业和实际控制人主要资产和投资</div>
                <el-table :data="queryAsset" border style="width: 100%">
							    <template>
                    <el-table-column label="序号" type="index" align="center" show-overflow-tooltip></el-table-column>
								    <el-table-column prop="name" label="资产名称">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" v-model="queryAsset[scope.$index].name"></el-input>
								      </template>
								    </el-table-column>
								    <el-table-column prop="areaornum" label="资产面积或数量">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" v-model="queryAsset[scope.$index].areaornum"></el-input>
								      </template>
								    </el-table-column>
								    <el-table-column prop="value" label="市场价值（万元）">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" v-model="queryAsset[scope.$index].value"></el-input>
								      </template>
								    </el-table-column>
								    <el-table-column prop="mortgate" label="抵质押情况">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" v-model="queryAsset[scope.$index].mortgate"></el-input>
								      </template>
								    </el-table-column>
								    <el-table-column prop="name" width="120" label="操作">
								      	<template slot-scope="scope">
								        	<el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeAsset(scope.$index)"></el-button>
								        	<el-button  v-if="queryAsset.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addAsset"></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
						</div>
						<div  style="text-align: right;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="saveAsset">保存</el-button>
            </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
		<!-- 三，申请授信额度及现有授信情况 -->
		<el-collapse class="marginBotten" accordion>
			<el-collapse-item name="controllerOne">
        <template slot="title">
                  三、申请授信额度及现有授信情况
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <div class="lh_title">授信品种</div>
            <el-table :data="creditVariety" border style="width: 100%">
              <template>
                <el-table-column prop="variety" label="申请授信品种">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="creditVariety[scope.$index].variety"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="金额（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="creditVariety[scope.$index].amount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="rate" label="利率">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="creditVariety[scope.$index].rate"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="repayway" label="还款方式">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="creditVariety[scope.$index].repayway"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limit" label="期限">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="creditVariety[scope.$index].limit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="measure" label="担保措施">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="creditVariety[scope.$index].measure"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" width="120" label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeCredit(''+scope.$index)"></el-button>
                    <el-button  v-if="creditVariety.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addCredit"></el-button>
                  </template>
                </el-table-column>
              </template>
            </el-table>
            <div  style="text-align: right;margin-top: 15px;">
              <el-button  type="primary" size="mini" @click="saveCredit">保存</el-button>
            </div>
            <div class="lh_title">企业及其关联企业目前在我行授信情况 </div>
            <el-table :data="creditInfo" border style="width: 100%">
                <template>
                  <el-table-column prop="name" label="企业名称">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="creditInfo[scope.$index].name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="variety" label="授信品种">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="creditInfo[scope.$index].variety"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quota" label="敞口额度">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="creditInfo[scope.$index].quota"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="limit" label="额度期限">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="creditInfo[scope.$index].limit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="guarantee" label="担保方式">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="creditInfo[scope.$index].guarantee"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="授信状态">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="creditInfo[scope.$index].status"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" width="120" label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeCreditInfo(''+scope.$index)"></el-button>
                        <el-button  v-if="creditInfo.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addCreditInfo"></el-button>
                      </template>
                  </el-table-column>
                </template>
            </el-table>
          </div>
          <div class="info-list">
            <div  style="text-align: right;margin-top: 15px;">
              <el-button  type="primary" size="mini" @click="saveCreditInfo">保存</el-button>
            </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
		<!-- 四，同业授信、对外担保、民间融资情况 -->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	      四、同业授信、对外担保、民间融资情况
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
              <el-table :data="sameTrade" border style="width: 100%">
                <template>
                  <el-table-column prop="name" label="银行名称">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="sameTrade[scope.$index].name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="业务种类">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="sameTrade[scope.$index].type"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="额度金额">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="sameTrade[scope.$index].amount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="datedue" label="到期日">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="sameTrade[scope.$index].datedue"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="used" label="已用余额">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="sameTrade[scope.$index].used"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="guarantee" label="担保方式">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="sameTrade[scope.$index].guarantee"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" width="120" label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeSameTrade(''+scope.$index)"></el-button>
                        <el-button v-if="sameTrade.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addSameTrade"></el-button>
                      </template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
            <div class="info-list">
              <div  style="text-align: right;margin-top: 15px;">
                <el-button  type="primary" size="mini" @click="saveSameTrade">保存</el-button>
              </div>
            </div>
            <div class="info-list">
              <el-form-item label="企业对外担保情况：">
                <template>
                  <el-radio-group v-model="guarantee.sametradeGuaranteeStatus">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
              <el-table :data="guarantee.sametradeGuarantee" border style="width: 100%">
                <template>
                  <el-table-column prop="name" label="被担保单位名称">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="guarantee.sametradeGuarantee[scope.$index].name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="担保额（万元）">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="guarantee.sametradeGuarantee[scope.$index].amount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="datedue" label="到期日">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="guarantee.sametradeGuarantee[scope.$index].datedue"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="normal" label="被担保单位生产经营是否正常">
                    <template slot-scope="scope">
                      <el-input style="width: 90%;" v-model="guarantee.sametradeGuarantee[scope.$index].normal"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" width="120" label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeGuarantee(''+scope.$index)"></el-button>
                        <el-button v-if="guarantee.sametradeGuarantee.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addGuarantee"></el-button>
                      </template>
                  </el-table-column>
                </template>
              </el-table>
              <el-form-item label="企业对外担保单位或互保单位情况补充说明：">
                <el-input type="textarea" :rows="4" v-model="guarantee.sametradeGuaranteeExplain"></el-input>
              </el-form-item>
              <div  style="text-align: right;margin-top: 15px;">
                <el-button  type="primary" size="mini" @click="saveGuarantee">保存</el-button>
              </div>
            </div>
					  <div class="info-list">
			    		<el-form-item label="企业民间融资情况">
			    			<el-checkbox-group v-model="financeCheckList">
                  <el-checkbox :key="i" v-for="(key, i) in financeCheckListData" :label="i">
                    {{key}}
                    <el-input v-if="key==='其它'" v-model="finance.sametradeSocietyFinanceRemark"></el-input>
                  </el-checkbox>
							 </el-checkbox-group>
			    		</el-form-item>
            <el-form-item label="调查结论：">
              <el-input type="textarea" :rows="4" v-model="finance.sametradeResearchConclusions"></el-input>
            </el-form-item>
						<el-form-item label="对企业银行借款、对外担保和民间融资行为的判断和综合评价：">
              <el-input type="textarea" :rows="4" v-model="finance.sametradeOverallMerit"></el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div  style="text-align: right;margin-top: 15px;">
                <el-button  type="primary" size="mini" @click="saveOverallMerit">保存</el-button>
              </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!-- 五、借款用途及还款来源 -->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
                     五、借款用途及还款来源
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-form-item label="借款用途：">
              <el-input type="textarea" :rows="4" v-model="borrowInfo.borrowUse"></el-input>
            </el-form-item>
            <el-form-item label="还款来源：">
              <el-input type="textarea" :rows="4" v-model="borrowInfo.borrowRepaySource"></el-input>
            </el-form-item>
            <el-form-item label="担保措施为：">
              <el-input type="textarea" :rows="4" v-model="borrowInfo.borrowGuaranteeMeasure"></el-input>
            </el-form-item>
          </div>
          <div class="info-list">
            <div  style="text-align: right;margin-top: 15px;">
              <el-button  type="primary" size="mini" @click="saveBorrowInfo">保存</el-button>
            </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--  六、借款人生产经营情况 -->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
              六、借款人生产经营情况
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <!--企业销售情况-->
          <!--<div class="info-list">
            <div class="lh_title">自有系统平台销售数据（金额单位：万元）</div>
            <TimeTable :table-data="produceInfo.produceSelf" :start-time="timeCache.productStartTime" :end-time="timeCache.productEndTime"></TimeTable>
          </div>-->
          <div class="info-list">
            <div class="lh_title">第三方数据平台销售数据：天下房仓（金额单位：万元）</div>
            <el-table :data="produceInfo.produceThird" border style="width: 100%" show-summary>
              <template>
                <el-table-column prop="month" label="统计月">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="produceInfo.produceThird[scope.$index].month"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="take" label="应收（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="produceInfo.produceThird[scope.$index].take"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="pay" label="应付（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="produceInfo.produceThird[scope.$index].pay"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="profit" label="利润（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="produceInfo.produceThird[scope.$index].profit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="night" label="间夜（个）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="produceInfo.produceThird[scope.$index].night"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" width="120" label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeProductInfo(scope.$index)"></el-button>
                    <el-button v-if="produceInfo.produceThird.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle @click="addProductInfo"></el-button>
                  </template>
                </el-table-column>
              </template>
            </el-table>
            <el-form-item label="补充描述：" style="margin-top: 10px;">
              <el-input type="textarea" :rows="4" v-model="produceInfo.produceThirdDescribe"></el-input>
            </el-form-item>
          </div>
          <div class="info-list">
            <div  style="text-align: right;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="saveProduceInfo">保存</el-button>
            </div>
          </div>
          <div class="info-list">
            <div class="lh_title">对有正式销售发票的收入验证（金额单位：万元）</div>
            <el-form-item label="验证方式：">
              <template>
                <el-radio-group v-model="invoiceBank.produceInvoiceCheckType">
                  <el-radio :key="index" v-for="(item, index) in invoiceCheckRadioList" :label="item.type">{{item.typeText}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <TimeTable :table-data="invoiceBank.produceInvoiceStat" :start-time="timeCache.invoiceStartTime" :end-time="timeCache.invoiceEndTime"></TimeTable>
            <el-form-item label="补充描述：" style="margin-top: 10px;">
              <el-input type="textarea" :rows="4" v-model="invoiceBank.produceInvoiceStatDescribe"></el-input>
            </el-form-item>
          </div>
			    <div class="info-list">
            <div class="lh_title">银行流水（金额单位：万元）</div>
            <div :key="index" v-for="(item, index) in invoiceBank.produceBankStat">
              <el-form-item label="验证方式：">
                <template slot-scope="scope">
                  <el-select v-model="invoiceBank.produceBankStat[index].nameText" placeholder="请选择">
                    <el-option v-for="(item, index) in bankCheckList" :key="index" :label="bankCheckList[item]" :value="item"></el-option>
                  </el-select>
                  <el-button type="danger" size="mini" @click="removeBankList(''+index)">删除</el-button>
                </template>
              </el-form-item>
              <TimeTable :table-data="invoiceBank.produceBankStat[index]" :start-time="timeCache.bankStartTime[index]" :end-time="timeCache.bankEndTime[index]"></TimeTable>
            </div>
            <div  style="text-align: left;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="addBankList">新增</el-button>
            </div>
            <el-form-item label="补充描述：" style="margin-top: 10px;">
              <el-input type="textarea" :rows="4" v-model="invoiceBank.produceBankStatDescribe"></el-input>
            </el-form-item>
          </div>
					<div class="info-list">
						<div class="lh_title">企业营收核对</div>
						<el-form-item label="企业营收核对：">
              <el-input type="textarea" :rows="4" v-model="invoiceBank.produceVerify"></el-input>
						</el-form-item>
            <div  style="text-align: right;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="saveInvoiceBank">保存</el-button>
            </div>
					</div>
					<div class="info-list">
            <div class="lh_title">前三位主要供货商</div>
            <el-table :data="supplierInfo.produceMajorSupplier" border style="width: 100%">
              <template>
                <el-table-column prop="name" label="销售商名">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSupplier[scope.$index].name"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="goods" label="货品">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSupplier[scope.$index].goods"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="proportion" label="占比（%）">
                  <template slot-scope="scope" >
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSupplier[scope.$index].proportion"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="account_period" label="账期">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSupplier[scope.$index].account_period"></el-input>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
          <div class="info-list">
            <div class="lh_title">前三位主要销售商</div>
            <el-table :data="supplierInfo.produceMajorSeller" border style="width: 100%">
              <template>
                <el-table-column prop="name" label="销售商名">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSeller[scope.$index].name"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="goods" label="货品">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSeller[scope.$index].goods"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="proportion" label="占比（%）">
                  <template slot-scope="scope" >
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSeller[scope.$index].proportion"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="account_period" label="账期">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="supplierInfo.produceMajorSeller[scope.$index].account_period"></el-input>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
          <div class="info-list">
            <div style="text-align: right;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="saveSupplierInfo">保存</el-button>
            </div>
          </div>
			    <div class="info-list">
						<div class="lh_title">上下游企业对借款企业评价（如有）</div>
						<el-form-item label="上下游企业对借款企业评价：">
              <el-input type="textarea" :rows="4" v-model="produceOther.produceEvaluate"></el-input>
						</el-form-item>
            <el-form-item label="上下游企业合作情况说明：">
              <el-input type="textarea" :rows="4" v-model="produceOther.produceCooperationDescription"></el-input>
            </el-form-item>
					</div>
					<div class="info-list">
						<div class="lh_title">生产经营和销售调查验证方法（对首次授信客户）</div>
            <el-form-item label="调查采取的核实方法：">
              <el-checkbox-group v-model="checkMethodList">
                <el-checkbox :key="index" v-for="(item, index) in checkMethodListData" :label="index">
                  {{item}}
                  <el-input v-if="item==='其它'" v-model="produceOther.produceVerifyMethodRemark"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="搜集了以下核实材料：">
              <el-checkbox-group v-model="checkMaterialList">
                <el-checkbox :key="index" v-for="(item, index) in checkMaterialListData" :label="index">
                  {{item}}
                  <el-input v-if="item==='其它'" v-model="produceOther.produceVerifyMaterialRemark"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="简要说明：">
              <el-input type="textarea" :rows="4" v-model="produceOther.produceBriefDescription"></el-input>
            </el-form-item>
            <el-form-item label="调查结论：">
              <el-input type="textarea" :rows="4" v-model="produceOther.produceResearchConclusion"></el-input>
            </el-form-item>
            <div style="text-align: right;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="saveProduceOther">保存</el-button>
            </div>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!-- 七、财务分析 -->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
              七、财务分析
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <div class="lh_title">资产负债状况</div>
            <el-table :data="financeAnalysis.financeDebt" border style="width: 100%">
              <template>
                <el-table-column prop="product" label="项目">
                  <template slot-scope="scope">
                     <span>{{ scope.row.product }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="y2016" label="2016年（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.y2016"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="y2017" label="2017年（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.y2017"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="y2018" label="2018年（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.y2018"></el-input>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
          <div class="info-list">
            <div class="lh_title">损益状况</div>
            <el-table :data="financeAnalysis.financeLossIncome" border style="width: 100%">
              <template>
                <el-table-column prop="product" label="项目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.product }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="y2016" label="2016年（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.y2016"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="y2017" label="2017年（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.y2017"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="y2018" label="2018年（万元）">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.y2018"></el-input>
                  </template>
                </el-table-column>
              </template>
						</el-table>
          </div>
          <div class="info-list">
            <div class="lh_title">主要科目分析</div>
						<el-form-item label="主要科目分析：">
              <el-input type="textarea" :rows="4" v-model="financeAnalysis.financeSubjectAnalysis"></el-input>
						</el-form-item>
					</div>
          <div class="info-list">
            <div  style="text-align: right;margin-top: 15px;">
              <el-button  type="primary" size="mini" @click="saveFinanceAnalysis">保存</el-button>
            </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
    <!-- 八、如需现场尽职调查 -->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
            八、如需现场尽职调查
        </template>
        <el-form label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <template>
              <el-form-item label="是否已经对原始证据和经营现场及抵质押品拍照：">
                <el-radio-group v-model="spotCheck">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
          </div>
          <div class="info-list">
            <div style="text-align: right;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="saveSpotCheck">保存</el-button>
            </div>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
		<!--  九、负面信息核查结果 -->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
                  九、负面信息核查结果
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
					<div class="info-list">
						<template>
							<el-table :data="negativeInfo" border style="width: 100%;margin-bottom: 20px;">
                <el-table-column prop="text" label="核查项">
                  <template slot-scope="scope">
                    <div>{{scope.row.text}}</div>
                    <!-- 文本框修改成不受 有,无 选项的控制  v-if="scope.row.status==1"  -->
                    <el-input type="textarea" v-model="scope.row.content"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="有" align="center" width="120">
                  <template slot-scope="scope">
                    <input  type="radio" :name="scope.row.key"  :id="scope.row.key + 1"  value="1" v-model="scope.row.status">
                    <label :class="scope.row.status=='1'?'radio_label_checked':'radio_label'" :for="scope.row.key + 1">有</label>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="无" align="center" width="120">
                  <template slot-scope="scope">
                    <input  class="cursor_a" type="radio" :name="scope.row.key"  :id="scope.row.key + 0"  value="0" v-model="scope.row.status">
                    <label :class="scope.row.status=='0'?'radio_label_checked':'radio_label'" :for="scope.row.key + 0">无</label>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <div style="text-align: right;">
              <el-button  @click="saveNegativeInfo" type="primary" size="mini">保存</el-button>
            </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--  十、额度测算 -->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
              十、额度测算
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-form-item label="额度测算：">
              <el-input type="textarea" :rows="4" v-model="otherInfo.limitCal"></el-input>
            </el-form-item>
            <div  style="text-align: right; margin-top: 15px;">
		      <el-button type="primary" size="mini" @click="saveLimitCal">保存</el-button>
		    </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
    <!--  十一、担保分析-->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
              十一、担保分析
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-form-item label="担保措施：">
              <el-input type="textarea" :rows="4" v-model="otherInfo.guaranteeAnalysis"></el-input>
            </el-form-item>
            <div  style="text-align: right; margin-top: 15px;">
		      <el-button type="primary" size="mini" @click="saveGuaranteeAnalysis">保存</el-button>
		    </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
    <!--  十二、本次授信主要风险点及防范措施-->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
                十二、本次授信主要风险点及防范措施
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-table :data="otherInfo.riskPoint" border style="width: 100%">
              <template>
                <el-table-column prop="point" label="主要风险点">
                  <template slot-scope="scope">
                    {{scope.row.point}}
                  </template>
                </el-table-column>
                <el-table-column prop="desc" label="主要风险描述">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.desc"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="measure" label="风险控制措施">
                  <template slot-scope="scope">
                    <el-input style="width: 90%;" v-model="scope.row.measure"></el-input>
                  </template>
                </el-table-column>
              </template>
            </el-table>
            <div  style="text-align: right; margin-top: 15px;">
		      <el-button type="primary" size="mini" @click="saveRiskPoint">保存</el-button>
		    </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
    <!--  十三、其他需要说明的问题-->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
              十三、其他需要说明的问题
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-form-item label="其他说明问题：">
              <el-input type="textarea" :rows="4" v-model="otherInfo.otherQuestion"></el-input>
            </el-form-item>
            <div  style="text-align: right; margin-top: 15px;">
		      <el-button type="primary" size="mini" @click="saveOtherQuestion">保存</el-button>
		    </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
    <!--十四、授信结论-->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
                十四、授信结论
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-form-item label="授信调查结论：">
              <el-input type="textarea" :rows="4" v-model="otherInfo.creditlineConclusion"></el-input>
            </el-form-item>
            <div  style="text-align: right; margin-top: 15px;">
		      <el-button type="primary" size="mini" @click="saveCreditlineConclusion">保存</el-button>
		    </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
    <!--  审批意见-->
		<el-collapse class="marginBotten">
			<el-collapse-item name="controllerOne">
        <template slot="title">
              审批意见
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-form-item label="经营机构负责人：">
              <el-input type="text" v-model="otherInfo.approvalOpinionChief"></el-input>
            </el-form-item>
            <el-form-item label="经营机构负责人意见：">
              <el-input type="textarea" :rows="4" v-model="otherInfo.approvalOpinionChiefAdvice">
              </el-input>
            </el-form-item>
            <el-form-item label="审查人员：">
              <el-input type="text" v-model="otherInfo.approvalOpinionExamine"></el-input>
            </el-form-item>
            <el-form-item label="审查人员意见：">
              <el-input type="textarea" :rows="4" v-model="otherInfo.approvalOpinionExamineAdvice">
              </el-input>
            </el-form-item>
            <el-form-item label="审批人员：">
              <el-input type="text" v-model="otherInfo.approvalOpinionApprover"></el-input>
            </el-form-item>
            <el-form-item label="审批人员意见：">
              <el-input type="textarea" :rows="4" v-model="otherInfo.approvalOpinionApproverAdvice"></el-input>
            </el-form-item>
          </div>
          <div class="info-list">
            <div  style="text-align: right;margin-top: 15px;">
              <el-button type="primary" size="mini" @click="saveApprovalOpinion">保存</el-button>
            </div>
          </div>
        </el-form>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Upload from '@/components/Upload/Upload'
  import Uploads from '@/components/Upload/Uploads'
  import TimeTable from '@/components/common/timeTable'
  import {parseTime} from '@/utils/index'
  import creditDetail from '@/api/creditReportManage/chinaTravelBankDetail'

  export default {
		name: 'verify',
		components: {
			Upload,
			Uploads,
      TimeTable
		},
		data() {
      return {
        Api: '', // 根据父组件传来的值更换api
        checkboxData: {}, // 角色-多选框
        checkList: [],
        invoiceCheckRadioList: [], // 发票验证方式-单选框
        financeCheckListData: {}, // 企业民间融资情况-多选框
        financeCheckList: [],
        bankCheckList: {}, // 银行流水验证方式-下拉列表
        radioList: {}, // 借款企业及实际控制人信用记录情况-单选框
        checkMethodListData: {}, // 核实方法-多选框
        checkMethodList: [],
        checkMaterialListData: {}, // 核实材料-多选框
        checkMaterialList: [],
        timeCache: {
          productStartTime: '', // 生产情况开始时间
          productEndTime: '', // 生产情况结束时间
          invoiceStartTime: '', // 发票收入验证开始时间
          invoiceEndTime: '', // 发票收入验证结束时间
          bankStartTime: [], // 银行流水验证开始时间
          bankEndTime: [] // 银行流水验证结束时间
        },
        controllerData: {
          creditPropertyTime: '',
          creditPropertyPlace: '',
          creditPropertyRole: ''
        }, // 授信性质及调查过程数据
        applierInfo: {
          proposerEnterpriseName: '',
          proposerTrade: '',
          proposerGrade: '',
          proposerRegisterAddress: '',
          proposerWorkAddress: '',
          proposerRepreName: '',
          proposerControllerName: '',
          proposerBank: '',
          proposerBusinessScope: ''
        }, // 申请人基础信息数据
        applierCount: {
          proposerRegisterCapital: '',
          proposerActualCapital: '',
          shareHolding: [
            {name: '', count: '', share: ''}
          ]
        },
        relateEnterprise: [
          {name: '', business: '', income: '', share: '', remark: ''}
        ],
        muchInfo: {
          proposerOperatorQuality: '',
          proposerCreditHistory: '',
          proposerCreditHistoryText: '',
          proposerEnterpriseBadReason: '',
          proposerControllerBadReason: '',
          proposerDevelopHistory: '',
          proposerManageStructure: ''
        },
        queryAsset: [
          {name: '', areaornum: '', value: '', mortgate: ''}
        ],
        creditVariety: [
          {amount: '', repayway: '', measure: '', variety: '', rate: '', limit: ''}
        ],
        creditInfo: [
          {name: '', variety: '', quota: '', limit: '', guarantee: '', status: ''}
        ],
        sameTrade: [
          {name: '', type: '', amount: '', datedue: '', used: '', guarantee: ''}
        ],
        guarantee: {
          sametradeGuaranteeStatus: '',
          sametradeGuarantee: [
            {item: '', datedue: '', normal: '', amount: '', name: ''}
          ],
          sametradeGuaranteeExplain: ''
        },
        finance: {
          sametradeSocietyFinance: '',
          sametradeOverallMerit: '',
          sametradeSocietyFinanceRemark:''
        },
        borrowInfo: {
          borrowUse: '',
          borrowGuaranteeMeasure: ''
        },
        produceInfo: {
          produceSelf: {
            data: [
              {key: '', value:''}
            ],
            totalAmt: ''
          },
          produceThird: [
            {month: '', take: '', pay: '', profit: '',  night: ''}
          ],
          produceThirdDescribe: ''
        },
        invoiceBank: {
          produceInvoiceCheckType: '',
          produceInvoiceCheckTypeText: '',
          produceInvoiceStat: {
            data: [
              {key: '', value: ''}
            ],
            totalAmt: ''
          },
          produceBankStat: [
            {
              name: '',
              totalAmt: '',
              data: [],
              nameText: ''
            }
          ],
          produceVerify: '',
          produceInvoiceStatDescribe: '',
          produceBankStatDescribe: ''
        },
        supplierInfo: {
          produceMajorSupplier: [
            {name: '', goods: '', proportion: '', account_period: ''}
          ],
          produceMajorSeller: [
            {name: '', goods: '', proportion: '', account_period: ''}
          ]
        },
        produceOther: {
          produceEvaluate: '',
          produceCooperationDescription: '',
          produceVerifyMethod: '',
          produceVerifyMaterial: '',
          produceBriefDescription: '',
          produceResearchConclusion: '',
          produceVerifyMethodRemark: '',
          produceVerifyMaterialRemark: ''
        },
        financeAnalysis: {
          financeDebt: [
            {product: '', y2016: '', y2017: '', y2018: ''}
          ],
          financeLossIncome: [
            {product: '', y2016: '', y2017: '', y2018: ''}
          ],
          financeSubjectAnalysis: ''
        },
        spotCheck: '',
        negativeInfo: [
          {key: '', status: '', content: ''}
        ],
        otherInfo: {
          supplierCapitalId: '',
          limitCal: '',
          guaranteeAnalysis: '',
          riskPoint: [
            {point: '', desc: '', measure: ''}
          ],
          otherQuestion: '',
          creditlineConclusion: '',
          approvalOpinionChief: '',
          approvalOpinionChiefAdvice: '',
          approvalOpinionExamine: '',
          approvalOpinionExamineAdvice: '',
          approvalOpinionApprover: '',
          approvalOpinionApproverAdvice: ''
        }
      }
    },
		props: {
			readOnly: {
				type: Boolean,
				default: false
			},
      supplierCapitalId: {
				type: String,
				default: ''
			},
			apiUrl:{
				type: String,
				default: ''
			}
		},
		watch: {
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			]),
		},
		created() {
      if(this.apiUrl === 'creditDetail'){
        this.Api = creditDetail
      }
      this.loadCheckboxData()
      this.loadFinanceCheckList()
      this.loadInvoiceCheckRadio()
      this.loadBankCheckList()
      this.loadCheckMethodList()
      this.loadCheckMaterialList()
      this.getCreditHistory()
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.getQueryVerifyController() // 授信性质及调查过程-查询
        this.getQueryApplier() // 申请人基础信息-查询
        this.getApplierCount() // 实收资本及股权结构-查询
        this.getCompany() // 关联投资企业-查询
        this.getMuchInfo() // 申请人基本信息-借款人资信状况分析+企业发展历程+公司管理结构及组织框架-查询
        this.getQueryAsset() // 借款企业和实际控制人主要资产和投资-查询
        this.getCreditVariety() // 授信品种-查询
        this.getCreditInfo() // 企业及关联企业目前在我行授信情况-查询
        this.getSameTrade() // 同行授信-查询
        this.getGuarantee() // 企业对外担保情况-查询
        this.getOverallMerit() // 综合评价-查询
        this.getBorrowInfo() // 借款用途及还款来源-查询
        this.getProduceInfo() // 借款人生产经营情况-自有系统平台销售数据+第三方销售数据-查询
        this.getInvoiceBank() // 借款人生产经营情况-对有正式销售发票+银行流水+企业营收核对-查询
        this.getSupplier() // 前三位主要供应商+前三位主要销售商-查询
        this.getProduceOther() // 上下游对借款企业评价+生产经营和销售调查验证方法+生产经营和销售情况调查结论-查询
        this.getFinanceAnalysis() // 财产分析-查询
        this.getSpotCheck() // 如需现场尽职调查-查询
        this.getNegativeInfo() // 负面信息-查询
        this.getOtherInfo() // 额度测算+担保分析+本次授信主要风险点及防范措施 +其它需要说明的问题+授信结论+审批意见-查询
			}, // 初始化
      loadCheckboxData () { // 角色-多选框数据
        this.Api.checkboxLoad().then(res => {
          if(res.data.code === '200') {
            this.checkboxData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      loadFinanceCheckList () { // 企业民间融资情况-多选框数据
        this.Api.financeCheckList().then(res => {
          if(res.data.code === '200') {
            this.financeCheckListData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      loadInvoiceCheckRadio () { // 发票验证方式-单选框
        this.Api.invoiceCheckRadio().then(res => {
          if(res.data.code === '200') {
            this.invoiceCheckRadioList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      loadBankCheckList () { // 银行流水验证方式-下拉列表
        this.Api.bankCheckList().then(res => {
          if(res.data.code === '200') {
            this.bankCheckList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      loadCheckMethodList () { // 核实方法-多选框
        this.Api.checkMethodList().then(res => {
          if(res.data.code === '200') {
            this.checkMethodListData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      loadCheckMaterialList () { // 核实材料-多选框
        this.Api.checkMaterialList().then(res => {
          if(res.data.code === '200') {
            this.checkMaterialListData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getCreditHistory () {
        this.Api.queryCreditHistory().then(res => {
          if(res.data.code === '200') {
            this.radioList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
			getQueryVerifyController() { // 授信性质及调查过程-查询
				this.Api.queryController(this.supplierCapitalId).then(res => {
					if(res.data.code === '200') {
						this.controllerData = res.data.data
						this.checkList = this.controllerData.creditPropertyRole.split(',')
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
      getQueryApplier () { // 申请人基础信息-查询
        this.Api.queryApplier(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.applierInfo = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getApplierCount () { // 实收资本及股权结构-查询
        this.Api.queryApplierCount(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.applierCount = res.data.data
            if (this.applierCount.shareHolding.length === 0) {
              this.applierCount.shareHolding.push({name: '', count: '', share: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getCompany () { // 关联投资企业-查询
        this.Api.queryCompany(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.relateEnterprise = res.data.data.relateEnterprise
            if (this.relateEnterprise.length === 0) {
              this.relateEnterprise.push({name: '', business: '', income: '', share: '', remark: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getMuchInfo () { // 申请人基本信息-借款人资信状况分析+企业发展历程+公司管理结构及组织框架-查询
        this.Api.queryMuchInfo(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.muchInfo = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getQueryAsset () { // 借款企业和实际控制人主要资产和投资-查询
        this.Api.queryAsset(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.queryAsset = res.data.data.asset
            if (this.queryAsset.length === 0) {
              this.queryAsset.push({name: '', areaornum: '', value: '', mortgate: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getCreditVariety () { // 授信品种-查询
        this.Api.queryCreditVariety(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.creditVariety = res.data.data.applyCreditVariety
            if (this.creditVariety.length === 0) {
              this.creditVariety.push({amount: '', repayway: '', measure: '', variety: '', rate: '', limit: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getCreditInfo () { // 企业及关联企业目前在我行授信情况-查询
        this.Api.queryCreditInfo(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.creditInfo = res.data.data.applyCreditNow
            if (this.creditInfo.length === 0) {
              this.creditInfo.push({name: '', variety: '', quota: '', limit: '', guarantee: '', status: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getSameTrade () { // 同行授信-查询
        this.Api.querySameTrade(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.sameTrade = res.data.data.sametradeInfo
            if (this.sameTrade.length === 0) {
              this.sameTrade.push({name: '', type: '', amount: '', datedue: '', used: '', guarantee: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getGuarantee () { // 企业对外担保情况-查询
        this.Api.queryGuarantee(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.guarantee = res.data.data
            if (this.guarantee.sametradeGuarantee.length === 0) {
              this.guarantee.sametradeGuarantee.push({item: '', datedue: '', normal: '', amount: '', name: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getOverallMerit () { // 综合评价-查询
        this.Api.queryOverallMerit(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.finance = res.data.data
            this.financeCheckList = this.finance.sametradeSocietyFinance.split(',')
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getBorrowInfo () { // 借款用途及还款来源-查询
        this.Api.queryBorrowInfo(this.supplierCapitalId).then(res => {
          if(res.data.code === '200') {
            this.borrowInfo = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getProduceInfo () { // 借款人生产经营情况-自有系统平台销售数据+第三方销售数据-查询
        this.Api.queryProduceInfo(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.produceInfo = res.data.data
            this.timeCache.productStartTime = res.data.data.produceSelf.data[0].key
            this.timeCache.productEndTime = res.data.data.produceSelf.data[res.data.data.produceSelf.data.length-1].key
            if (this.produceInfo.produceThird.length === 0) {
              this.produceInfo.produceThird.push({month: '', take: '', pay: '', profit: '',  night: ''})
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getInvoiceBank () { // 借款人生产经营情况-对有正式销售发票+银行流水+企业营收核对-查询
			  this.Api.queryInvoiceBank(this.supplierCapitalId).then(res => {
          this.timeCache.bankStartTime = []
          this.timeCache.bankEndTime = []
          if (res.data.code === '200') {
            this.invoiceBank = res.data.data
            this.timeCache.invoiceStartTime = res.data.data.produceInvoiceStat.data[0].key
            this.timeCache.invoiceEndTime = res.data.data.produceInvoiceStat.data[res.data.data.produceInvoiceStat.data.length-1].key
            for (let i = 0;i < res.data.data.produceBankStat.length;i++) {
              this.timeCache.bankStartTime.push(res.data.data.produceBankStat[i].data[0].key)
              this.timeCache.bankEndTime.push(res.data.data.produceBankStat[i].data[res.data.data.produceBankStat[i].data.length-1].key)
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getSupplier () { // 前三位主要供应商+前三位主要销售商-查询
        this.Api.querySupplier(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.supplierInfo = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getProduceOther () { // 上下游对借款企业评价+生产经营和销售调查验证方法+生产经营和销售情况调查结论-查询
        this.Api.queryProduceOther(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.produceOther = res.data.data
            this.checkMethodList = res.data.data.produceVerifyMethod.split(',')
            this.checkMaterialList = res.data.data.produceVerifyMaterial.split(',')
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getFinanceAnalysis () { // 财产分析-查询
        this.Api.queryFinanceAnalysis(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.financeAnalysis = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getSpotCheck () { // 如需现场尽职调查-查询
			  this.Api.querySpotCheck(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.spotCheck = res.data.data.spotCheck
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getNegativeInfo () { // 负面信息-查询
        this.Api.queryNegativeInfo(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.negativeInfo = res.data.data.negativeInfo
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getOtherInfo () { // 额度测算+担保分析+本次授信主要风险点及防范措施 +其它需要说明的问题+授信结论+审批意见-查询
        this.Api.queryOtherInfo(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
            this.otherInfo = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveControllerData () { // 授信性质及调查过程-保存
			  this.controllerData.creditPropertyRole = this.checkList.join(',')
        this.controllerData.creditPropertyTime = parseTime(this.controllerData.creditPropertyTime,'{y}-{m}-{d}')
        this.Api.saveController(this.addSupplierCapitalId(this.controllerData)).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveApplierInfo () { // 申请人基本信息-保存
        this.Api.editApplier(this.addSupplierCapitalId(this.applierInfo)).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveApplierCount () { // 申请人基本信息-实收资本及股权结构-保存
        this.Api.editApplierCount(this.addSupplierCapitalId({
          proposerRegisterCapital: this.applierCount.proposerRegisterCapital,
          proposerActualCapital: this.applierCount.proposerActualCapital,
          shareHolding: JSON.stringify(this.applierCount.shareHolding)
        })).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveCompany () { // 申请人公司信息-保存
        this.Api.editCompany(this.addSupplierCapitalId({relateEnterprise:JSON.stringify(this.relateEnterprise)})).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveMuchInfo () { // 申请人更多信息-保存
        this.Api.editMuchInfo(this.addSupplierCapitalId(this.muchInfo)).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveAsset () { // 申请人股东-保存
        this.Api.editAsset(this.addSupplierCapitalId({asset:JSON.stringify(this.queryAsset)})).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveCredit () { // 授信品种-保存
        this.Api.editCredit(this.addSupplierCapitalId({applyCreditVariety:JSON.stringify(this.creditVariety)})).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveCreditInfo () { // 企业及关联企业目前在我行授信情况-保存
        this.Api.editCreditInfo(this.addSupplierCapitalId({applyCreditNow:JSON.stringify(this.creditInfo)})).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveSameTrade () { // 同行授信-修改
        this.Api.saveSameTrade(this.addSupplierCapitalId({sametradeInfo:JSON.stringify(this.sameTrade)})).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveGuarantee () { // 企业对外担保情况-修改
        this.Api.saveGuarantee(this.addSupplierCapitalId({
          sametradeGuaranteeStatus: this.guarantee.sametradeGuaranteeStatus,
          sametradeGuarantee: JSON.stringify(this.guarantee.sametradeGuarantee),
          sametradeGuaranteeExplain: this.guarantee.sametradeGuaranteeExplain
        })).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveOverallMerit () { // 综合评价-修改
        this.finance.sametradeSocietyFinance = this.financeCheckList.join(',')
        this.Api.saveOverallMerit(this.addSupplierCapitalId(this.finance)).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveBorrowInfo () { // 借款用途及还款来源-修改
        this.Api.saveBorrowInfo(this.addSupplierCapitalId(this.borrowInfo)).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveProduceInfo () { // 借款人生产经营情况-自有系统平台销售数据+第三方销售数据-修改
			  let obj = {}
			  for (let i=0;i<this.produceInfo.produceSelf.data.length;i++) {
			    obj[this.produceInfo.produceSelf.data[i].key] = this.produceInfo.produceSelf.data[i].value
        }
        this.Api.saveProduceInfo(this.addSupplierCapitalId({
          produceThird: JSON.stringify(this.produceInfo.produceThird),
          produceSelf: JSON.stringify(obj),
          produceThirdDescribe: this.produceInfo.produceThirdDescribe
        })).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveInvoiceBank () { // 借款人生产经营情况-对有正式销售发票+银行流水+企业营收核对-修改
        let obj = {}
        for (let i=0;i<this.invoiceBank.produceInvoiceStat.data.length;i++) {
          obj[this.invoiceBank.produceInvoiceStat.data[i].key] = this.invoiceBank.produceInvoiceStat.data[i].value
        }
        let obj1 = []
        for (let i=0;i<this.invoiceBank.produceBankStat.length;i++){
          let obj2 = {}
          for(let j=0;j<this.invoiceBank.produceBankStat[i].data.length;j++) {
            obj2[this.invoiceBank.produceBankStat[i].data[j].key] = this.invoiceBank.produceBankStat[i].data[j].value
          }
          obj1.push({name: this.invoiceBank.produceBankStat[i].nameText, data: obj2})
        }
        this.Api.saveInvoiceBank(this.addSupplierCapitalId({
          produceInvoiceCheckType: this.invoiceBank.produceInvoiceCheckType,
          produceVerify: this.invoiceBank.produceVerify,
          produceBankStat: JSON.stringify(obj1),
          produceInvoiceStat: JSON.stringify(obj),
          produceInvoiceStatDescribe: this.invoiceBank.produceInvoiceStatDescribe,
          produceBankStatDescribe: this.invoiceBank.produceBankStatDescribe
        })).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveSupplierInfo () { // 前三位主要供应商+前三位主要销售商-修改
        this.Api.saveSupplier(this.addSupplierCapitalId({
            produceMajorSupplier: JSON.stringify(this.supplierInfo.produceMajorSupplier),
            produceMajorSeller: JSON.stringify(this.supplierInfo.produceMajorSeller)
          })
        ).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveProduceOther () { // 上下游对借款企业评价+生产经营和销售调查验证方法+生产经营和销售情况调查结论-修改
        this.produceOther.produceVerifyMethod = this.checkMethodList.join(',')
        this.produceOther.produceVerifyMaterial = this.checkMaterialList.join(',')
        this.Api.saveProduceOther(this.addSupplierCapitalId(this.produceOther)).then(res => {
          if(res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveFinanceAnalysis () { // 财务分析-修改
        this.Api.saveFinanceAnalysis(this.addSupplierCapitalId({
          financeDebt: JSON.stringify(this.financeAnalysis.financeDebt),
          financeLossIncome: JSON.stringify(this.financeAnalysis.financeLossIncome),
          financeSubjectAnalysis: this.financeAnalysis.financeSubjectAnalysis
        })).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveSpotCheck () { // 如需现场尽职调查-修改
        this.Api.saveSpotCheck(this.addSupplierCapitalId({spotCheck: this.spotCheck})).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveNegativeInfo () { // 负面信息-修改
        this.Api.saveNegativeInfo(this.addSupplierCapitalId({negativeInfo: JSON.stringify(this.negativeInfo)})).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      saveLimitCal () { // 额度测算-修改
      	this.Api.saveLimitCal(this.addSupplierCapitalId({
      		limitCal: this.otherInfo.limitCal
      	})).then(res => {
      		if (res.data.code === '200') {
      			this.$message.success(res.data.message)
      		} else {
      			this.$message.error(res.data.message)
      		}
      	}).catch(() => {})
      },
      saveGuaranteeAnalysis () { // 担保分析-修改
      	this.Api.saveGuaranteeAnalysis(this.addSupplierCapitalId({
      		guaranteeAnalysis: this.otherInfo.guaranteeAnalysis
      	})).then(res => {
      		if (res.data.code === '200') {
      			this.$message.success(res.data.message)
      		} else {
      			this.$message.error(res.data.message)
      		}
      	}).catch(() => {})
      },
      saveRiskPoint () { // 本次授信主要风险点及防范措施-修改
      	this.Api.saveRiskPoint(this.addSupplierCapitalId({
      		riskPoint: JSON.stringify(this.otherInfo.riskPoint)
      	})).then(res => {
      		if (res.data.code === '200') {
      			this.$message.success(res.data.message)
      		} else {
      			this.$message.error(res.data.message)
      		}
      	}).catch(() => {})
      },
      saveOtherQuestion () { // 其它需要说明的问题-修改
      	this.Api.saveOtherQuestion(this.addSupplierCapitalId({
      		otherQuestion: this.otherInfo.otherQuestion
      	})).then(res => {
      		if (res.data.code === '200') {
      			this.$message.success(res.data.message)
      		} else {
      			this.$message.error(res.data.message)
      		}
      	}).catch(() => {})
      },
      saveCreditlineConclusion () { // 授信结论-修改
      	this.Api.saveCreditlineConclusion(this.addSupplierCapitalId({
      		creditlineConclusion: this.otherInfo.creditlineConclusion
      	})).then(res => {
      		if (res.data.code === '200') {
      			this.$message.success(res.data.message)
      		} else {
      			this.$message.error(res.data.message)
      		}
      	}).catch(() => {})
      },
      saveApprovalOpinion () { // 审批意见-修改
        this.Api.saveApprovalOpinion(this.addSupplierCapitalId({
          approvalOpinionChief: this.otherInfo.approvalOpinionChief,
          approvalOpinionChiefAdvice: this.otherInfo.approvalOpinionChiefAdvice,
          approvalOpinionExamine: this.otherInfo.approvalOpinionExamine,
          approvalOpinionExamineAdvice: this.otherInfo.approvalOpinionExamineAdvice,
          approvalOpinionApprover: this.otherInfo.approvalOpinionApprover,
          approvalOpinionApproverAdvice: this.otherInfo.approvalOpinionApproverAdvice
        })).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      addSupplierCapitalId (param) { // 用于添加参数supplierCapitalId
			  param.supplierCapitalId = this.supplierCapitalId
			  return param
      },
      addBankList () { // 用于添加银行流水
        this.timeCache.bankStartTime.push('')
        this.timeCache.bankEndTime.push('')
        this.invoiceBank.produceBankStat.push({
          name: '',
          totalAmt: '',
          data: [],
          nameText: ''
        });
      },
      removeBankList (index) { // 用于删除银行流水
        this.invoiceBank.produceBankStat.splice(index, 1)
        this.timeCache.bankStartTime.splice(index, 1)
        this.timeCache.bankEndTime.splice(index, 1)
        if (this.invoiceBank.produceBankStat.length === 0) {
          this.invoiceBank.produceBankStat.push({
            name: '',
            totalAmt: '',
            data: [],
            nameText: ''
          })
        }
      },
      addShareholder () { // 用于添加股东
        this.applierCount.shareHolding.push({name: '', count: '', share: ''})
      },
      removeShareholder (index) { // 用于删除股东
        this.applierCount.shareHolding.splice(index,1)
        if (this.applierCount.shareHolding.length === 0) {
          this.applierCount.shareHolding.push({name: '', count: '', share: ''})
        }
      },
      addCompany () { // 用于添加企业
        this.relateEnterprise.push({name: '', business: '', income: '', share: '', remark: ''})
      },
      removeCompany (index) { // 用于删除企业
        this.relateEnterprise.splice(index,1)
        if (this.relateEnterprise.length === 0) {
          this.relateEnterprise.push({name: '', business: '', income: '', share: '', remark: ''})
        }
      },
      addAsset () { // 用于添加企业
        this.queryAsset.push({name: '', areaornum: '', value: '', mortgate: ''})
      },
      removeAsset (index) { // 用于删除企业
        this.queryAsset.splice(index,1)
        if (this.queryAsset.length === 0) {
          this.queryAsset.push({name: '', areaornum: '', value: '', mortgate: ''})
        }
      },
      addCredit () { // 用于添加授信品种
        this.creditVariety.push({amount: '', repayway: '', measure: '', variety: '', rate: '', limit: ''})
      },
      removeCredit (index) { // 用于删除授信品种
        this.creditVariety.splice(index,1)
        if (this.creditVariety.length === 0) {
          this.creditVariety.push({amount: '', repayway: '', measure: '', variety: '', rate: '', limit: ''})
        }
      },
      addCreditInfo () { // 用于添加企业及关联企业目前在我行授信情况
        this.creditInfo.push({name: '', variety: '', quota: '', limit: '', guarantee: '', status: ''})
      },
      removeCreditInfo (index) { // 用于删除企业及关联企业目前在我行授信情况
        this.creditInfo.splice(index,1)
        if (this.creditInfo.length === 0) {
          this.creditInfo.push({name: '', variety: '', quota: '', limit: '', guarantee: '', status: ''})
        }
      },
      addSameTrade () { // 用于添加同行授信
        this.sameTrade.push({name: '', type: '', amount: '', datedue: '', used: '', guarantee: ''})
      },
      removeSameTrade (index) { // 用于删除同行授信
        this.sameTrade.splice(index,1)
        if (this.sameTrade.length === 0) {
          this.sameTrade.push({name: '', type: '', amount: '', datedue: '', used: '', guarantee: ''})
        }
      },
      addGuarantee () { // 用于添加同行授信
        this.guarantee.sametradeGuarantee.push({item: '', datedue: '', normal: '', amount: '', name: ''})
      },
      removeGuarantee (index) { // 用于删除同行授信
        this.guarantee.sametradeGuarantee.splice(index,1)
        if (this.guarantee.sametradeGuarantee.length === 0) {
          this.guarantee.sametradeGuarantee.push({item: '', datedue: '', normal: '', amount: '', name: ''})
        }
      },
      addProductInfo () { // 用于添加第三方数据平台数据
        this.produceInfo.produceThird.push({month: '', take: '', pay: '', profit: '',  night: ''})
      },
      removeProductInfo (index) { // 用于删除第三方数据平台数据
        this.produceInfo.produceThird.splice(index,1)
        if (this.produceInfo.produceThird.length === 0) {
          this.produceInfo.produceThird.push({month: '', take: '', pay: '', profit: '',  night: ''})
        }
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "approveDetail.scss";
</style>

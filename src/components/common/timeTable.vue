<template>
  <div class="timeTable">
    <el-form-item label="月份：">
      <template>
        <el-date-picker :disabled="readOnly" @change="changeTime" v-model="startTime" type="month" placeholder="选择月"></el-date-picker>
      </template>
      -
      <template>
        <el-date-picker :disabled="readOnly" @change="changeTime" v-model="endTime" type="month" placeholder="选择月"></el-date-picker>
      </template>
    </el-form-item>
    <div class="sale_box">
      <template>
        <el-table :data="tableInfo" border style="width: 100%">
          <template v-if="tableData.data" v-for="(item,index) in tableData.data">
            <el-table-column prop="date" :label="item.key" width="180">
              <template slot-scope="scope">
                <span v-if="readOnly" class="table_input_read">{{item.value?item.value:'-'}}</span>
                <el-input v-else v-model="tableData.data[index].value"  style="width: 90%;">
                </el-input>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </template>
      <div class="sale_hj">合计：{{tableData.totalAmt}}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {Format} from '@/utils/index'
  export default {
    name: 'timeTable',
    data () {
      return {
        tableInfo: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    props: {
      readOnly: {
        type: Boolean,
        default() {
          return false
        }
      },
      startTime: {
        type: String,
        default() {
          return ''
        }
      },
      endTime: {
        type: String,
        default() {
          return ''
        }
      },
      tableData: {
        type: Object,
        default() {
          return {
            data: [
              {key: '', value:''}
            ],
            totalAmt: ''
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ]),
    },
    methods: {
      changeTime(){//自有系统平台销售数据 -------------改变时间
        if(!this.startTime||!this.endTime){//非空判断
          return
        }
        if(this.startTime&&(typeof this.startTime)==='object'){
          this.startTime = Format(this.startTime, 'yyyy-MM');
        }
        if(this.endTime&&(typeof this.endTime)==='object'){
          this.endTime = Format(this.endTime, 'yyyy-MM');
        }
        let startTimeNum = new Date(this.startTime).getTime();
        let endTimeNum = new Date(this.endTime).getTime();
        if(startTimeNum>endTimeNum){
          this.$message.error('开始月份不能大于结束月份')
          return
        }
        let _length = Math.round((endTimeNum-startTimeNum)/2678400000)+1;//选择的时间范围的长度
        let _arr = [];
        for(let i=0;i<_length;i++){
          let _item = {
            key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
            value:''
          };
          for(let j=0;j<this.tableData.data.length;j++){
            if(this.tableData.data[j].key ===Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM')){
              _item = {
                key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
                value:this.tableData.data[j].value
              }
              break;
            }else{
              _item = {
                key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
                value:''
              }
            }
          }
          _arr.push(_item);
        }
        this.tableData.data = _arr;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../creditReport/approveDetail.scss";
</style>

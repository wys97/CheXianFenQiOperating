<template>
  <div class="container" style="overflow-y: auto;background-color: #fff;padding: 0 20px 30px;height: 100%;">
  	<!-- <div v-if="isLookImg" ref="lookImgBox" @click="clearImg"  class="look_img_box">
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
  	</div> -->
    <template v-if="agentDetailData">
      	<Agent :add-guarantor="true" :guarantor-id="id">
      	</Agent>
    </template>
  </div>
</template>

<script>
  	import { mapGetters } from 'vuex'
    import Agent from '@/components/agent/agent'
	import defaultImg from '@/assets/imgs/default.jpg'
	import agentDetail from '@/api/agentManage/agentDetail'
	import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'agent',
    components: { Agent },
    data () {
      	return {
	        id: '', // id
	        activeName2:'first',
					agentDetailData:{       //代理商详情数据
						agentName:'',
						agentType:'',
						contactName:'',
						contactMobile:'',
						registerDate:'',
						profitScale:'',
						settleCycle:'',
						agentStatus:'',
						agentDesc:''
					},	     	
	        tableData:[{
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄'
	          }
	        ],
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
      this.id = this.$route.params.id
    },
    mounted () {
    
    },
    methods: {     
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<template>
	<div>
		213123
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
	    recheckData:{
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
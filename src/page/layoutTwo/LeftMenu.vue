<template>
	<div class="left_menu">
		<el-menu :defaultActive="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
			<router-link :to="'/enterpriseDataManage/enterpriseData/'+supplierId">
				<el-menu-item index="1">
					<i class="el-icon-menu"></i>
					<span slot="title">企业资料</span>
				</el-menu-item>
			</router-link>
			<router-link :to="'/enterpriseDataManage/collaterallist/'+supplierId">
				<el-menu-item index="2">
					<i class="el-icon-document"></i>
					<span slot="title">押品资料</span>
				</el-menu-item>
			</router-link>
			<router-link :to="'/enterpriseDataManage/guarantorList/'+supplierId">
				<el-menu-item index="3">
					<i class="el-icon-setting"></i>
					<span slot="title">担保人</span>
				</el-menu-item>
			</router-link>
			
		</el-menu>
	</div>
</template>

<script>
	export default {
		created() {},
		data() {
			return {
				active:"1",
				supplierId:'',//supplierId
			}
		},
		created() {
			this.supplierId = this.$route.params.id
			if(this.supplierId) {
				
			}
		},
		mounted() {
			let _path = this.$route.path
			if(_path.search(/collaterallist/i)!==-1){
				this.active = "2"
			}else if(_path.search(/guarantorList/i)!==-1){
				this.active = "3"
			}else {
				this.active = "1"
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		watch: {
			$route() {
				
				//    this.getBreadcrumb()
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.left_menu {
		width: 250px;
		height: 100%;
		background: #fff;
		position: relative;
		z-index: 111;
	}
	
	.el-menu {
		background-color: #f5f7fa;
	}
	
	.el-menu-item {
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #fff;
	}
	.el-menu-item.is-active{
		background-color: #e9ecf3;
	}
</style>
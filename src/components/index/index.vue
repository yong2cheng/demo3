<template lang="html">
<div class="wrap">
	<htop></htop>
	<navs></navs>
	<main>
	<!--中间版块-->
		<div class="main_index">
			<div class="tool_bar">
				<el-date-picker
					style="width: 150px;"
					v-model="time"
					type="date"
					placeholder="选择日期"
					value-format="yyyy-MM-dd">
				</el-date-picker>
				<!-- <button type="button" class="text" @click="getData()">查询</button> -->
			</div>
			<modelExceptionMiddle :datas="time"/>
			<modelExceptionBottom :datas="time"/>
			<modelExceptionTop :datas="time"/>
		</div>
	</main>
	<foot/>
</div>
</template>

<script>
import htop from '@/components/common/htop'
import navs from '@/components/common/nav'
import modelExceptionTop from './index-main/modelExceptionTop'
import modelExceptionMiddle from './index-main/modelExceptionMiddle'
import modelExceptionBottom from './index-main/modelExceptionBottom'
import foot from '@/components/common/foot'
import overlay from '@/components/common/overlay'
export default {
	data: function() {
		return {
			time:'',
		}
	},
	components:{
		navs,
		htop,
		modelExceptionTop,
		modelExceptionMiddle,
		modelExceptionBottom,
		foot,
		overlay
	},
	created: function() {
	},
	mounted: function() {
		this.time = this.$day().format('YYYY-MM-DD');
	},
	methods: {
	}
}
</script>

<style lang="css">
	.clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
	.main_index{border: 1px solid #0d7474;width: 96%;margin: 30px auto;}
	.tool_bar{width: 100%;border-bottom: 1px solid #0d7474;height: 50px;line-height: 50px;box-sizing: border-box;text-align: right;padding-right: 30px;}
	.main_index_top {width:96%;margin:30px auto 0; border:1px solid #0d7474; background:#043434; box-shadow:0 1px 2px rgba(0,0,0,.8);}
	.main_index_title {width:100%;height: 30px;background: #027676;border-bottom: 1px solid #035e5f;line-height: 32px;text-shadow: 0 1px 1px rgba(0,0,0,.8);text-align: center;font-size: 18px;color: #fff;opacity: .9;font-weight: bold;}
	.main_index_count {width:100%;background: rgba(0, 120, 120, 0.4)}
	.main_index_count_left {float:left;width: 20%;height:420px; padding:5px 5px;border-right:1px solid #0d7474; box-sizing:border-box;font-size:13px; color:#fff; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.xjsy_bangbox { float:left; float:left; width:98%; margin:25px 1% 0; background:rgba(0, 120, 120, 0.4);}
	.xjsj_table { float:left; width:38%; margin:1%;}
	.xjsj_bang {  float:left; width:59%; height:421px; margin:1% 0;background: rgba(0, 120, 120, 0.4)}
	.yzxqjbox { float:left; width:98%; height:80vh; margin:120px 1% 0; position:relative;}
	.main_index_middle {width:96%;margin:30px auto 0;}
	.main_index_middle .jycq_title{float: left;width: 4%;height: 120px;padding: 60px 0;background: rgba(0, 120, 120, 1);text-align: center;color: #fff;font-weight: normal;font-size: 22px;text-shadow: 0 1px 1px rgba(0,0,0,.3);line-height: 30px;}
	.main_index_middle .jycq_count_all {display: inline-block;width: 96%}
	.main_index_middle .jycq_count_all .jycq_count{float: left;width: 15.66%;height: 240px;margin-left: 1%;background: rgba(0, 120, 120, 0.4);font-weight: bold}
	.main_index_middle .jycq_count_all .jycq_count h3 {width:96%; height:40px; margin:0 2%; text-align:center; color:#84f1f1;font-size:18px; line-height:40px; border-bottom:1px solid #027676;text-shadow:0 1px 1px rgba(0,0,0,.3);}
	.main_index_middle .jycq_count_all .jycq_count .yzxdata {width:90%; height:138px; margin:10px 5%;}
	.main_index_middle .jycq_count_all .jycq_count .yzxdata p { height:34px; line-height:34px; font-size:16px; color:#fff;}
	.main_index_middle .jycq_count_all .jycq_count .newtime { width:100%; height:40px; line-height:40px; color:#fff; color:#84f1f1; font-size:16px; font-family:Arial; border-top:1px dashed #027676;}
	.main_index_middle .jycq_count_all .jycq_count .newtime span { float: left;width:48px; height:40px; margin-right:4%;background: url(../../assets/img/gxsj.png) center no-repeat}
	.main_index_middle .jycq_count_all .jycq_count .newtime p{float: left;}
	.main_index_bottom {width:96%;margin:30px auto;border:1px solid #0d7474;}
	.main_index_bottom .mxyl_pie {width: 100%;height: 400px;}
	.count_common{float: left;width: 49%;border: 1px solid #0d7474;box-sizing:border-box;background: #043434;box-shadow: 0 1px 2px rgba(0,0,0,.8);}
	.cjcgl_count {margin-left:2%;}
	.clickable {color:#f6726c !important;cursor: pointer}
	.count_top_tc {height: 600px;width:96%;margin: 10px auto;padding:50px 0;box-sizing: border-box}
	.count_top_tc .btnes {float: right;margin-top: 2px} 
	.paging {width: 94%;margin: 35px 3%;text-align: right}
	.overlay_tc {height:90%; width:1398px}
	@media (max-width:1399px){
		.overlay_tc{ width:1208px;}
		.main_index_middle .jycq_count_all .jycq_count .newtime  { font-size:14px;}
		.main_index_middle .jycq_count_all .jycq_count .newtime span {margin-right:0%; }
	}
	@media (max-height:700px){
		.count_top_tc {height: 580px;}
	}
</style>
	  
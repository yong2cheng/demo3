<template lang="html">
    <div class="main_index_middle clearfix">
        <h2 class="jycq_title">校<br>验<br>抽<br>取</h2>
        <div class="jycq_count_all clearfix" v-for="(item,index) in modelChange">
            <div class="jycq_count">
                <h3>数据中心</h3>
                <div class="yzxdata">
                    <p>累计总条目：{{item.accumulative}}</p>
                    <p>本日新增：<span class="clickable" @click="getTcDetails(item,0,0)">{{item.add}}</span></p>
                    <p>本日更新：<span class="clickable" @click="getTcDetails(item,1,0)">{{item.update}}</span></p>
                    <p>本日删除：<span class="clickable" @click="getTcDetails(item,2,0)">{{item.delete}}</span></p>
                </div>
                <!-- <div class="newtime clearfix"><span></span><p>2018-04-2 18:09:00</p></div> -->
            </div>
            <div class="jycq_count">
                <h3>用电信息采集</h3>
                <div class="yzxdata">
                    <p>累计总条目：0</p>
                    <p>本日新增：0</p>
                    <p>本日更新：0</p>
                    <p>本日删除：0</p>
                </div>
            </div>
            <div class="jycq_count">
                <h3>OMS/SCADA</h3>
                <div class="yzxdata">
                    <p>累计总条目：0</p>
                    <p>本日新增：0</p>
                    <p>本日更新：0</p>
                    <p>本日删除：0</p>
                </div>
            </div>
            <div class="jycq_count">
                <h3>TMR</h3>
                <div class="yzxdata">
                    <p>累计总条目：0</p>
                    <p>本日新增：0</p>
                    <p>本日更新：0</p>
                    <p>本日删除：0</p>
                </div>
            </div>
            <div class="jycq_count">
                <h3>PMS</h3>
                <div class="yzxdata">
                    <p>累计总条目：0</p>
                    <p>本日新增：0</p>
                    <p>本日更新：0</p>
                    <p>本日删除：0</p>
                </div>
            </div>
            <div class="jycq_count">
                <h3>GIS</h3>
                <div class="yzxdata">
                    <p>累计总条目：0</p>
                    <p>本日新增：0</p>
                    <p>本日更新：0</p>
                    <p>本日删除：0</p>
                </div>
            </div>
        </div>
    
        <!-- 点击数字弹框 -->
        <overlay :close.sync="isShow">
            <div class="overlay_tc"> 
                <div class="count_top_tc">
                    <div>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table" style="table-layout: auto">
                            <thead>
                                <tr>
                                    <td colspan="5" class="count_bottom_title clearfix">数据中心{{oprationName}}详情
                                        <!-- <button class="btnes" @click="getDownload()">下载</button> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th>序号</th>
                                    <th>资产单位</th>
                                    <th>类型</th>
                                    <th>ID</th>
                                    <th>名称</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(item,index) in changeModel">
                                        <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                        <td>{{item.zcdw}}</td>
                                        <td>{{item.recodeType}}</td>
                                        <td>{{item.objId}}</td>
                                        <td>{{item.objName}}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                        background
                        class="paging"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="dataCount">
                    </el-pagination>
                </div>
            </div>
        </overlay>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import overlay from '@/components/common/overlay'
    export default {
        data: function() {
            return {
                // recodeType: {"0":"公用变电站","1":"公用配变","2":"10千伏线路","3":"高压用户"},
                modelChange:'',
                isShow:false,
                changeModel:'',
                dataObj:'',
                dayDate:'',
                oprationName:'',
                pageSize:10,
                pageIndex:1,
                dataCount:null,
                pageCount:null,
            }
        },
        components:{
            overlay
        },
        props:['datas'],
        watch: {
            datas:{
                handler(news) {
                    this.dayDate = this.datas;
                    this.getModelChangeByDay();
                },
                deep:true
            }
        },
        created: function() {
        },
        mounted: function() {
            this.$nextTick(() => {
                // let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
                })
        },
        methods: {
            // 获取每天多个系统的模型变更情况
            getModelChangeByDay: function() {
                this.$http.get("web-interface/consistency/getModelChangeByDay",{
                    params:{
                        changeDate:this.dayDate,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.modelChange = res.data.data.model_change;
                            // if(this.modelCount.length>0) {
                            //     this.mxycColumnar();
                            // }
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }, 
            // 弹框查看某个模型之间的偏差明细
            getTcDetails: function(data,oprationType,flag) {
                if(flag == 0) {
                    this.pageSize=10;
                    this.pageIndex=1;
                }
                if(oprationType == 0) {
                    this.oprationName="新增"
                } else if(oprationType == 1) {
                    this.oprationName="更新"
                } else if(oprationType == 2) {
                    this.oprationName="删除"
                }
                this.isShow = true;
                this.dataObj =data;
                this.oprationType = oprationType;
                this.$http.get("web-interface/consistency/getModelChangeDetail",{
                    params:{
                        changeDate:this.dayDate,
                        oprationType:oprationType,
                        pageSize:this.pageSize,
                        pageIndex:this.pageIndex
                    }
                })
                .then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        this.changeModel = res.data.data.model_change_detail;
                        this.dataCount = res.data.dataCount;
                    }
                }
                }).catch(function(error) {
                    console.log(error);
                });
            },
            // 改变当前页条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getTcDetails(this.dataObj,this.oprationType,1);
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getTcDetails(this.dataObj,this.oprationType,1);
            },
        }
    }
</script>
    
<style lang="css">
</style>
    
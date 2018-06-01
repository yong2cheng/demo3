<template lang="html">
    <div class="main_index_top">
        <h2 class="main_index_title">模型类差异汇总</h2>
        <div class="main_index_count clearfix">
            <div class="xjsj_table">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <tbody v-for="(item,index) in modelCount">
                        <tr>
                            <td colspan="5" class="add_color">{{recodeType[item.recodeType]}}</td>
                        </tr>
                        <tr>
                            <td>视图区</td>
                            <td>偏差</td>
                            <td>缓冲区</td>
                            <td>偏差</td>
                            <td v-if="index == 3">SG186</td>
                            <td v-else>PMS</td>
                        </tr>
                        <tr>
                            <td>{{item.system1}}</td>
                            <td class="clickable" @click="getTcDetails(item,1,0)">{{Math.abs(item.system1-item.system2)}}</td>
                            <td>{{item.system2}}</td>
                            <td class="clickable" @click="getTcDetails(item,2,0)">{{Math.abs(item.system2-item.system3)}}</td>
                            <td>{{item.system3}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="xjsj_bang" id="mxyc_columnar">模型类异常分类饼图</div>
        </div>
        <!-- 点击数字弹框 -->
        <overlay :close.sync="isShow">
            <div class="overlay_tc"> 
                <div class="count_top_tc">
                    <div>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table" style="table-layout: auto">
                            <thead>
                                <tr>
                                    <td colspan="5" class="count_bottom_title clearfix">{{recodeType[dataObj.recodeType]}}详情
                                        <!-- <button class="btnes" @click="getDownload()">下载</button> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th>序号</th>
                                    <th>资产单位</th>
                                    <th>系统</th>
                                    <th>ID</th>
                                    <th>名称</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(item,index) in differenceModel">
                                        <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                        <td>{{item.zcdw}}</td>
                                        <td>{{item.dateSource}}</td>
                                        <td>{{item.objId}}</td>
                                        <td>{{item.objName}}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <div class="scroll1" style="position:relative;height:360px;overflow:hidden;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                            <tbody>
                                <tr v-for="(item,index) in dymxAry">
                                    <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                    <td>{{item.zcdw}}</td>
                                    <td>{{item.dateSource}}</td>
                                    <td>{{item.objId}}</td>
                                    <td>{{item.objName}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->
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
    import overlay from '@/components/common/overlay'
    import BScroll from 'better-scroll'
    export default {
        data: function() {
            return {
                recodeType: {"0":"公用变电站","1":"公用配变","2":"10千伏线路","3":"高压用户"},
                modelCount:'',  
                isShow:false,
                dataObj:'',
                differenceModel:'',
                differenceType:'',
                dayDate:'',
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
                    this.getModelCount();
                },
                deep:true
            }
        },
        created: function() {
        },
        mounted: function() {
            this.$nextTick(() => {
                // let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
            });
        },
        methods: {
            // 获取多个系统的多个模型汇总数量
            getModelCount: function() {
                this.$http.get("web-interface/consistency/getModelCount",{
                    params:{
                        recodeData:this.dayDate,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.modelCount = res.data.data.model_count;
                            if(this.modelCount.length>0) {
                                this.mxycColumnar();
                            }
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }, 
            
            // 柱状图
            mxycColumnar: function() {
                var data1 = [],data2 = [],data3 = [],data4 = [],data5 = [];
                var mxyc_columnar = echarts.init(document.getElementById('mxyc_columnar'),'dark');

                for(var key in this.recodeType) {
                    data1.push(this.recodeType[key]);
                }

                for(var i= 0;i<this.modelCount.length;i++) {
                    data2.push(this.modelCount[i].system1);
                    data3.push(this.modelCount[i].system2);
                    data4.push(this.modelCount[i].system3);
                }
                
                var option1 = {
                    // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
                    backgroundColor: '#00787866',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                            top:10,
                            data:data1,
                            
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        itemGap: 16,
                        right: 25,
                        top: 'center',
                        iconStyle: {
                            "normal": {
                                "borderColor": "#eeeeee"
                            },
                            "emphasis": {
                                "borderColor": "#eeeeee"
                            }
                        },
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: data1
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                        }
                    ],

                    series: [
                        {
                            name: '视图区',
                            type: 'bar',
                            data: data2
                        },
                        {
                            name: '缓冲区',
                            type: 'bar',
                            data: data3
                        },
                        {
                            name: '业务系统',
                            type: 'bar',
                            data: data4
                        }
                    ]
                };
                mxyc_columnar.setOption(option1);
            },
            // 弹框查看某个模型之间的偏差明细
            getTcDetails: function(data,differenceType,flag) {
                if(flag == 0) {
                    this.pageSize=10;
                    this.pageIndex=1;
                }
                this.differenceType = differenceType;
                this.isShow = true;
                this.dataObj =data;
                this.$http.get("web-interface/consistency/getDifferenceModelDetail",{
                    params:{
                        recodeDate:this.dayDate,
                        recodeType:data.recodeType,
                        differenceType:differenceType,
                        pageSize:this.pageSize,
                        pageIndex:this.pageIndex
                    }
                })
                .then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        this.differenceModel = res.data.data.difference_model_detail;
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
                this.getTcDetails(this.dataObj,this.differenceType,1);
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getTcDetails(this.dataObj,this.differenceType,1);
            },
            // // 表格下载
            // getDownload: function() {
            //     this.$http.get("/quotaService/quota/outBusbarDetail",{
            //         params:{
            //             sign:this.token,
            //             month:this.dayDate,
            //             bvId:this.dataObj.bvId,
            //             type:3,
            //         }
            //     })
            //     .then((res) => {
            //         window.location =res.request.responseURL;
            //     }).catch(function(error) {
            //     console.log(error);
            //     });
            // }
        }
    }
</script>
    
<style lang="css">
    .add_color {background: rgba(0, 120, 120, 0.6)}
    .mxbphl {height: 450px;}
</style>
    
    
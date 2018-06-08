<template lang="html">
        <div class="wrap">
            <htop></htop>
            <navs></navs>
            <main>
            <!--中间版块-->
                <div class="main_index">
                    <div class="tool_bar">
                        <h2>{{sourceName}}•{{oprationName}}</h2>
                        <select v-model="oprationId" name="" @change="getSelected">
                            <option :key="index" v-for="(item,index) in oprationArr" :value="item.value">{{item.name}}</option>
                        </select>
                        <el-date-picker
                            style="width: 150px;"
                            v-model="time"
                            type="date"
                            placeholder="选择日期"
                            onPick="tset"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="mxyl_pie" id="mxyl_pie"></div>
                    <!-- 点击弹框 -->
                    <overlay :close.sync="isShow">
                        <div class="overlay_tc"> 
                            <div class="count_top_tc">
                                <div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table oprationTable" style="table-layout: auto">
                                        <thead>
                                            <tr>
                                                <td :colspan="tableHeadLength" class="count_bottom_title clearfix">{{titleName}}{{oprationName}}详情
                                                    <!-- <button class="btnes" @click="getDownload()">下载</button> -->
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>序号</th>
                                                <th v-for="(item,index) in firstChangeModel">{{item.name}}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                <tr v-for="(item,index) in changeModel">
                                                    <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                                    <td v-for="(items,indexs) in item.detail" :class="{color_show:items.oldValue}" >
                                                      <el-popover
                                                        v-if="items.oldValue"
                                                        placement="top-start"
                                                        width="100"
                                                        trigger="hover">
                                                        <p style="margin-bottom: 10px">该字段修改前的值:</p>
                                                        <p>{{items.oldValue}}</p>
                                                        <el-button slot="reference" :class="{color_show:items.oldValue,show_button:showButton}" disableed="disableed">{{items.newValue}}</el-button>
                                                      </el-popover>
                                                      <span :class="{show_button:showButton}" v-if="!items.oldValue">{{items.newValue}}</span>
                                                    </td>
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
            </main>
            <foot/>
        </div>
        </template>
        
        <script>
        import htop from '@/components/common/htop'
        import navs from '@/components/common/nav'
        import foot from '@/components/common/foot'
        import overlay from '@/components/common/overlay'
        export default {
            data: function() {
                return {
                    isShow:false,
                    showButton:true,
                    time:'',
                    oprationName:'',
                    sourceName:'',
                    oprationArr:'',
                    oprationId:'',
                    query:'',
                    modelType:'',
                    pageSize:10,
                    pageIndex:1,
                    dataCount:null,
                    pageCount:null,
                    changeModel:'',
                    firstChangeModel:'',
                    tableHeadLength:'',
                    titleName:'',
                    myPie:''
                }
            },
            components:{
                navs,
                htop,
                foot,
                overlay
            },
            watch: {
                time:{
                    handler(news) {
                        if(news !=null) {
                            this.ChangeDetailStatis()
                        }
                    },
                    deep:true
                }
            },
            created: function() {
                this.oprationArr = [{name:"新增",value:0},{name:"更新",value:1},{name:"删除",value:2}]
                this.query = this.$route.query
                this.time = this.query.time
                this.oprationName = this.query.oprationName
                this.sourceName = this.query.sourceName
                for(var item of this.oprationArr) {
                    if(item.name == this.oprationName) {
                        this.oprationId = item.value;
                    }
                }
                // this.ChangeDetailStatis();
            },
            mounted: function() {
            },
            methods: {
                // 获取每天多个系统的模型变更情况
            ChangeDetailStatis: function() {
                this.$http.get("web-interface/modelChange/getModelChangeDetailStatis",{
                    params:{
                        time:this.time,
                        systemType:this.query.source,
                        oprationType:this.oprationId
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            var detail_statis = res.data.data.detail_statis
                            if(detail_statis) {
                                this.ChangeDetailStatisPie(detail_statis)
                            }
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }, 

            // 采集成功率排名
            ChangeDetailStatisPie: function(data) {
                if(this.myPie) {
                    this.myPie.dispose();
                }
                var _this = this
                this.myPie = echarts.init(document.getElementById('mxyl_pie'),'dark');
                var option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove',
                    },
                    series:[
                        {
                            type: 'tree',

                            name: '数据来源表',

                            data: [data],

                            top: '5%',
                            left: '25%',
                            bottom: '5%',
                            right:'25%',

                            symbolSize: 15,

                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    color:'#fff',
                                    backgroundColor: '#dd6b66',
                                    padding:  5,
                                }
                            },

                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left',
                                        
                                    }
                                }
                            },

                            expandAndCollapse: true,

                            animationDuration: 550,
                            animationDurationUpdate: 750

                        },
                    ]
                };
                this.myPie.setOption(option);

                this.myPie.on('click', function (params) {
                    if(params.data.type) {
                        _this.titleName = params.data.title
                        _this.getTcDetails(params.data.type,0)
                    }
                });
            },
            getSelected() {
                for(var item of this.oprationArr) {
                    if(item.value == this.oprationId) {
                        this.oprationName = item.name;
                    }
                }
                this.ChangeDetailStatis()
            },
            // 弹框查看某个模型之间的偏差明细
            getTcDetails(modelType,flag) {
                if(flag == 0) {
                    this.pageSize=10;
                    this.pageIndex=1;
                }
                this.modelType = modelType
                this.isShow = true;
                this.$http.get("web-interface/modelChange/getModelChange",{
                    params:{
                        time:this.time,
                        oprationType:this.oprationId,
                        systemType:this.query.source,
                        modelType:modelType,
                        pageSize:this.pageSize,
                        pageIndex:this.pageIndex
                    }
                })
                .then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        this.changeModel = res.data.data.model_change_detail;
                        if(this.changeModel.length>0) {
                            this.firstChangeModel = res.data.data.model_change_detail[0].detail;
                            this.tableHeadLength = this.firstChangeModel.length+1
                        }
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
                this.getTcDetails(this.modelType,1);
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getTcDetails(this.modelType,1);
            },
            tset() {
                console.log(11111111)
            }
        }  
    }
        </script>
        
        <style lang="css">
            .clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
            .main_index{border: 1px solid #0d7474;width: 96%;margin: 30px auto 0;height: 702px;box-sizing: border-box;}
            .tool_bar{width: 100%;border-bottom: 1px solid #0d7474;height: 50px;line-height: 50px;box-sizing: border-box;text-align: right;padding-right: 30px;}
            .tool_bar h2 {float: left;margin-left: 30px;font-size: 20px;color: #84f1f1;}
            .tool_bar select {width:80px}
            .mxyl_pie {width: 100%;height: 650px;}
            .count_top_tc {height: 600px;width:96%;margin: 10px auto;padding:50px 0;box-sizing: border-box}
            .count_top_tc .btnes {float: right;margin-top: 2px} 
            .count_top_tc .oprationTable td {padding: 0 !important}
            .paging {width: 94%;margin: 35px 3%;text-align: right}
            .overlay_tc {height:90%; width:1398px}
            .color_show {color:#f6726c !important;cursor: pointer;}
            .show_button{background:rgba(0,0,0,0);margin-left: 0;height: 34px;width:100%}
            .show_button:hover {background: rgba(0,0,0,0) !important}
            .oprationTable .el-popover__reference:focus:hover, .oprationTable .el-popover__reference:focus:not(.focusing) {background: rgba(0,0,0,0) !important}
            @media (max-width:1399px){
                .overlay_tc{ width:1208px;}
            }
            @media (max-height:700px){
                .count_top_tc {height: 580px;}
            }
        </style>
              
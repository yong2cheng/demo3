<template lang="html">
    <div class="main_index_middle clearfix">
        <h2 class="jycq_title">校<br>验<br>抽<br>取</h2>
        <div class="jycq_count_all clearfix" v-for="(item,index) in modelChange">
            <div class="jycq_count">
                <h3>{{item.sourceName}}</h3>
                <div class="yzxdata">
                    <p>累计总条目：{{item.accumulative}}</p>
                    <p>本日新增：<span class="clickable" @click="getDetails(item,0)">{{item.add}}</span></p>
                    <p>本日更新：<span class="clickable" @click="getDetails(item,1)">{{item.update}}</span></p>
                    <p>本日删除：<span class="clickable" @click="getDetails(item,2)">{{item.delete}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data: function() {
            return {
                // recodeType: {"0":"公用变电站","1":"公用配变","2":"10千伏线路","3":"高压用户"},
                modelChange:'',
                changeModel:'',
                dataObj:'',
                dayDate:'',
                oprationName:'',
                firstChangeModel:''
            }
        },
        components:{
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
                this.$http.get("web-interface/modelChange/getModelChangeStatis",{
                    params:{
                        time:this.dayDate,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.modelChange = res.data.data.model_change_statis;
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }, 

            // 点击校验抽取模型增，改，查详情
            getDetails(data,oprationType) {
                if(oprationType == 0) {
                    this.oprationName="新增"
                } else if(oprationType == 1) {
                    this.oprationName="更新"
                } else if(oprationType == 2) {
                    this.oprationName="删除"
                }
                var { href } = this.$router.resolve({
                    name: "/modeBottomDetail",
                    path: "/modeBottomDetail",
                    query: {
                        sysId: this.$route.query.sysId,
                        sonid: this.$route.query.sonid,
                        time:this.dayDate,
                        oprationName:this.oprationName,
                        sourceName:data.sourceName,
                        source:data.source
                    }
                });
                window.open(href, "_blank");
            },
        }
    }
</script>
    
<style lang="css">
</style>
    
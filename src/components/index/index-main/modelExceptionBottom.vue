<template lang="html">
    <div class="main_index_bottom">
        <div class="main_index_title">模型类异常分类饼图 </div>
        <div class="mxyl_pie" id="mxyl_pie">模型类异常分类饼图</div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                
            }
        },
        components:{
        },
        watch: {
            isShow:{
                handler(news) {
                    
                },
                deep:true
            }
        },
        created: function() {
        },
        mounted: function() {
            this.successRanking();
        },
        methods: {
            // 获取每天多个系统的模型变更情况
            // getModelChangeByDay: function() {
            //     this.$http.get("web-interface/consistency/getModelChangeByDay",{
            //         params:{
            //             changeDate:this.dayDate,
            //         }
            //     }).then((res) => {
            //         if (res.status == 200) {
            //             if(res.data.code == 1) {
                            
            //             }
            //         }
            //     }).catch(function(error) {
            //         console.log(error);
            //     });
            // }, 

            // 采集成功率排名
            successRanking: function() {
                var mxyl_pie = echarts.init(document.getElementById('mxyl_pie'),'dark');
                // app.title = '模型类异常分类饼图';

                var option = {
                    backgroundColor: '#00787866',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        textStyle: {
                            color: '#fff'
                        },
                        orient: 'vertical',
                        x: 'left',
                        data:['营销业务','用电信息采集','OMS/SCADA系统','TMR系统','PMS系统','GIS系统']
                    },
                    series: [

                        {
                            name:'不一致表数目',
                            type:'pie',
                            selectedMode: 'single',
                            radius: [0, '40%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'营销业务'},
                                {value:679, name:'用电信息采集'},
                                {value:1548, name:'OMS/SCADA系统'},
                                {value:135, name:'TMR系统'},
                                {value:1048, name:'PMS系统'},
                                {value:251, name:'GIS系统'}
                            ]
                        },
                        {
                            name:'系统业务来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#666',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33,
                                            color:'#999'
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data:[
                                {value:335, name:'营销业务应用系统表总数'},
                                {value:310, name:'用电信息采集表总数'},
                                {value:234, name:'OMS/SCADA系统表总数'},
                                {value:135, name:'TMR系统表总数'},
                                {value:1048, name:'PMS系统表总数'},
                                {value:251, name:'GIS系统表总数'}
                            ]
                        }
                    ]
                };
                mxyl_pie.setOption(option);
            },
        }  
    }
</script>
    
<style lang="css">
</style>
    
    
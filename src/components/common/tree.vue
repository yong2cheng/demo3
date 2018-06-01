<template lang="html">
  <ul class="tree_main">
    <li class="tree-menu" v-for="(item,index) in data" :class="[bindIcon(item.attribute),item.attribute==$attrs.lastAttr?'noFoldesr':'',open[index]?'isOpen':'']">
      <span @click.stop="sendData(item,index)">{{item.name}}</span>
      <tree v-if="item.children&&open[index]" @sendTreeInfo="sendChildData" :lastAttr=$attrs.lastAttr :data="item.children"></tree>
      <!--  lastAttr的值有父级传过来，声明最后层级的属性-->
    </li>
  </ul>
</template>
<script>
export default {
  name:'tree',
  data(){
    return{
      open:{},
      folderIconList: [],
    }
  },
  props:['data'],
  inheritAttrs: false,//获取父级上非props的属性，$attrs
  created(){
     console.log(this.$attrs)
  },
  methods:{
    loadingIcon (index) {
      this.$set(this.open, index, !this.open[index]);
      this.folderIconList[index] = this.open[index] ? 'isOpen' : 'tree-menu';
    },
    sendData(item,index){
        this.$emit("sendTreeInfo",item,(callbackData)=>{//回调函数返回点击加载的下一级菜单
          console.log("传给树的数据"+callbackData);
          if (callbackData.children) {
            console.log(index);
          }
        });
      this.$set(this.open, index, !this.open[index]);
    },
    sendChildData(item,index){//递归也需要触发事件函数
        this.$emit("sendTreeInfo",item,(callbackData)=>{//回调函数返回点击加载的下一级菜单
          if (callbackData.children) {
              console.log(callbackData);
          }
        });
    },
    bindIcon(type){//绑定菜单
      let iconClass='';
      if (type == 'systemId') {
        //绑定地区图标
        iconClass='systemId'
      }else if (type == 'bvId') {
        iconClass='bvId'
        //绑定电压图标
      }else if(type == 'sbtId'){
        iconClass='sbtId'
        //绑定厂站图标
      }else if (type == 'dvId') {
        iconClass='dvId'
        //绑定计量点图标
      }else {
        iconClass='other'
        //绑定其他图标
      }
      return iconClass;
    },
  },
}
</script>

<style lang="css">
.tree_main li{
    padding-left: 20px;
}
.tree-menu {
  line-height: 20px;
  margin-top: 4px;
}
.isOpen{
  list-style-image: url(../../assets/img/st_icon_open.png) !important;
}
.tree-menu {
    list-style-image: url(../../assets/img/st_icon.png);
}
.noFoldesr{
    list-style-image: none !important;
}
.tree-menu span {
  display: inline-block;
  width: 100%;
  font-size: 13px;
  cursor: pointer;
  color: #84f1f1;
}
.tree-menu span:hover {
  background-color: rgb(5, 59, 59);
  color: #fff;
}
.icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  vertical-align: -2px;
}
.systemId{
  background-image: url(../../assets/img/area5.gif);
  background-repeat: no-repeat;
}
.bvId{
  background-image: url(../../assets/img/voltaglevel/Vol6.gif);
  background-repeat: no-repeat;
}
.sbtId{
  background-image: url(../../assets/img/factory/Fac1_Vol7.gif);
  background-repeat: no-repeat;
}
.dvId{
  background-image: url(../../assets/img/voltaglevel/Vol5.gif);
  background-repeat: no-repeat;
}
.other{
  background-image: url(../../assets/img/voltaglevel/Vol5.gif);
  background-repeat: no-repeat;
}
</style>

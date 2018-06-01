<template>
<div class="header">
  <div>
    <div class="tLeft">
      <router-link to="/shouye"><img src="../../assets/img/logo.jpg" alt=""></router-link>
    </div>
    <h2 class="title">数据中心数据质量全生命监控</h2>
    <div class="tRight">
      <span id="topTime">{{SSTime}}</span> &nbsp;&nbsp;&nbsp;&nbsp;您好:
      <!-- <span class="user">{{getUserName}}</span>&nbsp;&nbsp;&nbsp;&nbsp; -->
      <!-- <a href="javascript:;" @click="quit()" class='color_warning'>退出</a> -->
    </div>
  </div>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      SSTime: '',
      userName: '',
    }
  },
  methods: {
    // quit() {
    //   sessionStorage.clear();
    //   this.$router.push('/login');
    // }
  },
  mounted: function() {
    setInterval(() => {
      var a = new Date();
      this.SSTime = a.toLocaleString();
    }, 1000);
  },
  computed: {
    // getUserName() {
    //   if (sessionStorage.getItem('userName')) {
    //     this.userName = sessionStorage.getItem('userName');
    //     return this.userName;
    //   } else {
    //     this.$router.push('/login');
    //     return false;
    //   }
    // }
  }
}
</script>
<style>
.header {
  background: url('../../assets/img/htop_bg.jpg') repeat;
  border-bottom: 1px solid #024244;
}

.header>div {
  background: url('../../assets/img/t_bg.png') no-repeat right 2%;
}

.header>div>.tLeft {
  display: inline-block;
  vertical-align: bottom;
  padding: 0 10px 0 10px;
  background: url('../../assets/img/top_ge.png') no-repeat right center;
}

.header>div>.title {
  display: inline-block;
  height: 64px;
  margin-left: 10px;
  font-size: 26px;
  line-height: 64px;
  color: #e9fafa;
  font-weight: normal;
  letter-spacing: 2px;
}

.header .tRight {
  float: right;
  font-size: 12px;
  line-height: 32px;
  margin-right: 15px;
  letter-spacing: 1px;
}
</style>

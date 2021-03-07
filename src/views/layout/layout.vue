<template>
<el-container class="layout-container">
  <el-aside width="auto">
      <appAside class="app-aside" :isCollapse="isCollapse" />
  </el-aside>
  <el-container>
    <el-header>
   <div>
      <i class="el-icon-s-fold logo" @click="isCollapse = !isCollapse" ></i>
    <span>黑马培训</span>
   </div>
   <el-dropdown >
    <div class="right">
       <img class="img" src="@/views/login/logo_index.png">
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
    </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
import appAside from './components/appAside'
export default {
  name: 'layout',
  components: {
    appAside

  },
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },

  computed: {},

  created () {},

  mounted () {},

  methods: {},

  watch: {}

}

</script>
<style scoped lang="less">
.layout-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.el-header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .logo {
      margin-right: 5px;
    }
  }
  .el-aside {
    background-color: #012032;
    .app-aside {
      height: 100%;
    }
  }
  .el-main {
    background-color: #EEF3;
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 15px;
  }
  .right {
    display: flex;
    align-items: center;
  }
</style>

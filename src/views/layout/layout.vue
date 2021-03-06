<template>
<el-container class="layout-container">
  <el-aside width="200px">
      <Aside class="aside"/>
  </el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
import Aside from './components/aside'
export default {
  name: 'layout',
  components: {
    Aside
  },
  props: {},
  data () {
    return {

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
  }
  .el-aside {
    background-color: #012032;
  }
  .el-main {
    background-color: #E9EEF3;
  }
</style>

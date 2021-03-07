<template>
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#012032"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse = "isCollapse"
      >
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
</template>

<script>

export default {
  name: 'appAside',
  components: {},
  props: ['isCollapse'],
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
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height:400px;
  }

</style>

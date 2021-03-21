<template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>素材管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple">1</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">2</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">3</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">4</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">5</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">6</div></el-col>
</el-row>
</el-card>
</template>

<script>

export default {
  name: 'appImage',
  components: {},
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

</style>

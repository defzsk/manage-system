<template>
<el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#012032"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse = "isCollapse"
      router
      >
      <el-menu-item :index="item.index" v-for="item in items" :key="item.index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
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
      items: [
        {
          index: '/',
          icon: 'el-icon-s-home',
          title: '首页'
        },
        {
          index: '/article',
          icon: 'el-icon-document',
          title: '内容管理'
        },
        {
          index: '/image',
          icon: 'el-icon-notebook-1',
          title: '首素材管理'
        },
        {
          index: '/publish',
          icon: 'el-icon-s-promotion',
          title: '发布文章'
        },
        {
          index: '/comment',
          icon: 'el-icon-chat-square',
          title: '评论管理'
        },
        {
          index: '/fans',
          icon: 'el-icon-menu',
          title: '粉丝管理'
        },
        {
          index: '/setting',
          icon: 'el-icon-setting',
          title: '个人设置'
        }
      ]
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

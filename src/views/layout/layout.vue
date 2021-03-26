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
       <img class="img" :src="user.photo">
  <span class="el-dropdown-link">
    {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
    </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>设置</el-dropdown-item>
    <el-dropdown-item @click.native="onlogout">退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import appAside from './components/appAside'
import { getUserData } from '@/api/user'
import globalBus from '@/utils/globalBus'
export default {
  name: 'layout',
  components: {
    appAside
  },
  props: {},
  data () {
    return {
      isCollapse: false,
      user: {}
    }
  },

  computed: {},

  created () {
    this.loadUserData()
    globalBus.$on('update', (data) => {
      // this.user.name = data.name
      console.log(data.photo)
      this.user.photo = data.photo
      this.loadUserData()
    })
  },

  mounted () {},

  methods: {
    loadUserData () {
      getUserData().then(res => {
        // console.log(res.data.data)
        this.user = res.data.data
      })
    },
    onlogout () {
      this.$confirm('此操作将删除用户资料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
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

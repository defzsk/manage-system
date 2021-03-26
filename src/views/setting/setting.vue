<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>个人设置管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
    <!-- 表单 -->
  <el-row>
  <el-col :span="15">
     <el-form class="formBox" ref="form" :model="user" label-width="80px">
    <el-form-item label="编号">{{user.id}}</el-form-item>
    <el-form-item label="手机号">{{user.mobile}}</el-form-item>
  <el-form-item label="媒体名称">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="user.intro"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="user.email"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit(user)">保存</el-button>
  </el-form-item>
</el-form>
  </el-col>
  <el-col :span="5" :offset="3">
    <!-- 上传头像区域 -->
    <label for="file">
      <el-avatar shape="square" :size="200" fit="fit" :src="user.photo" ></el-avatar>
   <p>点击修改头像</p>
   <input type="file" ref="file" hidden id="file" @change="undateImage()">
    </label>
  </el-col>
</el-row>
</el-card>
</template>

<script>
import { getUserData, editUserProfile, editUserAvatar } from '@/api/user'
import globalBus from '@/utils/globalBus'
export default {
  name: 'setting',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '1',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {
        id: null,
        email: '',
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }
    }
  },

  computed: {},

  created () {
    this.loadGetUserData()
  },

  mounted () {},

  methods: {
    loadGetUserData () {
      getUserData().then((res) => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onSubmit (user) {
      // console.log(user)
      editUserProfile(user).then((res) => {
        // console.log(res)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        globalBus.$emit('update', this.user)
      })
    },
    undateImage () {
      // 获取上传的文件对象
      const file = this.$refs.file.files[0]
      const fd = new FormData()
      fd.append('photo', file)
      editUserAvatar(fd).then(res => {
        // console.log(res)
        globalBus.$emit('update', this.user)
        this.loadGetUserData()
      })
    }
  },

  watch: {}

}

</script>
<style scoped lang="less">
</style>

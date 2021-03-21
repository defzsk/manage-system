<template>
  <div class="">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>修改文章</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-form ref="form" :model="article" :rules="rules" label-width="80px">
  <el-form-item label="标题" prop="title">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="content">
    <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
    <el-tiptap  v-model="article.content"
      :extensions="extensions"
      lang="zh"
      height="350"
      placeholder="请输入文章内容"
      ></el-tiptap>
  </el-form-item>
  <el-form-item label="封面">
    <el-radio-group v-model="article.cover.type">
      <el-radio :label="0">单图</el-radio>
      <el-radio label="线下场地免费">三图</el-radio>
      <el-radio label="线上品牌商赞助">无图</el-radio>
      <el-radio label="线下场地免费">自动</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道" prop="channle_id">
    <el-select v-model="article.channel_id" placeholder="请选择活动区域">
      <el-option v-for="channel in channels" :key="channel.id" :label="channel.name" :value="channel.id"></el-option>
      </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onPublish(false)">修改</el-button>
    <el-button @click="onPublish(true)">存入草稿</el-button>
  </el-form-item>
</el-form>
</el-card>

  </div>
</template>

<script>
import { getArticleChannels, getArticle, editArticle } from '@/api/article'
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/image'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Image,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList
} from 'element-tiptap'
export default {
  name: 'editArticle',
  components: { 'el-tiptap': ElementTiptap },
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      channels: [],
      channel_id: null,
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: [],
          channel_id: ''
        }
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList()
      ],
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              // console.log('content validator')
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  computed: {},

  created () {
    this.loadArticleChannels()
    this.loadgetArticle()
  },

  mounted () {},

  methods: {
    loadArticleChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    loadgetArticle () {
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    },
    onPublish (draft = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const articleId = this.$route.query.id
          editArticle(articleId, this.article, draft).then(res => {
            // console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '修改'}成功`,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push('/article')
            }, 2000)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  watch: {}

}

</script>
<style scoped lang="less"></style>

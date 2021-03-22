<template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>素材管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <div class="headNav">
    <el-radio-group v-model="collect" size="small" @change="loadGetImages()">
      <el-radio-button :label= false>全部</el-radio-button>
      <el-radio-button :label= true>收藏</el-radio-button>
    </el-radio-group>
     <el-button type="success" size="small"  @click="upload = true">上传素材</el-button>
     <el-dialog  :visible.sync="upload" append-to-body>
     <el-upload
       class="upload-demo"
       drag
       name="image"
       :headers="uploadHeaders"
       :on-success=" onUploadSuccess"
       action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
       multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-dialog>
  </div>
  <el-row :gutter="20">
  <el-col
   :xs="8"
   :sm="6"
   :md="4"
   v-for="image in images"
   :key="image.id"
   class="image-box"
   >
   <el-image
    style=" height: 100px"
    fit="cover"
    :src="image.url"
    :preview-src-list="[image.url]">
  </el-image>
  <div class="image-bottom">
    <i
    class="icon1"
    :class="{'el-icon-star-off': !image.is_collected, 'el-icon-star-on': image.is_collected}"
    @click="onCollected(image)"
     ></i>
    <i  class="el-icon-delete icon2" @click="onDelete(image)"></i>
  </div>
   </el-col>
   </el-row>
   <!-- 分页 -->
   <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :total="totalCount"
    :page-size= "20"
    @current-change="handleCurrentChange"
    >
  </el-pagination>
</div>
</el-card>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'appImage',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      totalCount: 0,
      page: 1,
      upload: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },

  computed: {},

  created () {
    this.loadGetImages(1)
  },

  mounted () {},

  methods: {
    loadGetImages (page) {
      getImages({
        collect: this.collect,
        page,
        per_page: 20
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    handleCurrentChange (page) {
      this.loadGetImages(page)
    },
    onUploadSuccess () {
      this.upload = false
      // 更新素材列表
      this.loadGetImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onCollected (image) {
      collectImage(image.id, !image.is_collected).then(res => {
        console.log(res)
        image.is_collected = !image.is_collected
      })
    },
    onDelete (image) {
      deleteImage(image.id).then(() => {
        this.loadGetImages(this.page)
      })
    }
  },

  watch: {}

}

</script>
<style scoped lang="less">
.headNav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.block {
  margin-top: 15px
}
.image-box {
  position: relative;
  .image-bottom {
    background-color:rgba(245,245,245,.5);
    height: 25px;
    position: absolute;
    bottom: 0px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content:space-around;
    align-items:center;
  }
}
.icon1 {
  color:#f4a460;
}
.icon2 {
  color: red;
}
</style>

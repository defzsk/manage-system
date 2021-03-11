<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item >内容管理</el-breadcrumb-item>
</el-breadcrumb>
<!-- 面包屑路径导航 -->
 </div>
 <!-- 数据删选表单 -->
 <el-form ref="form" :model="form" label-width="80px">
   <el-form-item label="特殊资源">
    <el-radio-group v-model="status">
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="channelId" placeholder="请选择频道">
       <el-option  label="全部" :value="null"></el-option>
      <el-option v-for="channel in channels"  :key="channel.id" :label="channel.name" :value="channel.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
     <el-date-picker
      v-model="date"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :default-time="['12:00:00']">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click=loadGetArticles(1)>查询</el-button>
  </el-form-item>
 </el-form>
</el-card>
<!-- 数据列表 -->
<el-card class="box-card2">
  <div slot="header" class="clearfix">
    <span>根据筛选条件共查询到 {{total}} 条结果：</span>
  </div>
  <el-table
    :data="articles"
    style="width: 100%">
    <el-table-column
      label="封面"
      width="180">
      <template slot-scope="scope">
         <el-image
      style="width: 50px; height: 50px"
      :src="scope.row.cover.images[0]"
      :fit="fit"></el-image>
       <!-- <img class='image' :src="scope.row.cover.images[0]"/> -->
      </template>
    </el-table-column>
     <el-table-column
      label="标题"
      prop="title"
      width="180">
    </el-table-column>
     <el-table-column
      label="状态"
      width="180">
      <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">草稿</el-tag>
          <el-tag v-else-if="scope.row.status === 1" type="info">待审核</el-tag>
          <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag  v-else-if="scope.row.status === 3" type="warning">审核失败</el-tag>
          <el-tag v-else-if="scope.row.status === 4" type="danger">已删除</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="日期"
      width="190">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.pubdate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$router.push('/publish')">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 列表分页 -->
  <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    @current-change="currentChange">
  </el-pagination>
</div>
</el-card>
  </div>
</template>

<script>
import { getArticles, deleteArticles, getArticleChannels } from '@/api/article'
export default {
  name: 'app-article',
  components: {},
  props: {},
  data () {
    return {
      channels: [],
      articles: [],
      total: 0,
      pageSize: 10,
      page: 1,
      status: null,
      channelId: null,
      date: null
    }
  },

  computed: {},

  created () {
    this.loadGetArticles()
    this.loadArticleChannels()
  },

  mounted () {},

  methods: {
    loadArticleChannels () {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    },
    loadGetArticles (page) {
      getArticles({
        page,
        per_page: 10,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.date ? this.date[0] : null,
        end_pubdate: this.date ? this.date[1] : null
      }).then(res => {
        this.articles = res.data.data.results
        this.total = res.data.data.total_count
        // console.log(status)
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    handleDelete (articleId) {
      // console.log(articleId)
      deleteArticles(articleId).then(res => {
        // console.log(res)
        this.loadGetArticles(this.page)
      })
    },
    currentChange (page) {
      // console.log(page)
      this.loadGetArticles(page)
    }
  },

  watch: {}

}

</script>
<style scoped lang="less">
.box-card2 {
  margin-top: 20px;
}
.image {
  width: 50px;
}
</style>

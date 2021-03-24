<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>评论管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <!-- 表格 -->
  <el-table
    :data="results"
    stripe
    style="width: 100%">
     <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
     <el-table-column
        prop="total_comment_count"
        label="总评论数"
        >
      </el-table-column>
     <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
        >
      </el-table-column>
     <el-table-column
        label="评论状态"
        >
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.comment_status? '正常': '关闭'}}</span>
      </template>
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="scope.row.statusdisabled"
          @change="handleEdit(scope.row)"
          >
        </el-switch>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @current-change="handleCurrentChange"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
</el-card>
</template>

<script>
import { getArticleList } from '@/api/article'
import { updateCommentStatus } from '@/api/comment'
export default {
  name: 'comment',
  components: {},
  props: {},
  data () {
    return {
      value: true,
      comment: 'comment',
      results: [],
      allow_comment: true,
      totalCount: 0
    }
  },

  computed: {},

  created () {
    this.loadGetArticleList()
  },

  mounted () {},

  methods: {
    loadGetArticleList (page) {
      getArticleList({
        page,
        response_type: this.comment
      }).then((res) => {
        console.log(res)
        const { results } = res.data.data
        results.forEach((article) => {
          article.statusdisabled = false
        })
        this.results = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    handleEdit (article) {
      article.statusdisabled = true
      updateCommentStatus(article.id.toString(), article.comment_status).then((res) => {
        article.statusdisabled = false
      })
    },
    handleCurrentChange (page) {
      this.loadGetArticleList(page)
    }
  },

  watch: {}

}

</script>
<style scoped lang="less">

</style>

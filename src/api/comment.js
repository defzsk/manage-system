// 评论模块
import request from '@/utils/request'
// 获取评论
export const getComments = (params, allowComment) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/comments',
    params,
    data: {
      allow_comment: allowComment
    }
  })
}
// 修改评论状态
export const updateCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}

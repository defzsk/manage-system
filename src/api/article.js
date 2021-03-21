import request from '@/utils/request'
// 获取文章列表
export const getArticleList = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
// 删除文章
export const deleteArticles = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
// 文章频道列表
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 新建文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'post',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}
// 获取指定文章
export const getArticle = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
// 编辑文章
export const editArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

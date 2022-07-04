import request from '@/utils/request'

/**
 * @param {文章id} article_id
 * @returns
 *
 */

export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 * 添加关注用户
 * @param {用户id} target
 * @returns
 *
 */

export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings', // 接口
    data: {
      target
    }
  })
}
/**
 * 取消关注用户
 * @param {用户id} target
 * @returns
 *
 */

export const dleUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`// 接口
  })
}

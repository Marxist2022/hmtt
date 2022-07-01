import request from '@/utils/request'// 引入requust
/**
 *我的频道
 *@returns
 */
export const getUserChannels = () => {
  return request({
    url: 'user/channels'// 获取频道
  })
}
/**
 *获取文章列表
 *@returns
 */
export const getArticleList = ({ channelId, timestamp }) => {
  return request({
    url: 'articles', // 获取频道
    params: { channel_id: channelId, timestamp }

  })
}

/**
 *获取所有频道列表数据
 *@returns
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'// 获取频道
  })
}
/**
 *频道数据持久化
 *@returns {*}channels
 */
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels', // 获取频道
    method: 'PUT',
    data: {
      channels
    }

  })
}

/* eslint-disable camelcase */
import request from '@/utils/request'
/**
 * 搜索联想数据列表
 * @param {搜索关键词} q
 * @returns
 */
export const getSuggetList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
/**
 * 搜索联想数据列表
 * @param
 * @returns
 */
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page, per_page, q
    }

  })
}

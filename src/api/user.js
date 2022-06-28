// 因为不能使用this.token所以要引用store使用
import store from '@/store'
import request from '@/utils/request'
/**
 *获取短信验证码
 *@param {number} mobile
 *@returns promise
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `sms/codes/${mobile}`
  })
}
/**
 *获取短信验证码
 *@param {mobile, code} param
 *@returns promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: 'authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户个人资料
 *@returns promise
 */
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}

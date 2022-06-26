import request from '@/utils/request'
/**
 *获取短信验证码
 *@param {number} mobile
 *@returns promise
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
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
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

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

/**
 *
 *@returns 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    url: 'user/profile'
  })
}

/**
 *
 *@returns 上传个人资料
 */
export const updateUserProfile = profile => {
  return request({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}

/**
 *更新头像
 *@param {裁剪之后的头像数据} data
 */
export const updateAvatar = data => {
  return request({
    method: 'PATCH',
    url: 'user/photo',
    data
  })
}

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

/***
 *把事件变成相对事时间
 * moment。js dayjs（体积小一点
 * @param {*} time
 * @returns
 */
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}

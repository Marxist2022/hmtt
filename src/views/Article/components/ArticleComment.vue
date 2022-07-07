<template>
  <!-- //1文章评论 -->
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem'
export default {
  name: 'ArticleComment',
  props: {
    source: { // 1文章id起源
      type: String,
      required: true
    },
    type: { // 1获取全部还是
      type: String,
      required: true,
      // props自定义校验函数
      validator (value) {
        // return ['a', 'c'].includes(value)
        return ['a', 'c'].includes(value)// 数据只有a或者c才能通过
      }
    },
    commentList: { // 1数据提升。
      type: Array,
      required: true
    }
  },
  created () { this.getCommentList() },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // commentList: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    // 1.1 数据请求
    async getCommentList () {
      try {
        // 发送请求
        const res = await getCommentList(this.paramsObj)

        console.log(123, res)// 后台打印看看
        // 如果请求回来的数据长度=0就是没有数据了，那么就停止加载中。。。
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)// 赋值给空数组并且保留前面的数据
        // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为null
        this.paramsObj.offset = res.data.data.last_id// 让前面的页数
        this.loading = false// 每次当前页面数据拿回来了，就把loading转圈效果关闭掉
      } catch (error) {
        console.log(error)
      }
    },
    // 1.2 加载中
    onLoad () {
      this.getCommentList()// 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>

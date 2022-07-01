<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :title="item.title"
          :key="index"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        >
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticleList } from '@/api/hone'
import ArticleItem from './ArticleItem.vue'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      require: true
    }
  },
  created () {
    this.getMyArticleList()
  },
  mounted () { // 给有滚动条的pull-refresh绑定滚动事件，在滚动的时候记住最新的滚动的位置
    // 组件最终渲染成html dom $el就是渲染好的根标签
    // console.log(this.$refs.pullrefresh)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () { // 每次进入home页面的时候，把滚动条从最上面滚动到上次记录的位置
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(), // 事件
      articleList: [], // 获取文章列表
      loading: false, // 底部更多
      finished: false,
      isLoading: false// 下拉刷新

    }
  },

  methods: {
    async getMyArticleList () { // 获取我的文章列表
      // 如果刷新触发了刷新就把列表清空
      if (this.isLoading) {
        this.articleList = []
        this.isLoading = false
      }
      try {
        const res = await getArticleList({ channelId: this.id, timestamp: this.timestamp })// 获取用户的频道
        console.log('频道', res)
        this.timestamp = res.data.data.pre_timestamp// 获得之前的时候

        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)//
        // 数据更新完毕后 将loading设置成false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 加载中。。。。。。。
    onLoad () {
      this.getMyArticleList()
    },
    // 下拉刷新
    onRefresh () {
      console.log(3123)
      this.finished = false// 停止刷新
      this.loading = true
      this.timestamp = Date.now()
      this.getMyArticleList()
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>

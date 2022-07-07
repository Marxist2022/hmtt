<template>
  <!-- 加载中动画 -->
  <van-loading v-if="isloading" size=".53333rem" />
  <!-- 收藏图标变化 -->
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'// 1引入api
export default {
  name: 'CollectArticle',
  props: {
    is_collected: { // 父组件传进来的
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isloading: false// 加载中
    }
  },
  methods: {
    async onClick () {
      this.isloading = true// 加载中
      // 1这个看路由自己配了什么：article_id
      const target = this.$route.params.article_id
      if (this.is_collected) { // 值是true说明当前是已收藏
        // 取消收藏
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      } else {
        // 添加收藏
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      }
      this.isloading = false// 加载结束就关闭
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

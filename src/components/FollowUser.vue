<template>
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
  <!-- icon就是关注前面的加号 -->
  <!-- plain就是已关注之后显示白色底色 -->
  <!-- round按钮圆角 -->
  <!-- disabled 静止点击-->
  <!-- loading 加载中。。。。-->
</template>

<script>
import { addUser, dleUser } from '@/api/article'// 1修改接口
export default {
  name: 'FollowUser',
  // 4父组件传过来的数值
  props: {
    // 父组件的传值
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    // 2关注按钮触发的事件
    async onClick () {
      this.isAjax = true// 一点击就触发
      // 如果当前value=true表示已经关注 调用取消关注接口
      if (this.value) {
        try {
          await dleUser(this.target)// 1对应api取消关注
          // 点击之后操作成功将按钮变色——关注
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      } else {
        // 反之 调用关注接口
        try {
          await addUser(this.target)// 1对应api关注
          // 点击之后操作成功将按钮变色——已关注
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      }
      this.isAjax = false// 前面都完成的时候恢复可以点击和停止转圈圈
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

<template>
  <!--//* 评论弹出框 -->
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    ref="field"
  >
    <template #extra>
      <!-- 默认按钮 -->
      <!-- 当输入框没有内容的时候，按钮就应该是被禁用的 -->
      <van-button
        type="default"
        class="btn"
        :disabled="message === ''"
        @click="addComment"
        >发布</van-button
      >
      <!-- /默认按钮 -->
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  created () { },
  props: {
    target: { // 接收文章
      type: [String, Number],
      required: true
    },
    art_id: { // 接收文章的id
      type: [String, Number]
    }
  },
  data () {
    return {
      message: ''// 输入的评论
    }
  },
  methods: {
    // 发表文章评论
    async addComment () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message, // 传入输入的评论
          art_id: this.art_id// 传入文章id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.van-cell,
.van-field {
  align-items: center;
  .btn {
    border: none;
  }
}
</style>

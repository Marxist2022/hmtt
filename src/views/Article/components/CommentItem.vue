<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformat }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('replay-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <!-- 加载中 -->
    <van-loading v-if="isloading" />
    <!-- 点赞图标 -->
    <van-icon
      v-else
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'like-o'"
      :color="item.is_liking ? 'red' : ''"
      @click="onClick"
    >
      {{ item.like_count > 0 ? item.like_count : "赞" }}
    </van-icon>
  </van-cell>
</template>

<script>
import { addLike, delLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }

  },
  created () { },
  data () {
    return {
      isloading: false// 只有点击的时候才会转
    }
  },
  methods: {
    async onClick () {
      this.isloading = true
      if (this.item.is_liking) {
        // 取消点赞
        try {
          const res = await delLike(this.item.com_id)
          console.log(res)
          this.item.like_count--
          this.item.is_liking = false
        } catch (error) {
          console.log(error)
        }
      } else {
        // 点赞
        try {
          const res = await addLike(this.item.com_id)
          console.log(res)
          this.item.like_count++
          this.item.is_liking = true
        } catch (error) {
          console.log(error)
        }
      }
      this.isloading = false
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

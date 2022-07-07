<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="Comment" class="comment"></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <!--  -->
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        :target="Comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          Comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    Comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()// 获取评论数据请求
  },
  data () {
    return {
      offset: null,
      limit: 999, // 显示几条内容
      list: [], // 评论列表
      isAddCommentShow: false

    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({
          type: 'c',
          source: this.Comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        console.log(res)// 查看获取数据
        this.list = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    }

  },
  computed: {
    title () {
      const count = this.Comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  height: 110px;
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px, 30px;
  box-sizing: border-box;
  background-color: pink;
}
</style>

<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isloading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <template v-else>
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="!!article.art_id">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{ article.aut_name }}</div>
            <div slot="label" class="publish-date">
              {{ article.pubdate | dateformat }}
            </div>
            <!-- <van-button
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
              >关注</van-button
            > -->
            <!-- ***************************************** -->
            <!-- <FollowUser :is_followed="article.is_followed"></FollowUser> -->
            <!--//1 article.is_followed是布尔值 表示有没有关注 -->
            <!--//1 article.aut_id 是文章作者的id -->
            <FollowUser
              v-model="article.is_followed"
              :target="article.aut_id"
            ></FollowUser>
            <!-- ***************************************** -->
            <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content markdown-body"
            v-html="article.content"
          ></div>
          <van-divider>正文结束</van-divider>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="is404Error">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="!isloading && !!article.art_id">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" badge="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777" @click="showShare = true">
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
          @cancel="showShare = false"
      /></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import 'github-markdown-css'
import { getArticle } from '@/api/article'
import { ImagePreview, Toast } from 'vant'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      isloading: true, // 页面刚打开的时候
      article: {},
      is404Error: false, // 错误404错误
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  computed: {},
  watch: {},
  async created () {
    try {
      const res = await getArticle(this.article_id)
      console.log(res)
      this.article = res.data.data
      this.isloading = false
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.is404Error = true
      }
    }
    // console.log(error)
    // 在这一块的时候loading关闭了，页面就显示正文，但是必须还要写在nextTick
    // 因为数据更新 视图不能立即更新 写在nextTick 回调中可以 因为nextTick回调就是
    // 在视图更新完成才会触发
    this.$nextTick(() => {
      // 获取正文中所有的图片
      // console.log(document.querySelectorAll('.article-content img'))
      // 通过querySelectorAll获取正文所有的图片
      // 1修改下面的获取dom就可以
      const arr = document.querySelectorAll('.article-content img')
      if (arr.length === 0) return// 防御代码 更加安全
      const arr1 = []// 放图片src值
      // 对图片数组进行forEach遍历先把所有的图片src地址放在arr1里面
      arr.forEach((img, index) => {
        console.log(img.src)
        arr1.push(img.src)
        // 2给所有的图片dom对象绑定 点击事件 点击的时候游览效果出现
        img.onclick = function () {
          ImagePreview({ // 3图片预览组件
            images: arr1, // 4需要预览的图片 URL 数组
            startPosition: index, // 4图片预览起始位置索引
            maxZoom: 3, // 4手势缩放时，最大缩放比例
            showIndicators: true// 4是否显示轮播指示器
          })
        }
      })
    })
  },
  mounted () { },
  methods: {
    onSelect (option) {
      Toast(option.name)
      this.showShare = false
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

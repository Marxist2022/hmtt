<template>
  <div>
    <!-- 头部导航栏 和搜索-->
    <van-nav-bar title="标题" fixed>
      <!-- 插槽 -->
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 头部导航栏 和搜索-->

    <!-- 中间滑动标签 横向滑动标签-->
    <van-tabs v-model="active" animated swipeable border>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- //1文章列表 -->
        <ArticleList :id="channel.id"></ArticleList>
        <!-- //1文章列表 -->
      </van-tab>
      <!-- 汉堡按钮图标 -->
      <template #nav-right>
        <div class="menu" @click="isChannelPannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div
      ></template>
    </van-tabs>
    <!-- 中间滑动标签  横向滑动标签-->
    <!-- 汉堡 点击后弹出的框框 -->
    <van-popup
      v-model="isChannelPannelShow"
      position="bottom"
      :style="{ height: '98%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 频道列表  汉堡按钮打开的一群小按钮-->
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPannelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
      <!-- 频道列表 -->
    </van-popup>
    <!-- 汉堡 图标位置 -->
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getUserChannels } from '@/api/hone'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'home',
  created () {
    this.getMyChannels()// 获取用户的频道
  },
  data () {
    return {
      active: 0, // 标签起始出现的标签
      channels: [],
      isChannelPannelShow: false

    }
  },
  methods: {

    // 三种情况
    // 一、
    async getMyChannels () { // 获取我的频道
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getUserChannels()// 获取用户的频道
          console.log('res', res)
          this.channels = res.data.data.channels//
        } catch (err) {
          console.log(err)
        }
      }
    }

  },
  computed: {},
  watch: {

  },
  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  // opacity: 0.2; // 有bug 会导致内容都没了
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
//滑动导航栏的每个小cell的样式
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
//滑动导航栏的底部的小条条
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
//汉堡按钮
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center; //汉堡按钮水平剧中
  line-height: 82px; //汉堡按钮垂直居中
  .toutiao {
    font-size: 33px; //汉堡按钮的大小
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}

// 顶部目录篮定位
/deep/.van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  width: 750px;
  border-bottom: 1px solid #edeff3;
}
// 解决滚动条不同页面之间公用滚动条的bug
.van-pull-refresh {
  height: calc(100vh-274px);
  overflow: auto;
}
</style>

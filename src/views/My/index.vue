<template>
  <div>
    <!-- 登录后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="userinfo.photo"
          />
          <span>{{ userinfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <!-- 登录之后头像下面的粉丝等数据样式 -->
      <ul class="list">
        <li>
          <p>{{ userinfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userinfo.fans_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userinfo.follow_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userinfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid column-num="2">
      <van-grid-item text="收藏">
        <!-- 收藏的字体图标 -->
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <!-- 历史的字体图标 -->
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- /宫格 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同志" is-link />
    </van-cell-group>

    <van-button
      type="default"
      class="logout"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>

import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My', // 组件名称
  async created () {
    // 只有后台有token 的时候才发送
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userinfo = res.data.data// 将获取来的数据赋值给响应式中
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userinfo: {} // 储存用户信息
    }
  },
  methods: {
    // 退出登录
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗？' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
// 顶部背景图
.header {
  width: 750px; //
  height: 401px;
  background: rgba(51, 150, 250, 0.7) url("@/assets/banner.png");
  background-size: cover;
}
// 顶部未登录的样式
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  // 头像
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  //登录/注册
  p {
    font-size: 28px;
    font-weight: normal;
    color: #fff;
    padding: 0;
    margin: 0;
  }
}
// 顶部登录样式
.header-login {
  padding-top: 116px;
  // 登录-头像设置
  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // 按钮编辑资料
  .button {
    width: 115px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #fff;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 400;
    color: #666;
  }
  // 左边头像和昵称
  .left {
    display: flex;
    align-items: center;
    // 昵称
    span {
      margin-left: 22px;
      font-size: 30px;
      font-weight: normal;
      color: #fff;
    }
  }
  // 登录之后头像下面的粉丝等数据样式
  .list {
    display: flex; // flex布局
    // 每个小框框
    li {
      flex: 1; //每个li占1份
      text-align: center; //居中对齐
      p {
        color: #fff; //颜色
        font-weight: 400; //粗细
        // 数字
        &:nth-child(1) {
          font-size: 36px;
        }
        // 文字
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
//收藏和历史
// logo
.toutiao {
  font-size: 45px;
}
//
.van-grid-item {
  // 收藏logo颜色
  &:nth-child(1) {
    color: #eb5253;
  }
  // 历史logo颜色
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
// 文字
/deep/.van-grid-item__text {
  font-size: 28px;
}
//上面组件之间流出间距
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>

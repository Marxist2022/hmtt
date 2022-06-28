<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <!-- <template v-slot="left">
        <van-icon name="cross" />
      </template> -->
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <!-- 信息表单 -->
    <!-- 当有属性和插槽同时存在的时候，插槽优先级 -->
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '不符合手机的格式',
          },
        ]"
        ><i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位' },
        ]"
      >
        <!-- 图标 -->
        <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        <MyIcon name="yanzhengma"></MyIcon>
        <template #button>
          <!--//1 倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!--//1 验证码按钮 -->
          <van-button
            v-else
            size="small"
            round
            native-type="button"
            class="yzm"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block round native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import MyIcon from '@/components/MyIcon.vue'

import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号码
      code: '246810', // 密码
      time: 3 * 1000, // 倒计时事件 毫秒级别
      isCountDownShow: false // 默认不显示倒计时效果
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        // res.data.data
        // token有效期2小时， 两种思路 让用户重新登录，refresh_token
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.from.validate('mobile')
        this.isCountDownShow = true// 显示倒计时
        // console.log('校验成功')
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败,请重试')
        }
      } catch (error) {
        console.log(error)
        console.log('校验失败')
        // 轻提示
        this.$toast.fail('手机号格式不对')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #dedede;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
//脱离文档流
.van-button__dowm {
  position: fixed;
  right: 18px;
}
//验证码按钮
.yzm {
  position: fixed;
  right: 10px;
}
</style>

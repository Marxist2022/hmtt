<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="profile.photo"
        width="0.9rem"
        height="0.9rem"
      />
      <!-- 昵称 -->
    </van-cell>
    <van-cell
      title="昵称"
      :value="profile.name"
      is-link
      @click="isNameShow = true"
    />
    <!-- 性别 -->
    <van-cell title="性别" :value="profile.name === 0 ? '男' : '女'" is-link />
    <van-cell
      title="生日"
      :value="profile.birthday"
      is-link
      @click="isBirthdatShow = true"
    />
    <van-popup position="bottom" style="height: 100%" v-model="isNameShow"
      ><van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameSave" />
      <!-- 昵称的输入框 -->
      <van-field
        :value="profile.name"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        @input="name = $event"
        placeholder="请输入昵称"
        show-word-limit
    /></van-popup>
    <!-- 生日选择 -->
    <van-popup v-model="isBirthdatShow" position="bottom">
      <!-- 日期选择  -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="OnConfirm"
    /></van-popup>
    <input
      type="file"
      style="display: none"
      accept="image/jpeg,image/png,image/gif,image/jpg"
      ref="file"
      @change="onChange"
    />
    <van-popup v-model="isAvatarShow" position="bottom" style="height: 100%">
      <UpdateAvatar
        @close="isAvatarShow = false"
        :imgSrc="imgSrc"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/user'
import UpdateAvatar from '@/views/User/UpdateAvatar.vue'
export default {
  name: 'UserIndex',
  async created () {
    try {
      const res = await getUserProfile()// 获取用户资料
      console.log(res)
      this.profile = res.data.data
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      profile: {}, // 用户画像 个人简介
      isNameShow: false, // 是否显示
      name: '', // 昵称弹框接收
      isBirthdatShow: false,
      minDate: new Date(-100, 0, 1), // 最小日期
      maxDate: new Date(2025, 10, 1), // 最大日期
      // currentDate: new Date(2021, 0, 17)// 当前日期
      birthday1: '', // 选择的时间
      isAvatarShow: false,
      imgSrc: ''
    }
  },
  methods: {
    // 名字取消
    onNameCancel () {
      this.isNameShow = false// 隐藏弹框显示
    },
    // 名字保存
    async onNameSave () {
      await this.save()
      this.isNameShow = false
    },
    // 上传个人简介
    async save () {
      try {
        this.profile.name = this.name
        const res = await updateUserProfile(this.profile)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    OnConfirm () {
      this.profile.birthday = this.birthday1
      this.save()
      this.isBirthdatShow = false
    },
    showInput () {
      // 用js模拟人的点击操作
      this.$refs.file.click()
    },
    onChange () {
      // 获取上传图片的地址
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      // 打印图片所在的地址
      console.log(url)
      this.isAvatarShow = true
      this.imgSrc = url
    }
  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.profile.birthday)
      },
      set (newVal) {
        this.birthday1 = newVal.getFullYear() + '-' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {},
  filters: {},
  components: { UpdateAvatar }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__text {
  color: #fff;
}
</style>

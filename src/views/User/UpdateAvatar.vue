<template>
  <div>
    <img :src="imgSrc" ref="img" />
    <van-button @click="onConfirm">确定</van-button>
  </div>
</template>

<script>
// 要下载yarn add cropperjs
import { updateAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
let cropper = null// 定义全局变量
export default {
  mounted () {
    const image = this.$refs.img
    cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    console.log(cropper)
  },

  props: {
    imgSrc: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
    }
  },
  methods: {
    onConfirm () {
      // 插件的事件
      cropper.getCroppedCanvas().toBlob(async file => {
        // console.log(file)// 获取二进制的数据
        const fd = new FormData()
        fd.append('photo', file)
        try {
          const res = await updateAvatar(fd)
          console.log(res)
          // this.avatar = res.data.data.photo
          this.$emit('update:imgSrc', res.data.data.photo)
          this.$emit('close')
        } catch (error) {
          console.log(error)
        }
      })
      // 发送ajax
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

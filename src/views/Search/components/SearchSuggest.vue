<template>
  <div>
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <template>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 响应式数据写在data，飞翔呀写在export default上面 选择性能高一点
import { getSuggetList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 因为这块要渲染的不是普通的字符串，而是html片段，所以必须要用v- html v - html是属性绑定，所以不能用过滤器
    // 所以只能在methods中写
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        // console.log(newVal)
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggetList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (error) {
            console.log(error)
          }
        }, 900)
      },
      immediate: true// 立即监听 组件在创建的时候就会监听一次
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

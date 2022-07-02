<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <SearchSuggest v-else :searchText="searchText"></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SearchResult from '@/views/Search/components/SearchResult.vue'
import SearchSuggest from '@/views/Search/components/SearchSuggest.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false// 默认没有回车
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchResult, SearchSuggest }
}
</script>

<style scoped lang='less'>
</style>

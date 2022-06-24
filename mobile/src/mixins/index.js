export const mixin = {
  data () {
    return {
      // 下拉刷新loading状态
      isLoading: false,
      // 上滑刷新loading状态
      loading: false,
      // 上滑刷新是否已是最后一页
      finished: false,
      // 加载结果提示文字
      finishedText: ''
    }
  },
  mounted () {
    // this.getList()
  },
  methods: {
    formatParams () {
      const params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
      if (this.queryParams) {
        for (const key in this.queryParams) {
          const value = this.queryParams[key]
          params[key] = value
        }
      }
      return params
    },
    upScroll () {
      const params = this.formatParams()
      this.query(params).then(res => {
        this.loading = false
        if (res.list) {
          this.list.push(...res.list)
        }
        if (res.page.pageCount === this.pageIndex || res.page.pageNext === 0) {
          this.finished = true
        } else {
          this.pageIndex = res.page.pageNext
        }
        this.finishedText = '没有更多了'
      }).catch(_ => {
        this.loading = true
        this.finished = true
        this.finishedText = '加载失败'
      })
    },
    onRefresh () {
      this.pageIndex = 1
      const params = this.formatParams()
      this.query(params).then(res => {
        this.isLoading = false
        if (res.list) {
          this.list = res.list
        }
        if (res.page.pageCount === this.pageIndex || res.page.pageNext === 0) {
          this.finished = true
        } else {
          this.finished = false
          this.pageIndex = res.page.pageNext
        }
      }).catch(_ => {
        this.isLoading = false
      })
    }

  }
}

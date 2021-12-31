<template>
  <div v-if="pageFlag && vaildData(crud.tableOption.page, true)" :class="b('pagination')">
    <slot name="page"></slot>
    <el-pagination
      :small="crud.isMobile"
      :disabled="defaultPage.disabled"
      :hide-on-single-page="vaildData(crud.tableOption.simplePage, config.simplePage)"
      :pager-count="defaultPage.pagerCount"
      :current-page.sync="defaultPage.currentPage"
      :background="vaildData(defaultPage.background, config.pageBackground)"
      :page-size="defaultPage.pageSize"
      :page-sizes="defaultPage.pageSizes"
      :layout="defaultPage.layout"
      :total="defaultPage.total"
      @size-change="sizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import config from './config'
import bem from './utils/bem'
export default {
  name: 'Crud',
  inject: ['crud'],
  mixins: [bem],
  props: {
    page: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      config: config,
      defaultPage: {
        total: 0, // 总页数
        pagerCount: 7, //超过多少条隐藏
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true, // 背景颜色
      },
    }
  },
  computed: {
    pageFlag() {
      return this.defaultPage.total != 0
    },
  },
  watch: {
    page: {
      handler() {
        this.pageInit()
      },
      deep: true,
    },
    pageFlag() {
      this.$nextTick(() => {
        this.crud.getTableHeight()
      })
    },
    //如果当前页面删除没数据了调用第一页
    'defaultPage.total'(val) {
      if (
        this.defaultPage.total === (this.defaultPage.currentPage - 1) * this.defaultPage.pageSize &&
        this.defaultPage.total != 0
      ) {
        this.defaultPage.currentPage = this.defaultPage.currentPage - 1
        this.crud.$emit('on-load', this.defaultPage)
        this.crud.$emit('current-change', this.defaultPage.currentPage)
        this.updateValue()
      }
    },
  },
  created() {
    this.pageInit()
    this.crud.$emit('on-load', this.defaultPage)
  },
  methods: {
    pageInit() {
      this.defaultPage = Object.assign(this.defaultPage, this.page, {
        total: Number(this.page.total || this.defaultPage.total),
        pagerCount: Number(this.page.pagerCount || this.defaultPage.pagerCount),
        currentPage: Number(this.page.currentPage || this.defaultPage.currentPage),
        pageSize: Number(this.page.pageSize || this.defaultPage.pageSize),
      })
      this.updateValue()
    },
    updateValue() {
      this.crud.$emit('update:page', this.defaultPage)
    },
    //下一页事件
    nextClick(val) {
      this.crud.$emit('next-click', val)
    },
    //上一页事件
    prevClick(val) {
      this.crud.$emit('prev-click', val)
    },
    // 页大小回调
    sizeChange(val) {
      this.defaultPage.currentPage = 1
      this.defaultPage.pageSize = val
      this.updateValue()
      this.crud.$emit('on-load', this.defaultPage)
      this.crud.$emit('size-change', val)
    },
    // 页码回调
    currentChange(val) {
      this.updateValue()
      this.crud.$emit('on-load', this.defaultPage)
      this.crud.$emit('current-change', val)
    },
  },
}
</script>

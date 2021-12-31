<template>
  <div>
    <el-table-column width="1px"></el-table-column>
    <!-- 折叠面板  -->
    <el-table-column
      v-if="grid.tableOption.expand"
      type="expand"
      :width="grid.tableOption.expandWidth || config.expandWidth"
      :fixed="vaildData(grid.tableOption.expandFixed, config.expandFixed)"
      align="center"
    >
      <template slot-scope="{ row }">
        <slot :row="row" :index="row.$index" name="expand"></slot>
      </template>
    </el-table-column>

    <!-- 选择框 -->
    <el-table-column
      v-if="grid.tableOption.selection"
      :fixed="vaildData(grid.tableOption.selectionFixed, config.selectionFixed)"
      type="selection"
      :selectable="grid.tableOption.selectable"
      :reserve-selection="vaildData(grid.tableOption.reserveSelection)"
      :width="grid.tableOption.selectionWidth || config.selectionWidth"
      align="center"
    ></el-table-column>
    <!-- 序号 -->
    <el-table-column
      v-if="vaildData(grid.tableOption.index)"
      :fixed="vaildData(grid.tableOption.indexFixed, config.indexFixed)"
      :label="grid.tableOption.indexLabel || config.indexLabel"
      type="index"
      :width="grid.tableOption.indexWidth || config.indexWidth"
      :index="indexMethod"
      align="center"
    ></el-table-column>
  </div>
</template>

<script>
import config from './config.js'
import bem from './utils/bem'
import locale from './core/common/locale'
import { vaildData } from './utils/util'

export default {
  name: 'Grid',
  mixins: [locale, bem],
  data() {
    return {
      config: config,
    }
  },
  inject: ['grid'],
  methods: {
    vaildData,

    indexMethod(index) {
      return index + 1 + ((this.grid.page.currentPage || 1) - 1) * (this.grid.page.pageSize || 10)
    },
    setSort() {
      this.rowDrop()
      // this.columnDrop()
    },
    rowDrop() {
      const el = this.grid.$refs.table.$el.querySelectorAll(this.config.dropRowClass)[0]
      this.grid.tableDrop(el, (evt) => {
        const oldIndex = evt.oldIndex
        const newIndex = evt.newIndex
        const targetRow = this.grid.list.splice(oldIndex, 1)[0]
        this.grid.list.splice(newIndex, 0, targetRow)
        this.grid.$emit('sortable-change', oldIndex, newIndex, targetRow, this.grid.list)
      })
    },
    columnDrop() {
      let el = this.grid.$refs.table.$el.querySelector(this.config.dropColClass)
      let headerLen = el.children.length
      headerLen = headerLen - this.grid.columnOption.length - 2
      this.grid.tableDrop(el, (evt) => {
        const oldIndex = evt.oldIndex - headerLen
        const newIndex = evt.newIndex - headerLen
        this.grid.headerSort(oldIndex, newIndex)
      })
    },
  },
}
</script>

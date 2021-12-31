<template>
  <div :class="b('menu')">
    <div :class="b('left')">
      <el-button
        v-if="vaildData(grid.tableOption.addBtn, config.addBtn)"
        v-permission="grid.getPermission('addBtn')"
        type="primary"
        :icon="grid.getBtnIcon('addBtn')"
        :size="grid.isMediumSize"
        @click="grid.rowAdd"
      >
        <template v-if="!grid.isIconMenu">
          {{ grid.menuIcon('addBtn') }}
        </template>
      </el-button>
      <el-button
        v-if="vaildData(grid.tableOption.addRowBtn, config.addRowBtn)"
        v-permission="grid.getPermission('addRowBtn')"
        type="primary"
        :icon="grid.getBtnIcon('addBtn')"
        :size="grid.isMediumSize"
        @click="grid.rowCellAdd"
      >
        <template v-if="!grid.isIconMenu">
          {{ grid.menuIcon('addBtn') }}
        </template>
      </el-button>
      <slot name="menuLeft" :size="grid.isMediumSize"></slot>
    </div>
    <div :class="b('right')">
      <avue-date
        v-if="vaildData(grid.tableOption.dateBtn, config.dateBtn)"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
        style="display: inline-block; margin-right: 20px"
        :size="grid.isMediumSize"
        @change="dateChange"
      ></avue-date>
      <slot name="menuRight" :size="grid.isMediumSize"></slot>
      <el-button
        v-if="vaildData(grid.tableOption.excelBtn, config.excelBtn)"
        v-permission="grid.getPermission('excelBtn')"
        :icon="grid.getBtnIcon('excelBtn')"
        circle
        :size="grid.isMediumSize"
        @click="rowExcel"
      ></el-button>

      <el-button
        v-if="vaildData(grid.tableOption.printBtn, config.printBtn)"
        v-permission="grid.getPermission('printBtn')"
        :icon="grid.getBtnIcon('printBtn')"
        circle
        :size="grid.isMediumSize"
        @click="rowPrint"
      ></el-button>

      <el-button
        v-if="vaildData(grid.tableOption.refreshBtn, config.refreshBtn)"
        v-permission="grid.getPermission('refreshBtn')"
        :icon="grid.getBtnIcon('refreshBtn')"
        circle
        :size="grid.isMediumSize"
        @click="grid.refreshChange"
      ></el-button>
      <el-button
        v-if="vaildData(grid.tableOption.columnBtn, config.columnBtn)"
        v-permission="grid.getPermission('columnBtn')"
        :icon="grid.getBtnIcon('columnBtn')"
        circle
        :size="grid.isMediumSize"
        @click="grid.$refs.dialogColumn.columnBox = true"
      ></el-button>
      <el-button
        v-if="(grid.$refs.headerSearch || {}).searchFlag && vaildData(grid.tableOption.searchShowBtn, true)"
        :icon="grid.getBtnIcon('searchBtn')"
        circle
        :size="grid.isMediumSize"
        @click="grid.$refs.headerSearch.handleSearchShow()"
      ></el-button>
      <el-button
        v-if="vaildData(grid.tableOption.filterBtn, config.filterBtn)"
        v-permission="grid.getPermission('filterBtn')"
        :icon="grid.getBtnIcon('filterBtn')"
        circle
        :size="grid.isMediumSize"
        @click="grid.$refs.dialogFilter.box = true"
      ></el-button>
    </div>
  </div>
</template>

<script>
import bem from './utils/bem'
import locale from './core/common/locale'
import permission from './core/directive/permission'
import config from './config'
import { vaildData } from './utils/util'
export default {
  name: 'Grid',
  directives: {
    permission,
  },
  mixins: [locale, bem],
  inject: ['grid'],
  data() {
    return {
      dateCreate: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '今日',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '昨日',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      config: config,
    }
  },
  created() {
    this.initFun()
  },
  methods: {
    //日期组件回调
    dateChange(val) {
      if (this.dateCreate) {
        this.grid.$emit('date-change', val)
      } else {
        this.dateCreate = true
      }
    },
    initFun() {
      this.vaildData = vaildData
      this.grid.rowExcel = this.rowExcel
      this.grid.rowPrint = this.rowPrint
    },
    rowExcel() {
      this.grid.$refs.dialogExcel.handleShow()
    },
    rowPrint() {
      this.$Print(this.grid.$refs.table)
    },
  },
}
</script>

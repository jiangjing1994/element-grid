<template>
  <div :class="b('menu')">
    <div :class="b('left')">
      <el-button
        v-if="vaildData(crud.tableOption.addBtn, config.addBtn)"
        v-permission="crud.getPermission('addBtn')"
        type="primary"
        :icon="crud.getBtnIcon('addBtn')"
        :size="crud.isMediumSize"
        @click="crud.rowAdd"
      >
        <template v-if="!crud.isIconMenu">
          {{ crud.menuIcon('addBtn') }}
        </template>
      </el-button>
      <el-button
        v-if="vaildData(crud.tableOption.addRowBtn, config.addRowBtn)"
        v-permission="crud.getPermission('addRowBtn')"
        type="primary"
        :icon="crud.getBtnIcon('addBtn')"
        :size="crud.isMediumSize"
        @click="crud.rowCellAdd"
      >
        <template v-if="!crud.isIconMenu">
          {{ crud.menuIcon('addBtn') }}
        </template>
      </el-button>
      <slot name="menuLeft" :size="crud.isMediumSize"></slot>
    </div>
    <div :class="b('right')">
      <avue-date
        v-if="vaildData(crud.tableOption.dateBtn, config.dateBtn)"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
        style="display: inline-block; margin-right: 20px"
        :size="crud.isMediumSize"
        @change="dateChange"
      ></avue-date>
      <slot name="menuRight" :size="crud.isMediumSize"></slot>
      <el-button
        v-if="vaildData(crud.tableOption.excelBtn, config.excelBtn)"
        v-permission="crud.getPermission('excelBtn')"
        :icon="crud.getBtnIcon('excelBtn')"
        circle
        :size="crud.isMediumSize"
        @click="rowExcel"
      ></el-button>

      <el-button
        v-if="vaildData(crud.tableOption.printBtn, config.printBtn)"
        v-permission="crud.getPermission('printBtn')"
        :icon="crud.getBtnIcon('printBtn')"
        circle
        :size="crud.isMediumSize"
        @click="rowPrint"
      ></el-button>

      <el-button
        v-if="vaildData(crud.tableOption.refreshBtn, config.refreshBtn)"
        v-permission="crud.getPermission('refreshBtn')"
        :icon="crud.getBtnIcon('refreshBtn')"
        circle
        :size="crud.isMediumSize"
        @click="crud.refreshChange"
      ></el-button>
      <el-button
        v-if="vaildData(crud.tableOption.columnBtn, config.columnBtn)"
        v-permission="crud.getPermission('columnBtn')"
        :icon="crud.getBtnIcon('columnBtn')"
        circle
        :size="crud.isMediumSize"
        @click="crud.$refs.dialogColumn.columnBox = true"
      ></el-button>
      <el-button
        v-if="(crud.$refs.headerSearch || {}).searchFlag && vaildData(crud.tableOption.searchShowBtn, true)"
        :icon="crud.getBtnIcon('searchBtn')"
        circle
        :size="crud.isMediumSize"
        @click="crud.$refs.headerSearch.handleSearchShow()"
      ></el-button>
      <el-button
        v-if="vaildData(crud.tableOption.filterBtn, config.filterBtn)"
        v-permission="crud.getPermission('filterBtn')"
        :icon="crud.getBtnIcon('filterBtn')"
        circle
        :size="crud.isMediumSize"
        @click="crud.$refs.dialogFilter.box = true"
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
  name: 'Crud',
  directives: {
    permission,
  },
  mixins: [locale, bem],
  inject: ['crud'],
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
        this.crud.$emit('date-change', val)
      } else {
        this.dateCreate = true
      }
    },
    initFun() {
      this.vaildData = vaildData
      this.crud.rowExcel = this.rowExcel
      this.crud.rowPrint = this.rowPrint
    },
    rowExcel() {
      this.crud.$refs.dialogExcel.handleShow()
    },
    rowPrint() {
      this.$Print(this.crud.$refs.table)
    },
  },
}
</script>

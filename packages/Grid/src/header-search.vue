<template>
  <el-collapse-transition>
    <el-card v-show="searchShow && searchFlag" :shadow="grid.isCard" :class="b()">
      <slot name="search" :row="searchForm" :search="searchForm" :size="grid.controlSize"></slot>
      <avue-form
        v-if="searchFlag"
        ref="form"
        v-model="searchForm"
        :option="option"
        @submit="searchChange"
        @change="handleChange"
        @reset-change="resetChange"
      >
        <template slot="menuForm" slot-scope="scope">
          <slot
            name="searchMenu"
            v-bind="
              Object.assign(scope, {
                search: searchForm,
                row: searchForm,
              })
            "
          ></slot>
          <template v-if="isSearchIcon">
            <el-button v-if="show === false" type="text" icon="el-icon-arrow-down" @click="show = true">{{
              t('grid.open')
            }}</el-button>
            <el-button v-if="show === true" type="text" icon="el-icon-arrow-up" @click="show = false">{{
              t('grid.shrink')
            }}</el-button>
          </template>
        </template>
        <template v-for="item in grid.searchSlot" :slot="getSlotName(item)" slot-scope="scope">
          <slot
            :name="item"
            v-bind="
              Object.assign(scope, {
                search: searchForm,
                row: searchForm,
              })
            "
          ></slot>
        </template>
      </avue-form>
    </el-card>
  </el-collapse-transition>
</template>

<script>
import cteate from 'core/create'
import { vaildData } from 'utils/util'
import { validatenull } from 'utils/validate'
import locale from '../../core/common/locale'
import slot from 'core/slot'
import { formInitVal, getSearchType, getType } from 'core/dataformat'
import config from './config'
export default cteate({
  name: 'grid__search',
  inject: ['grid'],
  mixins: [locale, slot],
  data() {
    return {
      show: false,
      flag: false,
      reload: false,
      defaultForm: {
        searchForm: {},
      },
      searchShow: true,
      searchForm: {},
    }
  },
  props: {
    search: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  watch: {
    'grid.propOption': {
      handler() {
        this.dataFormat()
      },
      immediate: true,
    },
    search: {
      handler() {
        this.searchForm = Object.assign(this.searchForm, this.search)
      },
      immediate: true,
      deep: true,
    },
    searchShow: {
      handler() {
        this.$nextTick(() => {
          setTimeout(() => {
            this.grid.getTableHeight()
          }, 300)
        })
      },
    },
  },
  created() {
    this.initFun()
  },
  computed: {
    isGroup() {
      return !validatenull(this.grid.tableOption.group)
    },
    propOption() {
      let list = []
      let groupList = this.grid.tableOption.group
      if (groupList) {
        groupList.forEach((ele) => {
          ;(ele.column || []).forEach((column) => {
            list.push(column)
          })
        })
      }
      return [...list, ...this.grid.columnOption]
    },
    isSearchIcon() {
      return (
        this.vaildData(this.grid.option.searchIcon, this.$GRID.searchIcon) === true && this.columnLen > this.searchIndex
      )
    },
    searchIndex() {
      return this.grid.option.searchIndex || 2
    },
    columnLen() {
      let count = 0
      this.grid.propOption.forEach((ele) => {
        if (ele.search) count++
      })
      return count
    },
    option() {
      const option = this.grid.option
      const detailColumn = (list = []) => {
        let column = []
        let count = 0
        //根据order排序
        list.forEach((ele) => {
          if (ele.search) {
            let isCount = count < this.searchIndex
            let obj = {}
            Object.keys(ele).forEach((item) => {
              let key = 'search'
              if (item.includes(key)) {
                let result = item.replace(key, '')
                if (result.length == 0) return
                result = result.replace(result[0], result[0].toLowerCase())
                obj[result] = ele[item]
              }
            })
            ele = Object.assign(ele, obj, {
              type: getSearchType(ele),
              detail: false,
              dicFlag: ele.cascaderItem ? true : this.vaildData(ele.dicFlag, false),
              span: ele.searchSpan || option.searchSpan || config.searchSpan,
              gutter: ele.searchGutter || option.searchGutter || config.searchGutter,
              labelWidth: ele.searchLabelWidth || option.searchLabelWidth || config.searchLabelWidth,
              labelPosition: ele.searchLabelPosition || option.searchLabelPosition,
              size: ele.searchSize || option.searchSize,
              value: ele.searchValue || this.searchForm[ele.prop],
              rules: ele.searchRules,
              row: ele.searchRow,
              display: this.isSearchIcon ? (this.show ? true : isCount) : true,
            })
            delete ele.bind
            let whiteList = ['disabled', 'readonly']
            whiteList.forEach((key) => {
              delete ele[key]
            })
            column.push(ele)
            count = count + 1
          }
        })
        return column
      }
      const dataDetail = (list) => {
        let result = this.deepClone(list)
        result.translate = false
        if (result.group) {
          delete result.group
        }
        result.column = detailColumn(this.deepClone(this.propOption))
        result = Object.assign(result, {
          rowKey: option.searchRowKey || 'null',
          tabs: false,
          enter: this.vaildData(option.searchEnter, true),
          printBtn: false,
          mockBtn: false,
          size: option.searchSize,
          submitText: option.searchBtnText || this.t('grid.searchBtn'),
          submitBtn: this.vaildData(option.searchBtn, config.searchSubBtn),
          submitIcon: this.grid.getBtnIcon('searchBtn'),
          emptyText: option.emptyBtnText || this.t('grid.emptyBtn'),
          emptyBtn: this.vaildData(option.emptyBtn, config.emptyBtn),
          emptyIcon: this.grid.getBtnIcon('emptyBtn'),
          menuSpan: (() => {
            if (this.show || !this.isSearchIcon) {
              return option.searchMenuSpan
            } else {
              return 6
            }
          })(),
          menuPosition: option.searchMenuPosition || 'center',
          dicFlag: false,
          dicData: this.grid.DIC,
        })
        return result
      }
      let result = dataDetail(option)
      return result
    },
    searchFlag() {
      return !!this.grid.$scopedSlots.search || !validatenull(this.searchForm)
    },
  },
  methods: {
    initFun() {
      ;['searchReset', 'searchChange'].forEach((ele) => (this.grid[ele] = this[ele]))
    },
    getSlotName(item) {
      return item.replace('Search', '')
    },
    handleChange() {
      this.grid.$emit('update:search', this.searchForm)
    },
    // 搜索回调
    searchChange(form, done) {
      this.grid.$emit('search-change', form, done)
    },
    // 搜索清空
    resetChange() {
      this.grid.$emit('search-reset', this.defaultForm.tableForm)
    },
    // 搜索清空
    searchReset() {
      this.$refs.form.resetForm()
    },
    handleSearchShow() {
      this.searchShow = !this.searchShow
    },
    dataFormat() {
      this.defaultForm = formInitVal(this.option.column)
      this.searchForm = this.deepClone(this.defaultForm.tableForm)
      this.searchShow = vaildData(this.grid.tableOption.searchShow, config.searchShow)
    },
  },
})
</script>

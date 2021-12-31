<template>
  <!-- 操作栏 -->
  <el-table-column
    v-if="vaildData(grid.tableOption.menu, config.menu) && grid.getPermission('menu')"
    :class="b('btn')"
    prop="menu"
    :fixed="vaildData(grid.tableOption.menuFixed, config.menuFixed)"
    :label="grid.tableOption.menuTitle || '操作'"
    :align="grid.tableOption.menuAlign || config.menuAlign"
    :header-align="grid.tableOption.menuHeaderAlign || config.menuHeaderAlign"
    :width="
      grid.isMobile
        ? grid.tableOption.menuXsWidth || config.menuXsWidth
        : grid.tableOption.menuWidth || config.menuWidth
    "
  >
    <template slot-scope="{ row, $index }">
      <el-dropdown v-if="isMenu" :size="grid.isMediumSize">
        <el-button type="text" :size="grid.isMediumSize">
          {{ grid.tableOption.menuBtnTitle || 'grid.menuBtn' }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-if="vaildData(grid.tableOption.viewBtn, config.viewBtn)"
            v-permission="grid.getPermission('viewBtn', row, $index)"
            :icon="grid.getBtnIcon('viewBtn')"
            @click.native="grid.rowView(row, $index)"
            >{{ grid.menuIcon('viewBtn') }}</el-dropdown-item
          >
          <el-dropdown-item
            v-if="vaildData(grid.tableOption.editBtn, config.editBtn)"
            v-permission="grid.getPermission('editBtn', row, $index)"
            :icon="grid.getBtnIcon('editBtn')"
            @click.native="grid.rowEdit(row, $index)"
            >{{ grid.menuIcon('editBtn') }}</el-dropdown-item
          >
          <el-dropdown-item
            v-if="vaildData(grid.tableOption.copyBtn, config.copyBtn)"
            v-permission="grid.getPermission('copyBtn', row, $index)"
            :icon="grid.getBtnIcon('copyBtn')"
            @click.native="grid.rowCopy(row)"
            >{{ grid.menuIcon('copyBtn') }}</el-dropdown-item
          >
          <el-dropdown-item
            v-if="vaildData(grid.tableOption.delBtn, config.delBtn)"
            v-permission="grid.getPermission('delBtn', row, $index)"
            :icon="grid.getBtnIcon('delBtn')"
            @click.native="grid.rowDel(row, $index)"
            >{{ grid.menuIcon('delBtn') }}</el-dropdown-item
          >
          <slot
            name="menuBtn"
            :row="row"
            :type="menuText('primary')"
            :disabled="grid.btnDisabled"
            :size="grid.isMediumSize"
            :index="$index"
          ></slot>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-else-if="['button', 'text', 'icon'].includes(menuType)">
        <template v-if="vaildData(grid.tableOption.cellBtn, config.cellBtn)">
          <el-button
            v-if="vaildData(grid.tableOption.editBtn, config.editBtn) && !row.$cellEdit"
            v-permission="grid.getPermission('editBtn', row, $index)"
            :type="menuText('primary')"
            :icon="grid.getBtnIcon('editBtn')"
            :size="grid.isMediumSize"
            :disabled="grid.btnDisabledList[$index]"
            @click.stop="grid.rowCell(row, $index)"
          >
            <template v-if="!isIconMenu">
              {{ grid.menuIcon('editBtn') }}
            </template>
          </el-button>
          <el-button
            v-else-if="vaildData(grid.tableOption.saveBtn, config.saveBtn) && row.$cellEdit"
            v-permission="grid.getPermission('saveBtn', row, $index)"
            :type="menuText('primary')"
            :icon="grid.getBtnIcon('saveBtn')"
            :size="grid.isMediumSize"
            :disabled="grid.btnDisabledList[$index]"
            @click.stop="grid.rowCell(row, $index)"
          >
            <template v-if="!isIconMenu">
              {{ grid.menuIcon('saveBtn') }}
            </template>
          </el-button>
          <el-button
            v-if="row.$cellEdit"
            :type="menuText('danger')"
            :icon="grid.getBtnIcon('cancelBtn')"
            :size="grid.isMediumSize"
            :disabled="grid.btnDisabledList[$index]"
            @click.stop="grid.rowCancel(row, $index)"
          >
            <template v-if="!isIconMenu">
              {{ grid.menuIcon('cancelBtn') }}
            </template>
          </el-button>
        </template>
        <el-button
          v-if="vaildData(grid.tableOption.viewBtn, config.viewBtn)"
          v-permission="grid.getPermission('viewBtn', row, $index)"
          :type="menuText('success')"
          :icon="grid.getBtnIcon('viewBtn')"
          :size="grid.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="grid.rowView(row, $index)"
        >
          <template v-if="!isIconMenu">
            {{ grid.menuIcon('viewBtn') }}
          </template>
        </el-button>
        <el-button
          v-if="vaildData(grid.tableOption.editBtn, config.editBtn) && !grid.tableOption.cellBtn"
          v-permission="grid.getPermission('editBtn', row, $index)"
          :type="menuText('primary')"
          :icon="grid.getBtnIcon('editBtn')"
          :size="grid.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="grid.rowEdit(row, $index)"
        >
          <template v-if="!isIconMenu">
            {{ grid.menuIcon('editBtn') }}
          </template>
        </el-button>
        <el-button
          v-if="vaildData(grid.tableOption.copyBtn, config.copyBtn)"
          v-permission="grid.getPermission('copyBtn', row, $index)"
          :type="menuText('primary')"
          :icon="grid.getBtnIcon('copyBtn')"
          :size="grid.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="grid.rowCopy(row)"
        >
          <template v-if="!isIconMenu">
            {{ grid.menuIcon('copyBtn') }}
          </template>
        </el-button>
        <el-button
          v-if="vaildData(grid.tableOption.delBtn, config.delBtn) && !row.$cellEdit"
          v-permission="grid.getPermission('delBtn', row, $index)"
          :type="menuText('danger')"
          :icon="grid.getBtnIcon('delBtn')"
          :size="grid.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="grid.rowDel(row, $index)"
        >
          <template v-if="!isIconMenu">
            {{ grid.menuIcon('delBtn') }}
          </template>
        </el-button>
      </template>
      <slot
        name="menu"
        :row="row"
        :type="menuText('primary')"
        :disabled="grid.btnDisabled"
        :size="grid.isMediumSize"
        :index="$index"
      ></slot>
    </template>
  </el-table-column>
</template>

<script>
import config from './config.js'
import bem from './utils/bem'
import locale from './core/common/locale'
import permission from './core/directive/permission'
import { vaildData } from './utils/util'

export default {
  name: 'Grid',
  directives: {
    permission,
  },
  mixins: [locale, bem],
  data() {
    return {
      config: config,
      // todo
      btnDisabled: false,
    }
  },
  inject: ['grid'],
  computed: {
    menuType() {
      return this.grid.tableOption.menuType || this.$GRID.menuType || 'button'
    },
    isIconMenu() {
      return this.menuType === 'icon'
    },
    isTextMenu() {
      return this.menuType === 'text'
    },
    isMenu() {
      return this.menuType === 'menu'
    },
  },
  methods: {
    vaildData,
    menuText(value) {
      return ['text', 'menu'].includes(this.menuType) ? 'text' : value
    },
  },
}
</script>

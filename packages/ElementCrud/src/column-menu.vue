<template>
  <!-- 操作栏 -->
  <el-table-column
    v-if="vaildData(crud.tableOption.menu, config.menu) && crud.getPermission('menu')"
    :class="b('btn')"
    prop="menu"
    :fixed="vaildData(crud.tableOption.menuFixed, config.menuFixed)"
    :label="crud.tableOption.menuTitle || 'crud.menu'"
    :align="crud.tableOption.menuAlign || config.menuAlign"
    :header-align="crud.tableOption.menuHeaderAlign || config.menuHeaderAlign"
    :width="
      crud.isMobile
        ? crud.tableOption.menuXsWidth || config.menuXsWidth
        : crud.tableOption.menuWidth || config.menuWidth
    "
  >
    <template slot-scope="{ row, $index }">
      <el-dropdown v-if="isMenu" :size="crud.isMediumSize">
        <el-button type="text" :size="crud.isMediumSize">
          {{ crud.tableOption.menuBtnTitle || 'crud.menuBtn' }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-if="vaildData(crud.tableOption.viewBtn, config.viewBtn)"
            v-permission="crud.getPermission('viewBtn', row, $index)"
            :icon="crud.getBtnIcon('viewBtn')"
            @click.native="crud.rowView(row, $index)"
            >{{ crud.menuIcon('viewBtn') }}</el-dropdown-item
          >
          <el-dropdown-item
            v-if="vaildData(crud.tableOption.editBtn, config.editBtn)"
            v-permission="crud.getPermission('editBtn', row, $index)"
            :icon="crud.getBtnIcon('editBtn')"
            @click.native="crud.rowEdit(row, $index)"
            >{{ crud.menuIcon('editBtn') }}</el-dropdown-item
          >
          <el-dropdown-item
            v-if="vaildData(crud.tableOption.copyBtn, config.copyBtn)"
            v-permission="crud.getPermission('copyBtn', row, $index)"
            :icon="crud.getBtnIcon('copyBtn')"
            @click.native="crud.rowCopy(row)"
            >{{ crud.menuIcon('copyBtn') }}</el-dropdown-item
          >
          <el-dropdown-item
            v-if="vaildData(crud.tableOption.delBtn, config.delBtn)"
            v-permission="crud.getPermission('delBtn', row, $index)"
            :icon="crud.getBtnIcon('delBtn')"
            @click.native="crud.rowDel(row, $index)"
            >{{ crud.menuIcon('delBtn') }}</el-dropdown-item
          >
          <slot
            name="menuBtn"
            :row="row"
            :type="menuText('primary')"
            :disabled="crud.btnDisabled"
            :size="crud.isMediumSize"
            :index="$index"
          ></slot>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-else-if="['button', 'text', 'icon'].includes(menuType)">
        <template v-if="vaildData(crud.tableOption.cellBtn, config.cellBtn)">
          <el-button
            v-if="vaildData(crud.tableOption.editBtn, config.editBtn) && !row.$cellEdit"
            v-permission="crud.getPermission('editBtn', row, $index)"
            :type="menuText('primary')"
            :icon="crud.getBtnIcon('editBtn')"
            :size="crud.isMediumSize"
            :disabled="crud.btnDisabledList[$index]"
            @click.stop="crud.rowCell(row, $index)"
          >
            <template v-if="!isIconMenu">
              {{ crud.menuIcon('editBtn') }}
            </template>
          </el-button>
          <el-button
            v-else-if="vaildData(crud.tableOption.saveBtn, config.saveBtn) && row.$cellEdit"
            v-permission="crud.getPermission('saveBtn', row, $index)"
            :type="menuText('primary')"
            :icon="crud.getBtnIcon('saveBtn')"
            :size="crud.isMediumSize"
            :disabled="crud.btnDisabledList[$index]"
            @click.stop="crud.rowCell(row, $index)"
          >
            <template v-if="!isIconMenu">
              {{ crud.menuIcon('saveBtn') }}
            </template>
          </el-button>
          <el-button
            v-if="row.$cellEdit"
            :type="menuText('danger')"
            :icon="crud.getBtnIcon('cancelBtn')"
            :size="crud.isMediumSize"
            :disabled="crud.btnDisabledList[$index]"
            @click.stop="crud.rowCancel(row, $index)"
          >
            <template v-if="!isIconMenu">
              {{ crud.menuIcon('cancelBtn') }}
            </template>
          </el-button>
        </template>
        <el-button
          v-if="vaildData(crud.tableOption.viewBtn, config.viewBtn)"
          v-permission="crud.getPermission('viewBtn', row, $index)"
          :type="menuText('success')"
          :icon="crud.getBtnIcon('viewBtn')"
          :size="crud.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="crud.rowView(row, $index)"
        >
          <template v-if="!isIconMenu">
            {{ crud.menuIcon('viewBtn') }}
          </template>
        </el-button>
        <el-button
          v-if="vaildData(crud.tableOption.editBtn, config.editBtn) && !crud.tableOption.cellBtn"
          v-permission="crud.getPermission('editBtn', row, $index)"
          :type="menuText('primary')"
          :icon="crud.getBtnIcon('editBtn')"
          :size="crud.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="crud.rowEdit(row, $index)"
        >
          <template v-if="!isIconMenu">
            {{ crud.menuIcon('editBtn') }}
          </template>
        </el-button>
        <el-button
          v-if="vaildData(crud.tableOption.copyBtn, config.copyBtn)"
          v-permission="crud.getPermission('copyBtn', row, $index)"
          :type="menuText('primary')"
          :icon="crud.getBtnIcon('copyBtn')"
          :size="crud.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="crud.rowCopy(row)"
        >
          <template v-if="!isIconMenu">
            {{ crud.menuIcon('copyBtn') }}
          </template>
        </el-button>
        <el-button
          v-if="vaildData(crud.tableOption.delBtn, config.delBtn) && !row.$cellEdit"
          v-permission="crud.getPermission('delBtn', row, $index)"
          :type="menuText('danger')"
          :icon="crud.getBtnIcon('delBtn')"
          :size="crud.isMediumSize"
          :disabled="btnDisabled"
          @click.stop="crud.rowDel(row, $index)"
        >
          <template v-if="!isIconMenu">
            {{ crud.menuIcon('delBtn') }}
          </template>
        </el-button>
      </template>
      <slot
        name="menu"
        :row="row"
        :type="menuText('primary')"
        :disabled="crud.btnDisabled"
        :size="crud.isMediumSize"
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
  name: 'Crud',
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
  inject: ['crud'],
  computed: {
    menuType() {
      return this.crud.tableOption.menuType || this.$AVUE.menuType || 'button'
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

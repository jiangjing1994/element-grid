<template>
  <div style="text-align: left">
    <el-row style="margin-bottom: 20px; font-size: 15px">
      <el-col :span="4">显示边框: <el-switch v-model="showBorder" size="small"> </el-switch></el-col>
      <el-col :span="4">显示斑马纹: <el-switch v-model="showStripe" size="small"> </el-switch></el-col>
      <el-col :span="4">显示索引: <el-switch v-model="showIndex" size="small"> </el-switch></el-col>
      <el-col :span="4">显示多选框: <el-switch v-model="showCheckbox" size="small"> </el-switch></el-col>
      <el-col :span="4">显示表头: <el-switch v-model="showHeader" size="small"> </el-switch></el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-radio-group v-model="sizeValue">
        <el-radio label="small">默认</el-radio>
        <el-radio label="medium">medium</el-radio>
        <el-radio label="small">small</el-radio>
        <el-radio label="mini">mini</el-radio>
      </el-radio-group>
    </el-row>
    <grid :data="data" :option="option0"></grid>
    <grid :data="[]" :option="option0"></grid>
  </div>
</template>

<script>
export default {
  name: 'GridDemo',
  data() {
    return {
      obj: {},
      data: [
        {
          name: '张三',
          sex: '男',
        },
        {
          name: '李四',
          sex: '女',
        },
        {
          name: '王五',
          sex: '女',
        },
        {
          name: '赵六',
          sex: '男',
        },
      ],
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      showPage: false,
      sizeValue: 'small',
    }
  },
  computed: {
    option0() {
      return {
        border: this.showBorder,
        stripe: this.showStripe,
        showHeader: this.showHeader,
        index: this.showIndex,
        size: this.sizeValue,
        selection: this.showCheckbox,
        page: this.showPage,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '性别',
            prop: 'sex',
          },
        ],
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>

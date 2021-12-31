<template>
  <div>
    <el-link>22222222222</el-link>
    <el-button>3333333</el-button>
    <ElementCrud v-model="form" :data="data" :option="option"></ElementCrud>
  </div>
</template>

<script>
export default {
  name: 'ExamplesElementCrud',
  props: {
    propName: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      form: {},
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
      option: {
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
      },
    }
  },

  methods: {
    name() {},
  },
}
</script>

<style lang="scss" scoped></style>

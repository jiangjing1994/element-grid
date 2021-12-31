<template>
  <component
    :is="getComponent(column.type, column.component)"
    ref="temp"
    v-model="text"
    v-bind="Object.assign(column, $uploadFun(column))"
    :column="Object.assign(column, params)"
    :dic="dic"
    :disabled="column.disabled || disabled"
    :readonly="column.readonly || readonly"
    :placeholder="getPlaceholder(column)"
    :props="column.props || props"
    :props-http="column.propsHttp || propsHttp"
    :size="column.size || size"
    :type="type || column.type"
    :column-slot="columnSlot"
    v-on="event"
    @keyup.enter.native="enterChange"
  >
    <span v-if="params.html" v-html="params.html"></span>
    <template v-for="item in getSlotName(column, 'T', $scopedSlots) ? [column] : []" slot-scope="scope">
      <slot :name="getSlotName(item, 'T')" v-bind="scope"></slot>
    </template>
    <template v-for="item in columnSlot" :slot="item" slot-scope="scope">
      <slot v-bind="scope" :name="item"></slot>
    </template>
  </component>
</template>

<script>
import { getComponent, getPlaceholder } from '../../dataformat'
import { validatenull } from '../../../utils/validate'

import slot from '../../slot'
export default {
  name: 'FormTemp',
  mixins: [slot],
  props: {
    value: {},
    uploadBefore: Function,
    uploadDelete: Function,
    uploadAfter: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    columnSlot: {
      type: Array,
      default: () => {
        return []
      },
    },
    // props: {
    //   type: Object
    // },
    clearable: {
      type: Boolean,
    },
    enter: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    propsHttp: {
      type: Object,
      default: () => {
        return {}
      },
    },
    props: {
      type: Object,
    },
    dic: {
      type: Array,
    },
    placeholder: {
      type: String,
    },
    size: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    readonly: {
      type: Boolean,
    },
    column: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      first: false,
      text: undefined,
    }
  },
  computed: {
    params() {
      return this.column.params || {}
    },
    event() {
      return this.column.event || {}
    },
  },
  watch: {
    text: {
      handler(val) {
        if (this.first || !validatenull(val)) {
          this.first = true
          this.$emit('input', val)
          this.$emit('change', val)
        } else {
          this.first = true
        }
      },
    },
    value: {
      handler(val) {
        this.text = val
      },
      immediate: true,
    },
  },
  methods: {
    getComponent,
    getPlaceholder,
    enterChange() {
      if (typeof this.column.enter === 'function') this.column.enter(this.text, this.column)
      if (this.enter) this.$emit('enter')
    },
  },
}
</script>

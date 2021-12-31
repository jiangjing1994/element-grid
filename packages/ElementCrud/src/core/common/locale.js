import { t } from 'locale'

export default {
  methods: {
    t(...args) {
      return args
      //return t.apply(this, args);
    },
  },
}

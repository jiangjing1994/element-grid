import Grid from './Grid'

const components = [Grid]
import './theme/index.scss'
const install = function (Vue, opts = {}) {
  if (install.installed) return

  components.map((component) => {
    Vue.component(component.name || '', component)
  })
  Vue.prototype.$GRID = Object.assign(opts, {
    // ui: (() => {
    //   Vue.prototype[config.is] = true;
    //   return config
    // })(),
    size: opts.size || 'small',
    calcHeight: opts.calcHeight || 0,
    menuType: opts.menuType || 'text',
    canvas: Object.assign(
      {
        text: 'avuejs.com',
        fontFamily: 'microsoft yahei',
        color: '#999',
        fontSize: 16,
        opacity: 100,
        bottom: 10,
        right: 10,
        ratio: 1,
      },
      opts.canvas
    ),
    qiniu: Object.assign(
      {
        AK: '',
        SK: '',
        scope: '',
        url: '',
        bucket: 'https://upload.qiniup.com',
        deadline: 1,
      },
      opts.qiniu || {}
    ),
    ali: Object.assign(
      {
        region: '',
        endpoint: '',
        stsToken: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
      },
      opts.ali || {}
    ),
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Grid,
}

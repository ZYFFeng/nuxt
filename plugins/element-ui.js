import Vue from 'vue'
import { Pagination } from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/en'
export default () => {
  Vue.use(Pagination, { locale })
}

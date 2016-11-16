import {I18n} from 'api/i18n/I18n'
import {template} from 'lodash'

export function loadI18n(bundleLoader): Promise<I18n> {

  return new Promise((resolve) => {
    bundleLoader(module_i18n => {
      const dict = module_i18n.default

      let cache = Object.keys(dict).reduce((accu, key) => {
        let val = dict[key]
        accu[key] = val.indexOf('${') === -1 ? val : template(val)
        return accu
      }, {})

      function i18n(key: string, opts?: Object) {
        if (cache[key]) {
          if (opts) {
            return cache[key](opts) as string
          } else {
            return cache[key] as string
          }
        } else {
          return key
        }
      }

      resolve(i18n)
    })
  })
}

export default loadI18n
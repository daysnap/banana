import type { MetaData, Field, ExtractOptions } from './type'
import { each, isEmpty } from './utils'
import { extract } from './extract'

export function validate<T = any>(
  metaData: MetaData,
  options: ExtractOptions = {},
): T {
  let loop: any
  ;(loop = (source: MetaData) => {
    each<Field>(source as any, (field) => {
      // eslint-disable-next-line prefer-const
      let { value, children, rules, hidden } = field
      if (children) {
        loop(children)
      }

      if (typeof hidden === 'function') {
        hidden = hidden(value, field, metaData)
      }
      if (hidden || !rules || !rules.length) return

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = rules.length; i < len; i++) {
        const rule = rules[i]
        if (typeof rule === 'function') {
          rule(value, field, source)
        } else {
          const { required, validator, message } = rule
          if (required && isEmpty(value)) {
            throw message
          }
          if (
            typeof validator === 'function' &&
            validator(value, field, metaData) === false
          ) {
            throw message
          }
          if (validator instanceof RegExp && !validator.test(value)) {
            throw message
          }
        }
      }
    })
  })(metaData)

  return extract<T>(metaData, options)
}

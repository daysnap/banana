import type { MetaData, Field, Rule } from './type'
import { each, isEmpty } from './utils'
import { extract } from './extract'

export function validate<T = any>(data: MetaData): T
export function validate<T = any>(
  data: Record<string, any>,
  dataRules: { [key: string]: Rule[] },
): T
export function validate<T = any>(data: any, dataRules?: any): T {
  let metaData = data
  if (dataRules) {
    metaData = Object.keys(data).reduce<Record<string, any>>((result, key) => {
      return Object.assign(result[key], {
        value: data[key],
        rules: dataRules[key],
      })
    }, {})
  }

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
          if (typeof validator === 'function' && validator(value) === false) {
            throw message
          }
          if (validator instanceof RegExp && !validator.test(value)) {
            throw message
          }
        }
      }
    })
  })(metaData)

  return extract<T>(data)
}

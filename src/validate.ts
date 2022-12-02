import type { MetaData, Field, Rule } from './type'
import { each, isEmpty } from './utils'
import { extract } from './extract'

export function validate(data: MetaData): Record<string, any>
export function validate(
  data: Record<string, any>,
  dataRules: { [key: string]: Rule[] },
): Record<string, any>
export function validate(data: any, dataRules?: any): Record<string, any> {
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
      const { value, children, rules, hidden } = field
      if (children) {
        loop(children)
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

  return extract(data)
}

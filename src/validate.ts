import type { MetaData, Field, Rule } from './type'
import { each, isEmpty } from './utils'

export function validate(data: MetaData): void
export function validate(
  data: Record<string, any>,
  dataRules: { [key: string]: Rule[] },
): void
export function validate(data: any, dataRules?: any): void {
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
}

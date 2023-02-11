import type { Field, MetaData } from './type'
import { each, isObject } from './utils'

export function extract<T = any>(metaData: MetaData): T {
  const result: any = {}

  let loop: any
  ;(loop = (source: MetaData) => {
    each<Field>(source as any, (field, i) => {
      // eslint-disable-next-line prefer-const
      let { get, value, defaultValue, key, hidden, children } = field

      if (children) {
        Object.assign(result, loop(children))
      }

      if (typeof value === 'undefined') {
        return
      }

      if (typeof hidden === 'function') {
        hidden = hidden(value, field, metaData)
      }
      if (hidden) {
        value = defaultValue
      }

      const k = key ?? i
      if (typeof get === 'function') {
        value = get(value, field, metaData)
        if (isObject(value)) {
          Object.assign(result, value)
        } else {
          result[k] = value
        }
      } else {
        result[k] = value
      }
    })
  })(metaData)

  return result
}

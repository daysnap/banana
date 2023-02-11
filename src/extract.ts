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

      // 没有 value 直接返回
      if (typeof value === 'undefined') {
        return
      }

      if (typeof hidden === 'function') {
        hidden = hidden(value, field, metaData)
      }
      if (hidden) {
        value = defaultValue

        // 有 hidden 判断是否有默认值
        if (typeof value === 'undefined') {
          return
        }
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

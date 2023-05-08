import type { Field, MetaData } from './type'
import { each, isObject, getValue } from './utils'

export interface ExtractOptions {
  // 是否排除 hidden 项 默认 true
  excludeHiddenFiled?: boolean
  // 是否包含本身 value 默认 false
  includeSelfFiled?: boolean
}

export function extract<T = any>(
  metaData: MetaData,
  options: ExtractOptions = {},
): T {
  const { excludeHiddenFiled = true, includeSelfFiled = false } = options
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

      // 是否排除 hidden 的项
      if (excludeHiddenFiled) {
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
      }

      const k = key ?? i
      if (typeof get === 'function') {
        if (includeSelfFiled) {
          Object.assign(result, { [k]: getValue(value) })
        }
        value = get(value, field, metaData)
        if (isObject(value)) {
          Object.assign(result, value)
        } else {
          result[k] = getValue(value)
        }
      } else {
        result[k] = getValue(value)
      }
    })
  })(metaData)

  return result
}

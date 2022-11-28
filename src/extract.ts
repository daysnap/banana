import type { Field, MetaData } from './type'
import { each, isObject } from './utils'

export function extract(data: MetaData) {
  const result: Record<string, any> = {}

  each<Field>(data as any, (field, i) => {
    // eslint-disable-next-line prefer-const
    let { get, value, defaultValue, key, hidden, children } = field

    if (children) {
      Object.assign(result, extract(children))
    }

    if (hidden) {
      value = defaultValue
      if (typeof value === 'undefined') {
        return
      }
    }

    const k = key ?? i
    if (typeof get === 'function') {
      value = get(value, field, data)
      if (isObject(value)) {
        Object.assign(result, value)
      } else {
        result[k] = value
      }
    } else {
      result[k] = value
    }
  })

  return result
}

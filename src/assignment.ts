import { Field, MetaData } from './type'
import { each } from './utils'

export function assignment(source: Record<string, any>, data: MetaData) {
  each<Field>(data as any, (field, i) => {
    // eslint-disable-next-line prefer-const
    let { set, key, children } = field

    if (children) {
      assignment(source, children)
    }

    const value = source[key ?? i]
    if (typeof set === 'function') {
      set(source, field, data)
    } else if (typeof value !== 'undefined') {
      Object.assign(field, { value })
    }
  })
}

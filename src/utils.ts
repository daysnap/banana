export function each<T>(
  data: T[],
  callback: (item: T, index: number) => void,
): void
export function each<T>(
  data: Record<string, T>,
  callback: (item: T, key: string) => void,
): void
export function each(data: any, callback: any) {
  if (Array.isArray(data)) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0, { length } = data; index < length; index++) {
      callback.call(data[index], data[index], index)
    }
  } else {
    Object.keys(data).forEach((key) => {
      callback.call(data[key], data[key], key)
    })
  }
}

export const isEmpty = (v: any) =>
  v === '' || v === null || typeof v === 'undefined'

export const isObject = (v: any) =>
  Object.prototype.toString.call(v) === '[object Object]'

export const clone = (v: any) => JSON.parse(JSON.stringify(v))

export const getValue = (value: unknown) => {
  if (typeof value === 'object') {
    return clone(value)
  }
  return value
}

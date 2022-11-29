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
  ['', null].includes(v) && typeof v === 'undefined'

export const isObject = (v: any) =>
  Object.prototype.toString.call(v) === '[object Object]'

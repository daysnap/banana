export type Validator = (...args: any[]) => any

export type Rule =
  | {
      validator?: RegExp | Validator
      message?: string
      required?: boolean
    }
  | Validator

export interface Field {
  value?: any
  defaultValue?: any
  rules?: Rule[]
  hidden?: boolean | ((value: any, filed: Field, data: MetaData) => boolean)
  set?: (source: any, field: Field, data: MetaData) => void
  get?: (value: any, filed: Field, data: MetaData) => any
  key?: string
  children?: MetaData
  [key: string]: any
}

// 这里扩展出一个 泛型 主要是提供给 外部 扩展 interface 使用方便
export type MetaDataObject<
  T extends Record<string, any> = Record<string, any>,
> = Record<string, Field & T>

export type MetaDataArray<T extends Record<string, any> = Record<string, any>> =
  (Field & T)[]

export type MetaData = MetaDataObject | MetaDataArray

export interface ExtractOptions {
  // 是否排除 hidden 项 默认 true
  excludeHiddenFiled?: boolean
  // 是否包含本身 value 默认 false
  includeSelfFiled?: boolean
}

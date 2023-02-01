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

export type MetaDataObject = Record<string, Field>

export type MetaDataArray = Field[]

export type MetaData = MetaDataObject | MetaDataArray

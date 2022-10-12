/**
 * 验证器
 */
export type BananaValidator = RegExp | ((v: any) => Promise<boolean> | boolean)

/**
 * 验证规则
 */
export type BananaRule =
  | {
      validator?: BananaValidator
      message?: string
      required?: boolean
    }
  | BananaValidator

/**
 * 每一项数据
 */
export interface BananaItem {
  value?: any
  rules?: BananaRule[]
  hidden?: boolean
  set?: (d: any, s: BananaItem) => void
  get?: (v: any) => any
  key?: string
  children?: BananaSource
  [key: string]: any
}

/**
 * 数据源
 */
export type BananaSource =
  | {
      [key: string]: BananaItem
    }
  | BananaItem[]

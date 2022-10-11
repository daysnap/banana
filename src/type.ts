
export interface Rule {
  validator?: RegExp | ((v: any) => Promise<boolean> | boolean)
  message?: string
  required?: boolean
}

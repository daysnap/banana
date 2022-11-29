import { assignment } from './assignment'
import { extract } from './extract'
import { validate } from './validate'

export * from './assignment'
export * from './extract'
export * from './type'
export * from './validate'

export const banana = {
  assignment,
  extract,
  validate,
}

export default banana

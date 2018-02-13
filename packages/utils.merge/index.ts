import * as ko from 'knockout'
import fromJS from '@profiscience/knockout-contrib-utils-from-js'

export type MergeOptions = {
  deep?: boolean
  strict?: boolean
}

export default function merge<T extends { [k: string]: any }>(
  dest: T,
  src: { [k: string]: any },
  opts: MergeOptions = { deep: false, strict: false }
): T {
  const props = Object.keys(src)

  for (const prop of props) {
    if (isUndefined(dest[prop])) {
      if (opts.strict) {
        dest[prop] = src[prop]
      } else {
        dest[prop] = fromJS(src[prop], src[prop] instanceof Array && opts.deep)
      }
    } else if (ko.isObservable(dest[prop])) {
      dest[prop](
        src[prop] instanceof Array && opts.deep
          ? ko.unwrap(fromJS(src[prop], true))
          : src[prop]
      )
    } else if (isUndefined(src[prop]) || src[prop] === null) {
      dest[prop] = src[prop]
    } else if (src[prop].constructor === Object) {
      merge(dest[prop], src[prop], opts)
    } else {
      dest[prop] = src[prop]
    }
  }

  return dest
}

function isUndefined(foo): boolean {
  return typeof foo === 'undefined'
}

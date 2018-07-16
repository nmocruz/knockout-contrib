export declare type Primitive = string | boolean | number | null | undefined
export declare type MaybeArray<T> = T | T[]
export declare function isBool(x: any): boolean
export declare function isEmpty(x: any): boolean
export declare function isNumber(x: any): boolean
export declare function isUndefined(x: any): boolean
export declare function entries(obj: { [k: string]: any }): any[][]
export declare function omit(
  obj: {
    [k: string]: any
  },
  fn: (x: any) => boolean | void
): {
  [k: string]: any
}

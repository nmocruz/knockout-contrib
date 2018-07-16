export declare type MergeOptions = {
  mapArrayElements?: boolean
  strict?: boolean
}
export declare function assign<
  T extends {
    [k: string]: any
  }
>(
  dest: T,
  src: {
    [k: string]: any
  },
  opts?: MergeOptions
): T

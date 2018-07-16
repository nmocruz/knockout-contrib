import * as ko from 'knockout'
export declare function defaults<
  T extends {
    [k: string]: any | ko.Observable<any> | ko.Computed<any> | void
  }
>(
  dest: T,
  defaultValues: {
    [k: string]: any
  },
  mapArraysDeep?: boolean
): T

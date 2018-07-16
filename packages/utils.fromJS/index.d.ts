import * as ko from 'knockout'
declare type ObservableTree<T> = T extends any[]
  ? ko.ObservableArray<T[number]>
  : T extends Date
    ? ko.Observable<Date>
    : T extends RegExp
      ? ko.Observable<RegExp>
      : T extends ko.Observable<any>
        ? T
        : T extends ko.ObservableArray<any>
          ? T
          : T extends ko.Computed<any>
            ? T
            : T extends (...args: any[]) => any
              ? T
              : T extends {
                  [k: string]: any
                }
                ? { readonly [P in keyof T]: ObservableTree<T[P]> }
                : ko.Observable<T>
export declare function fromJS<T>(
  obj: T,
  mapArrayElements?: boolean
): ObservableTree<T>
export {}

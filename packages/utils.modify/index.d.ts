export declare function modify<T>(
  obs: ko.Observable<T> | ko.Computed<T>,
  fn: (v: T) => T
): T

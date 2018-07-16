export declare function once<T>(
  obs: ko.Observable<T> | ko.Computed<T>,
  fn: (v: T) => void
): ko.Subscription

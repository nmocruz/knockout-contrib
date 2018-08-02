import * as ko from 'knockout'
import { ConstructorBuilder } from '@profiscience/knockout-contrib-model-builders-base'

/**
 * Adds .subscribe(obs, fn) and .dispose() methods with subscription tracking to prevent leaks
 *
 * Used by constructor builders
 *
 * @param ctor BaseModel
 */
export function SubscriptionDisposalMixin<
  T extends { new (...args: any[]): ConstructorBuilder }
>(ctor: T) {
  return class Subscribable extends ctor {
    /**
     * Create a subscription that will be disposed with the model
     *
     * Provides sugar for passing an accessor function or tree
     *
     * Example:
     *
     * ```typescript
     *  this.subscribe(obs, onChange)
     *  this.subscribe(() => obs(), onChange)
     *  this.subscribe({ obs }, onChange)
     * ```
     */
    public subscribe: <T2>(
      arg: ko.Observable<T2> | (() => T2) | any,
      fn: (newVal: T2 | any) => void
    ) => ko.Subscription

    /**
     * Disposes a single subscription
     */

    public unsubscribe: <T2>(
      arg: ko.Subscription | ko.Observable<T2> | (() => T2) | any,
      fn?: (newVal: T2) => void
    ) => void

    constructor(...args: any[]) {
      super(args)

      let subscriptions = new Map<any, Map<any, ko.Subscription>>()

      this.subscribe = <T2>(arg: any, fn: any) => {
        let obs: ko.MaybeComputed<any>

        if (ko.isObservable(arg)) {
          obs = arg
        } else if (typeof arg === 'function') {
          obs = ko.pureComputed(arg)
        } else {
          obs = ko.pureComputed(() => ko.toJS(arg))
        }
        const sub = (obs as ko.Observable<T2>).subscribe((newVal: T2) => {
          fn(newVal)
        })

        if (!subscriptions.has(arg)) {
          subscriptions.set(arg, new Map())
        }
        ;(subscriptions.get(arg) as Map<any, ko.Subscription>).set(fn, sub)

        return sub
      }

      this.unsubscribe = <T2>(arg: any, fn?: any) => {
        if (typeof arg.dispose === 'function') arg.dispose()
        else {
          ;(subscriptions.get(arg) as Map<any, any>).get(fn).dispose()
        }
        if (subscriptions.has(arg)) {
          ;(subscriptions.get(arg) as Map<any, any>).delete(fn)
        }
      }
      /**
       * Dispose all subscriptions
       */
      this.dispose = () => {
        subscriptions.forEach((v) => v.forEach((s) => s.dispose()))
        super.dispose()
      }
    }
  }
}

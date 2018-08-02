import 'core-js/es7/symbol'

import * as ko from 'knockout'
import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model-builders-data'
import { INITIALIZED } from '@profiscience/knockout-contrib-router-plugins-init'

export type PaginationStrategy<T extends { [k: string]: any }> = (
  page: number
) => T

/**
 * Adds `page` param for use with fetch, and `.getMore()` method and `.hasMore()` observable.
 *
 * Use for "Load More" buttons, or infinite scrolling.
 *
 * @param ctor Base DataModel Constructor
 */

export function PagerMixin<PaginationParams = { page: number }>(
  property: string,
  strategy: PaginationStrategy<PaginationParams> = ((page: number) => ({
    page
  })) as PaginationStrategy<any>
) {
  return <
    P extends PaginationParams,
    T extends { new (...args: any[]): DataModelConstructorBuilder<P> }
  >(
    ctor: T
  ) =>
    class extends ctor {
      public hasMore: ko.Observable<boolean>

      public getMore: () => Promise<boolean>

      constructor(...args: any[]) {
        // add page to params, have to do it this way b/c of param enforcments for mixins by TypeScript

        let params = args[0]

        Object.assign(params, strategy(1))
        super(...args)

        this.hasMore = ko.observable(true)

        let _this = this
        let pager_creater = async function*() {
          let page = 2

          Object.assign(params, strategy(page))

          const tap = (fn: any) => (v: any) => {
            fn(v)
            return v
          }
          const updateHasMore = (d: any) =>
            _this.hasMore(d[property] && d[property].length > 0)

          let next = fetch().then(tap(updateHasMore))
          let data: any

          yield
          do {
            data = await next
            ;(_this as any)[property].push(...data[property])
            Object.assign(params, strategy(++page))
            next = fetch().then(tap(updateHasMore))
            yield
          } while (_this.hasMore())
        }

        let pager: AsyncIterableIterator<void> = pager_creater()

        let prime_pager = async () => {
          await pager.next()
        }

        let update = () => {
          Object.assign(params, strategy(1))
          pager = pager_creater()
          const p = super.update()
          return p.then(() => prime_pager())
        }

        const initialized = this[INITIALIZED]
        this[INITIALIZED] = initialized
          // @TODO unchain this when proper error handling is implemented
          .then(() => prime_pager())

        this.getMore = async () => {
          this.loading(true)
          const { done } = await pager.next()
          this.loading(false)
          return !done
        }
      }
    }
}

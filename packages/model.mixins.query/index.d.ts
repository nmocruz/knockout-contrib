import { IQueryConfig } from '@profiscience/knockout-contrib-query'
export declare function QueryMixin<Q extends IQueryConfig>(
  opts: Q
): <P extends any, T extends new (...args: any[]) => any>(
  ctor: T
) => {
  new (...args: any[]): {
    query: any
  }
} & T

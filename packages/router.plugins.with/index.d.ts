import {
  Context,
  IContext,
  IRouteConfig
} from '@profiscience/knockout-contrib-router'
type MaybePromise<T> = T | Promise<T>
declare module '@profiscience/knockout-contrib-router' {
  interface IRouteConfig {
    /**
     * Additional data to extend context with.
     *
     * Can be used for overriding url params, e.g.
     *
     * ```typescript
     *  with: { params: { id: 0 } }
     * ```
     */
    with?:
      | Context
      | IContext
      | ((ctx: Context & IContext) => MaybePromise<Context | IContext>)
  }
}
export declare function withRoutePlugin({
  with: _with
}: IRouteConfig): (ctx: any) => Promise<void>
export {}

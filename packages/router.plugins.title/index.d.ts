import {
  Context,
  IContext,
  RoutePlugin
} from '@profiscience/knockout-contrib-router'
type MaybePromise<T> = T | Promise<T>
declare module '@profiscience/knockout-contrib-router' {
  interface IRouteConfig {
    /**
     * Document title for view, can be async or sync accessor function
     */
    title?: string | ((ctx: Context & IContext) => MaybePromise<string>)
  }
}
export declare function createTitleRoutePlugin(
  compose?: (ts: string[]) => string
): RoutePlugin
export {}

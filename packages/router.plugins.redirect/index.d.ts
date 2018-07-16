import {
  Context,
  IContext,
  IRouteConfig,
  Middleware
} from '@profiscience/knockout-contrib-router'
declare module '@profiscience/knockout-contrib-router' {
  interface IRouteConfig {
    redirect?: (
      ctx: Context & IContext
    ) => string | void | Promise<string | void>
  }
}
export declare function redirectRoutePlugin({
  redirect
}: IRouteConfig): Middleware | void

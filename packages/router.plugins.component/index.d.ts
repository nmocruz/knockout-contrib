import {
  Context,
  IContext,
  IRouteConfig,
  LifecycleMiddleware
} from '@profiscience/knockout-contrib-router'
type MaybePromise<T> = T | Promise<T>
declare type MaybeDefaultExport<T> =
  | T
  | {
      default: T
    }
declare type MaybeAccessor<A, T> = T | ((arg: A) => T)
declare module '@profiscience/knockout-contrib-router' {
  interface IContext {
    component?: MaybePromise<IRoutedComponentInstance>
  }
  interface IRouteConfig {
    /**
     * Component accessor, intended for use with dynamic imports for lazy-loading.
     *
     * Example:
     *
     * ```typescript
     *  component: () => ({
     *    template: import('./template.html'),
     *    viewModel: import('./viewModel')
     *  })
     * ```
     */
    component?: IRouteComponentConfig
  }
}
export interface IRoutedComponentInstance {
  /**
   * Name component is registered with Knockout as
   */
  name: string
  /**
   * Route viewModel instance
   */
  viewModel?: any
}
/**
 * Intended for use with dynamic imports for lazy-loading/code-splitting
 *
 * Example:
 *
 * ```typescript
 *  {
 *    template: import('./template.html'),
 *    viewModel: import('./viewModel')
 *  }
 * ```
 */
export declare type IRouteComponentConfig =
  | MaybeAccessor<Context & IContext, MaybePromise<INamedComponent>>
  | MaybeAccessor<
      Context & IContext,
      MaybePromise<MaybeDefaultExport<MaybeLazy<IAnonymousComponent>>>
    >
export declare type MaybeLazy<T extends {}> = MaybePromise<
  { [P in keyof T]: MaybePromise<MaybeDefaultExport<T[P]>> }
>
export declare type INamedComponent = string
export declare type IAnonymousComponent = {
  template: string
  name?: string
  viewModel?: IRoutedViewModelConstructor
}
/**
 * ViewModel Class
 *
 * Constructor accepts route context as first and only argument
 *
 * See @profiscience/knockout-contrib-router for context API
 */
export interface IRoutedViewModelConstructor {
  new (ctx: Context & IContext): any
}
export declare function componentRoutePlugin({
  component: componentAccessor
}: IRouteConfig): void | LifecycleMiddleware
export declare function disableUninstantiableViewModelWarning(): void
export {}

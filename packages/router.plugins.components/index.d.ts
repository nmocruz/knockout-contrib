import * as ko from 'knockout'
import {
  IRouteConfig,
  LifecycleMiddleware
} from '@profiscience/knockout-contrib-router'
declare module '@profiscience/knockout-contrib-router' {
  interface IRouteConfig {
    components?: LazyComponentsAccessor
  }
}
export declare type LazyComponentsAccessor = () => ILazyComponents
export interface ILazyComponents {
  [k: string]: Promise<{
    template: string
    viewModel?: ko.components.ViewModelConstructor
  }>
}
export declare function componentsRoutePlugin({
  components
}: IRouteConfig): LifecycleMiddleware | void

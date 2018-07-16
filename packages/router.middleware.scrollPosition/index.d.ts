import { LifecycleMiddleware } from '@profiscience/knockout-contrib-router'
export declare type ScrollPositionMiddlewareOpts = {
  scrollTo?(x: number, y: number): void
}
export declare function createScrollPositionMiddleware(
  opts?: ScrollPositionMiddlewareOpts
): LifecycleMiddleware

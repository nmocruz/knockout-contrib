import * as ko from 'knockout'
import { LifecycleMiddleware } from '@profiscience/knockout-contrib-router'
export declare const FLASH_MESSAGE: any
export interface IFlashMessage {}
declare module '@profiscience/knockout-contrib-router' {
  interface IContext {}
}
export declare const flashMessage: ko.Observable<
  boolean | string | IFlashMessage | undefined
>
export declare const flashMessageMiddleware: LifecycleMiddleware

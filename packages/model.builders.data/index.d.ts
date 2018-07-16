import * as ko from 'knockout'
declare const DataModelConstructorBuilder_base: any
/**
 * Creates a DataModel constructor with support for async initialization that updates
 * observable properties in derived class when params are changed.
 *
 * Example usage:
 *
 * ```typescript
 * import { observable } from 'knockout-decorators'
 *
 * type MyDataModelParams = {}
 *
 * class MyDataModel extends DataModelConstructorBuilder
 *   // using a mixin to provide `fetch`
 *   .Mixin(RESTMixin('https://example.com/some/api/endpoint'))
 *
 *   // define params type
 *   <MyDataModelParams>{
 *
 *   // define which properties should be observable using decorators
 *   @observable
 *   public somePropertyInAPIResponseThatShouldBeObservable: string
 *   // define non-observable props too for type-safety/autocomplete
 *   public somePropertyInAPIResponseThatShouldNotBeObservable: string
 *
 *   // using a custom fetch method
 *   protected async fetch() {
 *     return await $.get('https://example.com/some/api/endpoint')
 *   }
 * }
 *
 * const model = await MyDataModel.create()
 *
 * model.dispose()
 * ```
 */
export declare class DataModelConstructorBuilder<
  P
> extends DataModelConstructorBuilder_base {
  protected params: P
  protected readonly INSTANCE_ID: any
  /**
   * True if pending `.fetch()` response
   */
  loading: ko.Observable<boolean>
  /**
   * Constructs a new DataModel instance
   *
   * @param params Parameters for the current model state. If observable, will trigger
   *  updates to observable properties when modified
   */
  constructor(
    params: P,
    initData?: {
      [k: string]: any
    }
  )
  /**
   * Return enumerable properties, unwrapped
   */
  toJS(): any
  save(): Promise<void>
  delete(): Promise<void>
  protected update(): Promise<void>
  /**
   * Abstract method that defines how data is retrieved, typically AJAX.
   *
   * Should use `this.params`, if applicable.
   *
   * @abstract
   */
  protected fetch(initData?: any): Promise<any>
  dispose(): void
  /**
   * Factory for instantiating a model and waiting for the initial fetch to complete
   *
   * @param params (Optionally) observable parameters for this instance. Will be passed to the constructor.
   */
  static create<T>(
    this: {
      new (params: any): T
    },
    params: any,
    initData?: any
  ): Promise<T>
  static updateAll(): Promise<void>
}
/**
 * Makes a property non-enumerable. NOT A DECORATOR.
 *
 * Excluded from Object.keys, JSON.stringify, etc; you only find it if you're looking for it.
 *
 * Useful in classes derived from DataModelConstructorBuilder to exclude from `.toJS()`.
 *
 * Example usage
 * ```typescript
 *  import { nonenumerable } from '@profiscience/knockout-contrib-model-builders-data'
 *
 *  const obj = {
 *    foo: true,
 *    bar: true,
 *    dontInclude: true,
 *    baz: true
 *  }
 *
 *  nonenumerable(obj, 'dontInclude')
 *
 *  Object.keys(obj) === ['foo', 'bar', 'baz']
 * ```
 * @param target object with property, e.g. target[prop]
 * @param prop property name
 */
export declare function nonenumerable(target: any, prop: string): void
export {}

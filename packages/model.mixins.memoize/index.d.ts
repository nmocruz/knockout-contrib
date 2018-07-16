import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model-builders-data'
export declare function MemoizeMixin<
  P,
  T extends {
    new (...args: any[]): DataModelConstructorBuilder<P>
  }
>(
  ctor: T
): {
  new (...args: any[]): {}
} & T

import { ConstructorBuilder } from '@profiscience/knockout-contrib-model-builders-base'
export declare function DisposalAggregatorMixin<
  T extends {
    new (...args: any[]): ConstructorBuilder
  }
>(
  ctor: T
): {
  new (...args: any[]): {
    dispose(): void
  }
} & T

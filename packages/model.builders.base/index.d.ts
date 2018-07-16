/**
 * See Constructor Builders concept in the README
 */
export declare class ConstructorBuilder {
  dispose(): void
  /**
   * Dynamically applies mixins and returns a new constructor using the following pattern:
   *
   * ```typescript
   * class MyModel extends ConstructorBuilder.Mixin(myMixin) {}
   * ```
   *
   * @param mixin Mixin to apply to constructor
   */
  static Mixin<
    T1 extends {
      new (...args: any[]): ConstructorBuilder
    },
    T2 extends {
      new (...args: any[]): ConstructorBuilder
    }
  >(this: T1, mixin: (base: T1) => T2): T2
}

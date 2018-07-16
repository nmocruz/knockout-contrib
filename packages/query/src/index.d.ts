import * as ko from 'knockout'
import { Primitive, MaybeArray } from './utils'
export declare type IQueryParam<T> = ko.Computed<T | undefined> & {
  isDefault(): boolean
  clear(): void
  set(v: T | IQueryParamConfig<any>): void
}
export declare type IQuery<T> = { [P in keyof T]: IQueryParam<T[P]> }
export interface IQueryParamConfig<T extends MaybeArray<Primitive>> {
  default: T
  initial?: T
  coerce?(v: any): T
}
export interface IQueryConfig {
  [k: string]: MaybeArray<Primitive> | IQueryParamConfig<any>
}
export interface IQueryParser {
  parse(
    str: string
  ): {
    [k: string]: any
  }
  stringify(obj: { [k: string]: any }): string
}
export declare class Query {
  private static readonly _raw
  private static readonly _refs
  private static _queuedUpdate
  private static _parser
  private readonly _group
  constructor(config: IQueryConfig, group?: string, isViaFactory?: symbol)
  set(config: IQueryConfig): void
  toJS(): {
    [k: string]: any
  }
  toString(): string
  asObservable(): ko.PureComputed<{
    [k: string]: any
  }>
  clear(): void
  dispose(): void
  static parse(
    str: string
  ): {
    [k: string]: any
  }
  static stringify(obj: { [k: string]: MaybeArray<Primitive> }): string
  static create<T extends IQueryConfig>(
    config: T,
    group?: string
  ): IQuery<T> & Query
  static setParser(parser: IQueryParser): void
  static getQueryString(): string
  static fromQS(group?: string): any
  private static getCleanQuery
  private static writeQueryString
  private static queueQueryStringWrite
  private static createQueryParam
  private static isParamConfigObject
  private static getDefaults
}

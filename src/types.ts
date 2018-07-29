export type FunctionArgs<F> = F extends (a: infer A) => any
  ? [A]
  : F extends (a: infer A, b: infer B) => any
    ? [A, B]
    : F extends (a: infer A, b: infer B, c: infer C) => any
      ? [A, B, C]
      : F extends (a: infer A, b: infer B, c: infer C, d: infer D) => any
        ? [A, B, C, D]
        : F extends (
            a: infer A,
            b: infer B,
            c: infer C,
            d: infer D,
            e: infer E
          ) => any
          ? [A, B, C, D, E]
          : never;

export type ConstructorArgs<
  K extends { new (...args: any[]): any }
> = K extends { new (a: infer A): any }
  ? [A]
  : K extends { new (a: infer A, b: infer B): any }
    ? [A, B]
    : K extends { new (a: infer A, b: infer B, c: infer C): any }
      ? [A, B, C]
      : K extends { new (a: infer A, b: infer B, c: infer C, d: infer D): any }
        ? [A, B, C, D]
        : K extends {
            new (
              a: infer A,
              b: infer B,
              c: infer C,
              d: infer D,
              e: infer E
            ): any;
          }
          ? [A, B, C, D, E]
          : never;

export type ExtractPropertyNamesOfType<T, S> = {
  [K in keyof T]: T[K] extends S ? K : never
}[keyof T];

export type ExcludePropertyNamesOfType<T, S> = {
  [K in keyof T]: T[K] extends S ? never : K
}[keyof T];

export type ExtractPropertiesOfType<T, S> = Pick<
  T,
  ExtractPropertyNamesOfType<T, S>
>;

export type ExcludePropertiesOfType<T, S> = Pick<
  T,
  ExcludePropertyNamesOfType<T, S>
>;

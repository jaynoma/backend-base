// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor<T> = Function & { prototype: T };

type ConstructorFunction<T> = new (...args: any[]) => T;

type ExtractArrayTuple<T extends ReadonlyArray<any>> = {
    [K in keyof T]: T[K] extends undefined ? never : T[K];
};

type Writable<T> = {
    -readonly [K in keyof T]: T[K];
};

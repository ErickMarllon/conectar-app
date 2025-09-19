export interface BuildArrayOptions<T> {
  length: number;
  mapper?: (index: number) => T;
  start?: number;
  step?: number;
}

export function buildArray<T = number>({
  length,
  mapper,
  start = 0,
  step = 1,
}: BuildArrayOptions<T>): T[] {
  return Array.from({ length }, (_, i) => (mapper ? mapper(i) : ((start + i * step) as T)));
}

// Exemplo:
// const arr1 = buildArray({ length: 5 });                  // [0, 1, 2, 3, 4]
// const arr2 = buildArray({ length: 5, start: 1 });         // [1, 2, 3, 4, 5]
// const arr3 = buildArray({ length: 5, step: 2 });          // [0, 2, 4, 6, 8]
// const arr4 = buildArray({ length: 3, mapper: i => i*i }); // [0, 1, 4]
// const arr5 = buildArray({ length: 3, mapper: () => 'x' }); // ['x', 'x', 'x']

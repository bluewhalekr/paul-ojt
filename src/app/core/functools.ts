export function range(start: number = 0, stop?: number, step: number = 1): number[] {
  if (stop) {
    return Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step));
  } else {
    return Array.from({ length: start / step }, (_, i) => i * step);
  }
}

export function rangeBetween(n: number = 0, startAt: number = 0, unit: number = 1): number[] {
  return Array.from(Array((n / unit) - startAt), (_, i) => (i * unit) + startAt);
}

export function equalSets (xs, ys) {
  return xs.size === ys.size && [...xs].every((x) => ys.has(x))
}
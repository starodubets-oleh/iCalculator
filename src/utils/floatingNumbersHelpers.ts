export const getMaxFloatingNumbersCount = (a: number, b: number): number => {
  const [, floatingA] = a.toString().split('.');
  const [, floatingB] = b.toString().split('.');

  return ((floatingA && floatingA.length) || (floatingB && floatingB.length) || 0) + 1;
};
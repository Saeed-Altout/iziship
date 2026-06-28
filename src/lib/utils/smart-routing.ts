export function bezierPath(fromX: number, fromY: number, toX: number, toY: number): string {
  const mx = (fromX + toX) / 2;
  return `M ${fromX} ${fromY} C ${mx} ${fromY}, ${mx} ${toY}, ${toX} ${toY}`;
}

export function cardCenterY(
  count: number,
  index: number,
  gap: number,
  cardH: number,
  containerCY: number,
): number {
  const totalHeight = count * cardH + (count - 1) * gap;
  const startY = containerCY - totalHeight / 2;
  return startY + index * (cardH + gap) + cardH / 2;
}

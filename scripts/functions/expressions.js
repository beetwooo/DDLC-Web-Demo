function getExpressionImage(charKey, exprKey) {
  const normalizedKey = charKey ? charKey.toLowerCase() : charKey;
  const map = characterMap[normalizedKey];
  if (!map) return null;
  if (exprKey && map.expressions && map.expressions[exprKey]) {
    return `./images/characters/${normalizedKey}/${map.expressions[exprKey]}`;
  }
  return map.img;
}
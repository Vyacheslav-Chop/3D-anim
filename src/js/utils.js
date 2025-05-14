export function parseColorToRGBA(color, opacity = 1.0) {
  if (Array.isArray(color)) {
    return color.length === 4 ? color : [...color, opacity];
  }

  if (typeof color === 'string') {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const bigint = parseInt(hex, 16);
      const r = ((bigint >> 16) & 255) / 255;
      const g = ((bigint >> 8) & 255) / 255;
      const b = (bigint & 255) / 255;
      return [r, g, b, opacity];
    }

    if (color.startsWith('rgba')) {
      const re = new RegExp('rgba|\\(|\\)|\\s', 'g');
      const nums = color
        .replace(re, '')
        .split(',')
        .map((num, i) => (i < 3 ? parseInt(num) : parseFloat(num)));
      const [r, g, b, a = 1] = nums;
      return [r / 255, g / 255, b / 255, a];
    }

    if (color.startsWith('rgb')) {
      const re = new RegExp('rgb|\\(|\\)|\\s', 'g');
      const nums = color
        .replace(re, '')
        .split(',')
        .map(num => parseInt(num) / 255);
      return [...nums, opacity];
    }
  }

  return [0, 0, 0, 1];
}

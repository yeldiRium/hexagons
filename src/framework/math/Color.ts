import { defekt } from 'defekt';

class ColorValuesInvalid extends defekt({ code: 'ColorValuesInvalid' }) {}

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

const createColor = function ({ r, g, b, a = 255 }: {
  r: number;
  g: number;
  b: number;
  a?: number;
}): Color {
  if (
    r < 0 || r > 255 ||
    g < 0 || g > 255 ||
    b < 0 || b > 255 ||
    a < 0 || a > 255
  ) {
    throw new ColorValuesInvalid('Color values are out of valid bounds.');
  }

  return {
    r, g, b, a
  };
};

const toHexString = function ({ color }: {
  color: Color;
}): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

const predefined = {
  black: createColor({ r: 0, g: 0, b: 0, a: 255 }),
  white: createColor({ r: 255, g: 255, b: 255, a: 255 }),
  transparent: createColor({ r: 0, g: 0, b: 0, a: 0 })
};

export type {
  Color
};
export {
  ColorValuesInvalid,
  createColor,
  predefined,
  toHexString
};

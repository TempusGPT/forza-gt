import * as math from "$lib/math";

export const calculateArithmetic = function* (
  speed: number,
  first: number,
  last: number
) {
  for (let i = 0; i < speed; i++) {
    const t = i / (speed - 1);
    yield first / math.lerp(last, first, t);
  }
};

// 0 <= r <= (last / first) ** (1 / (speed - 1))
export const calculateGeometric = function* (
  speed: number,
  first: number,
  last: number,
  ratio: number
) {
  const lastTerm = ratio ** (speed - 1) - 1;
  for (let i = 0; i < speed; i++) {
    const t = (ratio ** i - 1) / lastTerm;
    yield first / math.lerp(last, first, t);
  }
};

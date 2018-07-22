/**
 * Counter increment/decrement
 */

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function alterCounterValue(type, step) {
  return {
    type,
    step,
  };
}

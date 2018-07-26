/** @flow */

/**
 * Counter increment/decrement
 */

export type AlterCounterValueTypes = {
  type: string,
  step: number,
};

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function alterCounterValue(type: string, step: number) {
  return {
    type,
    step,
  };
}

/** @flow */

/**
 * Increase counter value
 */

export const INCREASE_COUNTER: string = 'INCREASE_COUNTER';

export function increaseCounter(step: number) {
  return {
    type: INCREASE_COUNTER,
    step,
  };
}

export const DECREASE_COUNTER: string = 'DECREASE_COUNTER';

export function decreaseCoutner(step: number) {
  return {
    type: DECREASE_COUNTER,
    step,
  };
}

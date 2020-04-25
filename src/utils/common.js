/**
 * Adds zero to number that less then 10
 * @param {number} number
 * @return {string}
 */
export const addZeroToNumber = (number) => number.toString().length < 2 ? `0` + number : number;

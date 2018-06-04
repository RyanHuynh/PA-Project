/** @module Utility */

export function objectArrayToString(arr) {
  if (arr) {
    const arrString = arr.map(val => `${JSON.stringify(val)}`).join(',');
    return `[${arrString}]`;
  }
  return arr;
}

export function HumanFileSize(bytes, si) {
  const thresh = si ? 1000 : 1024;
  let temp = bytes;
  if (Math.abs(temp) < thresh) {
    return `${temp} B`;
  }
  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  do {
    temp /= thresh;
    u += 1;
  } while (Math.abs(temp) >= thresh && u < units.length - 1);
  return `${temp.toFixed(1)} ${units[u]}`;
}

/**
 * Utility function for delaying something, usually polling
 * @param {Number} milliseconds - amount of milliseconds to delay for
 */
export function delay(milliseconds) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), milliseconds);
  });
  return promise;
}

/**
 * Utility function for converting a primitive value to a value object
 * @param {String} value - value
 */
export function valueToOption(value) {
  return {
    key: value,
    text: value,
    value,
  };
}

/**
 * Utility function for case-insensitive sorting of string values
 * @param {String} a - first value
 * @param {String} b - second value
 */
export function valueSort(a, b) {
  return a.localeCompare(b, 'en', { sensitivity: 'base' });
}

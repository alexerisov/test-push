export const getNumberWithMaxDigits = (value, maxDigits) => {
  if (!Number.isFinite(value) || !Number.isFinite(maxDigits)) {
    throw new Error('Value which you provide is not type of number');
  }

  return Number(value.toFixed(maxDigits)).toString();
};

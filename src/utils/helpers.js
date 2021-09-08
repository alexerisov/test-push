export const getNumberWithMaxDigits = (value, maxDigits) => {
  if (!Number.isFinite(value) || !Number.isFinite(maxDigits)) {
    throw new Error('Value which you provide is not type of number');
  }

  return Number(value.toFixed(maxDigits)).toString();
};

export const removeHTMLTagsFromString = (value) => {
  if (typeof value !== "string") {
    throw new Error('You have provide not string value');
  }

  return value.replace(/<[^>]*>|\s/g, '');
};

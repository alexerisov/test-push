export const isWindowExist = () => {
  if (typeof window !== 'undefined') {
    return true;
  } else {
    return false;
  }
};

export const getBaseUrl = () => {
  if (isWindowExist()) {
    return location.origin;
  }

  return global.location;
};

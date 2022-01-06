import { isWindowExist } from './isTypeOfWindow';

export const windowScroll = (top = 100) => {
  if (isWindowExist()) {
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};

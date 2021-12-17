import { isWindowExist } from './isTypeOfWindow';

export const windowScroll = (top = 100) => {
  if (isWindowExist()) {
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    });
  }
};

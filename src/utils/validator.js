import {MAX_LENGTH_LIMIT_ACHIEVED, REQUIRED_FIELD} from "@/utils/constants";

export const validator = {
  getErrorStatusByCheckingLength({currentLength, maxLength}) {
    if (!currentLength) {
      return REQUIRED_FIELD;
    }

    if (maxLength && currentLength === maxLength) {
      return `${MAX_LENGTH_LIMIT_ACHIEVED} ${maxLength} characters`;
    }

    return '';
  },

  checkNumberOfDigits({maxDigits, value}) {
    return String(value).split('.')?.[1]?.length > maxDigits;
  }
};

export const phoneNumberToServerValue = (phoneNumber) => {
    const regexp = /^((\+1|\+7|)\d{3}\d{3}\d{4})$/;
    const match = phoneNumber.match(regexp);
    if (match?.length > 0) {
      return `+${match.join('')}`;
    }
    return null;
};
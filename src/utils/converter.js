export const phoneNumberToServerValue = phoneNumber => {
  const regexp = /^((\+1|\+7|)\d{3}\d{3}\d{4})$/;
  const match = phoneNumber.match(regexp);
  if (match?.length > 0) {
    return `+${match.join('')}`;
  }
  return null;
};
export function numberWithCommas(stringNum) {
  return parseFloat(stringNum);
}

export const convertToHours = number => {
  let totalSeconds = number;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutes = String(minutes).padStart(2, '0');
  hours = String(hours).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  return hours + ' : ' + minutes + ' : ' + seconds;
};

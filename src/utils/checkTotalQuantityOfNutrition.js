export const getMaxQuantityOfNutrition = ({ fat = 0, carbs = 0, proteins = 0 }) => {
  return +(100 - fat - carbs - proteins).toFixed(2);
};

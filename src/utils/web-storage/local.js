const parseItem = (name, defaultReturn = null) => {
  const str = localStorage.getItem(name);
  if (!str || str === 'undefined') {
    return defaultReturn;
  }
  return JSON.parse(str);
};

export const recoveryLocalStorage = {
  getCreateRecipe: () => parseItem('createRecipe'),
  setCreateRecipe: value => {
    localStorage.setItem('createRecipe', JSON.stringify(value));
  },
  deleteCreateRecipe: () => {
    localStorage.removeItem('createRecipe');
  },

  getDateOfUserRecipeLike: recipeId => localStorage.getItem(`likeDate${recipeId}`),
  setDateOfUserRecipeLike: (recipeId, value) => {
    localStorage.setItem(`likeDate${recipeId}`, value);
  },
  deleteDateOfUserRecipeLike: recipeId => {
    localStorage.removeItem(`likeDate${recipeId}`);
  }
};

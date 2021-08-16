export const cuisineList = {
  1: 'American',
  2: 'Chinese',
  3: 'Continental',
  4: 'Cuban',
  5: 'French',
  6: 'Greek',
  7: 'Indian',
  8: 'Indonisian',
  9: 'Italian',
  10: 'Japanese',
  11: 'Korean',
  12: 'Libanese',
  13: 'Malyasian',
  14: 'Mexican',
  15: 'Spanish',
  16: 'Thai',
  17: 'Moracon',
  18: 'Turkish'
};

export const recipeTypes = {
  1: 'Breakfast',
  2: 'Lunch',
  3: 'Dinner',
  4: 'Dessert',
  5: 'Beverage',
  6: 'Appetizer',
  7: 'Salad',
  8: 'Bread'
};

export const cookingSkill = {
  1: 'Easy',
  2: 'Medium',
  3: 'Complex'
};

export const cookingMethods = {
  1: 'Broiling',
  2: 'Grilling',
  3: 'Roasting',
  4: 'Baking',
  5: 'Sauteing',
  6: 'Poaching',
  7: 'Simmering',
  8: 'Boiling',
  9: 'Steaming',
  10: 'Braising',
  11: 'Stewing'
};

export const dietaryrestrictions = {
  0: 'None',
  1: 'Vegan',
  2: 'Vegetarian',
  3: 'Pescetarian',
  4: 'Gluten Free',
  5: 'Grain Free',
  6: 'Dairy Free',
  7: 'High Protein',
  8: 'Low Sodium',
  9: 'Low Carb',
  10: 'Paleo',
  11: 'Primal',
  12: 'Ketogenic',
  13: 'FODMAP',
  14: 'Whole 30'
};

export const units = {
  0: '',
  1: 'bag(s)',
  2: 'bottle',
  3: 'box(es)',
  4: 'bunch',
  5: 'can',
  6: 'chunks',
  7: 'clove(s)',
  8: 'container',
  9: 'cube',
  10: 'cup(s)',
  11: 'dash(es)',
  12: 'gram(s)',
  13: 'halves',
  14: 'handful',
  15: 'head',
  16: 'inch(es)',
  17: 'jar',
  18: 'kg',
  19: 'large bag',
  20: 'large can',
  21: 'large clove(s)',
  22: 'large handful',
  23: 'large head',
  24: 'large leaves',
  25: 'large slices',
  26: 'lb(s)',
  27: 'leaves',
  28: 'liter(s)',
  29: 'loaf',
  30: 'medium head',
  31: 'milliliters',
  32: 'ounce(s)',
  33: 'package',
  34: 'packet',
  35: 'piece(s)',
  36: 'pinch',
  37: 'pint',
  38: 'pound(s)',
  39: 'quart',
  40: 'serving(s)',
  41: 'sheet(s)',
  42: 'slice(s)',
  43: 'small can',
  44: 'small head',
  45: 'small pinch',
  46: 'sprig(s)',
  47: 'stalk(s)',
  48: 'tablespoon(s)',
  49: 'teaspoon(s)'
};

export const nutritions = {
  calories: 'Calories',
  proteins: 'Protein',
  carbohydrates: 'Carbs',
  fats: 'Fat'
};

export const ordering = [
  {
    valueSort: '-views_number',
    nameSort: 'Views'
  },
  {
    valueSort: '-likes_number',
    nameSort: 'Vote'
  },
  {
    valueSort: '-created_at',
    nameSort: 'New'
  }
];

export const USER_TYPE = {
  viewerType: 0,
  chefType: 1
};

export const PUBLISH_STATUS = {
  notPublished: 1,
  published: 2
};

export const APPROVED_STATUS = {
  1: 'Awaiting',
  2: 'Approved',
  3: 'Rejected'
};

export const pageNames = {
  '/': 'Home',
  '/my-uploads': 'My recipe',
  '/saved-recipes': 'Saved recipes'
};

export const notificationTypesText = {
  1: payload => {
    let link = `/profile/account-settings`;
    return {
      link: link,
      text: `Click to go to profile settings`
    };
  },
  2: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      link: link,
      text: `Click to view the recipe ${payload?.title}`
    };
  },
  3: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      link: link,
      text: `Click to view the recipe ${payload?.title}`
    };
  },
  4: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      link: link,
      text: `Click to view the recipe ${payload?.title}`
    };
  }
};

export const notificationTypesTitle = {
  1: () => {
    return 'The account has been created. Welcome to EatChef!';
  },
  2: () => {
    return 'Recipe created. Awaiting approval';
  },
  3: payload => {
    return `Recipe ${APPROVED_STATUS[payload?.status].toLowerCase()}`;
  },
  4: payload => {
    return `${payload.count} new comment in your recipe`;
  }
};

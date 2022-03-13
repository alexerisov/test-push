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

export const categoryList = {
  1: 'General',
  2: 'Second',
  3: 'Breakfast',
  4: 'Dinner',
  5: 'Fish',
  6: 'Meat'
};

export const recipeTypes = {
  1: 'Breakfast',
  2: 'Lunch',
  3: 'Dinner',
  4: 'Dessert',
  6: 'Appetizer',
  7: 'Salad',
  8: 'Bread'
};

export const recipeTypesCount = {
  Breakfast: 'breakfast_num',
  Lunch: 'lunch_num',
  Dinner: 'dinner_num',
  Dessert: 'dessert_num',
  Appetizer: 'appetizer_num',
  Salad: 'salad_num',
  Bread: 'bread_num'
};

export const recipeTypesImg = {
  1: 'icons/Burger/Line.svg',
  2: 'icons/Serving Plate/Line.svg',
  3: 'icons/Soup/Line.svg',
  4: 'icons/Ice Cream/Line.svg',
  5: '',
  6: 'icons/French Fries/Line.svg',
  7: 'icons/Carrot/Line.svg',
  8: 'icons/Donut/Line.svg'
};

export const recommendedList = {
  1: 'Latest',
  2: 'Cheapest',
  3: 'Quickest'
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
  6: '',
  7: 'Simmering',
  8: 'Boiling',
  9: 'Steaming',
  10: 'Braising',
  11: 'Stewing'
};

export const cookingMethodsCount = {
  Broiling: 'broiling_num',
  Grilling: 'grilling_num',
  Roasting: 'roasting_num',
  Baking: 'baking_num',
  Sauteing: 'sauteing_num',
  Simmering: 'simmering_num',
  Boiling: 'boiling_num',
  Steaming: 'steaming_num',
  Braising: 'braising_num',
  Stewing: 'stewing_num'
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
  14: 'Whole 30',
  15: 'Low FODMAP',
  16: 'High FODMAP'
};
export const dietaryrestrictionsCount = {
  Vegan: 'vegan_num',
  Vegetarian: 'vegetarian_num',
  Pescetarian: 'pescetarian_num',
  'Gluten Free': 'gluten_free_num',
  'Grain Free': 'grain_free_num',
  'Dairy Free': 'dairy_free_num',
  'High Protein': 'high_protein_num',
  'Low Sodium': 'low_sodium_num',
  'Low Carb': 'low_carb_num',
  Paleo: 'paleo_num',
  Primal: 'primal_num',
  Ketogenic: 'ketogenic_num',
  FODMAP: 'fodmap_num',
  'Whole 30': 'whole_30_num',
  'Low FODMAP': 'low_fodmap_num',
  'High FODMAP': 'high_fodmap_num'
};
export const units = {
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
  49: 'teaspoon(s)',
  50: 'thing(s)',
  51: 'other'
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

export const ORDER_STATUS = {
  1: 'Not paid', // # created - initial state
  2: 'Placed', // # added by the consumer - paid
  3: 'Received by chef', // # order received/in progress (received by the cloud kitchen chef).
  4: 'Ready', // # finished and ready to be delivered to the distribution team
  5: 'On the way', // # delivered to the distribution team
  6: 'Delivered'
};

export const APPROVED_STATUS = {
  1: 'Awaiting',
  2: 'Approved',
  3: 'Rejected'
};

export const SALE_STATUS = {
  4: 'Awaiting action',
  5: 'Approved for production',
  6: 'Rejected for production',
  7: 'No sale'
};

export const IS_APPROVED = {
  approved: 2,
  rejected: 3
};

const RECIPE_RATING_TYPES = {
  1: 'taste',
  2: 'valueForMoney',
  3: 'originality'
};

export const pageNames = {
  '/': 'Home',
  '/my-uploads': 'My recipe',
  '/saved-recipes': 'Saved recipes',
  '/chef-pencil': "Chef's pencil"
};

export const absolutePaths = {
  production: 'https://eatchefs.com',
  stage: 'https://eatchefs.goodbit.dev',
  development: 'http://localhost:8030'
};

export const notificationTypesText = {
  1: payload => {
    if (payload.user_type === USER_TYPE.chefType) {
      let link = `/recipe/upload`;
      return {
        text: `<p>Congratulations you just joined the Home Chef Community! Congratulations you just joined the Home Chef Community! <a href=${link}>Create your first recipe?</a></p>`
      };
    } else {
      let link = `/search`;
      return {
        text: `<p>Welcome to EatChefs! Now you can enjoy a lot of recipes created by our team and</p><a href=${link}>Home Chef</a>`
      };
    }
  },
  2: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      text: `<p><a href=${link}>${payload?.title}</a> submitted successfully! Our team is reviewing and we will get back to you soon!</p>`
    };
  },
  3: payload => {
    if (payload?.status === IS_APPROVED.approved) {
      let link = `/recipe/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> submitted Published! You can check it here</p>`
      };
    }
    if (payload?.status === IS_APPROVED.rejected) {
      let link = `/recipe/editing/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> has some remarks! Please check it below: ${payload.rejection_reason}</p>`
      };
    }
  },
  4: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      text: `<p>Click to view the recipe <a href=${link}>${payload?.title}</a></p>`
    };
  },
  5: payload => {
    let link = `/chef_pencil/${payload?.id}`;
    return {
      text: `<p><a href=${link}>${payload?.title}</a> submitted successfully! Our team is reviewing and we will get back to you soon!</p>`
    };
  },
  6: payload => {
    if (payload?.status === IS_APPROVED.approved) {
      let link = `/chef_pencil/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> submitted Published! You can check it here</p>`
      };
    }
    if (payload?.status === IS_APPROVED.rejected) {
      let link = `/chef_pencil/editing/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> has some remarks! Please check it below: ${payload?.rejection_reason}</p>`
      };
    }
  },
  7: payload => {
    let link = `/chef_pencil/${payload?.id}`;
    return {
      text: `<p>Click to view the chef pencil <a href=${link}>${payload?.title}</a></p>`
    };
  },
  8: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      text: `<p>Click to view the recipe <a href=${link}>${payload?.title}</a></p>`
    };
  }
};

export const notificationTypesTitle = {
  1: payload => {
    if (payload?.user_type === USER_TYPE.chefType) {
      return 'New Chef Registration';
    } else {
      return 'New Customer Registration';
    }
  },
  2: () => {
    return 'Recipe Submission';
  },
  3: payload => {
    return `Recipe ${APPROVED_STATUS[payload?.status]}`;
  },
  4: payload => {
    return `${payload.count} new comment in your recipe`;
  },
  5: () => {
    return 'Chef Pencil Record Submission';
  },
  6: payload => {
    return `Chef Pencil ${APPROVED_STATUS[payload?.status]}`;
  },
  7: payload => {
    return `${payload.count} new comment in your Chef Pencil Record`;
  },
  8: payload => {
    return `Recipe ${SALE_STATUS[payload?.sale_status]}`;
  }
};

export const nameErrorRecipe = [
  { nameErrorResponse: 'title', nameInput: 'create-title' },
  { nameErrorResponse: 'description', nameInput: 'create-description' },
  { nameErrorResponse: 'ingredients', nameDiv: 'create-ingredients' },
  { nameErrorResponse: 'images', nameInput: 'create-images' },
  { nameErrorResponse: 'images_to_delete', nameInput: 'create-images' },
  { nameErrorResponse: 'main_image', nameInput: 'create-images' },
  { nameErrorResponse: 'preview_mp4_url', nameDiv: 'DemoCamera' },
  { nameErrorResponse: 'publish_status', nameInput: 'publish_status' },
  { nameErrorResponse: 'caption', nameInput: 'create-caption' },
  { nameErrorResponse: 'language', nameInput: 'create-language' },
  { nameErrorResponse: 'diet_restrictions', nameDiv: 'create-diet-restrictions-select' },
  { nameErrorResponse: 'cuisines', nameDiv: 'create-cuisines-select' },
  { nameErrorResponse: 'cooking_skills', nameDiv: 'create-cooking-skills-select' },
  { nameErrorResponse: 'cooking_methods', nameDiv: 'create-cooking-methods-select' },
  { nameErrorResponse: 'image', nameDiv: 'chef-pencil-upload-image' },
  { nameErrorResponse: 'html_content', nameDiv: 'chef-pencil-editor' }
];

export const nameErrorProfile = [
  { nameErrorResponse: 'full_name', nameInput: 'full_name' },
  { nameErrorResponse: 'avatar', nameInput: 'avatar' },
  { nameErrorResponse: 'bio', nameInput: 'bio' },
  { nameErrorResponse: 'city', nameInput: 'city' },
  { nameErrorResponse: 'phone_number', nameInput: 'phone_number' },
  { nameErrorResponse: 'language', nameInput: 'language' }
];

export const LANGUAGES = {
  en: 'english',
  nl: 'dutch'
};

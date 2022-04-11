import { i18n } from 'next-i18next';

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
} as const;

export const categoryList = {
  1: 'General',
  2: 'Second',
  3: 'Breakfast',
  4: 'Dinner',
  5: 'Fish',
  6: 'Meat'
} as const;

export const recipeTypes = {
  1: 'Breakfast',
  2: 'Lunch',
  3: 'Dinner',
  4: 'Dessert',
  6: 'Appetizer',
  7: 'Salad',
  8: 'Bread'
} as const;

export const recipeTypesCount = {
  Breakfast: 'breakfast_num',
  Lunch: 'lunch_num',
  Dinner: 'dinner_num',
  Dessert: 'dessert_num',
  Appetizer: 'appetizer_num',
  Salad: 'salad_num',
  Bread: 'bread_num'
} as const;

export const recommendedList = {
  0: 'Recommended',
  1: 'Latest',
  2: 'Cheapest',
  3: 'Quickest'
} as const;

export const cookingSkill = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard'
} as const;

export const cookingMethods = {
  1: 'Broiling',
  2: 'Grilling',
  3: 'Roasting',
  4: 'Baking',
  5: 'Sauteing',
  7: 'Simmering',
  8: 'Boiling',
  9: 'Steaming',
  10: 'Braising',
  11: 'Stewing'
} as const;

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
} as const;

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
} as const;

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
} as const;

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
} as const;

export const nutritions = {
  calories: 'Calories',
  proteins: 'Protein',
  carbohydrates: 'Carbs',
  fats: 'Fat'
} as const;

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
] as const;

export const USER_TYPE = {
  viewerType: 0,
  chefType: 1
} as const;

export const PUBLISH_STATUS = {
  notPublished: 1,
  published: 2
} as const;

export const ORDER_STATUS = {
  1: 'Not paid', // # created - initial state
  2: 'Placed', // # added by the consumer - paid
  3: 'Received by chef', // # order received/in progress (received by the cloud kitchen chef).
  4: 'Ready', // # finished and ready to be delivered to the distribution team
  5: 'On the way', // # delivered to the distribution team
  6: 'Delivered'
} as const;

export const APPROVED_STATUS = {
  1: 'Awaiting',
  2: 'Approved',
  3: 'Rejected'
} as const;

export const SALE_STATUS = {
  4: 'Awaiting action',
  5: 'Approved for production',
  6: 'Rejected for production',
  7: 'No sale'
} as const;

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
} as const;

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
        text: `<p>${i18n.t('notifications:welcome.chef')} <a href=${link}>${i18n.t(
          'notifications:create_recipe'
        )}</a></p>`
      };
    } else {
      let link = `/search`;
      return {
        text: `<p>${i18n.t('notifications:welcome.viewer')}</p><a href=${link}>${i18n.t('notifications:home_chef')}</a>`
      };
    }
  },
  2: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      text: `<p><a href=${link}>${payload?.title}</a> ${i18n.t('notifications:recipe_submitted')}</p>`
    };
  },
  3: payload => {
    if (payload?.status === IS_APPROVED.approved) {
      let link = `/recipe/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> ${i18n.t('notifications:recipe_published')}</p>`
      };
    }
    if (payload?.status === IS_APPROVED.rejected) {
      let link = `/recipe/editing/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> ${i18n.t('notifications:recipe_rejected')} ${
          payload.rejection_reason
        }</p>`
      };
    }
  },
  4: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      text: `<p>${i18n.t('notifications:view_recipe')} <a href=${link}>${payload?.title}</a></p>`
    };
  },
  5: payload => {
    let link = `/chef_pencil/${payload?.id}`;
    return {
      text: `<p><a href=${link}>${payload?.title}</a> ${i18n.t('notifications:pencil_submitted')}</p>`
    };
  },
  6: payload => {
    if (payload?.status === IS_APPROVED.approved) {
      let link = `/chef_pencil/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> ${i18n.t('notifications:pencil_published')}</p>`
      };
    }
    if (payload?.status === IS_APPROVED.rejected) {
      let link = `/chef_pencil/editing/${payload?.id}`;
      return {
        text: `<p><a href=${link}>${payload?.title}</a> ${i18n.t('notifications:pencil_rejected')} ${
          payload?.rejection_reason
        }</p>`
      };
    }
  },
  7: payload => {
    let link = `/chef_pencil/${payload?.id}`;
    return {
      text: `<p>${i18n.t('notifications:view_pencil')} <a href=${link}>${payload?.title}</a></p>`
    };
  },
  8: payload => {
    let link = `/recipe/${payload?.id}`;
    return {
      text: `<p>${i18n.t('notifications:view_recipe')} <a href=${link}>${payload?.title}</a></p>`
    };
  }
};

export const notificationTypesTitle = {
  1: payload => {
    if (payload?.user_type === USER_TYPE.chefType) {
      return i18n.t('notifications:chef_registration');
    } else {
      return i18n.t('notifications:viewer_registration');
    }
  },
  2: () => {
    return i18n.t('notifications:recipe_submission');
  },
  3: payload => {
    return i18n.t('notifications:recipe') + t(`notifications:approved_status.${payload?.status}`);
  },
  4: payload => {
    return `${payload.count} ${i18n.t('notifications:recipe_new_comment')}`;
  },
  5: () => {
    return i18n.t('notifications:pencil_submission');
  },
  6: payload => {
    return i18n.t('notifications:pencil') + t(`notifications:approved_status.${payload?.status}`);
  },
  7: payload => {
    return `${payload.count} ${i18n.t('notifications:pencil_new_comment')}`;
  },
  8: payload => {
    return i18n.t('notifications:recipe') + t(`notifications:sale_status.${payload?.sale_status}`);
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
] as const;

export const nameErrorProfile = [
  { nameErrorResponse: 'full_name', nameInput: 'full_name' },
  { nameErrorResponse: 'avatar', nameInput: 'avatar' },
  { nameErrorResponse: 'bio', nameInput: 'bio' },
  { nameErrorResponse: 'city', nameInput: 'city' },
  { nameErrorResponse: 'phone_number', nameInput: 'phone_number' },
  { nameErrorResponse: 'language', nameInput: 'language' }
] as const;

export const LANGUAGES = {
  en: 'english',
  nl: 'dutch',
  english: 'en',
  dutch: 'nl'
} as const;

import reducer from '../../utils/reducer';
import { types } from './actions.js';

const initState = {
  data: {
    title: '',
    cooking_time: '',
    cuisines: [],
    cooking_skills: '',
    cooking_methods: [],
    diet_restrictions: [],
    description: '',
    video: '',
    types: [],
    // tags: null,
    language: '',
    caption: '',
    ingredients: [],
    calories: null,
    proteins: null,
    carbohydrates: null,
    fats: null,
    steps: [],
    publish_status: null,
    images: [],
    main_image: null
  },
  isLoading: false,
  error: null
};

export default reducer(initState, {
  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload
      }
    };
  },

  [types.CLEAR]: () => {
    return initState;
  },

  [types.UPDATE_ERROR]: (state, action) => {
    return {
      ...state,
      error: {
        ...state.error,
        ...action.payload
      }
    };
  },

  [types.SEND]: state => {
    return {
      ...state,
      isLoading: true,
      error: null
    };
  },

  [types.SEND_SUCCESS]: state => {
    return {
      ...state,
      isLoading: false,
      error: null
    };
  },

  [types.SEND_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }
});

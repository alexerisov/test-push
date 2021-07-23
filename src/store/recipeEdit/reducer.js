import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  data: {
    title: "",
    cooking_time: "",
    cuisines: [],
    // cooking_skill: "",
    cooking_methods: [],
    diet_restrictions: [],
    description: "",
    preview_thumbnail_url: "",
    preview_full_thumbnail_url: "",
    preview_mp4_url: "",
    preview_webm_url: "",
    types: [],
    // tags: null,
    language: "",
    caption: "",
    ingredients: [],
    calories: null,
    proteins: null,
    carbohydrates: null,
    fats: null,
    steps: [],
    publish_status: null,
    images: [],
    images_to_delete: []
  },
  isLoading: false,
  error: null,
};

export default reducer(initState, {

  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    };
  },

  [types.UPDATE_ERROR]: (state, action) => {
    return {
      ...state,
      error: {
        ...state.error,
        ...action.payload,
      },
    };
  },

  [types.SEND]: (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  },

  [types.SEND_SUCCESS]: (state) => {
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  },

  [types.SEND_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  },

});
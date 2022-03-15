import reducer from '../../utils/reducer';
import { types } from './actions.js';
import { AuthCookieStorage } from '@/utils/web-storage/cookie';

const { token, refresh } = AuthCookieStorage.auth;

const initState = {
  profile: null,
  hasToken: !!token,
  token: token,
  refresh: refresh,
  remindWait: false,
  remindError: null
};

export default reducer(initState, {
  [types.SAVE_SESSION]: (state, action) => {
    const profile = action.payload.profile ? action.payload.profile : state.profile;
    return {
      ...state,
      profile,
      hasToken: !!action.payload.token,
      token: action.payload.token,
      refresh: action.payload.refresh
    };
  },

  [types.LOGOUT]: state => {
    return {
      ...state,
      profile: {},
      hasToken: false,
      token: null,
      refresh: null
    };
  },

  [types.REMIND]: state => {
    return {
      ...state,
      remindWait: true,
      remindError: null
    };
  },

  [types.REMIND_SUCCESS]: (state, action) => {
    return {
      ...state,
      profile: action.payload.profile,
      hasToken: true,
      remindWait: false
    };
  },

  [types.REMIND_FAILURE]: (state, action) => {
    return {
      ...state,
      hasToken: false,
      token: null,
      refresh: null,
      remindWait: false,
      remindError: action.error
    };
  }
});

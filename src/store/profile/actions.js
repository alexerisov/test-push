import Account from '@/api/Account';
import camelcaseToUnderscore from '@/utils/camelcase-underscore';

export const types = {
  UPDATE: Symbol('UPDATE'),

  SEND: Symbol('SEND'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE'),
};

export default {

  init: (data) => {
    const profile = { ...data };
    return dispatch => {
      dispatch({
        type: types.UPDATE,
        payload: {
          city: profile?.city,
          full_name: profile?.full_name,
          phone_number: profile?.phone_number,
          email: profile.email,
          language: profile?.language,
          user_type: profile.user_type,
        },
      });
    };
  },

  update: (data) => {
    return dispatch => {
      dispatch({
        type: types.UPDATE,
        payload: data,
      });
    };
  },

  updateProfile: (data) => {
    return async dispatch => {
      dispatch({ type: types.SEND });

      try {
        const sendData = camelcaseToUnderscore(data);
        await Account.updateProfile(
          {
            ...sendData,
            city: sendData.city,
            full_name: sendData.full_name,
            phone_number: sendData?.phone_number,
            email: sendData?.email,
            language: sendData?.language,
            user_type: +sendData?.user_type,
          },
          sendData?.avatar ?? null,
        );
        dispatch({ type: types.SEND_SUCCESS });
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

  updateAccountType: (data) => {
    return async dispatch => {
      dispatch({ type: types.SEND });

      try {
        const sendData = camelcaseToUnderscore(data);
        await Account.updateAccountType(
          {
            ...sendData,
            city: sendData.city,
            full_name: sendData.full_name,
            bio: sendData.bio,
            phone_number: sendData?.phone_number,
            email: sendData?.email,
            language: sendData?.language,
            user_type: +sendData?.user_type,
            experience: sendData?.experience,
            personal_cooking_mission: sendData?.personal_cooking_mission,
            source_of_inspiration: sendData?.source_of_inspiration,
            cooking_philosophy: sendData?.cooking_philosophy,
          },
          sendData?.avatar ?? null,
        );
        dispatch({ type: types.SEND_SUCCESS });
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },
};
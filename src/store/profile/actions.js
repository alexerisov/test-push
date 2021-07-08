import Account from '@/api/Account';
import camelcaseToUnderscore from '@/utils/camelcase-underscore';

export const types = {
  UPDATE: Symbol('UPDATE'),

  SEND: Symbol('SEND'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE'),
};

export default {
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
            avatar: sendData?.avatar,
          },
        );
        dispatch({ type: types.SEND_SUCCESS });
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },
};
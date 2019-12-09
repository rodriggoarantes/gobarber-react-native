import produce from 'immer';
import { TYPES } from './actions';
import { TYPES as AUTH_TYPES } from '../auth/actions';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AUTH_TYPES.SIGNIN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }

      case TYPES.UPDATE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }

      case TYPES.SIGNOUT: {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}

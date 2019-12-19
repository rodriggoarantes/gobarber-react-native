import produce from 'immer';
import { TYPES } from './actions';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case TYPES.SIGNIN: {
        draft.loading = true;
        break;
      }

      case TYPES.SIGNIN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case TYPES.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }

      case TYPES.SIGNOUT: {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}

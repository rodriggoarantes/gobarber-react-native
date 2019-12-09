export const TYPES = {
  SIGNIN: '@auth/SIGN_IN_REQUEST',
  SIGNIN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGNUP: '@auth/SIGN_UP_REQUEST',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
  SIGNOUT: '@auth/SIGN_OUT_REQUEST',
};

export function signInRequest(email, password) {
  return {
    type: TYPES.SIGNIN,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: TYPES.SIGNIN_SUCCESS,
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: TYPES.SIGNUP,
    payload: { name, email, password },
  };
}

export function signFailure() {
  return {
    type: TYPES.SIGN_FAILURE,
  };
}

export function signOut() {
  return {
    type: TYPES.SIGNOUT,
  };
}

export const TYPES = {
  UPDATE_REQUEST: '@user/UPDATE_REQUEST',
  UPDATE_SUCCESS: '@user/UPDATE_SUCCESS',
  UPDATE_FAILURE: '@user/UPDATE_FAILURE',
};

export function updateProfileRequest(data) {
  return {
    type: TYPES.UPDATE_REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: TYPES.UPDATE_SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: TYPES.UPDATE_FAILURE,
  };
}

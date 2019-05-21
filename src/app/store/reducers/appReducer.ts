import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/appActions';

export interface AppReducerState {
  login: boolean;
  users?: string;
  message?: string[];
}

const initialState: AppReducerState = {
  login: false

};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOGOUT:
      return {
        ...state,
        login: false,
        users: null,
        message: null
      };

    case ACTION_LOGIN:
      return {
        ...state,
        login: true,
        users: action.payload.users

      };
  }
  return state;
}

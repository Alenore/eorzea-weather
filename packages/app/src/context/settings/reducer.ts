import type { State, Action } from './types';

export default function settingsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        ...action.state,
      };

    case 'setdark':
      return {
        ...state,
        dark: action.dark ?? null,
      };
  }

  return state;
}

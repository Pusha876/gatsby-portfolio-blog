import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum ActionType {
  SetTheme = 'SET_THEME',
  ToggleTheme = 'TOGGLE_THEME',
}

export interface GlobalState {
  theme: Theme;
}

export interface Action {
  type: ActionType;
  payload?: any;
}

// Initial state
const initialState: GlobalState = {
  theme: Theme.Light,
};

// Context
const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Reducer
function globalStateReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case ActionType.SetTheme:
      return {
        ...state,
        theme: action.payload,
      };
    case ActionType.ToggleTheme:
      return {
        ...state,
        theme: state.theme === Theme.Light ? Theme.Dark : Theme.Light,
      };
    default:
      return state;
  }
}

// Provider component
interface GlobalStateProviderProps {
  children: ReactNode;
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Hook to use global state
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}

import { createContext, useContext } from "react";
import { ComponentId, UiState } from "../../hooks/ApplicationCommands";

export const UiStateContext = createContext<UiState>({} as UiState);

export interface ButtonState {
  disabled: boolean
}

export function useButtonState(id: ComponentId): ButtonState {
  const uiState = useContext(UiStateContext);
  const fqid = `btn-${id}`;
  return {
    get disabled() {
      return uiState.disabled.has(fqid);
    }
  };
}
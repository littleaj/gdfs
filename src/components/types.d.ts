import { MouseEventHandler } from "react";

export type AuthButtonProps = Readonly<Partial<{
  onClick: MouseEventHandler,
  disabled: boolean,
}>>;
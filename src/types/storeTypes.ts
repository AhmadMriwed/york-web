import { PermissionsState } from "./adminTypes/accounts/roles/rolesTypes";
export interface ThemeState {
   theme: "light" | "dark";
}

export interface GlobalState {
   theme: ThemeState;
   permissions: PermissionsState;
}

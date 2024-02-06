import {
  PermissionsState,
  RolesState,
  SingleRoleState,
  SingleUserState,
  SupervisorsState,
  TraineesState,
  TrainersState,
  UsersState,
} from "./adminTypes/accounts/accountsTypes";
import { RequestTypesState, VenuesState } from "./adminTypes/enums/enumsTypes";
import { sessionSlidebarState } from "@/store/adminstore/slices/sessions/sessionSlidebarSlice";

export interface ThemeState {
  theme: "light" | "dark";
}

export interface GlobalState {
  theme: ThemeState;
  permissions: PermissionsState;
  roles: RolesState;
  supervisors: SupervisorsState;
  trainees: TraineesState;
  trainers: TrainersState;
  users: UsersState;
  singleUser: SingleUserState;
  singleRole: SingleRoleState;
  requestTypes: RequestTypesState;
  venues: VenuesState;
  sessionSlidebar: sessionSlidebarState;
}

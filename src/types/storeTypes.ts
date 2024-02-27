import {
  AdminState,
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
import {
  sessionsState,
  joinedUsersState,
  attendanceState,
} from "./adminTypes/sessions/sessionsTypes";
import { singleCourseState } from "./adminTypes/courses/coursesTypes";

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
  authSlice: AdminState;
  sessions: sessionsState;
  joinedUsers: joinedUsersState;
  attendanceRequests: attendanceState;
  singleCourse: singleCourseState;
}

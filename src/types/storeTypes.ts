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
import {
  sessionsState,
  joinedUsersState,
  attendanceState,
} from "./adminTypes/sessions/sessionsTypes";
import {
  courseAdsState,
  courseJoinedUsersState,
  coursesState,
  myCoursesState,
  submitCourseState,
  trainingPlanState,
} from "./adminTypes/courses/coursesTypes";
import {
  CategoriesState,
  CourseTypesState,
  ExamTypesState,
  QuestionTypesState,
  RequestTypesState,
  SingleEnumState,
  TrainerTypesState,
  VenuesState,
} from "./adminTypes/enums/enumsTypes";
import { FileState, MailState } from "./adminTypes/mailbox/mailboxTypes";
import { endUserState } from "./endUserTypes/endUserTypes";

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

  authSlice: AdminState;
  sessions: sessionsState;
  joinedUsers: joinedUsersState;
  attendanceRequests: attendanceState;
  courses: coursesState;
  myCourses: myCoursesState;
  courseAds: courseAdsState;
  submitCourses: submitCourseState;
  trainingPlan: trainingPlanState;
  courseJoinedUsers: courseJoinedUsersState;

  mailbox: MailState;
  files: FileState;
  requestTypes: RequestTypesState;
  venues: VenuesState;
  categories: CategoriesState;
  examTypes: ExamTypesState;
  trainerTypes: TrainerTypesState;
  questionTypes: QuestionTypesState;
  courseTypes: CourseTypesState;
  singleEnum: SingleEnumState;
  endUser: endUserState;
}

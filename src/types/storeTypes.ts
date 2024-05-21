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
  courseRequestsState,
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
<<<<<<< HEAD
import { couresesAdsState } from "./userTypes/courses/coursesTypes";
=======
import { endUserState } from "./endUserTypes/endUserTypes";
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a

export interface ThemeState {
  theme: "light" | "dark";
}

export interface GlobalState {
<<<<<<< HEAD
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
   singleCourse: singleCourseState;
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
=======
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
  courseRequests: courseRequestsState;

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
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a
}

export interface GlobalUserState {
   coursesAds: couresesAdsState;
}

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
import { singleCourseState } from "./adminTypes/courses/coursesTypes";
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
import { couresesAdsState } from "./userTypes/courses/coursesTypes";

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
}

export interface GlobalUserState {
   coursesAds: couresesAdsState;
}

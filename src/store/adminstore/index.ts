import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import permissions from "./slices/accounts/permissionsSlice";
import roles from "./slices/accounts/rolesSlice";
import supervisors from "./slices/accounts/supervisorsSlice";
import trainees from "./slices/accounts/traineeSlice";
import trainers from "./slices/accounts/trainersSlice";
import users from "./slices/accounts/usersSlice";
import singleUser from "./slices/accounts/singleUserSlice";
import singleRole from "./slices/accounts/singleRoleSlice";
import userSlice from "../userStore/slices/userSlice";
import trainerSlice from "../trainerStore/slices/trainerSlice";
import sessions from "./slices/sessions/trainingSessionsSlice";
import singleCourse from "./slices/courses/singleCourseSlice";
import joinedUsers from "./slices/sessions/joinedUsersSlice";
import attendanceRequests from "./slices/sessions/attendanceRequestsSlice";
import mailbox from "./slices/mailbox/mailboxSlice";
import requestTypes from "./slices/enums/requestTypesSlice";
import venues from "./slices/enums/venuesSlice";
import files from "./slices/mailbox/fileSlice";
import categories from "./slices/enums/categoriesSlice";
import examTypes from "./slices/enums/examTypesSlice";
import trainerTypes from "./slices/enums/trainerTypesSlice";
import questionTypes from "./slices/enums/questionTypesSlice";
import singleEnum from "./slices/enums/singleEnumSlice";
import courseTypes from "./slices/enums/courseTypeSlice";
import coursesAds from "../userStore/slices/courses/courseAdsSlice";

export default configureStore({
   reducer: {
      authSlice,
      permissions,
      roles,
      supervisors,
      trainees,
      trainers,
      users,
      singleUser,
      singleRole,
      mailbox,
      files,
      requestTypes,
      venues,
      categories,
      examTypes,
      trainerTypes,
      questionTypes,
      singleEnum,
      courseTypes,
      userSlice,
      trainerSlice,
      sessions: sessions,
      joinedUsers: joinedUsers,
      attendanceRequests: attendanceRequests,
      singleCourse: singleCourse,
      // user state - temp place
      coursesAds,
   },
});

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
import courseAds from "./slices/courses/course-ads/courseAdsSlice";
import submitCourses from "./slices/courses/submit-courses/submitCoursesSlice";
import trainingPlan from "./slices/courses/training-plan/trainingPlanSlice";
import courses from "./slices/courses/coursesSlice";
import myCourses from "./slices/courses/my-courses/myCoursesSlice";
import courseJoinedUsers from "./slices/courses/joinedUsers/courseJoinedUsersSlice";
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
import endUser from "../endUser/endUserSlice";

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
    courseAds: courseAds,
    submitCourses: submitCourses,
    trainingPlan: trainingPlan,
    courseJoinedUsers: courseJoinedUsers,
    joinedUsers: joinedUsers,
    attendanceRequests: attendanceRequests,
    courses: courses,
    myCourses: myCourses,
    endUser: endUser,
  },
});

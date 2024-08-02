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
import mailbox from "./slices/mailbox/mailboxSlice";
import files from "./slices/mailbox/fileSlice";
import requestTypes from "./slices/enums/requestTypesSlice";
import venues from "./slices/enums/venuesSlice";
import categories from "./slices/enums/categoriesSlice";
import examTypes from "./slices/enums/examTypesSlice";
import trainerTypes from "./slices/enums/trainerTypesSlice";
import questionTypes from "./slices/enums/questionTypesSlice";
import singleEnum from "./slices/enums/singleEnumSlice";
import courseTypes from "./slices/enums/courseTypeSlice";
import coursesAds from "../userStore/slices/courses/courseAdsSlice";

import userSlice from "../userStore/slices/userSlice";
import trainerSlice from "../trainerStore/slices/trainerSlice";
import sessions from "./slices/sessions/trainingSessionsSlice";
import joinedUsers from "./slices/sessions/joinedUsersSlice";
import attendanceRequests from "./slices/sessions/attendanceRequestsSlice";
import courses from "./slices/courses/coursesSlice";
import myCourses from "./slices/courses/my-courses/myCoursesSlice";
import courseAds from "./slices/courses/course-ads/courseAdsSlice";
import courseRequests from "./slices/courses/course-requests/courseRequestsSlice";
import submitCourses from "./slices/courses/submit-courses/submitCoursesSlice";
import trainingPlan from "./slices/courses/training-plan/trainingPlanSlice";
import courseJoinedUsers from "./slices/courses/joinedUsers/courseJoinedUsersSlice";
import endUser from "../endUser/endUserSlice";
import singleCourse from "../";

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
    sessions,
    joinedUsers,
    attendanceRequests,
    courses,
    myCourses,
    courseAds,
    courseRequests,
    submitCourses,
    trainingPlan,
    courseJoinedUsers,
    endUser,
    coursesAds,
  },
});

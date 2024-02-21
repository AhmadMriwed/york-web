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
// import requestTypes from "./slices/enums/requestTypesSlice";
// import venues from "./slices/enums/venuesSlice";

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
    // requestTypes,
    // venues,
  },
});

import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice";
import permissions from "./slices/permissionsSlice";

export default configureStore({
   reducer: {
      auth: authSlice,
      permissions,
   },
});

import {
  sessionType,
  sessionsState,
} from "@/types/adminTypes/sessions/sessionsTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeStatus,
  createSession,
  deleteSession,
  duplicateSession,
  getAllSessions,
  getOtherSessions,
  getSessionInfo,
  getSessionStates,
  getSessionsByType,
  getSessionsTypes,
  lifeSessionOperation,
  updateSession,
} from "./sessionsActions";

// filtering function to delete the session from the state.
const filterDeletedSession = (sessions: sessionType[], sessionId: number) => {
  return sessions.filter((session) => session.id !== sessionId);
};

// adding the duplicated session to one of the array based on the classification
const addDuplicatedSession = (state: sessionsState, session: sessionType) => {
  state.allSessions.unshift(session);
  switch (session.classification_session) {
    case "Current":
      state.currentSessions.unshift(session);
      break;
    case "Expired":
      state.expiredSessions.unshift(session);
      break;
    case "Upcoming":
      state.upcomingSessions.unshift(session);
    default:
      break;
  }
};

// updating the array of sessions with the new status
const updateSessionStatus = (
  sessions: sessionType[],
  status: string,
  sessionId: number
) => {
  return sessions.map((session) =>
    session.id === sessionId ? { ...session, status: status } : session
  );
};
const updateStatusForAllArrays = (
  state: sessionsState,
  ids: number[],
  status: string,
  classification: "Current" | "Expired" | "Upcoming"
) => {
  ids.forEach((sessionId) => {
    state.allSessions = updateSessionStatus(
      state.allSessions,
      status,
      sessionId
    );
    switch (classification) {
      case "Current":
        state.currentSessions = updateSessionStatus(
          state.currentSessions,
          status,
          sessionId
        );
        break;
      case "Expired":
        state.expiredSessions = updateSessionStatus(
          state.expiredSessions,
          status,
          sessionId
        );
        break;
      case "Upcoming":
        state.upcomingSessions = updateSessionStatus(
          state.upcomingSessions,
          status,
          sessionId
        );
        break;
      default:
        break;
    }
  });
};

const sessions = createSlice({
  name: "sessions",
  initialState: {
    isLoading: false,
    error: null,
    allSessions: [],
    currentSessions: [],
    expiredSessions: [],
    upcomingSessions: [],
    sessionsTypes: [],
    otherSessions: [],
    sessionStates: [],
    /* single session state */
    sessionLoading: false,
    sessionError: null,
    sessionInfo: null,
    sessionID: 0,
    /* session operations state */
    operationLoading: false,
    operationError: null,
    deleteError: null,
    addStatus: false,
    updateStatus: false,
    deleteStatus: false,
    duplicateStatus: false,
  } as sessionsState,
  reducers: {
    sessionOperationCompleted: (state: sessionsState) => {
      state.addStatus = false;
      state.updateStatus = false;
      state.deleteStatus = false;
      state.duplicateStatus = false;
      state.operationError = null;
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    // get all sessions
    builder
      .addCase(getAllSessions.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAllSessions.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.allSessions = action.payload.data;
      })
      .addCase(getAllSessions.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get sessions by type
    builder
      .addCase(getSessionsByType.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getSessionsByType.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        switch (action.payload.type) {
          case "Current":
            state.currentSessions = action.payload.data;
            break;
          case "Expired":
            state.expiredSessions = action.payload.data;
            break;
          case "Upcoming":
            state.upcomingSessions = action.payload.data;
            break;
          default:
            break;
        }
      })
      .addCase(getSessionsByType.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get sessions types
    builder
      .addCase(getSessionsTypes.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getSessionsTypes.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.sessionsTypes = action.payload.data;
      })
      .addCase(getSessionsTypes.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get other sessions
    builder
      .addCase(getOtherSessions.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getOtherSessions.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.otherSessions = action.payload.data;
      })
      .addCase(getOtherSessions.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get session states
    builder
      .addCase(getSessionStates.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getSessionStates.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.sessionStates = action.payload.data;
      })
      .addCase(getSessionStates.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get single session
    builder
      .addCase(getSessionInfo.pending, (state) => {
        state.sessionError = null;
        state.sessionLoading = true;
      })
      .addCase(getSessionInfo.fulfilled, (state, action: any) => {
        state.sessionError = null;
        state.sessionLoading = false;
        state.sessionInfo = action.payload.data;
        state.sessionID = action.payload.id;
      })
      .addCase(getSessionInfo.rejected, (state, action: any) => {
        state.sessionLoading = false;
        state.sessionError = action.payload;
      });

    // create new session
    builder
      .addCase(createSession.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(createSession.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.allSessions.unshift(action.payload);
        state.addStatus = true;
      })
      .addCase(createSession.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });

    // update session
    builder
      .addCase(updateSession.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(updateSession.fulfilled, (state) => {
        state.operationError = null;
        state.operationLoading = false;
        state.updateStatus = true;
      })
      .addCase(updateSession.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });

    // delete session
    builder
      .addCase(deleteSession.pending, (state) => {
        state.deleteError = null;
        state.operationLoading = true;
      })
      .addCase(deleteSession.fulfilled, (state, action: any) => {
        state.error = null;
        state.operationLoading = false;
        state.allSessions = filterDeletedSession(
          state.allSessions,
          action.payload.id
        );
        state.currentSessions = filterDeletedSession(
          state.currentSessions,
          action.payload.id
        );
        state.expiredSessions = filterDeletedSession(
          state.expiredSessions,
          action.payload.id
        );
        state.upcomingSessions = filterDeletedSession(
          state.upcomingSessions,
          action.payload.id
        );
        state.deleteStatus = true;
      })
      .addCase(deleteSession.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.deleteError = action.payload;
      });

    // duplicate session
    builder
      .addCase(duplicateSession.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(duplicateSession.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        addDuplicatedSession(state, action.payload);
        state.duplicateStatus = true;
      })
      .addCase(duplicateSession.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });

    // activate/deactivate session
    builder
      .addCase(changeStatus.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(changeStatus.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        updateStatusForAllArrays(
          state,
          action.payload.ids,
          action.payload.status,
          action.payload.classification
        );
        if (state.sessionInfo) state.sessionInfo.status = action.payload.status;
      })
      .addCase(changeStatus.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });

    // life session operation
    builder
      .addCase(lifeSessionOperation.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(lifeSessionOperation.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        if (state.sessionInfo)
          state.sessionInfo.session_status = action.payload.session_status;
      })
      .addCase(lifeSessionOperation.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export default sessions.reducer;
export const { sessionOperationCompleted } = sessions.actions;

import { Axios } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get all sesions
export const getAllSessions = createAsyncThunk(
  "sessions/getAllSessions",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get("admin/trainingSession");
      if (res.status === 200) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get sessions by type
export const getSessionsByType = createAsyncThunk(
  "sessions/getSessionsByType",
  async (type: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/trainingSession/get${type}Sessions/1`);
      if (res.status === 200) {
        return {
          data: res.data.data,
          type,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get sessions types
export const getSessionsTypes = createAsyncThunk(
  "sessions/getSessionsTypes",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/training_sessions_type`);
      if (res.status === 200) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get other sessions
export const getOtherSessions = createAsyncThunk(
  "sessions/getOtherSessions",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/trainingSession/otherSessions/${id}`);
      if (res.status === 200) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// get life session states
export const getSessionStates = createAsyncThunk(
  "sessions/getSessionStates",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/trainingSession/getStatesSession/${id}`
      );
      if (res.status === 200) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// get session by id
export const getSessionInfo = createAsyncThunk(
  "sessions/getSessionInfo",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/trainingSession/${id}`);
      if (res.status === 200) {
        return {
          data: res.data.data,
          id,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// create new session
export const createSession = createAsyncThunk(
  "sessions/createSession",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post("admin/trainingSession", data);
      if (res.status === 201) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// update session
export const updateSession = createAsyncThunk(
  "sessions/updateSession",
  async (params: { data: {}; id?: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/trainingSession/${params.id}`,
        params.data
      );
      if (res.status === 200) {
        return { status: true };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// delete session
export const deleteSession = createAsyncThunk(
  "sessions/deleteSession",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.delete(`admin/trainingSession/${id}`);
      if (res.status === 200) {
        return { id };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// duplicate session
export const duplicateSession = createAsyncThunk(
  "sessions/duplicateSession",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(`admin/trainingSession/replicate/${id}`);
      if (res.status === 201) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// activate/deactivate session
export const changeStatus = createAsyncThunk(
  "sessions/changeStatus",
  async (
    data: {
      ids: number[];
      status: string;
      classification: "Current" | "Expired" | "Upcoming";
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(`admin/trainingSession/change_status`, {
        ids: data.ids,
        status: data.status,
      });
      if (res.status === 200) {
        return {
          ...data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// life session operation
export const lifeSessionOperation = createAsyncThunk(
  "sessions/lifeSessionOperation",
  async (data: { id: number; status: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/trainingSession/operation/${data.id}`,
        { status: data.status }
      );
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

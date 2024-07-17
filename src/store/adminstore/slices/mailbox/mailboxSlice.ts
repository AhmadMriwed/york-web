import { UsersType } from "@/types/adminTypes/accounts/accountsTypes";
import { MailState, MailType } from "@/types/adminTypes/mailbox/mailboxTypes";
import { Axios } from "@/utils/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSendMail = createAsyncThunk(
   "mails/getSendMail",
   async (page: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`mailBox/request/send?page=${page}`);
         console.log(res);
         if (res.status === 200) {
            return {
               data: res.data.data,
               perPage: res.data.meta.per_page,
               total: res.data.meta.total,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getRecivedMail = createAsyncThunk(
   "mails/getRecivedMail",
   async (page: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`mailBox/request/recived?page=${page}`);
         console.log(res);
         if (res.status === 200) {
            return {
               data: res.data.data,
               perPage: res.data.meta.per_page,
               total: res.data.meta.total,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getlMailboxInfo = createAsyncThunk(
   "mails/getlMailboxInfo",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get("mailBox/request/getInfoMailBox");
         console.log(res);
         console.log("info", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getSingleReqest = createAsyncThunk(
   "mails/getSingleReqest",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`mailBox/request/${id}`);
         console.log(res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getAllUsers = createAsyncThunk(
   "mails/getAllUsers",
   async (searchKeyword: string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`users?term=${searchKeyword}`);
         console.log(res, "user");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const createRequest = createAsyncThunk(
   "mails/createRequest",
   async (data: any, thunkAPI) => {
      console.log(data, "data");
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post("mailBox/request/storeRequest", data);

         console.log("res request types", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const createReplay = createAsyncThunk(
   "mails/createReplay",
   async (data: any, thunkAPI) => {
      console.log(data, "data");
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post("mailBox/replay/storeReplay", data);

         console.log("res request types", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const mails = createSlice({
   name: "mails",
   initialState: {
      initalLoading: false,
      isLoading: false,
      loadingUsers: false,
      error: null,
      mailInfo: {},
      perPage: 10,
      total: 1,
      status: false,
      requestType: "",
      mails: [],
      usres: [],
      request: {},
   } as unknown as MailState,

   reducers: {
      setRequestType: (state, action) => {
         state.replayData = action.payload;
      },
      completedRequest: (state) => {
         state.status = false;
      },
   },

   extraReducers: (builder) => {
      // get mailbox info
      builder.addCase(getlMailboxInfo.pending, (state) => {
         state.error = null;
         state.initalLoading = true;
      });
      builder.addCase(getlMailboxInfo.fulfilled, (state, action: any) => {
         state.error = null;
         state.initalLoading = false;
         state.mailInfo = action.payload;

         console.log("fullfiled");
      });
      builder.addCase(getlMailboxInfo.rejected, (state, action: any) => {
         state.initalLoading = false;
         state.error = action.payload;
      });

      builder.addCase(getSendMail.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getSendMail.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.mails = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;

         console.log("fullfiled");
      });
      builder.addCase(getSendMail.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get recived mails
      builder.addCase(getRecivedMail.pending, (state) => {
         state.error = null;
         state.isLoading = true;
         console.log("loading");
      });
      builder.addCase(getRecivedMail.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.mails = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
         console.log("fullfiled");
      });
      builder.addCase(getRecivedMail.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get SingleReqest
      builder.addCase(getSingleReqest.pending, (state) => {
         state.error = null;
         state.isLoading = true;
         console.log("loading");
      });
      builder.addCase(
         getSingleReqest.fulfilled,
         (state, action: PayloadAction<MailType>) => {
            state.error = null;
            state.isLoading = false;
            state.request = action.payload;
            state.requestType = action.payload.request_type;
         }
      );
      builder.addCase(getSingleReqest.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get all users
      builder.addCase(getAllUsers.pending, (state) => {
         state.error = null;
         state.loadingUsers = true;
         console.log("loading");
      });
      builder.addCase(getAllUsers.fulfilled, (state, action: any) => {
         state.error = null;
         state.loadingUsers = false;
         const allUSers: UsersType[] = action.payload;
         state.users = allUSers.map((user) => {
            return {
               label: user.first_name + " " + user.last_name,
               value: user.user_id,
               image: user.image,
               email: user.email,
               type: user.account_type,
            };
         });

         console.log("fullfiled");
      });
      builder.addCase(getAllUsers.rejected, (state, action: any) => {
         state.loadingUsers = false;
         state.error = action.payload;
      });

      // create request
      builder.addCase(createRequest.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(createRequest.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         // state.requestTypes = action.payload;
         state.status = true;
      });
      builder.addCase(createRequest.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // create replay
      builder.addCase(createReplay.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(createReplay.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.status = true;
      });
      builder.addCase(createReplay.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { setRequestType, completedRequest } = mails.actions;

export default mails.reducer;

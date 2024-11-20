// SESSIONS
export interface sessionTypeType {
  id: number;
  name: string;
  type: string;
}

export interface sessionState {
  session_id: number;
  status: string;
  user: {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_name?: string;
    image?: string;
    account_type: string;
  };
  date_change: string;
  start_time: string;
  end_time: string;
}

export interface sessionType {
  id: number;
  owner_id: number;
  owner: {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_name: string;
    phone_number: string;
    image: string;
    about_me: string;
    gender: string;
    account_type: string;
  };
  course_id: number;
  code: string;
  date_from: Date;
  date_to: Date;
  outline: string;
  title: string;
  classification_session: "Current" | "Expired" | "Upcoming";
  start_time: string;
  status: string;
  session_status: null | string;
  description: string;
  image: null | string;
  url: string;
  count_assignments: number;
  training_session_type: {
    id: number;
    name: string;
    type: string;
  };
  files: File[];
}

export interface sessionsState {
  isLoading: boolean;
  error: null | any;
  allSessions: sessionType[];
  currentSessions: sessionType[];
  expiredSessions: sessionType[];
  upcomingSessions: sessionType[];
  sessionsTypes: sessionTypeType[];
  otherSessions: sessionType[];
  sessionStates: sessionState[];

  sessionLoading: boolean;
  sessionError: null | any;
  sessionInfo: null | sessionType;
  sessionID: number;

  operationLoading: boolean;
  operationError: null | any;
  status: boolean;
}

// JOINED USERS
export interface joinedUserType {
  user: {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_name: null | string;
    image: null | string;
    account_type: string;
  };
  joind_time: string;
  left_time: string;
  status: string;
}

export interface joinedUsersState {
  isLoading: boolean;
  error: null | any;
  trainers: joinedUserType[];
  trainees: joinedUserType[];
  clients: joinedUserType[];
  operationLoading: boolean;
  operationError: null | any;
  status: boolean;
}

// ATTENDACE REQUESTS
export interface attendanceType {
  user: {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_name: null | string;
    image: null | string;
    account_type: string;
  };
  id: number;
  session_id: number;
  left_time: null | string;
  attend_time: string;
  status: string;
  response_trainer: null | string;
  response_admin: null | string;
}

export interface unattendUserType {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_name: null | string;
  phone_number: null | string;
  image: null | any;
  about_me: null | string;
  gender: null | string;
  account_type: string;
}

export interface attendanceState {
  isLoading: boolean;
  error: null | any;
  accepted: attendanceType[];
  rejected: attendanceType[];
  pending: attendanceType[];
  attendUsers: unattendUserType[];
  operationLoading: boolean;
  operationError: null | any;
  status: boolean;
}

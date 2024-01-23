// Permissions Type
export interface PermissionsType {
   name: string;
   permissions: { id: number; name: string; enabled?: boolean }[];
}
export interface PermissionsState {
   isLoading: boolean;
   error: null | any;
   permissions: PermissionsType[];
}

// Roles Type
export interface RolesType {
   id: number;
   name: string;
}

export interface RolesState {
   isLoading: boolean;
   error: null | any;
   total: number;
   perPage: number;
   status: boolean;
   roles: RolesType[];
}

export interface SingleRoleState {
   isLoading: boolean;
   error: null | any;
   status: boolean;
   singleRole: {
      id: null | number;
      name: string;
      role_permissions: PermissionsType[];
   };
}

// Supervisors Type

export interface SupervisorsType {
   account_status: null | string;
   account_type: string;
   email: string;
   first_name: string;
   id: number;
   image: null | string;
   is_verified: boolean;
   last_name: string;
   phone_number: string;
   role: null | {
      id: number;
      name: string;
   };
   status: null | { status: string; cause: null | string };
   user_id: number;
   user_name: string;
}

export interface SupervisorsState {
   isLoading: boolean;
   error: null | any;
   total: number;
   perPage: number;
   status: boolean;
   supervisors: SupervisorsType[];
   singleSupervisor: SupervisorsType;
}

// Trainers Type

export interface TrainersType {
   id: number;
   name: string;
   email: string;
   trainerType: string;
   status: string | boolean;
   image: string;
}

export interface TrainersState {
   isLoading: boolean;
   error: null | any;
   status: boolean;
   total: number;
   perPage: number;
   trainers: TrainersType[];
   singleTrainer: any;
}

// Trainees Type

export interface TraineesType {
   id: number;
   name: string;
   email: string;
   userType: string;
   status: string | boolean;
   image: string;
}

export interface TraineesState {
   isLoading: boolean;
   error: null | any;
   total: number;
   perPage: number;
   trainees: TraineesType[];
   singleTrainee: any;
}

// Users Types

export interface UsersType {
   account_status: null | string;
   account_type: string;
   email: string;
   first_name: string;
   id: number;
   image: string;
   is_verified: boolean;
   last_name: string;
   phone_number: string;
   role: null | {
      id: number;
      name: string;
   };
   status: null | { status: string; cause: null | string };
   user_id: number;
   user_name: string;
}

export interface UsersState {
   isLoading: boolean;
   error: null | any;
   total: number;
   perPage: number;
   status: boolean;
   users: UsersType[];
}

export interface SingleUserState {
   isLoading: boolean;
   error: null | any;
   status: boolean;
   singleUser: UsersType;
}

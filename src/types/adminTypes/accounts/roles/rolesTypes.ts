export interface PermissionsType {
   name: string;
   permissions: { id: number; name: string }[];
}
export interface PermissionsState {
   isLoading: boolean;
   error: null | any;
   permissions: PermissionsType[];
}

export interface RolesType {
   id: number;
   name: string;
}

export interface RolesState {
   isLoading: boolean;
   error: null | any;
   roles: RolesType[];
   singleRole: {
      id: null | number;
      name: string;
      role_permissions: PermissionsType[];
   };
}

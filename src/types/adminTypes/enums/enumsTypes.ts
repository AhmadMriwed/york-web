export interface VenueType {
   id: string;
   title: string;
   description: string;
   img: null | string;
}
export interface VenuesState {
   isLoading: boolean;
   error: any;
   venues: VenueType[];
}

export interface RequestTypesType {
   id: number;
   name: string;
   type: string;
}

export interface RequestTypesState {
   isLoading: boolean;
   error: any;
   requestTypes: RequestTypesType[];
}

export interface SingleEnumType {
   id: number;
   title?: string;
   description?: string;
   name?: string;
   type?: string;
   hint?: string;
   img?: null | string;
}

export interface SingleEnumState {
   isLoading: boolean;
   error: any;
   singleEnum: SingleEnumType;
}

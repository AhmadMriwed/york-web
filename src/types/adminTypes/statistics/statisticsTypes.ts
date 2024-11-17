interface enumsType {
   id: number;
   title: string;
   course_count: number;
}

export interface statisticsState {
   isLoading: boolean;
   error: any;
   statistics: {
      number_of_users: number;
      number_of_admin: number;
      number_of_trainer: number;
      number_of_training_companies: number;
      number_of_training_personal: number;
      number_of_trainee: number;
      number_of_client: number;
      number_of_categories: number;
      number_of_courses_in_categories: enumsType[];
      number_of_venue: number;
      get_number_of_courses_in_venues: enumsType[];
      number_of_sessions: number;
   };
}

interface FileType {
    url: string;
    name: string;
    type: string;
    size: number;
  }
  
  export interface StartInterfaceType {
    url: string;
      id: number;
      form_id: number;
      title: string;
      sub_title: string;
      description: string;
      show_configration: number;
      show_condition: number;
      image: string;
      files: FileType[]; // More detailed file type
      created_at: string;
      updated_at: string;
    };
  export interface EndInterfaceType {
    url: string;
      id: number;
      form_id: number;
      title: string;
      sub_title: string;
      show_configration: number;
      show_condition: number;
      description: string;
      image: string;
      files: FileType[]; // More detailed file type
      created_at: string;
      updated_at: string;
    };
  
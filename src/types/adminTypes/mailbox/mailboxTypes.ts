export interface FileType {
   id: number;
   name: string;
   path: string;
   size: string;
   sub_type: string;
   type: string;
}

export interface ReplyType {
   id: number;
   files: FileType[];
   send_user: null | SenderReciver;
   show_date: null | string;
   sub_title: null | string;
   title: string;
}

export interface SenderReciver {
   id: number;
   user_id: number;
   first_name: string;
   last_name: string;
   email: string;
   user_name: null | string;
   phone_number: null | string;
   image: null | string;
   about_me: null | string;
   gender: null | string;
   account_type: string;
}

export interface MailType {
   id: number;
   title: string;
   sub_title: null | string;
   request_type: string;
   show_date: any;
   send_user: SenderReciver;
   recived_user?: SenderReciver;
   count_replay_boxes?: number;
   count_filse?: number;
   files?: FileType[];
   replay_boxes?: ReplyType[];
}

export interface MailState {
   isLoading: boolean;
   initalLoading: boolean;
   loadingUsers: boolean;
   perPage: number;
   total: number;
   mailInfo: {
      count_new_recived_boxes: number;
      count_new_send_boxes: number;
      count_recived_boxes: number;
      count_send_boxes: number;
   };
   error: any;
   status: boolean;
   replayData: {};
   users: {
      label: string;
      value: number;
   }[];
   requestType: string;
   mails: MailType[];
   request: MailType;
}

export interface FileState {
   isLoading: boolean;
   error: any;
   uploadedFiles: FileType[];
   downloadedFiles: any;
   uploadPercent: number;
}

export interface ChatMessage {
  author: string;
  message: string;
  sent: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  settings: AppSettings
}

export interface AppSettings {
  user: string,
  darkTheme: boolean,
  clock24hours: boolean,
  sendByEnter: boolean
}

export interface Action {
  type: string,
  settings: AppSettings
}
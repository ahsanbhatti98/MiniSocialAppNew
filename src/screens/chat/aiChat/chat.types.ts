export type ChatRoutesTypes = {
  ChatScreen: {sessionId: string};
};

export interface User {
  _id: string | number;
  name?: string;
  avatar?: string | number;
}
export interface MessageType {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

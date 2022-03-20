import {Email} from "./email";

export interface UserData {
  avatarUrl: string;
  id: number;
  email: Email;
  token: string;
  isPro: boolean;
  name: string;
};

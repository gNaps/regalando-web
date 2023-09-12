import { GiftModel } from "./gift.model";

export interface ProfileModel {
  id: string;
  created_at: string;
  email: string;
  username: string;
  picture: string;
  enable: boolean;
  birth: string;
  isComplete: boolean;
  gifts: GiftModel[];
}

import { ProfileModel } from "./profile.model";

export interface FriendModel {
  id: number;
  invited: string;
  created_at: string;
  profile: ProfileModel;
}

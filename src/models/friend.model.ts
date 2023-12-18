import { ProfileModel } from "./profile.model";

export interface FriendModel {
  id: number;
  invited: ProfileModel;
  created_at: string;
  profile: ProfileModel;
}

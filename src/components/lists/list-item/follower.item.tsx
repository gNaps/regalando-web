import ProfilePicture from "@/components/profile-picture.component";
import { useSupabaseUrlImage } from "@/hooks/useSupabaseUrlmage";
import { ProfileModel } from "@/models/profile.model";

interface IFollowerItemProps extends ProfileModel {
  removeFollower: (id: string) => void;
}

const FollowerItem = ({
  id,
  picture,
  username,
  removeFollower,
}: IFollowerItemProps) => {
  const pictureUrl = useSupabaseUrlImage(picture);

  return (
    <div className="w-full rounded-lg px-2 py-3 flex justify-between items-center bg-middle-gray border-2 border-gray my-2">
      <div className="flex gap-3 items-center">
        <ProfilePicture size="medium" shape="square" url={pictureUrl} />
        <span>
          <p className="text-xl">{username}</p>
        </span>
      </div>
      <p className="text-red cursor-pointer" onClick={() => removeFollower(id)}>
        Remove
      </p>
    </div>
  );
};

export default FollowerItem;

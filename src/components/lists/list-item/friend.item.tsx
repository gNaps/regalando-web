import Chip from "@/components/chip.component";
import ProfilePicture from "@/components/profile-picture.component";
import { ProfileModel } from "@/models/profile.model";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const FriendItem = ({ email, picture, gifts, username, id }: ProfileModel) => {
  const giftLeft = gifts.filter((g) => !g.taken);
  return (
    <Link href={`friends/${id}`}>
      <div className="w-full rounded-lg px-2 py-3 flex justify-between items-center bg-middle-gray border-2 border-gray my-2">
        <div className="flex gap-3 items-center">
          <ProfilePicture size="medium" shape="square" url={picture} />
          <span>
            <p className="mb-2 text-xl">{username}</p>
            <Chip text={`${giftLeft.length + 1} gifts left`} color="primary" />
          </span>
        </div>
        <ChevronRightIcon className="h-6 w-6" />
      </div>
    </Link>
  );
};

export default FriendItem;

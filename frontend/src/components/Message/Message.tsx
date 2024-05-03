import { useSelector } from "react-redux";
import userImage from "../../assets/user-image.jpg";

const Message = ({ message }: { message: string }) => {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="flex mb-2">
      <div className="bg-gray-200 rounded-lg p-2">
        <div className="flex items-center mb-1">
          <img
            src={userImage}
            className="w-8 h-8 rounded-full flex-shrink-0 mr-2"
          />
          <div className="font-semibold">{username}</div>
        </div>
        <div className="text-sm text-gray-700">{message}</div>
      </div>
    </div>
  );
};

export default Message;

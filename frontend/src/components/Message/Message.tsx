import { useSelector } from "react-redux";

const Message = ({ message }: { message: string }) => {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="flex mb-2">
      <div className="bg-gray-200 rounded-lg p-2">
        <div className="flex items-center mb-1">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0 mr-2"></div>
          <div className="font-semibold">{username}</div>
        </div>
        <div className="text-sm text-gray-700">{message}</div>
      </div>
    </div>
  );
};

export default Message;

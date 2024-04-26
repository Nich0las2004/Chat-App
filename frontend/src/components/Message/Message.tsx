const Message = ({ message }) => {
  return (
    <div className="flex mb-2">
      <div className="bg-gray-200 rounded-lg p-2">
        <div className="font-semibold"></div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Message;

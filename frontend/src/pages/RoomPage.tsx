const RoomPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-gray-200 p-4 overflow-y-auto"></div>
      <div className="bg-gray-300 p-4 flex items-center">
        {/* Message input */}
        <input
          type="text"
          className="flex-grow bg-white border border-gray-400 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />
        {/* Send button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Send
        </button>
      </div>
      <div className="bg-gray-300 p-4 flex items-center">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-green-600 focus:outline-none focus:bg-green-600">
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomPage;

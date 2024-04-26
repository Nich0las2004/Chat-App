import { useEffect, useState } from "react";
import { socket } from "../../services/socket";
// import Message from "../Message/Message";
import { sendMessage } from "../../features/messageSlice";
import { useDispatch } from "react-redux";

const MainRoom = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<number>(1);

  const sendHandler = () => {
    socket.emit("send-message", input, 3);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected);
    });
    socket.on("receive-message", (response) => {
      dispatch(
        sendMessage({
          message: response,
        })
      );
      console.log(response);
    });
    // sendHandler();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-gray-200 p-4 overflow-y-auto"></div>
      <div className="bg-gray-300 p-4 flex items-center">
        {/* Message input */}
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-white border border-gray-400 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />
        {/* Send button */}
        <button
          onClick={sendHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </div>
      <div className="bg-gray-300 p-4 flex items-center">
        <input type="number" />
        <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-green-600 focus:outline-none focus:bg-green-600">
          Join Room
        </button>
      </div>
    </div>
  );
};

export default MainRoom;

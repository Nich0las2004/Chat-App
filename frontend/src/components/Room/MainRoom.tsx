import { useEffect, useState } from "react";
import { socket } from "../../services/socket";
import Message from "../Message/Message";
import { sendMessage } from "../../features/messageSlice";
import { useDispatch, useSelector } from "react-redux";

const MainRoom = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<number>(1);

  const messagesArr = useSelector((state) => state.message.messages);

  const sendHandler = () => {
    if (input !== "") {
      socket.emit("send-message", input, "room1");
    }
  };

  const messageHandler = (e) => {
    setInput(e.target.value);
  };

  const joinRoomHandler = () => {
    socket.emit("join-room", roomNumber);
  };

  const handleInputChange = (e) => {
    setRoomNumber(parseInt(e.target.value, 10));
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
    sendHandler();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-gray-900 p-4 overflow-y-auto">
        {messagesArr.map((m: string) => (
          <Message message={m.message} />
        ))}
      </div>
      <div className="bg-gray-800 p-4 flex items-center">
        {/* Message input */}
        <input
          type="text"
          onChange={messageHandler}
          className="flex-grow bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 mr-2 focus:outline-none focus:border-purple-500"
          placeholder="Type your message..."
        />
        {/* Send button */}
        <button
          onClick={sendHandler}
          className="bg-purple-600 hover:bg-purple-700 focus:outline-none px-4 py-2 rounded-md text-white"
        >
          Send
        </button>
      </div>

      <div className="bg-gray-800 p-4 flex items-center">
        <input
          type="number"
          onChange={handleInputChange}
          value={roomNumber}
          className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none mr-2"
          placeholder="Enter room number"
        />
        <button
          onClick={joinRoomHandler}
          className="bg-purple-600 hover:bg-purple-700 focus:outline-none px-4 py-2 rounded-md text-white"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default MainRoom;

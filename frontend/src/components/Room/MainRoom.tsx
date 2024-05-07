import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";
import Message from "../Message/Message";
import { sendMessage } from "../../features/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { resetUser } from "../../features/userSlice";
import { logout } from "../../features/authSlice";

const MainRoom = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<number>(1);

  const messagesArr = useSelector((state) => state.message.messages);

  const navigate = useNavigate();

  const sendHandler = () => {
    if (input !== "") {
      socket.emit("send-message", input, "room1");
      setInput("");
    }
  };

  const messageHandler = (e) => {
    setInput(e.target.value);
  };

  const joinRoomHandler = () => {
    socket.emit("create-room", roomNumber, (message: string) =>
      console.log(message)
    );
    socket.emit("join-room", roomNumber, (message: string) =>
      console.log(message)
    );

    axios.get(`http://localhost:5555/room/${roomNumber}`).then((res) => {
      console.log(res);
      navigate(`/room/${roomNumber}`);
    });
  };

  const handleInputChange = (e) => {
    setRoomNumber(parseInt(e.target.value, 10));
  };

  const logoutHandler = async () => {
    await axios
      .delete("http://localhost:5555/auth/logout", {
        headers: {
          Authorization: null,
        },
      })
      .then(() => {
        dispatch(resetUser());
        dispatch(logout());
        window.location.href = "/login";
      })
      .catch((e) => console.log(e));
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
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="text-purple-300 mr-4">User: test</div>
        <div className="text-purple-300 mr-4">Main Room(1)</div>
        <Link to="/login">
          <button
            className="bg-red-600 hover:bg-red-700 focus:outline-none px-4 py-2 rounded-md text-white"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </Link>
      </div>
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
          value={input}
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
          min={1}
          pattern="[1-9][0-9]*"
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

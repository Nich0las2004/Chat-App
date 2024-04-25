import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const accessToken = useSelector(
    (state: object) => (state as any).auth.accessToken
  );

  const isAuthenticated = useSelector(
    (state: object) => (state as any).auth.isAuthenticated
  );

  useEffect(() => {
    sendToken()
      .then(() => setUpSocketIO())
      .catch(() => {
        console.log("Error during sending token");
        dispatch(logout());
        navigate("/login");
      });
  }, []);

  const sendToken = async () => {
    await axios.get("http://localhost:5555/room", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const setUpSocketIO = () => {
    const socket = io("http://localhost:5555", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log(socket.connected);
    });
  };

  return (
    <>
      {isAuthenticated && (
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
      )}
    </>
  );
};

export default RoomPage;

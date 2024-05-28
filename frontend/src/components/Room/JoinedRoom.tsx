import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetUser } from "../../features/userSlice";
import { logout } from "../../features/authSlice";
import { socket } from "../../services/socket";
import { useState, Fragment } from "react";
import Loading from "../Loading/Loading";

const JoinedRoom = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState<string>("");

  const navigate = useNavigate();

  const token = useSelector((state: any) => state.auth.accessToken);

  const { roomnum } = useParams();

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

  const leaveRoomHandler = () => {
    socket.emit("leaveRoom", roomnum);
    setIsLoading(true);
    axios
      .get(`http://localhost:5555/room`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTimeout(() => {
          navigate(`/room`);
          setIsLoading(false);
        }, 2000);
      });
  };

  const messageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendHandler = () => {
    if (input !== "") {
      setInput("");
    }
  };

  return (
    <Fragment>
      {isLoading && <Loading roomMessage="Leaving Room" />}
      {!isLoading && (
        <div className="flex flex-col h-screen">
          <div className="bg-gray-900 p-4 flex items-center justify-between">
            <div className="text-purple-300 mr-4">User: test</div>
            <div className="flex-grow text-center text-purple-300">
              Room({roomnum})
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-red-600 hover:bg-red-700 focus:outline-none px-4 py-2 rounded-md text-white ml-4"
                onClick={leaveRoomHandler}
              >
                Leave Room
              </button>
              <Link to="/login">
                <button
                  title="Log Out"
                  className="bg-red-600 hover:bg-red-700 focus:outline-none px-4 py-2 rounded-md text-white"
                  onClick={logoutHandler}
                >
                  {<FontAwesomeIcon icon={faRightFromBracket} />}
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-grow bg-gray-900 p-4 overflow-y-auto"></div>
          <div className="bg-gray-800 p-4 flex items-center">
            <input
              type="text"
              onChange={messageHandler}
              value={input}
              className="flex-grow bg-gray-700 text-white border border-gray-500 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-purple-500"
              placeholder="Type your message..."
            />
            <button
              onClick={sendHandler}
              className="bg-purple-600 hover:bg-purple-700 focus:outline-none px-4 py-2 rounded-md text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default JoinedRoom;

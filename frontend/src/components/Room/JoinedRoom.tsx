import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetUser } from "../../features/userSlice";
import { logout } from "../../features/authSlice";

const JoinedRoom = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="text-purple-300 mr-4">User: test</div>
        <div className="flex-grow text-center text-purple-300">
          Room({roomnum})
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-red-600 hover:bg-red-700 focus:outline-none px-4 py-2 rounded-md text-white">
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
    </div>
  );
};

export default JoinedRoom;

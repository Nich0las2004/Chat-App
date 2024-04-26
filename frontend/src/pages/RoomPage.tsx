import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import MainRoom from "../components/Room/MainRoom";
import { socket } from "../services/socket";
import sendToken from "../services/sendToken";

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
    sendToken(accessToken)
      .then(() => {
        socket.on("connect", () => {
          console.log(socket.connected);
        });
      })
      .catch(() => {
        console.log("Error during sending token");
        dispatch(logout());
        navigate("/login");
      });
  }, []);

  return <>{isAuthenticated && <MainRoom />}</>;
};

export default RoomPage;

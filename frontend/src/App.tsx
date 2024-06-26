import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoomPage from "./pages/RoomPage";
import JoinedRoom from "./components/Room/JoinedRoom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/room/:roomnum" element={<JoinedRoom/>} />
    </Routes>
  );
};

export default App;

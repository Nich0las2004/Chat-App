import axios from "axios";

const sendToken = async (accessToken: String) => {
  await axios.get("http://localhost:5555/room", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default sendToken;

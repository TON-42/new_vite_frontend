import React, {useState, useEffect} from "react";
import ChatTable from "./ChatTable";
import ChatTableUserB from "./ChatTableUserB";
import Login from "./Login";
import {useUserContext} from "./UserContext";

const Chats: React.FC = () => {
  const {user} = useUserContext();
  const [showChatTable, setShowChatTable] = useState<boolean>(false);
  const [showChatTableUserB, setShowChatTableUserB] = useState<boolean>(false);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  //Important note: has_profile needs to be updated in the user context when the user creates a profile
  // this logic is slightly flawed

  // useEffect(() => {
  //   if (!user.has_profile && user.chats.length > 0) {
  //     setShowChatTableUserB(true);
  //     console.log(
  //       "User doesn't have a profile but has at least one chat, showing ChatTableUserB",
  //     );
  //   } else if (user.has_profile) {
  //     setShowChatTable(true);
  //     console.log("User has a profile, showing ChatTable");
  //   }
  // }, [user]);

  //     warning: this version will always show the ChatTable
  useEffect(() => {
    if (!user.has_profile || user.has_profile) setShowChatTable(true);
  }, [user]);

  const handleLoginSuccess = () => {
    console.log("Login successful");
    ChatTable;
    console.log("ChatTable rendered");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {user.chats && user.chats.length > 0 ? (
        <div>
          <h2>Your data, your consent, your money</h2>
          {showChatTable && <ChatTable />}
          {showChatTableUserB && <ChatTableUserB />}
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;

import React, {useState} from "react";
import ChatTable from "./ChatTable";
import Login from "./Login";
import {useUserContext} from "../utils/utils";

const Chats: React.FC = () => {
  const {user} = useUserContext(); // Access the user context
  const [showChatTable, setShowChatTable] = useState<boolean>(false);
  const [showChatTableUserB] = useState<boolean>(false);

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
  //   useEffect(() => {
  //     if (!user.has_profile || user.has_profile) setShowChatTable(true);
  //   }, [user]);

  const handleLoginSuccess = () => {
    console.log("Login successful");
    setShowChatTable(true);
  };

  return (
    <div className='p-5 max-w-xl mx-auto text-center'>
      {user.chats && user.chats.length > 0 ? (
        <div>
          <h2>Your data, your consent, your money</h2>
          {showChatTable && <ChatTable user={user} />}
          {showChatTableUserB && <ChatTableUserB />}
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;

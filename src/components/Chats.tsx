import React, {useState, useEffect} from "react";
import ChatTable from "./ChatTable";
import ChatTableUserB from "./ChatTableUserB";
import Login from "./Login";
import {useUserContext} from "../utils/utils";
import {Multiselect} from "@telegram-apps/telegram-ui";
import {MultiselectOption} from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";

const Chats: React.FC = () => {
  const {user} = useUserContext(); // Access the user context
  const [showChatTable, setShowChatTable] = useState<boolean>(false);
  const [showChatTableUserB, setShowChatTableUserB] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<MultiselectOption[]>(
    [],
  );

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  const options: MultiselectOption[] = [
    {value: "option1", label: "Chats I can sell"},
    {value: "option2", label: "Chats I have been invited to sell"},
  ];

  // Important note: has_profile needs to be updated in the user context when the user creates a profile
  // this logic is slightly flawed

  useEffect(() => {
    if (!user.has_profile && user.chats.length > 0) {
      setShowChatTableUserB(true);
      console.log(
        "User doesn't have a profile but has at least one chat, showing ChatTableUserB",
      );
    } else if (user.has_profile) {
      setShowChatTable(true);
      console.log("User has a profile, showing ChatTable");
    }
  }, [user, setShowChatTableUserB, setShowChatTable]);

  const handleLoginSuccess = () => {
    console.log("Login successful");
    setShowChatTable(true);
  };

  const handleMultiselectChange = (selected: MultiselectOption[]) => {
    setSelectedOptions(selected);
  };

  return (
    <div className='p-5 max-w-xl mx-auto text-center'>
      {user.chats && user.chats.length > 0 ? (
        <div>
          <Multiselect
            options={options}
            value={selectedOptions}
            onChange={handleMultiselectChange}
            closeDropdownAfterSelect={true}
          />
          {/* <h2>Your data, your consent, your money</h2> */}
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

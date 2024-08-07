import React, {useState} from "react";
import {Cell, Multiselectable, Button} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";
import ConfirmInvitations from "./Modals/ConfirmInvitations";

interface ChatTableInvitationsProps {
  backendUrl: string;
}

const ChatTableInvitations: React.FC<ChatTableInvitationsProps> = ({
  backendUrl,
}) => {
  const {user} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showConfirmInvitations, setShowConfirmInvitations] =
    useState<boolean>(false);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
  };

  const handleConfirm = () => {
    setShowConfirmInvitations(true);
  };

  const handleCloseConfirmInvitations = () => {
    setShowConfirmInvitations(false);
    setSelectedValues([]);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) => sum + (user.chats.find(item => item.id === id)?.words || 0),
    0,
  );

  const pendingChats = user.chats.filter(
    item =>
      item.lead.id !== user.id &&
      item.status === "pending" &&
      !item.agreed_users.includes(user.id),
  );

  console.log("Chats", user.chats);

  return (
    <div className='text-left'>
      <form>
        {pendingChats.map(item => (
          <Cell
            key={item.id}
            Component='label'
            before={
              <Multiselectable
                name='multiselect'
                value={item.id}
                checked={selectedValues.includes(item.id)}
                onChange={() => handleSelectionChange(item.id)}
              />
            }
            multiline
          >
            <strong>{item.words} $WORD </strong> - {item.lead.name}
          </Cell>
        ))}
      </form>
      {pendingChats.length > 0 ? (
        <>
          <table className='mt-2 w-full text-center'>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <strong> Total Value: {totalValue} $WORD </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='text-center'>
            <Button
              mode='filled'
              size='m'
              onClick={handleConfirm}
              disabled={selectedValues.length === 0}
            >
              Confirm
            </Button>
          </div>
        </>
      ) : (
        <div className='mt-2 p-4 w-full bg-gray-100 dark:bg-stone-950 rounded-lg shadow'>
          <p>💬 Here you will find the chats you got invited to sell 💰</p>
        </div>
      )}
      {showConfirmInvitations && (
        <ConfirmInvitations
          onClose={handleCloseConfirmInvitations}
          selectedChats={selectedValues.map(id => ({
            userId: user.id,
            chatId: id,
          }))}
          word={String(totalValue)}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
};

export default ChatTableInvitations;

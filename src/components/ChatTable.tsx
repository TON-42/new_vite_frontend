import React, {useState} from "react";
import {Button, Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import AgreeSale from "./Modals/AgreeSale";
import {useUserContext} from "../utils/utils";
import SuccessModal from "./Modals/SuccessModal";

interface ChatTableProps {
  backendUrl: string;
}

const ChatTable: React.FC<ChatTableProps> = ({backendUrl}) => {
  const {user} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showAgreeSale, setShowAgreeSale] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );

    const newSelectedChats = selectedValues.reduce(
      (acc, id) => {
        const chat = user.chatsToSellUnfolded?.find(
          item => String(item.userId) === id,
        );
        if (chat) {
          const key = `(${String(chat.userId)}, '${chat.userName}')`;
          acc[key] = chat.words;
        }
        return acc;
      },
      {} as {[key: string]: number},
    );

    console.log("ChatTable handleSubmit selectedChats", newSelectedChats);
  };

  const handleShowAgreeSale = () => {
    setShowAgreeSale(true);
  };

  const handleShowSuccess = () => {
    setShowSuccess(true);
  };

  const handleHideAgreeSale = () => {
    setShowAgreeSale(false);
  };

  const handleHideSuccess = () => {
    setShowSuccess(false);
    handleHideAgreeSale();
  };

  const totalValue = selectedValues.reduce(
    (sum, id) =>
      sum +
      (user.chatsToSellUnfolded?.find(item => String(item.userId) === id)
        ?.words || 0),
    0,
  );

  const phoneNumber = user.telephoneNumber ?? "No phone number provided";

  return (
    <div className='text-left'>
      {user.chatsToSellUnfolded?.map(item => (
        <Cell
          key={item.userId}
          Component='label'
          before={
            <Multiselectable
              name='multiselect'
              value={String(item.userId)}
              checked={selectedValues.includes(String(item.userId))}
              onChange={() => handleSelectionChange(String(item.userId))}
            />
          }
          multiline
        >
          <strong>{item.words} $WORD </strong> - {item.userName}
        </Cell>
      ))}
      {user?.chatsToSellUnfolded && user.chatsToSellUnfolded?.length > 0 && (
        <table className='mt-5 w-full text-center'>
          <tbody>
            <tr>
              <td colSpan={2}>
                <strong> Total Value: {totalValue} $WORD </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className='text-center'>
        {user?.chatsToSellUnfolded && user.chatsToSellUnfolded?.length > 0 && (
          <Button
            size='m'
            className='text-white'
            style={{
              backgroundColor: "--tw-bg-opacity",
              alignContent: "center",
              alignSelf: "center",
            }}
            onClick={handleShowAgreeSale}
          >
            Sell
          </Button>
        )}
        <AgreeSale
          selectedChats={selectedValues.reduce(
            (acc, id) => {
              const chat = user.chatsToSellUnfolded?.find(
                item => String(item.userId) === id,
              );
              if (chat) {
                acc[`(${String(chat.userId)}, '${chat.userName}')`] =
                  chat.words;
              }
              return acc;
            },
            {} as {[key: string]: number},
          )}
          phoneNumber={phoneNumber}
          onClose={() => {}}
          showSuccess={handleShowSuccess}
          isVisible={showAgreeSale}
          backendUrl={backendUrl}
        />
        {showSuccess && <SuccessModal onClose={handleHideSuccess} />}
      </div>
    </div>
  );
};

export default ChatTable;

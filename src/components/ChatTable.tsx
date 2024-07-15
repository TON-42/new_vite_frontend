import React, {useState, useCallback, useEffect} from "react";
import {Button, Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import AgreeSale from "./Modals/AgreeSale";
import {useUserContext} from "../utils/utils";
import SuccessModal from "./Modals/SuccessModal";
import Login from "./Login";

const ChatTable: React.FC<{backendUrl: string}> = ({backendUrl}) => {
  const {user, isLoggedIn} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showAgreeSale, setShowAgreeSale] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showChatTable, setShowChatTable] = useState<boolean>(isLoggedIn);

  useEffect(() => {
    console.log("isLoggedIn state in ChatTable useEffect:", isLoggedIn);
    if (isLoggedIn) {
      setShowChatTable(true);
      console.log("User is logged in, showing chat table");
    } else {
      setShowChatTable(false);
      console.log("User is not logged in, hiding chat table");
    }
  }, [isLoggedIn]);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
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
    setSelectedValues([]); // Clear selected values when success modal is closed
  };

  const handleLoginSuccess = useCallback(() => {
    console.log("Login successful, setting showChatTable to true");
    setShowChatTable(true);
  }, []);

  const handleLoadMore = () => {
    console.log("Load more clicked");
  };

  const totalValue = selectedValues.reduce(
    (sum, id) =>
      sum +
      (user.chatsToSellUnfolded?.find(item => String(item.userId) === id)
        ?.words || 0),
    0,
  );

  const phoneNumber = user.telephoneNumber ?? "No phone number provided";

  if (!showChatTable) {
    console.log("User is not logged in, showing Login component");
    return (
      <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
    );
  }

  return (
    <div className='text-left mb-20'>
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
        <>
          <table className='mt-5 w-full text-center'>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <strong> Total Value: {totalValue} $WORD </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='text-center '>
            <Button
              size='m'
              className='text-white'
              style={{
                backgroundColor: "--tw-bg-opacity",
                alignContent: "center",
                alignSelf: "center",
              }}
              onClick={handleShowAgreeSale}
              disabled={selectedValues.length === 0}
            >
              Sell
            </Button>
          </div>
          <div className='text-center mt-5'>
            <Button
              size='m'
              className='text-white'
              style={{
                backgroundColor: "--tw-bg-opacity",
                alignContent: "center",
                alignSelf: "center",
              }}
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        </>
      )}
      <AgreeSale
        selectedChats={selectedValues.reduce(
          (acc, id) => {
            const chat = user.chatsToSellUnfolded?.find(
              item => String(item.userId) === id,
            );
            if (chat) {
              acc[`(${String(chat.userId)}, '${chat.userName}')`] = chat.words;
            }
            return acc;
          },
          {} as {[key: string]: number},
        )}
        phoneNumber={phoneNumber}
        onClose={handleHideAgreeSale}
        showSuccess={handleShowSuccess}
        isVisible={showAgreeSale}
        backendUrl={backendUrl}
      />
      {showSuccess && <SuccessModal onClose={handleHideSuccess} />}
    </div>
  );
};

export default ChatTable;

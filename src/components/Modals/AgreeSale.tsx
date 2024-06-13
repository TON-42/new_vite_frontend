import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Placeholder,
  Textarea,
  Checkbox,
} from '@telegram-apps/telegram-ui';

const AgreeSale: React.FC<{ selectedChats: string[]; phoneNumber: string }> = ({
  selectedChats,
  phoneNumber,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(
    `{User A} is inviting you to sell the history of the chat {Chat name}.
If you agree to selling the history of the chat, each of the chat participants will receive: 💸100 $WORD tokens ~ 20 USD 🤑
The data of the chat history will be anonymized and stripped from all personal
identifiers, passwords, names, phone numbers and payment details 🙅
The chat history will NOT be used for targeted advertisement.
The chat history will be used to train AI chatbots and make them sound more human-like.
Please click the link below to accept the sale:`,
  );

  const backendUrl = 'https://daniilbot-k9qlu.ondigitalocean.app';

  useEffect(() => {}, [selectedChats]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  console.log('PHONE NUMBER', phoneNumber);
  console.log('AgreeSale rendered with selected chats:', selectedChats);
  console.log('AgreeSale rendered with phone number:', phoneNumber);
  const handleSend = async () => {
    const selectedChatDetails = selectedChats;

    try {
      const response = await fetch(`${backendUrl}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chats: selectedChatDetails,
          phone_number: phoneNumber,
        }),
      });

      if (!response.ok) {
        console.error('POST request failed:', response.statusText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Message sent successfully:', data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Modal
      header={<Modal.Header>Only iOS header</Modal.Header>}
      trigger={
        <Button size='m' style={{ backgroundColor: 'red', color: 'white' }}>
          Agree Sale
        </Button>
      }
      // visible={true}
    >
      <div style={{ background: '#fff', padding: '20px' }}>
        <Placeholder
          description={`Do you confirm to sell the ${selectedChats.length} selected chats for 324 $WORD? 
          Your friends will receive the following invitation to sell from our app:`}
          header='Please confirm'
        />
        <div style={{ width: '100%' }}>
          <div style={{ padding: '20px 0', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <span style={{ marginLeft: '10px' }}>
                I agree to the{' '}
                <a
                  href='https://example.com/terms'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  terms and conditions
                </a>
              </span>
            </div>
          </div>
          <Textarea
            header='Textarea'
            placeholder='I am usual textarea'
            value={message}
            onChange={handleMessageChange}
            style={{ width: '100%', height: '320px' }}
          />
          <div
            style={{
              padding: '20px 0',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Button
              mode='filled'
              size='s'
              disabled={!isChecked}
              style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AgreeSale;

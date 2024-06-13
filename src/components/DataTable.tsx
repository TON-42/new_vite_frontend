import React, { useState, useEffect, useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import { PhoneNumberContext } from '../contexts/PhoneNumberContext';

interface DataTableData {
  [key: string]: number;
}

interface SelectedChat {
  selected: boolean;
  value: number;
}

interface SelectedChats {
  [key: string]: SelectedChat;
}

interface DataTableProps {
  data: DataTableData;
  backendUrl: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, backendUrl }) => {
  console.log('Entering DataTable');
  console.log('Data:', data);
  const [selectedChats, setSelectedChats] = useState<SelectedChats>({});
  const [total, setTotal] = useState<number>(0);
  const [userB, setUserB] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { phoneNumber } = useContext(PhoneNumberContext);

  useEffect(() => {
    const newTotal = Object.keys(selectedChats)
      .filter(key => selectedChats[key].selected)
      //   .reduce((sum, key) => sum + data[key].value, 0);
      .reduce((sum, key) => sum + selectedChats[key].value, 0);
    setTotal(newTotal);
  }, [selectedChats, data]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log('Checkbox Name:', name); // Debug log
    console.log('Data Keys:', Object.keys(data)); // Debug log
    console.log('data[name]:');
    console.log(data[name]);
    setSelectedChats(prevSelectedChats => {
      const updatedSelectedChats = {
        ...prevSelectedChats,
        [name]: {
          selected: checked,
          value: data[name],
        },
      };
      console.log('Updated Selected Chats:', updatedSelectedChats); // Debug log
      return updatedSelectedChats;
    });
  };

  const handleMonetize = async () => {
    console.log('Entered handleMonetize');
    setIsLoading(true);
    console.log('Selected Chats:', selectedChats);
    const selectedChatDetails = Object.keys(selectedChats)
      .filter(key => selectedChats[key])
      .map(key => {
        const { value } = selectedChats[key];
        return {
          id: key,
          value,
        };
      });

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
        throw new Error('Failed to send message');
      }

      const responseData = await response.json();
      if (responseData && Array.isArray(responseData.userB)) {
        setUserB(responseData.userB.join(', '));
        console.log('Message sent successfully');
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='text-white'>
      <table className='min-w-full text-white'>
        <thead>
          <tr>
            <th className='py-2 border-b border-white'>Select</th>
            <th className='py-2 border-b border-white'>Chat</th>
            <th className='py-2 border-b border-white'>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map(key => (
            <tr key={key}>
              <td className='py-2 text-center border-b border-white'>
                <input
                  type='checkbox'
                  name={key}
                  checked={selectedChats[key]?.selected || false}
                  onChange={handleCheckboxChange}
                  className='form-checkbox'
                />
              </td>
              <td className='py-2 border-b border-white'>
                {key.split(', ')[1].replace("'", '').replace("')", '')}
              </td>
              <td className='py-2 border-b border-white'>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4 text-lg'>Total: {total}</div>
      <button
        onClick={handleMonetize}
        className='mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        disabled={isLoading}
      >
        {isLoading ? <ClipLoader size={20} color={'#fff'} /> : 'Monetize'}
      </button>
    </div>
  );
};

export default DataTable;

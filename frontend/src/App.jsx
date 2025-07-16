import { useState } from 'react'

import './App.css'
import axios from 'axios';
import { DropdownMenu,DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,DropdownMenuItem } from './components/ui/dropdown-menu';

function App() {
  const [inputMessage, setinputMessage] = useState('');
  const [inputQuality, setinputQuality] = useState('');
  const[model, setModel] = useState('gpt-3.5-turbo');
  const handleTokenCheck = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_PUBLIC_BACKEND_URL + '/api/tokenize',
        { prompt: inputMessage, model: 'gpt-3.5-turbo' },

        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('API response:', response.data.quality);
      setinputQuality(response.data.quality);

    } catch (error) {
      console.error('Error:', error);
    }
  }
  console.log("inputmessage", inputMessage);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Token Quality Checker
      </h1>
      <div className="flex flex-col items-center justify-center mt-4 gap-y-2">
        <div className='flex flex-row items-center justify-center gap-x-2'>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => {setinputMessage(e.target.value);setinputQuality('')}}
          placeholder="Enter your message here"
          className="border p-2 rounded w-1/2"
        />
        <DropdownMenu >
          <DropdownMenuTrigger className="bg-gray-200 p-2 rounded text-white">
            Select Model
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel>Models</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
            className="cursor-pointer"
              checked={model === 'gpt-3.5-turbo'}
              onClick={() => setModel('gpt-3.5-turbo')}
            >
              gpt-3.5-turbo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            className="cursor-pointer"
              checked={model === 'gpt-4'}
              onClick={() => setModel('gpt-4')}
            >
              gpt-4
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className={"cursor-pointer  "}
            checked={model==='gpt-4-32k'}
            onClick={() => setModel('gpt-4-32k')}>
              gpt-4-32k
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <button
          onClick={handleTokenCheck}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Check Prompt Quality
        </button>
      </div>
      {inputQuality && (
        <div className="mt-4 text-lg ">
          Token Quality: {inputQuality}
        </div>
      )}
    </div>
  )
  
}

export default App

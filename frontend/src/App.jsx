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
  <DropdownMenu>
    <DropdownMenuTrigger>Choose Model</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>LLM Model using:</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>GPT-4</DropdownMenuItem>
      <DropdownMenuItem>GPT-3.5 Turbo</DropdownMenuItem>
      <DropdownMenuItem>Claude 3</DropdownMenuItem>
      <DropdownMenuItem>Gemini Pro</DropdownMenuItem>
      <DropdownMenuItem>Llama 2</DropdownMenuItem>
      <DropdownMenuItem>Mistral</DropdownMenuItem>
      <DropdownMenuItem>PaLM 2</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}

export default App

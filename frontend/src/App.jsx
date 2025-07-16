import { useState } from 'react'
import './App.css'
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'

const MODEL_OPTIONS = [
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'gpt-4',
  'gpt-4-32k',
  'gpt-4o',
  'claude-1',
  'claude-2',
  'claude-3-haiku',
  'claude-3-sonnet',
  'claude-3-opus',
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
]

function App() {
  const [inputMessage, setinputMessage] = useState('')
  const [inputQuality, setinputQuality] = useState('')
  const [model, setModel] = useState('gpt-3.5-turbo')
  const [searchTerm, setSearchTerm] = useState('');
  const[overflowText,setoverflowText]=useState(''); 
  const [overflowTokens,setoverflowTokens]=useState(0);

  const handleTokenCheck = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_PUBLIC_BACKEND_URL + '/api/tokenize',
        { prompt: inputMessage, model },
        { headers: { 'Content-Type': 'application/json' } }
      )
      setinputQuality(response.data.quality)
      setoverflowText(response.data.overflow_text);
      setoverflowTokens(response.data.overflow_token_count);
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredModels = MODEL_OPTIONS.filter((m) =>
    m.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Token Quality Checker</h1>
      <div className="flex flex-col items-center justify-center mt-4 gap-y-2">
        <div className="flex flex-row items-center justify-center gap-x-2 p-2 h-20">
          <Textarea
            type="text"
            value={inputMessage}
            onChange={(e) => {
              setinputMessage(e.target.value)
              setinputQuality('')
            }}
            placeholder="Enter your message here"
            className="border p-2 rounded h-full "
          />
          <DropdownMenu >
            <DropdownMenuTrigger className="bg-gray-700 flex justify-center items-center rounded text-white h-12">
              {model}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-80  p-2 w-64">
              <DropdownMenuLabel>Select Model</DropdownMenuLabel>
              <Input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
              <DropdownMenuSeparator />
              
              <div className="h-full overflow-y-auto">
                {filteredModels.map((m) => (
                  <DropdownMenuCheckboxItem
                    key={m}
                    checked={model === m}
                    onClick={() => setModel(m)}
                    className="cursor-pointer"
                  >
                    {m}
                  </DropdownMenuCheckboxItem>
                ))}
                {filteredModels.length === 0 && (
                  <div className="px-2 py-1 text-sm text-muted-foreground">
                    No models found.
                  </div>
                )}
              </div>
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
        <div className="mt-4 text-lg">
          Token Quality:{' '}
          <span
            className={`font-semibold ${
              inputQuality === 'green'
                ? 'text-green-500'
                : inputQuality === 'yellow'
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}
          >
            {inputQuality}
          </span>
        </div>
      )}
      {overflowText && (
        <div className="mt-4 text-lg max-w-full border border-2 max-h-80 overflow-y-auto p-2">
          Overflow Tokens: <span className="text-red-500">{overflowTokens}</span>
        <div className="mt-4 text-lg">
          Overflow Text: <span className="text-red-500">{overflowText}</span>
        </div>
        </div>
      )}
    </div>
  )
}

export default App

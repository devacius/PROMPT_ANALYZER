from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from token_utils import count_tokens_with_overflow

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptInput(BaseModel):
    prompt: str
    model: str
@app.get("/")
def Welcome_message():
    return "HEllo Giant!!!"

@app.post("/api/tokenize")
def tokenize_prompt(data: PromptInput):
    return count_tokens_with_overflow(data.prompt, data.model)

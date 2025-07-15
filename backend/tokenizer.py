import tiktoken

MODEL_TOKEN_LIMITS = {
    "gpt-4": 8192,
    "gpt-4-32k": 32768,
    "gpt-3.5-turbo": 4096,
}

def count_tokens(prompt: str, model: str) -> dict:
    if model not in MODEL_TOKEN_LIMITS:
        raise ValueError("Unsupported model")
    
    encoding = tiktoken.encoding_for_model(model)
    tokens = encoding.encode(prompt)
    count = len(tokens)
    limit = MODEL_TOKEN_LIMITS[model]

    usage = count / limit
    if usage < 0.5:
        quality = "green"
    elif usage < 0.9:
        quality = "yellow"
    else:
        quality = "red"

    return {
        "model": model,
        "token_count": count,
        "quality": quality
    }

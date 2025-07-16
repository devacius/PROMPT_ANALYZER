import tiktoken

def count_tokens_with_overflow(prompt: str, model: str) -> dict:
    MODEL_TOKEN_LIMITS = {
        # OpenAI
        "gpt-3.5-turbo": 4096,
        "gpt-3.5-turbo-16k": 16385,
        "gpt-4": 8192,
        "gpt-4-32k": 32768,
        "gpt-4o": 128000,
        # Claude
        "claude-1": 9000,
        "claude-2": 100000,
        "claude-3-haiku": 200000,
        "claude-3-sonnet": 200000,
        "claude-3-opus": 200000,
        # Gemini
        "gemini-pro": 32000,
        "gemini-1.5-pro": 1000000,
        "gemini-1.5-flash": 1000000,
    }

    if model not in MODEL_TOKEN_LIMITS:
        raise ValueError("Unsupported model")

    # Get tokenizer
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")

    tokens = encoding.encode(prompt)
    limit = MODEL_TOKEN_LIMITS[model]
    token_count = len(tokens)

    usage = token_count / limit
    if usage < 0.5:
        quality = "green"
    elif usage < 0.9:
        quality = "yellow"
    else:
        quality = "red"

    overflow_tokens = []
    overflow_text = ""

    if token_count > limit:
        overflow_tokens = tokens[limit:]
        overflow_text = "".join([encoding.decode([t]) for t in overflow_tokens])

    return {
        "model": model,
        "token_count": token_count,
        "quality": quality,
        "overflow_token_count": len(overflow_tokens),
        "overflow_text": overflow_text.strip() or None  # None if no overflow
    }

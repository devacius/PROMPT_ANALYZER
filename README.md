# Token Meter

## Backend (FastAPI)

### Build & Start
```bash
# Create and activate virtual environment
python -m venv venv.
source venv/bin/activate  # On Windows use: .\.venv\Scripts\activate
```
```bash
# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

## Frontend (Vite)

### Build & Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```
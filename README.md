# Quizly

Interactive quiz application with a React frontend and FastAPI backend.

## Getting Started

1. **Backend**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

2. **Frontend** (in another terminal)

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and expects the backend at `http://localhost:8000`.

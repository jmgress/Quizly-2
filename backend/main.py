from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
from typing import List

from .models import Question, AnswerSubmission, QuizResult

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent

# Load questions from JSON file
with open(BASE_DIR / 'questions.json') as f:
    questions_data = json.load(f)

QUESTIONS = [Question(**q) for q in questions_data]

@app.get("/api/questions", response_model=List[Question])
def get_questions():
    return QUESTIONS

@app.post("/api/quiz/submit", response_model=QuizResult)
def submit_quiz(answers: List[AnswerSubmission]):
    score = 0
    for ans in answers:
        question = next((q for q in QUESTIONS if q.id == ans.question_id), None)
        if not question:
            raise HTTPException(status_code=404, detail=f"Question {ans.question_id} not found")
        if ans.answer == question.correct_answer:
            score += 1
    return QuizResult(score=score, total=len(QUESTIONS))

@app.get("/api/quiz/{quiz_id}", response_model=QuizResult)
def get_quiz_result(quiz_id: int):
    # Placeholder endpoint returning perfect score for demo purposes
    return QuizResult(score=len(QUESTIONS), total=len(QUESTIONS))

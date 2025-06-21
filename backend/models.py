from pydantic import BaseModel
from typing import List

class Question(BaseModel):
    id: int
    text: str
    options: List[str]
    correct_answer: int

class AnswerSubmission(BaseModel):
    question_id: int
    answer: int

class QuizResult(BaseModel):
    score: int
    total: int

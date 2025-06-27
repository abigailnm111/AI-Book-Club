from pydantic import BaseModel
from typing import Optional, List

class BookAnalysisRequest(BaseModel):
    """Request model for book analysis"""
    pdf_path: str

class BookTextRequest(BaseModel):
    """Request model for text summarization"""
    book_text: str

class BookAnalysisResponse(BaseModel):
    """Response model for book analysis"""
    success: bool
    data: Optional[str] = None
    error: Optional[str] = None
    book_path: Optional[str] = None

class BookSummary(BaseModel):
    """Model for structured book summary"""
    summary: str
    discussion_questions: List[str]

class HealthResponse(BaseModel):
    """Health check response model"""
    status: str
    service: str
    version: str = "1.0.0" 
from fastapi import APIRouter, HTTPException, Depends
from ..models import (
    BookAnalysisRequest, 
    BookAnalysisResponse,
    HealthResponse
)
from ..services import BookService

# Create router for book-related endpoints
router = APIRouter(prefix="/api/v1", tags=["books"])

# Dependency injection for service
def get_book_service() -> BookService:
    return BookService()

@router.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy", 
        service="AI Book Club API"
    )

@router.post("/analyze-book", response_model=BookAnalysisResponse)
async def analyze_book(
    request: BookAnalysisRequest,
    book_service: BookService = Depends(get_book_service)
):
    """
    Analyze a book from a PDF file path
    
    - **pdf_path**: Path to the PDF file relative to project root
    """
    try:
        result = await book_service.analyze_book_from_path(request.pdf_path)
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])
        print("RESULT",result)   
        return BookAnalysisResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
        
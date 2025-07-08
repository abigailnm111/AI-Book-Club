from typing import Dict, Any, Optional
import os
import json
import pymupdf
from ..utils.ai_component import get_summary

class BookService:
    """Service layer for book-related business logic"""
    
    def __init__(self):
        self.ai_client = None  # Could be initialized here if needed
    
    async def analyze_book_from_path(self, pdf_path: str) -> Dict[str, Any]:
        """
        Analyze a book from a given PDF path
        
        Args:
            pdf_path: Path to the PDF file
            
        Returns:
            Dictionary containing summary and discussion questions
        """
        try:
            # Get book text using the AI component
            book_text = self._get_book_text_from_path(pdf_path)
            
            # Generate summary using AI
            ai_response = json.loads(get_summary(book_text))
            
            return {
                "success": True,
                "data": ai_response,
                "book_path": pdf_path
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "book_path": pdf_path
            }
    
    def _get_book_text_from_path(self, pdf_path: str) -> str:
        """
        Extract text from PDF file at given path
        
        Args:
            pdf_path: Path to the PDF file
            
        Returns:
            Extracted text from the PDF
        """
        # Get the directory of the current script file
        script_dir = os.path.dirname(os.path.abspath(__file__))
        # Go up to the project root
        project_root = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
        # Construct the full path to the PDF file
        full_pdf_path = os.path.join(project_root, pdf_path)
        
        text = ""
        book = pymupdf.open(full_pdf_path)
        for page in book:
            text += page.get_text("text")
        return text 
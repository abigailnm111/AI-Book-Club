from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.controllers.book_controller import router as book_router

# Create FastAPI app
app = FastAPI(
    title="AI Book Club API",
    description="An API for analyzing books and generating discussion questions for book clubs",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(book_router)

@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to AI Book Club API!",
        "docs": "/docs",
        "health": "/api/v1/health"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 
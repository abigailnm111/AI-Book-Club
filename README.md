# AI Book Club API

A FastAPI application for analyzing books and generating discussion questions for book clubs using AI.

## Architecture Overview

This project follows a **layered architecture** pattern with clear separation of concerns:

```
AI-Book-Club/
├── app/
│   ├── controllers/     # HTTP request handlers (FastAPI routes)
│   ├── services/        # Business logic layer
│   ├── models/          # Pydantic data models
│   └── utils/           # Utility functions and AI components
├── main.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

### Layer Responsibilities

1. **Controllers** (`app/controllers/`)
   - Handle HTTP requests and responses
   - Input validation using Pydantic models
   - Error handling and status codes
   - Dependency injection for services

2. **Services** (`app/services/`)
   - Business logic implementation
   - Data processing and transformation
   - Integration with external services (AI, databases, etc.)
   - Error handling and logging

3. **Models** (`app/models/`)
   - Pydantic models for request/response validation
   - Data structure definitions
   - API documentation generation

4. **Utils** (`app/utils/`)
   - Reusable utility functions
   - External service integrations (OpenAI, PDF processing)
   - Helper functions

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Book-Club
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the application**
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /api/v1/health` - Check API health status

### Book Analysis
- `POST /api/v1/analyze-book` - Analyze a book from PDF file

### Documentation
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## Usage Examples

### Analyze a Book from PDF

```bash
curl -X POST "http://localhost:8000/api/v1/analyze-book" \
     -H "Content-Type: application/json" \
     -d '{"pdf_path": "path/to/your/book.pdf"}'
```

## FastAPI Best Practices Implemented

1. **Dependency Injection**: Services are injected into controllers using FastAPI's `Depends()`
2. **Request/Response Models**: Pydantic models for type safety and validation
3. **Error Handling**: Proper HTTP status codes and error messages
4. **API Documentation**: Automatic OpenAPI/Swagger documentation
5. **Router Organization**: Modular routing with prefixes and tags
6. **CORS Support**: Cross-origin resource sharing middleware
7. **Async/Await**: Proper async handling for better performance

## Development Guidelines

### Adding New Endpoints

1. **Create/update models** in `app/models/`
2. **Add business logic** in `app/services/`
3. **Create controller** in `app/controllers/`
4. **Register router** in `main.py`

### Code Organization

- Keep controllers thin - they should only handle HTTP concerns
- Put business logic in services
- Use dependency injection for testability
- Validate all inputs with Pydantic models
- Handle errors gracefully with proper HTTP status codes

## Testing

To run tests (when implemented):
```bash
pytest
```

## Deployment

For production deployment:
1. Use a production ASGI server like Gunicorn with Uvicorn workers
2. Configure proper CORS settings
3. Set up environment variables securely
4. Use a reverse proxy like Nginx
5. Implement proper logging and monitoring

## Contributing

1. Follow the established architecture patterns
2. Add proper type hints and docstrings
3. Update API documentation
4. Write tests for new functionality
5. Follow PEP 8 style guidelines
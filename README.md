# AI Book Club

A full-stack application for analyzing books and generating discussion questions for book clubs using AI.

## Project Structure

```
AI-Book-Club/
├── backend/                 # FastAPI backend
│   ├── app/                # FastAPI application
│   │   ├── controllers/    # HTTP request handlers
│   │   ├── services/       # Business logic layer
│   │   ├── models/         # Pydantic data models
│   │   └── utils/          # Utility functions
│   ├── main.py             # FastAPI entry point
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
└── README.md              # This file
```

## Quick Start

### Backend (FastAPI)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the backend:**
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend (React)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend:**
   ```bash
   npm start
   ```

   The React app will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/v1/health` - Check API health status

### Book Analysis
- `POST /api/v1/analyze-book` - Analyze a book from PDF file

### Documentation
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## Development

### Backend Development
- **Architecture**: Layered architecture with controllers, services, and models
- **Framework**: FastAPI with Pydantic for validation
- **Documentation**: Automatic OpenAPI/Swagger documentation

### Frontend Development
- **Framework**: React with TypeScript
- **Build Tool**: Create React App
- **Development Server**: Runs on port 3000

### Communication
- **CORS**: Configured for development (allows localhost:3000)
- **API Base URL**: `http://localhost:8000` (configured in frontend)

## Deployment

### Backend Deployment
1. Use a production ASGI server like Gunicorn with Uvicorn workers
2. Configure proper CORS settings for production
3. Set up environment variables securely
4. Use a reverse proxy like Nginx

### Frontend Deployment
1. Build the React app: `npm run build`
2. Serve the `build/` directory with a web server
3. Configure API base URL for production

## Contributing

1. Follow the established architecture patterns
2. Add proper type hints and docstrings (backend)
3. Use TypeScript for frontend components
4. Update API documentation
5. Write tests for new functionality
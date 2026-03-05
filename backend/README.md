# Board Game Rulebook Arbitrator - Backend API

This is the Django REST API backend for the Board Game Rulebook Arbitrator application.

## Project Structure

```
backend/
├── config/              # Project settings and URL configuration
├── base_app/           # Base app with main URL router
├── conversations/      # Conversations app (models, views, serializers)
├── authentication/     # Authentication app (user registration, login)
└── manage.py          # Django management script
```

## Setup Instructions

### 1. Create a Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Create Superuser
```bash
python manage.py createsuperuser
```

### 5. Run Development Server
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- **POST** `/api/v1/auth/signup/` - Register a new user
- **POST** `/api/v1/auth/signin/` - Login and get JWT tokens

### Conversations
- **POST** `/api/v1/conversations/` - Create a new conversation (chat)
- **GET** `/api/v1/conversations/list/` - List all user conversations
- **GET** `/api/v1/conversations/<id>/` - Get conversation detail
- **PUT** `/api/v1/conversations/<id>/` - Update conversation
- **DELETE** `/api/v1/conversations/<id>/` - Delete conversation

## Database Models

### User (Built-in Django)
- id
- username
- email
- password

### Conversation
- _id (primary key)
- title
- user (FK to User)
- created_at
- updated_at

### Message
- id
- conversation (FK to Conversation)
- role (user/assistant)
- content
- created_at

## Authentication

The API uses JWT (JSON Web Token) authentication. 

1. Register at `/api/v1/auth/signup/`
2. Login at `/api/v1/auth/signin/` to get access and refresh tokens
3. Include the access token in the Authorization header: `Authorization: Bearer <token>`

## Admin Panel

Access at `http://localhost:8000/admin/` with your superuser credentials.

# 📝 Taggable, Searchable Notes App

A full-stack notes application built with Node.js, Express, MongoDB, React, and Vite. Features include full-text search, tagging system, and pagination support.

## 🚀 Features

### ✅ Completed Features

- **Full-text search** - Search through note titles, content, and tags
- **Tagging system** - Add multiple tags to notes for organization
- **CRUD operations** - Create, read, update, and delete notes
- **Pagination** - Efficient navigation through large note collections
- **Responsive design** - Works on desktop and mobile devices
- **Real-time filtering** - Filter notes by tags and search terms
- **Sort options** - Sort by date created, date updated, or title
- **Clean UI** - Modern, intuitive user interface

### Backend Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Full-text search indexing
- Tag-based filtering
- Pagination support
- Input validation and error handling
- CORS enabled for frontend integration

### Frontend Features

- React with Vite for fast development
- Component-based architecture
- Custom hooks for state management
- Debounced search input
- Loading states and error handling
- Keyboard shortcuts (Ctrl+S to save, Esc to cancel)
- Character count and validation

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd notes-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-app
NODE_ENV=development
```

For MongoDB Atlas, replace the MONGODB_URI with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🎯 Usage

### Creating Notes
1. Click the "New Note" button
2. Fill in the title, content, and tags (comma-separated)
3. Press Ctrl+S or click Save

### Searching Notes
- Use the search bar to find notes by title, content, or tags
- Search is debounced (300ms delay) for better performance

### Filtering by Tags
- Click on tags in the filter section to show only notes with those tags
- Multiple tags can be selected for AND filtering

### Editing Notes
1. Click on a note in the sidebar to view it
2. Click the "Edit" button
3. Make changes and save with Ctrl+S or the Save button

### Sorting Notes
Use the dropdown to sort notes by:
- Latest Updated (default)
- Oldest Updated
- Latest Created
- Oldest Created
- Title A-Z
- Title Z-A

## 🔧 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Notes
```http
GET /notes?page=1&limit=10&search=&tags=&sortBy=updatedAt&sortOrder=desc
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Notes per page (default: 10)
- `search` (optional): Search query for full-text search
- `tags` (optional): Comma-separated list of tags to filter by
- `sortBy` (optional): Field to sort by (updatedAt, createdAt, title)
- `sortOrder` (optional): Sort direction (asc, desc)

**Response:**
```json
{
  \"notes\": [...],
  \"pagination\": {
    \"current\": 1,
    \"pages\": 5,
    \"total\": 50,
    \"hasNext\": true,
    \"hasPrev\": false
  }
}
```

#### Get Single Note
```http
GET /notes/:id
```

#### Create Note
```http
POST /notes
Content-Type: application/json

{
  \"title\": \"Note Title\",
  \"content\": \"Note content\",
  \"tags\": [\"tag1\", \"tag2\"]
}
```

#### Update Note
```http
PUT /notes/:id
Content-Type: application/json

{
  \"title\": \"Updated Title\",
  \"content\": \"Updated content\",
  \"tags\": [\"newtag\"]
}
```

#### Delete Note
```http
DELETE /notes/:id
```

#### Get All Tags
```http
GET /notes/tags/all
```

#### Health Check
```http
GET /health
```

## 📁 Project Structure

```
notes-app/
├── backend/
│   ├── models/
│   │   └── Note.js          # MongoDB note schema
│   ├── routes/
│   │   └── notes.js         # API routes
│   ├── server.js            # Express server
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── NotesApp.jsx
│   │   │   ├── NotesList.jsx
│   │   │   ├── NoteEditor.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── TagFilter.jsx
│   │   │   └── Pagination.jsx
│   │   ├── hooks/
│   │   │   └── useNotes.js  # Custom React hooks
│   │   ├── services/
│   │   │   └── api.js       # API service
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md
```

## 🛠️ Development Commands

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🔍 Testing

To test the application:

1. **Start both servers** (backend and frontend)
2. **Create sample notes** with different tags
3. **Test search functionality** with various queries
4. **Test tag filtering** by selecting different tags
5. **Test pagination** by creating more than 10 notes
6. **Test sorting** with different sort options
7. **Test CRUD operations** (create, read, update, delete)

## 🛠️ Troubleshooting

### Common Issues:

**1. "Network Error" or "ECONNREFUSED"**
- Make sure MongoDB is running on your system
- Check if backend server is running on port 5000
- Verify the MONGODB_URI in backend/.env is correct

**2. "Request timeout"**
- Check if MongoDB service is started
- Ensure no firewall is blocking port 5000

**3. Frontend can't connect to backend**
- Backend should be running on http://localhost:5000
- Frontend should be running on http://localhost:5173 or 5174
- Check CORS settings if accessing from different ports

**4. MongoDB Connection Issues**
- For local MongoDB: Ensure MongoDB service is running
- For MongoDB Atlas: Check connection string and network access
- Verify database name in connection string

**5. Port Already in Use**
- Backend: Change PORT in backend/.env
- Frontend: Vite will automatically use next available port

### Quick Fixes:

```bash
# Restart backend server
cd backend
npm run dev

# Restart frontend server  
cd frontend
npm run dev

# Check if MongoDB is running (Windows)
net start MongoDB

# Check if ports are in use
netstat -an | findstr :5000
netstat -an | findstr :5173
```

## 📱 Mobile Responsiveness

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

On smaller screens, the sidebar becomes the primary view with the main content hidden until a note is selected.

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy the backend folder

### Frontend Deployment (e.g., Vercel, Netlify)
1. Update `VITE_API_URL` to point to your deployed backend
2. Build the application with `npm run build`
3. Deploy the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 💡 Future Enhancements

- User authentication and authorization
- Rich text editor with markdown support
- Note sharing and collaboration
- File attachments
- Dark mode
- Export functionality (PDF, markdown)
- Note categories and folders
- Advanced search with filters
- Note templates
- Backup and sync functionality
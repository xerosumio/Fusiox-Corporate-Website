# MongoDB Integration for Fusiox CMS

## Overview

The Fusiox Corporate Website has been successfully integrated with MongoDB to provide a robust backend for the Content Management System (CMS). This replaces the previous localStorage-based system with a proper database solution.

## Database Setup

### MongoDB Connection

- **Host**: `localhost:27017`
- **Database**: `fusiox_cms`
- **Collections**:
  - `posts` - For insights articles
  - `faqs` - For FAQ entries

### Collections Structure

#### Posts Collection

```javascript
{
  "_id": ObjectId,
  "id": "string", // URL-friendly ID
  "category": "string", // compsec, fund, etc.
  "createdDate": "string", // ISO date
  "lastEdited": "string", // ISO date
  "image": "string", // Image path
  "translations": {
    "en": { "title": "string", "body": "string" },
    "zh-Hant": { "title": "string", "body": "string" },
    "zh-Hans": { "title": "string", "body": "string" }
  }
}
```

#### FAQs Collection

```javascript
{
  "_id": ObjectId,
  "category": "string", // general, incorporation, etc.
  "sequence": "number", // Display order
  "createdDate": "string", // ISO date
  "translations": {
    "en": { "question": "string", "answer": "string" },
    "zh-hk": { "question": "string", "answer": "string" },
    "zh-cn": { "question": "string", "answer": "string" }
  }
}
```

## API Endpoints

### Posts (Insights Articles)

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (with image upload)
- `PUT /api/posts/:id` - Update existing post
- `DELETE /api/posts/:id` - Delete post

### FAQs

- `GET /api/faqs` - Get all FAQs
- `POST /api/faqs` - Create new FAQ
- `PUT /api/faqs/:id` - Update existing FAQ
- `DELETE /api/faqs/:id` - Delete FAQ

## File Upload

The system supports image uploads for posts:

- **Upload Directory**: `assets/images/uploads/`
- **File Size Limit**: 5MB
- **Supported Formats**: Images only (jpg, png, gif, etc.)
- **Naming**: `image-{timestamp}-{random}.{extension}`

## Migration

The existing data has been migrated from JSON files to MongoDB:

- **Insights Posts**: 3 articles migrated from `data/insights.json`
- **Sample FAQs**: 2 sample FAQs created for testing

## Frontend Integration

### CMS.js Updates

- `loadPosts()` - Now fetches from `/api/posts`
- `savePost()` - Sends to MongoDB API with image upload
- `deletePost()` - Deletes via MongoDB API
- `loadFaqs()` - Fetches from `/api/faqs`
- `saveFaq()` - Sends to MongoDB API
- `deleteFaq()` - Deletes via MongoDB API

### Compatibility

- Still maintains localStorage for frontend compatibility
- Insights page and FAQ page continue to work seamlessly
- CMS interface now uses MongoDB as primary data source

## Server Configuration

### Dependencies Added

```json
{
  "mongodb": "^6.3.0",
  "multer": "^1.4.5-lts.1"
}
```

### Environment Variables

No additional environment variables required for MongoDB connection.

## Usage

### Starting the Server

```bash
npm install
node server.js
```

### Accessing the CMS

1. Navigate to `http://localhost:3000/cms.html`
2. Login with the CMS credentials
3. Create, edit, or delete posts and FAQs
4. Changes are automatically saved to MongoDB

### Viewing Content

- **Insights**: `http://localhost:3000/insights.html`
- **FAQ**: `http://localhost:3000/faq.html`

## Benefits

1. **Persistent Storage**: Data survives server restarts
2. **Scalability**: Can handle large amounts of content
3. **Backup**: Easy to backup and restore data
4. **Multi-user**: Can support multiple CMS users
5. **Real-time**: Changes are immediately available
6. **Image Management**: Proper file upload handling

## Troubleshooting

### MongoDB Connection Issues

1. Ensure MongoDB is running: `mongosh --eval "db.runCommand('ping')"`
2. Check server logs for connection errors
3. Verify MongoDB is accessible on `localhost:27017`

### API Issues

1. Test endpoints: `curl http://localhost:3000/api/posts`
2. Check server logs for error messages
3. Verify CORS settings if accessing from different domain

### Data Migration

If you need to re-run migration:

```bash
node migrate-to-mongodb.js
```

## Future Enhancements

1. **User Authentication**: Add proper user management
2. **Image Optimization**: Automatic image resizing
3. **Search**: Full-text search capabilities
4. **Versioning**: Content version history
5. **Backup**: Automated database backups
6. **Analytics**: Content performance tracking

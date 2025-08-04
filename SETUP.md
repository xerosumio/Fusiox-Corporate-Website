# Fusiox Contact Form Backend Setup

This Node.js backend handles contact form submissions and sends emails directly to info@fusiox.ai without relying on the user's email client.

## Features

- ✅ **Direct email sending** to info@fusiox.ai
- ✅ **Form validation** (client and server-side)
- ✅ **Rate limiting** (5 requests per 15 minutes per IP)
- ✅ **Security headers** with Helmet
- ✅ **CORS protection**
- ✅ **Beautiful HTML email templates**
- ✅ **Error handling and logging**
- ✅ **Health check endpoint**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

Copy the example environment file and configure your email settings:

```bash
cp env.example .env
```

Edit `.env` with your email configuration:

#### Option A: Gmail SMTP (Recommended for testing)

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Important:** For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an "App Password" (not your regular password)
3. Use the app password in the EMAIL_PASSWORD field

#### Option B: Custom SMTP (Production)

```env
EMAIL_SERVICE=custom
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
```

### 3. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

### 4. Test the Setup

1. **Health check:** Visit `http://localhost:3000/api/health`
2. **Contact form:** Visit `http://localhost:3000/contact.html`
3. **Submit a test message** and check if it arrives at info@fusiox.ai

## Email Service Recommendations

### For Development/Testing:
- **Gmail SMTP** - Easy to set up, good for testing

### For Production:
- **SendGrid** - Reliable, good deliverability
- **Mailgun** - Excellent for transactional emails
- **Amazon SES** - Cost-effective for high volume
- **Postmark** - Great deliverability

## API Endpoints

### POST `/api/contact`
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "subject": "General Inquiry",
  "message": "Hello, I'm interested in your services..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you within 24 hours.",
  "messageId": "message-id-from-email-service"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "path": "email",
      "msg": "Please provide a valid email address"
    }
  ]
}
```

### GET `/api/health`
Health check endpoint for monitoring.

## Security Features

- **Rate limiting:** 5 requests per 15 minutes per IP
- **Input validation:** Server-side validation for all fields
- **CORS protection:** Only allows requests from specified origins
- **Security headers:** Implemented with Helmet
- **Error handling:** No sensitive information leaked in production

## Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment

1. **Set environment variables** for your production email service
2. **Update CORS origins** in `server.js` to include your domain
3. **Deploy to your preferred hosting service** (Vercel, Heroku, DigitalOcean, etc.)

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
EMAIL_SERVICE=custom
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
```

## Troubleshooting

### Email Not Sending
1. Check your email service credentials
2. Verify SMTP settings
3. Check server logs for error messages
4. Test with a different email service

### CORS Errors
1. Update the `origin` array in `server.js` to include your domain
2. Ensure your frontend is making requests to the correct backend URL

### Rate Limiting
- The API limits to 5 requests per 15 minutes per IP
- Increase limits in `server.js` if needed for your use case

## Monitoring

- Check `/api/health` endpoint for server status
- Monitor server logs for email sending success/failure
- Set up alerts for failed email deliveries

## Support

For issues or questions, check the server logs and ensure all environment variables are properly configured. 
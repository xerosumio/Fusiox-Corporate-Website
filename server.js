const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8000', 'https://fusiox.ai', 'https://www.fusiox.ai'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/contact', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static('.'));

// Email transporter configuration
const createTransporter = () => {
    // For Gmail SMTP (you'll need to set up app passwords)
    if (process.env.EMAIL_SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD // Use app password, not regular password
            }
        });
    }
    
    // For Microsoft 365/Exchange Online
    if (process.env.EMAIL_SERVICE === 'microsoft365') {
        return nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
    }
    
    // For other SMTP services (like SendGrid, Mailgun, etc.)
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Validation rules
const contactValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s\-'\.]+$/)
        .withMessage('Name contains invalid characters'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('subject')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Subject is required'),
    
    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters'),
    
    body('company')
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage('Company name must be less than 150 characters')
];

// Contact form endpoint
app.post('/api/contact', contactValidation, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { name, email, company, subject, message } = req.body;

        // Create email transporter
        const transporter = createTransporter();

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: ['info@fusiox.ai', process.env.EMAIL_USER], // Send to both addresses
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
                        <h3 style="color: #333; margin-top: 0;">Message</h3>
                        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
                        <p style="margin: 0; color: #155724;">
                            <strong>Submission Details:</strong><br>
                            Date: ${new Date().toLocaleString('en-US', { 
                                timeZone: 'Asia/Hong_Kong',
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}<br>
                            IP Address: ${req.ip}<br>
                            User Agent: ${req.get('User-Agent')}
                        </p>
                    </div>
                </div>
            `,
            text: `
New Contact Form Submission

Contact Information:
- Name: ${name}
- Email: ${email}
${company ? `- Company: ${company}` : ''}
- Subject: ${subject}

Message:
${message}

Submission Details:
- Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' })}
- IP Address: ${req.ip}
- User Agent: ${req.get('User-Agent')}
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        // Log successful submission with more details
        console.log(`Contact form submission from ${email} sent successfully:`);
        console.log(`  - Message ID: ${info.messageId}`);
        console.log(`  - From: ${process.env.EMAIL_USER}`);
        console.log(`  - To: info@fusiox.ai and ${process.env.EMAIL_USER}`);
        console.log(`  - Subject: ${mailOptions.subject}`);

        res.status(200).json({
            success: true,
            message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Email sending error:', error);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again or contact us directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Contact endpoint: http://localhost:${PORT}/api/contact`);
}); 
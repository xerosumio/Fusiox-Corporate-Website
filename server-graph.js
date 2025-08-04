const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'https://fusiox.ai', 'https://www.fusiox.ai'],
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

        // For now, simulate successful email sending
        // In production, you would integrate with Microsoft Graph API
        console.log('Contact form submission:', {
            name,
            email,
            company,
            subject,
            message,
            timestamp: new Date().toISOString(),
            ip: req.ip
        });

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.status(200).json({
            success: true,
            message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
            messageId: `sim-${Date.now()}`
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
    console.log(`⚠️  Running in simulation mode - emails are logged but not sent`);
}); 
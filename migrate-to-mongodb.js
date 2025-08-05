const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function migrateData() {
    const client = new MongoClient('mongodb://localhost:27017');
    
    try {
        await client.connect();
        const db = client.db('fusiox_cms');
        
        console.log('Connected to MongoDB');
        
        // Migrate insights posts
        const insightsPath = path.join(__dirname, 'data', 'insights.json');
        if (fs.existsSync(insightsPath)) {
            const posts = JSON.parse(fs.readFileSync(insightsPath, 'utf8'));
            
            if (posts.length > 0) {
                // Clear existing posts
                await db.collection('posts').deleteMany({});
                
                // Insert posts with MongoDB ObjectIds
                const result = await db.collection('posts').insertMany(posts);
                console.log(`Migrated ${result.insertedCount} posts to MongoDB`);
            } else {
                console.log('No posts found in insights.json');
            }
        } else {
            console.log('insights.json not found, skipping posts migration');
        }
        
        // Create some sample FAQs if none exist
        const existingFaqs = await db.collection('faqs').find({}).toArray();
        if (existingFaqs.length === 0) {
            const sampleFaqs = [
                {
                    category: 'general',
                    sequence: 1,
                    translations: {
                        en: {
                            question: 'What services does Fusiox provide?',
                            answer: 'Fusiox provides comprehensive corporate services including company incorporation, fund management, compliance, and ongoing support for businesses in Hong Kong.'
                        },
                        'zh-hk': {
                            question: 'Fusiox提供什麼服務？',
                            answer: 'Fusiox提供全面的企業服務，包括公司註冊、基金管理、合規和對香港企業的持續支持。'
                        },
                        'zh-cn': {
                            question: 'Fusiox提供什么服务？',
                            answer: 'Fusiox提供全面的企业服务，包括公司注册、基金管理、合规和对香港企业的持续支持。'
                        }
                    },
                    createdDate: new Date().toISOString()
                },
                {
                    category: 'incorporation',
                    sequence: 2,
                    translations: {
                        en: {
                            question: 'How long does company incorporation take?',
                            answer: 'Company incorporation typically takes 3-5 business days for standard cases, depending on the complexity and requirements.'
                        },
                        'zh-hk': {
                            question: '公司註冊需要多長時間？',
                            answer: '標準情況下，公司註冊通常需要3-5個工作日，具體時間取決於複雜程度和要求。'
                        },
                        'zh-cn': {
                            question: '公司注册需要多长时间？',
                            answer: '标准情况下，公司注册通常需要3-5个工作日，具体时间取决于复杂程度和要求。'
                        }
                    },
                    createdDate: new Date().toISOString()
                }
            ];
            
            const result = await db.collection('faqs').insertMany(sampleFaqs);
            console.log(`Created ${result.insertedCount} sample FAQs`);
        } else {
            console.log(`Found ${existingFaqs.length} existing FAQs`);
        }
        
        console.log('Migration completed successfully!');
        
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await client.close();
    }
}

migrateData(); 
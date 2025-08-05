// Debug script to test CMS API calls
async function testCMSSave() {
    console.log('Testing CMS save functionality...');
    
    // Test data similar to what CMS would send
    const testPost = {
        id: 'debug-test-post',
        category: 'test',
        translations: {
            en: {
                title: 'Debug Test Post',
                body: '<p>This is a debug test post</p>'
            },
            'zh-Hant': {
                title: '調試測試文章',
                body: '<p>這是一個調試測試文章</p>'
            },
            'zh-Hans': {
                title: '调试测试文章',
                body: '<p>这是一个调试测试文章</p>'
            }
        },
        image: '',
        createdDate: new Date().toISOString(),
        lastEdited: new Date().toISOString()
    };
    
    try {
        // Test the API endpoint
        console.log('Sending POST request to /api/posts...');
        
        const formData = new FormData();
        formData.append('postData', JSON.stringify(testPost));
        
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: formData
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        console.log('Success response:', result);
        
        // Test getting posts
        console.log('Testing GET /api/posts...');
        const getResponse = await fetch('/api/posts');
        const getResult = await getResponse.json();
        console.log('Posts count:', getResult.posts.length);
        console.log('Posts:', getResult.posts);
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run the test
testCMSSave(); 
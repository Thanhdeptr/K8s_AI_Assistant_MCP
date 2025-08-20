#!/usr/bin/env node
/**
 * Demo đơn giản OpenRouter Tool Calling - JavaScript
 * Tương thích CentOS 7 với Node.js phiên bản cũ
 */

const https = require('https');
const http = require('http');

// Cấu hình
const API_KEY = process.env.OPENROUTER_API_KEY || 'your-api-key-here';
const MODEL = 'openai/gpt-oss-20b:free';
const API_URL = 'openrouter.ai';
const API_PATH = '/api/v1/chat/completions';

// Tool đơn giản - chỉ lấy thời gian hiện tại
const TOOLS = [
    {
        type: "function",
        function: {
            name: "get_current_time",
            description: "Lấy thời gian hiện tại",
            parameters: {
                type: "object",
                properties: {
                    timezone: {
                        type: "string",
                        description: "Múi giờ (ví dụ: 'Asia/Ho_Chi_Minh')",
                        default: "Asia/Ho_Chi_Minh"
                    }
                },
                required: []
            }
        }
    }
];

/**
 * Gọi OpenRouter API sử dụng https module
 */
function callOpenRouter(messages, tools = null) {
    return new Promise((resolve, reject) => {
        const requestBody = {
            model: MODEL,
            messages: messages,
            temperature: 0.7,
            max_tokens: 500
        };

        if (tools) {
            requestBody.tools = tools;
        }

        const postData = JSON.stringify(requestBody);

        const options = {
            hostname: API_URL,
            port: 443,
            path: API_PATH,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://github.com/demo',
                'X-Title': 'Simple Tool Call Demo',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (error) {
                    reject(new Error(`JSON parse error: ${error.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Request error: ${error.message}`));
        });

        req.write(postData);
        req.end();
    });
}

/**
 * Mock function để lấy thời gian hiện tại
 */
function mockGetTime(timezone = "Asia/Ho_Chi_Minh") {
    const now = new Date();
    return {
        current_time: now.toISOString().replace('T', ' ').substring(0, 19),
        timezone: timezone,
        description: `Thời gian hiện tại: ${now.toLocaleTimeString('vi-VN')} ngày ${now.toLocaleDateString('vi-VN')}`
    };
}

/**
 * Thực thi tool
 */
function executeTool(toolCall) {
    const name = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);

    console.log(`🔧 Thực thi tool: ${name} với arguments:`, args);

    if (name === "get_current_time") {
        return mockGetTime(args.timezone || "Asia/Ho_Chi_Minh");
    } else {
        return { error: `Tool ${name} không được hỗ trợ` };
    }
}

/**
 * Demo đơn giản
 */
async function simpleDemo() {
    console.log("🚀 Demo đơn giản OpenRouter Tool Calling");
    console.log("=".repeat(50));

    if (API_KEY === 'your-api-key-here') {
        console.log("❌ Vui lòng set OPENROUTER_API_KEY");
        console.log("   export OPENROUTER_API_KEY='your-key-here'");
        return;
    }

    // Câu hỏi đơn giản
    const userMessage = "Bây giờ là mấy giờ?";

    console.log(`📝 Câu hỏi: ${userMessage}`);
    console.log();

    const messages = [
        {
            role: 'user',
            content: userMessage
        }
    ];

    try {
        // Bước 1: Gửi request với tools
        console.log("📤 Bước 1: Gửi request với tools...");
        const response1 = await callOpenRouter(messages, TOOLS);

        const assistantMessage = response1.choices[0].message;
        console.log(`🤖 Assistant response: ${assistantMessage.content || 'Tool calls được yêu cầu'}`);

        // Kiểm tra tool calls
        if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
            console.log("✅ Không có tool calls, trả về response trực tiếp");
            console.log(`💬 Kết quả: ${assistantMessage.content || ''}`);
            return;
        }

        // Bước 2: Thực thi tools
        console.log("\n🔧 Bước 2: Thực thi tools...");
        const toolResults = [];

        for (const toolCall of assistantMessage.tool_calls) {
            const result = executeTool(toolCall);
            toolResults.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                name: toolCall.function.name,
                content: JSON.stringify(result)
            });
        }

        // Bước 3: Gửi kết quả tools về
        console.log("\n📤 Bước 3: Gửi kết quả tools về...");
        const finalMessages = [...messages, assistantMessage, ...toolResults];

        const response2 = await callOpenRouter(finalMessages, TOOLS);
        const finalResponse = response2.choices[0].message;

        console.log("\n✅ Kết quả cuối cùng:");
        console.log(`💬 ${finalResponse.content || ''}`);

    } catch (error) {
        console.error(`❌ Lỗi: ${error.message}`);
    }
}

/**
 * Interactive mode
 */
async function interactiveDemo() {
    console.log("🚀 Interactive Mode - Nhập 'quit' để thoát");
    console.log("=".repeat(50));

    if (API_KEY === 'your-api-key-here') {
        console.log("❌ Vui lòng set OPENROUTER_API_KEY");
        return;
    }

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuestion = () => {
        rl.question('\n> ', async (input) => {
            if (input.toLowerCase() === 'quit') {
                console.log('👋 Tạm biệt!');
                rl.close();
                return;
            }

            if (!input.trim()) {
                askQuestion();
                return;
            }

            console.log(`\n📝 Câu hỏi: ${input}`);

            const messages = [
                {
                    role: 'user',
                    content: input
                }
            ];

            try {
                // Gửi request
                const response1 = await callOpenRouter(messages, TOOLS);

                const assistantMessage = response1.choices[0].message;

                if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
                    console.log(`💬 Kết quả: ${assistantMessage.content || ''}`);
                    askQuestion();
                    return;
                }

                // Thực thi tools
                const toolResults = [];
                for (const toolCall of assistantMessage.tool_calls) {
                    const result = executeTool(toolCall);
                    toolResults.push({
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        name: toolCall.function.name,
                        content: JSON.stringify(result)
                    });
                }

                // Gửi kết quả
                const finalMessages = [...messages, assistantMessage, ...toolResults];
                const response2 = await callOpenRouter(finalMessages, TOOLS);

                const finalResponse = response2.choices[0].message;
                console.log(`💬 Kết quả: ${finalResponse.content || ''}`);

            } catch (error) {
                console.error(`❌ Lỗi: ${error.message}`);
            }

            askQuestion();
        });
    };

    askQuestion();
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.includes('--interactive') || args.includes('-i')) {
        interactiveDemo();
    } else {
        simpleDemo();
    }
}

module.exports = {
    callOpenRouter,
    executeTool,
    simpleDemo,
    interactiveDemo
};



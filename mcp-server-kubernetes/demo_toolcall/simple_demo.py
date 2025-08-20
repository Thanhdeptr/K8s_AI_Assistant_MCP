#!/usr/bin/env python3
"""
Demo đơn giản OpenRouter Tool Calling - Tương thích CentOS 7
Chỉ sử dụng thư viện có sẵn: urllib, json, time
"""

import os
import json
import time
import urllib.request
import urllib.parse
from datetime import datetime

# Cấu hình
API_KEY = os.getenv('OPENROUTER_API_KEY', 'your-api-key-here')
MODEL = 'openai/gpt-oss-20b:free'
API_URL = 'https://openrouter.ai/api/v1/chat/completions'

# Tool đơn giản - chỉ lấy thời gian hiện tại
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "Lấy thời gian hiện tại",
            "parameters": {
                "type": "object",
                "properties": {
                    "timezone": {
                        "type": "string",
                        "description": "Múi giờ (ví dụ: 'Asia/Ho_Chi_Minh')",
                        "default": "Asia/Ho_Chi_Minh"
                    }
                },
                "required": []
            }
        }
    }
]

def call_openrouter(messages, tools=None):
    """Gọi OpenRouter API sử dụng urllib"""
    request_body = {
        "model": MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500
    }
    
    if tools:
        request_body["tools"] = tools
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/demo",
        "X-Title": "Simple Tool Call Demo"
    }
    
    try:
        # Tạo request
        data = json.dumps(request_body).encode('utf-8')
        req = urllib.request.Request(API_URL, data=data, headers=headers)
        
        # Gửi request
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result
    except Exception as e:
        print(f"❌ Lỗi API: {e}")
        return None

def mock_get_time(timezone="Asia/Ho_Chi_Minh"):
    """Mock function để lấy thời gian"""
    now = datetime.now()
    return {
        "current_time": now.strftime("%Y-%m-%d %H:%M:%S"),
        "timezone": timezone,
        "description": f"Thời gian hiện tại: {now.strftime('%H:%M:%S')} ngày {now.strftime('%d/%m/%Y')}"
    }

def execute_tool(tool_call):
    """Thực thi tool"""
    name = tool_call["function"]["name"]
    args = json.loads(tool_call["function"]["arguments"])
    
    print(f"🔧 Thực thi tool: {name} với arguments: {args}")
    
    if name == "get_current_time":
        return mock_get_time(args.get("timezone", "Asia/Ho_Chi_Minh"))
    else:
        return {"error": f"Tool {name} không được hỗ trợ"}

def simple_demo():
    """Demo đơn giản"""
    print("🚀 Demo đơn giản OpenRouter Tool Calling")
    print("=" * 50)
    
    if API_KEY == 'your-api-key-here':
        print("❌ Vui lòng set OPENROUTER_API_KEY")
        print("   export OPENROUTER_API_KEY='your-key-here'")
        return
    
    # Câu hỏi đơn giản
    user_message = "Bây giờ là mấy giờ?"
    
    print(f"📝 Câu hỏi: {user_message}")
    print()
    
    messages = [
        {
            "role": "user",
            "content": user_message
        }
    ]
    
    try:
        # Bước 1: Gửi request với tools
        print("📤 Bước 1: Gửi request với tools...")
        response1 = call_openrouter(messages, TOOLS)
        
        if not response1:
            print("❌ Không thể kết nối đến OpenRouter API")
            return
        
        assistant_message = response1["choices"][0]["message"]
        print(f"🤖 Assistant response: {assistant_message.get('content', 'Tool calls được yêu cầu')}")
        
        # Kiểm tra tool calls
        if not assistant_message.get("tool_calls"):
            print("✅ Không có tool calls, trả về response trực tiếp")
            print(f"💬 Kết quả: {assistant_message.get('content', '')}")
            return
        
        # Bước 2: Thực thi tools
        print("\n🔧 Bước 2: Thực thi tools...")
        tool_results = []
        
        for tool_call in assistant_message["tool_calls"]:
            result = execute_tool(tool_call)
            tool_results.append({
                "role": "tool",
                "tool_call_id": tool_call["id"],
                "name": tool_call["function"]["name"],
                "content": json.dumps(result, ensure_ascii=False)
            })
        
        # Bước 3: Gửi kết quả tools về
        print("\n📤 Bước 3: Gửi kết quả tools về...")
        final_messages = messages + [assistant_message] + tool_results
        
        response2 = call_openrouter(final_messages, TOOLS)
        
        if response2:
            final_response = response2["choices"][0]["message"]
            print("\n✅ Kết quả cuối cùng:")
            print(f"💬 {final_response.get('content', '')}")
        else:
            print("❌ Lỗi khi gửi kết quả tools")
        
    except Exception as e:
        print(f"❌ Lỗi: {e}")

def interactive_demo():
    """Interactive mode"""
    print("🚀 Interactive Mode - Nhập 'quit' để thoát")
    print("=" * 50)
    
    if API_KEY == 'your-api-key-here':
        print("❌ Vui lòng set OPENROUTER_API_KEY")
        return
    
    while True:
        try:
            user_input = input("\n> ").strip()
            
            if user_input.lower() == 'quit':
                print("👋 Tạm biệt!")
                break
            
            if not user_input:
                continue
            
            print(f"\n📝 Câu hỏi: {user_input}")
            
            messages = [
                {
                    "role": "user",
                    "content": user_input
                }
            ]
            
            # Gửi request
            response1 = call_openrouter(messages, TOOLS)
            
            if not response1:
                print("❌ Lỗi kết nối")
                continue
            
            assistant_message = response1["choices"][0]["message"]
            
            if not assistant_message.get("tool_calls"):
                print(f"💬 Kết quả: {assistant_message.get('content', '')}")
                continue
            
            # Thực thi tools
            tool_results = []
            for tool_call in assistant_message["tool_calls"]:
                result = execute_tool(tool_call)
                tool_results.append({
                    "role": "tool",
                    "tool_call_id": tool_call["id"],
                    "name": tool_call["function"]["name"],
                    "content": json.dumps(result, ensure_ascii=False)
                })
            
            # Gửi kết quả
            final_messages = messages + [assistant_message] + tool_results
            response2 = call_openrouter(final_messages, TOOLS)
            
            if response2:
                final_response = response2["choices"][0]["message"]
                print(f"💬 Kết quả: {final_response.get('content', '')}")
            else:
                print("❌ Lỗi khi xử lý")
                
        except KeyboardInterrupt:
            print("\n👋 Tạm biệt!")
            break
        except Exception as e:
            print(f"❌ Lỗi: {e}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--interactive":
        interactive_demo()
    else:
        simple_demo()



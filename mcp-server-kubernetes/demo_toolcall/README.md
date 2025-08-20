# 🚀 Demo OpenRouter Tool Calling - CentOS 7

Demo đơn giản để test OpenRouter tool calling trên CentOS 7.

## 📁 Cấu trúc Files

```
demo_toolcall/
├── simple_demo.py          # Demo Python (khuyến nghị)
├── simple_demo.js          # Demo JavaScript
├── package-simple.json     # Package.json cho Node.js
├── README_SIMPLE.md        # Hướng dẫn Python
├── README_JS.md           # Hướng dẫn JavaScript
└── README.md              # Hướng dẫn tổng quan (file này)
```

## 🚀 Cách chạy nhanh

### 1. Cấu hình API Key
```bash
export OPENROUTER_API_KEY="your-api-key-here"
```

### 2. Chạy Demo

**Python (Khuyến nghị):**
```bash
python3 simple_demo.py
```

**JavaScript:**
```bash
node simple_demo.js
```

## 🎯 Tính năng

- ✅ Tool calling với GPT-OSS-20B (free)
- ✅ Tool đơn giản: get_current_time
- ✅ Không cần cài đặt dependencies
- ✅ Tương thích CentOS 7
- ✅ Cả Python và JavaScript

## 📝 Ví dụ

**Input:** "Bây giờ là mấy giờ?"

**Output:**
```
🔧 Thực thi tool: get_current_time với arguments: {'timezone': 'Asia/Ho_Chi_Minh'}

💬 Kết quả: Bây giờ là 15:30:25 ngày 15/08/2025
```

## 🔧 Tool có sẵn

- **get_current_time**: Lấy thời gian hiện tại

## 💡 Khuyến nghị

- **Python**: Ít gặp lỗi GLIBC, dễ chạy trên CentOS 7
- **JavaScript**: Nhanh hơn, nhưng có thể gặp lỗi GLIBC

## 📚 Tài liệu chi tiết

- `README_SIMPLE.md` - Hướng dẫn Python
- `README_JS.md` - Hướng dẫn JavaScript

## 🆘 Troubleshooting

**Lỗi API Key:**
```bash
export OPENROUTER_API_KEY="your-actual-key"
```

**Lỗi Node.js GLIBC:**
```bash
# Dùng Python thay thế
python3 simple_demo.py
```

**Lỗi Python:**
```bash
python3 --version
```



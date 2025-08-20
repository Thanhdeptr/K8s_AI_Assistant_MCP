# 🚀 Demo JavaScript OpenRouter Tool Calling - CentOS 7

Demo JavaScript đơn giản để test tool calling trên CentOS 7.

## ✅ Tương thích

- ✅ CentOS 7
- ✅ Node.js >= 8.0.0
- ✅ Chỉ dùng thư viện có sẵn (https, http, readline)
- ✅ Không cần cài đặt dependencies

## 🚀 Cách chạy

### 1. Kiểm tra Node.js

```bash
node --version
```

Nếu chưa có Node.js hoặc bị lỗi GLIBC, cài đặt phiên bản cũ:

```bash
# Cài đặt Node.js 14 (tương thích CentOS 7)
curl -fsSL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
```

### 2. Cấu hình API Key

```bash
export OPENROUTER_API_KEY="your-api-key-here"
```

### 3. Chạy Demo

**Demo đơn giản:**
```bash
node simple_demo.js
```

**Interactive mode:**
```bash
node simple_demo.js --interactive
```

**Sử dụng npm scripts:**
```bash
# Copy package.json
cp package-simple.json package.json

# Chạy demo
npm start

# Interactive mode
npm run interactive
```

## 🎯 Tính năng

- ✅ Tool calling với GPT-OSS-20B (free)
- ✅ Tool đơn giản: get_current_time
- ✅ Không cần cài đặt dependencies
- ✅ Tương thích Node.js phiên bản cũ
- ✅ Sử dụng https module có sẵn

## 📝 Ví dụ

**Input:** "Bây giờ là mấy giờ?"

**Output:**
```
🔧 Thực thi tool: get_current_time với arguments: { timezone: 'Asia/Ho_Chi_Minh' }

💬 Kết quả: Bây giờ là 15:30:25 ngày 15/08/2025
```

## 🔧 Tool có sẵn

- **get_current_time**: Lấy thời gian hiện tại

## 🆘 Troubleshooting

**Lỗi GLIBC (Node.js version mới):**
```bash
# Cài đặt Node.js phiên bản cũ
curl -fsSL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
```

**Lỗi API Key:**
```bash
export OPENROUTER_API_KEY="your-actual-key"
```

**Lỗi kết nối:**
- Kiểm tra internet
- Kiểm tra firewall
- Kiểm tra proxy nếu có

**Lỗi Node.js:**
```bash
# Kiểm tra version
node --version

# Nếu lỗi, cài đặt lại
sudo yum remove nodejs
curl -fsSL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
```

## 🔄 So sánh với Python

| Tính năng | JavaScript | Python |
|-----------|------------|--------|
| Tương thích CentOS 7 | ✅ | ✅ |
| Dependencies | Không cần | Không cần |
| GLIBC issues | Có thể có | Ít gặp |
| Performance | Tốt | Tốt |
| Debug | Dễ | Dễ |

## 💡 Khuyến nghị

- **Nếu Node.js hoạt động bình thường**: Dùng JavaScript
- **Nếu Node.js có lỗi GLIBC**: Dùng Python (`simple_demo.py`)



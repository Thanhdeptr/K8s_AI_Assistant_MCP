# 🚀 Demo Đơn Giản OpenRouter Tool Calling - CentOS 7

Demo này được thiết kế đặc biệt cho CentOS 7, chỉ sử dụng thư viện có sẵn.

## ✅ Tương thích

- ✅ CentOS 7
- ✅ Python 3.6+
- ✅ Chỉ dùng thư viện có sẵn (urllib, json, time)
- ✅ Không cần cài đặt thêm package

## 🚀 Cách chạy

### 1. Cấu hình API Key

```bash
export OPENROUTER_API_KEY="your-api-key-here"
```

### 2. Chạy Demo

**Demo đơn giản:**
```bash
python3 simple_demo.py
```

**Interactive mode:**
```bash
python3 simple_demo.py --interactive
```

## 🎯 Tính năng

- ✅ Tool calling với GPT-OSS-20B (free)
- ✅ Tool đơn giản: get_current_time
- ✅ Không cần cài đặt dependencies
- ✅ Tương thích CentOS 7

## 📝 Ví dụ

**Input:** "Bây giờ là mấy giờ?"

**Output:**
```
🔧 Thực thi tool: get_current_time với arguments: {'timezone': 'Asia/Ho_Chi_Minh'}

💬 Kết quả: Bây giờ là 15:30:25 ngày 15/08/2025
```

## 🔧 Tool có sẵn

- **get_current_time**: Lấy thời gian hiện tại

## 🆘 Troubleshooting

**Lỗi API Key:**
```bash
export OPENROUTER_API_KEY="your-actual-key"
```

**Lỗi kết nối:**
- Kiểm tra internet
- Kiểm tra firewall

**Lỗi Python:**
```bash
python3 --version
```



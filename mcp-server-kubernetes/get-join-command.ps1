# Script lấy join command từ master node
Write-Host "🔍 Lấy join command từ master node..." -ForegroundColor Green

# Sử dụng SSH để lấy join command
$sshCommand = "ssh hatthanh@192.168.10.18 'sudo kubeadm token create --print-join-command'"

Write-Host "📋 Chạy lệnh SSH..." -ForegroundColor Yellow
Write-Host "Lệnh: $sshCommand" -ForegroundColor Cyan

# Thực thi lệnh SSH
Invoke-Expression $sshCommand

Write-Host ""
Write-Host "💡 Nếu SSH không hoạt động, hãy:" -ForegroundColor Yellow
Write-Host "1. SSH vào server: ssh hatthanh@192.168.10.18" -ForegroundColor White
Write-Host "2. Chạy: sudo kubeadm token create --print-join-command" -ForegroundColor White
Write-Host "3. Copy lệnh join về Windows" -ForegroundColor White

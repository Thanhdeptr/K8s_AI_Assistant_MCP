# Script cài đặt Kubernetes Worker Node trên Windows
# Chạy trên máy Windows local

Write-Host "=== CÀI ĐẶT KUBERNETES WORKER NODE TRÊN WINDOWS ===" -ForegroundColor Green

# Kiểm tra quyền Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "Script này cần chạy với quyền Administrator"
    exit 1
}

Write-Host "1. Cài đặt Chocolatey (nếu chưa có)..." -ForegroundColor Yellow
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

Write-Host "2. Cài đặt Docker Desktop..." -ForegroundColor Yellow
choco install docker-desktop -y

Write-Host "3. Cài đặt Kubernetes CLI..." -ForegroundColor Yellow
choco install kubernetes-cli -y

Write-Host "4. Tải kubeadm cho Windows..." -ForegroundColor Yellow
$kubeadmUrl = "https://dl.k8s.io/release/v1.33.4/bin/windows/amd64/kubeadm.exe"
$kubeletUrl = "https://dl.k8s.io/release/v1.33.4/bin/windows/amd64/kubelet.exe"

$binDir = "C:\Program Files\Kubernetes\bin"
New-Item -ItemType Directory -Force -Path $binDir

Invoke-WebRequest -Uri $kubeadmUrl -OutFile "$binDir\kubeadm.exe"
Invoke-WebRequest -Uri $kubeletUrl -OutFile "$binDir\kubelet.exe"

Write-Host "5. Thêm vào PATH..." -ForegroundColor Yellow
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
if ($currentPath -notlike "*$binDir*") {
    [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$binDir", "Machine")
    $env:PATH = "$env:PATH;$binDir"
}

Write-Host "6. Tạo thư mục cấu hình..." -ForegroundColor Yellow
$k8sDir = "C:\ProgramData\Kubernetes"
New-Item -ItemType Directory -Force -Path $k8sDir

Write-Host "7. Cấu hình kubelet..." -ForegroundColor Yellow
$kubeletConfig = @"
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
cgroupDriver: systemd
containerRuntimeEndpoint: npipe:////./pipe/docker_engine
nodeLabels:
  kubernetes.io/os: windows
  kubernetes.io/arch: amd64
"@

$kubeletConfig | Out-File -FilePath "$k8sDir\kubelet-config.yaml" -Encoding UTF8

Write-Host "=== SETUP HOÀN THÀNH ===" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart Docker Desktop" -ForegroundColor White
Write-Host "2. Chạy script join-cluster.ps1 với join command" -ForegroundColor White 
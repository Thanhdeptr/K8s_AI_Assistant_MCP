#!/bin/bash

echo "=== BƯỚC 1: KIỂM TRA TÌNH TRẠNG HIỆN TẠI ==="

echo "1. Kiểm tra hệ điều hành:"
cat /etc/redhat-release

echo -e "\n2. Kiểm tra IP và network:"
ip addr show | grep "inet "

echo -e "\n3. Kiểm tra Minikube (nếu có):"
if command -v minikube &> /dev/null; then
    echo "Minikube đã được cài đặt"
    minikube status
    echo "Minikube IP: $(minikube ip)"
else
    echo "Minikube chưa được cài đặt"
fi

echo -e "\n4. Kiểm tra Docker:"
if command -v docker &> /dev/null; then
    echo "Docker đã được cài đặt"
    docker version
else
    echo "Docker chưa được cài đặt"
fi

echo -e "\n5. Kiểm tra kubectl:"
if command -v kubectl &> /dev/null; then
    echo "kubectl đã được cài đặt"
    kubectl version --client
else
    echo "kubectl chưa được cài đặt"
fi

echo -e "\n6. Kiểm tra port đang sử dụng:"
netstat -tlnp | grep -E "(6443|8443|8080)" || echo "Không có port Kubernetes nào đang chạy"

echo -e "\n7. Kiểm tra SELinux:"
getenforce

echo -e "\n8. Kiểm tra swap:"
swapon --show

echo -e "\n=== KẾT THÚC KIỂM TRA ===" 
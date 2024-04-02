# !/bin/sh

echo "Applying the deployments and services"

kubectl apply -f ../k8s/fastapi-deployment.yaml
kubectl apply -f ../k8s/fastapi-service.yaml
kubectl autoscale deployment fastapi-deployment --cpu-percent=50 --min=1 --max=4

kubectl apply -f ../k8s/components.yaml

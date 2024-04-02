kubectl delete -f ../k8s/components.yaml

kubectl delete -f ../k8s/fastapi-deployment.yaml
kubectl delete -f ../k8s/fastapi-service.yaml

kubectl delete hpa fastapi-deployment


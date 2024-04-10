# script to build and push the fastapi-news docker image to docker hub

cd ../

docker build -t fastapi-news .
docker tag fastapi-app dushims/fastapi-news
docker push dushims/fastapi-news

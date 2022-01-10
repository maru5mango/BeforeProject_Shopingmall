IMAGE_NAME="mern_shop:0.0.1"
CONTAINER_NAME="mern_shop"
 
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME
docker rmi $IMAGE_NAME
 
docker build --tag $IMAGE_NAME -f Dockerfile .
docker create --name $CONTAINER_NAME -p 5000:5000 $IMAGE_NAME
docker start $CONTAINER_NAME
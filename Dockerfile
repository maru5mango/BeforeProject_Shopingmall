FROM node:14.17.5-stretch-slim
 
WORKDIR /app
ADD . /app/


RUN cd
RUN npm i
RUN cd ./client
RUN npm i
RUN npm run build
 
ENV HOST 0.0.0.0
EXPOSE 5000
 
# start command
 CMD [ "npm", "run", "start" ]
